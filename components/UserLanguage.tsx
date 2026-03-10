"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function UserLanguage({ linguistics }: any) {
  const participants = linguistics.participants
  const signatures = linguistics.signatures
  const users = Object.keys(participants)
  const [selected, setSelected] = useState(users[0])

  const userData = participants[selected]
  const userSignatures = signatures?.[selected] || []

  return (
    <Card className="p-5 md:p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Language Profiles
      </h3>

      {/* User selector */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {users.map((user) => (
          <button
            key={user}
            onClick={() => setSelected(user)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selected === user
                ? "bg-purple-500/20 border-purple-500 text-purple-400"
                : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            }`}
          >
            {user.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Top Words */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
            💬 Top Words
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {userData.top_words.slice(0, 8).map(([word, count]: any) => (
              <span
                key={word}
                className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
              >
                {word}{" "}
                <span className="text-muted-foreground/60">({count})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Top Emojis */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
            😊 Top Emojis
          </h4>
          <div className="flex flex-wrap gap-2">
            {userData.top_emojis.slice(0, 8).map(([emoji, count]: any) => (
              <span
                key={emoji}
                className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-xs"
              >
                <span className="text-base">{emoji}</span>
                <span className="text-muted-foreground/60">{count}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Stats & Signatures */}
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
              📊 Stats
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-sm font-bold text-cyan-400">
                  {userData.vocabulary_size.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground">Vocab Size</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-sm font-bold text-purple-400">
                  {(userData.unique_word_ratio * 100).toFixed(0)}%
                </p>
                <p className="text-[10px] text-muted-foreground">Unique Ratio</p>
              </div>
            </div>
          </div>

          {/* Signatures */}
          {userSignatures.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
                ✍️ Signature Words
              </h4>
              <div className="flex flex-wrap gap-1">
                {userSignatures.map(([word, score]: any) => (
                  <span
                    key={word}
                    className="px-2 py-0.5 text-[11px] bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 rounded"
                  >
                    &quot;{word}&quot;{" "}
                    <span className="text-yellow-400/60">
                      ({(score * 100).toFixed(0)}%)
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
