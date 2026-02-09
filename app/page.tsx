import Link from "next/link"

import { SearchInput } from "@/components/SearchInput"
import { SectionHeader } from "@/components/SectionHeader"
import { SkillCard } from "@/components/SkillCard"

const featuredSkills = [
  {
    id: "collab-briefs",
    title: "Client Briefs Organizer",
    description: "Collect, structure, and summarize client briefs with reusable templates.",
    creator: "Signal Studio",
    installs: 1204,
    tags: ["Productivity", "Ops"],
  },
  {
    id: "deploy-watch",
    title: "Deploy Watchdog",
    description: "Monitor deployments, summarize changes, and surface rollback risks.",
    creator: "Opsline",
    installs: 982,
    tags: ["Development", "DevOps"],
  },
  {
    id: "meeting-synth",
    title: "Meeting Synth",
    description: "Turn transcripts into crisp follow-ups, action items, and owners.",
    creator: "Timewise",
    installs: 811,
    tags: ["Productivity", "Teams"],
  },
  {
    id: "qa-harness",
    title: "QA Harness",
    description: "Generate test checklists, run scripts, and log defects automatically.",
    creator: "Slate QA",
    installs: 645,
    tags: ["Development", "Testing"],
  },
]

const productivitySkills = [
  {
    id: "workflow-pilot",
    title: "Workflow Pilot",
    description: "Automate recurring checklists, approvals, and weekly reporting.",
    creator: "Productivity Hub",
    installs: 902,
    tags: ["Automation", "Planning"],
  },
  {
    id: "inbox-copilot",
    title: "Inbox Copilot",
    description: "Sort, draft, and prioritize email with custom routing rules.",
    creator: "Mail Studio",
    installs: 731,
    tags: ["Email", "Ops"],
  },
  {
    id: "calendar-optimizer",
    title: "Calendar Optimizer",
    description: "Balance focus time and meetings with smart scheduling logic.",
    creator: "Timewise",
    installs: 518,
    tags: ["Scheduling", "Teams"],
  },
  {
    id: "notes-mesh",
    title: "Notes Mesh",
    description: "Link meeting notes, project docs, and tasks into one workspace.",
    creator: "Signal Studio",
    installs: 442,
    tags: ["Docs", "Knowledge"],
  },
]

const developmentSkills = [
  {
    id: "repo-lens",
    title: "Repo Lens",
    description: "Audit repositories, summarize architecture, and map dependencies.",
    creator: "Devline",
    installs: 689,
    tags: ["Code", "Audit"],
  },
  {
    id: "api-companion",
    title: "API Companion",
    description: "Generate docs, examples, and change logs from OpenAPI specs.",
    creator: "APIKit",
    installs: 544,
    tags: ["API", "Docs"],
  },
  {
    id: "security-scan",
    title: "Security Scan",
    description: "Run static scans, flag issues, and draft remediation notes.",
    creator: "CodeGuard",
    installs: 496,
    tags: ["Security", "Testing"],
  },
  {
    id: "build-sherpa",
    title: "Build Sherpa",
    description: "Diagnose failed builds, group errors, and propose fixes.",
    creator: "Opsline",
    installs: 372,
    tags: ["CI", "Diagnostics"],
  },
]

const researchSkills = [
  {
    id: "market-drift",
    title: "Market Drift",
    description: "Track competitors, summarize market shifts, and highlight signals.",
    creator: "Atlas Research",
    installs: 514,
    tags: ["Research", "Strategy"],
  },
  {
    id: "doc-miner",
    title: "Doc Miner",
    description: "Extract key insights from PDFs, reports, and internal docs.",
    creator: "DataScout",
    installs: 401,
    tags: ["Analysis", "Docs"],
  },
  {
    id: "survey-lab",
    title: "Survey Lab",
    description: "Design surveys, compile results, and generate summaries.",
    creator: "Signal Studio",
    installs: 286,
    tags: ["UX", "Insights"],
  },
  {
    id: "trendline",
    title: "Trendline",
    description: "Aggregate sources and surface trends with weekly briefings.",
    creator: "Atlas Research",
    installs: 329,
    tags: ["Research", "Intel"],
  },
]

