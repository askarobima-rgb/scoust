"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Bell, AlertTriangle, Target, Zap, Clock, DollarSign, Activity, Settings } from "lucide-react"

export default function AlertsStrategies() {
  const activeAlerts = [
    {
      id: 1,
      type: "Price Alert",
      title: "SEI Price Target Reached",
      description: "SEI has reached your target price of $1.25",
      priority: "high",
      time: "2 minutes ago",
      action: "Consider taking profits",
      status: "active",
    },
    {
      id: 2,
      type: "Whale Movement",
      title: "Large Transaction Detected",
      description: "Whale wallet moved 500K SEI tokens",
      priority: "medium",
      time: "15 minutes ago",
      action: "Monitor for market impact",
      status: "active",
    },
    {
      id: 3,
      type: "Yield Opportunity",
      title: "High APY Pool Available",
      description: "New SEI/USDC pool offering 45% APY",
      priority: "medium",
      time: "1 hour ago",
      action: "Evaluate LP opportunity",
      status: "active",
    },
  ]

  const strategies = [
    {
      name: "DCA Optimization",
      description: "Automated dollar-cost averaging with market timing",
      status: "active",
      performance: "+12.5%",
      nextAction: "Buy in 2 days",
      confidence: 94,
    },
    {
      name: "Yield Maximization",
      description: "Dynamic yield farming across multiple protocols",
      status: "active",
      performance: "+8.7%",
      nextAction: "Rebalance LP position",
      confidence: 87,
    },
    {
      name: "Risk Management",
      description: "Automated stop-loss and position sizing",
      status: "monitoring",
      performance: "+3.2%",
      nextAction: "No action needed",
      confidence: 91,
    },
  ]

  const alertSettings = [
    { name: "Price Movements", enabled: true, threshold: "5%" },
    { name: "Whale Transactions", enabled: true, threshold: "$100K+" },
    { name: "Yield Opportunities", enabled: true, threshold: "20% APY+" },
    { name: "Risk Warnings", enabled: true, threshold: "Medium+" },
    { name: "Gas Optimization", enabled: false, threshold: "Auto" },
    { name: "MEV Protection", enabled: true, threshold: "Always" },
  ]

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <span>Active Alerts</span>
                <Badge variant="destructive">{activeAlerts.length}</Badge>
              </CardTitle>
              <CardDescription>Real-time notifications and action recommendations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <Alert
                key={alert.id}
                className={`border-l-4 ${
                  alert.priority === "high"
                    ? "border-l-red-500 bg-red-50 dark:bg-red-950/20"
                    : alert.priority === "medium"
                      ? "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
                      : "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {alert.priority === "high" ? (
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    ) : (
                      <Bell className="w-5 h-5 text-orange-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge variant="outline" size="sm">
                          {alert.type}
                        </Badge>
                      </div>
                      <AlertDescription className="mb-2">{alert.description}</AlertDescription>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600">💡 {alert.action}</p>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Act
                    </Button>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-500" />
            <span>AI-Powered Strategies</span>
            <Badge variant="outline" className="text-green-600">
              <Activity className="w-3 h-3 mr-1" />
              Auto-executing
            </Badge>
          </CardTitle>
          <CardDescription>Autonomous strategies based on behavioral analysis and market conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map((strategy, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        strategy.status === "active" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <h4 className="font-semibold">{strategy.name}</h4>
                    <Badge variant={strategy.status === "active" ? "default" : "secondary"}>{strategy.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-600">{strategy.performance}</span>
                    <Badge variant="outline" size="sm">
                      {strategy.confidence}% confidence
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Next: {strategy.nextAction}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Alert Configuration</span>
          </CardTitle>
          <CardDescription>Customize your notification preferences and thresholds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Switch checked={setting.enabled} />
                  <div>
                    <p className="font-medium">{setting.name}</p>
                    <p className="text-sm text-muted-foreground">Threshold: {setting.threshold}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <Zap className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="font-semibold mb-2">Instant Alerts</h3>
            <p className="text-sm text-muted-foreground mb-4">Sub-second notifications via WebSocket</p>
            <Button size="sm" className="w-full">
              Test Alert
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Target className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold mb-2">Auto Strategies</h3>
            <p className="text-sm text-muted-foreground mb-4">AI executes strategies automatically</p>
            <Button size="sm" className="w-full">
              Create Strategy
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <DollarSign className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Profit Optimization</h3>
            <p className="text-sm text-muted-foreground mb-4">Maximize returns with AI insights</p>
            <Button size="sm" className="w-full">
              Optimize Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
