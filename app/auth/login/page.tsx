import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LoginButton } from './login-button'

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Sign in to OpenClaw Directory
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in with GitHub to submit skills and access admin features
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8">
          <LoginButton />

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to directory
          </a>
        </div>
      </div>
    </div>
  )
}
