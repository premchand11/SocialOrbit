"use client"

import { Card } from "@/components/ui/card"

const ROLE_COLORS: Record<string, string> = {
  "Strategic Driver": "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30",
  "Active Contributor": "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  "Quiet Observer": "from-blue-500/20 to-blue-600/5 border-blue-500/30",
}

const ROLE_BADGES: Record<string, string> = {
  "Strategic Driver": "bg-yellow-500/20 text-yellow-400",
  "Active Contributor": "bg-purple-500/20 text-purple-400",
  "Quiet Observer": "bg-blue-500/20 text-blue-400",
}

const RISK_COLORS: Record<string, string> = {
  "Stable Presence": "text-green-400",
  "Low Emotional Investment": "text-orange-400",
  "Fading Presence": "text-red-400",
}

export default function UserSummaries({ summaries, characterMatches }: any) {
  const entries = Object.entries(summaries) as [string, any][]

  // Sort by influence score
  entries.sort((a, b) => b[1].influence_score - a[1].influence_score)

  return (
    <Card className="p-5 md:p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-5">
        Member Profiles
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {entries.map(([name, data]: [string, any]) => {
          const roleClass = ROLE_COLORS[data.role] || ROLE_COLORS["Active Contributor"]
          const badgeClass = ROLE_BADGES[data.role] || ROLE_BADGES["Active Contributor"]
          const riskColor = RISK_COLORS[data.risk_flag] || "text-muted-foreground"
          const character = characterMatches?.[name]

          return (
            <div
              key={name}
              className={`relative rounded-xl p-4 bg-gradient-to-b border ${roleClass} space-y-3`}
            >
              {/* Rank badge */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {name.split(" ")[0]}
                  </p>
                  {character && (
                    <p className="text-xs text-purple-400 font-medium mt-0.5">
                      {character.character}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  #{data.influence_rank}
                </span>
              </div>

              {/* Role */}
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${badgeClass}`}>
                {data.role}
              </span>

              {/* Stats */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Influence</span>
                  <span className="text-card-foreground font-medium">
                    {(data.influence_score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Bond</span>
                  <span className="text-cyan-400 font-medium">
                    {data.strongest_bond?.split(" ")[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`font-medium ${riskColor}`}>
                    {data.risk_flag}
                  </span>
                </div>
              </div>

              {/* Imbalance */}
              {data.most_imbalanced_bond && (
                <div className="pt-2 border-t border-border/50">
                  <p className="text-[10px] text-muted-foreground/70">
                    ⚖️ {data.most_imbalanced_bond.direction} with{" "}
                    {data.most_imbalanced_bond.partner.split(" ")[0]}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
