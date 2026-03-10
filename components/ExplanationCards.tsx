"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function ExplanationCards({ explanations }: any) {
  const entries = Object.entries(explanations) as [string, string][]

  return (
    <Card className="p-5 md:p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-5">
        Character Explanations
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([name, text], i) => {
          // Split the text into title line + description lines
          const lines = text.split("\n").filter((l) => l.trim())
          const title = lines[0] || name
          const body = lines.slice(1).join("\n")

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 bg-secondary/50 rounded-xl border border-border/50 space-y-2"
            >
              <p className="text-sm font-semibold text-purple-400">{title}</p>
              {body && (
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {body}
                </p>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
