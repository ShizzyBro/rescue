"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, X, Clock, TrendingUp, ArrowLeft, Star, Play, Loader2 } from "lucide-react"
import { fetchSearch, fetchTrending, type NormalizedContent } from "@/lib/api"

const RECENT_SEARCHES_KEY = "handyflix_recent_searches"

export default function SearchPageClient() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<NormalizedContent[]>([])
  const [trending, setTrending] = useState<NormalizedContent[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (stored) setRecentSearches(JSON.parse(stored))
    inputRef.current?.focus()
    fetchTrending().then((data) => setTrending(data.slice(0, 12)))
  }, [])

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) { setResults([]); return }
    setIsSearching(true)
    const searchResults = await fetchSearch(searchQuery)
    setResults(searchResults)
    setIsSearching(false)
  }, [])

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    if (query.trim()) {
      searchTimeout.current = setTimeout(() => {
        performSearch(query)
      }, 800)
    } else {
      setResults([])
    }
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current) }
  }, [query, performSearch])

  const saveSearch = (term: string) => {
    if (!term.trim()) return
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 8)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }

  const removeRecent = (term: string) => {
    const updated = recentSearches.filter((s) => s !== term)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }

  return (
    <main className="min-h-screen bg-background">

      {/* Inline top bar — no floating Navbar on search page */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3"
        style={{
          background: "oklch(0.07 0.02 260 / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.7 0.05 240 / 0.08)",
        }}
      >
        <div className="mx-auto max-w-[1320px] flex items-center gap-4">
          {/* Back + Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group flex-shrink-0"
          >
            <div className="glass-pill p-1.5 rounded-lg group-hover:border-primary/30 transition-all duration-200">
              <ArrowLeft className="h-3.5 w-3.5" />
            </div>
            <Image src="/hf-logo.png" alt="HANDYFLIX" width={24} height={24} className="rounded-lg ml-1" />
            <span className="hidden sm:block text-[14px] font-black tracking-tighter">
              <span className="text-primary">HANDY</span><span className="text-foreground">FLIX</span>
            </span>
          </Link>

          {/* Search input — full width */}
          <div
            className="flex-1 max-w-2xl relative rounded-xl"
            style={{
              background: "oklch(0.13 0.03 255 / 0.7)",
              backdropFilter: "blur(24px)",
              border: "1px solid oklch(0.7 0.05 240 / 0.15)",
              boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.08)",
            }}
          >
            <div className="flex items-center gap-3 px-3 py-2">
              {isSearching ? (
                <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
              ) : (
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) saveSearch(query.trim()) }}
                placeholder="Search movies, series, actors..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="p-0.5 rounded-md hover:bg-white/10 transition-colors" aria-label="Clear">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 pb-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">

          {/* Results or Default state */}
          {query.length > 0 ? (
            <div>
              {/* Results header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="section-title-line w-8" />
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {isSearching ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""} for`}
                </p>
                {!isSearching && (
                  <span className="text-xs font-semibold text-foreground">"{query}"</span>
                )}
              </div>

              {!isSearching && results.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 rounded-2xl"
                  style={{
                    background: "oklch(0.11 0.025 255 / 0.4)",
                    border: "1px solid oklch(0.7 0.05 240 / 0.08)",
                  }}
                >
                  <div className="glass p-5 rounded-2xl mb-4">
                    <Search className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">No results found</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">Try different keywords or check spelling</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                  {results.map((item) => {
                    const detailUrl = item.type === "series" ? `/series/${item.id}` : `/movie/${item.id}`
                    return (
                      <Link
                        key={item.id}
                        href={detailUrl}
                        onClick={() => saveSearch(query)}
                        className="group"
                      >
                        <div
                          className="relative aspect-[2/3] rounded-xl overflow-hidden ring-1 ring-white/[0.07] group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-[1.04] group-hover:shadow-xl group-hover:shadow-black/60"
                        >
                          <Image
                            src={item.poster || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                          {item.type === "series" && (
                            <div
                              className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-primary"
                              style={{ background: "oklch(0.58 0.22 245 / 0.2)", border: "1px solid oklch(0.58 0.22 245 / 0.3)" }}
                            >
                              S
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                            <div className="glass w-9 h-9 rounded-full flex items-center justify-center">
                              <Play className="h-4 w-4 fill-foreground text-foreground ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-1.5 px-0.5">
                          <h3 className="text-xs font-medium truncate text-muted-foreground group-hover:text-foreground transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-muted-foreground/60">{item.releaseDate?.split("-")[0]}</span>
                            {item.rating && (
                              <span className="flex items-center gap-0.5 text-[10px] text-yellow-500/80">
                                <Star className="h-2.5 w-2.5 fill-current" />
                                {item.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      Recent
                    </h2>
                    <button
                      onClick={clearRecent}
                      className="text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl transition-all duration-200 hover:border-primary/30"
                        style={{
                          background: "oklch(0.14 0.03 255 / 0.5)",
                          border: "1px solid oklch(0.7 0.05 240 / 0.12)",
                        }}
                      >
                        <button
                          onClick={() => setQuery(term)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeRecent(term)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-md hover:bg-white/10"
                        >
                          <X className="h-3 w-3 text-muted-foreground/60" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Trending section */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Trending Now</h2>
                  <div className="section-title-line flex-1 max-w-[80px]" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                  {trending.map((item, index) => {
                    const detailUrl = item.type === "series" ? `/series/${item.id}` : `/movie/${item.id}`
                    return (
                      <Link key={item.id} href={detailUrl} className="group relative">
                        {/* Rank badge */}
                        <div
                          className="absolute -top-2 -left-1 z-10 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                          style={{
                            background: index < 3 ? "oklch(0.58 0.22 245)" : "oklch(0.2 0.04 255)",
                            border: "1.5px solid oklch(0.07 0.02 260)",
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden ring-1 ring-white/[0.07] group-hover:ring-primary/40 group-hover:scale-[1.04] group-hover:shadow-xl group-hover:shadow-black/60 transition-all duration-300">
                          <Image
                            src={item.poster || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                            <div className="glass w-9 h-9 rounded-full flex items-center justify-center">
                              <Play className="h-4 w-4 fill-foreground text-foreground ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <h3 className="mt-1.5 text-xs font-medium truncate text-muted-foreground group-hover:text-foreground transition-colors px-0.5">
                          {item.title}
                        </h3>
                      </Link>
                    )
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
