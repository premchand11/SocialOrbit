import { Card } from "@/components/ui/card"

const LEVEL_COLORS: Record<string, string> = {
  high: "text-green-400",
  moderate: "text-yellow-400",
  low: "text-orange-400",
  very_low: "text-red-400",
}

const LEVEL_BG: Record<string, string> = {
  high: "bg-green-400",
  moderate: "bg-yellow-400",
  low: "bg-orange-400",
  very_low: "bg-red-400",
}

export default function ConfidencePanel({ confidence }: any) {
  const metrics = [
    { key: "message_activity", label: "Message Activity" },
    { key: "linguistic_patterns", label: "Linguistic Patterns" },
    { key: "personality_traits", label: "Personality Traits" },
    { key: "behavioral_scores", label: "Behavioral Scores" },
    { key: "pair_compatibility", label: "Pair Compatibility" },
    { key: "character_match", label: "Character Match" },
  ]

  return (
    <Card className="p-5 md:p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Analysis Confidence
        </h3>
        <div className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
          {confidence.data_quality.total_messages.toLocaleString()} msgs ·{" "}
          {confidence.data_quality.time_span_days} days
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((m) => {
          const data = confidence[m.key]
          if (!data) return null
          const color = LEVEL_COLORS[data.level] || "text-muted-foreground"
          const bg = LEVEL_BG[data.level] || "bg-muted"
          return (
            <div key={m.key} className="text-center space-y-2 p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground">{m.label}</p>

              {/* Circular-ish indicator */}
              <div className="relative mx-auto w-14 h-14 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none"
                    stroke="#27272a"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray={`${data.score * 97.4} 97.4`}
                    strokeLinecap="round"
                    className={color}
                  />
                </svg>
                <span className={`text-sm font-bold ${color}`}>
                  {(data.score * 100).toFixed(0)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${bg}`} />
                <span className="text-[10px] text-muted-foreground capitalize">
                  {data.level.replace("_", " ")}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
