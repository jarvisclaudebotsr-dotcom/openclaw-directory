const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fetchContent() {
  // Get skills without content
  const { data: skills } = await supabase
    .from('skills')
    .select('id, name, slug, github_url, full_description')
  
  const needsContent = skills.filter(s => !s.full_description)
  console.log(`${needsContent.length} skills need content...\n`)
  
  let updated = 0
  
  for (const skill of needsContent) {
    if (!skill.github_url) continue
    
    let content = null
    
    // Try GitHub repos
    if (skill.github_url.includes('github.com')) {
      const match = skill.github_url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/)
      if (match) {
        const [, owner, repo] = match
        const cleanRepo = repo.replace(/\.git$/, '')
        
        // Try multiple files
        const files = ['SKILL.md', 'README.md', 'readme.md', 'Readme.md']
        const branches = ['main', 'master']
        
        for (const branch of branches) {
          if (content) break
          for (const file of files) {
            const url = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch}/${file}`
            try {
              const res = await fetch(url)
              if (res.ok) {
                content = await res.text()
                break
              }
            } catch (e) {}
          }
        }
      }
    }
    
    // Try NPM readme
    if (!content && (skill.github_url.includes('npmjs.com') || skill.name.startsWith('@'))) {
      const pkgName = skill.github_url.includes('npmjs.com') 
        ? skill.github_url.split('/package/')[1]
        : skill.name
      
      if (pkgName) {
        try {
          const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkgName)}`)
          if (res.ok) {
            const data = await res.json()
            content = data.readme || null
          }
        } catch (e) {}
      }
    }
    
    if (content && content.length > 50) {
      const { error } = await supabase
        .from('skills')
        .update({ full_description: content.substring(0, 50000) })
        .eq('id', skill.id)
      
      if (!error) {
        updated++
        if (updated % 20 === 0) console.log(`Updated ${updated}...`)
      }
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 50))
  }
  
  // Final count
  const { data: final } = await supabase
    .from('skills')
    .select('id, full_description')
  
  const withContent = final.filter(s => s.full_description).length
  console.log(`\n✅ Done! Added ${updated} more.`)
  console.log(`Total with content: ${withContent}/${final.length}`)
}

fetchContent().catch(console.error)
