"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Users, TrendingUp, Eye, Filter, Download } from "lucide-react"

export default function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [nodes, setNodes] = useState([
    { id: 1, x: 200, y: 150, type: "Exchange", risk: "low", connections: 45, volume: 125000, radius: 20 },
    { id: 2, x: 400, y: 100, type: "DeFi Protocol", risk: "low", connections: 32, volume: 89000, radius: 18 },
    { id: 3, x: 300, y: 250, type: "Whale Wallet", risk: "medium", connections: 12, volume: 450000, radius: 25 },
    { id: 4, x: 150, y: 300, type: "LP Pool", risk: "low", connections: 28, volume: 67000, radius: 16 },
    { id: 5, x: 450, y: 280, type: "MEV Bot", risk: "high", connections: 8, volume: 23000, radius: 14 },
    { id: 6, x: 350, y: 50, type: "Validator", risk: "low", connections: 15, volume: 34000, radius: 12 },
    { id: 7, x: 100, y: 200, type: "Bridge", risk: "medium", connections: 22, volume: 78000, radius: 19 },
  ])

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 2, to: 6 },
    { from: 1, to: 7 },
    { from: 4, to: 7 },
    { from: 3, to: 2 },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "#22c55e"
      case "medium":
        return "#f59e0b"
      case "high":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 2
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from)
        const toNode = nodes.find((n) => n.id === conn.to)
        if (fromNode && toNode) {
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = getRiskColor(node.risk)
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
        ctx.fill()

        // Node border
        ctx.strokeStyle = selectedNode?.id === node.id ? "#1f2937" : "#ffffff"
        ctx.lineWidth = selectedNode?.id === node.id ? 3 : 2
        ctx.stroke()

        // Node label
        ctx.fillStyle = "#1f2937"
        ctx.font = "12px Inter"
        ctx.textAlign = "center"
        ctx.fillText(node.type.split(" ")[0], node.x, node.y + node.radius + 15)
      })
    }

    draw()

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const clickedNode = nodes.find((node) => {
        const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
        return distance <= node.radius
      })

      setSelectedNode(clickedNode || null)
      draw()
    }

    canvas.addEventListener("click", handleClick)
    return () => canvas.removeEventListener("click", handleClick)
  }, [nodes, selectedNode])

  const networkStats = {
    totalConnections: 247,
    directConnections: 23,
    indirectConnections: 224,
    riskScore: "Low",
    influenceScore: 78,
  }

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Connections</p>
                <p className="text-2xl font-bold">{networkStats.totalConnections}</p>
              </div>
              <Network className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Direct Links</p>
                <p className="text-2xl font-bold">{networkStats.directConnections}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Risk</p>
                <p className="text-2xl font-bold text-green-600">{networkStats.riskScore}</p>
              </div>
              <Eye className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Influence Score</p>
                <p className="text-2xl font-bold">{networkStats.influenceScore}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Network Graph */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5" />
                <span>Interactive Network Graph</span>
              </CardTitle>
              <CardDescription>Click nodes to explore connections • Risk-based coloring</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="border rounded-lg cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"
            />

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-3 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">Risk Levels</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Low Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">High Risk</span>
                </div>
              </div>
            </div>

            {/* Node Details */}
            {selectedNode && (
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 p-4 rounded-lg border min-w-48">
                <h4 className="font-semibold mb-2">{selectedNode.type}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span className="font-medium">{selectedNode.connections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span className="font-medium">${selectedNode.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk:</span>
                    <Badge
                      variant={
                        selectedNode.risk === "low"
                          ? "default"
                          : selectedNode.risk === "medium"
                            ? "secondary"
                            : "destructive"
                      }
                      size="sm"
                    >
                      {selectedNode.risk}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Network Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Network Intelligence</CardTitle>
          <CardDescription>AI-powered insights from network analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Trusted Network</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                89% of connections are with verified, low-risk entities
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Diversified Exposure</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Well-distributed across DeFi protocols and exchanges
              </p>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Growth Potential</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Network expansion trending upward with quality connections
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
