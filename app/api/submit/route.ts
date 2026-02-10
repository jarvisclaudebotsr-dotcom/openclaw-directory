import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { submissionLimiter, getClientIdentifier } from '@/lib/rate-limit'
import { z } from 'zod'

export const runtime = 'edge'

// Validation schema
const submitSchema = z.object({
  github_url: z.string().url().includes('github.com'),
  notes: z.string().optional(),
})

/**
 * POST /api/submit - Submit a new skill for moderation
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request)
    const { success } = await submissionLimiter.limit(identifier)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const supabase = (await createClient()) as any

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validated = submitSchema.parse(body)

    // Extract skill data from GitHub (basic validation)
    const skillData = await extractSkillData(validated.github_url)

    if (!skillData) {
      return NextResponse.json(
        { error: 'Invalid repository or missing SKILL.md' },
        { status: 400 }
      )
    }

    // Create submission
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        github_url: validated.github_url,
        skill_data: skillData,
        notes: body.notes || null,
        submitted_by: user.id,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      submission: data,
      message: 'Skill submitted successfully. It will be reviewed soon.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: (error as any).errors },
        { status: 400 }
      )
    }

    console.error('Error submitting skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Extract skill metadata from GitHub repository
 */
async function extractSkillData(githubUrl: string): Promise<any> {
  try {
    // Parse GitHub URL
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!match) return null

    const [, owner, repo] = match

    // Fetch SKILL.md from GitHub API (public access)
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/SKILL.md`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    const content = Buffer.from(data.content, 'base64').toString('utf-8')

    // Extract basic metadata
    const lines = content.split('\n')
    const name = lines.find((l) => l.startsWith('# '))?.replace('# ', '').trim()
    const description = lines.find((l) => l.trim() && !l.startsWith('#'))

    return {
      name: name || repo,
      description: description || '',
      github_url: githubUrl,
      content,
    }
  } catch (error) {
    console.error('Error extracting skill data:', error)
    return null
  }
}
