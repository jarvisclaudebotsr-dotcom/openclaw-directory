# 🚀 OpenClaw Directory - Deployment Checklist

Use this checklist to deploy the application to production.

---

## ☐ Pre-Deployment

### 1. Accounts Created
- [ ] Supabase account
- [ ] Vercel account
- [ ] GitHub account (for OAuth)
- [ ] Upstash account (rate limiting)
- [ ] PostHog account (optional - analytics)

### 2. Environment Variables Ready
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `GITHUB_TOKEN`
- [ ] `GITHUB_REPOS`
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` (optional)
- [ ] `NEXT_PUBLIC_SITE_URL`

---

## ☐ Supabase Setup

### Database
- [ ] Project created
- [ ] Migration `001_initial_schema.sql` executed
- [ ] Tables created successfully:
  - [ ] `skills`
  - [ ] `submissions`
  - [ ] `install_events`
  - [ ] `github_sync_logs`
  - [ ] `user_profiles`
  - [ ] `categories`
- [ ] Views created:
  - [ ] `popular_skills`
  - [ ] `trending_skills`
- [ ] Functions created:
  - [ ] `search_skills()`
  - [ ] `increment_skill_installs()`

### Authentication
- [ ] GitHub OAuth provider enabled
- [ ] GitHub OAuth app created
- [ ] Callback URL configured
- [ ] Client ID and Secret added to Supabase

### API Keys
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] Service role key copied (keep secret!)

---

## ☐ GitHub Setup

### OAuth App
- [ ] OAuth app created
- [ ] Callback URL: `https://<project>.supabase.co/auth/v1/callback`
- [ ] Client ID copied
- [ ] Client Secret copied

### Personal Access Token
- [ ] Token created with `repo` scope
- [ ] Token copied (GITHUB_TOKEN)

### Repositories to Sync
- [ ] List of repos configured in `GITHUB_REPOS`
- [ ] Format: `owner/repo,owner/repo`

---

## ☐ Upstash Redis Setup

- [ ] Database created
- [ ] Region: Same as Vercel deployment
- [ ] REST URL copied
- [ ] REST Token copied

---

## ☐ PostHog Setup (Optional)

- [ ] Project created
- [ ] API key copied
- [ ] Host URL confirmed

---

## ☐ Local Testing

### Development Environment
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created and populated
- [ ] Dev server starts (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] No console errors

### Functionality Tests
- [ ] Skills display correctly
- [ ] Search works
- [ ] GitHub OAuth login works
- [ ] User can submit skill
- [ ] Admin panel accessible (after making user admin)
- [ ] GitHub sync works from admin panel
- [ ] Rate limiting functional

### Build Test
- [ ] Production build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No build warnings

---

## ☐ Vercel Deployment

### Initial Deploy
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Logged in to Vercel (`vercel login`)
- [ ] Project deployed (`vercel`)
- [ ] Preview URL works

### Environment Variables in Vercel
- [ ] All variables added in Vercel Dashboard
- [ ] Sensitive variables marked as "Secret"
- [ ] Variables match `.env.local`

### Production Deploy
- [ ] Production deployment (`vercel --prod`)
- [ ] Production URL works
- [ ] All features functional on production

### Domain Configuration
- [ ] Custom domain added: `openclawdirectory.ai`
- [ ] DNS configured (A/CNAME records)
- [ ] SSL certificate issued (automatic)
- [ ] Domain accessible via HTTPS

---

## ☐ GitHub Actions Setup

### Repository Secrets
- [ ] `SYNC_ENDPOINT` added
- [ ] `SYNC_API_KEY` added
- [ ] `VERCEL_TOKEN` added

### Workflows
- [ ] `github-sync.yml` committed
- [ ] `deploy.yml` committed
- [ ] Workflows enabled in GitHub Actions

---

## ☐ Post-Deployment Verification

### Functionality
- [ ] Homepage loads
- [ ] Skills display correctly
- [ ] Search works
- [ ] Skill detail pages load
- [ ] Install command copy works
- [ ] GitHub OAuth login works
- [ ] User can submit skill
- [ ] Admin panel accessible
- [ ] GitHub sync works

### Performance
- [ ] Page loads < 1 second
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Mobile responsive

### Security
- [ ] Admin routes protected
- [ ] Rate limiting active
- [ ] HTTPS enforced
- [ ] No exposed secrets

### SEO
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Meta tags present
- [ ] OpenGraph tags present

---

## ☐ Create First Admin User

### Make Yourself Admin
```sql
-- Run in Supabase SQL Editor
UPDATE user_profiles 
SET role = 'admin' 
WHERE github_username = 'YOUR_GITHUB_USERNAME';
```

- [ ] Logged in with GitHub
- [ ] Admin SQL executed
- [ ] Admin panel accessible at `/admin`

---

## ☐ Initial Data Population

### GitHub Sync
- [ ] Admin panel opened
- [ ] "Sync Now" clicked
- [ ] Sync completed successfully
- [ ] Skills imported (check count)

### Manual Verification
- [ ] At least 10 skills visible
- [ ] Skill details correct
- [ ] Install commands work
- [ ] GitHub links work

---

## ☐ Monitoring Setup

### Vercel
- [ ] Analytics enabled
- [ ] Deployment notifications configured
- [ ] Error tracking active

### Supabase
- [ ] Database metrics visible
- [ ] API logs accessible
- [ ] Auth logs accessible

### PostHog (if enabled)
- [ ] Events tracking
- [ ] User sessions recording
- [ ] Dashboards configured

---

## ☐ Documentation

- [ ] README updated with live URL
- [ ] PRODUCTION-SETUP.md reviewed
- [ ] API documentation accessible
- [ ] Admin guide created

---

## ☐ Launch

### Pre-Launch
- [ ] All checklist items complete
- [ ] Backup of database taken
- [ ] Rollback plan prepared

### Launch
- [ ] Announce on Twitter/X
- [ ] Share in OpenClaw Discord
- [ ] Post on Product Hunt (optional)
- [ ] Share in relevant communities

### Post-Launch
- [ ] Monitor for first 24 hours
- [ ] Collect user feedback
- [ ] Fix any critical issues
- [ ] Celebrate! 🎉

---

## ☐ Ongoing Maintenance

### Daily
- [ ] Check GitHub sync logs
- [ ] Monitor error logs

### Weekly
- [ ] Review pending submissions
- [ ] Check analytics dashboard
- [ ] Respond to issues

### Monthly
- [ ] Database cleanup
- [ ] Performance review
- [ ] Security audit
- [ ] Cost review

---

## 🚀 Status

- [ ] **NOT STARTED** - Haven't begun deployment
- [ ] **IN PROGRESS** - Currently deploying
- [ ] **DEPLOYED** - Live in production
- [ ] **VERIFIED** - All checks passed

---

## 📞 Help

If stuck, refer to:
- **PRODUCTION-SETUP.md** - Detailed setup guide
- **PRODUCTION-README.md** - Complete project overview
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

**Ready to deploy?** Start from the top and check each box! ✅
