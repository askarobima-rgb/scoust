"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock } from "lucide-react"
import { useWebSocket } from "./websocket-provider"

export default function RealTimePulse() {
  const { isConnected, latency } = useWebSocket()
  const [pulseData, setPulseData] = useState({
    score: 87,
    trend: "up",
    lastUpdate: Date.now(),
    factors: {
      trading: 92,
      defi: 78,
      staking: 85,
      network: 94,
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseData((prev) => ({
        ...prev,
        score: Math.max(0, Math.min(100, prev.score + (Math.random() - 0.5) * 3)),
        lastUpdate: Date.now(),
        factors: {
          trading: Math.max(0, Math.min(100, prev.factors.trading + (Math.random() - 0.5) * 5)),
          defi: Math.max(0, Math.min(100, prev.factors.defi + (Math.random() - 0.5) * 4)),
          staking: Math.max(0, Math.min(100, prev.factors.staking + (Math.random() - 0.5) * 2)),
          network: Math.max(0, Math.min(100, prev.factors.network + (Math.random() - 0.5) * 1)),
        },
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getPulseColor = (score: number) => {
    if (score > 80) return "text-green-600"
    if (score > 60) return "text-blue-600"
    if (score > 40) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>PulseScore Real-time</span>
          </h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {isConnected ? "Live" : "Connecting"}
            </Badge>
            <Badge variant="outline" className="text-blue-600">
              <Clock className="w-3 h-3 mr-1" />
              {latency.toFixed(0)}ms
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getPulseColor(pulseData.score)} pulse-score`}>
              {Math.round(pulseData.score)}
            </div>
            <p className="text-xs text-muted-foreground">PulseScore</p>
          </div>

          <div className="text-center">
            <div className={`text-lg font-bold ${getPulseColor(pulseData.factors.trading)}`}>
              {Math.round(pulseData.factors.trading)}%
            </div>
            <p className="text-xs text-muted-foreground">Trading</p>
          </div>

          <div className="text-center">
            <div className={`text-lg font-bold ${getPulseColor(pulseData.factors.defi)}`}>
              {Math.round(pulseData.factors.defi)}%
            </div>
            <p className="text-xs text-muted-foreground">DeFi</p>
          </div>

          <div className="text-center">
            <div className={`text-lg font-bold ${getPulseColor(pulseData.factors.staking)}`}>
              {Math.round(pulseData.factors.staking)}%
            </div>
            <p className="text-xs text-muted-foreground">Staking</p>
          </div>

          <div className="text-center">
            <div className={`text-lg font-bold ${getPulseColor(pulseData.factors.network)}`}>
              {Math.round(pulseData.factors.network)}%
            </div>
            <p className="text-xs text-muted-foreground">Network</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
