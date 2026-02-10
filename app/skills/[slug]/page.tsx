import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Download, Star, Clock, Tag, Github, Share2, BookOpen, Code } from "lucide-react"
import { InstallCommand } from "@/components/InstallCommand"
import { SkillCard } from "@/components/SkillCard"
import { SkillContent } from "@/components/SkillContent"
import { getSkillFromDB, getSkillsFromDB, getSkillsByCategoryFromDB } from "@/lib/skills-db"
import { ActionsSidebar } from "./ActionsSidebar"
import { SkillStructuredData } from "@/components/SkillStructuredData"
import { Metadata } from "next"

export const dynamic = 'force-dynamic'
export const revalidate = 60 // Revalidate every 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkillFromDB(slug)

  if (!skill) {
    return {
      title: 'Skill Not Found',
      description: 'The requested skill could not be found.',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openclawdirectory.ai'
  const skillUrl = `${baseUrl}/skills/${skill.id}`
  
  return {
    title: `${skill.name} - OpenClaw Skill | ${skill.category}`,
    description: `${skill.description} Install this ${skill.category.toLowerCase()} skill for Clawdbot, Claude Code, and OpenClaw-compatible AI agents. ${skill.installs ? `${(skill.installs / 1000).toFixed(0)}k+ installs.` : ''}`,
    keywords: [
      skill.name,
      ...skill.tags,
      'OpenClaw',
      'Clawdbot',
      'Claude Code',
      'AI agent',
      'agent skill',
      skill.category,
      'automation',
      'AI tools',
    ],
    authors: [{ name: 'OpenClaw Community' }],
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: skillUrl,
      title: `${skill.name} - OpenClaw Skill`,
      description: skill.description,
      siteName: 'OpenClaw Directory',
    },
    twitter: {
      card: 'summary',
      title: `${skill.name} ${skill.emoji}`,
      description: skill.description,
    },
    alternates: {
      canonical: skillUrl,
    },
  }
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = await getSkillFromDB(slug)

  if (!skill) {
    notFound()
  }

  // Get related skills (same category, excluding current)
  const allSkills = await getSkillsFromDB()
  const relatedSkills = allSkills
    .filter((s) => s.category === skill.category && s.id !== skill.id)
    .slice(0, 3)

  // Get skills with similar tags
  const similarByTag = allSkills
    .filter((s) => 
      s.id !== skill.id && 
      s.tags.some(tag => skill.tags.includes(tag))
    )
    .slice(0, 3)

  const formatInstalls = (count?: number) => {
    if (!count) return "0"
    if (count >= 10000) return `${(count / 1000).toFixed(0)}k`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return count.toString()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "today"
    if (diffDays === 1) return "yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <>
      <SkillStructuredData skill={skill} />
      <div className="mx-auto max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[#555]">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/skills" className="hover:text-white">Skills</Link>
        <span>/</span>
        <Link 
          href={`/categories/${skill.category.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-")}`} 
          className="hover:text-white"
        >
          {skill.category}
        </Link>
        <span>/</span>
        <span className="text-white">{skill.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header */}
          <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[#111] text-4xl">
                {skill.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-white">{skill.name}</h1>
                    <p className="mt-2 text-[#888]">{skill.description}</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#666]">
                  <span className="flex items-center gap-1.5">
                    <Download className="h-4 w-4" />
                    <strong className="text-white">{formatInstalls(skill.installs)}</strong> installs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Updated {formatRelativeDate(skill.updatedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4" />
                    v{skill.version}
                  </span>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/skills?tag=${tag}`}
                      className="rounded-lg bg-[#111] px-3 py-1.5 text-xs text-[#888] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-[#666]" />
              <h2 className="text-lg font-medium text-white">Quick Install</h2>
            </div>
            <InstallCommand skillName={skill.name} />
            
            <div className="mt-4 rounded-lg bg-[#111] p-4">
              <p className="text-xs text-[#666]">
                <strong className="text-[#888]">Tip:</strong> Make sure you have the ClawdHub CLI installed. 
                Run <code className="rounded bg-[#1a1a1a] px-1.5 py-0.5 font-mono text-[#a1a1a1]">npm install -g clawdhub</code> first.
              </p>
            </div>
          </div>

          {/* Full Skill Content - Copy/Paste */}
          <SkillContent content={skill.fullDescription || null} skillName={skill.name} />

          {/* Related Skills */}
          {similarByTag.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-white">People Also Use</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {similarByTag.map((s) => (
                  <SkillCard key={s.id} {...s} compact />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <ActionsSidebar githubUrl={skill.githubUrl} />

          {/* Info Card */}
          <div className="space-y-4 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4">
            <h3 className="text-sm font-medium text-white">Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#666]">Version</dt>
                <dd className="font-mono text-white">{skill.version}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#666]">Category</dt>
                <dd className="text-white">{skill.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#666]">Installs</dt>
                <dd className="text-white">{formatInstalls(skill.installs)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#666]">Updated</dt>
                <dd className="text-white">{formatDate(skill.updatedAt)}</dd>
              </div>
            </dl>
          </div>

          {/* Category Skills */}
          {relatedSkills.length > 0 && (
            <div className="space-y-4 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">More in {skill.category}</h3>
                <Link 
                  href={`/categories/${skill.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs text-[#666] hover:text-white"
                >
                  View all →
                </Link>
              </div>
              <div className="space-y-2">
                {relatedSkills.map((s) => (
                  <Link
                    key={s.id}
                    href={`/skills/${s.id}`}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#111]"
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-white">{s.name}</p>
                      <p className="text-xs text-[#666]">{formatInstalls(s.installs)} installs</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
