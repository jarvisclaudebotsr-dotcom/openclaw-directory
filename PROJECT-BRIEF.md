# OpenClaw Directory - Complete Project Brief

**Date:** 2026-02-08  
**Status:** Pre-Development  
**Reference Sites:**
- cursor.directory (design aesthetic)
- openclawskill.ai (functional reference - already doing GitHub mapping)

---

## 1. PROJECT OVERVIEW

### What We're Building
A **skills directory** for OpenClaw that indexes community-created skills from GitHub repositories. Users can browse, search, and discover skills with one-click install commands.

### What This Is NOT
- ❌ Not a marketplace (no payments, no checkout)
- ❌ Not a complex landing page with heavy copy
- ❌ Not a documentation site

### What This IS
- ✅ A **searchable directory** of OpenClaw skills
- ✅ Minimal, fast, information-dense
- ✅ GitHub-powered (skills come from repos)
- ✅ One-click install via CLI commands

---

## 2. DESIGN AESTHETIC (cursor.directory Style)

### Visual Identity
- **Pure black background** (`#000000`)
- **No decorative elements** - content is the design
- **Minimal color palette** - black, white, grays only
- **Flat design** - no shadows, gradients, or depth effects
- **Information density** - small fonts (12-14px), tight spacing
- **Fast and lightweight** - no heavy animations or complex interactions

### Typography
```
Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
Headings: 14-20px, font-medium (500) or font-semibold (600)
Body text: 12px, font-normal (400)
Color: White (#ffffff) for headings, light gray (#a1a1a1) for body
```

### Card Design (Skill Cards)
```
┌─────────────────────────────────────┐
│ [Icon] Skill Name          v2.1.0   │
├─────────────────────────────────────┤
│ Short description that spans 2-3    │
│ lines max. Truncated with ellipsis  │
├─────────────────────────────────────┤
│ Tag  Tag  Tag                       │
│ 1.2k installs • Updated 2 days ago  │
└─────────────────────────────────────┘

Background: #0a0a0a
Border: 1px solid #1a1a1a
Hover: Border → #2a2a2a
Padding: 20px
Border radius: 8px
```

### Layout
- **Max width:** 1280px (max-w-7xl)
- **Grid:** 4 columns desktop, 2 tablet, 1 mobile
- **Gap:** 16px between cards
- **Sticky header:** Black background, 64px height
- **Search bar:** Prominent, centered, black background with gray border

---

## 3. FUNCTIONAL REQUIREMENTS

### Core Features

#### 3.1 Browse Skills
- Display skill cards in grid layout
- Show: name, icon/emoji, description, version, tags, stats
- Filter by category (dropdown or tabs)
- Sort by: Popular, Recent, Most Installed

#### 3.2 Search
- Real-time search across skill names and descriptions
- Search bar at top of page
- No results state handled gracefully

#### 3.3 Skill Detail View
- Click card → modal or dedicated page
- Show:
  - Full description
  - Installation command (copy button)
  - GitHub repo link
  - Dependencies (if any)
  - README preview (first few lines)
  - Related skills

#### 3.4 Install Command Generation
```bash
# Show install commands with copy button
npx openclawskill install soul-personality
pnpm openclawskill install soul-personality
bun openclawskill install soul-personality
```

#### 3.5 Categories/Tags
- System/Core
- Memory & Identity
- Messaging Adapters
- Automation & Tools
- Creative & Media
- Research & Analysis
- Development Tools

### Stats to Display
- ✅ Total skills in directory
- ✅ Install count per skill (if trackable)
- ✅ Last updated timestamp
- ✅ Version number
- ✅ GitHub stars (if available)

---

## 4. DATA ARCHITECTURE

### Where Skills Come From
Skills are **indexed from GitHub repositories** following the OpenClaw skill structure.

### Expected Skill Structure
```
skills/
├── soul-personality/
│   ├── SKILL.md          ← Main skill file
│   ├── package.json      ← Metadata (version, dependencies)
│   ├── scripts/          ← Optional scripts
│   └── references/       ← Optional docs
```

### Metadata Extraction
Parse `SKILL.md` for:
- Skill name
- Description
- Emoji/icon
- Dependencies (bins, env, config)
- Usage examples

Parse `package.json` for:
- Version
- Repository URL
- Keywords/tags

### Data Source Options

