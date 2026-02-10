# OpenClaw Directory - Improvement Plan

**Created:** 2026-02-09  
**Based on:** cursor-directory-analysis.md

## Priority 1: Skill Cards & Detail Pages 🎯

### Skill Card Improvements
- [ ] Add hover effects (border glow matching cursor.directory)
- [ ] Improve compact card layout for mobile
- [ ] Add "New" badge for skills added in last 7 days
- [ ] Better tag display (show all on hover/expansion)
- [ ] Add author avatar/profile link

### Skill Detail Pages
- [ ] Create full detail page with:
  - Large emoji/icon at top
  - Full description (markdown support)
  - Installation instructions (copy button)
  - Requirements section
  - Usage examples
  - Changelog
  - Related skills sidebar
  - GitHub stats (stars, forks, last commit)
- [ ] Add "Install" button with copy-to-clipboard
- [ ] Add social share buttons
- [ ] Add "Report" button for quality issues

## Priority 2: Search & Filter 🔍

### Homepage Search
- [x] Basic search implemented
- [ ] Add instant search results dropdown
- [ ] Add search suggestions/autocomplete
- [ ] Add recent searches
- [ ] Add keyboard navigation (arrow keys, enter)

### Advanced Filtering
- [ ] Add filter sidebar on /skills page:
  - Category multi-select
  - Tags filter
  - Sort by: Popular, Recent, Stars, Installs
  - "Featured only" toggle
  - "Official only" toggle
- [ ] Add URL params for shareable filtered views
- [ ] Add "Clear filters" button

## Priority 3: Category Pages 📂

- [ ] Create individual category pages (/categories/[slug])
- [ ] Show category description/header
- [ ] Show all skills in category (paginated)
- [ ] Show category stats (# skills, total installs)
- [ ] Add breadcrumbs
- [ ] Add "Related categories" section

## Priority 4: SEO Meta Tags 🚀

### Homepage
- [ ] Add proper title, description, og:image
- [ ] Add JSON-LD schema for WebSite
- [ ] Add keywords meta tag

### Skill Pages
- [ ] Dynamic meta tags per skill
- [ ] Add JSON-LD schema for SoftwareApplication
- [ ] Add og:image (generate dynamic cards?)
- [ ] Add twitter:card meta tags

### Sitemap
- [x] Basic sitemap exists
- [ ] Add lastmod dates
- [ ] Add priority values
- [ ] Add changefreq

## Priority 5: Mobile Responsiveness 📱

- [ ] Test all pages on mobile
- [ ] Fix card layouts on small screens
- [ ] Improve touch targets (buttons, links)
- [ ] Add mobile navigation menu
- [ ] Test search on mobile
- [ ] Optimize font sizes for mobile

## Priority 6: Speed Optimizations ⚡

- [ ] Add loading states for search
- [ ] Implement image lazy loading
- [ ] Add skeleton loaders for cards
- [ ] Optimize bundle size (check unused deps)
- [ ] Add service worker for caching
- [ ] Optimize fonts (preload)

## Additional Improvements

### User Experience
- [ ] Add "Back to top" button on long pages
- [ ] Add breadcrumbs on all pages
- [ ] Add 404 page with search
- [ ] Add loading states everywhere
- [ ] Add error boundaries

### Content
- [ ] Generate better descriptions with AI (Gemini)
- [ ] Add "How to use" section for each skill
- [ ] Add video tutorials (optional)
- [ ] Add community ratings/reviews

### Analytics
- [ ] Track search queries
- [ ] Track popular skills
- [ ] Track category clicks
- [ ] Track install button clicks

## Quick Wins (Do First) 🎉

1. ✅ Skill detail pages (biggest missing feature)
2. ✅ SEO meta tags (easy, high impact)
3. ✅ Mobile fixes (critical for users)
4. ✅ Search improvements (usability)
5. ✅ Category pages (navigation)

---

**Goal:** Make OpenClawDirectory.ai the best skill discovery platform, matching cursor.directory's quality while adding unique value.

**Success Metrics:**
- All skills have detail pages
- Mobile score >90 on Lighthouse
- SEO score >95 on Lighthouse
- Search works instantly
- Zero console errors

**Timeline:** Complete in 2-3 days, announce on Twitter
