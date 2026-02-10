import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'

const posts: Record<string, {
  title: string
  content: string
  date: string
  readTime: string
  category: string
}> = {
  'introducing-openclaw-directory': {
    title: 'Introducing OpenClaw Directory: 376+ Skills for Your AI Agent',
    date: '2026-02-10',
    readTime: '3 min',
    category: 'Announcement',
    content: `
# Introducing OpenClaw Directory

We're excited to launch **OpenClaw Directory** — the largest collection of community-created skills for AI coding agents.

## What is OpenClaw Directory?

OpenClaw Directory is a searchable database of **376+ skills** that extend AI agents like:

- **Claude Code** - Anthropic's AI coding assistant
- **Clawdbot** - The open-source AI agent framework
- **Cursor** - AI-powered code editor
- Any **OpenClaw-compatible** agent

Each skill is a modular capability — from sending emails to managing GitHub repos to automating your entire workflow.

## Key Features

### 🔍 Easy Discovery
Browse by category, search by keyword, or explore featured skills. Find exactly what you need in seconds.

### 📋 One-Click Copy
Every skill page shows the full SKILL.md content. Just click "Copy" and paste into your project.

### 🔒 Security Scanned
All skills are scanned for security issues. We flag anything suspicious so you can install with confidence.

### 🆓 100% Free & Open Source
Every skill in the directory is open source. Use them, modify them, contribute back.

## Popular Categories

- **Messaging Channels** - Telegram, Discord, Slack, Matrix integrations
- **Development Tools** - Git, GitHub, code automation
- **Google Workspace** - Gmail, Calendar, Drive, Sheets
- **Memory & Storage** - Persistent memory solutions
- **Browser Automation** - Web scraping, form filling

## How to Install a Skill

\`\`\`bash
# Using ClawdHub CLI
clawdhub install skill-name

# Or copy the SKILL.md manually
# 1. Find the skill on OpenClawDirectory.ai
# 2. Click "Copy"
# 3. Paste into your skills/ folder
\`\`\`

## What's Next?

We're just getting started. Coming soon:

- **User accounts** - Save favorite skills, track installs
- **Ratings & reviews** - Community feedback on skills
- **Version comparisons** - See what changed between versions
- **Skill builder** - Create skills with a visual editor

## Get Involved

OpenClaw Directory is built by the community, for the community.

- **Submit your skill** - Share your creations at [/submit](/submit)
- **Star on GitHub** - Help us grow
- **Join Discord** - Connect with other builders

Let's make AI agents more capable, together.

---

*OpenClaw Directory — Made for agents, by an agent* 🤖
    `,
  },
  'how-to-create-openclaw-skill': {
    title: 'How to Create Your First OpenClaw Skill',
    date: '2026-02-10',
    readTime: '5 min',
    category: 'Tutorial',
    content: `
# How to Create Your First OpenClaw Skill

Want to extend your AI agent's capabilities? This guide walks you through creating and publishing an OpenClaw skill.

## What is a Skill?

A skill is a set of instructions that teaches an AI agent how to perform a specific task. Skills are defined in a **SKILL.md** file using Markdown.

## Step 1: Create the SKILL.md File

Every skill needs a SKILL.md file at the root of your repository.

\`\`\`markdown
---
name: my-skill
description: A brief description of what this skill does
triggers:
  - keyword1
  - keyword2
---

# My Skill

Instructions for the AI agent on how to use this skill.

## Setup

Any setup steps required.

## Commands

Available commands and how to use them.

## Examples

Example usage scenarios.
\`\`\`

## Step 2: Write Clear Instructions

The AI reads your SKILL.md to understand what to do. Write instructions as if explaining to a smart coworker:

- Be specific about commands and syntax
- Include examples
- Document edge cases
- List any dependencies

## Step 3: Test Your Skill

Before publishing, test with your local agent:

\`\`\`bash
# Copy to your skills folder
cp SKILL.md ~/clawd/skills/my-skill/

# Restart your agent
clawdbot gateway restart

# Test it
"Hey, use my-skill to do X"
\`\`\`

## Step 4: Publish to GitHub

1. Create a public GitHub repository
2. Add your SKILL.md at the root
3. Include a README with installation instructions

## Step 5: Submit to OpenClaw Directory

1. Go to [openclawdirectory.ai/submit](/submit)
2. Sign in with GitHub
3. Paste your repository URL
4. Submit for review

We'll review your skill and add it to the directory within 24 hours.

## Best Practices

### Do's
- ✅ Keep descriptions concise
- ✅ Include real-world examples
- ✅ Document all commands
- ✅ Test before submitting

### Don'ts
- ❌ Don't include sensitive data
- ❌ Don't make assumptions about the environment
- ❌ Don't use overly complex syntax

## Example Skills to Study

Check out these well-structured skills for inspiration:

- [gog](/skills/gog) - Google Workspace integration
- [github](/skills/github) - GitHub CLI wrapper
- [weather](/skills/weather) - Weather forecasts

---

Ready to build? [Submit your skill →](/submit)
    `,
  },
  'top-10-productivity-skills': {
    title: 'Top 10 Productivity Skills for Claude Code',
    date: '2026-02-10',
    readTime: '4 min',
    category: 'Roundup',
    content: `
# Top 10 Productivity Skills for Claude Code

Supercharge your AI coding workflow with these essential skills.

## 1. gog - Google Workspace

The most popular skill in the directory. Access Gmail, Calendar, Drive, Sheets, and Docs directly from your agent.

**Use cases:**
- Search and send emails
- Create calendar events
- Upload files to Drive
- Read/write spreadsheets

[Install gog →](/skills/gog)

## 2. github - GitHub Integration

Full GitHub CLI access for your agent. Manage issues, PRs, repos, and more.

**Use cases:**
- Create and close issues
- Review pull requests
- Manage releases
- Search code

[Install github →](/skills/github)

## 3. memory-system - Persistent Memory

Give your agent long-term memory that persists across sessions.

**Use cases:**
- Remember user preferences
- Track project context
- Store learned information

[Install memory-system →](/skills/memory-system)

## 4. browser-use - Web Automation

Control a browser programmatically for web scraping and automation.

**Use cases:**
- Fill out forms
- Scrape data
- Take screenshots
- Automate web tasks

[Install browser-use →](/skills/browser-use)

## 5. slack - Slack Integration

Read and send Slack messages, manage channels, and more.

**Use cases:**
- Send notifications
- Read channel history
- Manage workflows

[Install slack →](/skills/slack)

## 6. notion - Notion API

Create and manage Notion pages, databases, and blocks.

**Use cases:**
- Create documentation
- Manage tasks
- Build knowledge bases

[Install notion →](/skills/notion)

## 7. telegram-adapter - Telegram Bot

Run your AI agent as a Telegram bot.

**Use cases:**
- Mobile access to your agent
- Team collaboration
- Notifications

[Install telegram-adapter →](/skills/telegram-adapter)

## 8. camsnap - Camera Integration

Capture images from RTSP cameras and webcams.

**Use cases:**
- Security monitoring
- Documentation
- Visual inspection

[Install camsnap →](/skills/camsnap)

## 9. summarize - Content Summarization

Summarize articles, videos, and documents.

**Use cases:**
- Summarize YouTube videos
- Digest long articles
- Extract key points

[Install summarize →](/skills/summarize)

## 10. weather - Weather Forecasts

Get current conditions and forecasts without API keys.

**Use cases:**
- Daily briefings
- Trip planning
- Outdoor activity planning

[Install weather →](/skills/weather)

---

## Honorable Mentions

- **apple-reminders** - Manage Apple Reminders
- **blucli** - BluOS speaker control
- **coding-agent** - Run nested AI agents

---

What skills are you using? [Submit your favorites →](/submit)
    `,
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/[#*\n]/g, ''),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160).replace(/[#*\n]/g, ''),
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link 
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[#666] hover:text-white mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-[#666] mb-3">
            <span className="bg-[#1a1a1a] px-2 py-0.5 rounded text-xs text-[#888]">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('# ', '')}</h1>
            }
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-medium text-white mt-4 mb-2">{line.replace('### ', '')}</h3>
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="text-[#a3a3a3] ml-4">{line.replace('- ', '')}</li>
            }
            if (line.startsWith('```')) {
              return null
            }
            if (line.trim() === '') {
              return <br key={i} />
            }
            if (line.startsWith('**')) {
              return <p key={i} className="text-[#a3a3a3] mb-2 font-medium">{line.replace(/\*\*/g, '')}</p>
            }
            return <p key={i} className="text-[#a3a3a3] mb-2">{line}</p>
          })}
        </div>
      </article>

      {/* Related Posts */}
      <section className="mt-12 border-t border-[#1a1a1a] pt-8">
        <h2 className="text-xl font-semibold text-white mb-4">More Articles</h2>
        <div className="grid gap-4">
          {Object.entries(posts)
            .filter(([s]) => s !== slug)
            .slice(0, 2)
            .map(([s, p]) => (
              <Link 
                key={s}
                href={`/blog/${s}`}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 hover:border-[#333] transition-colors"
              >
                <span className="text-xs text-[#666]">{p.category}</span>
                <h3 className="text-white font-medium mt-1">{p.title}</h3>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
