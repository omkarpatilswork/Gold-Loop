"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gift, Smartphone, Package, Sparkles } from "lucide-react"
import Link from "next/link"

const giftingOptions = [
  {
    id: "digital",
    title: "💛 Digital Gold Only",
    description: "Instant delivery via WhatsApp, Email, or QR",
    features: ["Instant delivery", "Personalized messages", "Animated gift cards", "No delivery charges"],
    price: "Starting ₹100",
    icon: Smartphone,
    gradient: "from-yellow-400 to-orange-500",
    popular: false,
  },
  {
    id: "physical",
    title: "🪙 Physical Gold Coin",
    description: "Certified gold coins delivered to doorstep",
    features: ["Augmont certified", "Tamper-proof packaging", "5-7 day delivery", "Tracking included"],
    price: "Starting ₹3,500 (0.5g)",
    icon: Package,
    gradient: "from-amber-400 to-yellow-600",
    popular: true,
  },
  {
    id: "phygital",
    title: "💡 Combo: Digital + Physical",
    description: "Best of both worlds - perfect for special occasions",
    features: ["Physical coin + Digital top-up", "QR code integration", "Premium packaging", "Dual certificates"],
    price: "Starting ₹5,000",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-600",
    popular: false,
  },
]

export default function GiftGoldPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleContinue = () => {
    if (selectedOption) {
      window.location.href = `/gift/${selectedOption}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Gift className="w-6 h-6 text-gold-luxury" />
            <h1 className="text-xl font-semibold text-gray-800">Gift Gold</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🎁 Send Love in Grams</h1>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-gold-luxury animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perfect for weddings, birthdays, festivals, and special moments. Choose how you'd like to gift gold.
          </p>
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            🎊 Festival Special: Extra 0.1g bonus on gifts above ₹5,000
          </Badge>
        </div>

        {/* Main Question */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">What kind of gold would you like to gift?</h2>
        </div>

        {/* Gift Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {giftingOptions.map((option) => {
            const IconComponent = option.icon
            const isSelected = selectedOption === option.id

            return (
              <Card
                key={option.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  isSelected ? "ring-2 ring-gold-luxury shadow-xl scale-105" : "hover:scale-102 hover:shadow-lg"
                } ${option.popular ? "border-gold-luxury border-2" : ""}`}
                onClick={() => handleOptionSelect(option.id)}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gold-luxury text-white px-3 py-1">⭐ Most Popular</Badge>
                  </div>
                )}

                <CardContent className="p-6 space-y-4">
                  {/* Icon and Gradient Background */}
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title and Description */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    <p className="text-lg font-semibold text-gold-luxury">{option.price}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-gold-luxury rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="bg-gold-luxury hover:bg-gold-luxury/90 text-white px-8 py-3 text-lg font-semibold"
          >
            Continue with{" "}
            {selectedOption ? giftingOptions.find((o) => o.id === selectedOption)?.title.split(" ")[1] : "Selection"}
            <Gift className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Why Choose GoldLoop for Gifting?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Instant Delivery</h4>
                <p className="text-sm text-gray-600">Digital gifts delivered in seconds</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Certified Quality</h4>
                <p className="text-sm text-gray-600">Augmont certified 24K gold</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Personalized</h4>
                <p className="text-sm text-gray-600">Custom messages and themes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Gifts (Mock Data) */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎁 Recent Gifts Sent</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Wedding Gift to Priya</p>
                  <p className="text-sm text-gray-600">2.5g Digital Gold • Delivered</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Claimed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Birthday Gift to Mom</p>
                  <p className="text-sm text-gray-600">1g Physical Coin • In Transit</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Shipped</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
