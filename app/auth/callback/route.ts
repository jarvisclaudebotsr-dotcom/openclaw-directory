import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = (await createClient()) as any
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Create or update user profile
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        username: data.user.user_metadata.user_name,
        full_name: data.user.user_metadata.full_name,
        avatar_url: data.user.user_metadata.avatar_url,
        github_username: data.user.user_metadata.user_name,
        github_id: data.user.user_metadata.provider_id,
      })

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
