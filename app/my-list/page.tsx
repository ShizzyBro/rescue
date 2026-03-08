import type { Metadata } from "next"
import MyListPageClient from "@/components/my-list-page-client"

export const metadata: Metadata = {
  title: "My List - Your Saved Movies & TV Shows",
  description:
    "Access your personalized watchlist on HANDYFLIX. All your saved movies and TV shows in one place. Never forget what you want to watch next.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function MyListPage() {
  return <MyListPageClient />
}
