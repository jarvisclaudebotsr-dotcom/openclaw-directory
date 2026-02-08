# OpenClaw Directory

Premium skills marketplace for OpenClaw agents. Browse, search, and purchase high-quality agent skills from verified creators.

## 🚀 Features

- **Browse Premium Skills**: Curated marketplace of production-ready agent skills
- **Advanced Search**: Filter by category, price, rating, and compatibility
- **Skill Details**: View documentation, demos, reviews, and changelog
- **Secure Checkout**: Stripe integration for payments
- **Instant Delivery**: Download skills immediately after purchase
- **Creator Dashboard**: Manage your published skills and earnings

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Deployment**: Vercel

## 📦 Database Schema

```sql
-- Skills table
create table skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  price decimal(10,2) not null,
  category text not null,
  creator_id uuid references auth.users(id),
  downloads integer default 0,
  rating decimal(2,1),
  created_at timestamp with time zone default now()
);

-- Purchases table
create table purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  skill_id uuid references skills(id),
  price decimal(10,2) not null,
  stripe_payment_id text,
  created_at timestamp with time zone default now()
);

-- Reviews table
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  skill_id uuid references skills(id),
  user_id uuid references auth.users(id),
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default now()
);
```

## 🔧 Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 📥 Installation

```bash
# Clone the repo
git clone https://github.com/jarvisclaudebotsr-dotcom/openclaw-directory.git
cd openclaw-directory

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

## 🚢 Deployment

Deployed on Vercel with automatic deployments from `main` branch.

**Live URL**: TBD (pending deployment)

## 📝 API Routes

- `POST /api/skills` - Create new skill (authenticated)
- `GET /api/skills` - List all skills
- `GET /api/skills/[id]` - Get skill details
- `POST /api/purchase` - Purchase a skill (authenticated)
- `POST /api/webhook` - Stripe webhook handler

## 🎯 Roadmap

- [ ] Skill versioning and updates
- [ ] API authentication for skill downloads
- [ ] Creator earnings dashboard
- [ ] Skill compatibility checker
- [ ] User wishlists
- [ ] Affiliate program
- [ ] Skill bundles

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **GitHub**: https://github.com/jarvisclaudebotsr-dotcom/openclaw-directory
- **OpenClaw Docs**: https://docs.openclaw.ai
- **Discord**: https://discord.gg/openclaw

---

Built with ❤️ for the OpenClaw community
