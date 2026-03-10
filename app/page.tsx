"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import BackendStatus from "@/components/BackendStatus"

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
}))

const FEATURES = [
  { icon: "🧠", title: "AI Personalities", desc: "LLM-powered personality profiling for every member" },
  { icon: "🔗", title: "Pair Dynamics", desc: "Discover who clicks, who clashes, and who ghosts" },
  { icon: "📊", title: "Deep Analytics", desc: "16,000+ message breakdowns, hourly patterns, surge days" },
  { icon: "🌐", title: "Network Graph", desc: "Interactive force-directed interaction maps" },
  { icon: "🎭", title: "Character Match", desc: "Match each member to a universe character" },
  { icon: "⚡", title: "Behavior Scores", desc: "Investment, dominance, ghost score, dry text score" },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ── Animated background ── */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px] animate-pulse [animation-delay:4s]" />

        {/* Floating particles */}
        {mounted && PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-purple-400/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Backend status ── */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <BackendStatus />
      </div>

      {/* ── Hero section ── */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <div className="relative space-y-8 max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
            </span>
            Active
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              WhatsApp
            </span>
            <br />
            <span className="text-foreground">
              Multiverse Analyzer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Upload your group chat and uncover the hidden personalities, alliances,
            ghosting patterns, and social dynamics inside your friend circle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/universe">
              <Button
                size="lg"
                className="text-lg px-10 py-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                Get Started →
              </Button>
            </Link>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              See what&apos;s inside ↓
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-8 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">8+</p>
              <p className="text-muted-foreground text-xs">Universes</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">25+</p>
              <p className="text-muted-foreground text-xs">Insight Types</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">AI</p>
              <p className="text-muted-foreground text-xs">Powered</p>
            </div>
          </div>

        </div>

      </section>

      {/* ── Features section ── */}
      <section id="features" className="relative px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you get
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              One chat file. Dozens of insights. Zero data stored.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group p-5 rounded-xl bg-card/50 border border-border/50 hover:border-purple-500/30 hover:bg-card transition-all duration-300"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-card-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative px-6 py-20 border-t border-border/30">
        <div className="max-w-3xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">
              How it works
            </h2>
            <p className="text-muted-foreground">Three steps. Under a minute.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Pick a Universe", desc: "Animals, Anime, Marvel — choose your character world" },
              { step: "02", title: "Upload Chat", desc: "Export from WhatsApp and drop the .txt file" },
              { step: "03", title: "Get Insights", desc: "AI analyzes and reveals your group's hidden dynamics" },
            ].map((s) => (
              <div key={s.step} className="space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">
                  {s.step}
                </div>
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center pt-4">
            <Link href="/universe">
              <Button
                size="lg"
                className="text-lg px-10 py-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/25"
              >
                Enter the Multiverse 🌌
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 px-6 py-6 text-center text-xs text-muted-foreground/50">
        SocialOrbit · No data stored · Your chat never leaves your browser
      </footer>

    </main>
  )
}