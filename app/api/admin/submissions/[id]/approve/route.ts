import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export const runtime = 'edge'

/**
 * POST /api/admin/submissions/[id]/approve - Approve a submission and create skill
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

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

    // Check admin role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !['admin', 'moderator'].includes((profile as any).role)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get submission
    const serviceSupabase = createServiceClient() as any
    const { data: submission, error: fetchError } = await serviceSupabase
      .from('submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    // Create skill from submission
    const skillData = submission.skill_data as any
    const slug = createSlug(skillData.name)

    const { data: skill, error: skillError } = await serviceSupabase
      .from('skills')
      .insert({
        name: skillData.name,
        slug,
        emoji: skillData.emoji || '📦',
        description: skillData.description,
        full_description: skillData.content,
        version: skillData.version || '1.0.0',
        category: skillData.category || 'Other',
        tags: skillData.tags || [],
        github_url: submission.github_url,
        approved: true,
        submitted_by: submission.submitted_by,
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (skillError) {
      console.error('Error creating skill:', skillError)
      return NextResponse.json(
        { error: 'Failed to create skill' },
        { status: 500 }
      )
    }

    // Update submission status
    await serviceSupabase
      .from('submissions')
      .update({
        status: 'approved',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)

    return NextResponse.json({
      success: true,
      skill,
    })
  } catch (error) {
    console.error('Error approving submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
