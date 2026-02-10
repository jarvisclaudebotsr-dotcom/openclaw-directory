import skillsData from "@/data/skills.json"

export interface Skill {
  id: string
  name: string
  emoji: string
  description: string
  version: string
  category: string
  tags: string[]
  githubUrl: string
  installs?: number
  updatedAt: string
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
}

export function getSkills(): Skill[] {
  return skillsData.skills
}

export function getSkill(id: string): Skill | undefined {
  return skillsData.skills.find((skill) => skill.id === id)
}

export function getFeaturedSkills(limit?: number): Skill[] {
  const featured = skillsData.skills.filter((skill) => skill.featured)
  return limit ? featured.slice(0, limit) : featured
}

export function getLatestSkills(limit?: number): Skill[] {
  const sorted = [...skillsData.skills].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
  return limit ? sorted.slice(0, limit) : sorted
}

export function getSkillsByCategory(categoryId: string): Skill[] {
  return skillsData.skills.filter((skill) => 
    skill.category.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-") === categoryId
  )
}

export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase()
  return skillsData.skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getCategories(): Category[] {
  return skillsData.categories
}

export function getCategory(id: string): Category | undefined {
  return skillsData.categories.find((cat) => cat.id === id)
}
