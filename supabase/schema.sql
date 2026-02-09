-- OpenClaw Directory Database Schema

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  features JSONB,
  compatibility TEXT[],
  author TEXT,
  author_id TEXT,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  tags TEXT[],
  demo_url TEXT,
  github_url TEXT,
  documentation TEXT,
  requirements TEXT[],
  version TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  skill_id UUID REFERENCES skills(id),
  price DECIMAL(10,2) NOT NULL,
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES skills(id),
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for skills (public read, authenticated create)
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create skills"
  ON skills FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policies for purchases (users can only see their own)
CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases"
  ON purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies for reviews (public read, authenticated create/update own)
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert initial skills
INSERT INTO skills (name, slug, description, long_description, price, category, features, compatibility, author, author_id, tags, documentation, requirements, version)
VALUES
(
  'Meta Ad Research',
  'meta-ad-research',
  'Research competitor ads via Meta Ad Library, analyze creative patterns, extract learnings, and generate creative briefs. Perfect for DTC brands scaling paid social.',
  'Complete competitive research automation for Meta advertising. Analyzes thousands of competitor ads, identifies winning patterns (hooks, angles, formats), extracts actionable learnings, and generates creative briefs. Includes swipe file building, creative strategy recommendations, and performance pattern analysis.',
  49.00,
  'Marketing',
  '["Meta Ad Library integration", "Creative pattern analysis (hooks, angles, formats)", "Automated swipe file building", "Creative brief generation", "Competitor tracking dashboard", "Performance pattern insights"]'::jsonb,
  ARRAY['OpenClaw 2026.2.x'],
  'Jarvis AI',
  'jarvis',
  ARRAY['marketing', 'advertising', 'research', 'competitive-analysis'],
  'Full documentation included with skill installation. Includes setup guide, API configuration, and usage examples.',
  ARRAY['Meta Ad Library access', 'OpenClaw 2026.2.6+'],
  '1.0.0'
),
(
  'ClickUp Melts System',
  'clickup-melts',
  'Complete creative testing workflow for DTC brands. Manage Active Tests, Hook Bank, Winners/Losers, and Hypotheses tracking in ClickUp.',
  'The Melts Creative System integrated with ClickUp - proven workflow used by brands scaling to $100M+. Manage your entire creative testing pipeline: Active Tests, Hook Bank, Angle Library, Swipe Analysis, Winners/Losers tracking, and Hypotheses logging. Built for high-velocity creative testing.',
  99.00,
  'Productivity',
  '["Active Tests management", "Hook Bank with 500+ proven hooks", "Angle Library organization", "Winners/Losers analysis", "Hypotheses tracking", "ClickUp API integration", "Custom field automation"]'::jsonb,
  ARRAY['OpenClaw 2026.2.x'],
  'Jarvis AI',
  'jarvis',
  ARRAY['productivity', 'clickup', 'workflow', 'creative-testing'],
  'Complete setup guide with ClickUp workspace templates, field configurations, and automation workflows.',
  ARRAY['ClickUp API key', 'ClickUp workspace', 'OpenClaw 2026.2.6+'],
  '1.0.0'
),
(
  'X Research Agent',
  'x-research',
  'Real-time X/Twitter research using Grok. Find tweets, trends, expert opinions, and breaking news with citations. Perfect for market research and trend analysis.',
  'General-purpose X/Twitter research powered by Grok AI. Search X for real-time perspectives, developer discussions, product feedback, cultural trends, and breaking news. Works like a web research agent but uses X as the source. Includes citation tracking and trend analysis.',
  39.00,
  'Research',
  '["Real-time X search via Grok", "Trend analysis and tracking", "Expert opinion aggregation", "Citation and source tracking", "Sentiment analysis", "Thread summarization", "Custom search filters"]'::jsonb,
  ARRAY['OpenClaw 2026.2.x'],
  'Jarvis AI',
  'jarvis',
  ARRAY['research', 'twitter', 'social-media', 'trends'],
  'Installation guide, Grok API setup, and usage examples for common research workflows.',
  ARRAY['X API Bearer Token ($200/mo)', 'OpenClaw 2026.2.6+'],
  '1.0.0'
),
(
  'Voice Transcription',
  'voice-transcription',
  'Transcribe voice messages and audio files using Groq''s Whisper API. Perfect for processing Telegram voice notes and meeting recordings.',
  'Professional-grade voice transcription powered by Groq''s Whisper API. Process voice messages from Telegram, audio files, meeting recordings, and any speech-to-text needs. Fast, accurate, and supports multiple languages.',
  19.00,
  'Utilities',
  '["Groq Whisper API integration", "Multi-language support", "Telegram voice note processing", "Batch audio file transcription", "High accuracy transcription", "Fast processing times"]'::jsonb,
  ARRAY['OpenClaw 2026.2.x'],
  'Jarvis AI',
  'jarvis',
  ARRAY['transcription', 'audio', 'voice', 'utilities'],
  'Setup guide with Groq API configuration and example workflows for Telegram integration.',
  ARRAY['Groq API key (free tier available)', 'OpenClaw 2026.2.6+'],
  '1.0.0'
),
(
  'AgentMail',
  'agentmail',
  'API-first email platform designed for AI agents. Create dedicated email inboxes, send/receive emails programmatically, and handle email-based workflows.',
  'Email infrastructure built specifically for AI agents. Create and manage dedicated email inboxes, send and receive emails programmatically, handle email-based workflows with webhooks and real-time events. Replace traditional email providers with agent-friendly infrastructure.',
  29.00,
  'Communications',
  '["Dedicated agent email addresses", "Programmatic email sending", "Webhook integration for incoming mail", "Real-time event processing", "Email parsing and analysis", "Thread management", "Attachment handling"]'::jsonb,
  ARRAY['OpenClaw 2026.2.x'],
  'Jarvis AI',
  'jarvis',
  ARRAY['email', 'communications', 'automation', 'api'],
  'Complete API documentation, webhook setup guide, and workflow examples.',
  ARRAY['AgentMail API key', 'OpenClaw 2026.2.6+'],
  '1.0.0'
),
(
  'Coding Agent',
  'coding-agent',
  'Run Codex CLI, Claude Code, OpenCode, or Pi Coding Agent via background process for programmatic control. Build, debug, and deploy code autonomously.',
  'Integrate multiple AI coding assistants into your OpenClaw workflow. Run Codex CLI, Claude Code, OpenCode, or Pi Coding Agent via background processes with full programmatic control. Perfect for autonomous code generation, debugging, and deployment workflows.',
  79.00,
  'Development',
  '["Multiple coding assistant support", "Background process management", "Programmatic code generation", "Automated debugging", "Git integration", "CI/CD pipeline integration", "Error handling and recovery"]'::jsonb,
  ARRAY['OpenClaw 2026.2.x'],
  'Jarvis AI',
  'jarvis',
  ARRAY['development', 'coding', 'automation', 'ai-assistant'],
  'Setup guides for each coding assistant, integration examples, and workflow automation patterns.',
  ARRAY['Coding assistant API keys', 'Git', 'OpenClaw 2026.2.6+'],
  '1.0.0'
);
