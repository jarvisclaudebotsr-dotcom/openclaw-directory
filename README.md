# OpenClaw Directory

A minimal, cursor.directory-style skills directory for OpenClaw community skills.

## Design Philosophy

- **Pure black** (#000000) - No gradients, no decorative elements
- **Minimal & flat** - Information-dense, small fonts (12-14px)
- **Fast & lightweight** - No heavy animations or complex interactions
- **Mobile responsive** - 4 → 2 → 1 column grid

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Static JSON data

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure domain: `openclawdirectory.ai`
4. Deploy automatically on every push

### Environment Variables

No environment variables needed - site uses static data from `data/skills.json`.

## Project Structure

```
├── app/
│   ├── page.tsx                 # Home page (featured + latest)
│   ├── layout.tsx               # Root layout with header
│   ├── skills/
│   │   ├── page.tsx            # Browse all skills
│   │   └── [slug]/page.tsx     # Skill detail page
│   └── categories/
│       └── [category]/page.tsx # Category view
├── components/
│   ├── Header.tsx              # Site header
│   ├── SkillCard.tsx           # Skill card component
│   ├── SearchBar.tsx           # Search input
│   └── InstallCommand.tsx      # Install command with copy
├── data/
│   └── skills.json             # Skills database (static)
├── lib/
│   └── skills.ts               # Skills data helpers
└── public/                     # Static assets
```

## Adding New Skills

Edit `data/skills.json`:

```json
{
  "id": "skill-name",
  "name": "skill-name",
  "emoji": "🎯",
  "description": "Short description (1-2 lines)",
  "version": "1.0.0",
  "category": "Development Tools",
  "tags": ["tag1", "tag2"],
  "githubUrl": "https://github.com/...",
  "installs": 1000,
  "updatedAt": "2026-02-08",
  "featured": false
}
```

## Features

- ✅ Browse all skills (4-column grid)
- ✅ Search skills (real-time filtering)
- ✅ Category filtering
- ✅ Skill detail pages
- ✅ Install command with copy button
- ✅ Mobile responsive
- ✅ Pure black, minimal design

## Design Specs

```css
Background: #000000 (pure black)
Card: #0a0a0a
Border: #1a1a1a
Border Hover: #2a2a2a
Text Primary: #ffffff
Text Secondary: #a1a1a1
Text Muted: #6b7280

Fonts:
- Body: 12-14px
- Headings: 14-20px
- Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
```

## License

MIT
