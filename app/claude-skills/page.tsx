import Link from "next/link"
import { Metadata } from "next"
import { getSkills, getCategories } from "@/lib/skills"
import { SkillCard } from "@/components/SkillCard"
import { CategoryNav } from "@/components/CategoryNav"
import { HomeSearch } from "@/components/HomeSearch"
import { ArrowRight, Download, Github, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: 'Claude Skills - AI Agent Skills for Claude Code & Claude.ai',
  description: 'Discover 100+ Claude skills for Claude Code, Claude.ai, and Claude-compatible AI agents. Install community-created skills with one command. Free, open source, and compatible with OpenClaw.',
  keywords: [
    'Claude skills',
    'Claude Code skills',
    'Claude.ai skills',
    'Claude agent skills',
    'AI agent skills',
    'Claude plugins',
    'Claude extensions',
    'OpenClaw Claude',
    'agent skills directory',
  ],
  alternates: {
    canonical: '/claude-skills',
  },
  openGraph: {
    title: 'Claude Skills Directory - 100+ Skills for Claude Code & Claude.ai',
    description: 'Browse and install community-created skills for Claude Code and Claude.ai agents. Compatible with OpenClaw.',
    url: '/claude-skills',
  },
}

export default function ClaudeSkillsPage() {
  const allSkills = getSkills()
  const categories = getCategories()
  const featured = allSkills.filter(s => s.featured).slice(0, 6)
  const totalInstalls = allSkills.reduce((sum, skill) => sum + (skill.installs || 0), 0)

  return (
    <main>
      {/* Hero */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[700px] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#111] px-4 py-2 text-sm text-[#888]">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Optimized for Claude Code & Claude.ai</span>
            </div>
            
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl">
              Claude Skills Directory
            </h1>
            
            <p className="mb-8 text-lg text-[#a3a3a3]">
              Supercharge your Claude Code and Claude.ai agents with {allSkills.length}+ community-created skills. 
              One command to install. Zero configuration. Works with OpenClaw, Cursor, and other Claude-compatible agents.
            </p>
            
            <div className="mx-auto max-w-[480px]">
              <HomeSearch skills={allSkills} />
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 text-sm sm:gap-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{allSkills.length}+</div>
                <div className="text-[#737373]">Skills Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{(totalInstalls / 1000).toFixed(0)}k+</div>
                <div className="text-[#737373]">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-[#737373]">Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What are Claude Skills */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-6 text-center text-3xl font-bold">What are Claude Skills?</h2>
            <div className="space-y-4 text-[#a3a3a3]">
              <p>
                <strong className="text-white">Claude Skills</strong> are modular extensions that give your Claude Code 
                or Claude.ai agent new capabilities. They're packages of instructions, tools, and knowledge that help 
                Claude perform specialized tasks like managing your calendar, analyzing data, deploying code, and more.
              </p>
              <p>
                Skills follow the <strong className="text-white">Agent Skills specification</strong> — an open standard 
                that works across Claude Code, Cursor, Clawdbot, and other OpenClaw-compatible AI agents. Install once, 
                use everywhere.
              </p>
              <div className="mt-6 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] p-6">
                <h3 className="mb-3 font-semibold text-white">Quick Install</h3>
                <code className="block rounded-lg bg-black p-4 font-mono text-sm text-[#888]">
                  clawdhub install skill-name
                </code>
                <p className="mt-3 text-sm text-[#666]">
                  One command installs the skill into your agent's skills directory. No manual setup required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="section-header">
            <h2>Featured Claude Skills</h2>
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

      {/* Use Cases */}
      <section className="section border-b border-[#1a1a1a]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-8 text-center text-3xl font-bold">Popular Use Cases</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Development Automation",
                  description: "Git workflows, deployment scripts, code review tools, and CI/CD integration."
                },
                {
                  title: "Productivity & Tasks",
                  description: "Calendar management, email automation, note-taking, and task tracking."
                },
                {
                  title: "Data & Analytics",
                  description: "Database queries, API integrations, data visualization, and reporting."
                },
                {
                  title: "Content Creation",
                  description: "Writing assistants, image generation, social media automation, and SEO tools."
                }
              ].map((useCase) => (
                <div key={useCase.title} className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
                  <h3 className="mb-2 font-semibold text-white">{useCase.title}</h3>
                  <p className="text-sm text-[#888]">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-[500px] text-center">
            <h2 className="mb-3">Create Your Own Claude Skill</h2>
            <p className="mb-8 text-[#a3a3a3]">
              Share your Claude workflows with the community. Get feedback, find contributors, and help others level up their agents.
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
