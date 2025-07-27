"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Shield, Activity, Network, Bot, TrendingUp } from "lucide-react"
import { useState } from "react"

interface AnalysisProps {
  walletAddress: string
}

export default function Analysis({ walletAddress }: AnalysisProps) {
  const [openSections, setOpenSections] = useState({
    behavior: true,
    risk: false,
    network: false,
  })

  const behaviorPatterns = [
    {
      pattern: "DCA Strategy",
      confidence: 96,
      frequency: "Weekly",
      description: "Regular buying every 7 days, $500 average",
      status: "active",
      impact: "Positive",
    },
    {
      pattern: "Whale Activity",
      confidence: 89,
      frequency: "Monthly",
      description: "Large transactions >$10K detected",
      status: "detected",
      impact: "High",
    },
    {
      pattern: "MEV Interaction",
      confidence: 76,
      frequency: "Daily",
      description: "Bot interactions on DEX swaps",
      status: "monitoring",
      impact: "Medium",
    },
    {
      pattern: "Arbitrage Trading",
      confidence: 92,
      frequency: "Hourly",
      description: "Cross-DEX price differences exploited",
      status: "active",
      impact: "Positive",
    },
  ]

  const riskBoard = {
    identity: { score: 15, status: "Low", description: "Verified wallet behavior" },
    contract: { score: 22, status: "Low", description: "Audited protocols only" },
    liquidity: { score: 45, status: "Medium", description: "IL risk in volatile pairs" },
    behavior: { score: 8, status: "Very Low", description: "No suspicious patterns" },
  }

  const networkNodes = [
    { id: 1, type: "Exchange", risk: "low", connections: 45, volume: 125000 },
    { id: 2, type: "DeFi Protocol", risk: "low", connections: 32, volume: 89000 },
    { id: 3, type: "Whale Wallet", risk: "medium", connections: 12, volume: 450000 },
    { id: 4, type: "LP Pool", risk: "low", connections: 28, volume: 67000 },
    { id: 5, type: "MEV Bot", risk: "high", connections: 8, volume: 23000 },
  ]

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-6">
      {/* Behavior Patterns Accordion */}
      <Collapsible open={openSections.behavior} onOpenChange={() => toggleSection("behavior")}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <CardTitle>Behavior Patterns</CardTitle>
                  <Badge variant="outline" className="text-green-600">
                    <Activity className="w-3 h-3 mr-1" />
                    AI Analyzing
                  </Badge>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openSections.behavior ? "rotate-180" : ""}`} />
              </div>
              <CardDescription>Autonomous pattern detection with confidence scores</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-4">
                {behaviorPatterns.map((pattern, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            pattern.status === "active"
                              ? "bg-green-500"
                              : pattern.status === "detected"
                                ? "bg-orange-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <h4 className="font-semibold">{pattern.pattern}</h4>
                        <Badge variant="outline" size="sm">
                          {pattern.confidence}% confidence
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          pattern.impact === "Positive"
                            ? "default"
                            : pattern.impact === "High"
                              ? "secondary"
                              : "outline"
                        }
                        size="sm"
                      >
                        {pattern.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{pattern.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Frequency: {pattern.frequency}</span>
                      <Progress value={pattern.confidence} className="w-24 h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Risk Board Accordion */}
      <Collapsible open={openSections.risk} onOpenChange={() => toggleSection("risk")}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <CardTitle>Risk Board</CardTitle>
                  <Badge variant="outline" className="text-green-600">
                    4-Dimensional
                  </Badge>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openSections.risk ? "rotate-180" : ""}`} />
              </div>
              <CardDescription>Multi-vector risk assessment matrix</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(riskBoard).map(([key, risk]) => (
                  <div key={key} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold capitalize">{key} Risk</h4>
                      <Badge
                        variant={risk.score < 20 ? "default" : risk.score < 40 ? "secondary" : "destructive"}
                        size="sm"
                      >
                        {risk.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={risk.score}
                        className={`flex-1 h-2 ${
                          risk.score < 20
                            ? "[&>div]:bg-green-500"
                            : risk.score < 40
                              ? "[&>div]:bg-yellow-500"
                              : "[&>div]:bg-red-500"
                        }`}
                      />
                      <span className="text-sm font-medium w-12">{risk.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Network Graph Accordion */}
      <Collapsible open={openSections.network} onOpenChange={() => toggleSection("network")}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Network className="w-5 h-5 text-purple-500" />
                  <CardTitle>Network Graph</CardTitle>
                  <Badge variant="outline" className="text-purple-600">
                    vis-network
                  </Badge>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${openSections.network ? "rotate-180" : ""}`} />
              </div>
              <CardDescription>Interactive network visualization with risk-based node coloring</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              {/* Network Canvas Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg border-2 border-dashed border-muted-foreground/20 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Network className="w-16 h-16 mx-auto text-muted-foreground/50" />
                    <div>
                      <h3 className="text-lg font-semibold text-muted-foreground">Interactive Network Canvas</h3>
                      <p className="text-sm text-muted-foreground">vis-network with risk-based node coloring</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Nodes List */}
              <div className="space-y-3">
                <h4 className="font-semibold mb-3">Connected Entities</h4>
                {networkNodes.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          node.risk === "low" ? "bg-green-500" : node.risk === "medium" ? "bg-orange-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{node.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {node.connections} connections • ${node.volume.toLocaleString()} volume
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={node.risk === "low" ? "default" : node.risk === "medium" ? "secondary" : "destructive"}
                      size="sm"
                    >
                      {node.risk} risk
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Analysis Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Analysis Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">Low Risk</div>
              <p className="text-sm text-muted-foreground">Overall risk assessment</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">4 Patterns</div>
              <p className="text-sm text-muted-foreground">Active behavior patterns</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">247 Connections</div>
              <p className="text-sm text-muted-foreground">Network entities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
