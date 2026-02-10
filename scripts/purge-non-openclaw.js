const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function purge() {
  // Get all skills
  const { data: skills, error } = await supabase
    .from('skills')
    .select('id, name, slug, description')
  
  if (error) {
    console.log('Error fetching:', error.message)
    return
  }
  
  console.log(`Total skills: ${skills.length}\n`)
  
  const openclawKeywords = ['openclaw', 'clawdbot', 'clawd', 'moltbot', 'clawdhub', 'clawhub']
  
  const toKeep = []
  const toDelete = []
  
  for (const skill of skills) {
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
  
  // Delete non-OpenClaw skills in batches
  const batchSize = 100
  for (let i = 0; i < toDelete.length; i += batchSize) {
    const batch = toDelete.slice(i, i + batchSize)
    const ids = batch.map(s => s.id)
    
    const { error: delError } = await supabase
      .from('skills')
      .delete()
      .in('id', ids)
    
    if (delError) {
      console.log(`Error deleting batch: ${delError.message}`)
    } else {
      console.log(`Deleted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(toDelete.length/batchSize)}`)
    }
  }
  
  // Final count
  const { count } = await supabase.from('skills').select('*', { count: 'exact', head: true })
  console.log(`\n✅ Done! Remaining skills: ${count}`)
  
  // Show what we kept
  console.log('\nKept skills:')
  toKeep.slice(0, 30).forEach(s => console.log(`  - ${s.name}`))
  if (toKeep.length > 30) console.log(`  ... and ${toKeep.length - 30} more`)
}

purge().catch(console.error)
