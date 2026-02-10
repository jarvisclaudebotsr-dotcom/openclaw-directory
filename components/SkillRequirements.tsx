import { AlertCircle } from "lucide-react"

interface SkillRequirementsProps {
  requirements?: string[]
}

export function SkillRequirements({ requirements }: SkillRequirementsProps) {
  const defaultRequirements = [
    "Clawdbot v1.0+ or Claude Code with OpenClaw support",
    "Node.js 18+ (for CLI installation)",
    "ClawdHub CLI installed globally"
  ]

  const displayRequirements = requirements || defaultRequirements

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4">
      <div className="mb-3 flex items-center gap-2 text-[#888]">
        <AlertCircle className="h-4 w-4" />
        <h4 className="text-sm font-medium">Requirements</h4>
      </div>
      <ul className="space-y-2 text-sm text-[#888]">
        {displayRequirements.map((req, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-[#525252]">•</span>
            <span>{req}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
