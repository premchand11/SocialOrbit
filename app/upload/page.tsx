"use client"

import { Suspense, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import UploadDropzone from "@/components/UploadDropzone"
import AnalysisLoader from "@/components/AnalysisLoader"

function UploadContent() {
  const params = useSearchParams()
  const universe = params.get("universe")
  const router = useRouter()

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(async (file: File) => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
      const res = await fetch(
        `${base}/analysis/upload?universe=${universe}`,
        { method: "POST", body: formData }
      )

      if (!res.ok) throw new Error("Analysis failed. Please try again.")

      const data = await res.json()
      localStorage.setItem("analysis", JSON.stringify(data))
      router.push(`/results/${data.id}`)
    } catch (err: any) {
      setIsAnalyzing(false)
      setError(err.message || "Something went wrong")
    }
  }, [universe, router])

  if (isAnalyzing) {
    return <AnalysisLoader />
  }

  return (
    <div className="space-y-4">
      <UploadDropzone universe={universe || ""} onUpload={uploadFile} />
      {error && (
        <div className="text-center">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-purple-400 text-xs mt-2 hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}

export default function UploadPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <Suspense
        fallback={
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        }
      >
        <UploadContent />
      </Suspense>
    </main>
  )
}