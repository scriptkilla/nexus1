"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Wallet,
  Gamepad2,
  ShoppingBag,
  Sparkles,
  DollarSign,
  ArrowUpDown,
  MessageSquare,
  Mail,
  Bell,
  User,
  Settings,
  LogOut,
  Wand2,
  Brain, // Import the Brain icon
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "feed", label: "Home Feed", icon: Home },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "gaming", label: "Gaming Hub", icon: Gamepad2 },
    { id: "nft", label: "NFT Marketplace", icon: ShoppingBag },
    { id: "ai-tools", label: "AI Creator Tools", icon: Sparkles },
    { id: "ai-game-creator", label: "AI Game Creator", icon: Wand2 },
    { id: "llm-management", label: "LLM Management", icon: Brain },
    { id: "earnings", label: "Creator Earnings", icon: DollarSign },
    { id: "swap", label: "Token Swap", icon: ArrowUpDown },
    { id: "live-chat", label: "Live Chat", icon: MessageSquare },
    { id: "messages", label: "Messages", icon: Mail, badge: 3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 12 },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings-panel", label: "Settings", icon: Settings }, // New menu item for settings panel
  ]

  return (
    <div className={`bg-card border-r transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img src="/nexus-logo.png" alt="NEXUS Logo" className="w-12 h-12 rounded-lg" />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                NEXUS
              </h1>
              <p className="text-xs text-muted-foreground">Social Web3 Platform</p>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${isCollapsed ? "px-2" : "px-3"}`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        {/* The Settings button is now part of the main menuItems array */}
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${isCollapsed ? "px-2" : "px-3"} text-red-600 hover:text-red-700 hover:bg-red-50`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}