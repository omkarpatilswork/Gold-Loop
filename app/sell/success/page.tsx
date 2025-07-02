"use client"

import { useState, useEffect } from "react"
import { CheckCircle, TrendingDown, Clock, Share2, Home, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function SellSuccessPage() {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f97316", "#eab308"],
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gold Sold Successfully! 💰</h1>
          <p className="text-gray-600">Your money is on the way</p>
        </div>

        {/* Sale Details */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-700 mb-1">₹25,650</div>
              <div className="text-sm text-green-600">Amount to be credited</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Gold Sold:</span>
                <span className="font-semibold">2.5g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sale Rate:</span>
                <span className="font-semibold">₹66,300/10g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold text-green-600">TXN2024001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">Bank Transfer</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Timeline */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Payment Timeline</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Sale Confirmed</div>
                  <div className="text-xs text-gray-600">Just now</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Payment Processing</div>
                  <div className="text-xs text-gray-600">Within 2-3 business days</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-gray-600">3</span>
                </div>
                <div>
                  <div className="font-medium text-sm">Money Credited</div>
                  <div className="text-xs text-gray-600">To your bank account</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updated Portfolio */}
        <Card className="mb-6 bg-gold-light/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-gold-DEFAULT" />
              <h3 className="font-semibold">Updated Portfolio</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Remaining Gold</div>
                <div className="font-semibold">13.0g</div>
              </div>
              <div>
                <div className="text-gray-600">Current Value</div>
                <div className="font-semibold">₹86,190</div>
              </div>
              <div>
                <div className="text-gray-600">Total Profit</div>
                <div className="font-semibold text-green-600">+₹11,540</div>
              </div>
              <div>
                <div className="text-gray-600">Returns</div>
                <div className="font-semibold text-green-600">+15.5%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-800 text-sm">What's Next?</span>
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• SMS confirmation sent to your registered mobile</div>
              <div>• Email receipt with transaction details</div>
              <div>• Payment notification when money is credited</div>
              <div>• Updated portfolio statement available</div>
            </div>
          </CardContent>
        </Card>

        {/* Share Success */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Share Your Success</h3>
              <p className="text-sm text-gray-600 mb-4">Tell others about your smart gold investment returns</p>
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share My Returns
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
