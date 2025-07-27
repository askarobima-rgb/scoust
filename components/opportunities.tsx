"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, TrendingUp, Target, Clock, DollarSign, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

interface OpportunitiesProps {
  walletAddress: string
}

interface Opportunity {
  id: string
  type: "yield" | "arbitrage" | "liquidation" | "airdrop"
  title: string
  description: string
  potential: string
  risk: "low" | "medium" | "high"
  timeframe: string
  confidence: number
  action: string
}

export default function Opportunities({ walletAddress }: OpportunitiesProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate loading opportunities
      const timer = setTimeout(() => {
        setOpportunities([
          {
            id: "1",
            type: "yield",
            title: "High-Yield Liquidity Pool",
            description: "SEI/USDC pool on DragonSwap offering 45% APY with low impermanent loss risk",
            potential: "+$2,340/month",
            risk: "medium",
            timeframe: "30 days",
            confidence: 87,
            action: "Provide Liquidity",
          },
          {
            id: "2",
            type: "arbitrage",
            title: "Cross-DEX Arbitrage",
            description: "Price difference detected between Astroport and DragonSwap for ATOM",
            potential: "+$156",
            risk: "low",
            timeframe: "5 minutes",
            confidence: 94,
            action: "Execute Trade",
          },
          {
            id: "3",
            type: "liquidation",
            title: "Liquidation Opportunity",
            description: "Undercollateralized position on Mars Protocol ready for liquidation",
            potential: "+$890",
            risk: "high",
            timeframe: "2 hours",
            confidence: 76,
            action: "Liquidate Position",
          },
          {
            id: "4",
            type: "airdrop",
            title: "Potential Airdrop",
            description: "New DEX launching on Sei - early liquidity providers may receive tokens",
            potential: "TBD",
            risk: "low",
            timeframe: "60 days",
            confidence: 65,
            action: "Participate",
          },
        ])
        setLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [walletAddress])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "yield":
        return <TrendingUp className="h-4 w-4" />
      case "arbitrage":
        return <Zap className="h-4 w-4" />
      case "liquidation":
        return <Target className="h-4 w-4" />
      case "airdrop":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "yield":
        return "bg-green-100 text-green-800 border-green-200"
      case "arbitrage":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "liquidation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "airdrop":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
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
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Opportunities Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span>Live Opportunities</span>
            <Badge variant="outline" className="ml-auto">
              {opportunities.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                $
                {opportunities
                  .reduce((sum, opp) => {
                    const potential = opp.potential.replace(/[^0-9]/g, "")
                    return sum + (potential ? Number.parseInt(potential) : 0)
                  }, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Total Potential</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {Math.round(opportunities.reduce((sum, opp) => sum + opp.confidence, 0) / opportunities.length)}%
              </div>
              <div className="text-sm text-blue-600">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">
                {opportunities.filter((opp) => opp.risk === "low").length}
              </div>
              <div className="text-sm text-purple-600">Low Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(opportunity.type)}`}>
                    {getTypeIcon(opportunity.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {opportunity.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{opportunity.potential}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {opportunity.timeframe}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{opportunity.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`h-4 w-4 ${getRiskColor(opportunity.risk)}`} />
                    <span className="text-sm capitalize">{opportunity.risk} Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{opportunity.confidence}% Confidence</span>
                  </div>
                </div>
                <Button className="flex items-center space-x-2">
                  <span>{opportunity.action}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Confidence Score</span>
                  <span>{opportunity.confidence}%</span>
                </div>
                <Progress value={opportunity.confidence} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Target className="h-4 w-4 mr-2" />
              Set Price Alerts
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Zap className="h-4 w-4 mr-2" />
              Auto-Execute Trades
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              Yield Optimization
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <DollarSign className="h-4 w-4 mr-2" />
              Portfolio Rebalancing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
