# OpenClaw Directory - Reference Sites

Study these before making any design or UX decisions.

## Primary Reference: cursor.directory
**URL:** https://cursor.directory  
**Study date:** 2026-02-08  
**Type:** Simple directory/catalog (NOT marketplace)

**Key characteristics:**
- Left sidebar: Categories with counts
- Main area: Skill cards (name, description, tags)
- Detail page: Full content + copy button + metadata
- **No purchases, no payments, no transactions** - just browse and copy
- Clean, minimal aesthetic
- Focus on discoverability and ease of use

**Lesson learned (Feb 8):** "Directory" ≠ "Marketplace". Don't assume commerce features based on database schema. Study the UX first.

---

## Secondary Reference: skills.sh
**URL:** https://skills.sh  
**Study date:** 2026-02-09  
**Type:** Agent skills directory with leaderboard

**Key characteristics:**
- Tagline: "The Open Agent Skills Ecosystem"
- ASCII art branding (████ style logo)
- Install command: `npx skills add <owner/repo>`
- Skills Leaderboard (sorted by installs)
- Search functionality
- Focus on "reusable capabilities for AI agents"
- One-command install emphasis

**Differentiators from cursor.directory:**
- More technical/developer-focused branding
- Leaderboard/ranking system (popular skills first)
- NPM-based install (vs cursor's copy-paste rules)
- "Open ecosystem" positioning

**Potential ideas for OpenClaw:**
- Leaderboard could be interesting (most installed skills)
- Install count as social proof
- Search is table stakes (both have it)
- ASCII art branding is memorable but maybe too technical?

---

## OpenClaw Directory Positioning

**What we're building:**
- Simple directory/catalog for Clawdbot skills (like cursor.directory)
- Browse, search, copy install commands
- GitHub-synced skill library
- Clean, accessible design
- **Pure black aesthetic** (from original brief)

**What we're NOT building:**
- Marketplace with payments (learned this the hard way Feb 8)
- Complex commerce features
- User authentication for browsing (GitHub OAuth only for submissions)
- Paywalls or premium tiers

**Core features to implement:**
1. Browse skills by category
2. Search with full-text + fuzzy matching
3. Copy install command (`clawdhub install <skill-name>`)
4. View skill details (readme, metadata, install stats)
5. GitHub auto-sync (keep directory current)
6. User submissions (moderated queue)
7. Analytics (install tracking, trending skills)

**Competitive advantages:**
- Clawdbot-specific (not generic agent skills)
- GitHub auto-sync (fresh content)
- Moderation queue (quality control)
- Analytics (popular_skills and trending_skills views)
- Clean, pure black design (distinctive aesthetic)

---

## Design Principles (from studying references)

1. **Simplicity first** - Both references are dead simple to use
2. **Search is critical** - Primary way users find skills
3. **Social proof matters** - Install counts, trending indicators
4. **One-click actions** - Copy button, install command
5. **Categorization helps** - But search is more important
6. **Metadata matters** - Author, last updated, install count

---

**Last updated:** 2026-02-09  
**Next steps:** Run SQL migration, verify build matches these references
