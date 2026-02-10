"use client"

import { Search, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  initialValue?: string
  className?: string
}

export function SearchBar({ 
  placeholder = "Search skills...", 
  onSearch, 
  initialValue = "",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(query)
    }, 200)

    return () => clearTimeout(debounce)
  }, [query, onSearch])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === "Escape" && isFocused) {
        inputRef.current?.blur()
        setQuery("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFocused])

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#525252]" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="input pl-11 pr-16"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {query ? (
          <button
            onClick={() => setQuery("")}
            className="rounded-md p-1 text-[#525252] transition-colors hover:bg-[#171717] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="hidden rounded border border-[#262626] bg-[#171717] px-1.5 py-0.5 text-[10px] text-[#525252] sm:block">
            /
          </kbd>
        )}
      </div>
    </div>
  )
}
