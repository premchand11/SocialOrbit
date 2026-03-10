import { Card } from "@/components/ui/card"

export default function CharacterMatches({ matches }: any) {

  const users = Object.entries(matches)

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">Multiverse Characters</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        {users.map(([name, data]: any) => (

          <Card key={name} className="p-5 md:p-6 bg-card border-border">

            <h3 className="text-base font-bold text-card-foreground">{name}</h3>

            <p className="text-purple-400 mt-2 font-semibold">
              {data.character}
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              {(data.score * 100).toFixed(1)}% match
            </p>

          </Card>

        ))}

      </div>

    </div>
  )
}