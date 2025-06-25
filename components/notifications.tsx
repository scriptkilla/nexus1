"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Heart, MessageCircle, Repeat2, Zap, Trophy, Users, ImageIcon, Settings, Check, X } from "lucide-react"

interface Notification {
  id: string
  type: "like" | "comment" | "repost" | "tip" | "follow" | "gaming" | "nft" | "system"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  avatar?: string
  actionUser?: string
  amount?: string
  postContent?: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "tip",
      title: "New Tip Received",
      message: "Alex Chen sent you 0.01 ETH",
      timestamp: "2 minutes ago",
      isRead: false,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUser: "Alex Chen",
      amount: "0.01 ETH",
      postContent: "Just earned 50 $NXG tokens in the new battle royale game!",
    },
    {
      id: "2",
      type: "like",
      title: "Post Liked",
      message: "Sarah Kim and 23 others liked your post",
      timestamp: "5 minutes ago",
      isRead: false,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUser: "Sarah Kim",
      postContent: "Created this AI-generated artwork using NEXUS AI tools.",
    },
    {
      id: "3",
      type: "gaming",
      title: "Tournament Victory!",
      message: "You won 1st place in the Weekly Championship",
      timestamp: "1 hour ago",
      isRead: false,
      amount: "500 NXG + 2 ETH",
    },
    {
      id: "4",
      type: "follow",
      title: "New Follower",
      message: "CryptoGamer started following you",
      timestamp: "2 hours ago",
      isRead: true,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUser: "CryptoGamer",
    },
    {
      id: "5",
      type: "comment",
      title: "New Comment",
      message: "Mike Rodriguez commented on your post",
      timestamp: "3 hours ago",
      isRead: true,
      avatar: "/placeholder.svg?height=40&width=40",
      actionUser: "Mike Rodriguez",
      postContent: "Tournament starts in 1 hour! Prize pool: 1000 $NXG + 5 ETH.",
    },
    {
      id: "6",
      type: "nft",
      title: "NFT Sold",
      message: "Your NFT 'Digital Dreams #456' was sold",
      timestamp: "1 day ago",
      isRead: true,
      amount: "1.8 SOL",
    },
    {
      id: "7",
      type: "system",
      title: "Platform Update",
      message: "New AI creator tools are now available",
      timestamp: "2 days ago",
      isRead: true,
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "repost":
        return <Repeat2 className="w-5 h-5 text-green-500" />
      case "tip":
        return <Zap className="w-5 h-5 text-yellow-500" />
      case "follow":
        return <Users className="w-5 h-5 text-purple-500" />
      case "gaming":
        return <Trophy className="w-5 h-5 text-orange-500" />
      case "nft":
        return <ImageIcon className="w-5 h-5 text-pink-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const allNotifications = notifications
  const unreadNotifications = notifications.filter((n) => !n.isRead)
  const tipNotifications = notifications.filter((n) => n.type === "tip")
  const gamingNotifications = notifications.filter((n) => n.type === "gaming")

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
        !notification.isRead ? "bg-primary/5 border-primary/20" : "bg-background hover:bg-muted/50"
      }`}
    >
      <div className="flex-shrink-0">
        {notification.avatar ? (
          <Avatar className="w-10 h-10">
            <AvatarImage src={notification.avatar || "/placeholder.svg"} />
            <AvatarFallback>{notification.actionUser?.[0] || "N"}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            {getNotificationIcon(notification.type)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-semibold text-sm">{notification.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
            {notification.postContent && (
              <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground line-clamp-2">
                "{notification.postContent}"
              </div>
            )}
            {notification.amount && (
              <Badge variant="outline" className="mt-2">
                {notification.amount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {!notification.isRead && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => markAsRead(notification.id)}
                className="hover:bg-green-100 hover:text-green-700"
              >
                <Check className="w-3 h-3" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteNotification(notification.id)}
              className="hover:bg-red-100 hover:text-red-700"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount}</Badge>}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="hover:bg-green-50 hover:border-green-300"
              >
                Mark All Read
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({allNotifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="tips">Tips ({tipNotifications.length})</TabsTrigger>
          <TabsTrigger value="gaming">Gaming ({gamingNotifications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {allNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No unread notifications</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {tipNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaming">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {gamingNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
