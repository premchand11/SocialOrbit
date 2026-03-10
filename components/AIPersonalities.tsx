"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"

const GRADIENT_CLASSES = [
  "from-purple-500/10 to-transparent border-purple-500/20",
  "from-pink-500/10 to-transparent border-pink-500/20",
  "from-cyan-500/10 to-transparent border-cyan-500/20",
  "from-green-500/10 to-transparent border-green-500/20",
  "from-yellow-500/10 to-transparent border-yellow-500/20",
  "from-blue-500/10 to-transparent border-blue-500/20",
  "from-red-500/10 to-transparent border-red-500/20",
  "from-indigo-500/10 to-transparent border-indigo-500/20",
]

export default function AIPersonalities({ users }: any) {

  const entries = Object.entries(users)
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        AI Personality Insights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {entries.map(([name, text]: any, i) => (

          <Card
            key={name}
            className={`p-5 md:p-6 bg-gradient-to-b border cursor-pointer transition-all hover:scale-[1.01] ${
              open === name
                ? GRADIENT_CLASSES[i % GRADIENT_CLASSES.length]
                : "bg-card border-border hover:bg-accent"
            }`}
            onClick={() => setOpen(open === name ? null : name)}
          >

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-card-foreground">
                {name}
              </h3>
              <span className="text-xs text-muted-foreground">
                {open === name ? "▲" : "▼"}
              </span>
            </div>

            <AnimatePresence>
              {open === name ? (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm overflow-hidden"
                >
                  {text}
                </motion.p>
              ) : (
                <p className="text-muted-foreground/50 text-sm">
                  Tap to reveal personality insight →
                </p>
              )}
            </AnimatePresence>

          </Card>

        ))}

      </div>

    </div>
  )
}