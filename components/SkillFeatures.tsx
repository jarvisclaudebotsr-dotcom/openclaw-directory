import { Check } from "lucide-react"

interface SkillFeaturesProps {
  features?: string[]
  defaultFeatures?: boolean
}

export function SkillFeatures({ features, defaultFeatures = true }: SkillFeaturesProps) {
  const defaultList = [
    "One-click installation via ClawdHub CLI",
    "Open source and community-maintained",
    "Regular updates and bug fixes",
    "Compatible with all OpenClaw agents",
    "Comprehensive documentation",
    "Active community support"
  ]

  const displayFeatures = features || (defaultFeatures ? defaultList : [])

  if (!displayFeatures.length) return null

  return (
    <div className="space-y-3">
      {displayFeatures.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
            <Check className="h-3 w-3 text-emerald-400" />
          </div>
          <p className="text-sm text-[#a3a3a3]">{feature}</p>
        </div>
      ))}
    </div>
  )
}
