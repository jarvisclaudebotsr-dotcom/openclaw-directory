"use client"

import { Github, Share2 } from "lucide-react"

interface ActionsSidebarProps {
  githubUrl: string
}

export function ActionsSidebar({ githubUrl }: ActionsSidebarProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="space-y-3 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
      >
        <Github className="h-4 w-4" />
        View Source
      </a>
      <button
        onClick={handleShare}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#2a2a2a] px-4 py-3 text-sm text-white transition-colors hover:border-white"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  )
}
