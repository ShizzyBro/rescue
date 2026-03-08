"use client"

import Image from "next/image"

export function Logo({
  className = "",
  size = "default",
}: { className?: string; size?: "small" | "default" | "large" }) {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 44, height: 44 },
    large: { width: 64, height: 64 },
  }

  const { width, height } = dimensions[size]

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/hf-logo.png"
        alt="HANDYFLIX Logo"
        width={width}
        height={height}
        className="flex-shrink-0 rounded"
        priority
      />
    </div>
  )
}

// Compact version for favicon/small spaces
export function LogoMark({ size = 32 }: { size?: number }) {
  return <Image src="/hf-logo.png" alt="HANDYFLIX" width={size} height={size} className="rounded" priority />
}

// Full logo with text
export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size="default" />
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-white leading-none">
          HANDY<span className="text-primary">FLIX</span>
        </span>
        <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase">Premium Streaming</span>
      </div>
    </div>
  )
}
