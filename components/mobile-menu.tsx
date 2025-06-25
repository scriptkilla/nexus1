"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Brain,
  Menu, // Using Menu icon for the dropdown trigger
} from "lucide-react"

interface MobileMenuProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileMenu({ activeSection, setActiveSection }: MobileMenuProps) {
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
    { id: "settings-panel", label: "Settings", icon: Settings },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>NEXUS Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 ${activeSection === item.id ? "bg-accent text-accent-foreground" : ""}`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}