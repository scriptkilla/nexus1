"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ImageUpload } from "@/components/ui/file-upload"
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

export function Feed() {
  const [newPost, setNewPost] = useState("")
  const [newPostImage, setNewPostImage] = useState("")
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: "Alex Chen", username: "@alexchen", avatar: "/placeholder.svg?height=40&width=40" },
      content: "Just earned 50 $NXG tokens in the new battle royale game! The P2E mechanics are incredible 🎮⚡",
      timestamp: "2h ago",
      likes: 124,
      comments: 23,
      reposts: 12,
      tips: "2.5 ETH",
      hashtags: ["#P2E", "#Gaming", "#NXG"],
      isLiked: false,
      isReposted: false,
      userComments: [
        { id: 1, user: "Sarah Kim", content: "Amazing! Which game is this?", timestamp: "1h ago" },
        { id: 2, user: "Mike Rodriguez", content: "P2E is the future! 🚀", timestamp: "45m ago" },
      ],
    },
    {
      id: 2,
      user: { name: "Sarah Kim", username: "@sarahk", avatar: "/placeholder.svg?height=40&width=40" },
      content: "Created this AI-generated artwork using NEXUS AI tools. Minting as NFT soon! 🎨✨",
      timestamp: "4h ago",
      likes: 89,
      comments: 15,
      reposts: 8,
      tips: "1.2 SOL",
      hashtags: ["#AIArt", "#NFT", "#Creator"],
      image: "/placeholder.svg?height=300&width=500",
      isLiked: true,
      isReposted: false,
      userComments: [{ id: 1, user: "CryptoArt", content: "Stunning work! 🔥", timestamp: "3h ago" }],
    },
    {
      id: 3,
      user: { name: "Mike Rodriguez", username: "@mikerod", avatar: "/placeholder.svg?height=40&width=40" },
      content: "Tournament starts in 1 hour! Prize pool: 1000 $NXG + 5 ETH. Who's ready to compete? 🏆",
      timestamp: "6h ago",
      likes: 256,
      comments: 67,
      reposts: 45,
      tips: "0.8 BTC",
      hashtags: ["#Tournament", "#Gaming", "#Crypto"],
      isLiked: false,
      isReposted: true,
      userComments: [
        { id: 1, user: "GameMaster", content: "Count me in! 💪", timestamp: "5h ago" },
        { id: 2, user: "Alex Chen", content: "Ready to dominate!", timestamp: "4h ago" },
      ],
    },
  ])

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

  // Handle new post creation
  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const newPostObj: Post = {
      id: Date.now(),
      user: { name: "You", username: "@you", avatar: "/placeholder.svg?height=40&width=40" },
      content: newPost.trim(),
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

    setPosts((prev) => [newPostObj, ...prev])
    setNewPost("")
    setNewPostImage("")
    setShowImageUpload(false)
  }

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setNewPostImage(imageUrl)
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
        {/* Create Post */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening on NEXUS?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-20 mb-3 resize-none"
                />

                {/* Image Upload Section */}
                {showImageUpload && (
                  <div className="mb-3">
                    <ImageUpload onImageUpload={handleImageUpload} currentImage={newPostImage} />
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
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

                    <div className="flex gap-2">
                      <Badge variant="outline">🎮 Gaming</Badge>
                      <Badge variant="outline">🎨 AI Art</Badge>
                      <Badge variant="outline">💎 NFT</Badge>
                    </div>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                        Post
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share your post with the community</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
