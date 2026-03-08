import type { Metadata } from "next"
import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to HANDYFLIX homepage to continue streaming.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Lost your way?</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              HANDYFLIX Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
