export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦞</span>
              <span className="text-xl font-bold text-white">OpenClawMart</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#skills" className="text-gray-300 hover:text-white transition">Skills</a>
              <a href="#creators" className="text-gray-300 hover:text-white transition">Creators</a>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition">
                Submit Skill
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium Skills for <span className="text-purple-400">OpenClaw</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Supercharge your AI assistant with battle-tested skills and templates from the community
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold text-lg transition">
              Browse Skills
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold text-lg transition">
              Sell Your Skills
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">127</div>
            <div className="text-gray-400 mt-1">Premium Skills</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">43</div>
            <div className="text-gray-400 mt-1">Creators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">$2.4k</div>
            <div className="text-gray-400 mt-1">Paid Out</div>
          </div>
        </div>
      </div>

      {/* Featured Skills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">🔥 Featured Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: "Advanced Email Automation", 
              price: "$29", 
              creator: "@alexdev",
              description: "Automate complex email workflows with AI-powered responses",
              sales: 43
            },
            { 
              name: "Voice Transcription Pro", 
              price: "$19", 
              creator: "@sarah_ai",
              description: "High-accuracy voice-to-text with 50+ languages",
              sales: 87
            },
            { 
              name: "Social Media Manager", 
              price: "$39", 
              creator: "@marketing_pro",
              description: "Schedule, post, and analyze across all platforms",
              sales: 62
            },
            { 
              name: "Code Review Assistant", 
              price: "$49", 
              creator: "@devtools",
              description: "AI-powered code reviews with security checks",
              sales: 31
            },
            { 
              name: "Meeting Summarizer", 
              price: "$24", 
              creator: "@productivity",
              description: "Turn hour-long meetings into actionable summaries",
              sales: 95
            },
            { 
              name: "Research Assistant", 
              price: "$34", 
              creator: "@data_wizard",
              description: "Deep web research with citation management",
              sales: 58
            }
          ].map((skill, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-purple-400 font-bold">{skill.price}</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{skill.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{skill.creator}</span>
                <span className="text-gray-500">{skill.sales} sales</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to monetize your OpenClaw skills?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 43 creators earning passive income by selling their skills on OpenClawMart
          </p>
          <button className="px-8 py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-lg font-semibold text-lg transition">
            Start Selling Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🦞</span>
                <span className="text-xl font-bold text-white">OpenClawMart</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium marketplace for OpenClaw skills and templates
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Browse Skills</a></li>
                <li><a href="#" className="hover:text-white transition">Top Sellers</a></li>
                <li><a href="#" className="hover:text-white transition">New Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Creators</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Start Selling</a></li>
                <li><a href="#" className="hover:text-white transition">Creator Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2026 OpenClawMart. Built for the OpenClaw community.
          </div>
        </div>
      </footer>
    </main>
  )
}
