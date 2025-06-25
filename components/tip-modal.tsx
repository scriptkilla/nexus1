"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWallet } from "@/hooks/use-wallet"
import { Zap, Send, X, ExternalLink, Wallet, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TipModalProps {
  recipient: {
    name: string
    username: string
    avatar?: string
  }
  postContent?: string
  children: React.ReactNode
}

export function TipModal({ recipient, postContent, children }: TipModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { wallet, connectWallet, sendTransaction, isMetaMaskInstalled } = useWallet()

  // Demo recipient address (in production, this would come from user's profile)
  const recipientAddress = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d4d4"

  const handleTip = async () => {
    setError(null)
    setTxHash(null)

    // Connect wallet if not connected
    if (!wallet.isConnected) {
      const connected = await connectWallet()
      if (!connected) {
        setError("Failed to connect wallet. Please try again.")
        return
      }
    }

    // Validate amount
    if (!amount || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    const amountFloat = Number.parseFloat(amount)
    const walletBalance = Number.parseFloat(wallet.balance || "0")

    if (amountFloat > walletBalance) {
      setError(`Insufficient balance. You have ${wallet.balance} ETH`)
      return
    }

    setIsProcessing(true)

    try {
      console.log("Sending tip:", {
        to: recipientAddress,
        amount: amount,
        message: message,
      })

      const transactionHash = await sendTransaction(recipientAddress, amount, message)

      console.log("Tip sent successfully:", transactionHash)
      setTxHash(transactionHash)

      // Reset form
      setAmount("")
      setMessage("")
    } catch (error: any) {
      console.error("Tip failed:", error)
      setError(error.message || "Transaction failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const resetModal = () => {
    setAmount("")
    setMessage("")
    setError(null)
    setTxHash(null)
    setIsProcessing(false)
  }

  const handleClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset modal state when closing
      setTimeout(resetModal, 300)
    }
  }

  // Quick amount buttons
  const quickAmounts = ["0.001", "0.01", "0.1", "1"]

  if (!isMetaMaskInstalled()) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Install MetaMask
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>MetaMask browser extension is required to send crypto tips.</AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Install MetaMask
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Send ETH Tip
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Success State */}
          {txHash && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="space-y-2">
                  <p className="font-semibold">Tip sent successfully!</p>
                  <p className="text-sm">
                    Sent {amount} ETH to {recipient.name}
                  </p>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a
                      href={`https://etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-800"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View on Etherscan
                    </a>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Wallet Connection Status */}
          {!wallet.isConnected && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>Connect your wallet to send tips</span>
                  <Button size="sm" onClick={connectWallet} disabled={wallet.isLoading}>
                    {wallet.isLoading ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Wallet Info */}
          {wallet.isConnected && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Connected Wallet</span>
                <span className="font-mono">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>Balance</span>
                <span className="font-semibold">{wallet.balance} ETH</span>
              </div>
            </div>
          )}

          {/* Recipient Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar>
              <AvatarImage src={recipient.avatar || "/placeholder.svg"} />
              <AvatarFallback>{recipient.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{recipient.name}</p>
              <p className="text-sm text-muted-foreground">{recipient.username}</p>
            </div>
          </div>

          {/* Post Preview */}
          {postContent && (
            <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
              <p className="text-sm line-clamp-2">{postContent}</p>
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (ETH)</label>
            <Input
              type="number"
              placeholder="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
              disabled={!wallet.isConnected || isProcessing}
              step="0.001"
              min="0"
            />
            <div className="flex gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount)}
                  className="flex-1"
                  disabled={!wallet.isConnected || isProcessing}
                >
                  {quickAmount}
                </Button>
              ))}
            </div>
            {amount && (
              <p className="text-sm text-muted-foreground">≈ ${(Number.parseFloat(amount) * 2200).toFixed(2)} USD</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Message (Optional)</label>
            <Input
              placeholder="Great content! Keep it up 🚀"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
              disabled={!wallet.isConnected || isProcessing}
            />
            <p className="text-xs text-muted-foreground text-right">{message.length}/100</p>
          </div>

          {/* Gas Fee Info */}
          {wallet.isConnected && (
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <div className="flex justify-between">
                <span>Network Fee</span>
                <span>~$3-8 USD</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Network</span>
                <span>{wallet.chainId === 1 ? "Ethereum Mainnet" : `Chain ${wallet.chainId}`}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => handleClose(false)} className="flex-1" disabled={isProcessing}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleTip}
              disabled={!wallet.isConnected || !amount || Number.parseFloat(amount) <= 0 || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : !wallet.isConnected ? (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send {amount || "0"} ETH
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
