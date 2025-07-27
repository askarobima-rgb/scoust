"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Clock, Target, BarChart3 } from "lucide-react"
import RealTimePulse from "@/components/real-time-pulse"

interface RealTimeMetricsProps {
  walletAddress: string
}

export default function RealTimeMetrics({ walletAddress }: RealTimeMetricsProps) {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate real-time metrics
      const timer = setTimeout(() => {
        setMetrics({
          liveData: {
            gasPrice: 12.5,
            networkLoad: 67,
            blockTime: 2.1,
            pendingTxs: 1234,
          },
          performance: {
            todayPnL: 1250.75,
            weekPnL: -340.2,
            monthPnL: 5670.3,
            winRate: 68,
          },
          opportunities: {
            arbitrage: 3,
            yield: 7,
            liquidation: 2,
          },
        })
        setLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [walletAddress])

  // Update metrics every 5 seconds
  useEffect(() => {
    if (!loading && metrics) {
      const interval = setInterval(() => {
        setMetrics((prev: any) => ({
          ...prev,
          liveData: {
            ...prev.liveData,
            gasPrice: prev.liveData.gasPrice + (Math.random() - 0.5) * 2,
            networkLoad: Math.max(0, Math.min(100, prev.liveData.networkLoad + (Math.random() - 0.5) * 10)),
            blockTime: prev.liveData.blockTime + (Math.random() - 0.5) * 0.5,
            pendingTxs: prev.liveData.pendingTxs + Math.floor((Math.random() - 0.5) * 100),
          },
        }))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [loading, metrics])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Real-time Pulse */}
      <RealTimePulse />

      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Gas Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{metrics?.liveData.gasPrice.toFixed(1)} gwei</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <Activity className="h-3 w-3 mr-1" />
              Live
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Network Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{metrics?.liveData.networkLoad}%</div>
            <Progress value={metrics?.liveData.networkLoad} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Block Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{metrics?.liveData.blockTime.toFixed(1)}s</div>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Average
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Pending TXs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{metrics?.liveData.pendingTxs.toLocaleString()}</div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <Target className="h-3 w-3 mr-1" />
              Mempool
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                +${metrics?.performance.todayPnL.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Today P&L</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">${metrics?.performance.weekPnL.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Week P&L</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                +${metrics?.performance.monthPnL.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Month P&L</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics?.performance.winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Live Opportunities</span>
            <Badge variant="outline" className="ml-auto">
              {Object.values(metrics?.opportunities || {}).reduce((a: any, b: any) => a + b, 0)} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{metrics?.opportunities.arbitrage}</div>
              <div className="text-sm text-muted-foreground">Arbitrage</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600">{metrics?.opportunities.yield}</div>
              <div className="text-sm text-muted-foreground">Yield Farming</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{metrics?.opportunities.liquidation}</div>
              <div className="text-sm text-muted-foreground">Liquidation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
