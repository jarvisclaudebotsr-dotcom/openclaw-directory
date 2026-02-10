import Link from "next/link"
import { Category } from "@/lib/skills"

interface CategoryNavProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryNav({ categories, activeCategory }: CategoryNavProps) {
  return (
    <div className="categories-wrap">
      <Link
        href="/skills"
        className={`tag ${!activeCategory ? 'active' : ''}`}
      >
        <span>🔮</span>
        <span>All Skills</span>
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}`}
          className={`tag ${activeCategory === cat.id ? 'active' : ''}`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </Link>
      ))}
    </div>
  )
}
