import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Trophy, Gamepad2, Coins, Users, Clock, Star } from "lucide-react"

export function GamingHub() {
  const featuredGames = [
    {
      id: 1,
      title: "NEXUS Battle Royale",
      type: "P2E",
      players: "12.5K",
      reward: "50-500 NXG",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      status: "Live",
    },
    {
      id: 2,
      title: "Crypto Racing Championship",
      type: "P2P",
      players: "8.2K",
      reward: "100-1000 NXG",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      status: "Premium",
    },
    {
      id: 3,
      title: "NFT Card Battles",
      type: "P2E",
      players: "15.7K",
      reward: "25-250 NXG",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      status: "Live",
    },
    {
      id: 4,
      title: "Crypto Legends Arena",
      type: "P2E",
      players: "9.8K",
      reward: "75-750 NXG",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      status: "Live",
    },
    {
      id: 5,
      title: "DeFi Strategy Wars",
      type: "P2P",
      players: "6.3K",
      reward: "200-2000 NXG",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      status: "Premium",
    },
    {
      id: 6,
      title: "Blockchain Puzzle Quest",
      type: "P2E",
      players: "11.2K",
      reward: "30-300 NXG",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      status: "Live",
    },
    {
      id: 7,
      title: "Metaverse Racing League",
      type: "P2P",
      players: "14.7K",
      reward: "150-1500 NXG",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      status: "Live",
    },
  ]

  const tournaments = [
    {
      name: "Weekly Championship",
      prize: "1,000 NXG + 5 ETH",
      participants: 256,
      timeLeft: "2h 34m",
      status: "Live",
    },
    {
      name: "Monthly Grand Prix",
      prize: "5,000 NXG + 20 ETH",
      participants: 1024,
      timeLeft: "5d 12h",
      status: "Registration",
    },
    {
      name: "Seasonal Masters",
      prize: "10,000 NXG + 50 ETH",
      participants: 2048,
      timeLeft: "23d 8h",
      status: "Coming Soon",
    },
  ]

  const playerStats = {
    level: 42,
    xp: 8750,
    nextLevelXp: 10000,
    nxgEarned: 2456,
    gamesPlayed: 187,
    winRate: 68,
    rank: "Diamond III",
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Player Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Gaming Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">Level {playerStats.level}</div>
              <div className="text-sm text-muted-foreground">Player Level</div>
              <Progress value={(playerStats.xp / playerStats.nextLevelXp) * 100} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{playerStats.nxgEarned}</div>
              <div className="text-sm text-muted-foreground">NXG Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{playerStats.winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{playerStats.rank}</div>
              <div className="text-sm text-muted-foreground">Current Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="games" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="games">Featured Games</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <Card key={game.id} className="overflow-hidden">
                <div className="relative">
                  <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-48 object-cover" />
                  <Badge
                    className={`absolute top-2 right-2 ${game.status === "Live" ? "bg-green-500" : "bg-purple-500"}`}
                  >
                    {game.status}
                  </Badge>
                  <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
                    {game.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{game.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {game.players} players
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      Earn: {game.reward}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {game.rating}/5.0
                    </div>
                  </div>
                  <Button className="w-full mt-4">{game.type === "P2P" ? "Buy Access" : "Play Now"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <div className="space-y-4">
            {tournaments.map((tournament, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tournament.name}</h3>
                        <p className="text-muted-foreground">Prize Pool: {tournament.prize}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{tournament.timeLeft}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{tournament.participants} participants</span>
                      </div>
                    </div>
                    <div>
                      <Badge variant={tournament.status === "Live" ? "default" : "outline"} className="mb-2">
                        {tournament.status}
                      </Badge>
                      <Button className="block" disabled={tournament.status === "Coming Soon"}>
                        {tournament.status === "Live"
                          ? "Join Now"
                          : tournament.status === "Registration"
                            ? "Register"
                            : "Coming Soon"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Players This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "CryptoKing", nxg: 5420, games: 45, winRate: 89 },
                  { rank: 2, name: "BlockchainBeast", nxg: 4890, games: 52, winRate: 85 },
                  { rank: 3, name: "NFTNinja", nxg: 4567, games: 38, winRate: 92 },
                  { rank: 4, name: "GameMaster", nxg: 4234, games: 41, winRate: 87 },
                  { rank: 5, name: "TokenTitan", nxg: 3998, games: 47, winRate: 83 },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          player.rank === 1
                            ? "bg-yellow-500 text-white"
                            : player.rank === 2
                              ? "bg-gray-400 text-white"
                              : player.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        #{player.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.games} games • {player.winRate}% win rate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-500">{player.nxg} NXG</p>
                      <p className="text-sm text-muted-foreground">earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
