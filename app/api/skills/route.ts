import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { searchLimiter, getClientIdentifier } from '@/lib/rate-limit'

export const runtime = 'edge'

/**
 * GET /api/skills - Fetch skills with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request)
    const { success } = await searchLimiter.limit(identifier)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const supabase = (await createClient()) as any
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const sort = searchParams.get('sort') || 'popular' // popular, recent, installs
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = supabase
      .from('skills')
      .select('*', { count: 'exact' })
      .eq('approved', true)
      .range(offset, offset + limit - 1)

    // Apply filters
    if (category) {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    // Apply sorting
    switch (sort) {
      case 'recent':
        query = query.order('created_at', { ascending: false })
        break
      case 'installs':
        query = query.order('installs', { ascending: false })
        break
      case 'popular':
      default:
        query = query.order('installs', { ascending: false })
        break
    }

    // Execute search if provided
    if (search) {
      const { data, error } = await supabase.rpc('search_skills', {
        search_query: search,
      })

      if (error) throw error

      return NextResponse.json({
        skills: data,
        total: data.length,
        offset,
        limit,
      })
    }

    // Execute regular query
    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      skills: data,
      total: count,
      offset,
      limit,
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
