import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface SkillCardProps {
  href: string
  title: string
  description: string
  creator: string
  installs?: number
  tags: string[]
}

export function SkillCard({
  href,
  title,
  description,
  creator,
  installs,
  tags,
}: SkillCardProps) {
  const creatorInitials = creator
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Link href={href} className="block h-full w-full">
      <Card className="h-full w-full rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-4 shadow-none transition-colors hover:border-[#2a2a2a]">
        <div className="flex items-center justify-between">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#1a1a1a] text-[10px] text-[#a1a1a1]">
            {title[0]}
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1a1a1a] text-[10px] text-[#a1a1a1]">
            {creatorInitials}
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-white line-clamp-1">
            {title}
          </h3>
          <p className="mt-2 text-xs text-[#a1a1a1] line-clamp-2">
            {description}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-full border-[#1a1a1a] bg-[#0a0a0a] text-[10px] font-medium text-[#a1a1a1]"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-3 text-xs text-[#a1a1a1]">
          {installs ? `${installs} installs` : "New"}
        </div>
      </Card>
    </Link>
  )
}
