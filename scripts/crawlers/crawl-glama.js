// Crawl Glama MCP registry  
const fs = require('fs')

async function crawlGlama() {
  console.log('🔍 Crawling Glama MCP registry...\n')
  
  const skills = []
  
  try {
    const res = await fetch('https://glama.ai/mcp/servers')
    const html = await res.text()
    
    // Extract server links
    const serverRegex = /href="\/mcp\/servers\/([^"]+)"/g
    const seen = new Set()
    let match
    
    while ((match = serverRegex.exec(html)) !== null) {
      const slug = match[1]
      if (!seen.has(slug)) {
        seen.add(slug)
        skills.push({
          name: slug.replace(/-/g, ' '),
          description: `MCP Server: ${slug}`,
          github_url: `https://glama.ai/mcp/servers/${slug}`,
          category: 'MCP Servers',
          source: 'glama'
        })
      }
    }
  } catch (e) {
    console.log('Error:', e.message)
  }
  
  console.log(`Found ${skills.length} from Glama`)
  fs.writeFileSync('/tmp/glama-skills.json', JSON.stringify(skills, null, 2))
}

crawlGlama().catch(console.error)
