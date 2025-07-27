"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Activity, Target, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import WalletOverview from "@/components/wallet-overview"
import Analysis from "@/components/analysis"
import BehaviorAnalysis from "@/components/behavior-analysis"
import AlertsStrategies from "@/components/alerts-strategies"
import RealTimeMetrics from "@/components/real-time-metrics"
import NetworkVisualization from "@/components/network-visualization"
import Opportunities from "@/components/opportunities"
import RealTimePulse from "@/components/real-time-pulse"

interface DashboardProps {
  walletAddress: string
}

export default function Dashboard({ walletAddress }: DashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">SeiScout Dashboard</h1>
                  <p className="text-sm text-muted-foreground font-mono">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Target className="w-3 h-3 mr-1" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="opportunities">Alpha</TabsTrigger>
            <TabsTrigger value="pulse">Pulse</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <WalletOverview walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Analysis walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <BehaviorAnalysis walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertsStrategies walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <RealTimeMetrics walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <NetworkVisualization walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Opportunities walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="pulse" className="space-y-6">
            <RealTimePulse walletAddress={walletAddress} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