**Option A: Static JSON (MVP)**
- Manually curated `skills.json` file
- Update via CI/CD when new skills added
- Fast, simple, no database needed

**Option B: GitHub API (Dynamic)**
- Scan specific GitHub repos/orgs on build
- Extract SKILL.md content dynamically
- Requires GitHub API token
- Slower but auto-updates

**Option C: Supabase Database (Scalable)**
- Store skills in database
- Admin panel to add/edit skills
- API endpoints for frontend
- Best for production long-term

**Recommendation:** Start with **Option A** (static JSON), migrate to Option C if needed.

---

## 5. TECHNICAL STACK

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (minimal, unstyled primitives)
- **Icons:** Lucide React (simple, consistent)

### Data Layer (MVP)
- **Static JSON file** in `/data/skills.json`
- **No database** initially
- **No backend** required

### Hosting
- **Platform:** Vercel
- **Domain:** openclawdirectory.ai (already owned)
- **SSL:** Auto via Vercel
- **CDN:** Built-in

### Build Pipeline
- GitHub Actions to auto-rebuild when skills.json updated
- Deploy previews on every PR
- Production deploys on merge to main

---

## 6. PAGE STRUCTURE

### 6.1 Home Page (/)
```
┌──────────────────────────────────────────────────┐
│ [Logo] OpenClaw Directory    [Search]    [GitHub]│ ← Sticky header
├──────────────────────────────────────────────────┤
│                                                   │
│   OpenClaw Directory                              │ ← Hero (minimal)
│   Discover community-built skills for your agent  │
│                                                   │
│   [Search bar with icon]                          │
│                                                   │
├──────────────────────────────────────────────────┤
│                                                   │
│   Featured Skills                   [View all →] │ ← Section header
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐                   │
│   │Card│ │Card│ │Card│ │Card│                   │ ← 4-column grid
│   └────┘ └────┘ └────┘ └────┘                   │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐                   │
│   │Card│ │Card│ │Card│ │Card│                   │
│   └────┘ └────┘ └────┘ └────┘                   │
│                                                   │
├──────────────────────────────────────────────────┤
│   Latest Additions                [View all →]   │
│   [6-8 most recent skills in grid]               │
│                                                   │
├──────────────────────────────────────────────────┤
│   Browse by Category                             │
│   [Category cards or list]                       │
│                                                   │
└──────────────────────────────────────────────────┘
```

### 6.2 Search Results (/search?q=memory)
- Same layout as home
- Filter results by search query
- Show result count
- No results state with suggestions

### 6.3 Category View (/category/memory-identity)
- All skills in specific category
- Same card grid layout
- Category description at top

### 6.4 Skill Detail (/skills/soul-personality)
```
┌──────────────────────────────────────────────────┐
│ [Header with back button]                         │
├──────────────────────────────────────────────────┤
│ 🧠 soul-personality                    v2.4.1     │ ← Skill header
│ Core personality and values system for agents     │
│                                                   │
│ [GitHub] [Install Command] [Copy]                │ ← Action buttons
├──────────────────────────────────────────────────┤
│ Description                                       │
│ Full description from SKILL.md (markdown render) │
│                                                   │
│ Installation                                      │
│ $ npx openclawskill install soul-personality      │
│                                                   │
│ Dependencies                                      │
│ • No external dependencies                        │
│                                                   │
│ Tags                                              │
│ [memory] [identity] [core]                        │
│                                                   │
│ Stats                                             │
│ • 18.7k installs                                  │
│ • Updated 2 days ago                              │
│ • Version 2.4.1                                   │
│                                                   │
│ Related Skills                                    │
│ [3-4 related skill cards]                         │
└──────────────────────────────────────────────────┘
```

---

## 7. COMPONENTS TO BUILD

### 7.1 SkillCard
```tsx
interface SkillCardProps {
  name: string
  emoji: string
  description: string
  version: string
  tags: string[]
  installs?: number
  updatedAt: string
  slug: string
}
```

**Features:**
- Hover effect (border color change)
- Click → navigate to skill detail page
- Truncate description to 2-3 lines
- Show first 3 tags, "+X more" if needed

### 7.2 SearchBar
```tsx
interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
}
```

**Features:**
- Real-time search (debounced)
- Search icon (Lucide Search)
- Clear button (X icon)
- Focus state styling

### 7.3 CategoryFilter
```tsx
interface CategoryFilterProps {
  categories: string[]
  selected: string | null
  onChange: (category: string) => void
}
```

