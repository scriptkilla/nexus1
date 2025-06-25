"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Heart, MessageCircle, Repeat2, Share, Zap, Send, ImageIcon } from "lucide-react"
import { TipModal } from "@/components/tip-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface Post {
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
}

interface FeedProps {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export function Feed({ posts, setPosts }: FeedProps) {
  // Handle like functionality
  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  // Handle repost functionality
  const handleRepost = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isReposted: !post.isReposted,
              reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            }
          : post,
      ),
    )
  }

  // Handle share functionality
  const handleShare = async (post: Post) => {
    const shareText = `Check out this post by ${post.user.name}: "${post.content}" on NEXUS!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "NEXUS Post",
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
        try {
          await navigator.clipboard.writeText(shareText)
          alert("Post link copied to clipboard!")
        } catch (clipboardError) {
          console.log("Clipboard error:", clipboardError)
          alert("Unable to share or copy. Please try again.")
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText)
        alert("Post link copied to clipboard!")
      } catch (error) {
        console.log("Error copying to clipboard:", error)
        alert("Unable to copy to clipboard. Please try again.")
      }
    }
  }

  // Comments Modal Component
  const CommentsModal = ({ post }: { post: Post }) => {
    const [localComment, setLocalComment] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleLocalComment = () => {
      if (!localComment.trim()) return

      const newComment = {
        id: Date.now(),
        user: "You",
        content: localComment.trim(),
        timestamp: "now",
      }

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                comments: p.comments + 1,
                userComments: [...p.userComments, newComment],
              }
            : p,
        ),
      )

      setLocalComment("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleLocalComment()
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted">
                <MessageCircle className="w-4 h-4" />
                {post.comments}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View and add comments</p>
            </TooltipContent>
          </Tooltip>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Original Post */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.user.username}</p>
                </div>
              </div>
              <p className="text-sm">{post.content}</p>
            </div>

            {/* Comments */}
            <div className="space-y-3">
              {post.userComments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                post.userComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 border rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{comment.user}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="flex gap-2 pt-4 border-t">
              <Input
                placeholder="Write a comment..."
                value={localComment}
                onChange={(e) => setLocalComment(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleLocalComment} disabled={!localComment.trim()} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Post comment</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <TooltipProvider>
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Posts */}
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.user.username} · {post.timestamp}
                    </p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="gap-1 cursor-pointer">
                      <Zap className="w-3 h-3" />
                      {post.tips}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total tips received for this post</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3">{post.content}</p>

              {post.image && (
                <div className="mb-3">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post content"
                    className="rounded-lg w-full max-h-80 object-cover border"
                  />
                </div>
              )}

              <div className="flex gap-2 mb-3">
                {post.hashtags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 hover:bg-muted transition-colors ${post.isLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{post.isLiked ? "Unlike this post" : "Like this post"}</p>
                  </TooltipContent>
                </Tooltip>

                <CommentsModal post={post} />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 hover:bg-muted transition-colors ${post.isReposted ? "text-green-500 hover:text-green-600" : "hover:text-green-500"}`}
                      onClick={() => handleRepost(post.id)}
                    >
                      <Repeat2 className="w-4 h-4" />
                      {post.reposts}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{post.isReposted ? "Undo repost" : "Repost to your followers"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 hover:bg-muted hover:text-blue-500 transition-colors"
                      onClick={() => handleShare(post)}
                    >
                      <Share className="w-4 h-4" />
                      Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this post</p>
                  </TooltipContent>
                </Tooltip>

                <TipModal
                  recipient={{
                    name: post.user.name,
                    username: post.user.username,
                    avatar: post.user.avatar,
                  }}
                  postContent={post.content}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Tip
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send crypto tip to {post.user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TipModal>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}