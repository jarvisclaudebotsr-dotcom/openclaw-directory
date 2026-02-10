const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkTables() {
  // Check what tables exist
  const { data, error } = await supabase
    .from('skills')
    .select('id')
    .limit(1)
  
  console.log('Skills table:', error ? 'ERROR: ' + error.message : 'OK')
  
  const { data: sub, error: subErr } = await supabase
    .from('submissions')
    .select('id')
    .limit(1)
  
  console.log('Submissions table:', subErr ? 'ERROR: ' + subErr.message : 'OK')
  
  const { data: prof, error: profErr } = await supabase
    .from('user_profiles')
    .select('id')
    .limit(1)
  
  console.log('User profiles table:', profErr ? 'ERROR: ' + profErr.message : 'OK')
  
  // Count skills
  const { count } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })
  
  console.log('Total skills in DB:', count)
}

checkTables().catch(console.error)
