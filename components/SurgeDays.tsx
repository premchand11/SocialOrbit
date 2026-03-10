"use client"

import { Card } from "@/components/ui/card"

export default function SurgeDays({ surgeDays }: any) {
  if (!surgeDays || surgeDays.length === 0) return null

  const max = surgeDays[0].count

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        🔥 Surge Days
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Days when chat went crazy
      </p>

      <div className="space-y-3">
        {surgeDays.map((s: any, i: number) => {
          const pct = (s.count / max) * 100
          const date = new Date(s.day).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })

          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-card-foreground">{date}</span>
                <span className="text-purple-400 font-semibold">{s.count}</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