const creators = [
  { name: "Signal Studio", skills: 6 },
  { name: "Opsline", skills: 5 },
  { name: "APIKit", skills: 4 },
  { name: "DataScout", skills: 3 },
  { name: "Timewise", skills: 4 },
  { name: "CodeGuard", skills: 3 },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-black/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-semibold text-white">
            OpenClaw Directory
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[#a1a1a1] md:flex">
            <Link href="/skills" className="hover:text-white transition-colors">
              Skills
            </Link>
            <Link href="/creators" className="hover:text-white transition-colors">
              Creators
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link
              href="/login"
              className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-100 transition-colors"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[#a1a1a1]">
            OpenClaw Directory
          </div>
          <h1 className="mt-4 text-5xl font-bold text-white">
            The home for OpenClaw skills
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#a1a1a1]">
            Discover vetted, production-ready skills from top creators. Install the
            right capability in minutes.
          </p>
          <div className="mt-8">
            <SearchInput />
          </div>
        </div>
      </section>

      <section className="border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <div className="text-3xl font-semibold text-white">120+</div>
              <div className="mt-2 text-sm text-[#a1a1a1]">Skills available</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white">48</div>
              <div className="mt-2 text-sm text-[#a1a1a1]">Verified creators</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white">9.2k</div>
              <div className="mt-2 text-sm text-[#a1a1a1]">Total installs</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="mb-16">
          <SectionHeader title="Featured Skills" href="/skills/featured" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                href={`/skills/${skill.id}`}
                title={skill.title}
                description={skill.description}
                creator={skill.creator}
                installs={skill.installs}
                tags={skill.tags}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader title="Productivity" href="/categories/productivity" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {productivitySkills.map((skill) => (
              <SkillCard
                key={skill.id}
                href={`/skills/${skill.id}`}
                title={skill.title}
                description={skill.description}
                creator={skill.creator}
                installs={skill.installs}
                tags={skill.tags}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader title="Development" href="/categories/development" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {developmentSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                href={`/skills/${skill.id}`}
                title={skill.title}
                description={skill.description}
                creator={skill.creator}
                installs={skill.installs}
                tags={skill.tags}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader title="Research" href="/categories/research" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {researchSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                href={`/skills/${skill.id}`}
                title={skill.title}
                description={skill.description}
                creator={skill.creator}
                installs={skill.installs}
                tags={skill.tags}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader title="Creators" href="/creators" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {creators.map((creator) => {
              const initials = creator.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()

              return (
                <Link
                  key={creator.name}
                  href={`/creators/${creator.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-4 text-center transition-colors hover:border-[#2a2a2a]"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#1a1a1a] text-xs text-[#a1a1a1]">
                    {initials}
                  </div>
                  <div className="mt-3 text-xs font-medium text-white">
                    {creator.name}
                  </div>
                  <div className="mt-1 text-xs text-[#a1a1a1]">
                    {creator.skills} skills
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      <footer className="border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="text-sm font-semibold text-white">OpenClaw Directory</div>
              <p className="mt-3 text-xs text-[#a1a1a1]">
                A curated marketplace for OpenClaw agent skills.
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Product</div>
              <ul className="mt-3 space-y-2 text-xs text-[#a1a1a1]">
                <li>
                  <Link href="/skills" className="hover:text-white">
                    Browse Skills
                  </Link>
                </li>
                <li>
                  <Link href="/creators" className="hover:text-white">
                    Creators
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Resources</div>
              <ul className="mt-3 space-y-2 text-xs text-[#a1a1a1]">
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Company</div>
              <ul className="mt-3 space-y-2 text-xs text-[#a1a1a1]">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#1a1a1a] pt-6 text-xs text-[#a1a1a1] md:flex-row">
            <div>© 2026 OpenClaw Directory</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
