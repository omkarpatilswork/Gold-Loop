"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Calendar, TrendingUp, Share2, Home, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function SIPSuccessPage() {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setShowAnimation(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gold-light/20">
      <div className="px-4 py-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 ${showAnimation ? "animate-bounce" : ""}`}
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">SIP Started Successfully! 🎉</h1>
          <p className="text-gray-600">Your wealth building journey begins now</p>
        </div>

        {/* SIP Details */}
        <Card className="mb-6 bg-gradient-to-r from-gold-light/20 to-gold-DEFAULT/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gold-DEFAULT" />
              <h3 className="font-semibold">Your SIP Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Amount:</span>
                <span className="font-semibold">₹500/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Investment:</span>
                <span className="font-semibold">5th Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">12 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SIP ID:</span>
                <span className="font-semibold text-gold-DEFAULT">SIP2024001</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projected Returns */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Projected Wealth</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-1">₹6,720</div>
              <div className="text-sm text-green-600 mb-3">Expected value after 12 months</div>
              <div className="flex justify-center gap-4 text-xs">
                <div>
                  <div className="font-semibold">Investment</div>
                  <div className="text-gray-600">₹6,000</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600">Returns</div>
                  <div className="text-green-600">₹720</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Auto-debit Setup</div>
                  <div className="text-xs text-gray-600">We'll debit ₹500 on 5th of every month</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Gold Purchase</div>
                  <div className="text-xs text-gray-600">Gold will be bought at live market rates</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Secure Storage</div>
                  <div className="text-xs text-gray-600">Your gold is stored in insured vaults</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reminders */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-800 text-sm">Reminders Set</span>
            </div>
            <div className="text-xs text-blue-700">
              We'll notify you before each investment and send monthly portfolio updates
            </div>
          </CardContent>
        </Card>

        {/* Share Success */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Share Your Success</h3>
              <p className="text-sm text-gray-600 mb-4">Tell your friends about your smart investment decision</p>
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share My SIP Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/portfolio">
            <Button variant="outline" className="w-full">
              View Portfolio
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-gold-DEFAULT to-gold-dark text-white">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
