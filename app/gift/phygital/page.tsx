"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles, Package, Smartphone, QrCode, Gift, Award } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const phygitalCoins = [
  {
    id: "1g-combo",
    physicalWeight: "1g",
    physicalPrice: 7000,
    digitalRange: { min: 100, max: 10000 },
    image: "🥇",
    features: ["1g Physical Coin", "Digital Gold Top-up", "QR Integration", "Dual Certificates"],
    popular: true,
  },
  {
    id: "2g-combo",
    physicalWeight: "2g",
    physicalPrice: 14000,
    digitalRange: { min: 500, max: 25000 },
    image: "🏆",
    features: ["2g Physical Coin", "Digital Gold Top-up", "Premium QR Packaging", "Luxury Certificates"],
    popular: false,
  },
  {
    id: "5g-combo",
    physicalWeight: "5g",
    physicalPrice: 35000,
    digitalRange: { min: 1000, max: 50000 },
    image: "👑",
    features: ["5g Physical Coin", "Digital Gold Top-up", "Premium QR Box", "Collector's Certificates"],
    popular: false,
  },
]

interface DeliveryAddress {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
}

export default function PhygitalGiftPage() {
  const [step, setStep] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState("")
  const [digitalTopUp, setDigitalTopUp] = useState("")
  const [address, setAddress] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [customMessage, setCustomMessage] = useState("")
  const [occasionCard, setOccasionCard] = useState(true)
  const [videoNote, setVideoNote] = useState(false)
  const { toast } = useToast()

  const selectedCoinData = phygitalCoins.find((coin) => coin.id === selectedCoin)
  const digitalAmount = Number.parseFloat(digitalTopUp) || 0
  const totalValue = (selectedCoinData?.physicalPrice || 0) + digitalAmount
  const deliveryFee = totalValue > 10000 ? 0 : 99

  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handleOrderPhygitalGift = () => {
    toast({
      title: "🎉 Phygital Gold Gift Ordered!",
      description: "Physical coin + digital gold with QR integration",
    })
    window.location.href = "/gift/success"
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">💡 Phygital Gold Combo</h2>
              <p className="text-gray-600">Perfect for weddings, new baby, housewarming & special occasions</p>
              <Badge className="mt-2 bg-purple-100 text-purple-800">Best of Both Worlds</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {phygitalCoins.map((coin) => (
                <Card
                  key={coin.id}
                  className={`cursor-pointer transition-all ${
                    selectedCoin === coin.id ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md"
                  } ${coin.popular ? "border-purple-500 border-2" : ""}`}
                  onClick={() => setSelectedCoin(coin.id)}
                >
                  {coin.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-500 text-white">⭐ Most Popular</Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{coin.image}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{coin.physicalWeight} Physical + Digital</h3>
                          <p className="text-lg font-semibold text-purple-600">
                            ₹{coin.physicalPrice.toLocaleString()} + Digital Top-up
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Digital range: ₹{coin.digitalRange.min} - ₹{coin.digitalRange.max.toLocaleString()}
                          </p>
                          <div className="space-y-1">
                            {coin.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {selectedCoin === coin.id && (
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* How it Works */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">How Phygital Gifting Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Physical Coin Delivered</p>
                    <p className="text-xs text-gray-600">Certified gold coin to doorstep</p>
                  </div>
                  <div className="text-center">
                    <QrCode className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">QR Code on Package</p>
                    <p className="text-xs text-gray-600">Scan to claim digital gold</p>
                  </div>
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Auto-Redeem Digital</p>
                    <p className="text-xs text-gray-600">Instant digital gold in app</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Smartphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Digital Gold Top-up</h2>
              <p className="text-gray-600">Choose additional digital gold amount</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="digitalAmount">Digital Gold Amount (₹)</Label>
                  <Input
                    id="digitalAmount"
                    type="number"
                    placeholder={`₹${selectedCoinData?.digitalRange.min} - ₹${selectedCoinData?.digitalRange.max.toLocaleString()}`}
                    value={digitalTopUp}
                    onChange={(e) => setDigitalTopUp(e.target.value)}
                    min={selectedCoinData?.digitalRange.min}
                    max={selectedCoinData?.digitalRange.max}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Range: ₹{selectedCoinData?.digitalRange.min} - ₹
                    {selectedCoinData?.digitalRange.max.toLocaleString()}
                  </p>
                </div>

                {digitalAmount > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Gift Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Physical Gold ({selectedCoinData?.physicalWeight}):</span>
                        <span>₹{selectedCoinData?.physicalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Digital Gold:</span>
                        <span>₹{digitalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total Value:</span>
                        <span>₹{totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[1000, 2500, 5000, 10000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDigitalTopUp(amount.toString())}
                      disabled={
                        amount < (selectedCoinData?.digitalRange.min || 0) ||
                        amount > (selectedCoinData?.digitalRange.max || 0)
                      }
                    >
                      ₹{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* QR Integration Preview */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <QrCode className="w-12 h-12 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">QR Code Integration</h4>
                    <p className="text-sm text-gray-600">
                      A unique QR code will be printed on the coin packaging. Recipient can scan to instantly claim ₹
                      {digitalAmount.toLocaleString()} digital gold!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipient Details</h2>
              <p className="text-gray-600">Where should we deliver this special gift?</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Recipient Name *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => handleAddressChange("name", e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={address.phone}
                      onChange={(e) => handleAddressChange("phone", e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={address.email}
                    onChange={(e) => handleAddressChange("email", e.target.value)}
                    placeholder="email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">For digital gold certificate delivery</p>
                </div>

                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={address.address}
                    onChange={(e) => handleAddressChange("address", e.target.value)}
                    placeholder="House/Flat No, Street, Locality"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={address.pincode}
                      onChange={(e) => handleAddressChange("pincode", e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Award className="w-16 h-16 text-gold-luxury mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Gift</h2>
              <p className="text-gray-600">Add personal touches for a memorable experience</p>
            </div>

            {/* Custom Message */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="customMessage">Custom Message</Label>
                  <Textarea
                    id="customMessage"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Write a heartfelt message for the recipient..."
                    rows={4}
                    maxLength={300}
                  />
                  <p className="text-xs text-gray-500 mt-1">{customMessage.length}/300 characters</p>
                </div>

                {/* Occasion Card */}
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div>
                    <Label className="font-medium">Include Occasion Card</Label>
                    <p className="text-sm text-gray-600">Beautiful greeting card with your message</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={occasionCard}
                    onChange={(e) => setOccasionCard(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>

                {/* Video Note */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <Label className="font-medium">Add Video Note (Coming Soon)</Label>
                    <p className="text-sm text-gray-600">Record a personal video message</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={videoNote}
                    onChange={(e) => setVideoNote(e.target.checked)}
                    className="w-4 h-4"
                    disabled
                  />
                </div>
              </CardContent>
            </Card>

            {/* Final Summary */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Complete Gift Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recipient:</span>
                    <span className="font-medium">{address.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Physical Gold:</span>
                    <span className="font-medium">
                      {selectedCoinData?.physicalWeight} (₹{selectedCoinData?.physicalPrice.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Digital Gold:</span>
                    <span className="font-medium">₹{digitalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Delivery:</span>
                    <span className="font-medium">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  {occasionCard && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Occasion Card:</span>
                      <span className="font-medium">₹49</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{(totalValue + deliveryFee + (occasionCard ? 49 : 0)).toLocaleString()}</span>
                  </div>
                </div>

                {/* What Recipient Gets */}
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">🎁 What Recipient Gets:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span>Physical gold coin delivered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <QrCode className="w-4 h-4 text-purple-600" />
                      <span>QR code on packaging</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-purple-600" />
                      <span>Digital gold via QR scan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>Dual certificates (physical + digital)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/gift">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Phygital Gold Gift</h1>
                <p className="text-sm text-gray-600">Step {step} of 4</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
              Previous
            </Button>

            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedCoin) ||
                  (step === 2 && !digitalTopUp) ||
                  (step === 3 && (!address.name || !address.phone || !address.email || !address.address))
                }
                className="bg-purple-600 hover:bg-purple-700"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleOrderPhygitalGift}
                disabled={!selectedCoin || !digitalTopUp || !address.name}
                className="bg-green-600 hover:bg-green-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Order Phygital Gift
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
