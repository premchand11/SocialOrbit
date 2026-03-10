"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Props {
  universe: string
  onUpload: (file: File) => Promise<void>
}

export default function UploadDropzone({ universe, onUpload }: Props) {

  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    await onUpload(file)
  }

  return (
    <Card className="p-6 md:p-8 bg-card border-border text-center w-full max-w-md">

      <h1 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
        Upload WhatsApp Chat
      </h1>

      <p className="text-muted-foreground mb-6 text-sm">
        Universe: <span className="text-purple-400 font-medium">{universe}</span>
      </p>

      <div
        className={`border-2 border-dashed rounded-xl p-8 md:p-10 transition-all
        ${dragging ? "border-purple-500 bg-accent" : "border-border hover:border-muted-foreground"}
        `}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >

        <Upload className="mx-auto mb-4 text-muted-foreground" size={36} />

        {file ? (
          <p className="text-green-400 font-medium">
            {file.name}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Drag & drop your chat file here
          </p>
        )}

        <input
          type="file"
          accept=".txt"
          className="hidden"
          id="fileUpload"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <label
          htmlFor="fileUpload"
          className="block mt-4 text-purple-400 cursor-pointer hover:text-purple-300 transition text-sm"
        >
          or choose file
        </label>

      </div>

      <Button
        className="mt-6 w-full bg-purple-600 hover:bg-purple-500 transition-all"
        disabled={!file || loading}
        onClick={handleUpload}
      >
        {loading ? "Analyzing..." : "Start Multiverse Scan"}
      </Button>

    </Card>
  )
}