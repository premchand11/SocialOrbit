"use client"

import { useState } from "react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

import { Card } from "@/components/ui/card"

const COLORS = [
  "#a855f7", "#ec4899", "#06b6d4", "#22c55e",
  "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6",
]

export default function PersonalityRadar({ traits }: any) {
  const users = Object.keys(traits)
  const [selected, setSelected] = useState<string[]>(users)

  const traitKeys = ["intensity", "warmth", "control", "stability", "mystery"]
  const traitLabels: Record<string, string> = {
    intensity: "Intensity",
    warmth: "Warmth",
    control: "Control",
    stability: "Stability",
    mystery: "Mystery",
  }

  // Build radar data: each row is a trait with values per selected user
  const data = traitKeys.map((key) => {
    const row: any = { trait: traitLabels[key] }
    selected.forEach((user) => {
      row[user] = traits[user]?.[key] ?? 0
    })
    return row
  })

  const toggleUser = (user: string) => {
    setSelected((prev) =>
      prev.includes(user)
        ? prev.filter((u) => u !== user)
        : [...prev, user]
    )
  }

  return (
    <Card className="p-5 md:p-6 bg-card border-border h-full flex flex-col">

      <h3 className="text-lg font-semibold text-card-foreground mb-3">
        Personality Traits
      </h3>

      {/* User selector chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {users.map((user, i) => {
          const isActive = selected.includes(user)
          const color = COLORS[i % COLORS.length]
          return (
            <button
              key={user}
              onClick={() => toggleUser(user)}
              className="px-2.5 py-1 rounded-md text-xs font-medium transition-all border"
              style={{
                backgroundColor: isActive ? color + "22" : "transparent",
                borderColor: isActive ? color : "#3f3f46",
                color: isActive ? color : "#71717a",
              }}
            >
              {user.split(" ")[0]}
            </button>
          )
        })}
      </div>

      {/* Radar chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#3f3f46" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 1]}
              tick={{ fill: "#52525b", fontSize: 9 }}
              tickCount={5}
              axisLine={false}
            />
            {selected.map((user, i) => {
              const idx = users.indexOf(user)
              const color = COLORS[idx % COLORS.length]
              return (
                <Radar
                  key={user}
                  name={user.split(" ")[0]}
                  dataKey={user}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              )
            })}
            <Legend
              wrapperStyle={{ fontSize: 10, color: "#a1a1aa" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "8px",
                color: "#f5f5f5",
                fontSize: 12,
              }}
              labelStyle={{ color: "#a1a1aa" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

    </Card>
  )
}