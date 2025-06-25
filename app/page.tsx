"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Feed } from "@/components/feed"
import { WalletPanel } from "@/components/wallet-panel"
import { GamingHub } from "@/components/gaming-hub"
import { NFTMarketplace } from "@/components/nft-marketplace"
import { AICreatorTools } from "@/components/ai-creator-tools"
import { CreatorEarnings } from "@/components/creator-earnings"
import { SwapInterface } from "@/components/swap-interface"
import { LiveChat } from "@/components/live-chat"
import { Messages } from "@/components/messages"
import { Notifications } from "@/components/notifications"
import { Profile } from "@/components/profile"
import { AIGameCreator } from "@/components/ai-game-creator"
import { LLMManagement } from "@/components/llm-management"
import { SettingsPanel } from "@/components/settings-panel"
import { Toaster } from "sonner"
import { FloatingCreatePostButton } from "@/components/floating-create-post-button"
import { CreatePostModal } from "@/components/create-post-modal"

export default function Home() {
  const [activeSection, setActiveSection] = useState("feed")
  const [showCreatePostModal, setShowCreatePostModal] = useState(false)

  // Initial posts data, moved from Feed.tsx
  const [posts, setPosts] = useState([
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
      image: undefined,
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
      image: undefined,
      isLiked: false,
      isReposted: true,
      userComments: [
        { id: 1, user: "GameMaster", content: "Count me in! 💪", timestamp: "5h ago" },
        { id: 2, user: "Alex Chen", content: "Ready to dominate!", timestamp: "4h ago" },
      ],
    },
  ])

  const handlePostCreated = (newPost: any) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
    setActiveSection("feed") // Ensure user is on the feed after posting
  }

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <Feed posts={posts} setPosts={setPosts} />
      case "wallet":
        return <WalletPanel />
      case "gaming":
        return <GamingHub />
      case "nft":
        return <NFTMarketplace />
      case "ai-tools":
        return <AICreatorTools />
      case "ai-game-creator":
        return <AIGameCreator />
      case "llm-management":
        return <LLMManagement />
      case "earnings":
        return <CreatorEarnings />
      case "swap":
        return <SwapInterface />
      case "live-chat":
        return <LiveChat />
      case "messages":
        return <Messages />
      case "notifications":
        return <Notifications />
      case "profile":
        return <Profile />
      case "settings-panel":
        return <SettingsPanel />
      default:
        return <Feed posts={posts} setPosts={setPosts} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} /> {/* Pass activeSection and setActiveSection */}
      <main className="flex-1 overflow-auto">{renderContent()}</main>
      <FloatingCreatePostButton onClick={() => setShowCreatePostModal(true)} />
      <CreatePostModal isOpen={showCreatePostModal} onOpenChange={setShowCreatePostModal} onPostCreated={handlePostCreated} />
      <Toaster />
    </div>
  )
}