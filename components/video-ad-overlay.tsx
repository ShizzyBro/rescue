"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"

export interface VideoAdOverlayProps {
  /** Delay in milliseconds before the ad overlay appears. Defaults to 10000 (10 seconds). */
  delay?: number
}

export function VideoAdOverlay({ delay = 10000 }: VideoAdOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const adContainerRef = useRef<HTMLDivElement>(null)
  const scriptInjectedRef = useRef(false)

  // Show the overlay after the specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  // Inject the ad script into the container once the overlay is visible
  useEffect(() => {
    if (!isVisible || scriptInjectedRef.current || !adContainerRef.current) return

    scriptInjectedRef.current = true

    const container = adContainerRef.current

    // Set atOptions on the window object for the external script
    const optionsScript = document.createElement("script")
    optionsScript.type = "text/javascript"
    optionsScript.text = `
      window.atOptions = {
        'key' : '9a79b03acf3a8b5ceea040142b3904da',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `
    container.appendChild(optionsScript)

    // Load the external Adsterra script
    const externalScript = document.createElement("script")
    externalScript.type = "text/javascript"
    externalScript.src =
      "https://www.highperformanceformat.com/9a79b03acf3a8b5ceea040142b3904da/invoke.js"
    externalScript.onerror = () => {
      console.warn("Ad script failed to load")
    }
    container.appendChild(externalScript)
  }, [isVisible])

  const handleClose = useCallback(() => {
    setIsVisible(false)

    // Clean up injected scripts when closing
    if (adContainerRef.current) {
      while (adContainerRef.current.firstChild) {
        adContainerRef.current.removeChild(adContainerRef.current.firstChild)
      }
    }
    scriptInjectedRef.current = false
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="absolute inset-0 z-[150] flex items-center justify-center bg-black/60"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative rounded-lg bg-black/90 p-4 shadow-lg">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-10 rounded-full bg-white/20 p-1 transition-colors hover:bg-white/40"
          aria-label="Close ad"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* Ad container — scripts are injected here via ref */}
        <div ref={adContainerRef} className="min-h-[250px] min-w-[300px]" />
      </div>
    </div>
  )
}
