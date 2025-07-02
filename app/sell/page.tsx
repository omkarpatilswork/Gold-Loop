"use client"

import { useState } from "react"
import { ArrowRight, TrendingDown, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

const portfolioData = {
  totalGold: 15.5, // grams
  currentValue: 102750,
  purchaseValue: 89500,
  profit: 13250,
  profitPercentage: 14.8,
  holdings: [
    {
      id: 1,
      type: "SIP Investment",
      gold: 8.2,
      value: 54330,
      purchasePrice: 58500,
      currentPrice: 66300,
    },
    {
      id: 2,
      type: "One-time Purchase",
      gold: 4.8,
      value: 31824,
      purchasePrice: 59200,
      currentPrice: 66300,
    },
    {
      id: 3,
      type: "Gift Received",
      gold: 2.5,
      value: 16575,
      purchasePrice: 60000,
      currentPrice: 66300,
    },
  ],
}

export default function SellGoldPage() {
  const [sellAmount, setSellAmount] = useState([25]) // percentage
  const [selectedHoldings, setSelectedHoldings] = useState<number[]>([])
  const [showTaxInfo, setShowTaxInfo] = useState(false)

  const sellValue = (portfolioData.currentValue * sellAmount[0]) / 100
  const sellGold = (portfolioData.totalGold * sellAmount[0]) / 100
  const taxAmount = sellValue > 50000 ? sellValue * 0.01 : 0 // 1% TDS if > 50k
  const netAmount = sellValue - taxAmount

  const toggleHolding = (id: number) => {
    setSelectedHoldings((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sell Gold</h1>
            <p className="text-sm text-gray-600">Convert to instant money</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Live Rate</p>
            <p className="text-sm font-semibold text-red-600">₹66,300/10g</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Portfolio Overview */}
        <Card className="mt-4 bg-gradient-to-r from-gold-light/20 to-gold-DEFAULT/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Your Gold Portfolio</h3>
              <Badge className="bg-green-100 text-green-700">+{portfolioData.profitPercentage}%</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600">Total Gold</div>
                <div className="font-semibold">{portfolioData.totalGold}g</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Current Value</div>
                <div className="font-semibold">₹{portfolioData.currentValue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Investment</div>
                <div className="font-semibold">₹{portfolioData.purchaseValue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Profit</div>
                <div className="font-semibold text-green-600">+₹{portfolioData.profit.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sell Amount Selector */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">How much do you want to sell?</h3>

            {/* Percentage Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Sell Amount</span>
                <span className="font-semibold">{sellAmount[0]}%</span>
              </div>
              <Slider value={sellAmount} onValueChange={setSellAmount} max={100} min={1} step={1} className="mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    onClick={() => setSellAmount([percent])}
                    className="text-xs"
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>

            {/* Sell Summary */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gold to sell:</span>
                  <span className="font-semibold">{sellGold.toFixed(2)}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Gross Amount:</span>
                  <span className="font-semibold">₹{sellValue.toLocaleString()}</span>
                </div>
                {taxAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>TDS (1%):</span>
                    <span className="font-semibold text-red-600">-₹{taxAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Net Amount:</span>
                    <span className="font-bold text-green-600">₹{netAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Holdings Selection */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Select Holdings to Sell</h3>
            <p className="text-xs text-gray-600 mb-4">Choose which investments to liquidate first</p>

            <div className="space-y-3">
              {portfolioData.holdings.map((holding) => {
                const profit = holding.value - (holding.gold * holding.purchasePrice) / 10
                const profitPercent = ((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) * 100

                return (
                  <Card
                    key={holding.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedHoldings.includes(holding.id) ? "ring-2 ring-red-400 bg-red-50" : "hover:shadow-md"
                    }`}
                    onClick={() => toggleHolding(holding.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{holding.type}</span>
                            <Badge
                              className={`text-xs ${
                                profitPercent > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}
                            >
                              {profitPercent > 0 ? "+" : ""}
                              {profitPercent.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div>Gold: {holding.gold}g</div>
                            <div>Value: ₹{holding.value.toLocaleString()}</div>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedHoldings.includes(holding.id) ? "border-red-400 bg-red-400" : "border-gray-300"
                          }`}
                        >
                          {selectedHoldings.includes(holding.id) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card className="mt-4 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 text-sm">Tax Information</h4>
                <div className="text-xs text-yellow-700 mt-1 space-y-1">
                  <div>• TDS of 1% applicable on sales above ₹50,000</div>
                  <div>• Capital gains tax may apply based on holding period</div>
                  <div>• You'll receive Form 16A for TDS deducted</div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-yellow-700 p-0 h-auto text-xs mt-2"
                  onClick={() => setShowTaxInfo(!showTaxInfo)}
                >
                  {showTaxInfo ? "Hide" : "Show"} detailed tax info
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Time */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-800 text-sm">Processing Time</span>
            </div>
            <div className="text-xs text-blue-700">Money will be credited to your account within 2-3 business days</div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-gray-600" />
              Recent Sales Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">2.1g sold</div>
                  <div className="text-xs text-gray-600">Dec 15, 2023</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹13,923</div>
                  <div className="text-xs text-green-600">Completed</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">1.5g sold</div>
                  <div className="text-xs text-gray-600">Nov 28, 2023</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹9,945</div>
                  <div className="text-xs text-green-600">Completed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="mb-2 text-center">
          <div className="text-sm text-gray-600">You'll receive</div>
          <div className="text-xl font-bold text-green-600">₹{netAmount.toLocaleString()}</div>
        </div>
        <Link href="/sell/payment">
          <Button
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg"
            disabled={sellAmount[0] === 0}
          >
            Proceed to Sell
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
