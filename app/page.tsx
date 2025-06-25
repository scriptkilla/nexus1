"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
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

export default function Home() {
  const [activeSection, setActiveSection] = useState("feed")

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <Feed />
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
      default:
        return <Feed />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}
