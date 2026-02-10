import { Suspense } from "react"
import { SkillsPageClient } from "./SkillsPageClient"
import { getSkills, getCategories } from "@/lib/skills"

function SkillsLoading() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-48 animate-pulse rounded-lg bg-[#111]" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-[#111]" />
        ))}
      </div>
    </div>
  )
}

export default function SkillsPage() {
  const skills = getSkills()
  const categories = getCategories()

  return (
    <Suspense fallback={<SkillsLoading />}>
      <SkillsPageClient skills={skills} categories={categories} />
    </Suspense>
  )
}
