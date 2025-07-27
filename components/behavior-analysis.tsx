"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, Target, BarChart3 } from "lucide-react"

interface BehaviorAnalysisProps {
  walletAddress: string
}

export default function BehaviorAnalysis({ walletAddress }: BehaviorAnalysisProps) {
  const [behaviorData, setBehaviorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate loading behavior data
      const timer = setTimeout(() => {
        setBehaviorData({
          tradingStyle: {
            type: "Aggressive DeFi Farmer",
            confidence: 87,
            characteristics: ["High-frequency trading", "Yield farming focused", "Risk-tolerant", "Early adopter"],
          },
          patterns: {
            mostActiveHours: "14:00-16:00 UTC",
            avgHoldTime: "12 days",
            preferredProtocols: ["Uniswap", "Aave", "Compound"],
            riskTolerance: 75,
          },
          insights: [
            {
              title: "Peak Activity Window",
              description: "Most transactions occur during US market hours",
              impact: "high",
            },
            {
              title: "Yield Optimization",
              description: "Frequently moves funds to higher-yield opportunities",
              impact: "medium",
            },
            {
              title: "Gas Efficiency",
              description: "Batches transactions to minimize gas costs",
              impact: "low",
            },
          ],
        })
        setLoading(false)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [walletAddress])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
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
      {/* Trading Style */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Trading Style Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-purple-900">{behaviorData?.tradingStyle.type}</div>
                <div className="text-sm text-purple-600">{behaviorData?.tradingStyle.confidence}% confidence</div>
              </div>
              <Progress value={behaviorData?.tradingStyle.confidence} className="w-32" />
            </div>
            <div className="flex flex-wrap gap-2">
              {behaviorData?.tradingStyle.characteristics.map((char: string, index: number) => (
                <Badge key={index} variant="outline" className="text-purple-700 border-purple-300">
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Behavior Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Activity Patterns</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Most Active Hours</div>
              <div className="text-lg font-semibold">{behaviorData?.patterns.mostActiveHours}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average Hold Time</div>
              <div className="text-lg font-semibold">{behaviorData?.patterns.avgHoldTime}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Risk Tolerance</div>
              <div className="flex items-center space-x-2">
                <Progress value={behaviorData?.patterns.riskTolerance} className="flex-1" />
                <span className="text-sm font-medium">{behaviorData?.patterns.riskTolerance}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Protocol Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {behaviorData?.patterns.preferredProtocols.map((protocol: string, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{protocol}</span>
                  <Badge variant="outline">Preferred</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Behavioral Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span>Key Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behaviorData?.insights.map((insight: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{insight.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{insight.description}</div>
                  </div>
                  <Badge
                    variant={
                      insight.impact === "high" ? "destructive" : insight.impact === "medium" ? "default" : "secondary"
                    }
                  >
                    {insight.impact} impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
