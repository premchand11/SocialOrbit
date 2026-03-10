import { Card } from "@/components/ui/card"

export default function CompatibilityTable({ pairs }: any) {

  const topPairs = pairs.slice(0, 10)

  const getDynamicColor = (dynamic: string) => {
    switch (dynamic) {
      case "Balanced Dynamic": return "text-green-400 bg-green-400/10"
      case "Emotional Sync": return "text-cyan-400 bg-cyan-400/10"
      case "Fan & Idol": return "text-yellow-400 bg-yellow-400/10"
      default: return "text-muted-foreground bg-secondary"
    }
  }

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">

      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Strongest Connections
      </h3>

      <div className="space-y-2.5">

        {topPairs.map((p: any, i: number) => (
          <div key={i} className="flex justify-between items-center p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors">

            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xs font-bold text-purple-400 w-5 shrink-0">#{i + 1}</span>
              <div className="min-w-0">
                <span className="text-card-foreground text-sm block truncate">
                  {p.user_a.split(" ")[0]} + {p.user_b.split(" ")[0]}
                </span>
                {p.dynamic && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded mt-0.5 inline-block ${getDynamicColor(p.dynamic)}`}>
                    {p.dynamic}
                  </span>
                )}
              </div>
            </div>

            <span className="text-purple-400 font-bold text-sm shrink-0 ml-2">
              {(p.compatibility * 100).toFixed(0)}%
            </span>

          </div>
        ))}

      </div>

    </Card>
  )
}