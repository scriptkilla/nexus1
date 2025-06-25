"use client"

import { useState, useEffect, useCallback } from "react"

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  isLoading: boolean
  error: string | null
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (data: any) => void) => void
      removeListener?: (event: string, callback: (data: any) => void) => void
      isMetaMask?: boolean
    }
  }
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isLoading: false,
    error: null,
  })

  // Check if MetaMask is installed
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask
  }, [])

  // Connect to MetaMask
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setWallet((prev) => ({ ...prev, error: "MetaMask is not installed. Please install MetaMask to continue." }))
      return false
    }

    setWallet((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Request account access
      const accounts = await window.ethereum!.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect your MetaMask wallet.")
      }

      const address = accounts[0]

      // Get chain ID
      const chainId = await window.ethereum!.request({ method: "eth_chainId" })

      // Get balance
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })

      // Convert balance from wei to ETH
      const ethBalance = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(6)

      setWallet({
        isConnected: true,
        address,
        balance: ethBalance,
        chainId: Number.parseInt(chainId, 16),
        isLoading: false,
        error: null,
      })

      return true
    } catch (error: any) {
      console.error("Wallet connection error:", error)
      setWallet((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to connect wallet",
      }))
      return false
    }
  }, [isMetaMaskInstalled])

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isLoading: false,
      error: null,
    })
  }, [])

  // Send ETH transaction
  const sendTransaction = useCallback(
    async (to: string, amount: string, message?: string) => {
      if (!wallet.isConnected || !wallet.address) {
        throw new Error("Wallet not connected")
      }

      if (!window.ethereum) {
        throw new Error("MetaMask not found")
      }

      try {
        // Validate inputs
        if (!to || !amount) {
          throw new Error("Invalid recipient address or amount")
        }

        const amountFloat = Number.parseFloat(amount)
        if (isNaN(amountFloat) || amountFloat <= 0) {
          throw new Error("Invalid amount")
        }

        // Convert ETH amount to wei (hex)
        const amountInWei = Math.floor(amountFloat * Math.pow(10, 18))
        const amountHex = `0x${amountInWei.toString(16)}`

        // Get current gas price
        const gasPrice = await window.ethereum.request({ method: "eth_gasPrice" })

        // Prepare transaction parameters
        const transactionParameters = {
          to: to.toLowerCase(),
          from: wallet.address.toLowerCase(),
          value: amountHex,
          gas: "0x5208", // 21000 gas limit for simple ETH transfer
          gasPrice: gasPrice,
          data: message ? `0x${Buffer.from(message, "utf8").toString("hex")}` : "0x",
        }

        console.log("Sending transaction:", transactionParameters)

        // Send transaction
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })

        console.log("Transaction sent:", txHash)
        return txHash
      } catch (error: any) {
        console.error("Transaction error:", error)
        throw new Error(error.message || "Transaction failed")
      }
    },
    [wallet],
  )

  // Refresh wallet data
  const refreshWallet = useCallback(async () => {
    if (!wallet.isConnected || !wallet.address) return

    try {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [wallet.address, "latest"],
      })

      const ethBalance = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(6)

      setWallet((prev) => ({ ...prev, balance: ethBalance }))
    } catch (error) {
      console.error("Failed to refresh wallet:", error)
    }
  }, [wallet.isConnected, wallet.address])

  // Listen for account and network changes
  useEffect(() => {
    if (!isMetaMaskInstalled() || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Accounts changed:", accounts)
      if (accounts.length === 0) {
        disconnectWallet()
      } else if (accounts[0] !== wallet.address) {
        connectWallet()
      }
    }

    const handleChainChanged = (chainId: string) => {
      console.log("Chain changed:", chainId)
      setWallet((prev) => ({ ...prev, chainId: Number.parseInt(chainId, 16) }))
      refreshWallet()
    }

    const handleDisconnect = () => {
      console.log("Wallet disconnected")
      disconnectWallet()
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)
    window.ethereum.on("disconnect", handleDisconnect)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
        window.ethereum.removeListener("disconnect", handleDisconnect)
      }
    }
  }, [isMetaMaskInstalled, disconnectWallet, connectWallet, wallet.address, refreshWallet])

  // Check if already connected on mount
  useEffect(() => {
    if (isMetaMaskInstalled() && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connectWallet()
          }
        })
        .catch((error) => {
          console.error("Failed to check existing connection:", error)
        })
    }
  }, [isMetaMaskInstalled, connectWallet])

  return {
    wallet,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    refreshWallet,
  }
}
