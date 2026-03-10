import { Card } from "@/components/ui/card"

export default function TopWords({ words }: any) {

  const top = words.slice(0, 15)

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">

      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Most Used Words
      </h3>

      <div className="flex flex-wrap gap-2">

        {top.map(([word, count]: any, i: number) => (

          <span
            key={i}
            className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md whitespace-nowrap"
          >
            {word} <span className="text-muted-foreground">({count})</span>
          </span>

        ))}

      </div>

    </Card>
  )
}