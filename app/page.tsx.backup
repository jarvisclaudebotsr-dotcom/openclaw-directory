import Link from 'next/link';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  creator: string;
  installs?: number;
  featured?: boolean;
}

const skills: Record<string, Skill[]> = {
  featured: [
    {
      id: 'meta-ad-research',
      name: 'Meta Ad Research',
      description: 'Research competitor ads via Meta Ad Library and summarize creative trends.',
      category: 'Marketing',
      price: 49,
      creator: 'Jarvis',
      installs: 234,
      featured: true
    },
    {
      id: 'clickup-melts',
      name: 'ClickUp Melts System',
      description: 'Manage Active Tests, Hook Bank, and Angle Library in ClickUp.',
      category: 'Marketing',
      price: 99,
      creator: 'Jarvis',
      installs: 189,
      featured: true
    },
    {
      id: 'x-research',
      name: 'X Research Agent',
      description: 'Search X in real time, track conversations, and surface trend signals.',
      category: 'Research',
      price: 39,
      creator: 'Jarvis',
      installs: 445,
      featured: true
    },
    {
      id: 'github-manager',
      name: 'GitHub Repo Manager',
      description: 'Manage repos, pull requests, and CI workflows with one command.',
      category: 'Development',
      price: 39,
      creator: 'DevTools Co',
      installs: 756,
      featured: true
    }
  ],
  marketing: [
    {
      id: 'google-ads-optimizer',
      name: 'Google Ads Optimizer',
      description: 'Automated Google Ads campaign optimization and reporting.',
      category: 'Marketing',
      price: 79,
      creator: 'AdTech Labs',
      installs: 156
    },
    {
      id: 'shopify-analytics',
      name: 'Shopify Analytics Suite',
      description: 'Deep dive into Shopify store performance and customer behavior.',
      category: 'Marketing',
      price: 59,
      creator: 'EcomTools',
      installs: 312
    },
    {
      id: 'retention-engine',
      name: 'Retention Engine',
      description: 'Cohort analysis and retention insights for lifecycle marketing.',
      category: 'Marketing',
      price: 89,
      creator: 'Lifecycle Lab',
      installs: 204
    },
    {
      id: 'offer-generator',
      name: 'Offer Generator',
      description: 'Create offer stacks and pricing experiments in minutes.',
      category: 'Marketing',
      price: 45,
      creator: 'Growth Studio',
      installs: 167
    }
  ],
  research: [
    {
      id: 'competitor-intel',
      name: 'Competitor Intelligence',
      description: 'Track competitor moves, pricing changes, and market positioning.',
      category: 'Research',
      price: 69,
      creator: 'DataScout',
      installs: 178
    },
    {
      id: 'patent-search',
      name: 'Patent Search & Analysis',
      description: 'Search USPTO, analyze claims, and surface prior art quickly.',
      category: 'Research',
      price: 89,
      creator: 'LegalTech AI',
      installs: 92
    },
    {
      id: 'market-research',
      name: 'Market Research Automator',
      description: 'Automated market sizing, TAM/SAM/SOM analysis, and signals.',
      category: 'Research',
      price: 119,
      creator: 'StrategyBot',
      installs: 134
    },
    {
      id: 'user-interviews',
      name: 'User Interview Synth',
      description: 'Summarize transcripts into insights, themes, and action items.',
      category: 'Research',
      price: 55,
      creator: 'InsightWorks',
      installs: 211
    }
  ],
  productivity: [
    {
      id: 'clickup-integration',
      name: 'ClickUp Task Manager',
      description: 'Full ClickUp integration for tasks, docs, and timelines.',
      category: 'Productivity',
      price: 29,
      creator: 'ProductivityHub',
      installs: 892
    },
    {
      id: 'notion-database',
      name: 'Notion Database Manager',
      description: 'Create and manage Notion databases, pages, and blocks.',
      category: 'Productivity',
      price: 35,
      creator: 'NotionPro',
      installs: 671
    },
    {
      id: 'calendar-assistant',
      name: 'Smart Calendar Assistant',
      description: 'Schedule meetings, find optimal times, and manage calendars.',
      category: 'Productivity',
      price: 25,
      creator: 'TimeWise',
      installs: 523
    },
    {
      id: 'email-automation',
      name: 'Email Automation Suite',
      description: 'Smart email filtering, auto-responses, follow-up sequences.',
      category: 'Productivity',
      price: 45,
      creator: 'MailBot',
      installs: 389
    }
  ],
  development: [
    {
      id: 'api-tester',
      name: 'API Testing & Docs',
      description: 'Test APIs, generate documentation, and monitor endpoints.',
      category: 'Development',
      price: 49,
      creator: 'APIKit',
      installs: 445
    },
    {
      id: 'code-reviewer',
      name: 'AI Code Reviewer',
      description: 'Automated code review, security scanning, and best practices.',
      category: 'Development',
      price: 79,
      creator: 'CodeGuard',
      installs: 312
    },
    {
      id: 'db-optimizer',
      name: 'Database Query Optimizer',
      description: 'Analyze and optimize SQL queries, suggest indexes.',
      category: 'Development',
      price: 69,
      creator: 'DBMaster',
      installs: 234
    },
    {
      id: 'release-notes',
      name: 'Release Notes Writer',
      description: 'Generate polished release notes from commit histories.',
      category: 'Development',
      price: 29,
      creator: 'ShipIt',
      installs: 188
    }
  ]
};

