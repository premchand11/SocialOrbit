import { Card } from "@/components/ui/card"

export default function EmojiLeaderboard({ emojis }: any) {

  const top = emojis.slice(0, 10)
  const max = top[0][1]

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">

      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Top Emojis
      </h3>

      <div className="space-y-3">

        {top.map(([emoji, count]: any, i: number) => {

          const percent = (count / max) * 100

          return (

            <div key={i}>

              <div className="flex justify-between text-sm mb-1">

                <span className="text-xl">{emoji}</span>

                <span className="text-muted-foreground">
                  {count}
                </span>

              </div>

              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">

                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />

              </div>

            </div>

          )
        })}

      </div>

    </Card>
  )
}