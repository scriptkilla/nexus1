"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Send,
  Plus,
  MoreVertical,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Users,
  MessageCircle,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "crypto"
  cryptoAmount?: string
  cryptoSymbol?: string
}

interface Chat {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isGroup: boolean
  isOnline?: boolean
  members?: string[]
}

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const chats: Chat[] = [
    {
      id: "1",
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the tip! 🚀",
      timestamp: "2m ago",
      unreadCount: 2,
      isGroup: false,
      isOnline: true,
    },
    {
      id: "2",
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Check out my new NFT collection",
      timestamp: "1h ago",
      unreadCount: 0,
      isGroup: false,
      isOnline: true,
    },
    {
      id: "3",
      name: "Gaming Squad",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Tournament starts in 30 minutes!",
      timestamp: "2h ago",
      unreadCount: 5,
      isGroup: true,
      members: ["Alex Chen", "Mike Rodriguez", "Sarah Kim", "You"],
    },
    {
      id: "4",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Great game last night",
      timestamp: "1d ago",
      unreadCount: 0,
      isGroup: false,
      isOnline: false,
    },
    {
      id: "5",
      name: "NFT Collectors",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "New drop alert! 🔥",
      timestamp: "2d ago",
      unreadCount: 12,
      isGroup: true,
      members: ["Sarah Kim", "CryptoArt", "DigitalDreamer", "You"],
    },
  ]

  const messages: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        senderId: "alex",
        senderName: "Alex Chen",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Hey! Saw your latest post about the gaming tournament",
        timestamp: "10:30 AM",
        type: "text",
      },
      {
        id: "2",
        senderId: "you",
        senderName: "You",
        content: "Yeah! Are you planning to participate?",
        timestamp: "10:32 AM",
        type: "text",
      },
      {
        id: "3",
        senderId: "you",
        senderName: "You",
        content: "0.01 ETH",
        timestamp: "10:33 AM",
        type: "crypto",
        cryptoAmount: "0.01",
        cryptoSymbol: "ETH",
      },
      {
        id: "4",
        senderId: "alex",
        senderName: "Alex Chen",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Thanks for the tip! 🚀 Definitely joining the tournament",
        timestamp: "10:35 AM",
        type: "text",
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "sarah",
        senderName: "Sarah Kim",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Check out my new NFT collection",
        timestamp: "9:15 AM",
        type: "text",
      },
      {
        id: "2",
        senderId: "sarah",
        senderName: "Sarah Kim",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Just minted 10 new pieces using NEXUS AI tools",
        timestamp: "9:16 AM",
        type: "text",
      },
    ],
    "3": [
      {
        id: "1",
        senderId: "mike",
        senderName: "Mike Rodriguez",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Tournament starts in 30 minutes!",
        timestamp: "8:30 AM",
        type: "text",
      },
      {
        id: "2",
        senderId: "alex",
        senderName: "Alex Chen",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Ready to dominate! 💪",
        timestamp: "8:32 AM",
        type: "text",
      },
      {
        id: "3",
        senderId: "sarah",
        senderName: "Sarah Kim",
        senderAvatar: "/placeholder.svg?height=32&width=32",
        content: "Count me in!",
        timestamp: "8:33 AM",
        type: "text",
      },
    ],
  }

  const currentChat = chats.find((chat) => chat.id === selectedChat)
  const currentMessages = selectedChat ? messages[selectedChat] || [] : []

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return

    // In a real app, this would send the message to the backend
    console.log("Sending message:", messageInput, "to chat:", selectedChat)
    setMessageInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Messages
                </CardTitle>
                <Button size="sm" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-1 p-3">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === chat.id ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.isGroup && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Users className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {!chat.isGroup && chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold truncate">{chat.name}</p>
                          <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.isGroup && chat.members && (
                          <p className="text-xs text-muted-foreground">{chat.members.length} members</p>
                        )}
                      </div>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground">{chat.unreadCount}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3">
          {selectedChat && currentChat ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={currentChat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                      </Avatar>
                      {!currentChat.isGroup && currentChat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{currentChat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentChat.isGroup
                          ? `${currentChat.members?.length} members`
                          : currentChat.isOnline
                            ? "Online"
                            : "Last seen 2h ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.senderId === "you" ? "justify-end" : "justify-start"}`}
                      >
                        {message.senderId !== "you" && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-xs lg:max-w-md ${message.senderId === "you" ? "order-first" : ""}`}>
                          {message.type === "crypto" ? (
                            <div
                              className={`p-3 rounded-lg ${
                                message.senderId === "you" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">₿</span>
                                </div>
                                <div>
                                  <p className="font-semibold">
                                    {message.cryptoAmount} {message.cryptoSymbol}
                                  </p>
                                  <p className="text-xs opacity-75">Crypto tip sent</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`p-3 rounded-lg ${
                                message.senderId === "you" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                              }`}
                            >
                              <p>{message.content}</p>
                            </div>
                          )}
                          <p
                            className={`text-xs text-muted-foreground mt-1 ${
                              message.senderId === "you" ? "text-right" : "text-left"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                        {message.senderId === "you" && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10"
                    />
                    <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="sm" onClick={sendMessage} disabled={!messageInput.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">Select a conversation</p>
                <p>Choose a chat from the sidebar to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
