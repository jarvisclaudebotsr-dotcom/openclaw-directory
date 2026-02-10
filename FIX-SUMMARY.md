# OpenClaw Directory - Fix Summary

## Problem
Two dynamic routes were broken and showing only header/footer with no main content:
1. `/skills/[slug]` - Skill detail page
2. `/categories/[category]` - Category listing page

Both pages returned 404 errors despite the data existing in `data/skills.json`.

## Root Cause

**Issue #1: Next.js 15+ Breaking Change - Async Params**

In Next.js 15+ (running 16.1.6), the `params` prop in dynamic routes is now a **Promise** that must be awaited before accessing its properties. The old synchronous access pattern no longer works.

**Error Message:**
```
Error: Route "/skills/[slug]" used `params.slug`. 
`params` is a Promise and must be unwrapped with `await` or `React.use()` 
before accessing its properties.
```

**Issue #2: Client-Side Event Handlers in Server Components**

After fixing the params issue, a second error appeared: the Share button in the skill detail page used `onClick` with browser APIs (`navigator.clipboard`), which is not allowed in async server components.

**Issue #3: Category ID Mismatch**

The category filtering logic didn't properly handle ampersands (`&`) in category names:
- Skills data: `"category": "Memory & Identity"`
- Category IDs: `"memory-identity"` (no ampersand)
- Transform function: Only replaced spaces with dashes, not ampersands

## Solutions

### 1. Fixed Async Params (Both Pages)

**File: `app/skills/[slug]/page.tsx`**
```typescript
// BEFORE
export default function SkillPage({ params }: { params: { slug: string } }) {
  const skill = getSkill(params.slug)
  
// AFTER
export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = getSkill(slug)
```

**File: `app/categories/[category]/page.tsx`**
```typescript
// BEFORE
export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category)
  const skills = getSkillsByCategory(params.category)
  
// AFTER
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params
  const category = getCategory(categoryId)
  const skills = getSkillsByCategory(categoryId)
```

Also updated `generateStaticParams` in both files to be async (best practice).

### 2. Extracted Client Component

**New File: `app/skills/[slug]/ActionsSidebar.tsx`**

Created a separate `"use client"` component for the actions sidebar containing the Share button with onClick handler:

```typescript
"use client"

import { Github, Share2 } from "lucide-react"

export function ActionsSidebar({ githubUrl }: { githubUrl: string }) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  
  return (
    <div className="space-y-3 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4">
      {/* GitHub and Share buttons */}
    </div>
  )
}
```

### 3. Fixed Category Filtering

**File: `lib/skills.ts`**

Updated `getSkillsByCategory` to handle ampersands:

```typescript
// BEFORE
export function getSkillsByCategory(categoryId: string): Skill[] {
  return skillsData.skills.filter((skill) => 
    skill.category.toLowerCase().replace(/\s+/g, "-") === categoryId
  )
}

// AFTER
export function getSkillsByCategory(categoryId: string): Skill[] {
  return skillsData.skills.filter((skill) => 
    skill.category.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-") === categoryId
  )
}
```

**File: `app/skills/[slug]/page.tsx`**

Updated breadcrumb link generation:

```typescript
// BEFORE
href={`/categories/${skill.category.toLowerCase().replace(/\s+/g, "-")}`}

// AFTER
href={`/categories/${skill.category.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-")}`}
```

## Verification

### Manual Testing
✅ **Skill Detail Page** (`/skills/soul-personality`):
- Full content renders correctly
- Breadcrumb navigation works
- Quick install section displays
- Documentation section displays
- Related skills section displays
- Sidebar with actions and details displays
- Category link in breadcrumb works

✅ **Category Page** (`/categories/memory-identity`):
- Header with category info displays
- Shows "2 skills in this category" (was 0 before)
- Shows "34k+ total installs"
- Both skills display correctly (soul-personality, memory-system)
- Search and filter UI works
- Category navigation works

### Build Testing
✅ **TypeScript compilation** passed with no errors
✅ **Static generation** completed for all 34 routes
✅ **Production build** succeeded

```bash
npm run build
✓ Compiled successfully in 1478.7ms
✓ Generating static pages using 9 workers (34/34) in 1494.8ms
```

## Files Modified

1. **app/skills/[slug]/page.tsx** - Made async, fixed params, imported ActionsSidebar, updated breadcrumb
2. **app/skills/[slug]/ActionsSidebar.tsx** - NEW - Client component for Share button
3. **app/categories/[category]/page.tsx** - Made async, fixed params
4. **lib/skills.ts** - Fixed category filtering to handle ampersands

## Key Learnings

1. **Next.js 15+ params are Promises**: Always await params in dynamic routes
2. **Server vs Client Components**: Browser APIs (like `navigator`) require client components
3. **String normalization**: When transforming category names to slugs, handle special characters consistently (ampersands, spaces, etc.)
4. **Type safety**: Update TypeScript types when changing from sync to async (params type becomes `Promise<{...}>`)

## Migration Notes

This fix is necessary for any Next.js app upgrading from v14 or earlier to v15+. The params change is a breaking change that requires code updates in all dynamic routes.

**Date Fixed:** 2026-02-09  
**Next.js Version:** 16.1.6  
**Fixed By:** Nightly Builder (Subagent)
