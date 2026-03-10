import { Card } from "@/components/ui/card"

export default function RiskPanel({ risk }: any) {

  const items = [
    {
      label: "Most Ghost Prone",
      value: risk.most_ghost_prone_member.name,
      detail: `Score: ${(risk.most_ghost_prone_member.ghost_score * 100).toFixed(0)}%`,
      icon: "👻",
      color: "text-orange-400",
      bg: "bg-orange-400/10 border-orange-400/20",
    },
    {
      label: "Lowest Investment",
      value: risk.lowest_investment_member.name,
      detail: `Score: ${(risk.lowest_investment_member.investment * 100).toFixed(0)}%`,
      icon: "📉",
      color: "text-red-400",
      bg: "bg-red-400/10 border-red-400/20",
    },
    {
      label: "Most Dominant",
      value: risk.highest_dominance_member.name,
      detail: `Score: ${(risk.highest_dominance_member.dominance * 100).toFixed(0)}%`,
      icon: "👑",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/20",
    },
    {
      label: "Most Dry Texter",
      value: risk.most_dry_member.name,
      detail: `Score: ${(risk.most_dry_member.dry_text_score * 100).toFixed(0)}%`,
      icon: "🌵",
      color: "text-amber-400",
      bg: "bg-amber-400/10 border-amber-400/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">

      {items.map((item) => (
        <Card key={item.label} className={`p-4 md:p-5 border ${item.bg}`}>

          <p className="text-2xl mb-2">{item.icon}</p>
          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
          <p className={`text-base font-semibold ${item.color}`}>
            {item.value.split(" ")[0]}
          </p>
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">{item.detail}</p>

        </Card>
      ))}

      {/* One-sided pair highlight */}
      {risk.most_one_sided_pair && (
        <Card className="col-span-2 lg:col-span-4 p-4 md:p-5 bg-card border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  Most One-Sided Relationship
                </p>
                <p className="text-xs text-muted-foreground">
                  {risk.most_one_sided_pair.user_a.split(" ")[0]} → {risk.most_one_sided_pair.user_b.split(" ")[0]}
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-muted-foreground">
                Dynamic: <span className="text-yellow-400">{risk.most_one_sided_pair.dynamic}</span>
              </span>
              <span className="text-muted-foreground">
                Gap: <span className="text-red-400">{(risk.most_one_sided_pair.investment_diff * 100).toFixed(0)}%</span>
              </span>
            </div>
          </div>
        </Card>
      )}

    </div>
  )
}