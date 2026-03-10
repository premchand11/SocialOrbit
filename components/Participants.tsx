import { Card } from "@/components/ui/card"

export default function Participants({ participants }: any) {

  return (
    <Card className="p-5 md:p-6 bg-card border-border">

      <div className="flex flex-wrap gap-2">

        {participants.map((p: string) => (
          <span
            key={p}
            className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium"
          >
            {p}
          </span>
        ))}

      </div>

    </Card>
  )
}