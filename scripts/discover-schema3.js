const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function discover() {
  const test = await supabase.from('skills').insert({
    name: 'TEST',
    slug: 'test-xyz-' + Date.now(),
    description: 'Test description',
    version: '1.0.0'
  }).select()
  
  console.log('Result:', test.error?.message || 'SUCCESS')
  if (test.data) {
    console.log('All columns:', Object.keys(test.data[0]).join(', '))
    // Cleanup
    await supabase.from('skills').delete().eq('id', test.data[0].id)
  }
}

discover().catch(console.error)
