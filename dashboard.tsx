"use client"

import { useState, useEffect, useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  TrendingUp,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  AlertTriangle,
  Clock,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { WebSocketContext } from "@/components/websocket-provider" // Corrected import path

interface DashboardProps {
  walletAddress: string
}

export default function Dashboard({ walletAddress }: DashboardProps) {
  const [metrics, setMetrics] = useState({
    txCount: 1247,
    fundFlow: 45678.9,
    tokenCount: 23,
    pulseScore: 87,
  })
  const [prevMetrics, setPrevMetrics] = useState(metrics)
  const [flashAlerts, setFlashAlerts] = useState([
    {
      id: 1,
      type: "WHALE_MOVE",
      message: "Large SEI transfer detected: 500K tokens",
      confidence: 94,
      time: "2s ago",
      severity: "high",
    },
    {
      id: 2,
      type: "MEV_DETECTED",
      message: "MEV bot interaction on DEX swap",
      confidence: 87,
      time: "15s ago",
      severity: "medium",
    },
    {
      id: 3,
      type: "DCA_PATTERN",
      message: "Regular buying pattern confirmed",
      confidence: 96,
      time: "1m ago",
      severity: "low",
    },
    {
      id: 4,
      type: "YIELD_OPPORTUNITY",
      message: "High APY pool available: 45%",
      confidence: 89,
      time: "2m ago",
      severity: "medium",
    },
  ])

  const ws = useContext(WebSocketContext)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevMetrics(metrics)
      setMetrics((prev) => ({
        txCount: prev.txCount + Math.floor(Math.random() * 3),
        fundFlow: prev.fundFlow + (Math.random() - 0.5) * 1000,
        tokenCount: prev.tokenCount + (Math.random() > 0.9 ? 1 : 0),
        pulseScore: Math.max(
          0,
          Math.min(
            100,
            prev.pulseScore + (Math.random() - 0.5) * 5 + (Math.random() > 0.8 ? (Math.random() - 0.5) * 20 : 0),
          ),
        ),
      }))

      // Add new flash alert occasionally
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          type: ["WHALE_MOVE", "MEV_DETECTED", "ARBITRAGE", "YIELD_OPPORTUNITY"][Math.floor(Math.random() * 4)],
          message: [
            "New large transaction detected",
            "Arbitrage opportunity found",
            "Unusual trading pattern",
            "Price movement alert",
          ][Math.floor(Math.random() * 4)],
          confidence: Math.floor(Math.random() * 20) + 80,
          time: "now",
          severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
        }

        setFlashAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [metrics])

  useEffect(() => {
    if (!ws) return

    // @ts-ignore
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "flash_alert") {
        setFlashAlerts((prev) => [data.payload, ...prev.slice(0, 9)])
      }
    }

    return () => {
      // @ts-ignore
      ws.onmessage = null
    }
  }, [ws])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Zap className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const isMetricIncreased = (metricName: string) => {
    // @ts-ignore
    return metrics[metricName] > prevMetrics[metricName]
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Jumlah Tx</p>
                <p className="text-2xl font-bold text-blue-700">
                  {metrics.txCount.toLocaleString()}
                  {isMetricIncreased("txCount") && <span className="animate-pulse text-blue-500">+</span>}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+12 today</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Arus Dana</p>
                <p className="text-2xl font-bold text-green-700">
                  ${metrics.fundFlow.toLocaleString()}
                  {isMetricIncreased("fundFlow") && <span className="animate-pulse text-green-500">+</span>}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  {metrics.fundFlow > 45000 ? (
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs ${metrics.fundFlow > 45000 ? "text-green-600" : "text-red-600"}`}>
                    {metrics.fundFlow > 45000 ? "+" : ""}
                    {(((metrics.fundFlow - 45000) / 45000) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Jumlah Token</p>
                <p className="text-2xl font-bold text-purple-700">
                  {metrics.tokenCount}
                  {isMetricIncreased("tokenCount") && <span className="animate-pulse text-purple-500">+</span>}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Coins className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-600">Diversified</span>
                </div>
              </div>
              <Coins className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">PulseScore</p>
                <p className="text-2xl font-bold text-orange-700">
                  {Math.round(metrics.pulseScore)}
                  {isMetricIncreased("pulseScore") && <span className="animate-pulse text-orange-500">+</span>}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-xs text-orange-600">
                    {metrics.pulseScore > 80 ? "Very Active" : metrics.pulseScore > 60 ? "Active" : "Moderate"}
                  </span>
                </div>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>FlashAlert Live Feed</span>
                <Badge variant="outline" className="text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  WebSocket Active
                </Badge>
              </CardTitle>
              <CardDescription>Real-time anomaly detection and pattern alerts</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-600">
                <Clock className="w-3 h-3 mr-1" />
                Block→UI 0.4s
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {flashAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    `p-4 rounded-lg border transition-all duration-300`,
                    alert.severity === "high" && "border-red-200 bg-red-50 text-red-600",
                    alert.severity === "medium" && "border-orange-200 bg-orange-50 text-orange-600",
                    alert.severity === "low" && "border-blue-200 bg-blue-50 text-blue-600",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{alert.type.replace("_", " ")}</span>
                          <Badge variant="outline" size="sm">
                            {alert.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                        <span className="text-xs opacity-75">{alert.time}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Today's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Transactions</span>
                <span className="text-sm font-medium">+12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Volume</span>
                <span className="text-sm font-medium">$8,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Gas Used</span>
                <span className="text-sm font-medium">0.045 SEI</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pattern Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">DCA Active</span>
                <Badge variant="default" size="sm">
                  Yes
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Whale Behavior</span>
                <Badge variant="secondary" size="sm">
                  Detected
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">MEV Exposure</span>
                <Badge variant="outline" size="sm">
                  Low
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Network Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Latency</span>
                <span className="text-sm font-medium text-green-600">0.4s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Accuracy</span>
                <span className="text-sm font-medium text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-medium text-green-600">99.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
