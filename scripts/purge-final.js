const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function purge() {
  // Get ALL skills (no limit)
  let allSkills = []
  let offset = 0
  const pageSize = 1000
  
  while (true) {
    const { data, error } = await supabase
      .from('skills')
      .select('id, name, slug, description')
      .range(offset, offset + pageSize - 1)
    
    if (error || !data || data.length === 0) break
    allSkills = allSkills.concat(data)
    offset += pageSize
    if (data.length < pageSize) break
  }
  
  console.log(`Total skills in DB: ${allSkills.length}\n`)
  
  const openclawKeywords = ['openclaw', 'clawdbot', 'clawd', 'moltbot', 'clawdhub', 'clawhub']
  
  const toKeep = []
  const toDelete = []
  
  for (const skill of allSkills) {
    const nameLC = (skill.name || '').toLowerCase()
    const descLC = (skill.description || '').toLowerCase()
    const slugLC = (skill.slug || '').toLowerCase()
    
    const isOpenClaw = openclawKeywords.some(kw => 
      nameLC.includes(kw) || descLC.includes(kw) || slugLC.includes(kw)
    )
    
    if (isOpenClaw) {
      toKeep.push(skill)
    } else {
      toDelete.push(skill)
    }
  }
  
  console.log(`Keeping: ${toKeep.length} OpenClaw skills`)
  console.log(`Deleting: ${toDelete.length} non-OpenClaw skills\n`)
  
  // Delete in batches
  for (let i = 0; i < toDelete.length; i += 100) {
    const batch = toDelete.slice(i, i + 100)
    const ids = batch.map(s => s.id)
    
    await supabase.from('skills').delete().in('id', ids)
    if ((i + 100) % 500 === 0) console.log(`Deleted ${i + 100}...`)
  }
  
  // Final count
  const { count } = await supabase.from('skills').select('*', { count: 'exact', head: true })
  console.log(`\n✅ Final count: ${count} OpenClaw skills`)
}

purge().catch(console.error)
