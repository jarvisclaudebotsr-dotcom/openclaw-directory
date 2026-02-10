import { SkillCardSkeleton } from "./SkillCardSkeleton"

interface LoadingGridProps {
  count?: number
  compact?: boolean
}

export function LoadingGrid({ count = 8, compact = false }: LoadingGridProps) {
  return (
    <div className={compact ? "grid-cards-compact" : "grid-cards"}>
      {Array.from({ length: count }).map((_, i) => (
        <SkillCardSkeleton key={i} compact={compact} />
      ))}
    </div>
  )
}