const sectionOrder = [
  { key: 'featured', title: 'Featured Skills', href: '/skills/featured' },
  { key: 'marketing', title: 'Marketing', href: '/categories/marketing' },
  { key: 'research', title: 'Research', href: '/categories/research' },
  { key: 'productivity', title: 'Productivity', href: '/categories/productivity' },
  { key: 'development', title: 'Development', href: '/categories/development' }
] as const;

const SectionHeader = ({ title, href }: { title: string; href: string }) => (
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-white text-lg font-medium tracking-tight">{title}</h2>
    <Link href={href} className="text-xs text-gray-400 hover:text-white transition-colors">
      View all →
    </Link>
  </div>
);

const SkillCard = ({ skill }: { skill: Skill }) => (
  <Link
    href={`/skills/${skill.id}`}
    className="group relative block rounded-xl border border-[#2a2a2a] bg-[#121212] p-4 transition-colors hover:border-[#3a3a3a]"
  >
    <div className="absolute right-4 top-4 rounded-full border border-[#2a2a2a] bg-black px-2.5 py-1 text-[11px] text-white">
      ${skill.price}
    </div>
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#161616] text-[11px] text-gray-400">
        {skill.name
          .split(' ')
          .slice(0, 2)
          .map(word => word[0])
          .join('')}
      </div>
      <div>
        <div className="text-sm font-medium text-white group-hover:text-white">
          {skill.name}
        </div>
        <div className="text-xs text-gray-500">{skill.category}</div>
      </div>
    </div>
    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
      {skill.description}
    </p>
    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
      <span>{skill.creator}</span>
      {skill.installs ? <span>{skill.installs} installs</span> : null}
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-black/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            OpenClaw
          </Link>
          <nav className="flex items-center gap-8 text-xs text-gray-400">
            <Link href="/skills" className="hover:text-white transition-colors">
              Skills
            </Link>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <Link href="/creators" className="hover:text-white transition-colors">
              Creators
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-white px-4 py-2 text-[11px] font-medium text-black transition-colors hover:bg-gray-200"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24">
        <section className="border-b border-[#1f1f1f] py-14 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">
            OpenClaw Directory
          </p>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
            Production-ready skills for OpenClaw agents.
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 leading-relaxed">
            Browse curated capabilities, discover new creators, and install the right
            skills for your agents in minutes.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <div className="flex w-full max-w-md items-center rounded-full border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-2">
              <span className="mr-3 text-xs text-gray-500">Search</span>
              <input
                type="text"
                placeholder="Search skills, creators, categories"
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="grid grid-cols-2 gap-4 text-left text-xs text-gray-500 md:grid-cols-4">
            <div>
              <div className="text-white text-lg font-medium">120+</div>
              Skills available
            </div>
            <div>
              <div className="text-white text-lg font-medium">48</div>
              Verified creators
            </div>
            <div>
              <div className="text-white text-lg font-medium">9.2k</div>
              Total installs
            </div>
            <div>
              <div className="text-white text-lg font-medium">24h</div>
              Average approval
            </div>
          </div>
        </section>

        {sectionOrder.map(section => (
          <section key={section.key} className="mb-14">
            <SectionHeader title={section.title} href={section.href} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skills[section.key].map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-[#1f1f1f] bg-black">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-xs text-gray-500">
          <span>© 2026 OpenClaw Directory</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
