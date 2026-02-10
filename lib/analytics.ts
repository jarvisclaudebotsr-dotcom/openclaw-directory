// PostHog analytics integration
import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })
  }
}

// Track events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, properties)
  }
}

// Track skill view
export const trackSkillView = (skillSlug: string, skillName: string) => {
  trackEvent('skill_viewed', {
    skill_slug: skillSlug,
    skill_name: skillName,
  })
}

// Track skill install command copied
export const trackInstallCopy = (skillSlug: string, packageManager: string) => {
  trackEvent('install_copied', {
    skill_slug: skillSlug,
    package_manager: packageManager,
  })
}

// Track search
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search_performed', {
    query,
    results_count: resultsCount,
  })
}

// Track submission
export const trackSubmission = (githubUrl: string) => {
  trackEvent('skill_submitted', {
    github_url: githubUrl,
  })
}

// Identify user
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, traits)
  }
}
