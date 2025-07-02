"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, PiggyBank, Gift, Zap, Target } from "lucide-react"
import Link from "next/link"

interface UserBehavior {
  daysSinceSignup: number
  hasPurchased: boolean
  hasSIP: boolean
  lastActivity: string
  completedLessons: number
  totalLessons: number
}

interface SmartCTAProps {
  userBehavior: UserBehavior
  currentGoldPrice: number
  priceChange: number
}

export function SmartCTA({ userBehavior, currentGoldPrice, priceChange }: SmartCTAProps) {
  const [currentCTA, setCurrentCTA] = useState<any>(null)

  useEffect(() => {
    const generatePersonalizedCTA = () => {
      // New user (< 7 days)
      if (userBehavior.daysSinceSignup < 7 && !userBehavior.hasPurchased) {
        return {
          title: "🎯 Start Your Gold Journey",
          description: "Complete 1 lesson and get ₹10 gold instantly!",
          action: "Start Learning",
          link: "/quest",
          urgency: "limited-time",
          icon: Target,
          color: "bg-green-500",
        }
      }

      // Completed lessons but no purchase
      if (userBehavior.completedLessons > 0 && !userBehavior.hasPurchased) {
        return {
          title: "💰 Ready to Invest?",
          description: `You've learned the basics! Start with just ₹100 and use your ₹${userBehavior.completedLessons * 5} rewards.`,
          action: "Buy Gold Now",
          link: "/buy?amount=100&source=quest",
          urgency: "reward-available",
          icon: TrendingUp,
          color: "bg-blue-500",
        }
      }

      // Has purchased but no SIP
      if (userBehavior.hasPurchased && !userBehavior.hasSIP) {
        return {
          title: "🔁 Automate Your Growth",
          description: "You're doing great! Set up SIP to grow your gold automatically.",
          action: "Start SIP",
          link: "/sip?source=quest",
          urgency: "growth-opportunity",
          icon: PiggyBank,
          color: "bg-purple-500",
        }
      }

      // Price dip opportunity
      if (priceChange < -1) {
        return {
          title: "📉 Gold Dipped Today!",
          description: `Price dropped ₹${Math.abs((priceChange * currentGoldPrice) / 100).toFixed(0)}. Great time to buy more!`,
          action: "Buy the Dip",
          link: "/buy?source=dip",
          urgency: "price-alert",
          icon: Zap,
          color: "bg-orange-500",
        }
      }

      // Inactive user
      if (
        userBehavior.lastActivity &&
        new Date().getTime() - new Date(userBehavior.lastActivity).getTime() > 7 * 24 * 60 * 60 * 1000
      ) {
        return {
          title: "🎁 Welcome Back!",
          description: "We missed you! Complete a lesson and earn ₹15 bonus gold.",
          action: "Claim Bonus",
          link: "/quest?bonus=welcome-back",
          urgency: "welcome-back",
          icon: Gift,
          color: "bg-pink-500",
        }
      }

      // Default CTA
      return {
        title: "📚 Keep Learning",
        description: "Discover more about gold investing and earn rewards!",
        action: "Continue Quest",
        link: "/quest",
        urgency: "none",
        icon: Target,
        color: "bg-blue-500",
      }
    }

    setCurrentCTA(generatePersonalizedCTA())
  }, [userBehavior, currentGoldPrice, priceChange])

  if (!currentCTA) return null

  const getUrgencyBadge = () => {
    switch (currentCTA.urgency) {
      case "limited-time":
        return <Badge className="bg-red-100 text-red-800">Limited Time</Badge>
      case "reward-available":
        return <Badge className="bg-green-100 text-green-800">Rewards Available</Badge>
      case "price-alert":
        return <Badge className="bg-orange-100 text-orange-800">Price Alert</Badge>
      case "welcome-back":
        return <Badge className="bg-pink-100 text-pink-800">Welcome Back</Badge>
      default:
        return null
    }
  }

  const IconComponent = currentCTA.icon

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${currentCTA.color} rounded-full flex items-center justify-center`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{currentCTA.title}</h3>
                {getUrgencyBadge()}
              </div>
              <p className="text-sm text-gray-600">{currentCTA.description}</p>
            </div>
          </div>

          <Link href={currentCTA.link}>
            <Button className={`${currentCTA.color} hover:opacity-90 text-white`}>{currentCTA.action}</Button>
          </Link>
        </div>

        {/* Progress indicator for learning */}
        {userBehavior.completedLessons > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Learning Progress</span>
              <span>
                {userBehavior.completedLessons}/{userBehavior.totalLessons} lessons
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(userBehavior.completedLessons / userBehavior.totalLessons) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
