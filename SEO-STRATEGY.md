# SEO Strategy for OpenClawDirectory.ai

**Goal:** Become the #1 result for "Claude skills", "OpenClaw skills", "AI agent tools", and related queries.

**Last Updated:** February 9, 2026

---

## Executive Summary

OpenClawDirectory.ai is positioned to dominate AI agent skills search results through:
1. **Technical SEO excellence** - Proper meta tags, structured data, sitemaps
2. **Keyword-targeted landing pages** - Dedicated pages for high-value search terms
3. **Content depth** - Comprehensive skill listings with rich metadata
4. **Backlink strategy** - Strategic directory submissions and community engagement

**Target Keywords (Priority Order):**
1. Claude skills
2. OpenClaw skills
3. AI agent tools
4. Claude Code skills
5. agent skills directory
6. Clawdbot skills
7. Cursor agent skills
8. AI agent marketplace

---

## Current State (February 2026)

### ✅ Implemented
- [x] Root layout metadata with comprehensive keywords
- [x] Dynamic metadata for all skill pages (generateMetadata)
- [x] Schema.org structured data (SoftwareApplication for skills)
- [x] Organization & Website structured data (JSON-LD)
- [x] robots.txt with proper directives
- [x] Dynamic sitemap.xml (includes all skills + categories)
- [x] Keyword-targeted landing pages (/claude-skills, /ai-agent-tools)
- [x] Internal linking strategy (homepage → landing pages)
- [x] Open Graph tags for social sharing
- [x] Twitter Card metadata
- [x] Canonical URLs for all pages

### Technical SEO Checklist
- [x] Meta titles (< 60 characters)
- [x] Meta descriptions (< 160 characters)
- [x] Heading hierarchy (H1 → H2 → H3)
- [x] Alt text for images (via emoji/icon components)
- [x] Mobile-responsive design (Tailwind responsive classes)
- [x] Fast page loads (Next.js SSG)
- [x] HTTPS enabled (via Vercel)
- [x] XML sitemap
- [x] robots.txt
- [x] Structured data (JSON-LD)

---

## Competitive Analysis

### Competitors
1. **cursor.directory** - Cursor-focused, less comprehensive
2. **awesomeclaude.ai** - GitHub list visualization, not a full directory
3. **skillsmp.com** - Generic agent skills, poor UX
4. **mcpmarket.com** - MCP-focused, different niche
5. **claudemarketplaces.com** - Plugin marketplaces directory (meta-directory)

### Our Advantages
- **Cross-platform focus** - Works with Claude, Cursor, Clawdbot, OpenClaw
- **One-click install** - ClawdHub CLI integration
- **Community-driven** - Open submissions, GitHub integration
- **Better UX** - Modern design, fast search, clean navigation
- **SEO-optimized** - Proper metadata, structured data, keyword pages

### Keyword Gaps to Fill
- "Claude agent plugins" (low competition)
- "install Claude skills" (high intent)
- "OpenClaw directory" (branded, must own)
- "agent skills marketplace" (medium competition)
- "AI automation tools directory" (broad, high volume)

---

## Content Strategy

### Landing Pages (Created)
1. **/claude-skills** - Targets "Claude skills", "Claude Code skills"
2. **/ai-agent-tools** - Targets "AI agent tools", "agent tools directory"

### Future Landing Pages (Recommended)
3. **/cursor-skills** - Target "Cursor skills", "Cursor agent"
4. **/clawdbot-skills** - Target "Clawdbot", "OpenClaw Clawdbot"
5. **/agent-skills-install** - How-to guide for "install agent skills"
6. **/best-claude-skills** - Curated list for "best Claude skills"

### Content Types to Add
- **Guides & Tutorials** - "How to create a Claude skill", "Getting started with OpenClaw"
- **Skill Showcases** - Featured skill spotlights with detailed use cases
- **Comparison Pages** - "Claude vs Cursor skills", "Best skills for developers"
- **Category Landing Pages** - Enhanced pages for each category with SEO content

### Keyword Optimization by Page

| Page | Primary Keyword | Secondary Keywords | Status |
|------|----------------|-------------------|--------|
| Homepage | OpenClaw Directory | AI agent skills, Claude skills, skill marketplace | ✅ |
| /claude-skills | Claude skills | Claude Code skills, Claude.ai skills | ✅ |
| /ai-agent-tools | AI agent tools | agent tools directory, AI automation | ✅ |
| /skills/[slug] | [Skill Name] | skill category, tags | ✅ |
| /categories/[slug] | [Category] skills | Related category terms | 🔄 Needs enhancement |

