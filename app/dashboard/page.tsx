"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Dashboard from "@/components/dashboard"

function DashboardContent() {
  const searchParams = useSearchParams()
  const walletAddress = searchParams.get("addr") || ""

  if (!walletAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No wallet address provided</h1>
          <p className="text-muted-foreground">Please go back and enter a wallet address.</p>
        </div>
      </div>
    )
  }

  return <Dashboard walletAddress={walletAddress} />
}

function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}
