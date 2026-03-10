"use client"

import { Card } from "@/components/ui/card"

export default function EngagementStats({ engagement }: any) {
  const entries = Object.entries(engagement) as [string, any][]

  // Sort by ignored ratio descending (most ignored first)
  entries.sort((a, b) => b[1].ignored_ratio - a[1].ignored_ratio)

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Ignored Messages
      </h3>

      <div className="space-y-3">
        {entries.map(([name, data]: [string, any]) => {
          const pct = (data.ignored_ratio * 100).toFixed(1)
          const color =
            data.ignored_ratio > 0.13
              ? "#ef4444"
              : data.ignored_ratio > 0.1
              ? "#f59e0b"
              : "#22c55e"

          return (
            <div key={name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-card-foreground">
                  {name.split(" ")[0]}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">
                    {data.ignored_count} msgs
                  </span>
                  <span className="font-medium text-xs" style={{ color }}>
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${data.ignored_ratio * 100 * 5}%`, // Scale up for visibility
                    maxWidth: "100%",
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
