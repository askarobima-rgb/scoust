"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Users, GitBranch, Zap, Target } from "lucide-react"

interface NetworkVisualizationProps {
  walletAddress: string
}

export default function NetworkVisualization({ walletAddress }: NetworkVisualizationProps) {
  const [networkData, setNetworkData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      // Simulate loading network data
      const timer = setTimeout(() => {
        setNetworkData({
          connections: [
            { address: "sei1abc...def", type: "frequent", strength: 85, label: "DeFi Bot" },
            { address: "sei1ghi...jkl", type: "whale", strength: 92, label: "Whale Wallet" },
            { address: "sei1mno...pqr", type: "exchange", strength: 78, label: "Binance Hot" },
            { address: "sei1stu...vwx", type: "protocol", strength: 95, label: "Uniswap V3" },
          ],
          clusters: [
            { name: "DeFi Protocols", size: 12, color: "blue" },
            { name: "Trading Bots", size: 8, color: "green" },
            { name: "Whale Network", size: 5, color: "purple" },
            { name: "Exchange Wallets", size: 15, color: "orange" },
          ],
          metrics: {
            totalConnections: 40,
            uniqueProtocols: 12,
            networkScore: 87,
          },
        })
        setLoading(false)
      }, 1500)
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
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-blue-600" />
            <span>Network Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">{networkData?.metrics.totalConnections}</div>
              <div className="text-sm text-blue-600">Total Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-900">{networkData?.metrics.uniqueProtocols}</div>
              <div className="text-sm text-purple-600">Unique Protocols</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">{networkData?.metrics.networkScore}</div>
              <div className="text-sm text-green-600">Network Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Visualization Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-green-600" />
              <span>Connection Graph</span>
            </div>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Focus View
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <Network className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-600 font-medium">Interactive Network Graph</div>
              <div className="text-sm text-gray-500">Visualization would render here</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-600" />
            <span>Key Connections</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkData?.connections.map((connection: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      connection.type === "whale"
                        ? "bg-purple-100 text-purple-600"
                        : connection.type === "protocol"
                          ? "bg-blue-100 text-blue-600"
                          : connection.type === "exchange"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{connection.label}</div>
                    <div className="text-sm text-muted-foreground font-mono">{connection.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {connection.strength}% strength
                  </Badge>
                  <div className="text-sm text-muted-foreground capitalize">{connection.type}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Clusters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Network Clusters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkData?.clusters.map((cluster: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{cluster.name}</div>
                    <div className="text-sm text-muted-foreground">{cluster.size} connections</div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full ${
                      cluster.color === "blue"
                        ? "bg-blue-500"
                        : cluster.color === "green"
                          ? "bg-green-500"
                          : cluster.color === "purple"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
