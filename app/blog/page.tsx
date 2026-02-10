import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - OpenClaw Directory',
  description: 'Latest news, updates, and tutorials for AI agent skills. Learn how to build, install, and use OpenClaw skills for Claude Code, Clawdbot, and more.',
  keywords: ['OpenClaw blog', 'AI agent tutorials', 'Claude skills guide', 'Clawdbot updates', 'agent skills news'],
}

const posts = [
  {
    slug: 'introducing-openclaw-directory',
    title: 'Introducing OpenClaw Directory: 376+ Skills for Your AI Agent',
    excerpt: 'We launched OpenClaw Directory - the largest collection of community-created skills for Claude Code, Clawdbot, and OpenClaw-compatible agents. Browse, search, and install skills in seconds.',
    date: '2026-02-10',
    readTime: '3 min',
    category: 'Announcement',
  },
  {
    slug: 'how-to-create-openclaw-skill',
    title: 'How to Create Your First OpenClaw Skill',
    excerpt: 'A step-by-step guide to building and publishing your own AI agent skill. Learn the SKILL.md format, best practices, and how to submit to the directory.',
    date: '2026-02-10',
    readTime: '5 min',
    category: 'Tutorial',
  },
  {
    slug: 'top-10-productivity-skills',
    title: 'Top 10 Productivity Skills for Claude Code',
    excerpt: 'Supercharge your AI coding workflow with these essential skills. From Gmail integration to GitHub automation, these tools will 10x your productivity.',
    date: '2026-02-10',
    readTime: '4 min',
    category: 'Roundup',
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Blog</h1>
        <p className="text-[#a3a3a3] text-lg">
          News, tutorials, and updates from the OpenClaw community.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#333] transition-colors"
          >
            <div className="flex items-center gap-3 text-sm text-[#666] mb-3">
              <span className="bg-[#1a1a1a] px-2 py-0.5 rounded text-xs text-[#888]">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            
            <p className="text-[#888] mb-4">{post.excerpt}</p>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
            >
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      {/* SEO-rich content section */}
      <section className="mt-12 border-t border-[#1a1a1a] pt-10">
        <h2 className="text-xl font-semibold text-white mb-4">About OpenClaw Skills</h2>
        <div className="prose prose-invert prose-sm max-w-none text-[#888]">
          <p>
            OpenClaw skills are modular capabilities that extend AI agents like Claude Code, Clawdbot, 
            and other OpenClaw-compatible systems. Each skill is defined by a SKILL.md file that describes 
            what the skill does and how to use it.
          </p>
          <p className="mt-3">
            The OpenClaw Directory makes it easy to discover, install, and share skills created by the 
            community. Whether you need Gmail integration, GitHub automation, calendar management, or 
            custom workflows, there's likely a skill for it.
          </p>
          <h3 className="text-white mt-6 mb-2 font-medium">Popular Skill Categories</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><Link href="/categories/messaging-channels" className="text-blue-400 hover:underline">Messaging Channels</Link> - Telegram, Discord, Slack integrations</li>
            <li><Link href="/categories/development-tools" className="text-blue-400 hover:underline">Development Tools</Link> - Git, GitHub, code automation</li>
            <li><Link href="/categories/productivity" className="text-blue-400 hover:underline">Productivity</Link> - Email, calendar, task management</li>
            <li><Link href="/categories/memory-storage" className="text-blue-400 hover:underline">Memory & Storage</Link> - Persistent memory, databases</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
