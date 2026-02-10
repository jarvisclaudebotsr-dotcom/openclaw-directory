export function SkillCardSkeleton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="card block p-4 animate-pulse">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#171717]" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-[#171717]" />
            <div className="h-3 w-full rounded bg-[#171717]" />
            <div className="flex items-center gap-4">
              <div className="h-3 w-16 rounded bg-[#171717]" />
              <div className="h-3 w-16 rounded bg-[#171717]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card flex flex-col p-5 animate-pulse">
      <div className="mb-4 flex items-start gap-3">
        <div className="h-11 w-11 flex-shrink-0 rounded-lg bg-[#171717]" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 w-40 rounded bg-[#171717]" />
          <div className="h-3 w-32 rounded bg-[#171717]" />
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="h-3 w-full rounded bg-[#171717]" />
        <div className="h-3 w-3/4 rounded bg-[#171717]" />
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <div className="h-6 w-16 rounded bg-[#171717]" />
        <div className="h-6 w-20 rounded bg-[#171717]" />
        <div className="h-6 w-14 rounded bg-[#171717]" />
      </div>

      <div className="flex items-center justify-between border-t border-[#1a1a1a] pt-4">
        <div className="h-3 w-20 rounded bg-[#171717]" />
        <div className="h-3 w-16 rounded bg-[#171717]" />
      </div>
    </div>
  )
}
