"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const MATCH_COLORS = [
  "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  "from-pink-500/20 to-pink-600/5 border-pink-500/30",
  "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30",
  "from-green-500/20 to-green-600/5 border-green-500/30",
  "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30",
  "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  "from-red-500/20 to-red-600/5 border-red-500/30",
  "from-indigo-500/20 to-indigo-600/5 border-indigo-500/30",
]

export default function CharacterReveal({ matches }: any) {

  const users = Object.entries(matches)

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full">

      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Character Matches
      </h3>

      <div className="grid grid-cols-2 gap-3">

        {users.map(([name, data]: any, i) => (

          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          >

            <div className={`p-3.5 bg-gradient-to-b border rounded-xl text-center space-y-1 ${MATCH_COLORS[i % MATCH_COLORS.length]}`}>

              <p className="text-xs text-muted-foreground truncate">
                {name.split(" ")[0]}
              </p>

              <p className="text-lg text-purple-400 font-bold">
                {data.character}
              </p>

              <p className="text-[11px] text-muted-foreground">
                {(data.score * 100).toFixed(0)}% match
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </Card>
  )
}