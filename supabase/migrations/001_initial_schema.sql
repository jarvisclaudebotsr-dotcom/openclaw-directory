-- OpenClaw Directory - Production Database Schema
-- Created: 2026-02-08

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================================================
-- SKILLS TABLE
-- ============================================================================
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    emoji TEXT,
    description TEXT NOT NULL,
    full_description TEXT,
    version TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    github_url TEXT NOT NULL,
    github_repo TEXT, -- owner/repo format
    github_stars INTEGER DEFAULT 0,
    installs INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}', -- Additional metadata (dependencies, etc.)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    synced_at TIMESTAMPTZ, -- Last GitHub sync
    submitted_by UUID REFERENCES auth.users(id),
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_skills_slug ON skills(slug);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_approved ON skills(approved);
CREATE INDEX idx_skills_featured ON skills(featured);
CREATE INDEX idx_skills_tags ON skills USING GIN(tags);
CREATE INDEX idx_skills_created_at ON skills(created_at DESC);
CREATE INDEX idx_skills_installs ON skills(installs DESC);

-- Full-text search index
CREATE INDEX idx_skills_search ON skills USING GIN(
    to_tsvector('english', 
        COALESCE(name, '') || ' ' || 
        COALESCE(description, '') || ' ' || 
        COALESCE(array_to_string(tags, ' '), '')
    )
);

-- Trigram index for fuzzy search
CREATE INDEX idx_skills_name_trgm ON skills USING GIN(name gin_trgm_ops);
CREATE INDEX idx_skills_description_trgm ON skills USING GIN(description gin_trgm_ops);

-- ============================================================================
-- SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    github_url TEXT NOT NULL,
    skill_data JSONB NOT NULL, -- Extracted skill metadata
    status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
    rejection_reason TEXT,
    notes TEXT,
    submitted_by UUID REFERENCES auth.users(id) NOT NULL,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_submitted_by ON submissions(submitted_by);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

-- ============================================================================
-- INSTALL_EVENTS TABLE (Analytics)
-- ============================================================================
CREATE TABLE install_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id), -- NULL if anonymous
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    city TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_install_events_skill_id ON install_events(skill_id);
CREATE INDEX idx_install_events_created_at ON install_events(created_at DESC);
CREATE INDEX idx_install_events_user_id ON install_events(user_id);

-- ============================================================================
-- GITHUB_SYNC_LOGS TABLE
-- ============================================================================
CREATE TABLE github_sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sync_type TEXT NOT NULL, -- 'manual', 'scheduled', 'webhook'
    status TEXT NOT NULL, -- 'running', 'success', 'error'
    repos_scanned INTEGER DEFAULT 0,
    skills_added INTEGER DEFAULT 0,
    skills_updated INTEGER DEFAULT 0,
    errors JSONB DEFAULT '[]',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    triggered_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_github_sync_logs_status ON github_sync_logs(status);
CREATE INDEX idx_github_sync_logs_started_at ON github_sync_logs(started_at DESC);

-- ============================================================================
-- USER_PROFILES TABLE (Extended user data)
-- ============================================================================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    github_username TEXT,
    github_id INTEGER,
    bio TEXT,
    website TEXT,
    role TEXT DEFAULT 'user', -- 'user', 'moderator', 'admin'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_role CHECK (role IN ('user', 'moderator', 'admin'))
);

CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_github_username ON user_profiles(github_username);

-- ============================================================================
-- CATEGORIES TABLE (Managed categories)
-- ============================================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);

-- Insert default categories
INSERT INTO categories (slug, name, description, icon, sort_order) VALUES
    ('memory-identity', 'Memory & Identity', 'Skills that define agent personality, memory systems, and identity', '🧠', 1),
    ('messaging-adapters', 'Messaging Adapters', 'Connect your agent to messaging platforms', '📱', 2),
    ('development-tools', 'Development Tools', 'Tools for coding, testing, and deployment', '🛠️', 3),
    ('creative-media', 'Creative & Media', 'Image generation, video editing, and creative tools', '🎨', 4),
    ('research-analysis', 'Research & Analysis', 'Data research, web scraping, and analysis tools', '🔍', 5),
    ('automation-tools', 'Automation & Tools', 'Workflow automation and productivity tools', '⚡', 6);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment install count
