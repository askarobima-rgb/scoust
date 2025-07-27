"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, AlertTriangle, TrendingUp, Target, Zap, Settings } from "lucide-react"

interface AlertsStrategiesProps {
  walletAddress: string
}

export default function AlertsStrategies({ walletAddress }: AlertsStrategiesProps) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [strategies, setStrategies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate loading alerts and strategies
      const timer = setTimeout(() => {
        setAlerts([
          {
            id: 1,
            type: "price",
            title: "SEI Price Alert",
            condition: "SEI > $1.50",
            status: "active",
            triggered: false,
          },
          {
            id: 2,
            type: "whale",
            title: "Whale Movement",
            condition: "Large transfers > 100K SEI",
            status: "active",
            triggered: true,
          },
          {
            id: 3,
            type: "yield",
            title: "High Yield Opportunity",
            condition: "APY > 40%",
            status: "paused",
            triggered: false,
          },
        ])

        setStrategies([
          {
            id: 1,
            name: "Auto Yield Farming",
            description: "Automatically move funds to highest yield opportunities",
            status: "active",
            performance: "+15.2%",
          },
          {
            id: 2,
            name: "DCA Strategy",
            description: "Dollar-cost average into SEI every week",
            status: "active",
            performance: "+8.7%",
          },
          {
            id: 3,
            name: "Arbitrage Bot",
            description: "Execute arbitrage opportunities across DEXs",
            status: "inactive",
            performance: "+3.1%",
          },
        ])
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
      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <span>Active Alerts</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      alert.triggered ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {alert.triggered ? <AlertTriangle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-muted-foreground">{alert.condition}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={alert.status === "active" ? "default" : "secondary"}>{alert.status}</Badge>
                  <Switch checked={alert.status === "active"} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Trading Strategies</span>
            </div>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              New Strategy
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">{strategy.name}</div>
                      <Badge variant={strategy.status === "active" ? "default" : "secondary"}>{strategy.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{strategy.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-semibold">{strategy.performance}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Switch checked={strategy.status === "active"} />
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Price Movement Alerts
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Management
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              Yield Optimization
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Target className="h-4 w-4 mr-2" />
              Portfolio Rebalancing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
