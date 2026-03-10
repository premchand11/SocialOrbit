import { Card } from "@/components/ui/card"

export default function AIInsights({ insights }: any) {

  return (
    <Card className="p-5 md:p-8 bg-gradient-to-b from-purple-500/5 to-card border-purple-500/20">

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3 className="text-lg font-semibold text-card-foreground">
          AI Group Summary
        </h3>
      </div>

      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {insights.group_summary}
      </p>

      {insights.status && (
        <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              insights.status === "complete" ? "bg-green-400" : "bg-yellow-400"
            }`}
          />
          <span className="text-xs text-muted-foreground capitalize">
            AI Analysis: {insights.status}
          </span>
        </div>
      )}

    </Card>
  )
}