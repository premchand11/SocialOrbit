import { Card } from "@/components/ui/card"

export default function Overview({ metrics }: any) {

  const avgPerDay = metrics.time_span_days > 0
    ? Math.round(metrics.total_messages / metrics.time_span_days)
    : 0

  const stats = [
    { label: "Total Messages", value: metrics.total_messages.toLocaleString(), icon: "💬", color: "text-purple-400" },
    { label: "Time Span", value: `${metrics.time_span_days} days`, icon: "📅", color: "text-blue-400" },
    { label: "Avg / Day", value: avgPerDay.toLocaleString(), icon: "📊", color: "text-cyan-400" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">

      {stats.map((stat) => (
        <Card key={stat.label} className="p-5 md:p-6 bg-card border-border">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
              <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}

    </div>
  )
}