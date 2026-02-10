# OpenClaw Directory - Production Setup Guide

Complete setup instructions for deploying the production-ready OpenClaw Directory.

## 📋 Prerequisites

- [Supabase Account](https://supabase.com)
- [Vercel Account](https://vercel.com)
- [GitHub Account](https://github.com)
- [Upstash Account](https://upstash.com) (for rate limiting)
- [PostHog Account](https://posthog.com) (optional, for analytics)

---

## 1️⃣ Supabase Setup

### Create Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Name: `openclaw-directory`
4. Database Password: Generate strong password (save it!)
5. Region: Choose closest to your users
6. Click "Create new project"

### Run Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Copy content from `supabase/migrations/001_initial_schema.sql`
3. Paste into SQL Editor
4. Click "Run"
5. Verify tables created: `skills`, `submissions`, `install_events`, etc.

### Configure GitHub OAuth

1. Go to **Authentication** > **Providers**
2. Enable **GitHub**
3. Go to GitHub > Settings > Developer Settings > OAuth Apps
4. Click "New OAuth App"
5. Fill in:
   - Application name: `OpenClaw Directory`
   - Homepage URL: `https://openclawdirectory.ai`
   - Authorization callback URL: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
6. Click "Register application"
7. Copy **Client ID** and **Client Secret**
8. Paste into Supabase GitHub provider settings
9. Click "Save"

### Get API Keys

1. Go to **Project Settings** > **API**
2. Copy:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - `anon` `public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - `service_role` `secret` key (SUPABASE_SERVICE_ROLE_KEY) ⚠️ Keep secret!

### Create Admin User

After first login:
```sql
-- Run in Supabase SQL Editor
UPDATE user_profiles 
SET role = 'admin' 
WHERE github_username = 'YOUR_GITHUB_USERNAME';
```

---

## 2️⃣ GitHub Setup

### Create Personal Access Token

1. Go to GitHub > Settings > Developer Settings > Personal Access Tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: `OpenClaw Directory Sync`
4. Scopes: `repo` (all), `read:user`
5. Click "Generate token"
6. Copy token (GITHUB_TOKEN)

### Configure Repositories to Sync

Edit `.env.local`:
```env
GITHUB_REPOS=seedprod/openclaw-prompts-and-skills,other-org/other-repo
```

Comma-separated list of `owner/repo` to scan for skills.

---

## 3️⃣ Upstash Setup (Rate Limiting)

### Create Redis Database

1. Go to [https://console.upstash.com](https://console.upstash.com)
2. Click "Create Database"
3. Name: `openclaw-directory`
4. Type: Regional
5. Region: Same as Vercel deployment
6. Click "Create"

### Get Credentials

1. Click on database
2. Copy:
   - REST URL (UPSTASH_REDIS_REST_URL)
   - REST Token (UPSTASH_REDIS_REST_TOKEN)

---

## 4️⃣ PostHog Setup (Optional - Analytics)

### Create Project

1. Go to [https://app.posthog.com](https://app.posthog.com)
2. Create account or sign in
3. Create new project: `OpenClaw Directory`

### Get API Key

1. Go to Project Settings
2. Copy Project API Key (NEXT_PUBLIC_POSTHOG_KEY)
3. Instance URL: `https://app.posthog.com` (or your instance)

---

## 5️⃣ Local Development Setup

### Install Dependencies

```bash
cd ~/clawd/openclaw-marketplace
npm install
```

### Configure Environment Variables

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# GitHub
GITHUB_TOKEN=ghp_your_github_token
GITHUB_REPOS=seedprod/openclaw-prompts-and-skills

# Rate Limiting
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=OpenClaw Directory

# Admin Emails
ADMIN_EMAILS=your@email.com
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Test GitHub Sync

1. Sign in with GitHub
2. Make yourself admin (run SQL above)
3. Go to `/admin`
4. Click "Sync Now"
5. Verify skills imported

---

## 6️⃣ Vercel Deployment

### Install Vercel CLI

```bash
npm i -g vercel
```

### Deploy

```bash
cd ~/clawd/openclaw-marketplace
vercel
```

Follow prompts:
- Set up new project? **Y**
- Link to existing project? **N**
- Project name: `openclaw-directory`
- Directory: `./`

### Configure Environment Variables

In Vercel Dashboard:
1. Go to Project > Settings > Environment Variables
2. Add all variables from `.env.local`
3. Mark sensitive variables as "Secret"

### Deploy to Production

```bash
vercel --prod
```

### Configure Domain

1. Go to Project > Settings > Domains
2. Add custom domain: `openclawdirectory.ai`
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

---

## 7️⃣ GitHub Actions Setup (Automated Sync)

### Add Repository Secrets

In your GitHub repository:
1. Go to Settings > Secrets and variables > Actions
2. Add secrets:
   - `SYNC_ENDPOINT`: `https://openclawdirectory.ai/api/sync`
   - `SYNC_API_KEY`: Create a secret key for authentication
   - `VERCEL_TOKEN`: Get from Vercel Account Settings

### Enable Workflow

Workflows in `.github/workflows/` will run automatically:
- `github-sync.yml` - Daily at 2 AM UTC
- `deploy.yml` - On push to main

---

## 8️⃣ Post-Deployment Checklist

### Verify Functionality

- [ ] Homepage loads
- [ ] Skills display correctly
- [ ] Search works
- [ ] Authentication works (GitHub OAuth)
- [ ] Skill submission works
- [ ] Admin panel accessible (for admins)
- [ ] GitHub sync works
- [ ] Rate limiting active
- [ ] Analytics tracking (PostHog)

### SEO Configuration

- [ ] Sitemap generated: `/sitemap.xml`
- [ ] Robots.txt configured: `/robots.txt`
- [ ] Meta tags set correctly
- [ ] OpenGraph images
- [ ] Google Search Console verification

### Security Checklist

- [ ] RLS policies enabled on all Supabase tables
- [ ] Service role key kept secret (never in client code)
- [ ] Rate limiting active on all API endpoints
- [ ] Admin routes protected by middleware
- [ ] CORS configured correctly
- [ ] Input validation on all forms

---

## 9️⃣ Monitoring & Maintenance

### Supabase Monitoring

- Database size (Database > Usage)
- API requests (API > Logs)
- Authentication logs (Authentication > Logs)

### Vercel Monitoring

- Build logs (Deployments)
- Function logs (Functions > Logs)
- Analytics (Analytics)

### GitHub Actions

- Workflow runs (Actions tab)
- Sync failures (check logs)

### PostHog Analytics

- User tracking
- Event tracking
- Funnel analysis

---

## 🔟 Scaling Considerations

### Current Capacity

- **Supabase Free Tier**: 500 MB database, 50 MB file storage
- **Vercel Free Tier**: 100 GB bandwidth, 100 GB-Hrs compute
- **Upstash Free Tier**: 10K commands/day

### When to Upgrade

**At ~1,000 users/day**:
- Upgrade Supabase to Pro ($25/mo)
- Upgrade Vercel to Pro ($20/mo)

**At ~10,000 users/day**:
- Enable Vercel Edge Caching
- Add CDN for static assets
- Consider read replicas (Supabase)

**At ~100,000 users/day**:
- Enable Supabase connection pooling
- Add horizontal scaling (multiple regions)
- Implement full-text search optimization

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 You're Live!

Your OpenClaw Directory is now production-ready and can support 100,000+ users.

**Live Site**: https://openclawdirectory.ai

**Admin Panel**: https://openclawdirectory.ai/admin

**API Docs**: See `/app/api/` for endpoint details

---

Built with ❤️ by the OpenClaw Community
