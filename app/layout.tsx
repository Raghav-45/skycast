import type { Metadata } from 'next'
import { Inter, Nunito_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'Sky Cast',
  description: 'Sky Cast is a weather app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
