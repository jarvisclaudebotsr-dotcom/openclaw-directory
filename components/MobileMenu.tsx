"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden rounded-md p-2 text-[#737373] transition-colors hover:bg-[#171717] hover:text-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-14 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="fixed left-0 right-0 top-14 z-50 border-b border-[#1a1a1a] bg-black md:hidden">
            <nav className="container flex flex-col py-4">
              <Link
                href="/skills"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-white transition-colors hover:bg-[#171717]"
              >
                Browse Skills
              </Link>
              <Link
                href="/categories/development-tools"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-white transition-colors hover:bg-[#171717]"
              >
                Categories
              </Link>
              <a
                href="https://docs.clawd.bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-white transition-colors hover:bg-[#171717]"
              >
                Documentation
              </a>
              <div className="my-2 border-t border-[#1a1a1a]" />
              <Link
                href="/submit"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-white transition-colors hover:bg-[#171717]"
              >
                Submit a Skill
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
