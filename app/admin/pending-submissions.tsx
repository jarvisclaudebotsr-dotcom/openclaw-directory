'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'

interface Submission {
  id: string
  github_url: string
  skill_data: any
  created_at: string
  submitted_by_profile: {
    username: string
    avatar_url: string
  }
}

export function PendingSubmissions({ submissions: initialSubmissions }: { submissions: any[] }) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [processing, setProcessing] = useState<string | null>(null)

  const handleApprove = async (id: string) => {
    if (!confirm('Approve this skill submission?')) return

    setProcessing(id)
    try {
      const response = await fetch(`/api/admin/submissions/${id}/approve`, {
        method: 'POST',
      })

      if (response.ok) {
        setSubmissions(submissions.filter((s) => s.id !== id))
      } else {
        alert('Failed to approve submission')
      }
    } catch (error) {
      console.error('Error approving:', error)
      alert('Failed to approve submission')
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (id: string) => {
    const reason = prompt('Rejection reason (optional):')
    if (reason === null) return // Cancelled

    setProcessing(id)
    try {
      const response = await fetch(`/api/admin/submissions/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })

      if (response.ok) {
        setSubmissions(submissions.filter((s) => s.id !== id))
      } else {
        alert('Failed to reject submission')
      }
    } catch (error) {
      console.error('Error rejecting:', error)
      alert('Failed to reject submission')
    } finally {
      setProcessing(null)
    }
  }

  if (submissions.length === 0) {
    return null
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
      <h2 className="text-lg font-medium text-white mb-4">Pending Submissions</h2>

      <div className="space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="border border-[#1a1a1a] rounded-lg p-4 hover:border-[#2a2a2a] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {submission.submitted_by_profile?.avatar_url && (
                  <img
                    src={submission.submitted_by_profile.avatar_url}
                    alt={submission.submitted_by_profile.username}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-white font-medium">
                    {submission.skill_data?.name || 'Unnamed Skill'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    by @{submission.submitted_by_profile?.username || 'unknown'} •{' '}
                    {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <a
                href={submission.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              {submission.skill_data?.description || 'No description provided'}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(submission.id)}
                disabled={processing === submission.id}
                className="flex-1 bg-green-900/20 border border-green-900/50 text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Approve
              </button>

              <button
                onClick={() => handleReject(submission.id)}
                disabled={processing === submission.id}
                className="flex-1 bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <XCircle size={16} />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
