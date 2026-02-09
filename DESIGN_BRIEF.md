# OpenClaw Directory Redesign Brief

## Reference Design
Study this screenshot: ~/clawd/openclaw-marketplace/cursor-directory-reference.jpg

Match cursor.directory's design EXACTLY.

## Critical Requirements

### Colors
- **Background:** Pure black (#000000)
- **Text:** White (#ffffff) for headings, gray (#a1a1a1 / #6b7280) for descriptions
- **Cards:** Dark gray background (#1a1a1a or similar)
- **Borders:** Subtle dark gray (#2a2a2a or #374151)
- **NO PURPLE:** Only black, white, and grays

### Typography
- Use Inter font (or system sans-serif stack as fallback)
- **Headings:** Clean, not too bold
- **Body:** Readable, gray text
- **Sizes:** Keep them reasonable - not too large

### Layout
- Clean, minimal spacing
- 4-column grid for skill cards
- Section headers with "View all →" links
- Sticky header with minimal nav

### Card Design
- Dark gray background
- Subtle border
- Minimal hover effect (just border color change)
- Clean typography
- Price badge in corner
- Install count in small gray text

### Navigation Header
- Black background
- White logo text
- Gray nav links that turn white on hover
- "Sign in" button with white background

### Overall Aesthetic
- **Minimal** - no fancy effects
- **Clean** - lots of breathing room but not excessive
- **Professional** - like a real SaaS product directory
- **Content-focused** - let the skills shine

## Current Files
- `app/page.tsx` - main homepage (needs complete rewrite)
- `app/globals.css` - global styles (update colors and fonts)
- `app/layout.tsx` - app shell (should be fine)

## Task
Completely rebuild the homepage to match cursor.directory's aesthetic. Study the reference image carefully and replicate the exact feel.

When finished, run:
```bash
clawdbot gateway wake --text "Done: Rebuilt OpenClaw Directory to match cursor.directory design" --mode now
```
