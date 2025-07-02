"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PiggyBank, Gift, Settings, Trophy, Coins } from "lucide-react"
import Link from "next/link"

const mockData = {
  roundUpBalance: 240,
  totalSaved: 1250,
  roundUpEnabled: true,
  roundUpAmount: 10,
  nextBonus: 250,
  currentProgress: 190,
}

const leaderboard = [
  { name: "Priya S.", saved: 890, rank: 1 },
  { name: "Rahul K.", saved: 750, rank: 2 },
  { name: "You", saved: 240, rank: 8 },
  { name: "Amit P.", saved: 180, rank: 9 },
  { name: "Sneha M.", saved: 150, rank: 10 },
]

const recentRoundUps = [
  { merchant: "Swiggy", amount: 8, date: "Today" },
  { merchant: "Uber", amount: 12, date: "Yesterday" },
  { merchant: "Amazon", amount: 15, date: "2 days ago" },
  { merchant: "Zomato", amount: 7, date: "3 days ago" },
]

export default function RoundUpPage() {
  const [roundUpEnabled, setRoundUpEnabled] = useState(mockData.roundUpEnabled)
  const [roundUpAmount, setRoundUpAmount] = useState(mockData.roundUpAmount)

  const progressPercentage = (mockData.currentProgress / mockData.nextBonus) * 100
  const remainingForBonus = mockData.nextBonus - mockData.currentProgress

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <PiggyBank className="w-6 h-6 text-green-600" />
            <h1 className="text-xl font-semibold text-gray-800">Round-Up Wallet</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Balance Overview */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">₹{mockData.roundUpBalance}</h2>
              <p className="opacity-90 mb-4">Round-Up Balance</p>
              <div className="flex justify-center space-x-4 text-sm">
                <div>
                  <p className="opacity-75">Total Saved</p>
                  <p className="font-semibold">₹{mockData.totalSaved}</p>
                </div>
                <div>
                  <p className="opacity-75">This Month</p>
                  <p className="font-semibold">₹{mockData.roundUpBalance}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bonus Progress */}
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Bonus Progress</h3>
                <p className="text-sm text-gray-600">You're ₹{remainingForBonus} away from earning 0.1g bonus gold!</p>
              </div>
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-gray-600 mt-2">{progressPercentage.toFixed(0)}% complete</p>
          </CardContent>
        </Card>

        {/* Round-Up Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-green-600" />
              <span>Round-Up Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <Label htmlFor="enable-roundup" className="font-medium">
                  Enable Round-Up
                </Label>
                <p className="text-sm text-gray-600">Automatically round up your purchases</p>
              </div>
              <Switch id="enable-roundup" checked={roundUpEnabled} onCheckedChange={setRoundUpEnabled} />
            </div>

            {roundUpEnabled && (
              <div className="space-y-3">
                <Label className="font-medium">Round-Up Amount</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={roundUpAmount === 10 ? "default" : "outline"}
                    onClick={() => setRoundUpAmount(10)}
                    className="h-12"
                  >
                    ₹10
                  </Button>
                  <Button
                    variant={roundUpAmount === 100 ? "default" : "outline"}
                    onClick={() => setRoundUpAmount(100)}
                    className="h-12"
                  >
                    ₹100
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Example: ₹423 purchase → Round up to ₹{roundUpAmount === 10 ? "430" : "500"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Round-Ups */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Round-Ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRoundUps.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.merchant}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+₹{transaction.amount}</p>
                    <p className="text-xs text-gray-500">Round-up</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span>Top Savers This Month</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === "You" ? "bg-green-50 border border-green-200" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      {user.name === "You" && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">₹{user.saved}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Convert to Gold */}
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold">
          <Coins className="w-5 h-5 mr-2" />
          Convert ₹{mockData.roundUpBalance} to Gold
        </Button>
      </div>
    </div>
  )
}
