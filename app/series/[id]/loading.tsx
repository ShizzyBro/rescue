"use client"

import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"

export default function SeriesLoading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 30)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-black">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-500/10 blur-3xl animate-pulse"
              style={{
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with pulse animation */}
        <div className="animate-pulse">
          <Logo className="w-20 h-20" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white">Loading Series</h3>
          <p className="text-sm text-white/60">Getting episodes ready...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full transition-all duration-300 ease-out shadow-lg shadow-red-500/50"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Episode indicators */}
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-32 animate-scan" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
