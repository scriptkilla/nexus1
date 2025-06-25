"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useWallet } from "@/hooks/use-wallet"
import { Send, X, ExternalLink, Wallet, AlertCircle, CheckCircle2, Copy } from "lucide-react"
import { toast } from "sonner"

interface SendCryptoModalProps {
  children: React.ReactNode
}

export function SendCryptoModal({ children }: SendCryptoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { wallet, connectWallet, sendTransaction, isMetaMaskInstalled } = useWallet()

  const handleSend = async () => {
    setError(null)
    setTxHash(null)

    if (!wallet.isConnected) {
      const connected = await connectWallet()
      if (!connected) {
        setError("Failed to connect wallet. Please connect MetaMask.")
        return
      }
    }

    if (!recipientAddress || !recipientAddress.startsWith("0x") || recipientAddress.length !== 42) {
      setError("Please enter a valid Ethereum recipient address.")
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount to send.")
      return
    }

    const amountFloat = Number.parseFloat(amount)
    const walletBalance = Number.parseFloat(wallet.balance || "0")

    if (amountFloat > walletBalance) {
      setError(`Insufficient balance. You have ${wallet.balance} ETH.`)
      return
    }

    setIsProcessing(true)

    try {
      const transactionHash = await sendTransaction(recipientAddress, amount, message)
      setTxHash(transactionHash)
      toast.success("Transaction sent successfully!", {
        description: `Sent ${amount} ETH to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
        action: {
          label: "View Tx",
          onClick: () => window.open(`https://etherscan.io/tx/${transactionHash}`, "_blank"),
        },
      })
      resetForm()
    } catch (err: any) {
      console.error("Send transaction failed:", err)
      setError(err.message || "Transaction failed. Please try again.")
      toast.error("Transaction failed", { description: err.message || "An unknown error occurred." })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setRecipientAddress("")
    setAmount("")
    setMessage("")
    setError(null)
    setTxHash(null)
  }

  const handleClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
    }
  }

  const quickAmounts = ["0.001", "0.01", "0.1", "1"]

  if (!isMetaMaskInstalled()) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Install MetaMask
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>MetaMask browser extension is required to send crypto.</AlertDescription>
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
            <Send className="w-5 h-5" />
            Send Crypto (ETH)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {txHash && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="space-y-2">
                  <p className="font-semibold">Transaction initiated!</p>
                  <p className="text-sm">
                    Check your wallet for confirmation.
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

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!wallet.isConnected && (
            <Alert>
              <Wallet className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>Connect your wallet to send crypto</span>
                  <Button size="sm" onClick={connectWallet} disabled={wallet.isLoading}>
                    {wallet.isLoading ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

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

          <div className="space-y-2">
            <Label htmlFor="recipientAddress">Recipient Address</Label>
            <Input
              id="recipientAddress"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              disabled={!wallet.isConnected || isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
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

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              placeholder="For your great content!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
              disabled={!wallet.isConnected || isProcessing}
            />
            <p className="text-xs text-muted-foreground text-right">{message.length}/100</p>
          </div>

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

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => handleClose(false)} className="flex-1" disabled={isProcessing}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!wallet.isConnected || !amount || Number.parseFloat(amount) <= 0 || isProcessing || !recipientAddress}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send ETH
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}