import Link from "next/link"
import { Metadata } from "next"
import { getSkills, getCategories } from "@/lib/skills"
import { SkillCard } from "@/components/SkillCard"
import { CategoryNav } from "@/components/CategoryNav"
import { HomeSearch } from "@/components/HomeSearch"
import { ArrowRight, Zap, Shield, Code2 } from "lucide-react"

export const metadata: Metadata = {
  title: 'AI Agent Tools & Skills Directory - Automation for Claude, Cursor & More',
  description: 'The ultimate directory of AI agent tools and skills. 100+ community-built automations for Claude Code, Cursor, Clawdbot, and OpenClaw agents. Free and open source.',
  keywords: [
    'AI agent tools',
    'agent tools directory',
    'AI automation tools',
    'Claude tools',
    'Cursor tools',
    'OpenClaw tools',
    'agent skills',
    'AI agent plugins',
    'automation directory',
    'agent marketplace',
  ],
  alternates: {
    canonical: '/ai-agent-tools',
  },
  openGraph: {
    title: 'AI Agent Tools & Skills Directory - 100+ Automation Tools',
    description: 'Discover tools and skills for AI agents: Claude Code, Cursor, Clawdbot, and OpenClaw. Free, open source, one-click install.',
    url: '/ai-agent-tools',
  },
}

export default function AIAgentToolsPage() {
  const allSkills = getSkills()
  const categories = getCategories()
  const popular = [...allSkills].sort((a, b) => (b.installs || 0) - (a.installs || 0)).slice(0, 8)
  const totalInstalls = allSkills.reduce((sum, skill) => sum + (skill.installs || 0), 0)

  return (
    <main>
      {/* Hero */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[700px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#111] px-4 py-2 text-sm text-[#888]">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span>Works with Claude, Cursor, Clawdbot & More</span>
            </div>
            
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl">
              AI Agent Tools Directory
            </h1>
            
            <p className="mb-8 text-lg text-[#a3a3a3]">
              The most comprehensive directory of tools and skills for AI coding agents. 
              Browse {allSkills.length}+ community-built automations that work across 
              Claude Code, Cursor, Clawdbot, and OpenClaw-compatible agents.
            </p>
            
            <div className="mx-auto max-w-[480px]">
              <HomeSearch skills={allSkills} />
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{allSkills.length}+</div>
                <div className="text-sm text-[#737373]">Tools & Skills</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{(totalInstalls / 1000).toFixed(0)}k+</div>
                <div className="text-sm text-[#737373]">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{categories.length}</div>
                <div className="text-sm text-[#737373]">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#111]">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">One-Click Install</h3>
              <p className="text-sm text-[#888]">
                Install any tool with a single command. Works with ClawdHub CLI or direct GitHub integration.
              </p>
            </div>
            
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#111]">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">100% Open Source</h3>
              <p className="text-sm text-[#888]">
                Every tool is open source. Inspect the code, fork, modify, and contribute back to the community.
              </p>
            </div>
            
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#111]">
                <Code2 className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Cross-Platform</h3>
              <p className="text-sm text-[#888]">
                Built on the Agent Skills spec. Install once, works across Claude Code, Cursor, Clawdbot, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="section-header">
            <h2>Most Popular AI Agent Tools</h2>
            <Link
              href="/skills?sort=popular"
              className="flex items-center gap-1 text-sm text-[#737373] transition-colors hover:text-white"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid-cards-compact">
            {popular.map((skill) => (
              <SkillCard key={skill.id} {...skill} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="section-header">
            <h2>Tool Categories</h2>
            <Link 
              href="/skills" 
              className="flex items-center gap-1 text-sm text-[#737373] transition-colors hover:text-white"
            >
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CategoryNav categories={categories} />
        </div>
      </section>

      {/* What You Can Build */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-8 text-center text-3xl font-bold">What Can You Build?</h2>
            <div className="space-y-6">
              <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">🚀 Developer Tools</h3>
                <p className="text-[#888]">
                  Git automation, CI/CD pipelines, code review bots, deployment scripts, API testing, 
                  database management, Docker orchestration, and infrastructure-as-code tools.
                </p>
              </div>
              
              <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">📊 Data & Analytics</h3>
                <p className="text-[#888]">
                  SQL query builders, data visualization, CSV processors, API connectors, 
                  web scrapers, report generators, and business intelligence dashboards.
                </p>
              </div>
              
              <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">⚙️ Automation & Workflows</h3>
                <p className="text-[#888]">
                  Email automation, calendar integration, file management, backup scripts, 
                  notification systems, task schedulers, and custom workflow orchestration.
                </p>
              </div>
              
              <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
                <h3 className="mb-3 text-lg font-semibold text-white">🎨 Creative Tools</h3>
                <p className="text-[#888]">
                  Content generation, image processing, social media schedulers, SEO optimizers, 
                  writing assistants, and multi-modal AI integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-3">Share Your AI Agent Tools</h2>
            <p className="mb-8 text-[#a3a3a3]">
              Built something useful? Share it with the community! Submit your tools, get feedback, 
              and help others supercharge their AI agents.
            </p>
            <Link href="/submit" className="btn-primary">
              Submit Your Tool
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
