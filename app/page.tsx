"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import BackendStatus from "@/components/BackendStatus"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)]" />

      {/* backend status */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <BackendStatus />
      </div>

      <div className="relative space-y-10 max-w-3xl">

        {/* title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          WhatsApp Multiverse Analyzer
        </h1>

        {/* subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Upload your WhatsApp chat and explore the hidden universe inside your group
          personalities, alliances, ghosting patterns, and social dynamics.
        </p>

        {/* CTA */}
        <Link href="/universe">
          <Button
            size="lg"
            className="text-lg px-10 py-6 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20"
          >
            Enter the Multiverse 🌌
          </Button>
        </Link>

        {/* features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-sm text-muted-foreground">

          <div className="space-y-2">
            <div className="text-xl">🧠</div>
            <p>AI personality insights</p>
          </div>

          <div className="space-y-2">
            <div className="text-xl">📊</div>
            <p>Deep chat analytics</p>
          </div>

          <div className="space-y-2">
            <div className="text-xl">🌐</div>
            <p>Interaction network maps</p>
          </div>

        </div>

      </div>

    </main>
  )
}