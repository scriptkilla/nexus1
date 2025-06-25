"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet, Copy, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface ReceiveCryptoModalProps {
  children: React.ReactNode
}

export function ReceiveCryptoModal({ children }: ReceiveCryptoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { wallet, connectWallet, isMetaMaskInstalled } = useWallet()

  const handleCopyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      toast.success("Address copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setCopied(false)
    }
  }

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
              <AlertDescription>MetaMask browser extension is required to view your wallet address.</AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="gap-2">
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
            <Wallet className="w-5 h-5" />
            Receive Crypto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!wallet.isConnected && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>Connect your wallet to view your address.</span>
                  <Button size="sm" onClick={connectWallet} disabled={wallet.isLoading}>
                    {wallet.isLoading ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {wallet.isConnected && (
            <>
              <div className="space-y-2">
                <Label htmlFor="walletAddress">Your Wallet Address (ETH)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="walletAddress"
                    value={wallet.address || ""}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={handleCopyAddress} size="icon" variant="outline">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Share this address to receive Ethereum (ETH) or ERC-20 tokens.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg text-sm">
                <div className="flex justify-between">
                  <span>Network</span>
                  <span>{wallet.chainId === 1 ? "Ethereum Mainnet" : `Chain ${wallet.chainId}`}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Current Balance</span>
                  <span className="font-semibold">{wallet.balance} ETH</span>
                </div>
              </div>

              {/* Placeholder for QR Code - requires a library like 'qrcode.react' */}
              <div className="bg-muted aspect-square rounded-lg flex items-center justify-center p-4">
                <div className="text-center text-muted-foreground">
                  <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>QR Code for your address would appear here.</p>
                  <p className="text-xs">Install 'qrcode.react' to enable this feature.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}