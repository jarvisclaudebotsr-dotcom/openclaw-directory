"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { SkillCard } from "@/components/SkillCard"
import { CategoryNav } from "@/components/CategoryNav"
import { SearchBar } from "@/components/SearchBar"
import { ArrowUpDown, Package } from "lucide-react"
import type { Skill, Category } from "@/lib/skills"

interface CategoryPageClientProps {
  category: Category
  skills: Skill[]
  categories: Category[]
  categoryId: string
}

type SortOption = "popular" | "recent" | "name"

export function CategoryPageClient({ 
  category, 
  skills: allSkills, 
  categories,
  categoryId 
}: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("popular")

  // Filter and sort
  const filteredSkills = useMemo(() => {
    let skills = searchQuery 
      ? allSkills.filter(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : [...allSkills]
    
    switch (sortBy) {
      case "popular":
        return skills.sort((a, b) => (b.installs || 0) - (a.installs || 0))
      case "recent":
        return skills.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      case "name":
        return skills.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return skills
    }
  }, [allSkills, searchQuery, sortBy])

  // Calculate stats
  const totalInstalls = allSkills.reduce((sum, skill) => sum + (skill.installs || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-[#1a1a1a] bg-gradient-to-r from-[#0a0a0a] to-[#111] p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#111] text-4xl">
            {category.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white">{category.name}</h1>
            <p className="mt-2 text-[#888]">{category.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-[#666]">
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                <strong className="text-white">{allSkills.length}</strong> skills
              </span>
              <span>•</span>
              <span>
                <strong className="text-white">{(totalInstalls / 1000).toFixed(0)}k+</strong> total installs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav categories={categories} activeCategory={categoryId} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <SearchBar
          placeholder={`Search in ${category.name}...`}
          onSearch={setSearchQuery}
          className="w-full sm:w-64"
        />
        
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
          </select>
        </div>
      </div>

      {/* Results Info */}
      <p className="text-sm text-[#666]">
        {searchQuery 
          ? `Found ${filteredSkills.length} ${filteredSkills.length === 1 ? "skill" : "skills"} matching "${searchQuery}"`
          : `${filteredSkills.length} ${filteredSkills.length === 1 ? "skill" : "skills"} in this category`
        }
      </p>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-12 text-center">
          <p className="text-[#666]">
            {searchQuery 
              ? `No skills found for "${searchQuery}"`
              : "No skills in this category yet"
            }
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm text-white underline hover:no-underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="rounded-xl border border-dashed border-[#2a2a2a] p-8 text-center">
        <p className="text-sm text-[#666]">
          Have a skill for {category.name}?
        </p>
        <Link
          href="/submit"
          className="mt-3 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Submit Your Skill
        </Link>
      </div>
    </div>
  )
}
