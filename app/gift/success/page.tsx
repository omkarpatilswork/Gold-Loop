"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowLeft, Home, Gift, Share2, Truck, QrCode } from "lucide-react"
import Link from "next/link"

export default function GiftSuccessPage() {
  const [showCelebration, setShowCelebration] = useState(true)

  useEffect(() => {
    // Celebration animation for 3 seconds
    const timer = setTimeout(() => setShowCelebration(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Mock gift data - in real app, this would come from URL params or state
  const giftData = {
    type: "Digital Gold",
    recipient: "Priya Sharma",
    amount: "1.2g",
    value: "₹6,948",
    giftId: "GIFT-789123",
    deliveryMethod: "WhatsApp",
    status: "Sent",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-10 left-10 animate-bounce">
            <Sparkles className="w-8 h-8 text-gold-luxury" />
          </div>
          <div className="absolute top-20 right-16 animate-bounce delay-100">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="absolute top-32 left-1/2 animate-bounce delay-200">
            <Sparkles className="w-7 h-7 text-gold-luxury" />
          </div>
          <div className="absolute top-16 right-1/3 animate-bounce delay-300">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="absolute top-40 left-1/4 animate-bounce delay-500">
            <Sparkles className="w-6 h-6 text-gold-luxury" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/gift">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">Gift Sent Successfully</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Success Header */}
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            {showCelebration && (
              <div className="absolute inset-0 animate-ping">
                <div className="w-20 h-20 bg-green-500 rounded-full opacity-75"></div>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Gift Sent Successfully!</h1>
          <p className="text-lg text-gray-600 mb-4">Your gold gift is on its way to {giftData.recipient}</p>
          <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 text-lg px-4 py-2">
            Gift ID: {giftData.giftId}
          </Badge>
        </div>

        {/* Gift Summary */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Gift Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gift Type:</span>
                  <span className="font-semibold">{giftData.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recipient:</span>
                  <span className="font-semibold">{giftData.recipient}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gold Amount:</span>
                  <span className="font-semibold text-lg">{giftData.amount}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gift Value:</span>
                  <span className="font-semibold text-lg">{giftData.value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Method:</span>
                  <span className="font-semibold">{giftData.deliveryMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">{giftData.status}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">What Happens Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Gift Notification Sent</h4>
                <p className="text-sm text-gray-600">
                  {giftData.recipient} will receive a beautiful gift notification via {giftData.deliveryMethod}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Easy Claim Process</h4>
                <p className="text-sm text-gray-600">
                  Recipient can claim the gold instantly by clicking the gift link or scanning QR code
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Gold Added to Wallet</h4>
                <p className="text-sm text-gray-600">
                  After KYC verification, gold is instantly added to recipient's GoldLoop wallet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Track Your Gift</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Gift sent successfully</span>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Waiting for recipient to claim</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Gold added to wallet</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Share the Joy</h3>
              <p className="text-sm text-gray-600 mb-4">Let others know about your thoughtful gift!</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on Social Media
                </Button>
                <Button variant="outline" className="w-full">
                  <Truck className="w-4 h-4 mr-2" />
                  View Gift History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gamification Rewards */}
        <Card className="bg-gradient-to-r from-gold-light/20 to-accent/10 border-gold-light/50 max-w-2xl mx-auto">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Gifting Rewards Unlocked!</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">XP Earned</p>
                <p className="text-lg font-bold text-gold-luxury">+25 XP</p>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Streak Progress</p>
                <p className="text-lg font-bold text-gold-luxury">1/3 Gifts</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              🏅 Send 2 more gifts this month to unlock "Gifting Champion" badge and earn ₹25 bonus gold!
            </p>
            <Badge className="bg-gold-luxury text-white">Gifting Streak: 1 🔥</Badge>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Link href="/" className="flex-1">
            <Button className="w-full bg-accent hover:bg-accent/90 text-white py-3">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/gift" className="flex-1">
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 py-3">
              <Gift className="w-4 h-4 mr-2" />
              Send Another Gift
            </Button>
          </Link>
        </div>

        {/* Festival Campaign Banner */}
        <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200 max-w-4xl mx-auto">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎊 Festival Special Campaign</h3>
            <p className="text-gray-600 mb-4">
              Gift gold this Diwali and get 0.1g bonus gold! Valid till October 31st.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Participate in Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
