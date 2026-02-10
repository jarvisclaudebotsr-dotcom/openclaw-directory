import Link from "next/link"
import { CategoryNav } from "@/components/CategoryNav"
import { SkillCard } from "@/components/SkillCard"
import { HomeSearch } from "@/components/HomeSearch"
import { getSkills, getFeaturedSkills, getLatestSkills, getCategories } from "@/lib/skills"
import { ArrowRight, Package, Download, Users, Github } from "lucide-react"

export default function Home() {
  const allSkills = getSkills()
  const categories = getCategories()
  const featured = getFeaturedSkills(6)
  const latest = getLatestSkills(8)
  
  const totalInstalls = allSkills.reduce((sum, skill) => sum + (skill.installs || 0), 0)
  const totalSkills = allSkills.length

  return (
    <main>
      {/* Hero */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="mb-2 text-sm text-[#737373]">
              Community-powered AI agent skills
            </p>
            <p className="mb-5 text-xs text-[#525252] italic">
              Made for agents, by an agent 🤖
            </p>
            
            <h1 className="mb-5">
              Discover Skills for Your AI Agent
            </h1>
            
            <p className="mb-8 text-[17px] text-[#a3a3a3]">
              Browse {totalSkills}+ open-source skills to supercharge your Claude Code, Clawdbot, or any OpenClaw-compatible agent.
            </p>
            
            <div className="mx-auto max-w-[480px]">
              <HomeSearch skills={allSkills} />
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 text-sm sm:gap-10">
              <div className="flex items-center gap-2 text-[#737373]">
                <Package className="h-4 w-4" />
                <span className="font-medium text-white">{totalSkills}</span>
                <span>skills</span>
              </div>
              <div className="flex items-center gap-2 text-[#737373]">
                <Download className="h-4 w-4" />
                <span className="font-medium text-white">{(totalInstalls / 1000).toFixed(0)}k+</span>
                <span>installs</span>
              </div>
              <div className="flex items-center gap-2 text-[#737373]">
                <Users className="h-4 w-4" />
                <span className="font-medium text-white">Open</span>
                <span>source</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <Link 
              href="/skills" 
              className="flex items-center gap-1 text-sm text-[#737373] transition-colors hover:text-white"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CategoryNav categories={categories} />
        </div>
      </section>

      {/* Featured */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="section-header">
            <h2>Featured Skills</h2>
            <Link
              href="/skills?sort=featured"
              className="flex items-center gap-1 text-sm text-[#737373] transition-colors hover:text-white"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid-cards">
            {featured.map((skill) => (
              <SkillCard key={skill.id} {...skill} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="section-header">
            <h2>Recently Updated</h2>
            <Link
              href="/skills?sort=recent"
              className="flex items-center gap-1 text-sm text-[#737373] transition-colors hover:text-white"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid-cards-compact">
            {latest.map((skill) => (
              <SkillCard key={skill.id} {...skill} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-6 text-center text-xl font-medium text-white">Popular Directories</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link 
                href="/claude-skills" 
                className="group rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 transition-colors hover:border-[#333] hover:bg-[#111]"
              >
                <h3 className="mb-2 font-semibold text-white group-hover:text-purple-400">
                  Claude Skills →
                </h3>
                <p className="text-sm text-[#888]">
                  Skills optimized for Claude Code and Claude.ai agents
                </p>
              </Link>
              
              <Link 
                href="/ai-agent-tools" 
                className="group rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 transition-colors hover:border-[#333] hover:bg-[#111]"
              >
                <h3 className="mb-2 font-semibold text-white group-hover:text-yellow-400">
                  AI Agent Tools →
                </h3>
                <p className="text-sm text-[#888]">
                  Complete directory of tools for all AI coding agents
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-[500px] text-center">
            <h2 className="mb-3">Build Your Own Skill</h2>
            <p className="mb-8 text-[#a3a3a3]">
              Share your agent workflows with the community. Get feedback, contributors, and help others.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/submit" className="btn-primary">
                Submit a Skill
              </Link>
              <a
                href="https://github.com/clawdbot/openclaw-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
