import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'

export interface SkillDB {
  id: string
  name: string
  slug: string
  emoji: string | null
  description: string
  full_description: string | null
  version: string
  category: string
  tags: string[]
  github_url: string
  github_repo: string | null
  github_stars: number
  installs: number
  featured: boolean
  approved: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  emoji: string
  description: string
  fullDescription?: string
  version: string
  category: string
  tags: string[]
  githubUrl: string
  installs?: number
  updatedAt: string
  featured?: boolean
}

function mapDbToSkill(db: SkillDB): Skill {
  return {
    id: db.slug,
    name: db.name,
    emoji: db.emoji || '🔧',
    description: db.description,
    fullDescription: db.full_description || undefined,
    version: db.version,
    category: db.category,
    tags: db.tags || [],
    githubUrl: db.github_url,
    installs: db.installs,
    updatedAt: db.updated_at,
    featured: db.featured,
  }
}

export async function getSkillsFromDB(): Promise<Skill[]> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('approved', true)
    .order('installs', { ascending: false })
  
  if (error || !data) return []
  return data.map(mapDbToSkill)
}

export async function getSkillFromDB(slug: string): Promise<Skill | null> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('slug', slug)
    .eq('approved', true)
    .single()
  
  if (error || !data) return null
  return mapDbToSkill(data)
}

export async function getSkillContentFromDB(slug: string): Promise<string | null> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('full_description')
    .eq('slug', slug)
    .single()
  
  if (error || !data) return null
  return (data as any).full_description
}

export async function getFeaturedSkillsFromDB(limit: number = 6): Promise<Skill[]> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('approved', true)
    .eq('featured', true)
    .order('installs', { ascending: false })
    .limit(limit)
  
  if (error || !data) return []
  return data.map(mapDbToSkill)
}

export async function getLatestSkillsFromDB(limit: number = 12): Promise<Skill[]> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error || !data) return []
  return data.map(mapDbToSkill)
}

export async function getSkillsByCategoryFromDB(category: string): Promise<Skill[]> {
  const supabase = createServiceClient()
  
  // Convert slug back to category name pattern
  const categoryPattern = category.replace(/-/g, ' ')
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('approved', true)
    .ilike('category', `%${categoryPattern}%`)
    .order('installs', { ascending: false })
  
  if (error || !data) return []
  return data.map(mapDbToSkill)
}

export async function searchSkillsFromDB(query: string): Promise<Skill[]> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('approved', true)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('installs', { ascending: false })
    .limit(50)
  
  if (error || !data) return []
  return data.map(mapDbToSkill)
}

export async function getCategoriesFromDB(): Promise<{id: string, name: string, count: number}[]> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('category')
    .eq('approved', true)
  
  if (error || !data) return []
  
  // Count by category
  const counts: Record<string, number> = {}
  for (const row of data as any[]) {
    counts[row.category] = (counts[row.category] || 0) + 1
  }
  
  return Object.entries(counts)
    .map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-'),
      name,
      count
    }))
    .sort((a, b) => b.count - a.count)
}
