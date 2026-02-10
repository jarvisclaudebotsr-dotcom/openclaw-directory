// GitHub crawler - find SKILL.md files and MCP servers
const fs = require('fs')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

async function searchGitHub(query, page = 1) {
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(query)}&per_page=100&page=${page}`
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'OpenClaw-Crawler'
  }
  if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`
  
  const res = await fetch(url, { headers })
  
  if (res.status === 403) {
    console.log('Rate limited, waiting 60s...')
    await new Promise(r => setTimeout(r, 60000))
    return searchGitHub(query, page)
  }
  
  return res.json()
}

async function crawlSkillFiles() {
  console.log('🔍 Searching GitHub for SKILL.md files...\n')
  
  const skills = []
  
  // Search for SKILL.md files
  const result = await searchGitHub('filename:SKILL.md')
  console.log(`Found ${result.total_count} SKILL.md files`)
  
  for (const item of (result.items || [])) {
    skills.push({
      name: item.repository.name,
      description: item.repository.description || 'No description',
      github_url: item.repository.html_url,
      category: 'GitHub Skills',
      source: 'github-skillmd'
    })
    console.log(`  ✓ ${item.repository.full_name}`)
  }
  
  return skills
}

async function crawlMCPServers() {
  console.log('\n🔍 Searching GitHub for MCP servers...\n')
  
  const skills = []
  const queries = [
    'mcp-server in:name,description',
    'model-context-protocol in:readme',
    '"@modelcontextprotocol" filename:package.json'
  ]
  
  for (const query of queries) {
    console.log(`Query: ${query}`)
    const result = await searchGitHub(query)
    console.log(`  Found ${result.total_count} results`)
    
    for (const item of (result.items || []).slice(0, 50)) {
      const repo = item.repository || item
      if (!skills.find(s => s.github_url === repo.html_url)) {
        skills.push({
          name: repo.name || repo.full_name?.split('/')[1],
          description: repo.description || 'MCP Server',
          github_url: repo.html_url,
          category: 'MCP Servers',
          source: 'github-mcp'
        })
        console.log(`  ✓ ${repo.full_name || repo.name}`)
      }
    }
    
    // Rate limit protection
    await new Promise(r => setTimeout(r, 2000))
  }
  
  return skills
}

async function main() {
  const allSkills = []
  
  allSkills.push(...await crawlSkillFiles())
  allSkills.push(...await crawlMCPServers())
  
  // Dedupe
  const unique = []
  const seen = new Set()
  for (const s of allSkills) {
    if (!seen.has(s.github_url)) {
      seen.add(s.github_url)
      unique.push(s)
    }
  }
  
  console.log(`\n=============================`)
  console.log(`Total unique skills found: ${unique.length}`)
  
  fs.writeFileSync('/tmp/github-skills.json', JSON.stringify(unique, null, 2))
  console.log('Saved to /tmp/github-skills.json')
}

main().catch(console.error)
