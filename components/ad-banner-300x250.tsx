"use client"

import { useEffect, useRef } from "react"

/**
 * Adsterra 300x250 Display Banner
 * Renders the banner in an isolated container and injects the ad scripts
 * once on mount. Hidden automatically when the video player is fullscreen.
 */
export function AdBanner300x250({ hidden = false }: { hidden?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const injected = useRef(false)

  useEffect(() => {
    if (injected.current || !containerRef.current) return
    injected.current = true

    // Options script
    const optionsScript = document.createElement("script")
    optionsScript.type = "text/javascript"
    optionsScript.text = `
      atOptions = {
        'key' : '037d6362ae129306847c1d13943cdc70',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `
    containerRef.current.appendChild(optionsScript)

    // Invoke script
    const invokeScript = document.createElement("script")
    invokeScript.type = "text/javascript"
    invokeScript.src =
      "https://wayanatomyunavailable.com/037d6362ae129306847c1d13943cdc70/invoke.js"
    invokeScript.async = true
    containerRef.current.appendChild(invokeScript)
  }, [])

  return (
    <div className="flex justify-center my-4" style={{ visibility: hidden ? "hidden" : "visible" }}>
      <div
        ref={containerRef}
        style={{ width: 300, height: 250, overflow: "hidden" }}
        aria-label="Advertisement"
      />
    </div>
  )
}
