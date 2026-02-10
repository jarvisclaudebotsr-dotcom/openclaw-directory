import { Suspense } from "react"
import { SkillsPageClient } from "./SkillsPageClient"
import { getSkillsFromDB, getCategoriesFromDB } from "@/lib/skills-db"

export const dynamic = 'force-dynamic'
export const revalidate = 60

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

export default async function SkillsPage() {
  const skills = await getSkillsFromDB()
  const categoriesDB = await getCategoriesFromDB()
  
  // Convert to expected format
  const categories = categoriesDB.map(c => ({
    id: c.id,
    name: c.name,
    description: `${c.count} skills`,
    icon: '📦'
  }))

  return (
    <Suspense fallback={<SkillsLoading />}>
      <SkillsPageClient skills={skills} categories={categories} />
    </Suspense>
  )
}
