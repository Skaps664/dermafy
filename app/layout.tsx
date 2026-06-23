import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600']
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Dermafy — Glowify Brightening Face Wash',
  description: 'Glowify Brightening Face Wash combines Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera, and Vitamin E Beads to deeply cleanse, control oil, refresh skin, and promote a brighter, healthier-looking complexion.',
  generator: 'v0.app',
  keywords: ['brightening face wash', 'niacinamide cleanser', 'alpha arbutin', 'vitamin c face wash', 'oil control', 'glow', 'even skin tone', 'made in Pakistan', 'DRAP registered'],
  icons: {
    icon: [
      { url: '/dermafy-favicon.png', type: 'image/png' },
    ],
    shortcut: '/dermafy-favicon.png',
    apple: '/dermafy-favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
