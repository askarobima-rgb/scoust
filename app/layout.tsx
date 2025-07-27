import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { WebSocketProvider } from "@/components/websocket-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SeiScout Dashboard - Insight < 3s",
  description:
    "SeiScout men-stream data blok Sei, deteksi pola & kirim alert sub-400 ms. PulseScore real-time, FlashAlert otomatis, dan DeFi Radar untuk alpha signals terbaik.",
  keywords: "Sei Network, wallet analysis, DeFi, blockchain analytics, real-time alerts, PulseScore, FlashAlert",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebSocketProvider>{children}</WebSocketProvider>
      </body>
    </html>
  )
}
