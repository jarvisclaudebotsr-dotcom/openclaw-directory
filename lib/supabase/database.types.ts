// TypeScript types for Supabase database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      skills: {
        Row: {
          id: string
          name: string
          slug: string
          emoji: string | null
          description: string
          full_description: string | null
          version: string
          category: string
          tags: string[]
          github_url: string
          github_repo: string | null
          github_stars: number
          installs: number
          featured: boolean
          approved: boolean
          metadata: Json
          created_at: string
          updated_at: string
          synced_at: string | null
          submitted_by: string | null
          approved_by: string | null
          approved_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          emoji?: string | null
          description: string
          full_description?: string | null
          version: string
          category: string
          tags?: string[]
          github_url: string
          github_repo?: string | null
          github_stars?: number
          installs?: number
          featured?: boolean
          approved?: boolean
          metadata?: Json
          created_at?: string
          updated_at?: string
          synced_at?: string | null
          submitted_by?: string | null
          approved_by?: string | null
          approved_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          emoji?: string | null
          description?: string
          full_description?: string | null
          version?: string
          category?: string
          tags?: string[]
          github_url?: string
          github_repo?: string | null
          github_stars?: number
          installs?: number
          featured?: boolean
          approved?: boolean
          metadata?: Json
          created_at?: string
          updated_at?: string
          synced_at?: string | null
          submitted_by?: string | null
          approved_by?: string | null
          approved_at?: string | null
        }
      }
      submissions: {
        Row: {
          id: string
          github_url: string
          skill_data: Json
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          notes: string | null
          submitted_by: string
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          github_url: string
          skill_data: Json
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          notes?: string | null
          submitted_by: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          github_url?: string
          skill_data?: Json
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          notes?: string | null
          submitted_by?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      install_events: {
        Row: {
          id: string
          skill_id: string
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          country: string | null
          city: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          skill_id: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          skill_id?: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country?: string | null
          city?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      github_sync_logs: {
        Row: {
          id: string
          sync_type: string
          status: string
          repos_scanned: number
          skills_added: number
          skills_updated: number
          errors: Json
          started_at: string
          completed_at: string | null
          triggered_by: string | null
        }
        Insert: {
          id?: string
          sync_type: string
          status: string
          repos_scanned?: number
          skills_added?: number
          skills_updated?: number
          errors?: Json
          started_at?: string
          completed_at?: string | null
          triggered_by?: string | null
        }
        Update: {
          id?: string
          sync_type?: string
          status?: string
          repos_scanned?: number
          skills_added?: number
          skills_updated?: number
          errors?: Json
          started_at?: string
          completed_at?: string | null
          triggered_by?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          github_username: string | null
          github_id: number | null
          bio: string | null
          website: string | null
          role: 'user' | 'moderator' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          github_username?: string | null
          github_id?: number | null
          bio?: string | null
          website?: string | null
          role?: 'user' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          github_username?: string | null
          github_id?: number | null
          bio?: string | null
          website?: string | null
          role?: 'user' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
      }
    }
    Views: {
      popular_skills: {
        Row: {
          id: string
          name: string
          slug: string
          emoji: string | null
          description: string
          category: string
          installs: number
          github_stars: number
          recent_installs_7d: number
        }
      }
      trending_skills: {
        Row: {
          id: string
          name: string
          slug: string
          emoji: string | null
          description: string
          category: string
          installs: number
          installs_7d: number
          growth_rate: number
        }
      }
    }
    Functions: {
      search_skills: {
        Args: { search_query: string }
        Returns: {
          id: string
          name: string
          slug: string
          description: string
          version: string
          category: string
          tags: string[]
          installs: number
          featured: boolean
          rank: number
        }[]
      }
      increment_skill_installs: {
        Args: { skill_id_param: string }
        Returns: void
      }
    }
  }
}
