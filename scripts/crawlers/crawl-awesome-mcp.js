// Crawl awesome-mcp-servers list from GitHub
const fs = require('fs')

async function crawlAwesomeMCP() {
  console.log('🔍 Crawling awesome-mcp-servers...\n')
  
  // Fetch the raw README from the awesome list
  const url = 'https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md'
  
  const res = await fetch(url)
  const text = await res.text()
  
  const skills = []
  
  // Parse markdown links: - [Name](url) - description
  const linkRegex = /\- \[([^\]]+)\]\(([^)]+)\)(?: - (.+))?/g
  let match
  
  while ((match = linkRegex.exec(text)) !== null) {
    const [, name, url, description] = match
    
    // Skip non-GitHub/npm links
    if (!url.includes('github.com') && !url.includes('npmjs.com')) continue
    if (url.includes('#')) continue // Skip anchor links
    
    skills.push({
      name: name,
      description: description || name,
      github_url: url,
      category: 'MCP Servers',
      source: 'awesome-mcp'
    })
  }
  
  console.log(`Found ${skills.length} MCP servers from awesome list`)
  
  fs.writeFileSync('/tmp/awesome-mcp-skills.json', JSON.stringify(skills, null, 2))
  console.log('Saved to /tmp/awesome-mcp-skills.json')
  
  return skills
}

crawlAwesomeMCP().catch(console.error)