CREATE OR REPLACE FUNCTION increment_skill_installs(skill_id_param UUID)
RETURNS void AS $$
BEGIN
    UPDATE skills 
    SET installs = installs + 1 
    WHERE id = skill_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to search skills (full-text search)
CREATE OR REPLACE FUNCTION search_skills(search_query TEXT)
RETURNS TABLE (
    id UUID,
    name TEXT,
    slug TEXT,
    description TEXT,
    version TEXT,
    category TEXT,
    tags TEXT[],
    installs INTEGER,
    featured BOOLEAN,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.name,
        s.slug,
        s.description,
        s.version,
        s.category,
        s.tags,
        s.installs,
        s.featured,
        ts_rank(
            to_tsvector('english', 
                COALESCE(s.name, '') || ' ' || 
                COALESCE(s.description, '') || ' ' || 
                COALESCE(array_to_string(s.tags, ' '), '')
            ),
            plainto_tsquery('english', search_query)
        ) as rank
    FROM skills s
    WHERE 
        s.approved = TRUE
        AND (
            to_tsvector('english', 
                COALESCE(s.name, '') || ' ' || 
                COALESCE(s.description, '') || ' ' || 
                COALESCE(array_to_string(s.tags, ' '), '')
            ) @@ plainto_tsquery('english', search_query)
            OR s.name ILIKE '%' || search_query || '%'
            OR s.description ILIKE '%' || search_query || '%'
        )
    ORDER BY rank DESC, s.installs DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE install_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Skills policies
CREATE POLICY "Skills are viewable by everyone" ON skills
    FOR SELECT USING (approved = TRUE);

CREATE POLICY "Admins can insert skills" ON skills
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

CREATE POLICY "Admins can update skills" ON skills
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

CREATE POLICY "Admins can delete skills" ON skills
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Submissions policies
CREATE POLICY "Users can view their own submissions" ON submissions
    FOR SELECT USING (
        auth.uid() = submitted_by 
        OR EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

CREATE POLICY "Authenticated users can create submissions" ON submissions
    FOR INSERT WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Admins can update submissions" ON submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

-- User profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Install events policies (analytics)
CREATE POLICY "Anyone can insert install events" ON install_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all install events" ON install_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

-- Popular skills view
CREATE VIEW popular_skills AS
SELECT 
    s.id,
    s.name,
    s.slug,
    s.emoji,
    s.description,
    s.category,
    s.installs,
    s.github_stars,
    COUNT(ie.id) as recent_installs_7d
FROM skills s
LEFT JOIN install_events ie ON s.id = ie.skill_id 
    AND ie.created_at > NOW() - INTERVAL '7 days'
WHERE s.approved = TRUE
GROUP BY s.id
ORDER BY s.installs DESC, recent_installs_7d DESC;

-- Trending skills view (installs in last 7 days)
CREATE VIEW trending_skills AS
SELECT 
    s.id,
    s.name,
    s.slug,
    s.emoji,
    s.description,
    s.category,
    s.installs,
    COUNT(ie.id) as installs_7d,
    COUNT(ie.id)::FLOAT / NULLIF(s.installs, 0) as growth_rate
FROM skills s
LEFT JOIN install_events ie ON s.id = ie.skill_id 
    AND ie.created_at > NOW() - INTERVAL '7 days'
WHERE s.approved = TRUE
GROUP BY s.id
HAVING COUNT(ie.id) > 0
ORDER BY installs_7d DESC, growth_rate DESC;

-- ============================================================================
-- SAMPLE DATA (for testing)
-- ============================================================================

-- Note: This will be replaced by real GitHub sync data
-- Keeping minimal seed data for development

COMMENT ON TABLE skills IS 'Skills directory - indexed from GitHub repositories';
COMMENT ON TABLE submissions IS 'User-submitted skills awaiting moderation';
COMMENT ON TABLE install_events IS 'Install tracking for analytics';
COMMENT ON TABLE github_sync_logs IS 'GitHub synchronization history';
COMMENT ON TABLE user_profiles IS 'Extended user profile data';
