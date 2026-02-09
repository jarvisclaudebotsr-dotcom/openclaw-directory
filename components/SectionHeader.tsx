import Link from "next/link"

interface SectionHeaderProps {
  title: string
  href: string
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <Link
        href={href}
        className="text-sm text-[#a1a1a1] hover:text-white transition-colors"
      >
        View all →
      </Link>
    </div>
  )
}
