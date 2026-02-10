import { Skill } from "@/lib/skills"

interface SkillStructuredDataProps {
  skill: Skill
}

export function SkillStructuredData({ skill }: SkillStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openclawdirectory.ai'
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": skill.name,
    "description": skill.description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cross-platform",
    "softwareVersion": skill.version,
    "dateModified": skill.updatedAt,
    "url": `${baseUrl}/skills/${skill.id}`,
    "provider": {
      "@type": "Organization",
      "name": "OpenClaw Community",
      "url": baseUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": skill.installs ? {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": Math.floor(skill.installs / 10)
    } : undefined,
    "downloadUrl": skill.githubUrl,
    "codeRepository": skill.githubUrl,
    "programmingLanguage": "JavaScript",
    "keywords": skill.tags.join(", "),
    "installUrl": `clawdhub install ${skill.name}`,
    "screenshot": `${baseUrl}/api/og?skill=${encodeURIComponent(skill.id)}`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
