"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Package, Truck, Shield, Award, MapPin } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const goldCoins = [
  {
    id: "0.5g",
    weight: "0.5g",
    price: 3500,
    image: "🪙",
    features: ["Augmont Certified", "Tamper-proof packaging", "BIS Hallmark"],
    popular: false,
  },
  {
    id: "1g",
    weight: "1g",
    price: 7000,
    image: "🥇",
    features: ["Augmont Certified", "Premium packaging", "BIS Hallmark", "Gift box included"],
    popular: true,
  },
  {
    id: "2g",
    weight: "2g",
    price: 14000,
    image: "🏆",
    features: ["Augmont Certified", "Luxury packaging", "BIS Hallmark", "Premium gift box"],
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

export default function PhysicalGiftPage() {
  const [step, setStep] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState("")
  const [address, setAddress] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [occasionCard, setOccasionCard] = useState(false)
  const [printedMessage, setPrintedMessage] = useState("")
  const [deliverySpeed, setDeliverySpeed] = useState("standard")
  const { toast } = useToast()

  const selectedCoinData = goldCoins.find((coin) => coin.id === selectedCoin)
  const deliveryFee = selectedCoinData && selectedCoinData.price > 10000 ? 0 : 99
  const isEligibleForFree = selectedCoinData && selectedCoinData.price > 10000

  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handleOrderGift = () => {
    toast({
      title: "🎉 Physical Gold Gift Ordered!",
      description: "Your gift will be delivered in 5-7 business days with tracking",
    })
    window.location.href = "/gift/success"
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Package className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🪙 Physical Gold Coin</h2>
              <p className="text-gray-600">Choose the perfect gold coin for your gift</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {goldCoins.map((coin) => (
                <Card
                  key={coin.id}
                  className={`cursor-pointer transition-all ${
                    selectedCoin === coin.id ? "ring-2 ring-amber-500 shadow-lg" : "hover:shadow-md"
                  } ${coin.popular ? "border-amber-500 border-2" : ""}`}
                  onClick={() => setSelectedCoin(coin.id)}
                >
                  {coin.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-amber-500 text-white">⭐ Most Popular</Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{coin.image}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{coin.weight} Gold Coin</h3>
                          <p className="text-2xl font-bold text-amber-600">₹{coin.price.toLocaleString()}</p>
                          <div className="mt-2 space-y-1">
                            {coin.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {selectedCoin === coin.id && (
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Certified</p>
                    <p className="text-xs text-gray-600">Augmont & BIS</p>
                  </div>
                  <div>
                    <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">99.9% Pure</p>
                    <p className="text-xs text-gray-600">24K Gold</p>
                  </div>
                  <div>
                    <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Secure</p>
                    <p className="text-xs text-gray-600">Tamper-proof</p>
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
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Details</h2>
              <p className="text-gray-600">Where should we deliver the gold coin?</p>
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

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Package className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Gift</h2>
              <p className="text-gray-600">Add special touches to make it memorable</p>
            </div>

            {/* Occasion Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="font-medium">Add Occasion Card</Label>
                    <p className="text-sm text-gray-600">Include a beautiful greeting card</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={occasionCard}
                    onChange={(e) => setOccasionCard(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>

                {occasionCard && (
                  <div>
                    <Label htmlFor="printedMessage">Message for Card</Label>
                    <Textarea
                      id="printedMessage"
                      value={printedMessage}
                      onChange={(e) => setPrintedMessage(e.target.value)}
                      placeholder="Write a message to be printed on the card..."
                      rows={3}
                      maxLength={150}
                    />
                    <p className="text-xs text-gray-500 mt-1">{printedMessage.length}/150 characters</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Speed */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliverySpeed} onValueChange={setDeliverySpeed}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Standard Delivery</p>
                            <p className="text-sm text-gray-600">5-7 business days</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {isEligibleForFree ? <span className="text-green-600">FREE</span> : "₹99"}
                            </p>
                            {isEligibleForFree && <p className="text-xs text-green-600">Order &gt; ₹10,000</p>}
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Express Delivery</p>
                            <p className="text-sm text-gray-600">2-3 business days</p>
                          </div>
                          <p className="font-semibold">₹199</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Gold Coin ({selectedCoinData?.weight}):</span>
                    <span className="font-medium">₹{selectedCoinData?.price.toLocaleString()}</span>
                  </div>
                  {occasionCard && (
                    <div className="flex justify-between">
                      <span>Occasion Card:</span>
                      <span className="font-medium">₹49</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery ({deliverySpeed}):</span>
                    <span className="font-medium">
                      {deliverySpeed === "standard" && isEligibleForFree
                        ? "FREE"
                        : deliverySpeed === "standard"
                          ? "₹99"
                          : "₹199"}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>
                      ₹
                      {(
                        (selectedCoinData?.price || 0) +
                        (occasionCard ? 49 : 0) +
                        (deliverySpeed === "standard" && isEligibleForFree
                          ? 0
                          : deliverySpeed === "standard"
                            ? 99
                            : 199)
                      ).toLocaleString()}
                    </span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/gift">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Physical Gold Gift</h1>
                <p className="text-sm text-gray-600">Step {step} of 3</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
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

            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedCoin) ||
                  (step === 2 && (!address.name || !address.phone || !address.email || !address.address))
                }
                className="bg-amber-600 hover:bg-amber-700"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleOrderGift}
                disabled={!selectedCoin || !address.name}
                className="bg-green-600 hover:bg-green-700"
              >
                <Truck className="w-4 h-4 mr-2" />
                Order Gift
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
