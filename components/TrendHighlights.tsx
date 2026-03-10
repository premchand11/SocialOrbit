import { Card } from "@/components/ui/card"

export default function TrendHighlights({ trends }: any) {
  const highlights = [
    {
      icon: "📈",
      label: "Peak Day",
      value: trends.peak_day.day,
      detail: `${trends.peak_day.count} messages`,
      color: "text-green-400",
    },
    {
      icon: "📅",
      label: "Peak Week",
      value: trends.peak_week.week,
      detail: `${trends.peak_week.count} messages`,
      color: "text-blue-400",
    },
    {
      icon: "🕐",
      label: "Peak Hour",
      value: `${String(trends.peak_hour.hour).padStart(2, "0")}:00`,
      detail: `${trends.peak_hour.count.toLocaleString()} messages`,
      color: "text-purple-400",
    },
    {
      icon: "📊",
      label: "Daily Average",
      value: trends.average_daily_activity.toFixed(1),
      detail: "messages per day",
      color: "text-cyan-400",
    },
    {
      icon: "🌙",
      label: "Night Owls",
      value: `${(trends.night_activity_ratio * 100).toFixed(0)}%`,
      detail: "activity after midnight",
      color: "text-indigo-400",
    },
    {
      icon: "🎯",
      label: "Most Consistent",
      value: trends.most_consistent_member?.name?.split(" ")[0] || "—",
      detail: `Score: ${trends.most_consistent_member?.consistency_score?.toFixed(1) || "—"}`,
      color: "text-yellow-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {highlights.map((h) => (
        <Card key={h.label} className="p-4 bg-card border-border text-center space-y-1">
          <p className="text-xl">{h.icon}</p>
          <p className="text-[11px] text-muted-foreground">{h.label}</p>
          <p className={`text-sm font-bold ${h.color}`}>{h.value}</p>
          <p className="text-[10px] text-muted-foreground/60">{h.detail}</p>
        </Card>
      ))}
    </div>
  )
}
