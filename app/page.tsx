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
      id: 'email-automation',
      name: 'Email Automation Suite',
      description: 'Smart email filtering, auto-responses, and follow-up sequences.',
      category: 'Productivity',
      price: 45,
      creator: 'MailBot',
      installs: 892,
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
    },
    {
      id: 'calendar-assistant',
      name: 'Smart Calendar Assistant',
      description: 'Schedule meetings, find optimal times, manage multiple calendars.',
      category: 'Productivity',
      price: 25,
      creator: 'TimeWise',
      installs: 523,
      featured: true
    },
    {
      id: 'api-tester',
      name: 'API Testing & Documentation',
      description: 'Test APIs, generate docs, monitor endpoints automatically.',
      category: 'Development',
      price: 49,
      creator: 'APIKit',
      installs: 445,
      featured: true
    }
  ],
  productivity: [
    {
      id: 'task-manager',
      name: 'Task Manager Pro',
      description: 'Full project management - tasks, docs, goals, time tracking.',
      category: 'Productivity',
      price: 29,
      creator: 'ProductivityHub',
      installs: 892
    },
    {
      id: 'note-database',
      name: 'Note Database Manager',
      description: 'Create and manage notes, databases, pages, and blocks.',
      category: 'Productivity',
      price: 35,
      creator: 'NotesPro',
      installs: 671
    },
    {
      id: 'calendar-assistant',
      name: 'Smart Calendar Assistant',
      description: 'Schedule meetings, find optimal times, manage multiple calendars.',
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
      id: 'github-manager',
      name: 'GitHub Repository Manager',
      description: 'Manage repos, PRs, issues, and CI/CD workflows.',
      category: 'Development',
      price: 39,
      creator: 'DevTools Co',
      installs: 756
    },
    {
      id: 'api-tester',
      name: 'API Testing & Documentation',
      description: 'Test APIs, generate docs, monitor endpoints.',
      category: 'Development',
      price: 49,
      creator: 'APIKit',
      installs: 445
    },
    {
      id: 'code-reviewer',
      name: 'AI Code Reviewer',
      description: 'Automated code review, security scanning, best practices.',
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
    }
  ],
  research: [
    {
      id: 'web-scraper',
      name: 'Web Scraper Pro',
      description: 'Extract data from websites, APIs, and databases automatically.',
      category: 'Research',
      price: 59,
      creator: 'DataScout',
      installs: 445
    },
    {
      id: 'market-intel',
      name: 'Market Intelligence',
      description: 'Track market trends, competitor analysis, industry insights.',
      category: 'Research',
      price: 69,
      creator: 'MarketWatch',
      installs: 312
    },
    {
      id: 'patent-search',
      name: 'Patent Search & Analysis',
      description: 'Search patents, analyze claims, find prior art.',
      category: 'Research',
      price: 89,
      creator: 'LegalTech AI',
      installs: 178
    },
    {
      id: 'data-analyzer',
      name: 'Data Analysis Suite',
      description: 'Automated data analysis, visualization, insights generation.',
      category: 'Research',
      price: 79,
      creator: 'DataViz Labs',
      installs: 234
    }
  ]
};

const featuredCreators = [
  { name: 'DevTools Co', skills: 6, installs: 1567, avatar: '🛠️' },
  { name: 'ProductivityHub', skills: 8, installs: 2341, avatar: '⚡' },
  { name: 'APIKit', skills: 5, installs: 1243, avatar: '📊' },
  { name: 'DataScout', skills: 4, installs: 892, avatar: '🔍' },
  { name: 'MailBot', skills: 3, installs: 789, avatar: '📧' },
  { name: 'TimeWise', skills: 4, installs: 1098, avatar: '📅' }
];

const trendingSkills = [
  { 
    title: 'New skill: AI Code Reviewer with security scanning',
    creator: 'CodeGuard',
    timestamp: '2 hours ago',
    category: 'Development'
  },
  {
    title: 'Updated Web Scraper Pro with proxy rotation',
    creator: 'DataScout',
    timestamp: '5 hours ago',
    category: 'Research'
  },
  {
    title: 'Email Automation Suite hits 1000+ installs',
    creator: 'MailBot',
    timestamp: '1 day ago',
    category: 'Productivity'
  }
];

