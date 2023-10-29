import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'
import { Inter } from 'next/font/google'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moody',
  description: 'Social Music Player',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${font.className}`} >
      <body >
        <Sidebar>
          {children}
        </Sidebar>
        <Player />
      </body>
    </html>
  )
}
