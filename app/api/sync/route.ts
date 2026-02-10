import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { GitHubSyncService } from '@/lib/github-sync'

export const runtime = 'nodejs' // Required for GitHub API
export const maxDuration = 300 // 5 minutes

/**
 * POST /api/sync - Manually trigger GitHub sync (admin only)
 */
export async function POST(request: NextRequest) {
  try {
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

    // Create sync log
    const serviceSupabase = createServiceClient() as any
    const { data: syncLog } = await serviceSupabase
      .from('github_sync_logs')
      .insert({
        sync_type: 'manual',
        status: 'running',
        triggered_by: user.id,
      })
      .select()
      .single()

    // Run sync
    const syncService = new GitHubSyncService()
    const results = await syncService.syncAllRepos()

    // Update sync log
    await serviceSupabase
      .from('github_sync_logs')
      .update({
        status: results.success ? 'success' : 'error',
        repos_scanned: results.reposScanned,
        skills_added: results.skillsAdded,
        skills_updated: results.skillsUpdated,
        errors: results.errors,
        completed_at: new Date().toISOString(),
      })
      .eq('id', syncLog!.id)

    return NextResponse.json({
      success: results.success,
      reposScanned: results.reposScanned,
      skillsAdded: results.skillsAdded,
      skillsUpdated: results.skillsUpdated,
      errors: results.errors,
    })
  } catch (error) {
    console.error('Error syncing GitHub repos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/sync - Get sync status and history
 */
export async function GET(request: NextRequest) {
  try {
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

    // Fetch recent sync logs
    const { data: logs, error } = await supabase
      .from('github_sync_logs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(20)

    if (error) throw error

    return NextResponse.json({ logs })
  } catch (error) {
    console.error('Error fetching sync logs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
