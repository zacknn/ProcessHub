// app/layout.tsx
import type { Metadata } from 'next'
import {Indie_Flower} from 'next/font/google'
import './globals.css'




const indieFlower = Indie_Flower({
  weight: '400', // Indie Flower only comes in Regular 400
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-indie-flower', // Creates CSS variable for Tailwind
})

export const metadata: Metadata = {
  title: 'My Handwritten App',
  description: 'Using Indie Flower font',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={indieFlower.variable}>
      <body className={`${indieFlower.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}