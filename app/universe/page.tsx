"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import BackendStatus from "@/components/BackendStatus"

export default function UniversePage() {
  const [universes, setUniverses] = useState([])
  const router = useRouter()

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    fetch(`${base}/analysis/universes`)
      .then((res) => res.json())
      .then((data) => setUniverses(data.universes))
      .catch(() => {})
  }, [])

  return (
    <main className="min-h-screen px-6 py-12 md:px-12">

      <div className="max-w-5xl mx-auto space-y-10">

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              ← Back
            </Link>
            <BackendStatus />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Choose Your Universe 🌌
          </h1>
          <p className="text-muted-foreground">
            Select a universe to analyze your WhatsApp chat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {universes.map((u: any) => (
            <Card
              key={u.key}
              className="p-6 bg-card border-border hover:bg-accent cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
              onClick={() => router.push(`/upload?universe=${u.key}`)}
            >
              <h2 className="text-lg font-semibold text-card-foreground">{u.label}</h2>
            </Card>
          ))}

        </div>

      </div>

    </main>
  )
}