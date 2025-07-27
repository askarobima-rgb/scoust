"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface WebSocketContextType {
  isConnected: boolean
  lastMessage: any
  sendMessage: (message: any) => void
}

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  lastMessage: null,
  sendMessage: () => {},
})

export const useWebSocket = () => useContext(WebSocketContext)

interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    // Simulate WebSocket connection for demo
    const timer = setTimeout(() => {
      setIsConnected(true)
    }, 1000)

    // Simulate periodic messages
    const messageTimer = setInterval(() => {
      setLastMessage({
        type: "pulse",
        data: {
          timestamp: Date.now(),
          value: Math.random() * 100,
        },
      })
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(messageTimer)
    }
  }, [])

  const sendMessage = (message: any) => {
    // Simulate sending message
    console.log("Sending message:", message)
  }

  return (
    <WebSocketContext.Provider value={{ isConnected, lastMessage, sendMessage }}>{children}</WebSocketContext.Provider>
  )
}
