"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import UploadDropzone from "@/components/UploadDropzone"

function UploadContent() {
  const params = useSearchParams()
  const universe = params.get("universe")
  const router = useRouter()

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
    const res = await fetch(
      `${base}/analysis/upload?universe=${universe}`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await res.json()

    localStorage.setItem("analysis", JSON.stringify(data))

    router.push(`/results/${data.id}`)
  }

  return <UploadDropzone universe={universe || ""} onUpload={uploadFile} />
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