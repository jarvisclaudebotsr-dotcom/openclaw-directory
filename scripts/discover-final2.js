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
    version: '1.0.0',
    category: 'Test',
    github_url: 'https://github.com/test/test'
  }).select()
  
  console.log('Result:', test.error?.message || 'SUCCESS')
  if (test.data) {
    console.log('\nActual schema columns:')
    Object.entries(test.data[0]).forEach(([k, v]) => {
      console.log(`  ${k}: ${typeof v} = ${v}`)
    })
    // Cleanup
    await supabase.from('skills').delete().eq('id', test.data[0].id)
  }
}

discover().catch(console.error)
