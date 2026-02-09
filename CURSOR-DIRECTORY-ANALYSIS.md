# cursor.directory Analysis - Replication Guide

**Date:** 2026-02-08  
**Site:** https://cursor.directory/

---

## Design Analysis

### Color Palette

**Background:**
- Pure black: `#000000`
- Dark cards: `#0a0a0a` or `#111111`
- Borders: `#1a1a1a` or `#222222`

**Text:**
- Headings: `#ffffff` (pure white)
- Body text: `#a1a1a1` (light gray)
- Muted text: `#6b7280` (darker gray)
- Links: `#ffffff` → `#a1a1a1` on hover

**Accents:**
- Minimal use of color
- Occasional badges/tags in subtle grays
- No bright colors (very minimal)

### Typography

**Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
  'Helvetica Neue', Arial, sans-serif;
```

**Sizes:**
- Page title: `text-4xl` (36px)
- Section headers: `text-xl` (20px)
- Card titles: `text-sm` (14px) font-medium
- Body text: `text-xs` (12px)
- Very compact, information-dense

**Weights:**
- Headers: font-semibold (600)
- Card titles: font-medium (500)
- Body: font-normal (400)

### Layout Structure

**Container:**
- Max width: `1280px` (max-w-7xl)
- Padding: `px-6` (24px horizontal)
- Centered with `mx-auto`

**Grid:**
- 4 columns on desktop: `grid-cols-4`
- 2 columns on tablet: `md:grid-cols-2`
- 1 column on mobile: `grid-cols-1`
- Gap: `gap-4` (16px between items)

**Sections:**
- Each category = separate section
- Section header with "View all →" link
- Consistent spacing between sections (`mb-16`)

### Component Design

#### Card Component

```
Structure:
┌─────────────────────────┐
│ [Icon] Title       [👤] │  ← Header with icon & avatar
├─────────────────────────┤
│ Description text that   │  ← 2-3 lines, truncated
│ spans multiple lines... │
├─────────────────────────┤
│ Tag   Tag   Tag         │  ← Tags/categories
│ 123 installs            │  ← Stats
└─────────────────────────┘
```

**Styling:**
- Background: `#0a0a0a` or `#111111`
- Border: `1px solid #1a1a1a`
- Border radius: `8px` (rounded-lg)
- Padding: `20px` (p-5)
- Hover: Border color → `#2a2a2a`
- Transition: `transition-colors`
- No shadow, no elevation
- Completely flat design

#### Header Component

```
┌──────────────────────────────────────────────────┐
│ Logo                   Nav1  Nav2  Nav3  [Button]│
└──────────────────────────────────────────────────┘
```

**Styling:**
- Background: `#000000`
- Border bottom: `1px solid #111111`
- Sticky: `sticky top-0`
- Backdrop blur: `backdrop-blur-sm`
- Height: `64px`

**Navigation:**
- Text color: `#6b7280` (gray)
- Hover: `#ffffff` (white)
- Font size: `text-sm` (14px)
- Spacing: `gap-6` (24px between items)

**CTA Button:**
- Background: `#ffffff`
- Text: `#000000`
- Padding: `px-4 py-2`
- Border radius: `6px`
- Hover: `#f3f4f6`

### Hero Section

```
┌──────────────────────────────────────────┐
│          CURSOR DIRECTORY                │  ← Small label
│                                          │
│   The home for Cursor enthusiasts       │  ← Large heading
│                                          │
│   Descriptive subtext about what        │  ← Body text
│   this directory provides...            │
│                                          │
│   [     Search bar placeholder     ]    │  ← Search input
└──────────────────────────────────────────┘
```

**Styling:**
- Text alignment: `text-center`
- Max width: `max-w-3xl mx-auto`
- Padding: `py-16` (64px vertical)
- Background: Subtle gradient from black to slightly lighter

**Search Input:**
- Width: `w-full max-w-xl`
- Background: `#000000`
- Border: `1px solid #222222`
- Padding: `px-4 py-3`
- Border radius: `8px`
- Focus: Border → `#333333`
- No box shadow

### Stats Section

```
┌────────────────┬────────────────┬────────────────┐
│     120+       │      48        │     9.2k       │
│ Skills available│ Verified creators│ Total installs │
└────────────────┴────────────────┴────────────────┘
```

**Styling:**
- Grid: `grid-cols-3`
- Text align: `text-center`
- Numbers: `text-3xl font-semibold text-white`
- Labels: `text-sm text-gray-500`
- Background: Slightly lighter than pure black
- Border top/bottom: `1px solid #111111`

---

## Technical Implementation

### Tech Stack (Inferred)

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

**Components:**
- Likely using shadcn/ui or similar
- Custom components built on Radix UI primitives
- Very minimal, no heavy UI library

**Hosting:**
- Vercel (fast CDN, automatic deployments)

**Database:** (Not visible from frontend)
- Likely Supabase or similar
- Or static JSON files if no user accounts

### Responsive Breakpoints

```css
/* Mobile first approach */
sm: '640px'   /* Tablets */
md: '768px'   /* Small laptops */
lg: '1024px'  /* Desktops */
xl: '1280px'  /* Large desktops */
```

**Grid adjustments:**
- Mobile: 1 column
- Tablet (md:): 2 columns
- Desktop (lg:): 4 columns

