"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Plus, Eye, EyeOff, RefreshCw, X } from "lucide-react"
import { useState } from "react"
import { useWallet } from "@/hooks/use-wallet"
import { WalletConnect } from "@/components/wallet-connect"
import { AddTokenModal } from "@/components/add-token-modal"
import { useTokenManagement } from "@/hooks/use-token-management"
import { SendCryptoModal } from "@/components/send-crypto-modal" // Import SendCryptoModal
import { ReceiveCryptoModal } from "@/components/receive-crypto-modal" // Import ReceiveCryptoModal

export function WalletPanel() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const { wallet, refreshWallet } = useWallet()
  const { tokens, addToken, removeToken } = useTokenManagement()

  const handleAddToken = (token: any) => {
    try {
      addToken(token)
      console.log("Added token:", token)
    } catch (error) {
      console.error("Failed to add token:", error)
      alert(error instanceof Error ? error.message : "Failed to add token")
    }
  }

  const handleRemoveToken = (address: string) => {
    removeToken(address)
    console.log("Removed token:", address)
  }

  // Add real token balances to the display
  const allBalances = tokens

  const recentTransactions = [
    { type: "received", amount: "+50 NXG", from: "Gaming Reward", time: "2h ago", status: "completed" },
    { type: "sent", amount: "-0.001 ETH", to: "NFT Purchase", time: "4h ago", status: "completed" },
    { type: "received", amount: "+2.5 SOL", from: "Content Tip", time: "1d ago", status: "completed" },
    { type: "sent", amount: "-25 NXG", to: "Tournament Entry", time: "2d ago", status: "completed" },
  ]

  const totalValue = tokens.reduce(
    (sum, crypto) => sum + Number.parseFloat(crypto.value.replace("$", "").replace(",", "")),
    0,
  )

  const refreshBalances = async () => {
    await refreshWallet()
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Wallet Connection */}
      <WalletConnect />

      {/* Portfolio Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Portfolio Overview</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={refreshBalances} disabled={!wallet.isConnected}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setBalanceVisible(!balanceVisible)}>
                {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{balanceVisible ? `$${totalValue.toLocaleString()}` : "••••••"}</div>
          <div className="text-green-500 text-sm">+$234.56 (+2.1%) today</div>
          {wallet.isConnected && (
            <div className="mt-2">
              <Badge variant="outline">
                Connected: {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crypto Balances */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Assets</CardTitle>
                <AddTokenModal onAddToken={handleAddToken}>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Token
                  </Button>
                </AddTokenModal>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allBalances.map((crypto) => (
                  <div
                    key={`${crypto.symbol}-${crypto.chainId}`}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {crypto.symbol === "NXG" ? "N" : crypto.symbol[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{crypto.name}</p>
                          {crypto.isCustom && (
                            <Badge variant="outline" className="text-xs">
                              Custom
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{crypto.chainName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-semibold">{balanceVisible ? crypto.balance : "••••"}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{balanceVisible ? crypto.value : "••••"}</p>
                          <Badge
                            variant={crypto.change.startsWith("+") ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {crypto.change}
                          </Badge>
                        </div>
                      </div>
                      {crypto.isCustom && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveToken(crypto.address)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Transactions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <SendCryptoModal>
                <Button className="w-full gap-2" disabled={!wallet.isConnected}>
                  <ArrowUpRight className="w-4 h-4" />
                  Send Crypto
                </Button>
              </SendCryptoModal>
              <ReceiveCryptoModal>
                <Button variant="outline" className="w-full gap-2">
                  <ArrowDownLeft className="w-4 h-4" />
                  Receive
                </Button>
              </ReceiveCryptoModal>
              <Button variant="outline" className="w-full gap-2">
                Swap Tokens
              </Button>
              <Button variant="outline" className="w-full gap-2">
                Buy Crypto
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          tx.type === "received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {tx.type === "received" ? (
                          <ArrowDownLeft className="w-3 h-3" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.type === "received" ? `from ${tx.from}` : `to ${tx.to}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {tx.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}