import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WebSocketProvider } from "@/components/websocket-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SeiScout Dashboard - Real-time Wallet Analysis",
  description:
    "Stream Data Blok Sei, Deteksi Pola & Alert Sub-400ms. PulseScore real-time, FlashAlert otomatis, dan DeFi Radar untuk alpha signals terbaik di Sei Network.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WebSocketProvider>{children}</WebSocketProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
