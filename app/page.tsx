"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Coins,
  TrendingUp,
  Gift,
  ArrowUpDown,
  PiggyBank,
  GraduationCap,
  Wallet,
  FileText,
  RefreshCw,
  Plus,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"

// Mock data
const mockUser = {
  name: "Omkar",
  goldOwned: 15.5, // grams
  goldValue: 89750, // INR
  roundUpBalance: 240,
  xpPoints: 1250,
  streak: 5,
}

const mockGoldPrice = 5790 // per gram

export default function HomePage() {
  const [currentPrice, setCurrentPrice] = useState(mockGoldPrice)
  const [priceChange, setPriceChange] = useState(2.5)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10
      setCurrentPrice((prev) => Math.max(5700, prev + change))
      setPriceChange(change)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              GoldLoop
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-100">
              <Bell className="w-5 h-5" />
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-100">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Greeting */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hi {mockUser.name} 👋</h2>
          <p className="text-gray-600">Your gold is shining today!</p>
        </div>

        {/* Gold Price Ticker */}
        <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Gold Price (per gram)</p>
                <p className="text-2xl font-bold text-gray-800">₹{currentPrice.toFixed(0)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={`w-5 h-5 ${priceChange >= 0 ? "text-green-600" : "text-red-600"}`} />
                <span className={`font-semibold ${priceChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Card */}
        <Card className="bg-white border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-800">
              <Wallet className="w-5 h-5" />
              <span>Your Gold Vault</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                <p className="text-sm text-gray-600">Gold Owned</p>
                <p className="text-xl font-bold text-gray-800">{mockUser.goldOwned}g</p>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-xl font-bold text-gray-800">₹{mockUser.goldValue.toLocaleString()}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link href="/buy">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg">
                  <Coins className="w-4 h-4 mr-2" />
                  Buy Gold
                </Button>
              </Link>
              <Link href="/sell">
                <Button
                  variant="outline"
                  className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 shadow-sm bg-transparent"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Sell Gold
                </Button>
              </Link>
              <Link href="/gift">
                <Button
                  variant="outline"
                  className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 shadow-sm bg-transparent"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Gift Gold
                </Button>
              </Link>
              <Link href="/convert">
                <Button
                  variant="outline"
                  className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 shadow-sm bg-transparent"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Convert Gold
                </Button>
              </Link>
            </div>

            <Link href="/sip">
              <Button className="w-full mt-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg">
                <PiggyBank className="w-4 h-4 mr-2" />
                Start SIP
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Features */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/quest">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-4 text-center">
                <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">🎓 Gold Quest</h3>
                <p className="text-xs text-gray-600 mt-1">Learn & Earn</p>
                <Badge variant="secondary" className="mt-2 text-xs bg-blue-100 text-blue-700 border-blue-200">
                  {mockUser.xpPoints} XP
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <Link href="/roundup">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-4 text-center">
                <PiggyBank className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">💰 Round-Up</h3>
                <p className="text-xs text-gray-600 mt-1">₹{mockUser.roundUpBalance} saved</p>
                <Progress value={60} className="mt-2 h-2 bg-green-100" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/certificate">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">🧾 Certificates</h3>
                <p className="text-xs text-gray-600 mt-1">View & Download</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/swap">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-4 text-center">
                <RefreshCw className="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-800">🔁 Phygital Swap</h3>
                <p className="text-xs text-gray-600 mt-1">Convert Physical</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-2xl group"
          >
            <div className="relative">
              <Plus className="w-6 h-6 group-hover:scale-0 transition-transform duration-300" />
              <Coins className="w-6 h-6 absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 group-hover:animate-spin" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
