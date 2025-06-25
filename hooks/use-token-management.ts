"use client"

import { useState, useEffect } from "react"

interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  chainId: number
  chainName: string
  balance: string
  value: string
  change: string
  color: string
  isCustom: boolean
  logoURI?: string
}

const DEFAULT_TOKENS: Token[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "0x0000000000000000000000000000000000000001",
    decimals: 8,
    chainId: 1,
    chainName: "Ethereum",
    balance: "110.0234",
    value: "$106,245.67",
    change: "+2.4%",
    color: "bg-orange-500",
    isCustom: false,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    chainId: 1,
    chainName: "Ethereum",
    balance: "222.456",
    value: "$5,432.10",
    change: "+1.8%",
    color: "bg-blue-500",
    isCustom: false,
  },
  {
    symbol: "SOL",
    name: "Solana",
    address: "0x0000000000000000000000000000000000000002",
    decimals: 9,
    chainId: 1,
    chainName: "Ethereum",
    balance: "45.67",
    value: "$2,876.43",
    change: "-0.5%",
    color: "bg-purple-500",
    isCustom: false,
  },
  {
    symbol: "BSC",
    name: "Binance Smart Chain",
    address: "0x0000000000000000000000000000000000000003",
    decimals: 18,
    chainId: 56,
    chainName: "Binance Smart Chain",
    balance: "123.45",
    value: "$987.65",
    change: "+3.2%",
    color: "bg-yellow-500",
    isCustom: false,
  },
  {
    symbol: "EGLD",
    name: "Elrond",
    address: "0x0000000000000000000000000000000000000004",
    decimals: 18,
    chainId: 1,
    chainName: "Ethereum",
    balance: "8.92",
    value: "$654.32",
    change: "+1.1%",
    color: "bg-green-500",
    isCustom: false,
  },
  {
    symbol: "NXG",
    name: "NEXUS Gaming Token",
    address: "0x0000000000000000000000000000000000000005",
    decimals: 18,
    chainId: 1,
    chainName: "Ethereum",
    balance: "1,234.56",
    value: "$2,469.12",
    change: "+5.7%",
    color: "bg-gradient-to-r from-purple-500 to-blue-500",
    isCustom: false,
  },
]

export function useTokenManagement() {
  const [tokens, setTokens] = useState<Token[]>(() => {
    // Load from localStorage on initialization
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexus-custom-tokens")
      if (saved) {
        try {
          const customTokens = JSON.parse(saved)
          return [...DEFAULT_TOKENS, ...customTokens]
        } catch (error) {
          console.error("Failed to parse saved tokens:", error)
        }
      }
    }
    return DEFAULT_TOKENS
  })

  // Save custom tokens to localStorage whenever tokens change
  useEffect(() => {
    const customTokens = tokens.filter((token) => token.isCustom)
    localStorage.setItem("nexus-custom-tokens", JSON.stringify(customTokens))
  }, [tokens])

  const addToken = (newToken: {
    symbol: string
    name: string
    address: string
    decimals: number
    chainId: number
    chainName: string
    logoURI?: string
  }) => {
    // Check if token already exists on the same chain
    const exists = tokens.some(
      (token) => token.address.toLowerCase() === newToken.address.toLowerCase() && token.chainId === newToken.chainId,
    )
    if (exists) {
      throw new Error("Token already exists in your wallet on this blockchain")
    }

    const token: Token = {
      ...newToken,
      balance: "0",
      value: "$0.00",
      change: "+0.0%",
      color: "bg-gray-500",
      isCustom: true,
    }

    setTokens((prev) => [...prev, token])
    return token
  }

  const removeToken = (address: string) => {
    setTokens((prev) => prev.filter((token) => token.address.toLowerCase() !== address.toLowerCase()))
  }

  const updateTokenBalance = (address: string, balance: string, value?: string) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.address.toLowerCase() === address.toLowerCase()
          ? { ...token, balance, value: value || token.value }
          : token,
      ),
    )
  }

  const getTokenByAddress = (address: string) => {
    return tokens.find((token) => token.address.toLowerCase() === address.toLowerCase())
  }

  const getCustomTokens = () => {
    return tokens.filter((token) => token.isCustom)
  }

  const getDefaultTokens = () => {
    return tokens.filter((token) => !token.isCustom)
  }

  const getTokensByChain = (chainId: number) => {
    return tokens.filter((token) => token.chainId === chainId)
  }

  const getSupportedChains = () => {
    const chains = [...new Set(tokens.map((token) => token.chainId))]
    return chains.map((chainId) => {
      const token = tokens.find((t) => t.chainId === chainId)
      return {
        chainId,
        chainName: token?.chainName || "Unknown",
      }
    })
  }

  return {
    tokens,
    addToken,
    removeToken,
    updateTokenBalance,
    getTokenByAddress,
    getCustomTokens,
    getDefaultTokens,
    getTokensByChain,
    getSupportedChains,
  }
}
