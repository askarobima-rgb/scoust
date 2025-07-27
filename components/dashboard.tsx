"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Activity, Zap, Target, AlertTriangle, BarChart3 } from "lucide-react"
import WalletOverview from "@/components/wallet-overview"
import BehaviorAnalysis from "@/components/behavior-analysis"
import AlertsStrategies from "@/components/alerts-strategies"
import RealTimeMetrics from "@/components/real-time-metrics"

interface DashboardProps {
  walletAddress: string
}

export default function Dashboard({ walletAddress }: DashboardProps) {
  const [portfolioValue, setPortfolioValue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate loading portfolio data
      const timer = setTimeout(() => {
        setPortfolioValue(Math.random() * 100000 + 50000)
        setLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [walletAddress])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              ${portfolioValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% (24h)
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Active Positions</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">23</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <Target className="h-3 w-3 mr-1" />8 DeFi protocols
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">7.2/10</div>
            <Progress value={72} className="mt-2 h-2" />
            <div className="text-xs text-purple-600 mt-1">Moderate Risk</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Yield Farming</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">24.8%</div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <BarChart3 className="h-3 w-3 mr-1" />
              Average APY
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="metrics">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <WalletOverview walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <BehaviorAnalysis walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <AlertsStrategies walletAddress={walletAddress} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <RealTimeMetrics walletAddress={walletAddress} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
