"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

const COLORS: Record<string, string> = {
  investment: "#22c55e",
  dominance: "#f59e0b",
  ghost_score: "#8b5cf6",
  dry_text_score: "#ef4444",
}

const LABELS: Record<string, string> = {
  investment: "Investment",
  dominance: "Dominance",
  ghost_score: "Ghost Score",
  dry_text_score: "Dry Text Score",
}

const ICONS: Record<string, string> = {
  investment: "💰",
  dominance: "👑",
  ghost_score: "👻",
  dry_text_score: "🌵",
}

const DESCRIPTIONS: Record<string, string> = {
  investment: "How much effort they put into conversations",
  dominance: "How much they steer and control the chat",
  ghost_score: "How likely they are to disappear mid-conversation",
  dry_text_score: "How short/minimal their messages tend to be",
}

export default function BehaviorBreakdown({ behavior }: any) {
  const users = Object.keys(behavior)
  const [selectedUser, setSelectedUser] = useState(users[0])
  const metrics = ["investment", "dominance", "ghost_score", "dry_text_score"]

  const userData = behavior[selectedUser]

  // Find who ranks #1 in each metric
  const leaders: Record<string, { name: string; value: number }> = {}
  metrics.forEach((metric) => {
    let best = { name: "", value: 0 }
    users.forEach((u) => {
      if (behavior[u][metric] > best.value) {
        best = { name: u, value: behavior[u][metric] }
      }
    })
    leaders[metric] = best
  })

  return (
    <Card className="p-5 md:p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Behavior Breakdown
      </h3>

      {/* User tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {users.map((user) => (
          <button
            key={user}
            onClick={() => setSelectedUser(user)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selectedUser === user
                ? "bg-purple-500/20 border-purple-500 text-purple-400"
                : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            }`}
          >
            {user.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {metrics.map((metric) => {
          const val = userData[metric]
          const pct = (val * 100).toFixed(0)
          const isLeader = leaders[metric].name === selectedUser
          return (
            <div key={metric} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{ICONS[metric]}</span>
                  <span className="text-sm text-card-foreground font-medium">
                    {LABELS[metric]}
                  </span>
                  {isLeader && (
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">
                      #1
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: COLORS[metric] }}
                >
                  {pct}%
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${val * 100}%`,
                    backgroundColor: COLORS[metric],
                  }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground/70">
                {DESCRIPTIONS[metric]}
              </p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
