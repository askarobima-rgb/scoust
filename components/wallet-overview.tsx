"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, TrendingUp, TrendingDown, PieChart, Activity } from "lucide-react"

interface WalletOverviewProps {
  walletAddress: string
}

export default function WalletOverview({ walletAddress }: WalletOverviewProps) {
  const [walletData, setWalletData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate loading wallet data
      const timer = setTimeout(() => {
        setWalletData({
          balance: 125430.5,
          change24h: 12.5,
          tokens: [
            { symbol: "SEI", amount: 45000, value: 67500, change: 8.2 },
            { symbol: "USDC", amount: 25000, value: 25000, change: 0.1 },
            { symbol: "ATOM", amount: 1200, value: 18600, change: -2.3 },
            { symbol: "OSMO", amount: 8500, value: 14330, change: 15.7 },
          ],
          transactions: [
            { type: "swap", from: "USDC", to: "SEI", amount: 5000, time: "2 hours ago" },
            { type: "stake", token: "ATOM", amount: 500, time: "1 day ago" },
            { type: "provide_liquidity", pool: "SEI/USDC", amount: 10000, time: "2 days ago" },
          ],
        })
        setLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [walletAddress])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              <span>Total Portfolio Value</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">
              ${walletData?.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center mt-2">
              {walletData?.change24h > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${walletData?.change24h > 0 ? "text-green-600" : "text-red-600"}`}>
                {walletData?.change24h > 0 ? "+" : ""}
                {walletData?.change24h}% (24h)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <span>Portfolio Diversity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {walletData?.tokens.map((token: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{token.symbol}</Badge>
                    <span className="text-sm">{token.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${token.value.toLocaleString()}</div>
                    <div className={`text-xs ${token.change > 0 ? "text-green-600" : "text-red-600"}`}>
                      {token.change > 0 ? "+" : ""}
                      {token.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-green-600" />
            <span>Token Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {walletData?.tokens.map((token: any, index: number) => {
              const percentage = (token.value / walletData.balance) * 100
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{token.symbol}</span>
                    <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {walletData?.transactions.map((tx: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium capitalize">{tx.type.replace("_", " ")}</div>
                  <div className="text-sm text-muted-foreground">
                    {tx.from && tx.to
                      ? `${tx.from} → ${tx.to}`
                      : tx.token
                        ? tx.token
                        : tx.pool
                          ? tx.pool
                          : "Transaction"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${tx.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{tx.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
