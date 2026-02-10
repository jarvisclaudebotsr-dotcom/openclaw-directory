import Link from "next/link"
import { Download, Clock, Star } from "lucide-react"

interface SkillCardProps {
  id: string
  name: string
  emoji: string
  description: string
  version: string
  category: string
  tags: string[]
  installs?: number
  updatedAt: string
  githubUrl?: string
  githubStars?: number
  similarTo?: string
  featured?: boolean
  compact?: boolean
}

export function SkillCard({
  id,
  name,
  emoji,
  description,
  version,
  category,
  tags,
  installs,
  updatedAt,
  githubStars,
  featured,
  compact,
}: SkillCardProps) {
  const formatInstalls = (count?: number) => {
    if (!count) return "0"
    if (count >= 10000) return `${(count / 1000).toFixed(0)}k`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return count.toString()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "today"
    if (diffDays === 1) return "yesterday"
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
    return `${Math.floor(diffDays / 365)}y ago`
  }

  // Compact card for grids
  if (compact) {
    return (
      <Link 
        href={`/skills/${id}`} 
        className="card group block p-4 transition-all duration-200 hover:border-[#2a2a2a] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#171717] text-lg">
            {emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-white">{name}</h3>
              <span className="text-xs text-[#525252]">v{version}</span>
            </div>
            <p className="mt-1 line-clamp-1 text-sm text-[#737373]">{description}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-[#525252]">
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {formatInstalls(installs)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Check if skill is new (added in last 7 days)
  const isNew = (() => {
    const date = new Date(updatedAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  })()

  // Full card
  return (
    <Link 
      href={`/skills/${id}`} 
      className="card group relative flex flex-col p-5 transition-all duration-200 hover:border-[#2a2a2a] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
    >
      {/* Featured or New badge */}
      {featured ? (
        <div className="badge badge-featured absolute right-4 top-4">
          Featured
        </div>
      ) : isNew ? (
        <div className="absolute right-4 top-4 rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
          New
        </div>
      ) : null}

      {/* Header */}
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#171717] text-xl">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-white group-hover:text-gray-100 transition-colors">{name}</h3>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-[#525252]">
            <span className="text-[#737373]">{category}</span>
            <span>•</span>
            <span>v{version}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 flex-1 text-sm text-[#a3a3a3]">
        {description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded bg-[#171717] px-2 py-0.5 text-xs text-[#737373]"
          >
            #{tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="rounded bg-[#171717] px-2 py-0.5 text-xs text-[#525252]">
            +{tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4 text-xs">
        <div className="flex items-center gap-4 text-[#525252]">
          <span className="flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" />
            <span className="text-[#a3a3a3]">{formatInstalls(installs)}</span>
          </span>
          {githubStars && githubStars > 0 && (
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" />
              <span className="text-[#a3a3a3]">{formatInstalls(githubStars)}</span>
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-[#525252]">
          <Clock className="h-3.5 w-3.5" />
          {formatDate(updatedAt)}
        </span>
      </div>
    </Link>
  )
}
