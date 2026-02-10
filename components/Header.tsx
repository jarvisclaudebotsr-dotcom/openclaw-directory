import Link from 'next/link'
import { Github, User, LogOut, Plus, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    isAdmin = profile ? ['admin', 'moderator'].includes((profile as any).role) : false
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-black/95 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-[17px] font-semibold tracking-tight">
            <span className="text-white">OpenClaw</span>
            <span className="text-[#525252]">Directory</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/skills" className="text-sm text-[#a3a3a3] transition-colors hover:text-white">
            Browse
          </Link>
          <Link href="/categories/development-tools" className="text-sm text-[#a3a3a3] transition-colors hover:text-white">
            Categories
          </Link>
          <a
            href="https://docs.clawd.bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#a3a3a3] transition-colors hover:text-white"
          >
            Docs
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/submit" className="btn-secondary hidden text-sm sm:flex">
                <Plus className="h-4 w-4" />
                Submit
              </Link>
              
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-md bg-[#171717] px-3 py-1.5 text-xs font-medium text-[#a3a3a3] transition-colors hover:text-white"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}

              <div className="flex items-center gap-1 border-l border-[#262626] pl-3">
                <Link
                  href="/profile"
                  className="rounded-md p-2 text-[#737373] transition-colors hover:bg-[#171717] hover:text-white"
                >
                  <User className="h-4 w-4" />
                </Link>
                <form action="/auth/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-md p-2 text-[#737373] transition-colors hover:bg-[#171717] hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <a
                href="https://github.com/clawdbot/openclaw-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-[#737373] transition-colors hover:bg-[#171717] hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <Link href="/auth/login" className="btn-primary text-sm">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
