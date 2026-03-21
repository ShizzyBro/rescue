"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Download, Sparkles, Smartphone, Zap, Wifi, Shield } from "lucide-react"

const STORAGE_KEY = "handyflix_welcome_last_shown"

interface WelcomeModalProps {
  show: boolean
}

type DeviceType = "android" | "ios" | "other"

export function WelcomeModal({ show }: WelcomeModalProps) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>("other")
  const [downloadCount, setDownloadCount] = useState<number | null>(null)
  const [version, setVersion] = useState<string>("3.0")
  const [publishedAt, setPublishedAt] = useState<string | null>(null)

  useEffect(() => {
    if (!show) return

    const lastShown = localStorage.getItem(STORAGE_KEY)
    if (lastShown) {
      const lastDate = new Date(lastShown).toDateString()
      const today = new Date().toDateString()
      if (lastDate === today) return
    }

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/android/i.test(ua)) {
      setDeviceType("android")
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      setDeviceType("ios")
    } else {
      setDeviceType("other")
    }

    fetch("/api/download-stats")
      .then((res) => res.json())
      .then((data) => {
        setDownloadCount(data.downloads)
        setVersion(data.version || "3.0")
        setPublishedAt(data.publishedAt)
      })
      .catch(() => setDownloadCount(0))

    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [show])

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
    }, 350)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[250] flex items-end sm:items-center justify-center transition-opacity duration-350 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.03 0.02 260 / 0.8)", backdropFilter: "blur(12px)" }}
        onClick={handleClose}
      />

      <div
        className={`relative z-10 w-full max-w-[400px] mx-4 mb-4 sm:mb-0 transition-all duration-350 ${
          closing ? "translate-y-8 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
        }`}
        style={{
          background: "linear-gradient(180deg, oklch(0.13 0.03 255) 0%, oklch(0.09 0.025 260) 100%)",
          borderRadius: "24px",
          border: "1px solid oklch(0.5 0.08 245 / 0.15)",
          boxShadow: "0 32px 80px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.03) inset",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full transition-all duration-200"
          style={{ background: "oklch(0.2 0.02 255 / 0.6)" }}
          aria-label="Close"
        >
          <X className="h-4 w-4 text-white/50" />
        </button>

        <div className="px-6 pt-7 pb-6">
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative mb-4">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "oklch(0.58 0.22 245 / 0.35)",
                  filter: "blur(24px)",
                  transform: "scale(2)",
                }}
              />
              <Image
                src="/hf-logo.png"
                alt="HANDYFLIX"
                width={56}
                height={56}
                priority
                className="relative rounded-2xl"
                style={{
                  boxShadow: "0 0 0 1px oklch(0.5 0.15 245 / 0.3), 0 8px 32px oklch(0.2 0.15 250 / 0.5)",
                }}
              />
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight">
              Get the HandyFlix App
            </h2>
            <p className="text-[13px] text-white/40 mt-1.5 leading-relaxed max-w-[280px]">
              A smoother, faster experience with exclusive features
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
            {version && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                style={{
                  background: "oklch(0.58 0.22 245 / 0.12)",
                  color: "oklch(0.72 0.14 245)",
                  border: "1px solid oklch(0.58 0.22 245 / 0.2)",
                }}
              >
                <Sparkles className="h-3 w-3" />
                v{version}
              </span>
            )}
            {publishedAt && (
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{
                  background: "oklch(0.2 0.01 255 / 0.5)",
                  color: "oklch(0.55 0.02 250)",
                }}
              >
                {new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
            {downloadCount !== null && downloadCount > 0 && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                style={{
                  background: "oklch(0.5 0.15 145 / 0.1)",
                  color: "oklch(0.65 0.12 145)",
                  border: "1px solid oklch(0.5 0.15 145 / 0.15)",
                }}
              >
                <Download className="h-2.5 w-2.5" />
                {downloadCount.toLocaleString()}+
              </span>
            )}
          </div>

          <div
            className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl"
            style={{
              background: "oklch(0.08 0.02 260 / 0.6)",
              border: "1px solid oklch(0.3 0.03 255 / 0.15)",
            }}
          >
            <FeatureItem icon={<Zap className="h-4 w-4" />} label="Fast" />
            <FeatureItem icon={<Wifi className="h-4 w-4" />} label="Offline" />
            <FeatureItem icon={<Shield className="h-4 w-4" />} label="Ad-Free" />
          </div>

          {deviceType === "android" ? (
            <a
              href="https://github.com/mc-shizzy/Apkhandy-/releases/download/3.0/HandyFlix.apk"
              download
              onClick={handleClose}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white relative overflow-hidden flex items-center justify-center gap-2.5 active:scale-[0.97] transition-transform duration-150"
              style={{
                background: "linear-gradient(135deg, oklch(0.52 0.2 245) 0%, oklch(0.42 0.2 265) 100%)",
                boxShadow: "0 6px 24px oklch(0.5 0.2 250 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.12)",
              }}
            >
              <Download className="h-4 w-4" />
              Download APK
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.12) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.5s linear infinite",
                }}
              />
            </a>
          ) : (
            <div
              className="w-full py-4 rounded-2xl text-center"
              style={{
                background: "oklch(0.12 0.02 255 / 0.5)",
                border: "1px solid oklch(0.3 0.03 255 / 0.15)",
              }}
            >
              <Smartphone className="h-5 w-5 mx-auto mb-1.5" style={{ color: "oklch(0.5 0.12 245)" }} />
              <p className="text-sm font-semibold text-white/70">Android Only</p>
              <p className="text-[11px] text-white/30 mt-0.5">Available for Android devices</p>
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-full mt-3 py-3 rounded-2xl text-sm font-medium text-white/35 hover:text-white/50 hover:bg-white/[0.04] transition-all duration-200"
          >
            Continue to Website
          </button>
        </div>

        <div
          className="px-6 py-3"
          style={{
            borderTop: "1px solid oklch(0.3 0.03 255 / 0.1)",
          }}
        >
          <p className="text-[10px] text-white/20 text-center tracking-wide">
            by Andy Mrlit & Infos Partage
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <span style={{ color: "oklch(0.6 0.1 245)" }}>{icon}</span>
      <span className="text-[10px] font-medium text-white/40">{label}</span>
    </div>
  )
}
