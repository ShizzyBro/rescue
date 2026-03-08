"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Movie } from "@/lib/data"
import { cn } from "@/lib/utils"

interface TopTenSectionProps {
  movies: Movie[]
}

export function TopTenSection({ movies }: TopTenSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-black"
              style={{ color: "oklch(0.58 0.22 245)" }}
            >
              TOP
            </span>
            <span
              className="font-black text-lg px-2.5 py-0.5 rounded-lg text-foreground"
              style={{ background: "oklch(0.58 0.22 245)", boxShadow: "0 0 16px oklch(0.58 0.22 245 / 0.5)" }}
            >
              10
            </span>
          </div>
          <h2 className="text-sm font-bold text-foreground">Today</h2>
          <div className="section-title-line flex-1 max-w-[60px]" />
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-0 bottom-0 z-10 w-12",
              "flex items-center justify-center",
              "bg-gradient-to-r from-background via-background/80 to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              !showLeftArrow && "hidden",
            )}
            aria-label="Scroll left"
          >
            <div className="glass w-8 h-8 rounded-full flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-200">
              <ChevronLeft className="h-4 w-4" />
            </div>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-0 bottom-0 z-10 w-12",
              "flex items-center justify-center",
              "bg-gradient-to-l from-background via-background/80 to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              !showRightArrow && "hidden",
            )}
            aria-label="Scroll right"
          >
            <div className="glass w-8 h-8 rounded-full flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-200">
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>

          {/* Movies */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies.map((movie, index) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="flex-shrink-0 relative group/card">
                <div className="flex items-end">
                  <span
                    className="text-[110px] font-black leading-none select-none"
                    style={{
                      WebkitTextStroke: "2px oklch(0.58 0.22 245 / 0.2)",
                      color: "transparent",
                      marginRight: "-22px",
                      zIndex: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <div className="relative w-[100px] sm:w-[120px] aspect-[2/3] rounded-xl overflow-hidden card-hover z-10 ring-1 ring-white/[0.07]">
                    <Image
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
