// Crawl Cursor Directory
const fs = require('fs')

async function crawlCursor() {
  console.log('🔍 Crawling Cursor Directory...\n')
  
  const skills = []
  
  // Cursor directory API
  try {
    const res = await fetch('https://cursor.directory/api/rules?limit=500')
    const data = await res.json()
    
    for (const rule of (data.rules || data || [])) {
      skills.push({
        name: rule.title || rule.name,
        description: rule.description || rule.content?.substring(0, 200) || 'Cursor Rule',
        github_url: rule.url || `https://cursor.directory`,
        category: 'AI Rules & Prompts',
        source: 'cursor-directory'
      })
    }
  } catch (e) {
    console.log('API error:', e.message)
  }
  
  console.log(`Found ${skills.length} from Cursor Directory`)
  fs.writeFileSync('/tmp/cursor-skills.json', JSON.stringify(skills, null, 2))
}

crawlCursor().catch(console.error)