const SkillCard = ({ skill }: { skill: Skill }) => (
  <Link 
    href={`/skills/${skill.id}`}
    className="block bg-[#1a1a1a] rounded-lg p-5 border border-gray-800 hover:border-gray-700 transition-colors"
  >
    <div className="mb-3">
      <h3 className="text-white font-medium text-sm mb-2 line-clamp-1">
        {skill.name}
      </h3>
      <p className="text-gray-500 text-xs mb-3 line-clamp-2">
        {skill.description}
      </p>
    </div>
    <div className="flex items-center justify-between text-xs">
      <span className="text-white font-medium">${skill.price}</span>
      {skill.installs && (
        <span className="text-gray-600">{skill.installs} installs</span>
      )}
    </div>
  </Link>
);

const SectionHeader = ({ title, href }: { title: string; href: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-white text-xl font-semibold">{title}</h2>
    <Link href={href} className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
      View all →
    </Link>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-900 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-semibold text-lg">OpenClaw</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/skills" className="text-gray-400 hover:text-white text-sm transition-colors">
                Skills
              </Link>
              <Link href="/creators" className="text-gray-400 hover:text-white text-sm transition-colors">
                Creators
              </Link>
              <Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">
                Docs
              </Link>
              <Link 
                href="/login" 
                className="bg-white text-black px-3 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors font-medium"
              >
                Sign in
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="mb-2 text-sm text-gray-500 tracking-wider uppercase">
            OPENCLAW DIRECTORY
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4">
            Production-ready skills for OpenClaw agents.
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Browse curated capabilities, discover new creators, and install the right skills for your agents in minutes.
          </p>
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search skills, creators, categories..."
              className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gray-700 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-semibold text-white mb-1">120+</div>
              <div className="text-sm text-gray-500">Skills available</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white mb-1">48</div>
              <div className="text-sm text-gray-500">Verified creators</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white mb-1">9.2k</div>
              <div className="text-sm text-gray-500">Total installs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured Skills */}
        <section className="mb-16">
          <SectionHeader title="Featured Skills" href="/skills/featured" />
          <div className="grid grid-cols-4 gap-4">
            {skills.featured.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* Productivity */}
        <section className="mb-16">
          <SectionHeader title="Productivity" href="/categories/productivity" />
          <div className="grid grid-cols-4 gap-4">
            {skills.productivity.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* Development */}
        <section className="mb-16">
          <SectionHeader title="Development" href="/categories/development" />
          <div className="grid grid-cols-4 gap-4">
            {skills.development.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* Featured Creators */}
        <section className="mb-16">
          <SectionHeader title="Creators" href="/creators" />
          <div className="grid grid-cols-6 gap-4">
            {featuredCreators.map(creator => (
              <Link
                key={creator.name}
                href={`/creators/${creator.name.toLowerCase()}`}
                className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors text-center"
              >
                <div className="text-3xl mb-2">{creator.avatar}</div>
                <div className="text-white font-medium text-xs mb-1">{creator.name}</div>
                <div className="text-gray-600 text-xs">{creator.skills} skills</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Research */}
        <section className="mb-16">
          <SectionHeader title="Research" href="/categories/research" />
          <div className="grid grid-cols-4 gap-4">
            {skills.research.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-semibold mb-4 text-sm">OpenClaw Directory</div>
              <p className="text-gray-600 text-xs">
                The marketplace for AI agent capabilities
              </p>
            </div>
            <div>
              <div className="text-white font-medium mb-4 text-sm">Product</div>
              <ul className="space-y-2 text-xs">
                <li><Link href="/skills" className="text-gray-500 hover:text-gray-400">Browse Skills</Link></li>
                <li><Link href="/creators" className="text-gray-500 hover:text-gray-400">Creators</Link></li>
                <li><Link href="/pricing" className="text-gray-500 hover:text-gray-400">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-medium mb-4 text-sm">Resources</div>
              <ul className="space-y-2 text-xs">
                <li><Link href="/docs" className="text-gray-500 hover:text-gray-400">Documentation</Link></li>
                <li><Link href="/guides" className="text-gray-500 hover:text-gray-400">Guides</Link></li>
                <li><Link href="/api" className="text-gray-500 hover:text-gray-400">API</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-medium mb-4 text-sm">Company</div>
              <ul className="space-y-2 text-xs">
                <li><Link href="/about" className="text-gray-500 hover:text-gray-400">About</Link></li>
                <li><Link href="/contact" className="text-gray-500 hover:text-gray-400">Contact</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-gray-400">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex items-center justify-between text-xs">
            <div className="text-gray-600">
              © 2026 OpenClaw Directory
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-500">Privacy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-500">Terms</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-500">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
