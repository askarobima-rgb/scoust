"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Copy, Zap, Target, DollarSign, Activity, ExternalLink, Wallet } from "lucide-react"
import { useState, useEffect } from "react"

interface OpportunitiesProps {
  walletAddress: string
}

export default function Opportunities({ walletAddress }: OpportunitiesProps) {
  const alphaLeaderboard = [
    {
      rank: 1,
      address: "sei1xyz789abc123def456ghi789jkl012mno345pqr678",
      sharpeRatio: 2.84,
      returns: 156.7,
      winRate: 78.5,
      followers: 1247,
      lastTrade: "2h ago",
      strategy: "DeFi Yield + Arbitrage",
      totalVolume: 542000,
      averageTradeSize: 4500,
      profitFactor: 1.8,
    },
    {
      rank: 2,
      address: "sei1abc123def456ghi789jkl012mno345pqr678stu901",
      sharpeRatio: 2.61,
      returns: 134.2,
      winRate: 72.1,
      followers: 892,
      lastTrade: "4h ago",
      strategy: "MEV + LP Farming",
      totalVolume: 410000,
      averageTradeSize: 3800,
      profitFactor: 1.6,
    },
    {
      rank: 3,
      address: "sei1def456ghi789jkl012mno345pqr678stu901vwx234",
      sharpeRatio: 2.45,
      returns: 128.9,
      winRate: 69.8,
      followers: 634,
      lastTrade: "1h ago",
      strategy: "Swing Trading + Staking",
      totalVolume: 350000,
      averageTradeSize: 3200,
      profitFactor: 1.5,
    },
    {
      rank: 4,
      address: "sei1ghi789jkl012mno345pqr678stu901vwx234yza567",
      sharpeRatio: 2.32,
      returns: 119.4,
      winRate: 67.2,
      followers: 521,
      lastTrade: "6h ago",
      strategy: "Cross-Chain Arbitrage",
      totalVolume: 280000,
      averageTradeSize: 2500,
      profitFactor: 1.4,
    },
  ]

  const copyTradeOpportunities = [
    {
      wallet: "sei1xyz789abc123def456ghi789jkl012mno345pqr678",
      action: "Swap 1000 USDC → SEI",
      confidence: 94,
      expectedReturn: 12.5,
      timeframe: "24h",
      risk: "Medium",
    },
    {
      wallet: "sei1abc123def456ghi789jkl012mno345pqr678stu901",
      action: "Add LP to SEI/USDC Pool",
      confidence: 87,
      expectedReturn: 8.7,
      timeframe: "7d",
      risk: "Low",
    },
    {
      wallet: "sei1def456ghi789jkl012mno345pqr678stu901vwx234",
      action: "Stake 5000 SEI",
      confidence: 91,
      expectedReturn: 15.2,
      timeframe: "30d",
      risk: "Very Low",
    },
  ]

  const [keplr, setKeplr] = useState<any>(null)

  useEffect(() => {
    const initializeKeplr = async () => {
      if (window.keplr) {
        setKeplr(window.keplr)
      } else {
        // Suggest installing Keplr extension if not present
        alert("Please install Keplr wallet extension to use copy-trade features.")
      }
    }

    initializeKeplr()
  }, [])

  const handleCopyTrade = async (action: string) => {
    if (!keplr) {
      alert("Keplr wallet not found. Please install and refresh.")
      return
    }

    try {
      // Simulate Keplr wallet popup and transaction signing
      const chainId = "pacific-1" // Replace with actual chain ID
      await keplr.enable(chainId)
      const offlineSigner = keplr.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()
      const account = accounts[0]

      // Simulate transaction message
      const msg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
          fromAddress: account.address,
          toAddress: "sei1destinationaddress", // Replace with actual destination address
          amount: [{ denom: "usei", amount: "1000000" }], // Replace with actual amount
        },
      }

      const fee = {
        amount: [{ denom: "usei", amount: "5000" }],
        gas: "200000",
      }

      const signResult = await keplr.signAmino(chainId, account.address, {
        msgs: [msg],
        fee: fee,
        memo: `Copy trade: ${action}`,
      })

      console.log("Sign result:", signResult)

      // Simulate broadcast transaction
      alert(
        `Keplr Wallet Integration:\n\nAction: ${action}\n\nTransaction signed and broadcasted. Check console for details.`,
      )
    } catch (error: any) {
      console.error("Error during Keplr interaction:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleMirrorTrade = async (walletAddr: string) => {
    if (!keplr) {
      alert("Keplr wallet not found. Please install and refresh.")
      return
    }

    try {
      const chainId = "pacific-1" // Replace with actual chain ID
      await keplr.enable(chainId)
      const offlineSigner = keplr.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()
      const account = accounts[0]

      // Simulate calling CopyTradeRouter.sol on testnet
      alert(
        `Mirror Trade from ${walletAddr.slice(0, 12)}...\n\nCalling CopyTradeRouter.sol on testnet from ${account.address}`,
      )

      // In a real implementation, you would interact with the smart contract here
      // using a library like CosmJS.
    } catch (error: any) {
      console.error("Error during Keplr interaction:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const historicalPerformance = [
    { date: "2024-01-01", returns: 0.05 },
    { date: "2024-01-08", returns: 0.08 },
    { date: "2024-01-15", returns: -0.02 },
    { date: "2024-01-22", returns: 0.12 },
    { date: "2024-01-29", returns: 0.06 },
  ]

  return (
    <div className="space-y-6">
      {/* Alpha Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Alpha Leaderboard</span>
            <Badge variant="outline" className="text-green-600">
              Top Sharpe Wallets
            </Badge>
          </CardTitle>
          <CardDescription>Highest performing wallets ranked by risk-adjusted returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alphaLeaderboard.map((wallet) => (
              <div key={wallet.rank} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      #{wallet.rank}
                    </div>
                    <div>
                      <p className="font-mono text-sm">
                        {wallet.address.slice(0, 12)}...{wallet.address.slice(-8)}
                      </p>
                      <p className="text-xs text-muted-foreground">{wallet.strategy}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleMirrorTrade(wallet.address)}>
                      <Copy className="w-3 h-3 mr-1" />
                      Mirror
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Sharpe Ratio</p>
                    <p className="font-semibold text-green-600">{wallet.sharpeRatio}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Returns</p>
                    <p className="font-semibold text-blue-600">+{wallet.returns}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Win Rate</p>
                    <p className="font-semibold">{wallet.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Followers</p>
                    <p className="font-semibold">{wallet.followers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Trade</p>
                    <p className="font-semibold">{wallet.lastTrade}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Volume</p>
                    <p className="font-semibold">${wallet.totalVolume.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Profit Factor</p>
                    <p className="font-semibold">{wallet.profitFactor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Copy-Trade Router */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span>Copy-Trade Router</span>
            <Badge variant="outline" className="text-blue-600">
              <Wallet className="w-3 h-3 mr-1" />
              Keplr Ready
            </Badge>
          </CardTitle>
          <CardDescription>Mirror successful trades with one-click execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {copyTradeOpportunities.map((opportunity, index) => (
              <Alert key={index} className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <Zap className="w-4 h-4 text-blue-600" />
                <AlertDescription>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">{opportunity.action}</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        From: {opportunity.wallet.slice(0, 12)}...{opportunity.wallet.slice(-8)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleCopyTrade(opportunity.action)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Mirror Trade
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600">Confidence</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={opportunity.confidence} className="flex-1 h-1" />
                        <span className="font-medium">{opportunity.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-blue-600">Expected Return</p>
                      <p className="font-semibold text-green-600">+{opportunity.expectedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Timeframe</p>
                      <p className="font-semibold">{opportunity.timeframe}</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Risk Level</p>
                      <Badge
                        variant={
                          opportunity.risk === "Very Low" || opportunity.risk === "Low"
                            ? "default"
                            : opportunity.risk === "Medium"
                              ? "secondary"
                              : "destructive"
                        }
                        size="sm"
                      >
                        {opportunity.risk}
                      </Badge>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <TrendingUp className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold mb-2">Alpha Signals</h3>
            <p className="text-sm text-muted-foreground mb-4">Real-time opportunities from top performers</p>
            <Button size="sm" className="w-full">
              <Activity className="w-4 h-4 mr-2" />
              View All Signals
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Copy className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Auto Copy-Trade</h3>
            <p className="text-sm text-muted-foreground mb-4">Automated mirroring of successful strategies</p>
            <Button size="sm" className="w-full">
              <Target className="w-4 h-4 mr-2" />
              Setup Auto-Copy
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <DollarSign className="w-12 h-12 mx-auto text-purple-500 mb-4" />
            <h3 className="font-semibold mb-2">Yield Optimization</h3>
            <p className="text-sm text-muted-foreground mb-4">Maximize returns across DeFi protocols</p>
            <Button size="sm" className="w-full">
              <Zap className="w-4 h-4 mr-2" />
              Optimize Yield
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200">
        <CardHeader>
          <CardTitle>Copy-Trade Performance</CardTitle>
          <CardDescription>Your mirrored trades performance summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">+24.7%</div>
              <p className="text-sm text-muted-foreground">Total Returns</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">73.2%</div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
              <p className="text-sm text-muted-foreground">Active Mirrors</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">2.1</div>
              <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Historical Performance</h4>
            <div className="flex space-x-4 overflow-x-auto">
              {historicalPerformance.map((data) => (
                <div key={data.date} className="text-center">
                  <p className="text-xs text-muted-foreground">{data.date}</p>
                  <p className="text-sm font-medium text-green-600">+{data.returns * 100}%</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
