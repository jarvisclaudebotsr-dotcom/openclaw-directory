import { Octokit } from '@octokit/rest'
import { createServiceClient } from './supabase/server'
import matter from 'gray-matter'

interface SkillMetadata {
  name: string
  emoji?: string
  description: string
  version: string
  category: string
  tags: string[]
  dependencies?: {
    bins?: string[]
    env?: string[]
    config?: string[]
  }
}

export class GitHubSyncService {
  private octokit: Octokit
  private supabase: any

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })
    this.supabase = createServiceClient()
  }

  /**
   * Scan specified GitHub repositories for SKILL.md files
   */
  async syncAllRepos(): Promise<{
    success: boolean
    reposScanned: number
    skillsAdded: number
    skillsUpdated: number
    errors: Array<{ repo: string; error: string }>
  }> {
    const repos = (process.env.GITHUB_REPOS || '').split(',').filter(Boolean)
    const results = {
      success: true,
      reposScanned: 0,
      skillsAdded: 0,
      skillsUpdated: 0,
      errors: [] as Array<{ repo: string; error: string }>,
    }

    for (const repo of repos) {
      try {
        const [owner, repoName] = repo.trim().split('/')
        await this.syncRepo(owner, repoName, results)
        results.reposScanned++
      } catch (error) {
        results.success = false
        results.errors.push({
          repo,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return results
  }

  /**
   * Sync a single repository
   */
  private async syncRepo(
    owner: string,
    repo: string,
    results: { skillsAdded: number; skillsUpdated: number }
  ): Promise<void> {
    try {
      // Get repository contents
      const { data: contents } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: 'skills',
      })

      if (!Array.isArray(contents)) {
        return
      }

      // Process each skill directory
      for (const item of contents) {
        if (item.type === 'dir') {
          await this.processSkillDirectory(owner, repo, item.name, results)
        }
      }
    } catch (error) {
      console.error(`Error syncing repo ${owner}/${repo}:`, error)
      throw error
    }
  }

  /**
   * Process a single skill directory
   */
  private async processSkillDirectory(
    owner: string,
    repo: string,
    skillName: string,
    results: { skillsAdded: number; skillsUpdated: number }
  ): Promise<void> {
    try {
      // Fetch SKILL.md
      const { data: skillMdData } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: `skills/${skillName}/SKILL.md`,
      })

      if ('content' in skillMdData) {
        const content = Buffer.from(skillMdData.content, 'base64').toString('utf-8')
        const metadata = this.parseSkillMetadata(content, skillName)

        // Fetch package.json if exists
        let packageData
        try {
          const { data: pkgData } = await this.octokit.repos.getContent({
            owner,
            repo,
            path: `skills/${skillName}/package.json`,
          })
          if ('content' in pkgData) {
            packageData = JSON.parse(Buffer.from(pkgData.content, 'base64').toString('utf-8'))
          }
        } catch {
          // package.json is optional
        }

        // Get GitHub stars
        const { data: repoData } = await this.octokit.repos.get({ owner, repo })

        // Create or update skill in database
        const skillData = {
          name: metadata.name,
          slug: this.createSlug(metadata.name),
          emoji: metadata.emoji || '📦',
          description: metadata.description,
          full_description: content,
          version: packageData?.version || metadata.version || '1.0.0',
          category: metadata.category,
          tags: metadata.tags,
          github_url: `https://github.com/${owner}/${repo}/tree/main/skills/${skillName}`,
          github_repo: `${owner}/${repo}`,
          github_stars: repoData.stargazers_count,
          metadata: {
            dependencies: metadata.dependencies || {},
            repository: packageData?.repository,
            keywords: packageData?.keywords,
          },
          synced_at: new Date().toISOString(),
          approved: true, // Auto-approve skills from trusted repos
        }

        // Check if skill exists
        const { data: existing } = await this.supabase
          .from('skills')
          .select('id, version')
          .eq('slug', skillData.slug)
          .single()

        if (existing) {
          // Update existing skill
          await this.supabase
            .from('skills')
            .update(skillData)
            .eq('id', existing.id)
          results.skillsUpdated++
        } else {
          // Insert new skill
          await this.supabase.from('skills').insert(skillData)
          results.skillsAdded++
        }
      }
    } catch (error) {
      console.error(`Error processing skill ${skillName}:`, error)
      throw error
    }
  }

  /**
   * Parse SKILL.md frontmatter and content
   */
  private parseSkillMetadata(content: string, fallbackName: string): SkillMetadata {
    try {
      const { data, content: markdownContent } = matter(content)

      return {
        name: data.name || fallbackName,
        emoji: data.emoji,
        description: data.description || markdownContent.split('\n')[0] || '',
        version: data.version || '1.0.0',
        category: data.category || 'Other',
        tags: data.tags || [],
        dependencies: data.dependencies,
      }
    } catch (error) {
      // If no frontmatter, extract from markdown
      const lines = content.split('\n')
      const firstHeading = lines.find((line) => line.startsWith('# '))
      const description = lines.find((line) => line.trim() && !line.startsWith('#'))

      return {
        name: fallbackName,
        description: description || '',
        version: '1.0.0',
        category: 'Other',
        tags: [],
      }
    }
  }

  /**
   * Create URL-safe slug
   */
  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
}
