"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus, Star } from "lucide-react"
import type { Movie } from "@/lib/data"
import { cn } from "@/lib/utils"

interface MovieCarouselProps {
  title: string
  movies: Movie[]
  id?: string
}

export function MovieCarousel({ title, movies, id }: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <section id={id} className="py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <Link href="/#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            See all
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "h-full w-10 flex items-center justify-center",
              "bg-gradient-to-r from-background to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              !showLeftArrow && "hidden",
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "h-full w-10 flex items-center justify-center",
              "bg-gradient-to-l from-background to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              !showRightArrow && "hidden",
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Movies */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MovieCard({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="flex-shrink-0 w-[140px] sm:w-[160px] group/card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative aspect-[2/3] rounded-md overflow-hidden",
          "transition-all duration-300 ease-out",
          isHovered && "scale-105 shadow-xl shadow-black/50 z-10",
        )}
      >
        <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />

        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent",
            "flex flex-col justify-end p-2.5",
            "opacity-0 group-hover/card:opacity-100 transition-opacity duration-300",
          )}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <button className="p-1.5 rounded-full bg-white hover:bg-white/90 transition-colors" aria-label="Play">
              <Play className="h-3 w-3 fill-black text-black" />
            </button>
            <button
              className="p-1.5 rounded-full border border-white/50 hover:border-white transition-colors"
              aria-label="Add to list"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold">{movie.rating}</span>
          </div>
        </div>
      </div>

      <h3 className="mt-1.5 text-xs font-medium truncate group-hover/card:text-primary transition-colors">
        {movie.title}
      </h3>
    </Link>
  )
}