### Animation/Interaction

**Minimal animations:**
- Color transitions: `transition-colors duration-200`
- No sliding, fading, or complex animations
- Instant responsiveness
- Hover effects only

**Interactions:**
- Card hover: Border color change
- Link hover: Text color change
- Button hover: Background color change
- No tooltips, no modals (on homepage)

---

## Replication Checklist

### Phase 1: Design System

- [x] Set up Tailwind with pure black background
- [ ] Configure color palette (black/white/grays only)
- [ ] Set up typography scale
- [ ] Add shadcn/ui components (button, card, input, badge)
- [ ] Create custom card component matching their design

### Phase 2: Layout

- [ ] Header component (sticky, minimal nav)
- [ ] Hero section (centered, search bar)
- [ ] Stats section (3-column grid)
- [ ] Category sections (repeatable pattern)
- [ ] Footer (simple, 4-column grid)

### Phase 3: Components

- [ ] SkillCard component (matches cursor.directory cards exactly)
- [ ] SectionHeader component ("Title" + "View all →")
- [ ] SearchInput component (black background, gray border)
- [ ] CategoryBadge component (subtle gray pills)
- [ ] CreatorAvatar component (small circular avatars)

### Phase 4: Content

- [ ] AI-generate skill descriptions (Gemini 3 Flash)
- [ ] Create category pages
- [ ] Add proper meta tags/SEO
- [ ] Generate sitemap

---

## Key Design Principles

### 1. Extreme Minimalism
- No decorative elements
- No illustrations or graphics
- Pure typography and layout
- Content is the design

### 2. Information Density
- Small font sizes (12-14px for body)
- Tight line heights
- Maximum content on screen
- No wasted space

### 3. Flat Design
- No shadows
- No gradients (except subtle hero background)
- No depth effects
- Completely 2D aesthetic

### 4. Monochromatic
- Black, white, and grays only
- No color accents (or extremely minimal)
- Focus on content, not decoration

### 5. Speed/Performance
- Minimal JavaScript
- Fast page loads
- No heavy libraries
- Optimized images

---

## Component Code Examples

### SkillCard Component (shadcn/ui style)

```typescript
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillCardProps {
  name: string
  description: string
  category: string
  price: number
  installs?: number
}

export function SkillCard({ name, description, category, price, installs }: SkillCardProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors">
      <CardHeader className="pb-3">
        <h3 className="text-sm font-medium text-white line-clamp-1">
          {name}
        </h3>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-xs text-gray-500 line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="pt-3 flex items-center justify-between border-t border-[#1a1a1a]">
        <span className="text-sm font-medium text-white">${price}</span>
        {installs && (
          <span className="text-xs text-gray-600">{installs} installs</span>
        )}
      </CardFooter>
    </Card>
  )
}
```

### SearchInput Component

```typescript
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchInput() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input 
        placeholder="Search skills, creators, categories..."
        className="w-full bg-black border-[#222222] text-white pl-11 pr-4 py-3 
          focus:border-[#333333] focus:ring-0 rounded-lg"
      />
    </div>
  )
}
```

### SectionHeader Component

```typescript
import Link from "next/link"

interface SectionHeaderProps {
  title: string
  href: string
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <Link 
        href={href}
        className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
      >
        View all →
      </Link>
    </div>
  )
}
```

---

## Tailwind Config Updates

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        card: "#0a0a0a",
        border: "#1a1a1a",
        "border-hover": "#2a2a2a",
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Performance Optimizations

### Image Optimization
- Use Next.js Image component
- Lazy load images below fold
- WebP format with fallbacks
- Proper sizing attributes

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (built-in with Next.js)
- Lazy load below-the-fold content

### Caching
- Static generation for skill pages
- ISR (Incremental Static Regeneration) for dynamic content
- CDN caching via Vercel

---

## SEO Implementation

### Meta Tags Template

```typescript
// app/skills/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const skill = await getSkill(params.slug)
  
  return {
    title: `${skill.name} - OpenClaw Directory`,
    description: skill.description,
    openGraph: {
      title: skill.name,
      description: skill.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: skill.name,
      description: skill.description,
    },
  }
}
```

### Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Skill Name",
  "description": "Skill description",
  "offers": {
    "@type": "Offer",
    "price": "49.00",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "24"
  }
}
```

---

## Next Steps

1. **Install shadcn/ui components** ✅
   - button, card, input, badge

2. **Rebuild homepage** with cursor.directory aesthetic
   - Pure black background
   - Minimal design
   - Information-dense cards

3. **Set up Gemini 3 Flash**
   - API integration
   - Content generation scripts
   - AI-powered skill descriptions

4. **Create reusable components**
   - SkillCard (matches cursor.directory exactly)
   - SectionHeader
   - SearchInput
   - CreatorAvatar

5. **Add Supabase + Stripe**
   - Database for skills
   - Authentication
   - Payment processing

---

**Goal:** Match cursor.directory's aesthetic EXACTLY while adding our marketplace functionality.

**Timeline:** Complete in 1-2 weeks, launch on Product Hunt.

**Success metric:** "Looks just like cursor.directory but for OpenClaw skills" 🎯

---

*Analysis completed: 2026-02-08*
