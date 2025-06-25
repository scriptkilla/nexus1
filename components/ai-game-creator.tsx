"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  Gamepad2,
  Wand2,
  Play,
  Settings,
  Coins,
  Users,
  Clock,
  Star,
  Zap,
  Trophy,
  Target,
  Puzzle,
  Dice6,
  Brain,
  Rocket,
  Heart,
} from "lucide-react"

export function AIGameCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedAiEngine, setSelectedAiEngine] = useState("nexus-engine") // New state for AI Engine
  const [gameSettings, setGameSettings] = useState({
    difficulty: [50],
    duration: [5],
    monetization: true,
    publicShare: true,
  })

  const gameTemplates = [
    {
      id: "quiz",
      name: "Crypto Quiz Challenge",
      description: "Test knowledge with customizable quiz games",
      icon: Brain,
      category: "Educational",
      difficulty: "Easy",
      estimatedTime: "2-5 min",
      features: ["Multiple choice", "Leaderboards", "Rewards"],
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "memory",
      name: "NFT Memory Match",
      description: "Memory game featuring your NFT collection",
      icon: Puzzle,
      category: "Puzzle",
      difficulty: "Medium",
      estimatedTime: "3-7 min",
      features: ["Custom cards", "Time challenges", "Multiplayer"],
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "trading",
      name: "Trading Simulator",
      description: "Practice trading with virtual portfolios",
      icon: Target,
      category: "Strategy",
      difficulty: "Hard",
      estimatedTime: "10-15 min",
      features: ["Real data", "Risk management", "Analytics"],
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "runner",
      name: "Crypto Runner",
      description: "Endless runner collecting crypto tokens",
      icon: Rocket,
      category: "Action",
      difficulty: "Medium",
      estimatedTime: "5-10 min",
      features: ["Power-ups", "Achievements", "Token rewards"],
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "puzzle",
      name: "DeFi Puzzle Quest",
      description: "Solve puzzles to learn DeFi concepts",
      icon: Dice6,
      category: "Educational",
      difficulty: "Medium",
      estimatedTime: "8-12 min",
      features: ["Progressive difficulty", "Tutorials", "Certificates"],
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "battle",
      name: "NFT Battle Arena",
      description: "Turn-based battles with your NFTs",
      icon: Trophy,
      category: "Strategy",
      difficulty: "Hard",
      estimatedTime: "15-20 min",
      features: ["NFT stats", "Tournaments", "Rare rewards"],
      preview: "/placeholder.svg?height=200&width=300",
    },
  ]

  const myGames = [
    {
      id: 1,
      name: "My Crypto Quiz",
      template: "Crypto Quiz Challenge",
      plays: 1247,
      rating: 4.8,
      earnings: "45.2 NXG",
      status: "Live",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      name: "NFT Memory Master",
      template: "NFT Memory Match",
      plays: 892,
      rating: 4.6,
      earnings: "32.1 NXG",
      status: "Live",
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      name: "Trading Academy",
      template: "Trading Simulator",
      plays: 634,
      rating: 4.9,
      earnings: "28.7 NXG",
      status: "Draft",
      lastUpdated: "3 days ago",
    },
  ]

  const handleGenerateGame = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      console.log("Game generated with AI Engine:", selectedAiEngine)
    }, 3000)
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            AI Game Creator Studio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Create engaging games for your profile using AI-powered tools and customizable templates. Monetize your
            games and build your gaming community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">12</div>
              <div className="text-sm text-muted-foreground">Games Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">2.8K</div>
              <div className="text-sm text-muted-foreground">Total Plays</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">156.4</div>
              <div className="text-sm text-muted-foreground">NXG Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">4.7</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Game Templates</TabsTrigger>
          <TabsTrigger value="ai-creator">AI Creator</TabsTrigger>
          <TabsTrigger value="my-games">My Games</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{template.category}</Badge>
                  <div className="absolute top-2 left-2">
                    <template.icon className="w-8 h-8 text-white bg-black/50 rounded-full p-1" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>

                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center justify-between">
                      <span>Difficulty:</span>
                      <Badge variant="outline" className="text-xs">
                        {template.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Play Time:</span>
                      <span>{template.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleTemplateSelect(template.id)}>
                      Use Template
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-creator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Generation Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI Game Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Game Concept</Label>
                  <Textarea
                    placeholder="Describe the game you want to create... (e.g., 'A space-themed puzzle game where players collect crypto tokens while avoiding asteroids')"
                    className="min-h-24"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Reference Images</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    <div className="space-y-2">
                      <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Upload reference images</p>
                        <p className="text-xs text-muted-foreground">
                          Upload images to inspire your game's visual style and theme
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Choose Images
                      </Button>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          console.log("Uploaded files:", files)
                          // Handle file upload logic here
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {/* Sample uploaded images preview */}
                    <div className="relative group">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Uploaded reference"
                        className="w-15 h-15 object-cover rounded border"
                      />
                      <button className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        ×
                      </button>
                    </div>
                    <div className="relative group">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Uploaded reference"
                        className="w-15 h-15 object-cover rounded border"
                      />
                      <button className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        ×
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: JPG, PNG, GIF, WebP (Max 5MB each, up to 10 images)
                  </p>
                </div>

                {/* New AI Engine Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">AI Engine</Label>
                  <Select value={selectedAiEngine} onValueChange={setSelectedAiEngine}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI Engine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nexus-engine">NEXUS Game Engine (Recommended)</SelectItem>
                      <SelectItem value="unity-ai">Unity AI</SelectItem>
                      <SelectItem value="unreal-ai">Unreal Engine AI</SelectItem>
                      <SelectItem value="custom-llm">Custom LLM Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Game Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select game type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puzzle">Puzzle Game</SelectItem>
                      <SelectItem value="action">Action Game</SelectItem>
                      <SelectItem value="strategy">Strategy Game</SelectItem>
                      <SelectItem value="educational">Educational Game</SelectItem>
                      <SelectItem value="casual">Casual Game</SelectItem>
                      <SelectItem value="rpg">RPG Elements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Theme</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="nft">NFT Collection</SelectItem>
                      <SelectItem value="defi">DeFi Protocols</SelectItem>
                      <SelectItem value="space">Space/Sci-Fi</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="modern">Modern/Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Difficulty Level</Label>
                  <Slider
                    value={gameSettings.difficulty}
                    onValueChange={(value) => setGameSettings((prev) => ({ ...prev, difficulty: value }))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Easy</span>
                    <span>Hard</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Game Duration (minutes)</Label>
                  <Slider
                    value={gameSettings.duration}
                    onValueChange={(value) => setGameSettings((prev) => ({ ...prev, duration: value }))}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 min</span>
                    <span>30 min</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monetization" className="text-sm font-medium">
                      Enable Monetization
                    </Label>
                    <Switch
                      id="monetization"
                      checked={gameSettings.monetization}
                      onCheckedChange={(checked) => setGameSettings((prev) => ({ ...prev, monetization: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="public-share" className="text-sm font-medium">
                      Share Publicly
                    </Label>
                    <Switch
                      id="public-share"
                      checked={gameSettings.publicShare}
                      onCheckedChange={(checked) => setGameSettings((prev) => ({ ...prev, publicShare: checked }))}
                    />
                  </div>
                </div>

                <Button className="w-full gap-2" onClick={handleGenerateGame} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Game...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Game with AI
                    </>
                  )}
                </Button>

                <div className="text-xs text-muted-foreground text-center">Cost: 25 NXG tokens per generation</div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Game Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="text-center text-muted-foreground">
                    <Gamepad2 className="w-12 h-12 mx-auto mb-2" />
                    <p>Generated game preview will appear here</p>
                    <p className="text-sm mt-1">Configure your game settings and click generate</p>
                  </div>
                  {/* Sample preview of how uploaded images might be used */}
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    <div className="w-8 h-8 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Using uploaded assets
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Plays:</span>
                    <span className="font-medium">500-1,200/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Earnings:</span>
                    <span className="font-medium text-green-500">15-45 NXG/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Development Time:</span>
                    <span className="font-medium">2-5 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Image Processing:</span>
                    <span className="font-medium">AI-Enhanced</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1 gap-2" disabled>
                    <Play className="w-4 h-4" />
                    Test Game
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" disabled>
                    <Settings className="w-4 h-4" />
                    Customize
                  </Button>
                </div>

                <Button className="w-full mt-2" disabled>
                  Publish Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-games" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Games</h2>
            <Button className="gap-2">
              <Sparkles className="w-4 h-4" />
              Create New Game
            </Button>
          </div>

          <div className="space-y-4">
            {myGames.map((game) => (
              <Card key={game.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Gamepad2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{game.name}</h3>
                        <p className="text-muted-foreground text-sm">Based on {game.template}</p>
                        <p className="text-xs text-muted-foreground">Last updated {game.lastUpdated}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{game.plays.toLocaleString()}</span>
                        </div>
                        <div className="text-muted-foreground">plays</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{game.rating}</span>
                        </div>
                        <div className="text-muted-foreground">rating</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{game.earnings}</span>
                        </div>
                        <div className="text-muted-foreground">earned</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={game.status === "Live" ? "default" : "secondary"}>{game.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-sm text-muted-foreground">Total Players</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">8.4m</p>
                    <p className="text-sm text-muted-foreground">Play Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">156.4</p>
                    <p className="text-sm text-muted-foreground">NXG Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Analytics charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}