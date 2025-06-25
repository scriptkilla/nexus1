import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Zap, Eye, Heart, Users } from "lucide-react"

export function CreatorEarnings() {
  const earningsData = {
    totalEarnings: 15420.5,
    thisMonth: 3240.75,
    lastMonth: 2890.25,
    tips: 8450.3,
    nftSales: 4320.8,
    sponsorships: 2649.4,
    growth: 12.5,
  }

  const recentEarnings = [
    { type: "tip", amount: "2.5 ETH", from: "@cryptofan123", content: "Amazing AI artwork!", time: "2h ago" },
    { type: "nft", amount: "1.8 SOL", from: "NFT Sale", content: "Digital Dreams #456", time: "4h ago" },
    { type: "tip", amount: "50 NXG", from: "@gamer_pro", content: "Great gaming content", time: "6h ago" },
    { type: "sponsor", amount: "500 USDC", from: "Brand Partnership", content: "Monthly sponsorship", time: "1d ago" },
    { type: "tip", amount: "0.1 BTC", from: "@artlover", content: "Keep creating!", time: "2d ago" },
  ]

  const contentStats = [
    { title: "Total Posts", value: "234", change: "+12", icon: TrendingUp },
    { title: "Total Views", value: "45.2K", change: "+8.3%", icon: Eye },
    { title: "Total Likes", value: "12.8K", change: "+15.2%", icon: Heart },
    { title: "Followers", value: "3.4K", change: "+156", icon: Users },
  ]

  const monthlyData = [
    { month: "Jan", earnings: 1200 },
    { month: "Feb", earnings: 1800 },
    { month: "Mar", earnings: 2100 },
    { month: "Apr", earnings: 2400 },
    { month: "May", earnings: 2890 },
    { month: "Jun", earnings: 3240 },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">${earningsData.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${earningsData.thisMonth.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{earningsData.growth}% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tips Received</p>
                <p className="text-2xl font-bold">${earningsData.tips.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NFT Sales</p>
                <p className="text-2xl font-bold">${earningsData.nftSales.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tips</span>
                    <span className="font-semibold">${earningsData.tips.toLocaleString()}</span>
                  </div>
                  <Progress value={(earningsData.tips / earningsData.totalEarnings) * 100} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">NFT Sales</span>
                    <span className="font-semibold">${earningsData.nftSales.toLocaleString()}</span>
                  </div>
                  <Progress value={(earningsData.nftSales / earningsData.totalEarnings) * 100} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sponsorships</span>
                    <span className="font-semibold">${earningsData.sponsorships.toLocaleString()}</span>
                  </div>
                  <Progress value={(earningsData.sponsorships / earningsData.totalEarnings) * 100} />
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(data.earnings / 3500) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm">${data.earnings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Content Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change}</p>
                      </div>
                      <Icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Top Performing Content */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "AI Generated Cosmic Art", views: "12.5K", likes: "2.3K", tips: "5.2 ETH" },
                  { title: "Gaming Tournament Highlights", views: "8.7K", likes: "1.8K", tips: "150 NXG" },
                  { title: "NFT Collection Showcase", views: "6.2K", likes: "1.2K", tips: "2.1 SOL" },
                  { title: "Crypto Market Analysis", views: "4.8K", likes: "890", tips: "0.05 BTC" },
                ].map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-semibold">{content.title}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{content.views} views</span>
                        <span>{content.likes} likes</span>
                      </div>
                    </div>
                    <Badge variant="outline">{content.tips}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          earning.type === "tip"
                            ? "bg-purple-100 text-purple-600"
                            : earning.type === "nft"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {earning.type === "tip" ? (
                          <Zap className="w-5 h-5" />
                        ) : earning.type === "nft" ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <DollarSign className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{earning.amount}</p>
                        <p className="text-sm text-muted-foreground">{earning.from}</p>
                        <p className="text-xs text-muted-foreground">{earning.content}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {earning.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{earning.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Earnings Goal</span>
                    <span className="text-sm">$3,240 / $4,000</span>
                  </div>
                  <Progress value={81} />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Content Posts</span>
                    <span className="text-sm">18 / 25</span>
                  </div>
                  <Progress value={72} />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">New Followers</span>
                    <span className="text-sm">156 / 200</span>
                  </div>
                  <Progress value={78} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">First 1K Followers</p>
                      <p className="text-xs text-muted-foreground">Unlocked creator benefits</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">NFT Master</p>
                      <p className="text-xs text-muted-foreground">Sold 10+ NFTs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg bg-purple-50">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">AI Artist</p>
                      <p className="text-xs text-muted-foreground">Created 50+ AI artworks</p>
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
