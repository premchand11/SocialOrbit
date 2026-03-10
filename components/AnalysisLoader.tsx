"use client"

import { useEffect, useState, useRef } from "react"

const ANALYSIS_STEPS = [
  { label: "Reading chat file...", icon: "📄", duration: 1200 },
  { label: "Counting messages...", icon: "💬", duration: 1500 },
  { label: "Identifying participants...", icon: "👥", duration: 1800 },
  { label: "Analyzing message patterns...", icon: "📊", duration: 2200 },
  { label: "Computing personality traits...", icon: "🧠", duration: 2500 },
  { label: "Mapping behavior scores...", icon: "🎯", duration: 2000 },
  { label: "Building interaction network...", icon: "🌐", duration: 1800 },
  { label: "Calculating pair compatibility...", icon: "🔗", duration: 2200 },
  { label: "Scanning linguistic fingerprints...", icon: "✍️", duration: 1600 },
  { label: "Matching universe characters...", icon: "🎭", duration: 2000 },
  { label: "Generating AI insights...", icon: "⚡", duration: 3000 },
  { label: "Finalizing your multiverse report...", icon: "🌌", duration: 2000 },
]

function randomCount(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function AnalysisLoader() {
  const [currentStep, setCurrentStep] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [participantCount, setParticipantCount] = useState(0)
  const [wordsScanned, setWordsScanned] = useState(0)
  const [pairsAnalyzed, setPairsAnalyzed] = useState(0)
  const [dots, setDots] = useState("")
  const intervalRefs = useRef<NodeJS.Timeout[]>([])

  // Animated step progression
  useEffect(() => {
    let stepIndex = 0
    const advance = () => {
      if (stepIndex < ANALYSIS_STEPS.length - 1) {
        stepIndex++
        setCurrentStep(stepIndex)
        const nextDuration = ANALYSIS_STEPS[stepIndex].duration + randomCount(-300, 500)
        setTimeout(advance, Math.max(800, nextDuration))
      }
    }
    const timeout = setTimeout(advance, ANALYSIS_STEPS[0].duration)
    return () => clearTimeout(timeout)
  }, [])

  // Animated counters
  useEffect(() => {
    // Message counter: goes up fast
    const msgInterval = setInterval(() => {
      setMessageCount((c) => {
        const increment = randomCount(47, 203)
        const next = c + increment
        return next > 16552 ? 16552 : next
      })
    }, 80)
    intervalRefs.current.push(msgInterval)

    // Participant counter
    const partTimeout = setTimeout(() => {
      const partInterval = setInterval(() => {
        setParticipantCount((c) => (c < 8 ? c + 1 : 8))
      }, 400)
      intervalRefs.current.push(partInterval)
    }, 2500)

    // Words scanned
    const wordInterval = setInterval(() => {
      setWordsScanned((c) => {
        const next = c + randomCount(120, 380)
        return next > 45000 ? 45000 : next
      })
    }, 100)
    intervalRefs.current.push(wordInterval)

    // Pairs analyzed
    const pairTimeout = setTimeout(() => {
      const pairInterval = setInterval(() => {
        setPairsAnalyzed((c) => (c < 28 ? c + 1 : 28))
      }, 300)
      intervalRefs.current.push(pairInterval)
    }, 8000)

    return () => {
      intervalRefs.current.forEach(clearInterval)
      clearTimeout(partTimeout)
      clearTimeout(pairTimeout)
    }
  }, [])

  // Dots animation
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."))
    }, 500)
    return () => clearInterval(dotInterval)
  }, [])

  const step = ANALYSIS_STEPS[currentStep]
  const progress = ((currentStep + 1) / ANALYSIS_STEPS.length) * 100

  return (
    <div className="w-full max-w-lg mx-auto space-y-8 text-center">

      {/* Spinning orb */}
      <div className="relative mx-auto w-28 h-28">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-spin [animation-duration:8s]" />
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent animate-spin [animation-duration:3s]" />
        {/* Inner ring counter-spin */}
        <div className="absolute inset-4 rounded-full border-2 border-t-transparent border-r-cyan-500 border-b-transparent border-l-purple-400 animate-spin [animation-direction:reverse] [animation-duration:2s]" />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">
          {step.icon}
        </div>
      </div>

      {/* Current step */}
      <div className="space-y-3">
        <p className="text-lg font-semibold text-foreground">
          {step.label}
        </p>
        <p className="text-sm text-muted-foreground">
          Hang tight, this takes about 30 seconds{dots}
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {ANALYSIS_STEPS.length}
        </p>
      </div>

      {/* Live counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <CounterBox
          label="Messages"
          value={messageCount.toLocaleString()}
          color="text-purple-400"
        />
        <CounterBox
          label="Members"
          value={participantCount.toString()}
          color="text-cyan-400"
        />
        <CounterBox
          label="Words"
          value={wordsScanned.toLocaleString()}
          color="text-pink-400"
        />
        <CounterBox
          label="Pairs"
          value={pairsAnalyzed.toString()}
          color="text-green-400"
        />
      </div>

      {/* Step log */}
      <div className="bg-card/50 border border-border/50 rounded-xl p-4 max-h-36 overflow-y-auto text-left">
        {ANALYSIS_STEPS.slice(0, currentStep + 1).map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-xs py-1">
            <span className={i < currentStep ? "text-green-400" : "text-yellow-400 animate-pulse"}>
              {i < currentStep ? "✓" : "●"}
            </span>
            <span className={i < currentStep ? "text-muted-foreground" : "text-foreground"}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}

function CounterBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-card/50 border border-border/50 rounded-lg p-3 space-y-1">
      <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}
