'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SubmitForm() {
  const router = useRouter()
  const [githubUrl, setGithubUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          github_url: githubUrl,
          notes,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Skill submitted successfully! It will be reviewed soon.')
        setGithubUrl('')
        setNotes('')
        router.refresh()
      } else {
        setError(data.error || 'Failed to submit skill')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
      <div className="space-y-4">
        {/* GitHub URL */}
        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-white mb-2">
            GitHub Repository URL *
          </label>
          <input
            type="url"
            id="github_url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            required
            placeholder="https://github.com/username/repository"
            className="w-full bg-black border border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a]"
          />
          <p className="mt-2 text-xs text-gray-400">
            Must be a public GitHub repository with a SKILL.md file
          </p>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Any additional information for reviewers..."
            className="w-full bg-black border border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] resize-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || !githubUrl}
          className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send size={18} />
          {submitting ? 'Submitting...' : 'Submit Skill'}
        </button>
      </div>
    </form>
  )
}