**Features:**
- Dropdown or tab-style selector
- "All" option to clear filter
- Active state styling

### 7.4 InstallCommand
```tsx
interface InstallCommandProps {
  skillName: string
  packageManager?: 'npm' | 'pnpm' | 'bun'
}
```

**Features:**
- Copy to clipboard button
- Package manager selector (npm/pnpm/bun)
- Success feedback on copy

### 7.5 Header (Navigation)
```tsx
<header>
  <Logo /> OpenClaw Directory
  <Nav>
    <Link>Browse</Link>
    <Link>Categories</Link>
    <Link>GitHub</Link>
  </Nav>
</header>
```

**Features:**
- Sticky positioning
- Backdrop blur on scroll
- Mobile responsive (hamburger menu)

---

## 8. DATA SCHEMA

### skills.json Structure
```json
{
  "skills": [
    {
      "id": "soul-personality",
      "name": "soul-personality",
      "emoji": "🧠",
      "description": "Core personality and values system. Defines agent behavior with explicit instructions.",
      "version": "2.4.1",
      "category": "Memory & Identity",
      "tags": ["memory", "identity", "core"],
      "githubUrl": "https://github.com/seedprod/openclaw-prompts-and-skills/blob/main/SOUL.md",
      "installs": 18700,
      "updatedAt": "2026-02-06",
      "dependencies": {
        "bins": [],
        "env": [],
        "config": []
      },
      "featured": true
    }
  ],
  "categories": [
    {
      "id": "memory-identity",
      "name": "Memory & Identity",
      "description": "Skills that define agent personality, memory systems, and identity.",
      "icon": "🧠"
    }
  ]
}
```

---

## 9. IMPLEMENTATION PHASES

### Phase 1: MVP (Week 1) - PRIORITY
**Goal:** Launch minimal working directory with cursor.directory aesthetic

**Tasks:**
1. ✅ Set up Next.js 14 + TypeScript + Tailwind
2. ✅ Install shadcn/ui components (card, input, button, badge)
3. ✅ Create pure black design system (colors, typography)
4. ✅ Build SkillCard component (matches cursor.directory cards exactly)
5. ✅ Create static `skills.json` with 10-15 skills
6. ✅ Build home page with featured + latest sections
7. ✅ Add search functionality (client-side filtering)
8. ✅ Create skill detail page
9. ✅ Deploy to Vercel
10. ✅ Configure DNS for openclawdirectory.ai

**Deliverables:**
- Live site at openclawdirectory.ai
- 10-15 skills indexed
- Search working
- Mobile responsive
- Matches cursor.directory aesthetic exactly

### Phase 2: Polish (Week 2)
1. Add category filtering
2. Implement sort options (popular, recent, installs)
3. Add "Related Skills" section
4. Optimize performance (lazy loading, image optimization)
5. Add analytics (Vercel Analytics or Plausible)
6. SEO optimization (meta tags, sitemap, robots.txt)

### Phase 3: Community Features (Week 3-4)
1. "Submit a Skill" form (GitHub Issues integration)
2. Upvote/favorite system (localStorage initially)
3. Auto-sync with GitHub repos (GitHub Actions)
4. Admin panel for skill curation
5. User accounts (optional)

---

## 10. DESIGN SYSTEM REFERENCE

### Color Palette
```css
--background: #000000         /* Pure black */
--card: #0a0a0a              /* Dark card background */
--border: #1a1a1a            /* Card borders */
--border-hover: #2a2a2a      /* Hover state */
--text-primary: #ffffff      /* Headings */
--text-secondary: #a1a1a1    /* Body text */
--text-muted: #6b7280        /* Disabled/muted */
```

### Spacing Scale
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

### Border Radius
```css
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
```

### Shadows
**None.** Completely flat design.

---

## 11. CURSOR.DIRECTORY COMPARISON

### What to Copy (Design)
✅ Pure black background  
✅ Minimal card design (no shadows/gradients)  
✅ Information-dense layout  
✅ Small font sizes (12-14px)  
✅ Sticky header with backdrop blur  
✅ Simple search bar (black bg, gray border)  
✅ Truncated descriptions (2-3 lines max)  
✅ Tag pills (subtle gray)  
✅ Hover effects (border color change only)  
✅ 4-column grid on desktop  

