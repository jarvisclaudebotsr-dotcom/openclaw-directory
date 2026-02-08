import Link from 'next/link';
import { Search, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            OpenClaw <span className="text-purple-400">Directory</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Premium skills marketplace for AI agents
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Browse, buy, and install production-ready capabilities. Build smarter agents faster.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/skills" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            >
              Browse Skills
            </Link>
            <Link 
              href="/creators" 
              className="border-2 border-purple-400 hover:bg-purple-900/30 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all"
            >
              Become a Creator
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-300">Premium Skills</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="text-4xl font-bold text-purple-400 mb-2">1,000+</div>
            <div className="text-gray-300">Active Agents</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-300">Production Ready</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-black/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why OpenClaw Directory?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <Search className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Curated Skills</h3>
              <p className="text-gray-400">
                Every skill is tested and verified for production use
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <Zap className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Instant Install</h3>
              <p className="text-gray-400">
                One-click installation directly into your agent
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <Shield className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Secure & Safe</h3>
              <p className="text-gray-400">
                Code reviewed and sandboxed for safety
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
              <p className="text-gray-400">
                Built by developers, for developers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Skills */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Featured Skills
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Most popular skills from our marketplace
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Skill cards will go here - dynamically loaded */}
          <Link href="/skills/meta-ad-research" className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Meta Ad Research
              </h3>
              <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                $49
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Research competitor ads, analyze patterns, generate creative briefs
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Marketing
              </span>
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Research
              </span>
            </div>
          </Link>

          <Link href="/skills/clickup-melts" className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                ClickUp Melts System
              </h3>
              <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                $99
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Complete creative testing workflow for DTC brands
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Productivity
              </span>
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Workflow
              </span>
            </div>
          </Link>

          <Link href="/skills/x-research" className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                X Research Agent
              </h3>
              <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                $39
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Real-time Twitter research using Grok AI
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Research
              </span>
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                Social
              </span>
            </div>
          </Link>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/skills" 
            className="text-purple-400 hover:text-purple-300 font-semibold text-lg"
          >
            View all skills →
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to supercharge your agents?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future of AI agents
          </p>
          <Link 
            href="/skills" 
            className="bg-white hover:bg-gray-100 text-purple-900 font-bold py-4 px-8 rounded-lg text-lg transition-all inline-block transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">OpenClaw Directory</h3>
              <p className="text-gray-400">
                Premium skills marketplace for AI agents
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2">
                <li><Link href="/skills" className="text-gray-400 hover:text-white">Browse Skills</Link></li>
                <li><Link href="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
                <li><Link href="/creators" className="text-gray-400 hover:text-white">Top Creators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Guides</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 OpenClaw Directory. Built with ❤️ for the agent economy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
