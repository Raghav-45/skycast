'use client'

import { SiteHeader } from '@/components/site-header'
import { default as HomePage } from './(weather)/page'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HomePage />
      </main>
      {/* <SiteFooter /> */}
    </>
  )
}
