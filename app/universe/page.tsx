"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import BackendStatus from "@/components/BackendStatus"

const UNIVERSE_ICONS: Record<string, string> = {
  animals: "🐾",
  anime: "⚔️",
  marvel: "🦸",
  dc: "🦇",
  hogwarts: "🪄",
  greek_mythology: "⚡",
  zodiac: "♈",
  ocean: "🌊",
  fantasy: "🐉",
  sports: "⚽",
}

const UNIVERSE_DESCRIPTIONS: Record<string, string> = {
  animals: "Wolf, Eagle, Dolphin, Owl — who's the real alpha?",
  anime: "Find your inner Naruto, Gojo, or Light Yagami",
  marvel: "Are you Iron Man or more of a Loki?",
  dc: "Batman or Joker? Let the chat decide",
  hogwarts: "Gryffindor, Slytherin, or something in between",
  greek_mythology: "Zeus, Athena, Poseidon — which god are you?",
  zodiac: "Match chat behavior to zodiac archetypes",
  ocean: "Shark, Whale, Jellyfish — deep sea personalities",
  fantasy: "Dragons, Wizards, and Elves — your fantasy self",
  sports: "The striker, the goalie, the coach of the group",
}

export default function UniversePage() {
  const [universes, setUniverses] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    fetch(`${base}/analysis/universes`)
      .then((res) => res.json())
      .then((data) => {
        setUniverses(data.universes)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen px-6 py-12 md:px-12">

      <div className="max-w-5xl mx-auto space-y-10">

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              ← Back
            </Link>
            <BackendStatus />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Choose Your Universe
          </h1>
          <p className="text-muted-foreground">
            Each universe maps chat personalities to a different character set
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 rounded-xl bg-card border border-border animate-pulse" />
            ))}
          </div>
        ) : universes.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="text-3xl">😵</p>
            <p className="text-muted-foreground">Backend is offline. Start your API server to see universes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {universes.map((u: any, i: number) => {
              const icon = UNIVERSE_ICONS[u.key] || "🌌"
              const desc = UNIVERSE_DESCRIPTIONS[u.key] || "Discover your character match"
              return (
                <Card
                  key={u.key}
                  className="group p-5 bg-card border-border hover:border-purple-500/30 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => router.push(`/upload?universe=${u.key}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      {icon}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base font-semibold text-card-foreground capitalize">
                        {u.label}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

      </div>

    </main>
  )
}