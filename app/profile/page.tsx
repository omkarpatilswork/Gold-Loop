"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Calendar,
  Target,
  TrendingUp,
  PiggyBank,
  Edit,
  Settings,
  Bell,
  Shield,
  CreditCard,
  ArrowLeft,
  Trophy,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUserProfile = {
  name: "Omkar Sharma",
  email: "omkar.sharma@email.com",
  dateOfBirth: "15th March, 1995",
  profileImage: "/placeholder.svg?height=120&width=120&text=👤",
  totalInvestment: 125000,
  currentValue: 142750,
  totalReturns: 17750,
  returnsPercentage: 14.2,
  financialGoals: [
    {
      id: 1,
      title: "Emergency Fund",
      target: 500000,
      current: 125000,
      deadline: "Dec 2024",
      category: "Safety",
    },
    {
      id: 2,
      title: "House Down Payment",
      target: 2000000,
      current: 450000,
      deadline: "Jun 2026",
      category: "Property",
    },
    {
      id: 3,
      title: "Retirement Fund",
      target: 10000000,
      current: 890000,
      deadline: "Mar 2055",
      category: "Retirement",
    },
  ],
  activeSIPs: [
    {
      id: 1,
      name: "Gold SIP - Conservative",
      amount: 5000,
      frequency: "Monthly",
      nextDate: "15th Jan 2024",
      status: "Active",
      returns: 12.5,
    },
    {
      id: 2,
      name: "Gold SIP - Aggressive",
      amount: 10000,
      frequency: "Monthly",
      nextDate: "20th Jan 2024",
      status: "Active",
      returns: 18.3,
    },
    {
      id: 3,
      name: "Silver SIP",
      amount: 3000,
      frequency: "Weekly",
      nextDate: "8th Jan 2024",
      status: "Paused",
      returns: 8.7,
    },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-100">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Profile</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-100">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-amber-700 hover:bg-amber-100">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={mockUserProfile.profileImage || "/placeholder.svg"} alt={mockUserProfile.name} />
                  <AvatarFallback className="bg-amber-200 text-amber-800 text-xl font-bold">
                    {mockUserProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{mockUserProfile.name}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{mockUserProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{mockUserProfile.dateOfBirth}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Overview */}
        <Card className="bg-white border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-800">
              <TrendingUp className="w-5 h-5" />
              <span>Investment Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
                <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-gray-800">₹{mockUserProfile.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Current Value</p>
                <p className="text-2xl font-bold text-green-700">₹{mockUserProfile.currentValue.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Total Returns</p>
                <p className="text-2xl font-bold text-blue-700">+₹{mockUserProfile.totalReturns.toLocaleString()}</p>
                <p className="text-sm text-blue-600 font-semibold">+{mockUserProfile.returnsPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card className="bg-white border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-800">
              <Target className="w-5 h-5" />
              <span>Financial Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUserProfile.financialGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <div
                  key={goal.id}
                  className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                      <p className="text-sm text-gray-600">Target by {goal.deadline}</p>
                    </div>
                    <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
                      {goal.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₹{goal.current.toLocaleString()}</span>
                      <span className="text-gray-800 font-semibold">₹{goal.target.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-amber-100" />
                    <p className="text-xs text-gray-500 text-right">{progress.toFixed(1)}% completed</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Active SIPs */}
        <Card className="bg-white border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-800">
              <PiggyBank className="w-5 h-5" />
              <span>Active SIPs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUserProfile.activeSIPs.map((sip) => (
              <div
                key={sip.id}
                className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{sip.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{sip.amount.toLocaleString()} • {sip.frequency}
                    </p>
                  </div>
                  <Badge
                    variant={sip.status === "Active" ? "default" : "secondary"}
                    className={sip.status === "Active" ? "bg-green-100 text-green-700 border-green-200" : ""}
                  >
                    {sip.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Next: {sip.nextDate}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <Trophy className="w-4 h-4" />
                      <span>+{sip.returns}% returns</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-6 rounded-xl">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Methods
          </Button>
          <Button
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50 py-6 rounded-xl bg-transparent"
          >
            <Shield className="w-5 h-5 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
