'use client'

import { useState } from 'react'
import { Copy, Check, FileText } from 'lucide-react'

interface SkillContentProps {
  content: string | null
  skillName: string
}

export function SkillContent({ content, skillName }: SkillContentProps) {
  const [copied, setCopied] = useState(false)

  if (!content) {
    return (
      <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-[#666]" />
          <h2 className="text-lg font-medium text-white">SKILL.md</h2>
        </div>
        <p className="text-[#666] text-sm">
          Skill file content not available. Check the{' '}
          <a href="#" className="text-blue-400 hover:underline">GitHub repository</a>{' '}
          for the full skill definition.
        </p>
      </div>
    )
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#666]" />
          <h2 className="text-lg font-medium text-white">SKILL.md</h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg bg-[#111] px-4 py-2 text-sm text-white hover:bg-[#1a1a1a] transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Full Skill
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-[#111] p-4 text-sm text-[#a1a1a1] font-mono max-h-[500px] overflow-y-auto">
          <code>{content}</code>
        </pre>
      </div>
      
      <p className="mt-4 text-xs text-[#555]">
        Copy this content and save it as <code className="rounded bg-[#1a1a1a] px-1.5 py-0.5 font-mono text-[#888]">SKILL.md</code> in your project, 
        or use the install command above.
      </p>
    </div>
  )
}
