"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sparkles, ImageIcon, Video, Music, Download, Share2, Wand2 } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function AICreatorTools() {
  const [selectedAiModel, setSelectedAiModel] = useState("nexus-ai") // New state for AI Model
  const recentCreations = [
    {
      id: 1,
      type: "image",
      title: "Cosmic Landscape",
      prompt: "A futuristic cityscape with neon lights and flying cars",
      timestamp: "2h ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      type: "video",
      title: "Abstract Motion",
      prompt: "Flowing abstract shapes with vibrant colors",
      timestamp: "4h ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      type: "image",
      title: "Digital Portrait",
      prompt: "Portrait of a cyberpunk character with glowing eyes",
      timestamp: "1d ago",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Creator Studio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Create stunning content with AI-powered tools. Generate images, videos, and more with simple text prompts.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="image" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="image" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            Image
          </TabsTrigger>
          <TabsTrigger value="video" className="gap-2">
            <Video className="w-4 h-4" />
            Video
          </TabsTrigger>
          <TabsTrigger value="music" className="gap-2">
            <Music className="w-4 h-4" />
            Music
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Sparkles className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generation Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <Textarea placeholder="Describe the image you want to create..." className="min-h-24" />
                </div>

                {/* New AI Model Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Model</label>
                  <Select value={selectedAiModel} onValueChange={setSelectedAiModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nexus-ai">NEXUS AI (Recommended)</SelectItem>
                      <SelectItem value="openai-dalle">OpenAI DALL-E</SelectItem>
                      <SelectItem value="midjourney">Midjourney</SelectItem>
                      <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Style</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Dimensions</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square (1024x1024)</SelectItem>
                      <SelectItem value="portrait">Portrait (768x1024)</SelectItem>
                      <SelectItem value="landscape">Landscape (1024x768)</SelectItem>
                      <SelectItem value="wide">Wide (1536x768)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quality</label>
                  <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Draft</span>
                    <span>High Quality</span>
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full gap-2" onClick={() => console.log('Generating image with model:', selectedAiModel)}>
                      <Wand2 className="w-4 h-4" />
                      Generate Image
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate image using the selected AI model</p>
                  </TooltipContent>
                </Tooltip>

                <div className="text-xs text-muted-foreground text-center">Cost: 10 NXG tokens per generation</div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Generated image will appear here</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download the generated image</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share the generated image</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full mt-2">Mint as NFT</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mint the generated image as an NFT</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <Textarea placeholder="Describe the video you want to create..." className="min-h-24" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3s">3 seconds</SelectItem>
                      <SelectItem value="5s">5 seconds</SelectItem>
                      <SelectItem value="10s">10 seconds</SelectItem>
                      <SelectItem value="15s">15 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Style</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="realistic">Realistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full gap-2">
                      <Video className="w-4 h-4" />
                      Generate Video
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate video using AI</p>
                  </TooltipContent>
                </Tooltip>

                <div className="text-xs text-muted-foreground text-center">Cost: 50 NXG tokens per generation</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <Video className="w-12 h-12 mx-auto mb-2" />
                    <p>Generated video will appear here</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download the generated video</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share the generated video</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="music" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Music</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea placeholder="Describe the music you want to create..." className="min-h-24" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Genre</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="ambient">Ambient</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30s">30 seconds</SelectItem>
                      <SelectItem value="1m">1 minute</SelectItem>
                      <SelectItem value="2m">2 minutes</SelectItem>
                      <SelectItem value="3m">3 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="w-full gap-2">
                      <Music className="w-4 h-4" />
                      Generate Music
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate music using AI</p>
                  </TooltipContent>
                </Tooltip>

                <div className="text-xs text-muted-foreground text-center">Cost: 25 NXG tokens per generation</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audio Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <Music className="w-12 h-12 mx-auto mb-2" />
                    <p>Generated music will appear here</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download the generated music</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share the generated music</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCreations.map((creation) => (
              <Card key={creation.id}>
                <div className="relative">
                  <img
                    src={creation.image || "/placeholder.svg"}
                    alt={creation.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2">{creation.type}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{creation.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{creation.prompt}</p>
                  <p className="text-xs text-muted-foreground mb-3">{creation.timestamp}</p>

                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download this creation</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Share2 className="w-3 h-3" />
                          Share
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share this creation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}