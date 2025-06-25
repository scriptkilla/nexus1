"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge" // Import Badge
import { Bell, Shield, Wallet, Sparkles } from "lucide-react"

export function SettingsPanel() {
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

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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
  )
}