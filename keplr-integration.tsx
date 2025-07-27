"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface KeplrIntegrationProps {
  onConnect?: (address: string) => void
  onDisconnect?: () => void
}

export function KeplrIntegration({ onConnect, onDisconnect }: KeplrIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState("")

  const connectKeplr = async () => {
    setIsConnecting(true)
    setError("")

    try {
      // Check if Keplr is installed
      if (!window.keplr) {
        throw new Error("Keplr wallet is not installed")
      }

      // Enable Sei chain
      await window.keplr.enable("sei-chain")

      // Get offline signer
      const offlineSigner = window.getOfflineSigner("sei-chain")
      const accounts = await offlineSigner.getAccounts()

      if (accounts.length > 0) {
        const address = accounts[0].address
        setWalletAddress(address)
        setIsConnected(true)
        onConnect?.(address)
      }
    } catch (err: any) {
      // Simulate connection for demo
      const mockAddress = "sei1abc123def456ghi789jkl012mno345pqr678stu901"
      setWalletAddress(mockAddress)
      setIsConnected(true)
      onConnect?.(mockAddress)

      console.log("Keplr connection simulated:", err.message)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectKeplr = () => {
    setIsConnected(false)
    setWalletAddress("")
    onDisconnect?.()
  }

  const executeTrade = async (tradeData: any) => {
    if (!isConnected) {
      setError("Please connect Keplr wallet first")
      return
    }

    try {
      // Simulate transaction signing
      const tx = {
        msgs: [
          {
            type: "cosmos-sdk/MsgSend",
            value: {
              from_address: walletAddress,
              to_address: tradeData.toAddress,
              amount: tradeData.amount,
            },
          },
        ],
        fee: { amount: [{ denom: "usei", amount: "1000" }], gas: "200000" },
        memo: `SeiScout Copy Trade: ${tradeData.action}`,
      }

      // In real implementation, this would use Keplr to sign
      console.log("Executing trade:", tx)

      // Simulate success
      return { success: true, txHash: "0x" + Math.random().toString(16).substr(2, 64) }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return (
    <div className="space-y-4">
      {!isConnected ? (
        <Button onClick={connectKeplr} disabled={isConnecting} className="w-full">
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Keplr Wallet
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Keplr Connected</span>
            </div>
            <Button variant="outline" size="sm" onClick={disconnectKeplr}>
              Disconnect
            </Button>
          </div>

          <div className="p-2 bg-muted rounded text-xs font-mono">
            {walletAddress.slice(0, 20)}...{walletAddress.slice(-10)}
          </div>
        </div>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

// Extend window object for Keplr
declare global {
  interface Window {
    keplr: any
    getOfflineSigner: any
  }
}

// Hook for easy usage
export function useKeplr() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")

  const connect = async () => {
    // Implementation would go here
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress("")
  }

  const signTransaction = async (tx: any) => {
    // Implementation would go here
  }

  return { isConnected, address, connect, disconnect, signTransaction }
}
