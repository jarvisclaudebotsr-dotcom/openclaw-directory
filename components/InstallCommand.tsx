"use client"

import { Check, Copy, Terminal } from "lucide-react"
import { useState } from "react"

interface InstallCommandProps {
  skillName: string
  showAlternatives?: boolean
}

export function InstallCommand({ skillName, showAlternatives = true }: InstallCommandProps) {
  const [copied, setCopied] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<"clawdhub" | "npx" | "manual">("clawdhub")

  const commands = {
    clawdhub: `clawdhub install ${skillName}`,
    npx: `npx clawdhub install ${skillName}`,
    manual: `git clone https://github.com/clawdbot/skills/${skillName}`
  }

  const command = commands[selectedMethod]

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      {showAlternatives && (
        <div className="flex gap-2">
          {(["clawdhub", "npx", "manual"] as const).map((method) => (
            <button
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedMethod === method
                  ? "bg-white text-black"
                  : "bg-[#111] text-[#888] hover:bg-[#1a1a1a] hover:text-white"
              }`}
            >
              {method === "clawdhub" ? "ClawdHub CLI" : method === "npx" ? "npx" : "Manual"}
            </button>
          ))}
        </div>
      )}

      <div className="group relative">
        <div className="flex items-center gap-3 rounded-lg border border-[#222] bg-[#0d0d0d] px-4 py-3">
          <Terminal className="h-4 w-4 flex-shrink-0 text-[#555]" />
          <code className="flex-1 overflow-x-auto font-mono text-sm text-[#e1e1e1] scrollbar-hide">
            {command}
          </code>
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 rounded p-1.5 text-[#555] transition-colors hover:bg-[#1a1a1a] hover:text-white"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {copied && (
          <div className="absolute -top-8 right-0 rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">
            Copied!
          </div>
        )}
      </div>

      {selectedMethod === "manual" && (
        <p className="text-xs text-[#555]">
          Clone to your <code className="rounded bg-[#111] px-1 py-0.5 text-[#888]">skills/</code> directory
        </p>
      )}
    </div>
  )
}
