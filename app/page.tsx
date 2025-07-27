"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Zap, Activity, Target, Copy, Clock } from "lucide-react"
import { useWebSocket } from "@/components/websocket-provider"

function SeiScoutLandingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [walletAddress, setWalletAddress] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [latency, setLatency] = useState(0)
  const { isConnected: wsConnected } = useWebSocket()

  // Demo wallet addresses
  const demoWallets = [
    "sei1abc123def456ghi789jkl012mno345pqr678stu901",
    "sei1def456ghi789jkl012mno345pqr678stu901vwx234",
    "sei1ghi789jkl012mno345pqr678stu901vwx234yza567",
  ]

  const handleSearch = async () => {
    if (!walletAddress) return

    setIsAnalyzing(true)
    const startTime = Date.now()

    // Simulate Sei Network's sub-400ms analysis, adjusted for a more noticeable demo
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 500)) // 500ms to 1000ms

    const endTime = Date.now()
    setLatency(endTime - startTime)
    setIsAnalyzing(false)
    router.push(`/dashboard?addr=${walletAddress}`) // Redirect to dashboard page
  }

  const handleDemoClick = async (address: string) => {
    setWalletAddress(address)
    // Use the same analysis logic as handleSearch
    setIsAnalyzing(true)
    const startTime = Date.now()
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 500))
    const endTime = Date.now()
    setLatency(endTime - startTime)
    setIsAnalyzing(false)
    router.push(`/dashboard?addr=${address}`) // Redirect to dashboard page
  }

  // Keplr Integration (Simplified) - This logic should ideally be in Opportunities component or a shared hook
  // For now, keeping it here for the "Alpha Signals" button on the landing page.
  const handleCopyTrade = async () => {
    if (!walletAddress) {
      alert("Please enter a wallet address first.")
      return
    }

    if (typeof window === "undefined" || !window.keplr) {
      alert("Keplr extension not found. Please install it.")
      return
    }

    try {
      // Suggest chain if not already added
      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || "" // Replace with your actual chain ID
      const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || ""
      const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || ""
      const restEndpoint = process.env.NEXT_PUBLIC_REST_ENDPOINT || ""
      const stakeCurrency = process.env.NEXT_PUBLIC_STAKE_CURRENCY || ""
      const stakeSymbol = process.env.NEXT_PUBLIC_STAKE_SYMBOL || ""
      const coinDecimals = Number(process.env.NEXT_PUBLIC_COIN_DECIMALS) || 6

      if (chainId && chainName && rpcEndpoint && restEndpoint && stakeCurrency && stakeSymbol && coinDecimals) {
        await window.keplr.experimentalSuggestChain({
          chainId: chainId,
          chainName: chainName,
          rpc: rpcEndpoint,
          rest: restEndpoint,
          stakeCurrency: {
            coinDenom: stakeSymbol,
            coinMinimalDenom: stakeCurrency,
            coinDecimals: coinDecimals,
          },
          bip44: { coinType: 118 },
          bech32Config: {
            bech32PrefixAccAddr: "sei",
            bech32PrefixAccPub: "seipub",
            bech32PrefixValAddr: "seivaloper",
            bech32PrefixValPub: "seivaloperpub",
            bech32PrefixConsAddr: "seivalcons",
            bech32PrefixConsPub: "seivalconspub",
          },
          currencies: [
            {
              coinDenom: stakeSymbol,
              coinMinimalDenom: stakeCurrency,
              coinDecimals: coinDecimals,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: stakeSymbol,
              coinMinimalDenom: stakeCurrency,
              coinDecimals: coinDecimals,
            },
          ],
          coinType: 118,
          gasPriceStep: {
            low: 0.1,
            average: 0.1,
            high: 0.1,
          },
        })
      }

      // Enable Keplr for the chain
      await window.keplr.enable(chainId)

      // Get Keplr offline signer
      const offlineSigner = window.keplr.getOfflineSigner(chainId)

      // Get accounts
      const accounts = await offlineSigner.getAccounts()

      if (accounts.length === 0) {
        alert("No accounts found in Keplr for this chain.")
        return
      }

      const userAddress = accounts[0].address

      // Simulate copy-trade logic (replace with actual transaction)
      alert(`Copying trades from ${walletAddress} to ${userAddress}... (Simulated)`)
    } catch (error: any) {
      console.error("Keplr integration error:", error)
      alert(`Keplr error: ${error.message || error.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  SeiScout Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Insight &lt; 3 s</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Clock className="w-3 h-3 mr-1" />
                {latency}ms latency
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Target className="w-3 h-3 mr-1" />
                DeFi Radar Active
              </Badge>
              <Badge
                variant="outline"
                className={wsConnected ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}
              >
                {wsConnected ? "WebSocket Connected" : "WebSocket Disconnected"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Search */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Stream Data Blok Sei, Deteksi Pola & Alert Sub-400ms</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            PulseScore real-time, FlashAlert otomatis, dan DeFi Radar untuk alpha signals terbaik di Sei Network.
          </p>

          {/* Large Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter Sei wallet address for instant analysis..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-blue-200 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isAnalyzing || !walletAddress}
                className="h-14 px-8 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-5 h-5 mr-2 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Analisis Instan
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Demo Wallets */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Try demo wallets:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {demoWallets.map((address, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoClick(address)}
                  className="font-mono text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {address.slice(0, 8)}...{address.slice(-6)}
                </Button>
              ))}
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="text-center p-6">
              <Activity className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">PulseScore Real-time</h3>
              <p className="text-sm text-muted-foreground">Skor aktivitas wallet yang update setiap blok</p>
            </Card>

            <Card className="text-center p-6">
              <Zap className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="font-semibold mb-2">FlashAlert System</h3>
              <p className="text-sm text-muted-foreground">Notifikasi anomali dalam milidetik</p>
            </Card>

            <Card className="text-center p-6">
              <Target className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">Alpha Signals</h3>
              <p className="text-sm text-muted-foreground">Copy-trade dari wallet terbaik</p>
              <Button
                onClick={handleCopyTrade}
                className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
              >
                Copy Trade
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 flex items-center justify-center">
      <div className="text-center">
        <Activity className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default function SeiScoutLanding() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SeiScoutLandingContent />
    </Suspense>
  )
}
