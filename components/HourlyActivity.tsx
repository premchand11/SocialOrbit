"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card } from "@/components/ui/card"

export default function HourlyActivity({ hourlyDistribution }: any) {
  const data = Object.entries(hourlyDistribution).map(([hour, count]) => ({
    hour: `${String(hour).padStart(2, "0")}:00`,
    count: count as number,
  }))

  const peakHour = data.reduce((a, b) => (a.count > b.count ? a : b))

  return (
    <Card className="p-5 md:p-6 bg-card border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          Hourly Activity
        </h3>
        <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
          Peak: {peakHour.hour} ({peakHour.count.toLocaleString()} msgs)
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="hour"
            tick={{ fill: "#a1a1aa", fontSize: 10 }}
            tickLine={{ stroke: "#3f3f46" }}
            axisLine={{ stroke: "#3f3f46" }}
            interval={2}
          />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 10 }}
            tickLine={{ stroke: "#3f3f46" }}
            axisLine={{ stroke: "#3f3f46" }}
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
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            fill="#a855f7"
            fillOpacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