### What to NOT Copy (Functionality)
❌ "Rules" concept (we have "Skills")  
❌ User accounts/login (not needed for MVP)  
❌ "Board" social features (not needed)  
❌ Jobs listing (irrelevant)  
❌ "Generate" feature (different use case)  

### Key Difference
**cursor.directory** = Code snippets/.cursorrules files  
**OpenClaw Directory** = Installable skills from GitHub repos

---

## 12. SUCCESS METRICS

### MVP Launch Goals (Week 1)
- ✅ Site live at openclawdirectory.ai
- ✅ 10-15 skills indexed
- ✅ Search working
- ✅ Mobile responsive
- ✅ < 1 second page load time
- ✅ Matches cursor.directory aesthetic exactly

### Growth Metrics (Month 1)
- 50+ skills indexed
- 100+ installs tracked
- 500+ unique visitors
- 5+ community submissions

### Quality Metrics
- All skills have:
  - Clear description
  - Working install command
  - GitHub repo link
  - Valid version number
  - At least 1 tag

---

## 13. COMPETITOR ANALYSIS

### openclawskill.ai (Current Reference)
**What they do well:**
- ✅ GitHub repo mapping
- ✅ Version tracking
- ✅ Install command generation
- ✅ Categories

**What they do wrong (for our case):**
- ❌ Too much copy/marketing text
- ❌ Complex landing page structure
- ❌ Not information-dense enough
- ❌ Doesn't match cursor.directory aesthetic

**Our Differentiation:**
- ✅ Pure cursor.directory aesthetic (minimal, black, fast)
- ✅ Information-dense cards
- ✅ Cleaner, simpler UX
- ✅ Faster page loads

---

## 14. OPEN QUESTIONS

1. **Skill versioning:** Do we track version history or just latest?
   - **Answer:** Just latest for MVP, add history later

2. **Install tracking:** How do we count installs without backend?
   - **Answer:** Skip for MVP, add later with simple API endpoint

3. **GitHub sync:** Manual or automated?
   - **Answer:** Manual for MVP (update skills.json), automate in Phase 3

4. **Skill submission:** How do community members submit new skills?
   - **Answer:** GitHub Issues for MVP, proper form in Phase 3

5. **Moderation:** Who approves new skills?
   - **Answer:** Sean manually approves for MVP, delegate later

---

## 15. FILE STRUCTURE

```
openclaw-marketplace/
├── app/
│   ├── layout.tsx              # Root layout with header/footer
│   ├── page.tsx                # Home page (featured + latest)
│   ├── search/
│   │   └── page.tsx            # Search results page
│   ├── skills/
│   │   └── [slug]/
│   │       └── page.tsx        # Skill detail page
│   └── category/
│       └── [slug]/
│           └── page.tsx        # Category view
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── button.tsx
│   │   └── badge.tsx
│   ├── SkillCard.tsx           # Skill card component
│   ├── SearchBar.tsx           # Search input
│   ├── CategoryFilter.tsx      # Category selector
│   ├── InstallCommand.tsx      # Copy-paste install cmd
│   └── Header.tsx              # Site header
├── data/
│   └── skills.json             # Skills database (static)
├── lib/
│   ├── skills.ts               # Skills data helpers
│   └── utils.ts                # Utility functions
├── public/
│   └── icons/                  # Skill icons/emojis
├── tailwind.config.ts          # Tailwind config (black theme)
└── package.json
```

---

## 16. CODEX BUILD INSTRUCTIONS

### What Codex Should Build
1. **Complete Next.js 14 app** with App Router
2. **Pure black design system** (colors, typography, spacing)
3. **SkillCard component** matching cursor.directory exactly
4. **Home page** with featured + latest sections
5. **Search functionality** (client-side filtering)
6. **Skill detail page** with install command
7. **Mobile responsive** (4 cols → 2 cols → 1 col)
8. **Static skills.json** with 10-15 sample skills
9. **Deploy config** for Vercel

