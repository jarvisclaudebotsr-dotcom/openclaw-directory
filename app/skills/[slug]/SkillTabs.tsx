'use client'

import { useState } from 'react'
import { Copy, Check, FileText, GitCompare, History } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface SkillTabsProps {
  skillContent: string | null
  skillName: string
  contentSize: string
  version: string
}

export function SkillTabs({ skillContent, skillName, contentSize, version }: SkillTabsProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'compare' | 'versions'>('files')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (skillContent) {
      await navigator.clipboard.writeText(skillContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-1 border-b border-[#1a1a1a] mb-6">
        <button
          onClick={() => setActiveTab('files')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'files'
              ? 'text-white border-b-2 border-white -mb-px'
              : 'text-[#737373] hover:text-white'
          }`}
        >
          Files
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'compare'
              ? 'text-white border-b-2 border-white -mb-px'
              : 'text-[#737373] hover:text-white'
          }`}
        >
          Compare
        </button>
        <button
          onClick={() => setActiveTab('versions')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'versions'
              ? 'text-white border-b-2 border-white -mb-px'
              : 'text-[#737373] hover:text-white'
          }`}
        >
          Versions
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - SKILL.md */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#666]" />
                SKILL.md
              </h2>
              <button
                onClick={handleCopy}
                disabled={!skillContent}
                className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] text-white px-3 py-1.5 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {skillContent ? (
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-medium text-white mt-4 mb-2">{children}</h3>,
                      p: ({ children }) => <p className="text-[#a3a3a3] mb-3">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1 text-[#a3a3a3] mb-4">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-[#a3a3a3] mb-4">{children}</ol>,
                      li: ({ children }) => <li className="text-[#a3a3a3]">{children}</li>,
                      code: ({ className, children }) => {
                        const isBlock = className?.includes('language-')
                        if (isBlock) {
                          return (
                            <pre className="bg-[#111] rounded-lg p-4 overflow-x-auto mb-4">
                              <code className="text-sm text-[#e1e1e1] font-mono">{children}</code>
                            </pre>
                          )
                        }
                        return <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#e1e1e1] font-mono text-sm">{children}</code>
                      },
                      pre: ({ children }) => <>{children}</>,
                      a: ({ href, children }) => (
                        <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {skillContent}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
                <p className="text-[#666] italic">
                  SKILL.md content not available. This skill may use a different file structure.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Files list */}
          <div>
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-white">Files</h3>
                <span className="text-xs text-[#666]">1 total</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a3a3a3]">SKILL.md</span>
                  <span className="text-[#666]">{contentSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compare' && (
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <GitCompare className="h-5 w-5 text-[#666]" />
            <h2 className="text-lg font-semibold text-white">Compare Versions</h2>
          </div>
          <p className="text-[#666]">
            Select two versions to compare changes.
          </p>
          <div className="mt-4 p-4 bg-[#111] rounded-lg">
            <p className="text-sm text-[#555] italic">Only one version available (v{version})</p>
          </div>
        </div>
      )}

      {activeTab === 'versions' && (
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5 text-[#666]" />
            <h2 className="text-lg font-semibold text-white">Version History</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg">
              <div>
                <span className="font-mono text-white">v{version}</span>
                <span className="ml-2 text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">latest</span>
              </div>
              <span className="text-sm text-[#666]">Current</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
