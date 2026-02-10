import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { installLimiter, getClientIdentifier } from '@/lib/rate-limit'

export const runtime = 'edge'

/**
 * POST /api/install/[skillId] - Track skill installation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ skillId: string }> }
) {
  try {
    const { skillId } = await params
    
    // Rate limiting
    const identifier = getClientIdentifier(request)
    const { success } = await installLimiter.limit(identifier)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const supabase = createServiceClient() as any

    // Get request metadata
    const ip = identifier
    const userAgent = request.headers.get('user-agent') || null
    const referrer = request.headers.get('referer') || null

    // Get geo data (if available from Vercel headers)
    const country = request.headers.get('x-vercel-ip-country') || null
    const city = request.headers.get('x-vercel-ip-city') || null

    // Record install event
    await supabase.from('install_events').insert({
      skill_id: skillId,
      ip_address: ip,
      user_agent: userAgent,
      referrer,
      country,
      city,
    })

    // Increment skill install count
    await supabase.rpc('increment_skill_installs', {
      skill_id_param: skillId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking install:', error)
    // Don't fail the request if analytics fails
    return NextResponse.json({ success: true })
  }
}