### Design Constraints (STRICT)
- ✅ Pure black background (#000000)
- ✅ Card background (#0a0a0a)
- ✅ Border color (#1a1a1a)
- ✅ No shadows, gradients, or depth effects
- ✅ Small fonts (12-14px body, 14-20px headings)
- ✅ Minimal animations (border color transitions only)
- ✅ Flat, information-dense layout
- ✅ Match cursor.directory aesthetic EXACTLY

### What to Skip (For MVP)
- ❌ User accounts/auth
- ❌ Backend API
- ❌ Database (use static JSON)
- ❌ Admin panel
- ❌ Complex animations
- ❌ Heavy marketing copy
- ❌ Payment processing
- ❌ Social features

---

## 17. EXAMPLE SKILLS DATA (Seed Data)

```json
{
  "skills": [
    {
      "id": "soul-personality",
      "name": "soul-personality",
      "emoji": "🧠",
      "description": "Core personality and values system. Defines agent behavior with explicit instructions: 'be genuinely helpful, have opinions, be resourceful.'",
      "version": "2.4.1",
      "category": "Memory & Identity",
      "tags": ["memory", "identity", "core"],
      "githubUrl": "https://github.com/seedprod/openclaw-prompts-and-skills/blob/main/SOUL.md",
      "installs": 18700,
      "updatedAt": "2026-02-06",
      "featured": true
    },
    {
      "id": "memory-system",
      "name": "memory-system",
      "emoji": "💾",
      "description": "File-based memory architecture. Reads memory/YYYY-MM-DD.md for recent context and MEMORY.md for long-term memories.",
      "version": "1.8.3",
      "category": "Memory & Identity",
      "tags": ["memory", "persistence"],
      "githubUrl": "https://github.com/seedprod/openclaw-prompts-and-skills/blob/main/CLAUDE.md",
      "installs": 15200,
      "updatedAt": "2026-02-05",
      "featured": true
    },
    {
      "id": "telegram-adapter",
      "name": "telegram-adapter",
      "emoji": "📱",
      "description": "Minimal Telegram bot adapter. Connects messaging platforms to Claude Code in ~100 lines of Python.",
      "version": "0.9.1",
      "category": "Messaging Adapters",
      "tags": ["telegram", "messaging", "python"],
      "githubUrl": "https://github.com/seedprod/openclaw-prompts-and-skills/blob/main/telegram-claude-poc.py",
      "installs": 8600,
      "updatedAt": "2026-02-04",
      "featured": true
    }
  ]
}
```

---

## 18. CODEX PROMPTS (For Sub-Agent)

### Main Prompt
```
Build an OpenClaw skills directory website matching cursor.directory's aesthetic exactly.

DESIGN SYSTEM (STRICT):
- Pure black background (#000000)
- Card background (#0a0a0a)
- Borders (#1a1a1a)
- No shadows, gradients, or depth effects
- Small fonts (12-14px body, 14-20px headings)
- Flat, minimal, information-dense

TECH STACK:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

FEATURES:
- Home page with featured + latest skills
- Search (client-side filtering)
- Skill detail pages
- Install command with copy button
- Mobile responsive (4→2→1 column grid)

DATA:
- Static JSON file (skills.json)
- 10-15 sample skills included

DELIVERABLES:
1. Complete Next.js app
2. Ready to deploy to Vercel
3. Matches cursor.directory aesthetic EXACTLY
4. Mobile responsive
5. Fast page loads (<1s)

DO NOT INCLUDE:
- User accounts
- Backend API
- Database
- Payments
- Heavy animations
- Marketing copy (keep minimal)
```

---

## 19. POST-BUILD CHECKLIST

Before marking as complete, verify:
- [ ] Site matches cursor.directory aesthetic (pure black, minimal)
- [ ] SkillCard component looks exactly like cursor.directory cards
- [ ] Search works (filters skills in real-time)
- [ ] Skill detail pages load correctly
- [ ] Install commands work with copy button
- [ ] Mobile responsive (test on 320px width)
- [ ] Page loads < 1 second
- [ ] No console errors
- [ ] All links work
- [ ] GitHub links open in new tab
- [ ] Skills.json has 10-15 entries
- [ ] Ready to deploy to Vercel

---

## 20. LAUNCH PLAN

### Pre-Launch (This Week)
1. Build complete (Codex)
2. Manual QA testing
3. Fix any critical bugs
4. Add DNS records in GoDaddy
5. Deploy to Vercel

### Launch Day
1. Announce on Twitter
2. Share in OpenClaw Discord
3. Post on Product Hunt (optional)
4. Share in AI/coding communities

### Post-Launch (Week 1)
1. Monitor analytics
2. Collect feedback
3. Fix bugs
4. Add requested skills
5. Plan Phase 2 features

---

**END OF BRIEF**

This document should be approved by Sean before Codex starts building.
