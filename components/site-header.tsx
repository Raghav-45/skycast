'use client'

import { Search, MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="bg-[#131214] text-[#EAE6F2]">
      <div className="max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-9 flex justify-between items-center h-[80px] md:h-[96px] lg:h-[110px]">
        {/* Logo */}
        <Link href="/" className="block">
          <div className="relative w-[150px] lg:w-[200px] h-[58px]">
            {/* Replace with your actual logo */}
            <div className="absolute inset-0 flex items-center">
              <h1 className="text-2xl font-bold text-white">weatherio</h1>
            </div>
          </div>
        </Link>

        {/* Search View */}
        <div
          className={`
          fixed top-0 left-0 w-full h-screen bg-[#1D1C1F] text-[#DDDAE5] 
          ${searchActive ? 'opacity-100 visible' : 'opacity-0 invisible'}
          transition-all duration-500 ease-in-out
          z-10
          ${searchActive ? 'clip-path-circle-full' : 'clip-path-circle-small'}
          lg:static lg:w-[500px] lg:h-auto lg:bg-transparent lg:opacity-100 lg:visible lg:clip-path-none
        `}
          style={{
            clipPath: searchActive
              ? 'circle(130% at 73% 5%)'
              : 'circle(4% at calc(100% - 102px) 5%)',
          }}
        >
          {/* Search Form */}
          <div className="relative border-b border-[#3E3D40] lg:border-none">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Search city..."
                className={`
                  w-full h-20 lg:h-14 pl-14 pr-4 bg-transparent outline-none
                  lg:bg-[#1D1C1F] lg:rounded-[28px]
                  placeholder:text-[#B9B6BF]
                `}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <Search
                className={`
                  absolute top-1/2 left-7 transform -translate-y-1/2 -translate-x-1/2
                  text-[#DDDAE5] w-6 h-6
                `}
              />

              <button
                type="button"
                className={`
                  absolute top-1/2 right-4 transform -translate-y-1/2
                  bg-transparent w-12 h-12 grid place-items-center rounded-full
                  lg:hidden
                `}
                onClick={toggleSearch}
              >
                <ArrowLeft className="w-6 h-6 text-[#DDDAE5]" />
              </button>

              {/* Loading indicator */}
              {searching && (
                <div className="absolute top-1/2 right-16 transform -translate-y-1/2 w-6 h-6 border-3 border-[#DDDAE5] border-t-transparent rounded-full animate-spin lg:right-4"></div>
              )}
            </form>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="p-2 lg:absolute lg:top-full lg:left-0 lg:w-full lg:bg-[#1D1C1F] lg:border-t lg:border-[#3E3D40] lg:rounded-b-[28px] lg:max-h-[360px] lg:overflow-y-auto">
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <Link
                      href={`/weather?city=${result.name}`}
                      className="relative h-14 flex items-center gap-4 px-4 py-2 hover:bg-[rgba(255,255,255,0.04)] rounded-lg"
                    >
                      <MapPin className="w-5 h-5 text-[#DDDAE5]" />
                      <span>
                        {result.name}, {result.country}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Button (Mobile) */}
          <button
            className="w-12 h-12 grid place-items-center bg-[rgba(255,255,255,0.08)] rounded-full hover:shadow-sm hover:bg-[rgba(255,255,255,0.12)] lg:hidden"
            onClick={toggleSearch}
            aria-label="Open search"
          >
            <Search className="w-6 h-6 text-[#DDDAE5]" />
          </button>

          {/* Current Location Button */}
          <Link
            href="/current-location"
            className="
              h-12 bg-[#B5A1E5] text-[#100E17] rounded-full 
              flex items-center gap-2 md:gap-4
              px-3 md:px-4 lg:px-6
              hover:shadow-sm transition-shadow
            "
          >
            <MapPin className="w-5 h-5" />
            <span className="hidden md:block font-semibold">
              Current Location
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
