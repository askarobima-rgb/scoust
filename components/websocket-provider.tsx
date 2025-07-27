"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface WebSocketContextType {
  isConnected: boolean
  latency: number
  sendMessage: (message: any) => void
  lastMessage: any
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null)

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider")
  }
  return context
}

interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [latency, setLatency] = useState(0)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    // Simulate WebSocket connection
    const connectWebSocket = () => {
      setIsConnected(true)

      // Simulate periodic messages
      const interval = setInterval(() => {
        const startTime = Date.now()

        // Simulate message from server
        const mockMessage = {
          type: "FLASH_ALERT",
          data: {
            alertType: ["WHALE_MOVE", "MEV_DETECTED", "ARBITRAGE", "YIELD_OPPORTUNITY"][Math.floor(Math.random() * 4)],
            message: [
              "Large SEI transfer detected: 500K tokens",
              "MEV bot interaction on DEX swap",
              "Arbitrage opportunity found",
              "High APY pool available: 45%",
            ][Math.floor(Math.random() * 4)],
            confidence: Math.floor(Math.random() * 20) + 80,
            timestamp: Date.now(),
            severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
          },
        }

        setLastMessage(mockMessage)
        setLatency(Date.now() - startTime + Math.random() * 100 + 200) // 200-300ms
      }, 3000)

      return () => clearInterval(interval)
    }

    const cleanup = connectWebSocket()
    return cleanup
  }, [])

  const sendMessage = (message: any) => {
    // Simulate sending message
    console.log("Sending WebSocket message:", message)
  }

  return (
    <WebSocketContext.Provider value={{ isConnected, latency, sendMessage, lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}
