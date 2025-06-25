"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ui/file-upload"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Edit,
  Camera,
  MapPin,
  Calendar,
  LinkIcon,
  Trophy,
  Zap,
  Heart,
  MessageCircle,
  Users,
  Shield,
  Bell,
  Wallet,
  Save,
  Sparkles,
} from "lucide-react"

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarUpload, setShowAvatarUpload] = useState(false)
  const [showBannerUpload, setShowBannerUpload] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "TommyCrypto",
    username: "@tommycrypto",
    bio: "Crypto enthusiast, NFT collector, and gaming champion. Building the future of Web3 social media on NEXUS! 🚀",
    location: "San Francisco, CA",
    website: "https://tommycrypto.com",
    joinDate: "March 2023",
    avatar: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=200&width=800",
  })

  const [settings, setSettings] = useState({
    notifications: {
      tips: true,
      comments: true,
      likes: false,
      follows: true,
      gaming: true,
      nft: true,
    },
    privacy: {
      profilePublic: true,
      showBalance: false,
      showActivity: true,
    },
  })

  const stats = {
    followers: 3420,
    following: 892,
    posts: 234,
    nxgEarned: 12450,
    tipsReceived: "15.8 ETH",
    nftsSold: 23,
    gamesWon: 156,
  }

  const recentPosts = [
    {
      id: 1,
      content: "Just won the weekly tournament! 🏆 The competition was intense but totally worth it.",
      timestamp: "2h ago",
      likes: 45,
      comments: 12,
      tips: "0.05 ETH",
    },
    {
      id: 2,
      content: "New NFT drop coming soon! Created with NEXUS AI tools. Stay tuned! 🎨",
      timestamp: "1d ago",
      likes: 89,
      comments: 23,
      tips: "0.12 ETH",
    },
    {
      id: 3,
      content: "Thanks everyone for the amazing support! This community is incredible 💜",
      timestamp: "3d ago",
      likes: 156,
      comments: 34,
      tips: "0.08 ETH",
    },
  ]

  const handleSave = () => {
    console.log("Saving profile:", profileData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handleAvatarUpload = (imageUrl: string) => {
    setProfileData((prev) => ({ ...prev, avatar: imageUrl }))
    setShowAvatarUpload(false)
  }

  const handleBannerUpload = (imageUrl: string) => {
    setProfileData((prev) => ({ ...prev, banner: imageUrl }))
    setShowBannerUpload(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="relative">
          {/* Banner */}
          <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-lg relative">
            <img
              src={profileData.banner || "/placeholder.svg"}
              alt="Profile banner"
              className="w-full h-full object-cover rounded-t-lg opacity-50"
            />
            <Dialog open={showBannerUpload} onOpenChange={setShowBannerUpload}>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="absolute top-4 right-4 gap-2 hover:bg-white/90">
                  <Camera className="w-4 h-4" />
                  Edit Banner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Banner Image</DialogTitle>
                </DialogHeader>
                <ImageUpload onImageUpload={handleBannerUpload} currentImage={profileData.banner} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-16 left-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{profileData.name[0]}</AvatarFallback>
              </Avatar>
              <Dialog open={showAvatarUpload} onOpenChange={setShowAvatarUpload}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-2 right-2 w-8 h-8 p-0 hover:bg-white/90"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Profile Picture</DialogTitle>
                  </DialogHeader>
                  <ImageUpload onImageUpload={handleAvatarUpload} currentImage={profileData.avatar} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <CardContent className="pt-20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4 max-w-md">
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Display name"
                  />
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="Username"
                  />
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Bio"
                    className="min-h-20"
                  />
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Location"
                  />
                  <Input
                    value={profileData.website}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="Website"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <p className="text-muted-foreground">{profileData.username}</p>
                  <p className="mt-3 text-sm">{profileData.bio}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a
                        href={profileData.website}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        tommycrypto.com
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {profileData.joinDate}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.followers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.following.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.posts}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{stats.nxgEarned.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">NXG Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.timestamp}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        {post.tips}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tournament Champion</h3>
                    <p className="text-sm text-muted-foreground">Won 156 games</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tip Master</h3>
                    <p className="text-sm text-muted-foreground">Received {stats.tipsReceived} in tips</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Builder</h3>
                    <p className="text-sm text-muted-foreground">{stats.followers.toLocaleString()} followers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">NFT Artist</h3>
                    <p className="text-sm text-muted-foreground">Sold {stats.nftsSold} NFTs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Game Creator</h3>
                    <p className="text-sm text-muted-foreground">Create custom games with AI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nfts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-t-lg" />
                <CardContent className="p-4">
                  <h3 className="font-semibold">Digital Art #{i}</h3>
                  <p className="text-sm text-muted-foreground">Created with NEXUS AI</p>
                  <Badge variant="outline" className="mt-2">
                    Owned
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="capitalize cursor-pointer">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => handleSettingChange("notifications", key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="capitalize cursor-pointer">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => handleSettingChange("privacy", key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Wallet Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full hover:bg-green-50 hover:border-green-300">
                  Connect New Wallet
                </Button>
                <Button variant="outline" className="w-full hover:bg-blue-50 hover:border-blue-300">
                  Export Private Key
                </Button>
                <Button variant="destructive" className="w-full hover:bg-red-600">
                  Disconnect Wallet
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Game Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Create Custom Games</h3>
                      <p className="text-sm text-muted-foreground">
                        Access the full AI Game Creator Studio to build custom games
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={() => (window.location.href = "#ai-game-creator")}
                  >
                    Open AI Game Creator Studio
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Auto-generate mini-games</p>
                      <p className="text-xs text-muted-foreground">Create games based on your content</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Game monetization</p>
                      <p className="text-xs text-muted-foreground">Earn NXG from game plays</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Share games publicly</p>
                      <p className="text-xs text-muted-foreground">Let others discover your games</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Recent AI Games</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Crypto Quiz Challenge</span>
                      <Badge variant="outline">124 plays</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>NFT Memory Game</span>
                      <Badge variant="outline">89 plays</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Trading Simulator</span>
                      <Badge variant="outline">67 plays</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
