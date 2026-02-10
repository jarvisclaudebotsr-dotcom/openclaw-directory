"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SkillCard } from "@/components/SkillCard"
import { SearchBar } from "@/components/SearchBar"
import { CategoryNav } from "@/components/CategoryNav"
import { SlidersHorizontal, Grid3X3, List, ArrowUpDown } from "lucide-react"
import type { Skill, Category } from "@/lib/skills"

type SortOption = "popular" | "recent" | "name" | "installs-asc"
type ViewMode = "grid" | "list"

interface SkillsPageClientProps {
  skills: Skill[]
  categories: Category[]
}

export function SkillsPageClient({ skills: allSkills, categories }: SkillsPageClientProps) {
  const searchParams = useSearchParams()
  const initialSort = (searchParams.get("sort") as SortOption) || "popular"
  
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>(initialSort)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allSkills.forEach(skill => skill.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [allSkills])

  // Search function
  const searchSkills = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return allSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(lowerQuery) ||
        skill.description.toLowerCase().includes(lowerQuery) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
  }
  
  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let skills = searchQuery ? searchSkills(searchQuery) : [...allSkills]
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      skills = skills.filter(skill => 
        selectedTags.some(tag => skill.tags.includes(tag))
      )
    }
    
    // Sort
    switch (sortBy) {
      case "popular":
        return skills.sort((a, b) => (b.installs || 0) - (a.installs || 0))
      case "recent":
        return skills.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      case "name":
        return skills.sort((a, b) => a.name.localeCompare(b.name))
      case "installs-asc":
        return skills.sort((a, b) => (a.installs || 0) - (b.installs || 0))
      default:
        return skills
    }
  }, [allSkills, searchQuery, sortBy, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Browse Skills</h1>
            <p className="mt-1 text-sm text-[#666]">
              {filteredSkills.length} {filteredSkills.length === 1 ? "skill" : "skills"} available
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <SearchBar
              placeholder="Search..."
              onSearch={setSearchQuery}
              className="w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav categories={categories} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              showFilters || selectedTags.length > 0
                ? "border-white bg-white text-black"
                : "border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-white"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {selectedTags.length > 0 && (
              <span className="rounded-full bg-black px-1.5 text-xs text-white">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-[#555]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-[#2a2a2a] bg-transparent py-1.5 pl-2 pr-8 text-sm text-white focus:border-white focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Updated</option>
              <option value="name">Name A-Z</option>
              <option value="installs-asc">Newest First</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="hidden items-center gap-1 rounded-lg border border-[#2a2a2a] p-1 sm:flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-1.5 transition-colors ${
                viewMode === "grid" ? "bg-white text-black" : "text-[#666] hover:text-white"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-1.5 transition-colors ${
                viewMode === "list" ? "bg-white text-black" : "text-[#666] hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Filter by Tag</span>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-xs text-[#666] hover:text-white"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-white text-black"
                    : "bg-[#111] text-[#888] hover:bg-[#1a1a1a] hover:text-white"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {filteredSkills.length > 0 ? (
        <div className={
          viewMode === "grid" 
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col gap-3"
        }>
          {filteredSkills.map((skill) => (
            <SkillCard 
              key={skill.id} 
              {...skill} 
              compact={viewMode === "list"}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-12 text-center">
          <p className="text-[#666]">
            {searchQuery 
              ? `No skills found for "${searchQuery}"`
              : selectedTags.length > 0
                ? "No skills match the selected filters"
                : "No skills found"
            }
          </p>
          {(searchQuery || selectedTags.length > 0) && (
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedTags([])
              }}
              className="mt-4 text-sm text-white underline hover:no-underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
