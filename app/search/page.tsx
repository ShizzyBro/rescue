import type { Metadata } from "next"
import SearchPageClient from "@/components/search-page-client"

export const metadata: Metadata = {
  title: "Search Movies & TV Shows",
  description:
    "Search for your favorite movies and TV shows on HANDYFLIX. Find the latest releases, trending series, and classic films. Stream in HD quality for free.",
  keywords: [
    "search movies",
    "search TV shows",
    "find movies",
    "find series",
    "HANDYFLIX search",
    "streaming search",
    "movie finder",
  ],
  openGraph: {
    title: "Search Movies & TV Shows - HANDYFLIX",
    description: "Find and stream your favorite movies and TV shows on HANDYFLIX",
    type: "website",
  },
}

export default function SearchPage() {
  return <SearchPageClient />
}
