import { Input } from "@/components/ui/input"

interface SearchInputProps {
  placeholder?: string
}

export function SearchInput({
  placeholder = "Search skills, creators, categories...",
}: SearchInputProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Input
        placeholder={placeholder}
        className="h-11 rounded-lg border-[#1a1a1a] bg-black text-white text-sm px-4 py-3 focus-visible:border-[#2a2a2a] focus-visible:ring-0 placeholder:text-[#a1a1a1]"
      />
    </div>
  )
}
