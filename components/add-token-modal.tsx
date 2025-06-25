"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  chainId: number
  chainName: string
  logoURI?: string
  balance?: string
  isCustom?: boolean
}

interface AddTokenModalProps {
  onAddToken: (token: Token) => void
  children: React.ReactNode
}

export function AddTokenModal({ onAddToken, children }: AddTokenModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [customToken, setCustomToken] = useState({
    address: "",
    symbol: "",
    name: "",
    decimals: 18,
    chainId: 1,
    chainName: "Ethereum",
  })
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [validationSuccess, setValidationSuccess] = useState<string | null>(null)

  // Popular tokens that can be added
  const popularTokens: Token[] = [
    {
      symbol: "USDC",
      name: "USD Coin",
      address: "0xA0b86a33E6441b8435b662303c0f218C8863c0c8",
      decimals: 6,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "AAVE",
      name: "Aave Token",
      address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
    {
      symbol: "CRV",
      name: "Curve DAO Token",
      address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
      logoURI: "/placeholder.svg?height=32&width=32",
    },
  ]

  const filteredTokens = popularTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const validateTokenAddress = async (address: string) => {
    setIsValidating(true)
    setValidationError(null)
    setValidationSuccess(null)

    try {
      // Basic address validation
      if (!address || address.length !== 42 || !address.startsWith("0x")) {
        throw new Error("Invalid Ethereum address format")
      }

      // In a real app, you would call the blockchain to validate the token
      // For demo purposes, we'll simulate validation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful validation
      setCustomToken((prev) => ({
        ...prev,
        address,
        symbol: prev.symbol || "TOKEN",
        name: prev.name || "Custom Token",
      }))

      setValidationSuccess("Token contract found and validated!")
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Failed to validate token")
    } finally {
      setIsValidating(false)
    }
  }

  const handleAddPopularToken = (token: Token) => {
    onAddToken(token)
    setIsOpen(false)
  }

  const SUPPORTED_BLOCKCHAINS = [
    { id: 1, name: "Ethereum", symbol: "ETH", rpc: "https://mainnet.infura.io" },
    { id: 56, name: "Binance Smart Chain", symbol: "BNB", rpc: "https://bsc-dataseed.binance.org" },
    { id: 137, name: "Polygon", symbol: "MATIC", rpc: "https://polygon-rpc.com" },
    { id: 43114, name: "Avalanche", symbol: "AVAX", rpc: "https://api.avax.network/ext/bc/C/rpc" },
    { id: 250, name: "Fantom", symbol: "FTM", rpc: "https://rpc.ftm.tools" },
    { id: 42161, name: "Arbitrum", symbol: "ETH", rpc: "https://arb1.arbitrum.io/rpc" },
    { id: 10, name: "Optimism", symbol: "ETH", rpc: "https://mainnet.optimism.io" },
    { id: 100, name: "Gnosis Chain", symbol: "xDAI", rpc: "https://rpc.gnosischain.com" },
  ]

  const handleAddCustomToken = () => {
    if (!customToken.address || !customToken.symbol || !customToken.name || !customToken.chainId) {
      setValidationError("Please fill in all required fields")
      return
    }

    const selectedBlockchain = SUPPORTED_BLOCKCHAINS.find((b) => b.id === customToken.chainId)

    const newToken: Token = {
      symbol: customToken.symbol.toUpperCase(),
      name: customToken.name,
      address: customToken.address,
      decimals: customToken.decimals,
      chainId: customToken.chainId,
      chainName: selectedBlockchain?.name || "Unknown",
      isCustom: true,
      balance: "0",
    }

    onAddToken(newToken)
    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setCustomToken({
      address: "",
      symbol: "",
      name: "",
      decimals: 18,
      chainId: 1,
      chainName: "Ethereum",
    })
    setValidationError(null)
    setValidationSuccess(null)
    setSearchQuery("")
  }

  const handleClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Token
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="popular" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-64">
              <div className="space-y-2">
                {filteredTokens.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No tokens found</p>
                  </div>
                ) : (
                  filteredTokens.map((token) => (
                    <div
                      key={token.address}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {token.symbol[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{token.symbol}</p>
                          <p className="text-xs text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleAddPopularToken(token)}>
                        Add
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain *</Label>
                <Select
                  value={customToken.chainId.toString()}
                  onValueChange={(value) =>
                    setCustomToken((prev) => ({
                      ...prev,
                      chainId: Number.parseInt(value),
                      chainName: SUPPORTED_BLOCKCHAINS.find((b) => b.id === Number.parseInt(value))?.name || "",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_BLOCKCHAINS.map((blockchain) => (
                      <SelectItem key={blockchain.id} value={blockchain.id.toString()}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                          {blockchain.name} ({blockchain.symbol})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Token Contract Address *</Label>
                <div className="flex gap-2">
                  <Input
                    id="address"
                    placeholder="0x..."
                    value={customToken.address}
                    onChange={(e) => setCustomToken((prev) => ({ ...prev, address: e.target.value }))}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => validateTokenAddress(customToken.address)}
                    disabled={!customToken.address || isValidating}
                    size="sm"
                  >
                    {isValidating ? "..." : "Validate"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol *</Label>
                  <Input
                    id="symbol"
                    placeholder="TOKEN"
                    value={customToken.symbol}
                    onChange={(e) => setCustomToken((prev) => ({ ...prev, symbol: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decimals">Decimals</Label>
                  <Input
                    id="decimals"
                    type="number"
                    value={customToken.decimals}
                    onChange={(e) =>
                      setCustomToken((prev) => ({ ...prev, decimals: Number.parseInt(e.target.value) || 18 }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Token Name *</Label>
                <Input
                  id="name"
                  placeholder="Custom Token"
                  value={customToken.name}
                  onChange={(e) => setCustomToken((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Network Info Display */}
              {customToken.chainId && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    <span className="font-semibold text-sm">
                      {SUPPORTED_BLOCKCHAINS.find((b) => b.id === customToken.chainId)?.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Chain ID: {customToken.chainId}</p>
                </div>
              )}

              {validationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              {validationSuccess && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{validationSuccess}</AlertDescription>
                </Alert>
              )}

              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold">Security Notice</span>
                </div>
                <p className="text-muted-foreground">
                  Only add tokens from trusted sources. Malicious tokens can drain your wallet.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                    <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer" className="gap-1">
                      Etherscan
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                  <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                    <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="gap-1">
                      BSCScan
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                  <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                    <a href="https://polygonscan.com" target="_blank" rel="noopener noreferrer" className="gap-1">
                      PolygonScan
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleAddCustomToken}
                disabled={!customToken.address || !customToken.symbol || !customToken.name || !customToken.chainId}
              >
                Add Custom Token
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
