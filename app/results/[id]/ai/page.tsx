"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import BackendStatus from "@/components/BackendStatus"
import AIInsights from "@/components/AIInsights"
import AIPersonalities from "@/components/AIPersonalities"

export default function AIPage() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("analysis")

    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading AI insights...</div>
      </main>
    )
  }

  const analysis = data.analysis

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-zinc-950 to-background">

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 md:space-y-14">

        {/* NAVIGATION */}
        <nav className="flex items-center justify-between border-b border-border pb-3 text-sm md:text-base sticky top-0 bg-background/80 backdrop-blur-md z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">

          <div className="flex gap-6">
            <Link
              href={`/results/${data.id}`}
              className="text-muted-foreground hover:text-foreground transition pb-2.5 -mb-[13px]"
            >
              Analytics
            </Link>

            <Link
              href={`/results/${data.id}/ai`}
              className="text-purple-400 font-semibold border-b-2 border-purple-400 pb-2.5 -mb-[13px]"
            >
              AI Insights
            </Link>
          </div>

          <BackendStatus />

        </nav>


        {/* HEADER */}
        <section className="space-y-2">

          <h1 className="text-3xl md:text-4xl font-bold">
            AI Multiverse Insights
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            AI-powered analysis of your group&apos;s personalities and dynamics
          </p>

        </section>

        <AIInsights insights={analysis.ai_insights} />

        <AIPersonalities users={analysis.ai_insights.users} />

      </div>

    </main>
  )
}