import { Card } from "@/components/ui/card"

export default function GroupHealth({ health }: any) {

  const items = [
    {
      label: "Health Score",
      value: health.health_score,
      color: health.health_score > 0.7 ? "#22c55e" : health.health_score > 0.4 ? "#f59e0b" : "#ef4444",
      icon: "💚",
    },
    { label: "Compatibility Avg", value: health.compatibility_avg, color: "#a855f7", icon: "💜" },
    { label: "Dominance Balance", value: health.dominance_balance, color: "#3b82f6", icon: "⚖️" },
    { label: "Investment Balance", value: health.investment_balance, color: "#06b6d4", icon: "🤝" },
    { label: "Ghost Stability", value: health.ghost_stability, color: "#8b5cf6", icon: "👻" },
    { label: "Expressiveness", value: health.expressiveness, color: "#ec4899", icon: "🎭" },
  ]

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">

      <h3 className="text-lg font-semibold text-card-foreground mb-4">Group Health</h3>

      <div className="space-y-3.5">

        {items.map((item) => (
          <div key={item.label} className="space-y-1.5">

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </span>
              <span className="font-semibold text-sm" style={{ color: item.color }}>
                {(item.value * 100).toFixed(0)}%
              </span>
            </div>

            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${item.value * 100}%`, backgroundColor: item.color }}
              />
            </div>

          </div>
        ))}

      </div>

    </Card>
  )
}