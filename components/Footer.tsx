import Link from 'next/link'
import { Github, Twitter, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-black">
      <div className="container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-base font-semibold text-white">
              OpenClaw Directory
            </Link>
            <p className="mt-3 text-sm text-[#737373]">
              The community-powered marketplace for AI agent skills.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://github.com/clawdbot/openclaw-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-[#525252] transition-colors hover:bg-[#171717] hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/clawdbot"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-[#525252] transition-colors hover:bg-[#171717] hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com/invite/clawd"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-[#525252] transition-colors hover:bg-[#171717] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Directory */}
          <div>
            <h4 className="text-sm font-semibold text-white">Directory</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/skills" className="text-[#737373] hover:text-white">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link href="/categories/development-tools" className="text-[#737373] hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-[#737373] hover:text-white">
                  Submit a Skill
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="https://docs.clawd.bot" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/clawdbot/clawdbot" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-white">
                  Clawdbot
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="text-[#737373] hover:text-white">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Empty for alignment on large screens */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#1a1a1a] pt-8 text-xs text-[#525252] sm:flex-row">
          <p>© {new Date().getFullYear()} OpenClaw Community. MIT License.</p>
          <p>Made by the community</p>
        </div>
      </div>
    </footer>
  )
}