---

## Schema.org Implementation

### Implemented Structured Data

**1. SoftwareApplication (Skill Pages)**
```json
{
  "@type": "SoftwareApplication",
  "name": "Skill Name",
  "description": "...",
  "applicationCategory": "DeveloperApplication",
  "softwareVersion": "1.0.0",
  "aggregateRating": {...},
  "codeRepository": "GitHub URL"
}
```

**2. Organization (Site-wide)**
```json
{
  "@type": "Organization",
  "name": "OpenClaw Directory",
  "url": "https://openclawdirectory.ai",
  "logo": "...",
  "sameAs": ["Twitter", "GitHub"]
}
```

**3. WebSite (Site-wide)**
```json
{
  "@type": "WebSite",
  "name": "OpenClaw Directory",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "...?search={query}"
  }
}
```

**4. ItemList (Site-wide)**
```json
{
  "@type": "ItemList",
  "name": "AI Agent Skills",
  "numberOfItems": "100+"
}
```

### Potential Enhancements
- Add **BreadcrumbList** schema to skill pages
- Add **Review** schema when user reviews are available
- Add **HowTo** schema for installation guides
- Add **FAQPage** schema for support/docs

---

## Internal Linking Strategy

### Hub & Spoke Model
**Hub:** Homepage (authority page)  
**Spokes:** 
- /claude-skills (keyword page)
- /ai-agent-tools (keyword page)
- /skills (browse page)
- Individual skill pages (long-tail keywords)

### Link Flow
1. Homepage → Keyword landing pages (above fold)
2. Homepage → Categories → Skills (navigation)
3. Keyword pages → Category pages → Skills (contextual)
4. Skill pages → Related skills (sidebar + "people also use")
5. Footer → All major pages (global nav)

### Anchor Text Strategy
- **Exact match** (sparingly): "Claude skills", "AI agent tools"
- **Branded**: "OpenClaw Directory", "Browse skills"
- **Partial match**: "skills for Claude Code", "agent automation tools"
- **Natural**: "Discover more →", "View all skills"

---

## Technical Implementation Details

### Meta Tag Template (Skill Pages)
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const skill = getSkill(params.slug)
  return {
    title: `${skill.name} - OpenClaw Skill | ${skill.category}`,
    description: `${skill.description} Install for Clawdbot, Claude Code...`,
    keywords: [skill.name, ...skill.tags, 'OpenClaw', ...],
    openGraph: { /* full OG tags */ },
    twitter: { /* Twitter cards */ },
    alternates: { canonical: skillUrl }
  }
}
```

### Sitemap Generation
- **Static pages**: Homepage, /skills, /submit, /claude-skills, /ai-agent-tools
- **Dynamic skill pages**: Fetched from Supabase (approved only)
- **Dynamic category pages**: Generated from categories table
- **Update frequency**: Daily for static, weekly for skills
- **Priority**: Homepage (1.0), Keywords (0.9), Skills (0.7), Categories (0.6)

### robots.txt Rules
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Sitemap: https://openclawdirectory.ai/sitemap.xml
```

---

## Performance Optimizations

### Current (Next.js Defaults)
- [x] Static Site Generation (SSG) for all pages
- [x] Automatic code splitting
- [x] Image optimization (Next.js Image component)
- [x] Font optimization (next/font)
- [x] Analytics (Vercel Analytics)

### Recommended Additions
- [ ] Add Core Web Vitals monitoring
- [ ] Implement lazy loading for below-fold skills
- [ ] Add service worker for offline support
- [ ] Optimize bundle size (check with `next-bundle-analyzer`)
- [ ] Add Redis caching for skill data (if needed at scale)

---

## Backlink Strategy

See **~/clawd/research/seo-backlinks.md** for detailed backlink opportunities.

