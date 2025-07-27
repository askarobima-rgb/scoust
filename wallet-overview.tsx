"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, Coins, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface WalletOverviewProps {
  walletAddress: string
}

export default function WalletOverview({ walletAddress }: WalletOverviewProps) {
  const portfolioData = {
    totalValue: 45678.9,
    change24h: 12.5,
    transactions: 1247,
    activeTokens: 23,
    stakingRewards: 234.56,
    liquidityProvided: 12345.67,
  }

  const topTokens = [
    { symbol: "SEI", amount: 15000, value: 18750, change: 8.2 },
    { symbol: "USDC", amount: 8500, value: 8500, change: 0.1 },
    { symbol: "ATOM", amount: 450, value: 5400, change: -2.3 },
    { symbol: "OSMO", amount: 2100, value: 3150, change: 15.7 },
  ]

  const recentActivity = [
    { type: "Swap", from: "USDC", to: "SEI", amount: "500", time: "2 min ago", status: "success" },
    { type: "Stake", token: "SEI", amount: "1000", time: "1 hour ago", status: "success" },
    { type: "LP Add", pool: "SEI/USDC", amount: "2500", time: "3 hours ago", status: "success" },
    { type: "Transfer", token: "ATOM", amount: "50", time: "6 hours ago", status: "success" },
  ]

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Portfolio Overview
              <Badge variant="outline" className="text-green-600">
                Active
              </Badge>
            </CardTitle>
            <CardDescription>
              Wallet: {walletAddress.slice(0, 20)}...{walletAddress.slice(-10)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {portfolioData.change24h > 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        portfolioData.change24h > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {portfolioData.change24h > 0 ? "+" : ""}
                      {portfolioData.change24h}% (24h)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-semibold">{portfolioData.transactions.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Staking Rewards</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${portfolioData.stakingRewards.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LP Provided</p>
                  <p className="text-lg font-semibold text-blue-600">
                    ${portfolioData.liquidityProvided.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Activity Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">87</div>
                <p className="text-sm text-muted-foreground">Very Active</p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Trading</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>DeFi</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Staking</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="w-5 h-5" />
            <span>Top Holdings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTokens.map((token, index) => (
              <div key={token.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {token.symbol[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.amount.toLocaleString()} tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${token.value.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    {token.change > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs ${token.change > 0 ? "text-green-600" : "text-red-600"}`}>
                      {token.change > 0 ? "+" : ""}
                      {token.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === "Swap" && `${activity.from} → ${activity.to}`}
                      {activity.type === "Stake" && `${activity.token}`}
                      {activity.type === "LP Add" && `${activity.pool}`}
                      {activity.type === "Transfer" && `${activity.token}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{activity.amount}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
