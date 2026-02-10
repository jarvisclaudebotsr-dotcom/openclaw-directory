import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'
import { SiteStructuredData } from '@/components/SiteStructuredData'

export const metadata: Metadata = {
  title: {
    default: 'OpenClaw Directory - AI Agent Skills & Tools Marketplace',
    template: '%s | OpenClaw Directory'
  },
  description: 'The #1 directory for AI agent skills. Browse 100+ community-created skills for Clawdbot, Claude Code, Cursor, and OpenClaw-compatible agents. One-click install from GitHub. Free and open source.',
  keywords: [
    'OpenClaw',
    'OpenClaw skills',
    'AI agent skills',
    'Claude skills',
    'Clawdbot',
    'Claude Code',
    'Cursor agent skills',
    'agent skills marketplace',
    'AI automation',
    'agent tools directory',
    'GitHub skills',
    'AI agent plugins',
    'agent skills install',
    'Claude agent tools',
    'OpenClaw directory',
  ],
  authors: [{ name: 'OpenClaw Community' }],
  creator: 'OpenClaw Community',
  publisher: 'OpenClaw Directory',
  applicationName: 'OpenClaw Directory',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://openclawdirectory.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://openclawdirectory.ai',
    title: 'OpenClaw Directory - AI Agent Skills & Tools Marketplace',
    description: 'The #1 directory for AI agent skills. Browse, search, and install community skills for Clawdbot, Claude Code, Cursor, and OpenClaw agents.',
    siteName: 'OpenClaw Directory',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenClaw Directory - AI Agent Skills Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw Directory - AI Agent Skills Marketplace',
    description: 'The #1 directory for AI agent skills. Browse 100+ community skills for Clawdbot, Claude Code, and OpenClaw agents.',
    creator: '@clawdbot',
    images: ['/og-image.png'],
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
  verification: {
    // Add Google Search Console verification when available
    // google: 'verification_token_here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <SiteStructuredData />
      </head>
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