### High Priority
1. Submit to AI tool directories (e.g., There's An AI For That, AI Tool Hunt)
2. Post in Claude/Cursor communities (Reddit, Discord, Twitter)
3. Get featured in awesome-* lists (awesome-claude-skills, awesome-ai-tools)
4. Write guest posts on AI dev blogs
5. Collaborate with skill creators for mutual promotion

### Medium Priority
6. Product Hunt launch
7. Hacker News "Show HN" post
8. Dev.to / Hashnode articles
9. YouTube demos/tutorials
10. Podcast appearances (AI/dev podcasts)

---

## Monitoring & KPIs

### SEO Metrics to Track
- **Organic traffic** (Google Analytics)
- **Keyword rankings** (Google Search Console)
  - Target: Top 3 for "Claude skills" within 3 months
  - Target: Top 5 for "AI agent tools" within 3 months
- **Click-through rate** (Search Console)
- **Bounce rate** (GA4)
- **Pages per session** (GA4)
- **Backlink count** (Ahrefs / SEMrush)
- **Domain authority** (Moz)

### Weekly Review Checklist
- [ ] Check Search Console for new keyword opportunities
- [ ] Review top landing pages (optimize low performers)
- [ ] Monitor competitor rankings
- [ ] Check for broken links (internal + external)
- [ ] Review structured data in Google Rich Results Test
- [ ] Track new backlinks (Google Alerts)

### Monthly Review Checklist
- [ ] Content gap analysis (keywords we're missing)
- [ ] Create 2-3 new landing pages for emerging keywords
- [ ] Update existing pages with fresh content
- [ ] Refresh structured data if schema changes
- [ ] Audit internal linking (add more where needed)

---

## Next Steps (Priority Order)

1. **Immediate (Week 1)**
   - [x] Implement dynamic metadata for skill pages
   - [x] Add structured data (SoftwareApplication, Organization)
   - [x] Create /claude-skills and /ai-agent-tools landing pages
   - [x] Update sitemap with new pages
   - [ ] Submit sitemap to Google Search Console
   - [ ] Submit to Bing Webmaster Tools

2. **Short-term (Weeks 2-4)**
   - [ ] Create /cursor-skills landing page
   - [ ] Enhance category pages with SEO content
   - [ ] Write "How to Install Claude Skills" guide
   - [ ] Submit to 10 backlink opportunities (see backlinks.md)
   - [ ] Set up Google Search Console monitoring
   - [ ] Create og-image.png for social sharing

3. **Medium-term (Months 2-3)**
   - [ ] Launch Product Hunt campaign
   - [ ] Write 3 guest blog posts
   - [ ] Create video tutorials (YouTube SEO)
   - [ ] Build "Best Skills" curated lists
   - [ ] Implement user reviews (adds social proof + fresh content)
   - [ ] Add blog section for regular content updates

4. **Long-term (Months 4-6)**
   - [ ] Build API for skill data (attract integrations)
   - [ ] Create embeddable widgets (backlink generation)
   - [ ] Launch affiliate/partnership program
   - [ ] Translate high-value pages to other languages
   - [ ] Build "Trending Skills" feature (FOMO + recrawl trigger)

---

## Risk Mitigation

### Potential Issues
1. **Low domain authority** - New site, no backlinks yet
   - Mitigation: Aggressive backlink campaign, community engagement
   
2. **Thin content on skill pages** - Just metadata, no rich descriptions
   - Mitigation: Add user-generated content (reviews, comments, use cases)
   
3. **Duplicate content** - Skills exist on GitHub already
   - Mitigation: Add unique value (install stats, reviews, related skills)
   
4. **Keyword cannibalization** - Multiple pages targeting similar terms
   - Mitigation: Clear keyword mapping, canonical tags, careful interlinking

### Google Algorithm Considerations
- **Helpful Content Update** - Ensure all pages have unique, helpful info
- **E-E-A-T** (Experience, Expertise, Authority, Trust) - Highlight community contributions
- **Core Web Vitals** - Keep pages fast (<2.5s LCP, <100ms FID, <0.1 CLS)

---

## Success Metrics (3-Month Goals)

| Metric | Current (Feb 2026) | 3-Month Goal (May 2026) |
|--------|-------------------|------------------------|
| Organic Traffic/Month | ~100 (new site) | 5,000+ |
| "Claude skills" Ranking | Not ranked | Top 3 |
| "AI agent tools" Ranking | Not ranked | Top 5 |
| Domain Backlinks | ~5 | 50+ |
| Indexed Pages | ~120 | 150+ |
| Average Session Duration | TBD | 2+ minutes |
| Pages/Session | TBD | 3+ |

---

## Resources & Tools

### SEO Tools to Use
- **Google Search Console** - Keyword tracking, indexing issues
- **Google Analytics 4** - Traffic analysis, user behavior
- **Ahrefs / SEMrush** - Competitor analysis, backlink tracking
- **Google Rich Results Test** - Validate structured data
- **PageSpeed Insights** - Performance monitoring
- **Screaming Frog** - Technical SEO audits

### Documentation
- [Agent Skills Specification](https://github.com/clawdbot/openclaw-skills)
- [Next.js SEO Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Google Search Central](https://developers.google.com/search/docs)

---

**Last Reviewed:** February 9, 2026  
**Next Review:** March 9, 2026  
**Maintained By:** Clawdbot SEO Agent
