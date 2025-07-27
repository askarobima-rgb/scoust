"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Bot, Zap, Target, Activity } from "lucide-react"

export default function BehaviorAnalysis() {
  const patterns = [
    {
      type: "DCA Strategy",
      confidence: 94,
      description: "Regular buying pattern detected every 7 days",
      risk: "low",
      frequency: "Weekly",
      impact: "Positive",
    },
    {
      type: "Whale Activity",
      confidence: 87,
      description: "Large transactions above $10k threshold",
      risk: "medium",
      frequency: "Monthly",
      impact: "High",
    },
    {
      type: "MEV Interaction",
      confidence: 76,
      description: "Potential MEV bot interactions detected",
      risk: "medium",
      frequency: "Daily",
      impact: "Medium",
    },
    {
      type: "Arbitrage Trading",
      confidence: 91,
      description: "Cross-DEX arbitrage opportunities utilized",
      risk: "low",
      frequency: "Hourly",
      impact: "Positive",
    },
  ]

  const riskFactors = [
    {
      factor: "Wash Trading",
      score: 15,
      status: "Low Risk",
      description: "No suspicious circular trading patterns",
    },
    {
      factor: "Rug Pull Exposure",
      score: 8,
      status: "Very Low",
      description: "Minimal exposure to high-risk tokens",
    },
    {
      factor: "Impermanent Loss",
      score: 45,
      status: "Medium Risk",
      description: "LP positions in volatile pairs",
    },
    {
      factor: "Smart Contract Risk",
      score: 22,
      status: "Low Risk",
      description: "Interactions with audited protocols",
    },
  ]

  const aiInsights = [
    {
      insight: "Optimal DCA timing detected",
      confidence: 96,
      action: "Continue current strategy",
      impact: "High",
    },
    {
      insight: "Gas optimization opportunity",
      confidence: 89,
      action: "Batch transactions during low activity",
      impact: "Medium",
    },
    {
      insight: "Yield farming potential",
      confidence: 82,
      action: "Consider SEI/USDC LP position",
      impact: "High",
    },
  ]

  return (
    <div className="space-y-6">
      {/* AI Pattern Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-500" />
            <span>Autonomous AI Pattern Detection</span>
            <Badge variant="outline" className="text-green-600">
              <Activity className="w-3 h-3 mr-1" />
              Live 24/7
            </Badge>
          </CardTitle>
          <CardDescription>
            AI continuously monitors and detects behavioral patterns without manual triggers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patterns.map((pattern, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{pattern.type}</h4>
                  <Badge variant={pattern.risk === "low" ? "default" : "secondary"}>
                    {pattern.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{pattern.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Frequency: {pattern.frequency}</span>
                  <span
                    className={`font-medium ${
                      pattern.impact === "Positive"
                        ? "text-green-600"
                        : pattern.impact === "High"
                          ? "text-blue-600"
                          : "text-orange-600"
                    }`}
                  >
                    Impact: {pattern.impact}
                  </span>
                </div>
                <Progress value={pattern.confidence} className="mt-2 h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Risk Assessment Matrix</span>
          </CardTitle>
          <CardDescription>Real-time risk evaluation across multiple vectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{risk.factor}</h4>
                    <Badge variant={risk.score < 20 ? "default" : risk.score < 40 ? "secondary" : "destructive"}>
                      {risk.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={risk.score} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-12">{risk.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>AI Strategic Insights</span>
          </CardTitle>
          <CardDescription>Autonomous recommendations based on behavioral analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <Alert key={index} className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <Target className="w-4 h-4 text-blue-600" />
                <AlertDescription>
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-blue-800 dark:text-blue-200">{insight.insight}</strong>
                    <Badge variant="outline" className="text-blue-600">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 mb-2">{insight.action}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-600">Potential Impact: {insight.impact}</span>
                    <Badge variant="outline" size="sm">
                      Auto-detected
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Trends */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Trading Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Frequency</span>
                <span className="text-sm font-medium">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Risk Tolerance</span>
                <span className="text-sm font-medium">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Strategy</span>
                <span className="text-sm font-medium">DCA + Arbitrage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">DeFi Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Staking</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">LP Providing</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Yield Farming</span>
                <span className="text-sm font-medium text-blue-600">Moderate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Network Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Tx Frequency</span>
                <span className="text-sm font-medium">Daily</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Gas Efficiency</span>
                <span className="text-sm font-medium text-green-600">Optimized</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Peak Hours</span>
                <span className="text-sm font-medium">UTC 14-16</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
