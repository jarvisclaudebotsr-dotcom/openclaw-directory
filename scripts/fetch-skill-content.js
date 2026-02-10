const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fetchSkillContent() {
  // Get all skills
  const { data: skills } = await supabase
    .from('skills')
    .select('id, name, slug, github_url')
  
  console.log(`Fetching content for ${skills.length} skills...\n`)
  
  let updated = 0
  let failed = 0
  
  for (const skill of skills) {
    if (!skill.github_url) continue
    
    let content = null
    
    // Try to fetch SKILL.md from GitHub
    if (skill.github_url.includes('github.com')) {
      const match = skill.github_url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
      if (match) {
        const [, owner, repo] = match
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/SKILL.md`
        
        try {
          const res = await fetch(rawUrl)
          if (res.ok) {
            content = await res.text()
          } else {
            // Try master branch
            const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/SKILL.md`
            const res2 = await fetch(masterUrl)
            if (res2.ok) {
              content = await res2.text()
            }
          }
        } catch (e) {}
      }
    }
    
    // Try NPM readme
    if (!content && skill.github_url.includes('npmjs.com')) {
      const pkgName = skill.github_url.split('/package/')[1]
      if (pkgName) {
        try {
          const res = await fetch(`https://registry.npmjs.org/${pkgName}`)
          const data = await res.json()
          content = data.readme || null
        } catch (e) {}
      }
    }
    
    if (content) {
      // Update skill with content
      const { error } = await supabase
        .from('skills')
        .update({ 
          full_description: content.substring(0, 50000) // Limit size
        })
        .eq('id', skill.id)
      
      if (!error) {
        updated++
        if (updated % 20 === 0) console.log(`Updated ${updated}...`)
      }
    } else {
      failed++
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 100))
  }
  
  console.log(`\n✅ Done! Updated: ${updated}, No content: ${failed}`)
}

fetchSkillContent().catch(console.error)
