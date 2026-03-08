"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Trash2, Film, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { fetchInfo, type NormalizedContent } from "@/lib/api"
import { getMyList, removeFromMyList } from "@/lib/my-list"

export default function MyListPageClient() {
  const [myListIds, setMyListIds] = useState<string[]>([])
  const [myListContent, setMyListContent] = useState<NormalizedContent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMyList() {
      setIsLoading(true)
      const ids = getMyList()
      setMyListIds(ids)

      const contentPromises = ids.map((id) => fetchInfo(id))
      const results = await Promise.all(contentPromises)
      const validContent = results.filter((item): item is NormalizedContent => item !== null)
      setMyListContent(validContent)
      setIsLoading(false)
    }

    loadMyList()
  }, [])

  const handleRemove = (id: string) => {
    removeFromMyList(id)
    setMyListIds((prev) => prev.filter((itemId) => itemId !== id))
    setMyListContent((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My List</h1>
            <p className="text-muted-foreground">
              {myListContent.length} {myListContent.length === 1 ? "title" : "titles"}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading your list...</p>
            </div>
          ) : myListContent.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
                <Film className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your list is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Add movies and TV shows to your list to watch them later
              </p>
              <Link href="/">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Browse Content
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myListContent.map((item) => {
                const detailUrl = item.type === "series" ? `/series/${item.id}` : `/movie/${item.id}`
                return (
                  <div key={item.id} className="group relative">
                    <Link href={detailUrl}>
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted ring-1 ring-white/5 group-hover:ring-primary/50 transition-all">
                        <Image
                          src={item.poster || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {item.type === "series" && (
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary text-[9px] font-bold rounded">
                            SERIES
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 opacity-0 group-hover:opacity-100 hover:bg-primary transition-all"
                      aria-label="Remove from list"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <h3 className="mt-2 text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.releaseDate?.split("-")[0]}</span>
                      <span className="text-yellow-500">★ {item.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
