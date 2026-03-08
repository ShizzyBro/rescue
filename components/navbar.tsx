"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Search, Bookmark, Flame, Home, Sparkles, X, Download, Smartphone, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Home",       href: "/",        icon: Home },
  { label: "Trending",   href: "/#trending", icon: Flame },
  { label: "New",        href: "/#new",    icon: Sparkles },
  { label: "My List",    href: "/my-list",  icon: Bookmark },
]

function AppComingSoonModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4 pb-28 sm:pb-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-sm rounded-3xl p-7 text-center"
        style={{
          background: "oklch(0.11 0.025 255 / 0.97)",
          backdropFilter: "blur(48px) saturate(180%)",
          border: "1px solid oklch(0.7 0.05 240 / 0.14)",
          boxShadow: "0 0 0 1px oklch(0 0 0 / 0.4), 0 40px 100px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div
          className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center relative"
          style={{ background: "oklch(0.58 0.22 245 / 0.12)", border: "1px solid oklch(0.58 0.22 245 / 0.28)" }}
        >
          <div className="absolute inset-0 rounded-2xl blur-2xl" style={{ background: "oklch(0.58 0.22 245 / 0.2)" }} />
          <Rocket className="relative h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-black mb-1.5 tracking-tight">App Coming Soon</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {"We're building the HANDYFLIX mobile experience. Stay tuned."}
        </p>
        <div className="flex items-center justify-center gap-2 mb-6">
          {["iOS", "Android"].map((p) => (
            <div
              key={p}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground"
              style={{ background: "oklch(0.16 0.03 255 / 0.7)", border: "1px solid oklch(0.7 0.05 240 / 0.10)" }}
            >
              <Smartphone className="h-3.5 w-3.5" />
              {p}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          style={{
            background: "oklch(0.58 0.22 245)",
            color: "oklch(1 0 0)",
            boxShadow: "0 4px 24px oklch(0.58 0.22 245 / 0.4)",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export function Navbar() {
  const [showAppModal, setShowAppModal] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60)
    } else {
      setSearchQuery("")
    }
  }, [searchOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen((v) => !v) }
      if (e.key === "Escape") setSearchOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  return (
    <>
      {showAppModal && <AppComingSoonModal onClose={() => setShowAppModal(false)} />}

      {/* Search overlay — fullscreen dimmed */}
      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-end justify-center p-4 pb-28 transition-all duration-300",
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setSearchOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <form
          onSubmit={handleSearchSubmit}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-lg flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{
            background: "oklch(0.13 0.025 255 / 0.98)",
            backdropFilter: "blur(40px)",
            border: "1px solid oklch(0.7 0.05 240 / 0.16)",
            boxShadow: "0 20px 60px oklch(0 0 0 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.08)",
          }}
        >
          <Search className="h-4 w-4 text-primary shrink-0" />
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, series, genres..."
            className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* Bottom floating pill navbar */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-[22px]"
          style={{
            background: "oklch(0.10 0.025 255 / 0.85)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid oklch(0.7 0.05 240 / 0.12)",
            boxShadow:
              "0 0 0 1px oklch(0 0 0 / 0.3), 0 8px 32px oklch(0 0 0 / 0.5), 0 1px 0 oklch(1 0 0 / 0.06) inset",
          }}
        >
          {/* Logo pill */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-[16px] transition-all duration-200 hover:bg-white/[0.07] group"
          >
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 rounded-lg blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "oklch(0.58 0.22 245 / 0.5)" }}
              />
              <Image
                src="/hf-logo.png"
                alt="HANDYFLIX"
                width={26}
                height={26}
                className="relative rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col leading-none gap-[2px]">
              <span className="text-[13px] font-black tracking-tight leading-none">
                <span className="text-primary">HANDY</span>
                <span className="text-foreground">FLIX</span>
              </span>
              <span className="text-[8px] text-muted-foreground/55 tracking-wide font-medium leading-none hidden sm:block">
                by Andy Mrlit &amp; Infos Partage
              </span>
            </div>
          </Link>

          {/* Separator */}
          <div className="w-px h-6 mx-0.5" style={{ background: "oklch(0.7 0.05 240 / 0.1)" }} />

          {/* Nav items */}
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href.split("#")[0]))
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 w-14 sm:w-auto sm:flex-row sm:gap-1.5 sm:px-3 py-2 rounded-[16px] text-[10px] sm:text-[12px] font-medium transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.07]",
                )}
                style={
                  isActive
                    ? {
                        background: "oklch(0.58 0.22 245 / 0.15)",
                        boxShadow: "0 0 20px oklch(0.58 0.22 245 / 0.2), inset 0 1px 0 oklch(0.58 0.22 245 / 0.15)",
                      }
                    : {}
                }
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-[16px] pointer-events-none"
                    style={{ border: "1px solid oklch(0.58 0.22 245 / 0.22)" }}
                  />
                )}
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "")} />
                <span className="sm:inline">{label}</span>
              </Link>
            )
          })}

          {/* Separator */}
          <div className="w-px h-6 mx-0.5" style={{ background: "oklch(0.7 0.05 240 / 0.1)" }} />

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 w-14 sm:w-auto sm:flex-row sm:gap-1.5 sm:px-3 py-2 rounded-[16px] text-[10px] sm:text-[12px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.07] transition-all duration-200"
            aria-label="Search"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span>Search</span>
          </button>

          {/* Get App */}
          <button
            onClick={() => setShowAppModal(true)}
            className="flex flex-col items-center justify-center gap-0.5 w-14 sm:w-auto sm:flex-row sm:gap-1.5 sm:px-3 py-2 rounded-[16px] text-[10px] sm:text-[12px] font-medium transition-all duration-200"
            style={{
              color: "oklch(0.58 0.22 245)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.58 0.22 245 / 0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
            }}
            aria-label="Get App"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span>Get App</span>
          </button>
        </nav>
      </div>

      {/* Safe-area spacer so page content doesn't hide behind the navbar */}
      <div className="h-24" aria-hidden />
    </>
  )
}
