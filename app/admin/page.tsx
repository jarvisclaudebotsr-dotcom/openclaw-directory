import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AdminStats } from './admin-stats'
import { PendingSubmissions } from './pending-submissions'
import { SyncButton } from './sync-button'

export default async function AdminPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check admin role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'moderator'].includes((profile as any).role)) {
    redirect('/')
  }

  // Fetch admin stats
  const { count: pendingCount } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: totalSkills } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })

  const { count: approvedSkills } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)

  // Fetch pending submissions
  const { data: submissions } = await supabase
    .from('submissions')
    .select(`
      *,
      submitted_by_profile:user_profiles!submissions_submitted_by_fkey(username, avatar_url)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false }) as { data: any[] | null }

  // Fetch recent sync logs
  const { data: syncLogs } = await supabase
    .from('github_sync_logs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(5) as { data: any[] | null }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Manage skills, submissions, and sync with GitHub
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to directory
          </Link>
        </div>

        {/* Stats */}
        <AdminStats
          pendingSubmissions={pendingCount || 0}
          totalSkills={totalSkills || 0}
          approvedSkills={approvedSkills || 0}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/admin/skills"
            className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-lg p-6 transition-colors"
          >
            <h3 className="text-white font-medium mb-2">Manage Skills</h3>
            <p className="text-gray-400 text-sm">
              Edit, feature, or delete existing skills
            </p>
          </Link>

          <Link
            href="/admin/submissions"
            className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-lg p-6 transition-colors"
          >
            <h3 className="text-white font-medium mb-2">
              Review Submissions
              {pendingCount && pendingCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {pendingCount}
                </span>
              )}
            </h3>
            <p className="text-gray-400 text-sm">
              Approve or reject pending skill submissions
            </p>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-lg p-6 transition-colors"
          >
            <h3 className="text-white font-medium mb-2">Analytics</h3>
            <p className="text-gray-400 text-sm">
              View install stats and trending skills
            </p>
          </Link>
        </div>

        {/* GitHub Sync */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-white mb-1">GitHub Sync</h2>
              <p className="text-gray-400 text-sm">
                Sync skills from configured GitHub repositories
              </p>
            </div>
            <SyncButton />
          </div>

          {/* Recent Sync Logs */}
          {syncLogs && syncLogs.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Recent Syncs</h3>
              {syncLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between text-xs border-t border-[#1a1a1a] pt-2"
                >
                  <span className="text-gray-400">
                    {new Date(log.started_at).toLocaleString()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      log.status === 'success'
                        ? 'bg-green-900/20 text-green-400'
                        : log.status === 'error'
                        ? 'bg-red-900/20 text-red-400'
                        : 'bg-yellow-900/20 text-yellow-400'
                    }`}
                  >
                    {log.status}
                  </span>
                  <span className="text-gray-400">
                    +{log.skills_added} added, ~{log.skills_updated} updated
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Submissions */}
        {submissions && submissions.length > 0 && (
          <PendingSubmissions submissions={submissions} />
        )}
      </div>
    </div>
  )
}
