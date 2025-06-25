"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ImageIcon, Plus } from "lucide-react"
import { ImageUpload } from "@/components/ui/file-upload"

interface CreatePostModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onPostCreated: (post: {
    id: number
    user: { name: string; username: string; avatar: string }
    content: string
    timestamp: string
    likes: number
    comments: number
    reposts: number
    tips: string
    hashtags: string[]
    image?: string
    isLiked: boolean
    isReposted: boolean
    userComments: Array<{
      id: number
      user: string
      content: string
      timestamp: string
    }>
  }) => void
}

export function CreatePostModal({ isOpen, onOpenChange, onPostCreated }: CreatePostModalProps) {
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImage, setNewPostImage] = useState("")
  const [showImageUpload, setShowImageUpload] = useState(false)

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const newPost = {
      id: Date.now(),
      user: { name: "You", username: "@you", avatar: "/placeholder.svg?height=40&width=40" },
      content: newPostContent.trim(),
      timestamp: "now",
      likes: 0,
      comments: 0,
      reposts: 0,
      tips: "0 ETH",
      hashtags: [],
      image: newPostImage || undefined,
      isLiked: false,
      isReposted: false,
      userComments: [],
    }

    onPostCreated(newPost)
    setNewPostContent("")
    setNewPostImage("")
    setShowImageUpload(false)
    onOpenChange(false) // Close the modal
  }

  const handleImageUpload = (imageUrl: string) => {
    setNewPostImage(imageUrl)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Post
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's happening on NEXUS?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-32 mb-3 resize-none"
            />

            {showImageUpload && (
              <div className="mb-3">
                <ImageUpload onImageUpload={handleImageUpload} currentImage={newPostImage} />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowImageUpload(!showImageUpload)}
                        className={showImageUpload ? "text-primary" : ""}
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add image to post</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex gap-2">
                  <Badge variant="outline">🎮 Gaming</Badge>
                  <Badge variant="outline">🎨 AI Art</Badge>
                  <Badge variant="outline">💎 NFT</Badge>
                </div>
              </div>

              <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}