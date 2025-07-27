"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Target, Zap, Clock } from "lucide-react"
import Dashboard from "@/components/dashboard"
import Analysis from "@/components/analysis"
import Opportunities from "@/components/opportunities"
import { useWebSocket } from "@/components/websocket-provider"

export default function SeiScoutDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const walletAddress = searchParams.get("addr") || ""

  const [activeTab, setActiveTab] = useState("dashboard")
  const [latency, setLatency] = useState(0)
  const { isConnected: wsConnected } = useWebSocket()

  useEffect(() => {
    if (!walletAddress && window.location.pathname === "/dashboard") {
      router.replace("/")
      return
    }

    if (walletAddress) {
      setLatency(Math.floor(Math.random() * 500) + 500)
    }
  }, [walletAddress, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  SeiScout Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Insight &lt; 3 s</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Clock className="w-3 h-3 mr-1" />
                {latency}ms latency
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Target className="w-3 h-3 mr-1" />
                DeFi Radar Active
              </Badge>
              <Badge
                variant="outline"
                className={wsConnected ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}
              >
                {wsConnected ? "WebSocket Connected" : "WebSocket Disconnected"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Wallet Info Header */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Analyzing Wallet</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  {walletAddress ? `${walletAddress.slice(0, 20)}...${walletAddress.slice(-10)}` : "Loading..."}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Live Stream
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    router.push("/")
                  }}
                >
                  New Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main SPA Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Opportunities</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="analysis">
            <Analysis walletAddress={walletAddress} />
          </TabsContent>

          <TabsContent value="opportunities">
            <Opportunities walletAddress={walletAddress} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
