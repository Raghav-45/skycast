import { Search, MapPin } from 'lucide-react'
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="bg-[#131214] text-[#EAE6F2]">
      <div className="max-w-[1600px] w-full mx-auto px-8 flex justify-between items-center h-[110px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/vercel.svg" alt="SkyCast" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Sky Cast</h1>
        </Link>

        {/* Search Bar */}
        <div className="w-[500px]">
          <div className="relative">
            <input
              type="search"
              placeholder="Search city..."
              className="w-full h-12 pl-12 pr-4 bg-[#1D1C1F] rounded-full outline-none placeholder:text-[#B9B6BF]"
            />
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#DDDAE5] w-5 h-5" />
          </div>
        </div>

        {/* Current Location Button */}
        <button className="h-12 bg-[#B5A1E5] text-[#100E17] rounded-full flex items-center gap-2 px-6">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold">Current Location</span>
        </button>
      </div>
    </header>
  )
}
