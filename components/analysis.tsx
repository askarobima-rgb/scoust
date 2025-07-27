"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertCircle, Target, BarChart3 } from "lucide-react"
import NetworkVisualization from "@/components/network-visualization"

interface AnalysisProps {
  walletAddress: string
}

export default function Analysis({ walletAddress }: AnalysisProps) {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate analysis loading
      const timer = setTimeout(() => {
        setAnalysisData({
          riskProfile: {
            score: 7.2,
            level: "Moderate",
            factors: [
              { name: "Concentration Risk", value: 65, status: "warning" },
              { name: "Liquidity Risk", value: 45, status: "good" },
              { name: "Smart Contract Risk", value: 80, status: "high" },
              { name: "Market Risk", value: 55, status: "moderate" },
            ],
          },
          tradingPatterns: {
            frequency: "High",
            avgTransactionSize: "$2,450",
            preferredTime: "14:00-16:00 UTC",
            successRate: 73,
          },
          defiInteractions: [
            { protocol: "Uniswap V3", interactions: 45, volume: "$125K" },
            { protocol: "Aave", interactions: 23, volume: "$89K" },
            { protocol: "Compound", interactions: 18, volume: "$67K" },
            { protocol: "Curve", interactions: 12, volume: "$34K" },
          ],
        })
        setLoading(false)
      }, 2000)
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
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>AI-Powered Wallet Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">{analysisData?.riskProfile.score}/10</div>
              <div className="text-sm text-purple-600">Risk Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">{analysisData?.tradingPatterns.successRate}%</div>
              <div className="text-sm text-blue-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">{analysisData?.defiInteractions.length}</div>
              <div className="text-sm text-green-600">DeFi Protocols</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="risk" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Trading Patterns</TabsTrigger>
          <TabsTrigger value="defi">DeFi Activity</TabsTrigger>
          <TabsTrigger value="network">Network Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>Risk Profile Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisData?.riskProfile.factors.map((factor: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <Badge
                      variant={
                        factor.status === "high" ? "destructive" : factor.status === "warning" ? "default" : "secondary"
                      }
                    >
                      {factor.value}%
                    </Badge>
                  </div>
                  <Progress value={factor.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Trading Behavior Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Trading Frequency</div>
                    <div className="text-lg font-semibold">{analysisData?.tradingPatterns.frequency}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Transaction Size</div>
                    <div className="text-lg font-semibold">{analysisData?.tradingPatterns.avgTransactionSize}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Preferred Trading Time</div>
                    <div className="text-lg font-semibold">{analysisData?.tradingPatterns.preferredTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-lg font-semibold">{analysisData?.tradingPatterns.successRate}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>DeFi Protocol Interactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisData?.defiInteractions.map((protocol: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{protocol.protocol}</div>
                      <div className="text-sm text-muted-foreground">{protocol.interactions} interactions</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{protocol.volume}</div>
                      <div className="text-sm text-muted-foreground">Total Volume</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <NetworkVisualization walletAddress={walletAddress} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
