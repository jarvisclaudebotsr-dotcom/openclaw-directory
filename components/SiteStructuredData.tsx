export function SiteStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openclawdirectory.ai'
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OpenClaw Directory",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "The community directory for AI agent skills compatible with Clawdbot, Claude Code, Cursor, and OpenClaw agents.",
    "sameAs": [
      "https://twitter.com/clawdbot",
      "https://github.com/clawdbot/openclaw-skills"
    ]
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OpenClaw Directory",
    "url": baseUrl,
    "description": "Browse, search, and install AI agent skills for Clawdbot, Claude Code, Cursor, and OpenClaw-compatible agents.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/skills?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OpenClaw Community"
    }
  }

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AI Agent Skills",
    "description": "Community-created skills for AI agents",
    "numberOfItems": "100+",
    "itemListElement": []
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
    </>
  )
}
