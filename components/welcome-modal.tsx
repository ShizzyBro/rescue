"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Monitor, ShieldOff, Download, Sparkles, Smartphone } from "lucide-react"

const SESSION_KEY = "handyflix_welcome_dismissed"

interface WelcomeModalProps {
  show: boolean
}

type DeviceType = "android" | "ios" | "other"

export function WelcomeModal({ show }: WelcomeModalProps) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>("other")

  useEffect(() => {
    if (!show) return
    // Check if already dismissed today
    const dismissed = sessionStorage.getItem(SESSION_KEY)
    if (dismissed) return
    
    // Detect device type
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/android/i.test(ua)) {
      setDeviceType("android")
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      setDeviceType("ios")
    } else {
      setDeviceType("other")
    }
    
    // Small delay after splash screen ends
    const timer = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timer)
  }, [show])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
    }, 300)
  }

  const handleDontShowToday = () => {
    sessionStorage.setItem(SESSION_KEY, "true")
    handleClose()
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[250] flex items-center justify-center px-4 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-[380px] rounded-3xl overflow-hidden transition-all duration-300 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          background: "oklch(0.11 0.025 255)",
          border: "1px solid oklch(0.7 0.05 240 / 0.15)",
          boxShadow: "0 25px 80px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.06)",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="px-6 pt-6 pb-5">
          {/* Logo and title */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="rounded-xl overflow-hidden shrink-0"
              style={{
                boxShadow: "0 0 20px oklch(0.58 0.22 245 / 0.4)",
              }}
            >
              <Image
                src="/hf-logo.png"
                alt="HANDYFLIX"
                width={44}
                height={44}
                className="rounded-xl"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground leading-tight">
                Welcome to HANDYFLIX!
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Stream movies & series without limits
              </p>
            </div>
          </div>

          {/* Download App button — only for Android */}
          {deviceType === "android" ? (
            <>
              <button
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-white relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, oklch(0.5 0.18 245) 0%, oklch(0.45 0.2 260) 100%)",
                  boxShadow: "0 8px 32px oklch(0.5 0.2 250 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.15)",
                }}
                disabled
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  App Coming Soon
                </span>
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.3) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
              </button>

              {/* Don't show today */}
              <button
                onClick={handleDontShowToday}
                className="w-full mt-3 py-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {"Don't show it today"}
              </button>
            </>
          ) : (
            <div
              className="w-full py-4 px-4 rounded-2xl text-center"
              style={{
                background: "oklch(0.15 0.03 255 / 0.6)",
                border: "1px solid oklch(0.7 0.05 240 / 0.1)",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Smartphone className="h-5 w-5" style={{ color: "oklch(0.58 0.22 245)" }} />
              </div>
              <p className="text-sm font-semibold text-foreground">Android Only</p>
              <p className="text-[12px] text-muted-foreground mt-1">
                This app is available for Android devices only
              </p>
            </div>
          )}

          {/* Feature badges */}
          <div className="flex items-center justify-between mt-4 px-2">
            <FeatureBadge icon={<Monitor className="h-5 w-5" />} label="4K · HD" />
            <FeatureBadge icon={<ShieldOff className="h-5 w-5" />} label="No Ads" />
            <FeatureBadge icon={<Download className="h-5 w-5" />} label="Offline" />
            <FeatureBadge icon={<Sparkles className="h-5 w-5" />} label="Exclusive" />
          </div>
        </div>

        {/* Bottom section */}
        <div
          className="px-6 py-4"
          style={{
            background: "oklch(0.08 0.02 260)",
            borderTop: "1px solid oklch(0.7 0.05 240 / 0.1)",
          }}
        >
          <p className="text-[11px] text-muted-foreground/70 text-center leading-relaxed">
            Enjoy unlimited streaming of movies and TV series.
            <br />
            <span style={{ color: "oklch(0.58 0.22 245 / 0.8)" }}>by Andy Mrlit & Infos Partage</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="p-2.5 rounded-xl"
        style={{
          background: "oklch(0.15 0.03 255 / 0.6)",
          border: "1px solid oklch(0.7 0.05 240 / 0.1)",
        }}
      >
        <span style={{ color: "oklch(0.7 0.1 245)" }}>{icon}</span>
      </div>
      <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
