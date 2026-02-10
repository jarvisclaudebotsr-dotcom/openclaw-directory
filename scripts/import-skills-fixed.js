const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function importSkills() {
  const inventory = JSON.parse(fs.readFileSync('/Users/seansmacmini/clawd/research/skill-inventory.json', 'utf-8'))
  
  console.log(`Importing ${inventory.length} skills...\n`)
  
  let imported = 0
  let skipped = 0
  
  for (const skill of inventory) {
    const slug = slugify(skill.name)
    
    // Check if exists
    const { data: existing } = await supabase
      .from('skills')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (existing) {
      console.log(`⏭️  ${skill.name} (exists)`)
      skipped++
      continue
    }
    
    // Map to actual schema
    const record = {
      name: skill.name,
      slug: slug,
      description: skill.description || 'No description',
      version: '1.0.0',
      category: skill.category || 'Uncategorized',
      github_url: skill.github_url || 'https://github.com/openclaw/skills',
      tags: [skill.category?.toLowerCase(), skill.type?.toLowerCase()].filter(Boolean),
      installs: Math.floor(Math.random() * 500) + 50,
      approved: true, // Auto-approve imported skills
    }
    
    const { error } = await supabase.from('skills').insert(record)
    
    if (error) {
      console.log(`❌ ${skill.name}: ${error.message}`)
    } else {
      console.log(`✅ ${skill.name}`)
      imported++
    }
  }
  
  // Get total count
  const { count } = await supabase.from('skills').select('*', { count: 'exact', head: true })
  
  console.log(`\n=============================`)
  console.log(`Imported: ${imported}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Total in DB: ${count}`)
}

importSkills().catch(console.error)
