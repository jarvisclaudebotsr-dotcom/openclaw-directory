import { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openclawdirectory.ai'
  const supabase = createServiceClient() as any

  // Fetch all approved skills
  const { data: skills } = await supabase
    .from('skills')
    .select('slug, updated_at')
    .eq('approved', true)

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')

  const skillUrls =
    skills?.map((skill) => ({
      url: `${baseUrl}/skills/${skill.slug}`,
      lastModified: new Date(skill.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) || []

  const categoryUrls =
    categories?.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...skillUrls,
    ...categoryUrls,
  ]
}
