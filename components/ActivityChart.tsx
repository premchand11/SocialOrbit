"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Card } from "@/components/ui/card"

export default function ActivityChart({ dailyCounts }: any) {

  const data = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count
  }))

  return (
    <Card className="p-5 md:p-6 bg-card border-border">

      <h3 className="text-lg font-semibold text-card-foreground mb-4">Chat Activity Over Time</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            tickLine={{ stroke: "#3f3f46" }}
            axisLine={{ stroke: "#3f3f46" }}
            interval="preserveStartEnd"
            minTickGap={60}
          />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            tickLine={{ stroke: "#3f3f46" }}
            axisLine={{ stroke: "#3f3f46" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "8px",
              color: "#f5f5f5"
            }}
            labelStyle={{ color: "#a1a1aa" }}
          />
          <Line type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

    </Card>
  )
}