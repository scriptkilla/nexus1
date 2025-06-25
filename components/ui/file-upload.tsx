"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Upload, X, ImageIcon, Video, Music, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import {
  uploadToBlob,
  validateImageFile,
  validateVideoFile,
  validateAudioFile,
  type UploadResult,
} from "@/lib/blob-upload"

interface FileUploadProps {
  onUploadComplete: (result: UploadResult) => void
  onUploadError?: (error: string) => void
  acceptedTypes?: string[]
  maxSize?: number
  className?: string
  children?: React.ReactNode
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  acceptedTypes = ["image/*", "video/*", "audio/*"],
  maxSize = 100 * 1024 * 1024, // 100MB
  className = "",
  children,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="w-4 h-4" />
    if (type.startsWith("video/")) return <Video className="w-4 h-4" />
    if (type.startsWith("audio/")) return <Music className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`
    }

    if (file.type.startsWith("image/")) {
      return validateImageFile(file)
    } else if (file.type.startsWith("video/")) {
      return validateVideoFile(file)
    } else if (file.type.startsWith("audio/")) {
      return validateAudioFile(file)
    }

    return null
  }

  const handleFileSelect = async (file: File) => {
    setError(null)
    setSuccess(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      onUploadError?.(validationError)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const result = await uploadToBlob(file)

      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        setSuccess(`${file.name} uploaded successfully!`)
        onUploadComplete(result)
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = error instanceof Error ? error.message : "Upload failed"
      setError(errorMessage)
      onUploadError?.(errorMessage)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInput}
        className="hidden"
      />

      {children ? (
        <div onClick={openFileDialog} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={openFileDialog}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold mb-2">Upload File</p>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
          <Button variant="outline" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Choose File"}
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({ onImageUpload, currentImage, className = "" }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)

  const handleUploadComplete = (result: UploadResult) => {
    setPreviewUrl(result.url)
    onImageUpload(result.url)
  }

  const removeImage = () => {
    setPreviewUrl(null)
    onImageUpload("")
  }

  return (
    <TooltipProvider>
      <div className={`space-y-4 ${className}`}>
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeImage}>
                  <X className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove image</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <FileUpload
            onUploadComplete={handleUploadComplete}
            acceptedTypes={["image/*"]}
            maxSize={10 * 1024 * 1024} // 10MB for images
          >
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Upload Image</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          </FileUpload>
        )}
      </div>
    </TooltipProvider>
  )
}
