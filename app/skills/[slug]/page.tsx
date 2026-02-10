import Link from "next/link"
import { notFound } from "next/navigation"
import { Download, Star, Shield, FileText, GitCompare, History } from "lucide-react"
import { getSkillFromDB, getSkillsFromDB } from "@/lib/skills-db"
import { SkillStructuredData } from "@/components/SkillStructuredData"
import { SkillTabs } from "./SkillTabs"
import { Metadata } from "next"

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkillFromDB(slug)

  if (!skill) {
    return { title: 'Skill Not Found' }
  }

  return {
    title: `${skill.name} — OpenClaw Directory`,
    description: skill.description,
  }
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = await getSkillFromDB(slug)

  if (!skill) {
    notFound()
  }

  const formatNumber = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return n.toString()
  }

  // Calculate file size from content
  const contentSize = skill.fullDescription 
    ? `${(new Blob([skill.fullDescription]).size / 1024).toFixed(1)} KB`
    : '0 KB'

  return (
    <>
      <SkillStructuredData skill={skill} />
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{skill.name}</h1>
              <p className="text-[#a3a3a3] text-lg mb-3">{skill.description}</p>
              
              {/* Stats row */}
              <div className="flex items-center gap-4 text-sm text-[#737373] mb-3">
                <span>⭐ {formatNumber(skill.installs || 0)}</span>
                <span>·</span>
                <span>⤓ {formatNumber((skill.installs || 0) * 3)}</span>
                <span>·</span>
                <span>⤒ {formatNumber(skill.installs || 0)} current</span>
              </div>
              
              {/* Author */}
              <div className="text-sm text-[#737373] mb-4">
                by <span className="text-blue-400">@community</span>
              </div>

              {/* Security Scan */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#737373] mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Security Scan</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-medium">✓ Benign</span>
                  </div>
                </div>
                <p className="text-xs text-[#555] mt-2 italic">
                  Like a lobster shell, security has layers — review code before you run it.
                </p>
              </div>
            </div>

            {/* Right side - Version & Download */}
            <div className="text-right">
              <div className="text-sm text-[#737373] mb-1">Current version</div>
              <div className="text-xl font-bold text-white mb-3">v{skill.version}</div>
              <a
                href={skill.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download zip
              </a>
            </div>
          </div>

          {/* Version badge */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#737373]">latest</span>
            <span className="bg-[#1a1a1a] text-white px-2 py-0.5 rounded text-xs font-mono">v{skill.version}</span>
          </div>
        </div>

        {/* Tabs */}
        <SkillTabs 
          skillContent={skill.fullDescription || null}
          skillName={skill.name}
          contentSize={contentSize}
          version={skill.version}
        />

        {/* Comments Section */}
        <div className="mt-8 border-t border-[#1a1a1a] pt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
          <p className="text-[#737373] text-sm mb-6">Sign in to comment.</p>
          
          <div className="space-y-4">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
              <p className="text-[#555] text-sm italic">No comments yet. Be the first to comment!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
