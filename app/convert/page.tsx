"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Scale,
  Award,
  MapPin,
  CheckCircle,
  Coins,
  Banknote,
  Home,
  Store,
  Gift,
  TrendingUp,
  FileText,
  Star,
  Users,
} from "lucide-react"
import Link from "next/link"

// Mock data
const mockGoldPrice = 5790 // per gram
const mockConversions = [
  { name: "Priya S.", amount: "2.5g", value: "₹14,475", type: "Digital Gold" },
  { name: "Raj M.", amount: "1.8g", value: "₹10,422", type: "Cash" },
  { name: "Anita K.", amount: "3.2g", value: "₹18,528", type: "Digital Gold" },
]

export default function ConvertGoldPage() {
  const [selectedConversion, setSelectedConversion] = useState<string>("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Convert Gold</h1>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Live Rate: ₹{mockGoldPrice}/g
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-light to-accent rounded-full flex items-center justify-center mx-auto">
            <Scale className="w-10 h-10 text-gold-dark" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Convert Your Physical Gold</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Turn your idle gold into digital gold or instant money with complete transparency and trust
          </p>
        </div>

        {/* Special Offer Banner */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6" />
                <div>
                  <p className="font-semibold">First Time Bonus!</p>
                  <p className="text-sm opacity-90">Get ₹50 bonus digital gold on your first conversion</p>
                </div>
              </div>
              <Badge className="bg-white text-green-600">Limited Time</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Type Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Choose Conversion Type</h3>

          <div className="grid gap-4">
            {/* Digital Gold Option */}
            <Card
              className={`cursor-pointer transition-all ${
                selectedConversion === "digital" ? "ring-2 ring-accent border-accent bg-accent/5" : "hover:shadow-md"
              }`}
              onClick={() => setSelectedConversion("digital")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-light to-accent rounded-full flex items-center justify-center">
                      <Coins className="w-6 h-6 text-gold-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Convert to Digital Gold</h4>
                      <p className="text-sm text-gray-600">Keep growing your gold portfolio</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          No TDS
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="font-semibold text-accent">₹{mockGoldPrice}/g</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cash Option */}
            <Card
              className={`cursor-pointer transition-all ${
                selectedConversion === "cash" ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50" : "hover:shadow-md"
              }`}
              onClick={() => setSelectedConversion("cash")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <Banknote className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Convert to Money</h4>
                      <p className="text-sm text-gray-600">Instant bank transfer</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          TDS Applicable
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Same Day
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="font-semibold text-blue-600">₹{(mockGoldPrice * 0.97).toFixed(0)}/g</p>
                    <p className="text-xs text-gray-500">After charges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conversion Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">How would you like to convert?</h3>

          <div className="grid gap-4">
            {/* Home Pickup */}
            <Link href={selectedConversion ? `/convert/${selectedConversion}/pickup` : "#"}>
              <Card
                className={`cursor-pointer transition-all ${!selectedConversion ? "opacity-50 pointer-events-none" : "hover:shadow-md"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                        <Home className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Home Pickup</h4>
                        <p className="text-sm text-gray-600">Schedule pickup at your convenience</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            Free Pickup
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Insured
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Store Visit */}
            <Link href={selectedConversion ? `/convert/${selectedConversion}/store` : "#"}>
              <Card
                className={`cursor-pointer transition-all ${!selectedConversion ? "opacity-50 pointer-events-none" : "hover:shadow-md"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                        <Store className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Visit Partner Store</h4>
                        <p className="text-sm text-gray-600">Instant evaluation and conversion</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            Instant
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Free Test
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Shield className="w-5 h-5" />
              <span>Why Trust GoldLoop?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">BIS Certified Lab</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">100% Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">Transparent Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">Tamper-Proof Process</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">How It Works</h3>

          <div className="space-y-3">
            {[
              { icon: MapPin, title: "Schedule Pickup", desc: "Choose convenient time slot" },
              { icon: Scale, title: "Weighing & Sealing", desc: "Done in front of you with live rates" },
              { icon: Award, title: "Purity Testing", desc: "XRF testing at certified lab" },
              { icon: CheckCircle, title: "Final Approval", desc: "Accept or reject the final value" },
              { icon: Coins, title: "Instant Transfer", desc: "Digital gold or money in your account" },
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Conversions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Recent Conversions</h3>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>1,247 this month</span>
            </Badge>
          </div>

          <div className="space-y-3">
            {mockConversions.map((conversion, index) => (
              <Card key={index} className="bg-white/50">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{conversion.name}</p>
                        <p className="text-sm text-gray-600">Converted {conversion.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{conversion.value}</p>
                      <p className="text-xs text-gray-600">{conversion.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Nudge */}
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-800">💡 Smart Suggestion</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Your gold is sitting idle. Convert today and lock gold at ₹{mockGoldPrice}/gm before prices rise!
                </p>
                <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700 text-white">
                  Convert Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-800">Is my gold safe during pickup?</p>
                <p className="text-sm text-gray-600">
                  Yes, all pickups are 100% insured and done by certified agents with tamper-proof sealing.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800">How is purity determined?</p>
                <p className="text-sm text-gray-600">
                  We use XRF testing at BIS-certified labs for accurate purity assessment.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Can I reject the final value?</p>
                <p className="text-sm text-gray-600">You can accept or reject the final value after purity testing.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
