"use client"

import { useState, useMemo } from "react"
import { SearchBar } from "@/components/SearchBar"
import { SkillCard } from "@/components/SkillCard"
import type { Skill } from "@/lib/skills"

interface HomeSearchProps {
  skills: Skill[]
}

export function HomeSearch({ skills }: HomeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "name">("popular")

  const searchResults = useMemo(() => {
    if (!searchQuery) return null
    
    const lowerQuery = searchQuery.toLowerCase()
    const results = skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(lowerQuery) ||
        skill.description.toLowerCase().includes(lowerQuery) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )

    switch (sortBy) {
      case "popular":
        return results.sort((a, b) => (b.installs || 0) - (a.installs || 0))
      case "recent":
        return results.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      case "name":
        return results.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return results
    }
  }, [skills, searchQuery, sortBy])

  return (
    <>
      <SearchBar
        placeholder="Search skills by name, category, or keyword..."
        onSearch={setSearchQuery}
        className="w-full"
      />

      {/* Search Results */}
      {searchResults && (
        <div className="mt-8 text-left">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#737373]">
              Found {searchResults.length} {searchResults.length === 1 ? "skill" : "skills"} for "{searchQuery}"
            </p>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-md border border-[#262626] bg-[#0a0a0a] px-3 py-1.5 text-xs text-white focus:border-[#404040] focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Updated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {searchResults.slice(0, 6).map((skill) => (
                <SkillCard key={skill.id} {...skill} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-[#737373]">No skills match your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-sm text-white underline hover:no-underline"
              >
                Clear search
              </button>
            </div>
          )}
          
          {searchResults.length > 6 && (
            <div className="mt-4 text-center">
              <a
                href={`/skills?q=${encodeURIComponent(searchQuery)}`}
                className="text-sm text-white underline hover:no-underline"
              >
                View all {searchResults.length} results →
              </a>
            </div>
          )}
        </div>
      )}
    </>
  )
}
