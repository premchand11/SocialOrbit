"use client"

import { useState, useRef } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Props {
  universe: string
  onUpload: (file: File) => Promise<void>
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadDropzone({ universe, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    await onUpload(file)
  }

  return (
    <Card className="p-6 md:p-8 bg-card border-border w-full max-w-md relative overflow-hidden">

      {/* Subtle glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-card-foreground">
            Upload WhatsApp Chat
          </h1>
          <p className="text-muted-foreground text-sm">
            Universe:{" "}
            <span className="text-purple-400 font-medium capitalize">{universe}</span>
          </p>
        </div>

        {/* Drop zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 md:p-10 transition-all cursor-pointer
            ${dragging
              ? "border-purple-500 bg-purple-500/5 scale-[1.02]"
              : file
              ? "border-green-500/40 bg-green-500/5"
              : "border-border hover:border-muted-foreground hover:bg-accent/30"
            }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !file && inputRef.current?.click()}
        >
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <FileText className="text-green-400" size={24} />
              </div>
              <div className="text-center">
                <p className="text-green-400 font-medium text-sm truncate max-w-[250px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null) }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition mt-1"
              >
                <X size={12} />
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                dragging ? "bg-purple-500/20 scale-110" : "bg-secondary"
              }`}>
                <Upload className={`transition-colors ${dragging ? "text-purple-400" : "text-muted-foreground"}`} size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm text-card-foreground font-medium">
                  Drop your chat file here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  or click to browse · .txt files only
                </p>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* How to export hint */}
        <div className="bg-secondary/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-card-foreground text-[11px]">💡 How to export:</p>
          <p>Open group → ⋮ More → Export chat → Without media</p>
        </div>

        {/* Upload button */}
        <Button
          className="w-full bg-purple-600 hover:bg-purple-500 transition-all disabled:opacity-40 h-11 text-sm font-medium shadow-lg shadow-purple-600/20"
          disabled={!file}
          onClick={handleUpload}
        >
          Start Multiverse Scan →
        </Button>

      </div>
    </Card>
  )
}