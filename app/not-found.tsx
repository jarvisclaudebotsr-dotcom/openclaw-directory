import Link from "next/link"
import { SearchX, Home, Package, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#171717] text-[#525252]">
            <SearchX className="h-10 w-10" />
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="mb-8 text-lg text-[#a3a3a3]">
          The skill or page you're looking for doesn't exist.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-opacity hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 rounded-lg border border-[#2a2a2a] px-6 py-3 font-medium text-white transition-colors hover:border-white"
          >
            <Package className="h-4 w-4" />
            Browse Skills
          </Link>
        </div>

        <div className="mt-8 text-sm text-[#737373]">
          <p>Need help?</p>
          <a
            href="https://github.com/clawdbot/openclaw-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-white underline hover:no-underline"
          >
            Report an issue on GitHub →
          </a>
        </div>
      </div>
    </div>
  )
}
