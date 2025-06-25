"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet, ExternalLink, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

export function WalletConnect() {
  const { wallet, isMetaMaskInstalled, connectWallet, disconnectWallet } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum Mainnet"
      case 5:
        return "Goerli Testnet"
      case 137:
        return "Polygon"
      case 56:
        return "BSC"
      default:
        return `Chain ${chainId}`
    }
  }

  if (!isMetaMaskInstalled()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">MetaMask is required to use crypto features.</p>
          <Button asChild className="w-full">
            <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Install MetaMask
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!wallet.isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Connect your MetaMask wallet to enable crypto transactions.</p>
          <Button onClick={connectWallet} disabled={wallet.isLoading} className="w-full">
            {wallet.isLoading ? "Connecting..." : "Connect MetaMask"}
          </Button>
          {wallet.error && <p className="text-sm text-destructive">{wallet.error}</p>}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Connected Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Address</p>
            <p className="text-sm text-muted-foreground">{formatAddress(wallet.address!)}</p>
          </div>
          <Button variant="outline" size="sm" onClick={copyAddress}>
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Balance</p>
            <p className="text-sm text-muted-foreground">{wallet.balance} ETH</p>
          </div>
          <Badge variant="outline">{getNetworkName(wallet.chainId!)}</Badge>
        </div>

        <Button variant="outline" onClick={disconnectWallet} className="w-full">
          Disconnect Wallet
        </Button>
      </CardContent>
    </Card>
  )
}
