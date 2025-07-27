"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, AlertTriangle, TrendingUp, Clock } from "lucide-react"
import { useWebSocket } from "@/components/websocket-provider"

export default function RealTimePulse() {
  const { isConnected, lastMessage } = useWebSocket()
  const [pulseData, setPulseData] = useState<any[]>([])

  useEffect(() => {
    if (lastMessage) {
      setPulseData((prev) => [
        {
          id: Date.now(),
          ...lastMessage.data,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 4), // Keep only last 5 messages
      ])
    }
  }, [lastMessage])

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span>Real-time Pulse</span>
          </div>
          <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "Live" : "Disconnected"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pulseData.length > 0 ? (
            pulseData.map((pulse, index) => (
              <div key={pulse.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-1 rounded-full ${
                      pulse.severity === "high"
                        ? "bg-red-100 text-red-600"
                        : pulse.severity === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {pulse.alertType === "WHALE_MOVE" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : pulse.alertType === "MEV_DETECTED" ? (
                      <Zap className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{pulse.message}</div>
                    <div className="text-xs text-muted-foreground">{pulse.confidence}% confidence</div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {pulse.timestamp}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div>Waiting for real-time data...</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
