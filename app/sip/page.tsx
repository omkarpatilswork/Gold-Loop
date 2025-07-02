"use client"

import { useState, useEffect } from "react"
import { ArrowRight, TrendingUp, Star, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const sipPlans = [
  {
    id: "starter",
    name: "Gold Starter",
    minAmount: 100,
    recommended: false,
    description: "Perfect for beginners",
    features: ["Flexible amounts", "No lock-in", "Start with ₹100"],
    color: "from-blue-500 to-blue-600",
    icon: "🌟",
  },
  {
    id: "smart",
    name: "Smart SIP",
    minAmount: 500,
    recommended: true,
    description: "Most popular choice",
    features: ["Auto-optimization", "Market timing", "Higher returns"],
    color: "from-gold-DEFAULT to-gold-dark",
    icon: "🧠",
  },
  {
    id: "wealth",
    name: "Wealth Builder",
    minAmount: 1000,
    recommended: false,
    description: "For serious investors",
    features: ["Premium features", "Priority support", "Tax benefits"],
    color: "from-purple-500 to-purple-600",
    icon: "💎",
  },
]

const fomoData = {
  sixMonthsAgo: {
    goldPrice: 58500,
    currentPrice: 66300,
    growth: 13.3,
    investment: 3000,
    currentValue: 3399,
  },
}

export default function SIPPage() {
  const [selectedPlan, setSelectedPlan] = useState("smart")
  const [showFomo, setShowFomo] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowFomo(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-ivory via-white to-gold-light/20">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gold-light/30">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Start Gold SIP</h1>
            <p className="text-sm text-gray-600">Systematic Investment Plan</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Gold Rate</p>
            <p className="text-sm font-semibold text-gold-DEFAULT">₹66,300/10g</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* FOMO Section */}
        {showFomo && (
          <Card className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200 animate-in slide-in-from-top duration-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 text-sm">You missed out!</h3>
                  <p className="text-xs text-red-700 mt-1">If you started SIP 6 months ago with ₹500/month</p>
                  <div className="mt-2 p-2 bg-white/60 rounded-lg">
                    <div className="flex justify-between text-xs">
                      <span>Investment:</span>
                      <span className="font-semibold">₹{fomoData.sixMonthsAgo.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Current Value:</span>
                      <span className="font-semibold text-green-600">
                        ₹{fomoData.sixMonthsAgo.currentValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-t pt-1 mt-1">
                      <span>Profit:</span>
                      <span className="font-semibold text-green-600">
                        +₹{(fomoData.sixMonthsAgo.currentValue - fomoData.sixMonthsAgo.investment).toLocaleString()} (
                        {fomoData.sixMonthsAgo.growth}%)
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-red-600 mt-2 font-medium">Don't miss out again! Start today 🚀</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-700">13.3%</div>
              <div className="text-xs text-green-600">6M Returns</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-700">2.5L+</div>
              <div className="text-xs text-blue-600">Active SIPs</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-700">₹100</div>
              <div className="text-xs text-purple-600">Min Amount</div>
            </CardContent>
          </Card>
        </div>

        {/* SIP Plans */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Choose Your SIP Plan</h2>
          <div className="space-y-3">
            {sipPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id ? "ring-2 ring-gold-DEFAULT shadow-lg scale-[1.02]" : "hover:shadow-md"
                } ${plan.recommended ? "border-gold-DEFAULT" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{plan.icon}</span>
                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                        {plan.recommended && (
                          <Badge className="bg-gold-DEFAULT text-white text-xs px-2 py-0.5">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                      <div className="text-xs text-gray-500 mb-3">Min: ₹{plan.minAmount}/month</div>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === plan.id ? "border-gold-DEFAULT bg-gold-DEFAULT" : "border-gray-300"
                      }`}
                    >
                      {selectedPlan === plan.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <Card className="mt-6 bg-gradient-to-r from-gold-light/20 to-gold-DEFAULT/10">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-gold-DEFAULT" />
              Why Start SIP Today?
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-gold-DEFAULT rounded-full"></div>
                <span>Rupee cost averaging reduces risk</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-gold-DEFAULT rounded-full"></div>
                <span>Build wealth systematically</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-gold-DEFAULT rounded-full"></div>
                <span>No timing the market needed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-gold-DEFAULT rounded-full"></div>
                <span>Start with just ₹100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Success Stories
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">R</span>
                  </div>
                  <span className="text-sm font-medium">Rahul K.</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  "Started with ₹500/month, now my portfolio is worth ₹45,000 after 2 years!"
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs">P</span>
                  </div>
                  <span className="text-sm font-medium">Priya S.</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  "Best decision ever! Gold SIP helped me save for my wedding. 15% returns!"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Link href={`/sip/setup?plan=${selectedPlan}`}>
          <Button className="w-full bg-gradient-to-r from-gold-DEFAULT to-gold-dark text-white font-semibold py-3 rounded-xl shadow-lg">
            Start {sipPlans.find((p) => p.id === selectedPlan)?.name} SIP
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
