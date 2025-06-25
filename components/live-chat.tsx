"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  MessageCircle,
  Send,
  Users,
  Settings,
  Smile,
  Gift,
  Crown,
  Zap,
  Hash,
  Volume2,
  VolumeX,
  UserPlus,
  MoreVertical,
} from "lucide-react"

interface ChatMessage {
  id: string
  user: {
    name: string
    username: string
    avatar?: string
    role: "admin" | "moderator" | "vip" | "user"
    level: number
  }
  content: string
  timestamp: string
  type: "message" | "tip" | "system" | "emoji"
  tipAmount?: string
  reactions?: { emoji: string; count: number; users: string[] }[]
}

interface ChatRoom {
  id: string
  name: string
  description: string
  memberCount: number
  category: "general" | "gaming" | "nft" | "trading" | "ai"
  isLive: boolean
}

export function LiveChat() {
  const [activeRoom, setActiveRoom] = useState("general")
  const [message, setMessage] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatRooms: ChatRoom[] = [
    {
      id: "general",
      name: "General Chat",
      description: "Main community discussion",
      memberCount: 1247,
      category: "general",
      isLive: true,
    },
    {
      id: "gaming",
      name: "Gaming Hub",
      description: "Discuss games and tournaments",
      memberCount: 892,
      category: "gaming",
      isLive: true,
    },
    {
      id: "nft",
      name: "NFT Marketplace",
      description: "NFT trading and showcases",
      memberCount: 634,
      category: "nft",
      isLive: true,
    },
    {
      id: "trading",
      name: "Crypto Trading",
      description: "Market analysis and trading tips",
      memberCount: 1156,
      category: "trading",
      isLive: true,
    },
    {
      id: "ai",
      name: "AI Creators",
      description: "AI tools and generated content",
      memberCount: 423,
      category: "ai",
      isLive: true,
    },
  ]

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    general: [
      {
        id: "1",
        user: {
          name: "CryptoKing",
          username: "@cryptoking",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "vip",
          level: 45,
        },
        content: "GM everyone! Ready for another day of gains? 🚀",
        timestamp: "10:30 AM",
        type: "message",
        reactions: [{ emoji: "🚀", count: 12, users: ["user1", "user2"] }],
      },
      {
        id: "2",
        user: {
          name: "NFTQueen",
          username: "@nftqueen",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "moderator",
          level: 38,
        },
        content: "Just dropped my new collection! Check it out in the NFT marketplace 🎨",
        timestamp: "10:32 AM",
        type: "message",
      },
      {
        id: "3",
        user: {
          name: "GameMaster",
          username: "@gamemaster",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "user",
          level: 22,
        },
        content: "0.05 ETH",
        timestamp: "10:33 AM",
        type: "tip",
        tipAmount: "0.05 ETH",
      },
      {
        id: "4",
        user: {
          name: "NEXUS Bot",
          username: "@nexusbot",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "admin",
          level: 100,
        },
        content: "🎉 Tournament starting in 30 minutes! Join now to compete for 1000 NXG tokens!",
        timestamp: "10:35 AM",
        type: "system",
      },
      {
        id: "5",
        user: {
          name: "TommyCrypto",
          username: "@tommycrypto",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "user",
          level: 28,
        },
        content: "Love this community! The energy here is amazing 💜",
        timestamp: "10:36 AM",
        type: "message",
        reactions: [
          { emoji: "💜", count: 8, users: ["user1", "user2"] },
          { emoji: "🔥", count: 5, users: ["user3", "user4"] },
        ],
      },
    ],
    gaming: [
      {
        id: "g1",
        user: {
          name: "ProGamer",
          username: "@progamer",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "vip",
          level: 52,
        },
        content: "Who's ready for the battle royale tournament? 🎮",
        timestamp: "10:25 AM",
        type: "message",
      },
    ],
    nft: [
      {
        id: "n1",
        user: {
          name: "ArtistPro",
          username: "@artistpro",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "user",
          level: 31,
        },
        content: "New AI-generated collection dropping tomorrow! 🎨",
        timestamp: "10:20 AM",
        type: "message",
      },
    ],
    trading: [
      {
        id: "t1",
        user: {
          name: "TraderJoe",
          username: "@traderjoe",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "vip",
          level: 67,
        },
        content: "BTC looking bullish! Target $70k 📈",
        timestamp: "10:15 AM",
        type: "message",
      },
    ],
    ai: [
      {
        id: "a1",
        user: {
          name: "AICreator",
          username: "@aicreator",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "user",
          level: 29,
        },
        content: "Just created an amazing artwork with NEXUS AI tools! ✨",
        timestamp: "10:10 AM",
        type: "message",
      },
    ],
  })

  const activeRoomData = chatRooms.find((room) => room.id === activeRoom)
  const roomMessages = messages[activeRoom] || []

  const onlineUsers = [
    { name: "CryptoKing", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "NFTQueen", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "GameMaster", avatar: "/placeholder.svg?height=24&width=24", status: "away" },
    { name: "TommyCrypto", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "TraderJoe", avatar: "/placeholder.svg?height=24&width=24", status: "online" },
    { name: "ArtistPro", avatar: "/placeholder.svg?height=24&width=24", status: "busy" },
  ]

  const emojis = ["😀", "😂", "❤️", "🚀", "🔥", "💎", "🎮", "🎨", "💰", "⚡", "🌟", "👑"]

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: "TommyCrypto",
        username: "@tommycrypto",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "user",
        level: 28,
      },
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "message",
    }

    setMessages((prev) => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMessage],
    }))

    setMessage("")
    setShowEmojiPicker(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3 h-3 text-yellow-500" />
      case "moderator":
        return <Crown className="w-3 h-3 text-blue-500" />
      case "vip":
        return <Crown className="w-3 h-3 text-purple-500" />
      default:
        return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-yellow-600"
      case "moderator":
        return "text-blue-600"
      case "vip":
        return "text-purple-600"
      default:
        return "text-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <Hash className="w-4 h-4" />
      case "gaming":
        return <Users className="w-4 h-4" />
      case "nft":
        return <Crown className="w-4 h-4" />
      case "trading":
        return <Zap className="w-4 h-4" />
      case "ai":
        return <Settings className="w-4 h-4" />
      default:
        return <Hash className="w-4 h-4" />
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [roomMessages])

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Chat Rooms Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Live Chat Rooms
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-2 p-3">
                    {chatRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          activeRoom === room.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveRoom(room.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(room.category)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{room.name}</p>
                              {room.isLive && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-700 border-green-200"
                                >
                                  Live
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{room.description}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{room.memberCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {activeRoomData && getCategoryIcon(activeRoomData.category)}
                    <div>
                      <h3 className="font-semibold">{activeRoomData?.name}</h3>
                      <p className="text-sm text-muted-foreground">{activeRoomData?.memberCount} members online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          className={isMuted ? "text-red-500" : ""}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isMuted ? "Unmute notifications" : "Mute notifications"}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                  <div className="space-y-4">
                    {roomMessages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-semibold text-sm ${getRoleColor(msg.user.role)}`}>
                              {msg.user.name}
                            </span>
                            {getRoleIcon(msg.user.role)}
                            <Badge variant="outline" className="text-xs">
                              Lv.{msg.user.level}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                          </div>

                          {msg.type === "tip" ? (
                            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <Zap className="w-4 h-4 text-yellow-600" />
                              <span className="font-semibold text-yellow-800">Sent {msg.tipAmount} tip</span>
                            </div>
                          ) : msg.type === "system" ? (
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                              {msg.content}
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm">{msg.content}</p>
                              {msg.reactions && msg.reactions.length > 0 && (
                                <div className="flex gap-1 mt-2">
                                  {msg.reactions.map((reaction, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="h-6 px-2 text-xs hover:bg-muted"
                                    >
                                      {reaction.emoji} {reaction.count}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder={`Message ${activeRoomData?.name}...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          >
                            <Smile className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add emoji</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Gift className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send tip</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={sendMessage} disabled={!message.trim()} size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send message</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-16 right-4 bg-background border rounded-lg p-3 shadow-lg z-10">
                    <div className="grid grid-cols-6 gap-2">
                      {emojis.map((emoji) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-muted"
                          onClick={() => addEmoji(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Online Users Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Online ({onlineUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="space-y-2 p-3">
                    {onlineUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                              user.status === "online"
                                ? "bg-green-500"
                                : user.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <UserPlus className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add friend</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
