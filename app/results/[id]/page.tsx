"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import BackendStatus from "@/components/BackendStatus"
import Overview from "@/components/Overview"
import Participants from "@/components/Participants"
import CharacterReveal from "@/components/CharacterReveal"
import PersonalityRadar from "@/components/PersonalityRadar"
import CompatibilityTable from "@/components/CompatibilityTable"
import GroupHealth from "@/components/GroupHealth"
import ActivityChart from "@/components/ActivityChart"
import HourlyActivity from "@/components/HourlyActivity"
import InteractionGraph from "@/components/InteractionGraph"
import TopWords from "@/components/TopWords"
import EmojiLeaderboard from "@/components/EmojiLeaderboard"
import RiskPanel from "@/components/RiskPanel"
import BehaviorBreakdown from "@/components/BehaviorBreakdown"
import UserSummaries from "@/components/UserSummaries"
import TrendHighlights from "@/components/TrendHighlights"
import EngagementStats from "@/components/EngagementStats"
import SurgeDays from "@/components/SurgeDays"
import UserLanguage from "@/components/UserLanguage"
import ConfidencePanel from "@/components/ConfidencePanel"
import ExplanationCards from "@/components/ExplanationCards"

export default function ResultsPage() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("analysis")
    if (stored) setData(JSON.parse(stored))
  }, [])

  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">

        <div className="text-xl animate-pulse text-foreground">
          Loading Multiverse Analysis...
        </div>

        <p className="text-muted-foreground text-sm text-center max-w-sm">
          If this takes too long, please re-upload the chat file.
        </p>

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
              className="text-purple-400 font-semibold border-b-2 border-purple-400 pb-2.5 -mb-[13px]"
            >
              Analytics
            </Link>

            <Link
              href={`/results/${data.id}/ai`}
              className="text-muted-foreground hover:text-foreground transition pb-2.5 -mb-[13px]"
            >
              AI Insights
            </Link>
          </div>

          <BackendStatus />

        </nav>


        {/* HEADER */}
        <section className="space-y-2">

          <h1 className="text-3xl md:text-4xl font-bold">
            Multiverse Analysis 🌌
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            Universe: <span className="text-purple-400 font-medium capitalize">{analysis.meta.universe}</span> ·{" "}
            {analysis.meta.participants.length} participants ·{" "}
            {analysis.chat_metrics.total_messages.toLocaleString()} messages ·{" "}
            {analysis.chat_metrics.time_span_days} days
          </p>

        </section>


        {/* OVERVIEW STATS */}
        <section>
          <Overview metrics={analysis.chat_metrics} />
        </section>


        {/* PARTICIPANTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Participants</h2>
          <Participants participants={analysis.meta.participants} />
        </section>


        {/* MEMBER PROFILES */}
        {analysis.user_summaries && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Member Profiles</h2>
            <UserSummaries
              summaries={analysis.user_summaries}
              characterMatches={analysis.character_matches}
            />
          </section>
        )}


        {/* CHARACTER + PERSONALITY */}
        <section className="space-y-6">

          <h2 className="text-xl font-semibold">Multiverse Reveal ✨</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <CharacterReveal matches={analysis.character_matches} />
            <PersonalityRadar traits={analysis.traits} />
          </div>

        </section>


        {/* CHARACTER EXPLANATIONS */}
        {analysis.explanations && (
          <section className="space-y-4">
            <ExplanationCards explanations={analysis.explanations} />
          </section>
        )}


        {/* BEHAVIOR */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Behavioral Insights</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <BehaviorBreakdown behavior={analysis.behavior} />
            <EngagementStats engagement={analysis.engagement} />
          </div>

          <RiskPanel risk={analysis.risk_analysis} />
        </section>


        {/* RELATIONSHIPS */}
        <section className="space-y-6">

          <h2 className="text-xl font-semibold">Relationship Dynamics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <CompatibilityTable pairs={analysis.pair_dynamics} />
            <GroupHealth health={analysis.group_health} />
          </div>

        </section>


        {/* ACTIVITY */}
        <section className="space-y-6">

          <h2 className="text-xl font-semibold">Chat Activity</h2>

          <TrendHighlights trends={analysis.trends} />
          <ActivityChart dailyCounts={analysis.trends.daily_counts} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <HourlyActivity hourlyDistribution={analysis.trends.hourly_distribution} />
            <SurgeDays surgeDays={analysis.trends.surge_days} />
          </div>

        </section>


        {/* NETWORK */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Interaction Network</h2>
          <InteractionGraph pairs={analysis.pair_dynamics} />
        </section>


        {/* LANGUAGE */}
        <section className="space-y-6">

          <h2 className="text-xl font-semibold">Chat Language</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <TopWords words={analysis.linguistics.group.top_words} />
            <EmojiLeaderboard emojis={analysis.linguistics.group.top_emojis} />
          </div>

          {analysis.linguistics.participants && (
            <UserLanguage linguistics={analysis.linguistics} />
          )}

        </section>


        {/* CONFIDENCE */}
        {analysis.confidence && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Data Confidence</h2>
            <ConfidencePanel confidence={analysis.confidence} />
          </section>
        )}

      </div>

    </main>
  )
}