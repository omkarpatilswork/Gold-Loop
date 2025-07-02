"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, CreditCard, Gift, Package, CheckCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DeliveryAddress {
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

interface PhysicalDeliveryProps {
  certificateId: string
  goldAmount: number
  goldValue: number
  onClose?: () => void
}

export function PhysicalDeliveryFlow({ certificateId, goldAmount, goldValue, onClose }: PhysicalDeliveryProps) {
  const [step, setStep] = useState(1)
  const [deliveryType, setDeliveryType] = useState("standard")
  const [envelopeDesign, setEnvelopeDesign] = useState("standard")
  const [address, setAddress] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [specialMessage, setSpecialMessage] = useState("")
  const { toast } = useToast()

  const deliveryFee = goldValue > 5000 ? 0 : 99
  const isEligibleForFree = goldValue > 5000

  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handleOrderDelivery = () => {
    toast({
      title: "Physical Certificate Ordered! 📦",
      description: "Your certificate will be delivered in 3-5 business days",
    })
    setStep(4)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Package className="w-16 h-16 text-gold-luxury mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Physical Certificate Delivery</h2>
              <p className="text-gray-600">Get your gold certificate delivered to your doorstep</p>
            </div>

            <Card className="bg-gradient-to-r from-gold-ivory to-white border-gold-luxury/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Certificate Details</h3>
                    <p className="text-sm text-gray-600">ID: {certificateId}</p>
                    <p className="text-sm text-gray-600">
                      {goldAmount}g • ₹{goldValue.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-gold-luxury text-gold-luxury">
                    Premium Quality
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Delivery Options</h3>

              <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Standard Delivery</p>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {isEligibleForFree ? <span className="text-green-600">FREE</span> : "₹99"}
                        </p>
                        {isEligibleForFree && <p className="text-xs text-green-600">Purchase &gt; ₹5000</p>}
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Express Delivery</p>
                        <p className="text-sm text-gray-600">2-3 business days</p>
                      </div>
                      <p className="font-semibold">₹199</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={() => setStep(2)} className="w-full bg-gold-luxury hover:bg-gold-luxury/90">
              Continue to Address
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gold-luxury mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Address</h2>
              <p className="text-gray-600">Where should we send your certificate?</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={address.name}
                    onChange={(e) => handleAddressChange("name", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={address.phone}
                    onChange={(e) => handleAddressChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Complete Address</Label>
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
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={address.state}
                    onChange={(e) => handleAddressChange("state", e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={address.pincode}
                    onChange={(e) => handleAddressChange("pincode", e.target.value)}
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-gold-luxury hover:bg-gold-luxury/90"
                disabled={!address.name || !address.phone || !address.address}
              >
                Continue to Customization
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Gift className="w-16 h-16 text-gold-luxury mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Certificate</h2>
              <p className="text-gray-600">Make it special with personalized touches</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Envelope Design</h3>

              <RadioGroup value={envelopeDesign} onValueChange={setEnvelopeDesign}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="standard" id="env-standard" />
                  <Label htmlFor="env-standard" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Standard Envelope</p>
                        <p className="text-sm text-gray-600">Premium ivory paper with gold seal</p>
                      </div>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="wedding" id="env-wedding" />
                  <Label htmlFor="env-wedding" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Wedding Special</p>
                        <p className="text-sm text-gray-600">Decorative design with golden motifs</p>
                      </div>
                      <span className="font-semibold">₹49</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="festival" id="env-festival" />
                  <Label htmlFor="env-festival" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Festival Edition</p>
                        <p className="text-sm text-gray-600">Traditional patterns and colors</p>
                      </div>
                      <span className="font-semibold">₹49</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="message">Special Message (Optional)</Label>
              <Textarea
                id="message"
                value={specialMessage}
                onChange={(e) => setSpecialMessage(e.target.value)}
                placeholder="Add a personal message to be printed on the certificate"
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{specialMessage.length}/200 characters</p>
            </div>

            {/* Order Summary */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Certificate Printing</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery ({deliveryType})</span>
                    <span>
                      {deliveryType === "standard" && isEligibleForFree
                        ? "FREE"
                        : deliveryType === "standard"
                          ? "₹99"
                          : "₹199"}
                    </span>
                  </div>
                  {envelopeDesign !== "standard" && (
                    <div className="flex justify-between">
                      <span>Special Envelope</span>
                      <span>₹49</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ₹
                      {(deliveryType === "standard" && isEligibleForFree ? 0 : deliveryType === "standard" ? 99 : 199) +
                        (envelopeDesign !== "standard" ? 49 : 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleOrderDelivery} className="flex-1 bg-gold-luxury hover:bg-gold-luxury/90">
                <CreditCard className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <div className="absolute inset-0 animate-ping">
                <CheckCircle className="w-20 h-20 text-green-600 opacity-75 mx-auto" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-4">Your physical certificate is being prepared</p>

              <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
                Order ID: PCO-{certificateId.slice(-6)}
              </Badge>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                <div className="space-y-3 text-sm text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <span>Certificate printed on premium paper with gold foil seal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <span>Packaged in your selected envelope design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <span>Shipped via secure courier with tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">4</span>
                    </div>
                    <span>Delivered to your doorstep in 3-5 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Track Order
              </Button>
              <Button onClick={onClose} className="flex-1 bg-gold-luxury hover:bg-gold-luxury/90">
                Done
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Progress Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum ? "bg-gold-luxury text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && <div className={`w-12 h-1 mx-2 ${step > stepNum ? "bg-gold-luxury" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      )}

      <Card className="shadow-lg">
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>
    </div>
  )
}
