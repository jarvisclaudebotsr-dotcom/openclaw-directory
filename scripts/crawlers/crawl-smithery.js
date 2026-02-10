// Crawl Smithery MCP registry
const fs = require('fs')

async function crawlSmithery() {
  console.log('🔍 Crawling Smithery registry...\n')
  
  const skills = []
  
  // Try Smithery's API
  try {
    const res = await fetch('https://smithery.ai/api/servers?limit=500')
    const data = await res.json()
    
    for (const server of (data.servers || data || [])) {
      skills.push({
        name: server.name || server.title,
        description: server.description || 'MCP Server from Smithery',
        github_url: server.repository || server.url || `https://smithery.ai/server/${server.slug || server.id}`,
        category: 'MCP Servers',
        source: 'smithery'
      })
    }
  } catch (e) {
    console.log('API failed, trying scrape...')
    
    // Fallback: scrape the main page
    const res = await fetch('https://smithery.ai/servers')
    const html = await res.text()
    
    // Extract server names from HTML
    const serverRegex = /href="\/server\/([^"]+)"/g
    const seen = new Set()
    let match
    
    while ((match = serverRegex.exec(html)) !== null) {
      const slug = match[1]
      if (!seen.has(slug)) {
        seen.add(slug)
        skills.push({
          name: slug.replace(/-/g, ' '),
          description: `MCP Server: ${slug}`,
          github_url: `https://smithery.ai/server/${slug}`,
          category: 'MCP Servers',
          source: 'smithery'
        })
      }
    }
  }
  
  console.log(`Found ${skills.length} from Smithery`)
  fs.writeFileSync('/tmp/smithery-skills.json', JSON.stringify(skills, null, 2))
}

crawlSmithery().catch(console.error)
