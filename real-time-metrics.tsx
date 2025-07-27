"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, TrendingUp, Users, DollarSign, Clock } from "lucide-react"

export default function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    latency: 287,
    activeWallets: 15420,
    totalVolume: 2847392,
    alertsSent: 1247,
    aiAccuracy: 94.2,
    networkHealth: 99.8,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        latency: Math.floor(Math.random() * 200) + 200,
        activeWallets: prev.activeWallets + Math.floor(Math.random() * 10) - 5,
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000) - 5000,
        alertsSent: prev.alertsSent + Math.floor(Math.random() * 3),
        aiAccuracy: 94 + Math.random() * 2,
        networkHealth: 99 + Math.random(),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>Real-Time Network Metrics</span>
          </h3>
          <Badge variant="outline" className="text-green-600 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Latency</span>
            </div>
            <p className="text-lg font-bold text-green-600">{metrics.latency}ms</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Active</span>
            </div>
            <p className="text-lg font-bold text-blue-600">{metrics.activeWallets.toLocaleString()}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Volume</span>
            </div>
            <p className="text-lg font-bold text-purple-600">${(metrics.totalVolume / 1000000).toFixed(1)}M</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Alerts</span>
            </div>
            <p className="text-lg font-bold text-orange-600">{metrics.alertsSent.toLocaleString()}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">AI Accuracy</span>
            </div>
            <p className="text-lg font-bold text-green-600">{metrics.aiAccuracy.toFixed(1)}%</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Network</span>
            </div>
            <p className="text-lg font-bold text-blue-600">{metrics.networkHealth.toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
