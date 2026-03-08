"use client"

import { useState } from "react"
import { movies, genres } from "@/lib/data"
import { MovieCarousel } from "./movie-carousel"
import { cn } from "@/lib/utils"
import {
  Zap, Compass, Smile, Search, Drama, Wand2, BookOpen, Skull, Stethoscope,
  Eye, Heart, Telescope, AlertTriangle, Film,
} from "lucide-react"

// Map genres to icons and accent colors
const GENRE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  All:        { icon: Film,          color: "oklch(0.65 0.15 245)",  bg: "oklch(0.65 0.15 245 / 0.12)" },
  Action:     { icon: Zap,           color: "oklch(0.72 0.2 55)",    bg: "oklch(0.72 0.2 55 / 0.12)" },
  Adventure:  { icon: Compass,       color: "oklch(0.72 0.18 35)",   bg: "oklch(0.72 0.18 35 / 0.12)" },
  Comedy:     { icon: Smile,         color: "oklch(0.82 0.18 85)",   bg: "oklch(0.82 0.18 85 / 0.12)" },
  Crime:      { icon: Search,        color: "oklch(0.55 0.1 290)",   bg: "oklch(0.55 0.1 290 / 0.12)" },
  Drama:      { icon: Drama,         color: "oklch(0.7 0.16 15)",    bg: "oklch(0.7 0.16 15 / 0.12)" },
  Fantasy:    { icon: Wand2,         color: "oklch(0.7 0.2 295)",    bg: "oklch(0.7 0.2 295 / 0.12)" },
  History:    { icon: BookOpen,      color: "oklch(0.72 0.14 60)",   bg: "oklch(0.72 0.14 60 / 0.12)" },
  Horror:     { icon: Skull,         color: "oklch(0.55 0.15 25)",   bg: "oklch(0.55 0.15 25 / 0.12)" },
  Medical:    { icon: Stethoscope,   color: "oklch(0.68 0.18 185)",  bg: "oklch(0.68 0.18 185 / 0.12)" },
  Mystery:    { icon: Eye,           color: "oklch(0.6 0.12 270)",   bg: "oklch(0.6 0.12 270 / 0.12)" },
  Romance:    { icon: Heart,         color: "oklch(0.7 0.22 5)",     bg: "oklch(0.7 0.22 5 / 0.12)" },
  "Sci-Fi":   { icon: Telescope,     color: "oklch(0.65 0.22 220)",  bg: "oklch(0.65 0.22 220 / 0.12)" },
  Thriller:   { icon: AlertTriangle, color: "oklch(0.65 0.2 40)",    bg: "oklch(0.65 0.2 40 / 0.12)" },
}

export function GenreSection() {
  const [selectedGenre, setSelectedGenre] = useState("All")

  const filteredMovies =
    selectedGenre === "All" ? movies : movies.filter((m) => m.genre.includes(selectedGenre))

  return (
    <section id="genres" className="py-6">
      {/* ---- Genre grid header ---- */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="section-title-line w-6" />
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Browse by Genre</h2>
        </div>

        {/* Scrollable genre card row */}
        <div
          className="flex gap-2.5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {genres.map((genre) => {
            const cfg = GENRE_CONFIG[genre] ?? GENRE_CONFIG["All"]
            const Icon = cfg.icon
            const isActive = selectedGenre === genre

            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "scale-105 shadow-lg"
                    : "hover:scale-[1.03] hover:brightness-110",
                )}
                style={
                  isActive
                    ? {
                        background: cfg.bg,
                        border: `1px solid ${cfg.color}55`,
                        color: cfg.color,
                        boxShadow: `0 0 20px ${cfg.color}30, inset 0 1px 0 oklch(1 0 0 / 0.1)`,
                      }
                    : {
                        background: "oklch(0.14 0.03 255 / 0.5)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid oklch(0.7 0.05 240 / 0.1)",
                        color: "oklch(0.62 0.02 250)",
                      }
                }
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: isActive ? cfg.color : "oklch(0.62 0.02 250)" }}
                />
                {genre}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filtered carousel */}
      <MovieCarousel
        title={selectedGenre === "All" ? "All Movies" : `${selectedGenre}`}
        movies={filteredMovies}
      />
    </section>
  )
}
