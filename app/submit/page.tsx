import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitForm } from './submit-form'

export default async function SubmitPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/submit')
  }

  // Get user's previous submissions
  const { data: submissions } = (await supabase
    .from('submissions')
    .select('*')
    .eq('submitted_by', user.id)
    .order('created_at', { ascending: false })
    .limit(5)) as { data: any[] | null }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">
            Submit a Skill
          </h1>
          <p className="text-gray-400 text-sm">
            Share your OpenClaw skill with the community. All submissions are reviewed before being published.
          </p>
        </div>

        {/* Submission Form */}
        <SubmitForm />

        {/* Guidelines */}
        <div className="mt-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Submission Guidelines</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✓ Repository must be public on GitHub</li>
            <li>✓ Must include a SKILL.md file with skill documentation</li>
            <li>✓ Should follow OpenClaw skill structure</li>
            <li>✓ Include clear description and usage examples</li>
            <li>✓ Specify any dependencies or requirements</li>
            <li>✗ No malicious code or security vulnerabilities</li>
            <li>✗ No duplicate submissions of existing skills</li>
          </ul>
        </div>

        {/* Previous Submissions */}
        {submissions && submissions.length > 0 && (
          <div className="mt-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Your Submissions</h2>
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between text-sm border-t border-[#1a1a1a] pt-3 first:border-t-0 first:pt-0"
                >
                  <div>
                    <p className="text-white font-medium">
                      {(submission.skill_data as any)?.name || 'Unnamed Skill'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      submission.status === 'approved'
                        ? 'bg-green-900/20 text-green-400'
                        : submission.status === 'rejected'
                        ? 'bg-red-900/20 text-red-400'
                        : 'bg-yellow-900/20 text-yellow-400'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
