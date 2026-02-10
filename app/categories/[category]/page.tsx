import { notFound } from "next/navigation"
import { getSkillsByCategory, getCategories, getCategory } from "@/lib/skills"
import { CategoryPageClient } from "./CategoryPageClient"

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({
    category: cat.id,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params
  const category = getCategory(categoryId)
  const skills = getSkillsByCategory(categoryId)
  const categories = getCategories()

  if (!category) {
    notFound()
  }

  return (
    <CategoryPageClient 
      category={category}
      skills={skills}
      categories={categories}
      categoryId={categoryId}
    />
  )
}
