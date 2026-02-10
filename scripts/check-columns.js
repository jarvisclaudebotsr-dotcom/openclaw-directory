const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkColumns() {
  // Try to get one row to see what columns exist
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .limit(0)
    
  if (error) {
    console.log('Error:', error.message)
    return
  }
  
  // Try inserting with minimal data
  const test = await supabase.from('skills').insert({
    name: 'TEST',
    slug: 'test-skill-123',
    description: 'test',
    price: 0,
    category: 'test'
  }).select()
  
  if (test.error) {
    console.log('Insert error:', test.error.message)
    console.log('Details:', test.error.details)
  } else {
    console.log('Insert OK, columns:', Object.keys(test.data[0]))
    // Delete test
    await supabase.from('skills').delete().eq('slug', 'test-skill-123')
  }
}

checkColumns().catch(console.error)
