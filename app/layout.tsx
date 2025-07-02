import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { BottomNav } from "@/components/bottom-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoldLoop - Your Digital Gold Platform",
  description: "Buy, sell, and manage your digital gold investments",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 pb-20">{children}</div>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  )
}
