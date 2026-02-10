const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function discover() {
  // Query information schema
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'skills' })
  
  if (error) {
    // Try raw approach - insert empty and see what errors tell us
    const test = await supabase.from('skills').insert({}).select()
    console.log('Insert test:', test.error?.message || 'OK')
    console.log('Hint:', test.error?.hint)
    
    // Try with just name and slug
    const test2 = await supabase.from('skills').insert({
      name: 'TEST',
      slug: 'test-xyz-' + Date.now()
    }).select()
    console.log('\nMinimal insert:', test2.error?.message || 'SUCCESS')
    if (test2.data) {
      console.log('Columns found:', Object.keys(test2.data[0]))
      // Cleanup
      await supabase.from('skills').delete().eq('id', test2.data[0].id)
    }
  } else {
    console.log('Columns:', data)
  }
}

discover().catch(console.error)
