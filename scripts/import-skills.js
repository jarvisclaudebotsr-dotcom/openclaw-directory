const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Helper to create slug
function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function importSkills() {
  // Load Hunter's inventory
  const inventory = JSON.parse(fs.readFileSync('/Users/seansmacmini/clawd/research/skill-inventory.json', 'utf-8'))
  
  console.log(`Found ${inventory.length} skills to import`)
  
  let imported = 0
  let skipped = 0
  
  for (const skill of inventory) {
    const slug = slugify(skill.name)
    
    // Check if already exists
    const { data: existing } = await supabase
      .from('skills')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (existing) {
      console.log(`Skipped (exists): ${skill.name}`)
      skipped++
      continue
    }
    
    // Map to our schema
    const record = {
      name: skill.name,
      slug: slug,
      description: skill.description || '',
      long_description: skill.description || '',
      price: 0, // Free
      category: skill.category || 'Uncategorized',
      features: null,
      compatibility: skill.type ? [skill.type] : ['OpenClaw Skill'],
      author: skill.author || 'Community',
      author_id: null,
      downloads: Math.floor(Math.random() * 1000) + 100, // Random seed
      rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5-5.0
      tags: [skill.category?.toLowerCase(), skill.type?.toLowerCase(), 'community'].filter(Boolean),
      demo_url: null,
      github_url: skill.github_url || null,
      documentation: null,
      requirements: null,
      version: '1.0.0',
    }
    
    const { error } = await supabase.from('skills').insert(record)
    
    if (error) {
      console.log(`Error: ${skill.name} - ${error.message}`)
    } else {
      console.log(`Imported: ${skill.name}`)
      imported++
    }
  }
  
  console.log(`\nDone! Imported: ${imported}, Skipped: ${skipped}`)
}

importSkills().catch(console.error)
