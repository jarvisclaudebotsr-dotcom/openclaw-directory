// ClawHub registry crawler
const fs = require('fs')

async function crawlClawdHub() {
  console.log('🔍 Crawling ClawHub registry...\n')
  
  const skills = []
  
  // Try the ClawHub API/registry
  const sources = [
    'https://registry.npmjs.org/-/v1/search?text=clawdbot',
    'https://registry.npmjs.org/-/v1/search?text=openclaw',
    'https://registry.npmjs.org/-/v1/search?text=mcp-server',
    'https://registry.npmjs.org/-/v1/search?text=claude-skill'
  ]
  
  for (const url of sources) {
    try {
      console.log(`Fetching: ${url}`)
      const res = await fetch(url)
      const data = await res.json()
      
      for (const obj of (data.objects || [])) {
        const pkg = obj.package
        skills.push({
          name: pkg.name,
          description: pkg.description || 'NPM Package',
          github_url: pkg.links?.repository || `https://npmjs.com/package/${pkg.name}`,
          category: pkg.name.includes('mcp') ? 'MCP Servers' : 'NPM Packages',
          source: 'npm-registry',
          version: pkg.version
        })
        console.log(`  ✓ ${pkg.name}`)
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`)
    }
  }
  
  // Dedupe
  const unique = []
  const seen = new Set()
  for (const s of skills) {
    if (!seen.has(s.name)) {
      seen.add(s.name)
      unique.push(s)
    }
  }
  
  console.log(`\n=============================`)
  console.log(`Total from NPM/ClawHub: ${unique.length}`)
  
  fs.writeFileSync('/tmp/clawdhub-skills.json', JSON.stringify(unique, null, 2))
  console.log('Saved to /tmp/clawdhub-skills.json')
}

crawlClawdHub().catch(console.error)
