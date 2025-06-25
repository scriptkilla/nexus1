"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ArrowUpDown, RefreshCw, Settings, Info, AlertCircle, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SwapInterface() {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [fromToken, setFromToken] = useState("ETH")
  const [toToken, setToToken] = useState("NXG")
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapResult, setSwapResult] = useState<string | null>(null)
  const [swapError, setSwapError] = useState<string | null>(null)

  const tokens = [
    { symbol: "BTC", name: "Bitcoin", balance: "0.0234", price: "$52,340", rate: 52340 },
    { symbol: "ETH", name: "Ethereum", balance: "2.456", price: "$2,210", rate: 2210 },
    { symbol: "SOL", name: "Solana", balance: "45.67", price: "$63", rate: 63 },
    { symbol: "BSC", name: "Binance Coin", balance: "123.45", price: "$8", rate: 8 },
    { symbol: "EGLD", name: "Elrond", balance: "8.92", price: "$73", rate: 73 },
    { symbol: "NXG", name: "NEXUS Gaming", balance: "1,234.56", price: "$2", rate: 2 },
  ]

  const recentSwaps = [
    { from: "1.5 ETH", to: "750 NXG", time: "2h ago", status: "Completed" },
    { from: "50 NXG", to: "0.05 ETH", time: "1d ago", status: "Completed" },
    { from: "10 SOL", to: "500 NXG", time: "2d ago", status: "Completed" },
    { from: "0.001 BTC", to: "25 NXG", time: "3d ago", status: "Completed" },
  ]

  // Calculate exchange rate and amounts
  const calculateExchange = (amount: string, from: string, to: string) => {
    if (!amount || isNaN(Number(amount))) return ""

    const fromTokenData = tokens.find((t) => t.symbol === from)
    const toTokenData = tokens.find((t) => t.symbol === to)

    if (!fromTokenData || !toTokenData) return ""

    const fromValue = Number(amount) * fromTokenData.rate
    const toValue = fromValue / toTokenData.rate

    return toValue.toFixed(6)
  }

  // Handle amount changes
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    const calculated = calculateExchange(value, fromToken, toToken)
    setToAmount(calculated)
    setSwapError(null)
  }

  const handleToAmountChange = (value: string) => {
    setToAmount(value)
    const calculated = calculateExchange(value, toToken, fromToken)
    setFromAmount(calculated)
    setSwapError(null)
  }

  // Handle token changes
  const handleFromTokenChange = (token: string) => {
    if (token === toToken) {
      setToToken(fromToken)
    }
    setFromToken(token)

    if (fromAmount) {
      const calculated = calculateExchange(fromAmount, token, toToken)
      setToAmount(calculated)
    }
  }

  const handleToTokenChange = (token: string) => {
    if (token === fromToken) {
      setFromToken(toToken)
    }
    setToToken(token)

    if (fromAmount) {
      const calculated = calculateExchange(fromAmount, fromToken, token)
      setToAmount(calculated)
    }
  }

  // Swap tokens
  const swapTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount

    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
    setSwapError(null)
  }

  // Handle max button
  const handleMaxClick = () => {
    const fromTokenData = tokens.find((t) => t.symbol === fromToken)
    if (fromTokenData) {
      const maxAmount = fromTokenData.balance.replace(",", "")
      setFromAmount(maxAmount)
      const calculated = calculateExchange(maxAmount, fromToken, toToken)
      setToAmount(calculated)
    }
  }

  // Validate swap
  const validateSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      return "Please enter a valid amount"
    }

    const fromTokenData = tokens.find((t) => t.symbol === fromToken)
    if (!fromTokenData) {
      return "Invalid token selected"
    }

    const balance = Number(fromTokenData.balance.replace(",", ""))
    if (Number(fromAmount) > balance) {
      return `Insufficient ${fromToken} balance. You have ${fromTokenData.balance} ${fromToken}`
    }

    if (fromToken === toToken) {
      return "Cannot swap the same token"
    }

    return null
  }

  // Handle swap execution
  const handleSwap = async () => {
    const error = validateSwap()
    if (error) {
      setSwapError(error)
      return
    }

    setIsSwapping(true)
    setSwapError(null)
    setSwapResult(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const result = `Successfully swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`
      setSwapResult(result)
      setFromAmount("")
      setToAmount("")
      console.log("Swap completed:", { fromAmount, fromToken, toAmount, toToken })
    } catch (error) {
      setSwapError("Swap failed. Please try again.")
      console.error("Swap error:", error)
    } finally {
      setIsSwapping(false)
    }
  }

  // Get exchange rate display
  const getExchangeRate = () => {
    if (!fromAmount || !toAmount) return "1 ETH = 500 NXG"
    const rate = Number(toAmount) / Number(fromAmount)
    return `1 ${fromToken} = ${rate.toFixed(4)} ${toToken}`
  }

  // Refresh prices
  const refreshPrices = () => {
    console.log("Refreshing token prices...")
    alert("Token prices refreshed!")
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Swap Tokens</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover:bg-muted">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Swap settings and preferences</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Success Message */}
                {swapResult && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{swapResult}</AlertDescription>
                  </Alert>
                )}

                {/* Error Message */}
                {swapError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{swapError}</AlertDescription>
                  </Alert>
                )}

                {/* From Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="0.0"
                        value={fromAmount}
                        onChange={(e) => handleFromAmountChange(e.target.value)}
                        className="text-lg"
                        type="number"
                        min="0"
                        step="any"
                      />
                    </div>
                    <Select value={fromToken} onValueChange={handleFromTokenChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {token.symbol[0]}
                              </div>
                              {token.symbol}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Balance: {tokens.find((t) => t.symbol === fromToken)?.balance}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs hover:text-primary"
                          onClick={handleMaxClick}
                        >
                          MAX
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Use maximum available balance</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={swapTokens}
                        className="rounded-full w-10 h-10 p-0 hover:bg-muted"
                        disabled={isSwapping}
                      >
                        <ArrowUpDown className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Swap token positions</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* To Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="0.0"
                        value={toAmount}
                        onChange={(e) => handleToAmountChange(e.target.value)}
                        className="text-lg"
                        type="number"
                        min="0"
                        step="any"
                      />
                    </div>
                    <Select value={toToken} onValueChange={handleToTokenChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {token.symbol[0]}
                              </div>
                              {token.symbol}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Balance: {tokens.find((t) => t.symbol === toToken)?.balance}
                  </div>
                </div>

                {/* Swap Details */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exchange Rate</span>
                    <span>{getExchangeRate()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee</span>
                    <span>~$2.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price Impact</span>
                    <span className="text-green-600">{"<0.1%"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Minimum Received</span>
                    <span>
                      {toAmount ? (Number(toAmount) * 0.99).toFixed(6) : "0"} {toToken}
                    </span>
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSwap}
                      disabled={isSwapping || !fromAmount || !toAmount || Number(fromAmount) <= 0}
                    >
                      {isSwapping ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Swapping...
                        </>
                      ) : (
                        "Swap Tokens"
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Execute the token swap transaction</p>
                  </TooltipContent>
                </Tooltip>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-3 h-3" />
                  <span>Powered by decentralized liquidity pools</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Token Prices & Recent Swaps */}
          <div className="space-y-6">
            {/* Token Prices */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Token Prices</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={refreshPrices} className="hover:bg-muted">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh token prices</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tokens.map((token) => (
                    <Tooltip key={token.symbol}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {token.symbol[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{token.symbol}</p>
                              <p className="text-xs text-muted-foreground">{token.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">{token.price}</p>
                            <Badge variant="outline" className="text-xs">
                              +2.4%
                            </Badge>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Balance: {token.balance} {token.symbol}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Swaps */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Swaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSwaps.map((swap, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 transition-colors cursor-pointer">
                          <div>
                            <p className="text-sm font-medium">
                              {swap.from} → {swap.to}
                            </p>
                            <p className="text-xs text-muted-foreground">{swap.time}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {swap.status}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View transaction details</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
