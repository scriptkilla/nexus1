import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Eye, Share2, Filter } from "lucide-react"

export function NFTMarketplace() {
  const featuredNFTs = [
    {
      id: 1,
      title: "Cosmic Warrior #1234",
      creator: "ArtistPro",
      price: "2.5 ETH",
      usdPrice: "$5,250",
      image: "/placeholder.svg?height=300&width=300",
      likes: 234,
      views: 1567,
      blockchain: "Ethereum",
      rarity: "Legendary",
    },
    {
      id: 2,
      title: "Digital Dreams Collection",
      creator: "CryptoArtist",
      price: "1.8 SOL",
      usdPrice: "$180",
      image: "/placeholder.svg?height=300&width=300",
      likes: 189,
      views: 892,
      blockchain: "Solana",
      rarity: "Rare",
    },
    {
      id: 3,
      title: "NEXUS Gaming Avatar",
      creator: "GameDesigner",
      price: "500 NXG",
      usdPrice: "$1,000",
      image: "/placeholder.svg?height=300&width=300",
      likes: 456,
      views: 2341,
      blockchain: "NEXUS",
      rarity: "Epic",
    },
    {
      id: 4,
      title: "Abstract Geometry #567",
      creator: "ModernArt",
      price: "0.8 BTC",
      usdPrice: "$42,000",
      image: "/placeholder.svg?height=300&width=300",
      likes: 678,
      views: 3456,
      blockchain: "Bitcoin",
      rarity: "Mythic",
    },
    {
      id: 5,
      title: "Pixel Punk Revolution",
      creator: "PixelMaster",
      price: "150 BSC",
      usdPrice: "$450",
      image: "/placeholder.svg?height=300&width=300",
      likes: 123,
      views: 567,
      blockchain: "BSC",
      rarity: "Common",
    },
    {
      id: 6,
      title: "Elrond Legends #890",
      creator: "LegendCreator",
      price: "25 EGLD",
      usdPrice: "$1,250",
      image: "/placeholder.svg?height=300&width=300",
      likes: 345,
      views: 1234,
      blockchain: "Elrond",
      rarity: "Rare",
    },
  ]

  const myNFTs = [
    {
      id: 1,
      title: "My Gaming Avatar",
      collection: "NEXUS Avatars",
      price: "750 NXG",
      image: "/placeholder.svg?height=200&width=200",
      status: "Listed",
    },
    {
      id: 2,
      title: "AI Generated Art #123",
      collection: "AI Creations",
      price: "1.2 ETH",
      image: "/placeholder.svg?height=200&width=200",
      status: "Not Listed",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500"
      case "Rare":
        return "bg-blue-500"
      case "Epic":
        return "bg-purple-500"
      case "Legendary":
        return "bg-orange-500"
      case "Mythic":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
          <TabsTrigger value="create">Create NFT</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Input placeholder="Search NFTs..." className="max-w-xs" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Chains</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                    <SelectItem value="nexus">NEXUS</SelectItem>
                    <SelectItem value="elrond">Elrond</SelectItem>
                    <SelectItem value="bitcoin">Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                    <SelectItem value="mythic">Mythic</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={nft.image || "/placeholder.svg"} alt={nft.title} className="w-full h-64 object-cover" />
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(nft.rarity)} text-white`}>
                    {nft.rarity}
                  </Badge>
                  <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
                    {nft.blockchain}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 truncate">{nft.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {nft.creator}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold">{nft.price}</p>
                      <p className="text-sm text-muted-foreground">{nft.usdPrice}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {nft.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {nft.views}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Buy Now</Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-nfts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden">
                <div className="relative">
                  <img src={nft.image || "/placeholder.svg"} alt={nft.title} className="w-full h-48 object-cover" />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      nft.status === "Listed" ? "bg-green-500" : "bg-gray-500"
                    } text-white`}
                  >
                    {nft.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{nft.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{nft.collection}</p>
                  <p className="font-bold mb-3">{nft.price}</p>

                  <div className="flex gap-2">
                    {nft.status === "Listed" ? (
                      <>
                        <Button variant="outline" className="flex-1">
                          Edit Listing
                        </Button>
                        <Button variant="destructive" className="flex-1">
                          Remove
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full">List for Sale</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New NFT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Upload File</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <p className="text-muted-foreground">Drag and drop your file here, or click to browse</p>
                      <Button variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input placeholder="Enter NFT name" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <textarea
                      className="w-full p-3 border border-border rounded-md resize-none h-24"
                      placeholder="Describe your NFT..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Blockchain</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="solana">Solana</SelectItem>
                        <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                        <SelectItem value="nexus">NEXUS</SelectItem>
                        <SelectItem value="elrond">Elrond</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <div className="flex gap-2">
                      <Input placeholder="0.00" />
                      <Select>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Token" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eth">ETH</SelectItem>
                          <SelectItem value="sol">SOL</SelectItem>
                          <SelectItem value="bnb">BNB</SelectItem>
                          <SelectItem value="nxg">NXG</SelectItem>
                          <SelectItem value="egld">EGLD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full">Create NFT</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
