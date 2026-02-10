import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'OpenClaw Directory - Discover Community Skills for AI Agents',
  description: 'Browse, search, and install community-created skills for Clawdbot, Claude Code, and OpenClaw-compatible AI agents. One-click install, GitHub integration.',
  keywords: ['OpenClaw', 'skills', 'AI agents', 'automation', 'GitHub', 'directory', 'Clawdbot', 'Claude Code'],
  authors: [{ name: 'OpenClaw Community' }],
  creator: 'OpenClaw',
  publisher: 'OpenClaw',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://openclawdirectory.ai',
    title: 'OpenClaw Directory - Skills for AI Agents',
    description: 'Discover community-created skills for your AI agent',
    siteName: 'OpenClaw Directory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw Directory',
    description: 'Discover community-created skills for AI agents',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-4 py-8 sm:px-6 md:py-12">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
