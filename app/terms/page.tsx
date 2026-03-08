import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, AlertTriangle, Globe, UserCheck, Eye, Server } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions — HANDYFLIX",
  description: "Terms and Conditions for using HANDYFLIX, a free streaming platform for the Haitian community.",
}

const SECTIONS = [
  {
    icon: Globe,
    title: "About HANDYFLIX",
    content: `HANDYFLIX is a free, non-commercial streaming platform created for the Haitian community, offering a curated library of films and series primarily in French and Haitian Creole. The platform is operated independently and is not affiliated with any major studio, broadcaster, or streaming service.

HANDYFLIX was created and is maintained by Andy Mrlit, in collaboration with Infos Partage, with the mission of making quality francophone and Caribbean content accessible to Haitian audiences worldwide.`,
  },
  {
    icon: Server,
    title: "Unofficial API & Content Sources",
    content: `HANDYFLIX sources its content through unofficial third-party APIs and publicly available embeds. We do not host, store, upload, or distribute any video files directly on our servers. All media is streamed from external providers.

We make no guarantee of the availability, quality, or legality of the content provided through these unofficial sources. Content may be removed, altered, or become unavailable at any time without notice. HANDYFLIX is not responsible for the content, accuracy, or copyright compliance of any third-party source.`,
  },
  {
    icon: AlertTriangle,
    title: "Disclaimer of Liability",
    content: `HANDYFLIX is provided "as is" without any warranty of any kind, express or implied. We do not guarantee uninterrupted access to the platform or any specific content. We are not liable for any damages arising from your use of the site, including but not limited to loss of data, device issues, or exposure to third-party content.

The platform includes third-party advertisements served by Adsterra. We are not responsible for the content, nature, or behavior of any advertisements displayed on this site. Ad content is managed entirely by the advertising network.`,
  },
  {
    icon: UserCheck,
    title: "User Responsibilities",
    content: `By using HANDYFLIX you agree to:

— Use the platform for personal, non-commercial purposes only.
— Not attempt to download, copy, redistribute, or scrape any content from the platform.
— Not use automated tools, bots, or scripts to access the platform.
— Not attempt to bypass, disable, or interfere with any security or technical measures.
— Be solely responsible for your use of the platform and any consequences thereof.

Access to the platform is provided at our discretion and may be revoked at any time without notice.`,
  },
  {
    icon: Eye,
    title: "Privacy & Cookies",
    content: `HANDYFLIX does not require user registration or collect personal information to browse the platform. We may use anonymous analytics to understand usage patterns and improve the service.

Third-party advertising partners (Adsterra) may place cookies or tracking technologies on your device to serve relevant advertisements. You can manage cookie preferences through your browser settings. By continuing to use the site, you consent to the use of cookies by our advertising partners.

We do not sell, rent, or share any user data with third parties beyond what is necessary to operate the advertising on this platform.`,
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    content: `All trademarks, film titles, posters, and related content belong to their respective owners. HANDYFLIX makes no claim of ownership over any third-party intellectual property displayed on this platform. The use of such material is incidental to the operation of a content discovery and streaming index service.

If you are a rights holder and believe your content is being displayed without authorization, please contact us and we will promptly address your concern.`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, oklch(0.58 0.22 245) 0%, transparent 70%)" }}
        />
      </div>

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3"
        style={{
          background: "oklch(0.07 0.02 260 / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.7 0.05 240 / 0.08)",
        }}
      >
        <div className="mx-auto max-w-[1320px] flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group flex-shrink-0"
          >
            <div className="glass-pill p-1.5 rounded-lg group-hover:border-primary/30 transition-all duration-200">
              <ArrowLeft className="h-3.5 w-3.5" />
            </div>
            <Image src="/hf-logo.png" alt="HANDYFLIX" width={24} height={24} className="rounded-lg ml-1" />
            <span className="hidden sm:block text-[14px] font-black tracking-tighter">
              <span className="text-primary">HANDY</span><span className="text-foreground">FLIX</span>
            </span>
          </Link>
          <span className="text-muted-foreground/40 text-sm">/</span>
          <span className="text-sm text-muted-foreground font-medium">Terms & Conditions</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 pb-20">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-primary"
              style={{ background: "oklch(0.58 0.22 245 / 0.12)", border: "1px solid oklch(0.58 0.22 245 / 0.25)" }}
            >
              Legal
            </span>
            <span className="text-xs text-muted-foreground/50">Last updated: January 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-balance mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm max-w-xl">
            Please read these terms carefully before using HANDYFLIX. By accessing or using the platform, you agree to be bound by the terms described below.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {SECTIONS.map(({ icon: Icon, title, content }, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.11 0.025 255 / 0.7)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.7 0.05 240 / 0.08)",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.58 0.22 245 / 0.12)", border: "1px solid oklch(0.58 0.22 245 / 0.2)" }}
                >
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-bold text-base tracking-tight">{title}</h2>
              </div>
              <div className="space-y-3">
                {content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact + creator */}
        <div
          className="mt-6 rounded-2xl p-6 text-center"
          style={{
            background: "oklch(0.58 0.22 245 / 0.06)",
            border: "1px solid oklch(0.58 0.22 245 / 0.14)",
          }}
        >
          <p className="text-sm text-muted-foreground mb-1">
            Questions about these terms? Reach out at{" "}
            <a
              href="mailto:contact@freehandyflix.online"
              className="text-primary hover:underline"
            >
              contact@freehandyflix.online
            </a>
          </p>
          <p className="text-xs text-muted-foreground/50 mt-3">
            HANDYFLIX &copy; 2026 — Created by{" "}
            <span className="text-foreground/70 font-semibold">Andy Mrlit</span>
            {" "}in collaboration with{" "}
            <span className="text-foreground/70 font-semibold">Infos Partage</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
