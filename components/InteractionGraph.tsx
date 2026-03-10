"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
)

export default function InteractionGraph({ pairs }: any) {

  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 800, height: 450 })

  useEffect(() => {
    setMounted(true)

    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        setSize({
          width: w,
          height: Math.min(500, Math.max(350, w * 0.5))
        })
      }
    }

    // Wait for DOM mount
    setTimeout(update, 100)
    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)
  }, [])

  const nodesSet = new Set<string>()

  pairs.forEach((p: any) => {
    nodesSet.add(p.user_a)
    nodesSet.add(p.user_b)
  })

  const nodes = Array.from(nodesSet).map((name) => ({
    id: name
  }))

  const links = pairs.map((p: any) => ({
    source: p.user_a,
    target: p.user_b,
    value: p.interaction_strength
  }))

  const graphData = { nodes, links }

  return (
    <Card className="p-5 md:p-6 bg-card border-border w-full overflow-hidden" ref={containerRef}>

      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Interaction Network
      </h3>

      {mounted && (
        <ForceGraph2D
          width={size.width - 48}
          height={size.height}
          graphData={graphData}
          nodeRelSize={6}
          linkWidth={(link: any) => link.value * 6}
          linkColor={() => "#a855f7"}
          cooldownTicks={100}
          backgroundColor="transparent"
          nodeCanvasObject={(node: any, ctx, globalScale) => {

            const label = node.id
            const fontSize = 14 / globalScale

            ctx.font = `${fontSize}px Sans-Serif`
            ctx.fillStyle = "#f5f5f5"
            ctx.fillText(label, node.x + 8, node.y + 4)

          }}
        />
      )}

    </Card>
  )
}