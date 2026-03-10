"use client"

import { useEffect, useState } from "react"

export default function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")

  useEffect(() => {
    const check = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
        const res = await fetch(`${base}/analysis/universes`, {
          method: "GET",
          signal: AbortSignal.timeout(3000),
        })
        setStatus(res.ok ? "online" : "offline")
      } catch {
        setStatus("offline")
      }
    }

    check()
    const interval = setInterval(check, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="relative flex h-2.5 w-2.5">
        {status === "online" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            status === "checking"
              ? "bg-yellow-400"
              : status === "online"
              ? "bg-green-400"
              : "bg-red-400"
          }`}
        />
      </span>
      <span className="text-muted-foreground">
        {status === "checking"
          ? "Checking..."
          : status === "online"
          ? "Backend Online"
          : "Backend Offline"}
      </span>
    </div>
  )
}
