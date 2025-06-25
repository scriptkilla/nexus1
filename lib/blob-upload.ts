import { put } from "@vercel/blob"

export interface UploadResult {
  url: string
  pathname: string
  contentType: string
  contentDisposition: string
}

export async function uploadToBlob(file: File, pathname?: string): Promise<UploadResult> {
  try {
    const filename = pathname || `${Date.now()}-${file.name}`

    const blob = await put(filename, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: file.type,
      contentDisposition: `inline; filename="${file.name}"`,
    }
  } catch (error) {
    console.error("Upload failed:", error)
    throw new Error("Failed to upload file")
  }
}

export function validateImageFile(file: File): string | null {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]

  if (!allowedTypes.includes(file.type)) {
    return "Please upload a valid image file (JPEG, PNG, GIF, or WebP)"
  }

  if (file.size > maxSize) {
    return "Image size must be less than 10MB"
  }

  return null
}

export function validateVideoFile(file: File): string | null {
  const maxSize = 100 * 1024 * 1024 // 100MB
  const allowedTypes = ["video/mp4", "video/webm", "video/mov", "video/avi"]

  if (!allowedTypes.includes(file.type)) {
    return "Please upload a valid video file (MP4, WebM, MOV, or AVI)"
  }

  if (file.size > maxSize) {
    return "Video size must be less than 100MB"
  }

  return null
}

export function validateAudioFile(file: File): string | null {
  const maxSize = 50 * 1024 * 1024 // 50MB
  const allowedTypes = ["audio/mp3", "audio/wav", "audio/ogg", "audio/m4a"]

  if (!allowedTypes.includes(file.type)) {
    return "Please upload a valid audio file (MP3, WAV, OGG, or M4A)"
  }

  if (file.size > maxSize) {
    return "Audio size must be less than 50MB"
  }

  return null
}
