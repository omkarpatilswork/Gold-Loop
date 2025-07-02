"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Gift, Smartphone, Mail, MessageCircle, QrCode, Sparkles } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const occasions = [
  { id: "birthday", emoji: "🎂", label: "Birthday", color: "from-pink-400 to-red-500" },
  { id: "wedding", emoji: "💍", label: "Wedding", color: "from-purple-400 to-pink-500" },
  { id: "baby", emoji: "🧒", label: "Baby Shower", color: "from-blue-400 to-cyan-500" },
  { id: "diwali", emoji: "🎊", label: "Diwali", color: "from-yellow-400 to-orange-500" },
  { id: "custom", emoji: "✨", label: "Custom", color: "from-gray-400 to-gray-600" },
]

const giftThemes = [
  { id: "elegant", name: "Elegant Gold", preview: "🌟 Golden elegance" },
  { id: "festive", name: "Festival Joy", preview: "🎊 Celebration time" },
  { id: "minimal", name: "Minimal", preview: "✨ Simple & beautiful" },
  { id: "traditional", name: "Traditional", preview: "🪔 Classic design" },
]

const deliveryMethods = [
  { id: "email", icon: Mail, label: "Email", description: "Send via email" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", description: "Send via WhatsApp" },
  { id: "qr", icon: QrCode, label: "QR Code", description: "Generate shareable QR" },
]

const mockGoldPrice = 5790

export default function DigitalGiftPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState("")
  const [amountType, setAmountType] = useState<"rupees" | "grams">("rupees")
  const [roundUp, setRoundUp] = useState(false)
  const [recipientName, setRecipientName] = useState("")
  const [recipientContact, setRecipientContact] = useState("")
  const [message, setMessage] = useState("")
  const [selectedOccasion, setSelectedOccasion] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("elegant")
  const [deliveryMethod, setDeliveryMethod] = useState("whatsapp")
  const [scheduleDelivery, setScheduleDelivery] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [senderName, setSenderName] = useState("Omkar")
  const { toast } = useToast()

  const calculateGrams = (rupees: number) => (rupees / mockGoldPrice).toFixed(3)
  const calculateRupees = (grams: number) => (grams * mockGoldPrice).toFixed(0)

  const finalAmount =
    roundUp && amount ? Math.ceil(Number.parseFloat(amount) / 100) * 100 : Number.parseFloat(amount) || 0
  const bonusGrams = finalAmount > 5000 ? 0.1 : 0

  const handleSendGift = () => {
    toast({
      title: "🎉 Gift Sent Successfully!",
      description: `${recipientName} will receive their ${amountType === "rupees" ? calculateGrams(finalAmount) : amount}g gold gift`,
    })
    // Navigate to success page
    window.location.href = "/gift/success"
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Smartphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">💛 Digital Gold Gift</h2>
              <p className="text-gray-600">Choose the amount of gold to gift</p>
            </div>

            {/* Real-time Price */}
            <Card className="bg-gradient-to-r from-gold-light to-accent/20 border-gold-light/50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600">Live Gold Price</p>
                <p className="text-2xl font-bold text-gray-800">₹{mockGoldPrice}/g</p>
              </CardContent>
            </Card>

            {/* Amount Input */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-2">
                  <Button
                    variant={amountType === "rupees" ? "default" : "outline"}
                    onClick={() => setAmountType("rupees")}
                    className="flex-1"
                  >
                    ₹ Rupees
                  </Button>
                  <Button
                    variant={amountType === "grams" ? "default" : "outline"}
                    onClick={() => setAmountType("grams")}
                    className="flex-1"
                  >
                    g Grams
                  </Button>
                </div>

                <div>
                  <Label htmlFor="amount">{amountType === "rupees" ? "Amount in Rupees" : "Amount in Grams"}</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={amountType === "rupees" ? "Enter amount in ₹" : "Enter grams"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {amount && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Gift Amount:</p>
                    <p className="text-xl font-bold text-blue-800">
                      {amountType === "rupees"
                        ? `${calculateGrams(Number.parseFloat(amount))} grams`
                        : `₹${calculateRupees(Number.parseFloat(amount))}`}
                    </p>
                  </div>
                )}

                {/* Round-up Option */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <Label htmlFor="roundup" className="font-medium">
                      Auto Round-up & Gift Bonus
                    </Label>
                    <p className="text-sm text-gray-600">
                      {amount && roundUp
                        ? `Round up to ₹${Math.ceil(Number.parseFloat(amount) / 100) * 100} and add bonus grams`
                        : "Round up to nearest ₹100 for bonus grams"}
                    </p>
                  </div>
                  <Switch id="roundup" checked={roundUp} onCheckedChange={setRoundUp} />
                </div>

                {finalAmount > 5000 && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">
                        🎊 Festival Bonus: +{bonusGrams}g extra gold!
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Recipient Details</h2>
              <p className="text-gray-600">Who are you sending this gift to?</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    placeholder="Enter recipient's name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="recipientContact">Email or Mobile *</Label>
                  <Input
                    id="recipientContact"
                    placeholder="email@example.com or +91 9876543210"
                    value={recipientContact}
                    onChange={(e) => setRecipientContact(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Linked to GoldLoop account for instant delivery</p>
                </div>

                <div>
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Write a heartfelt message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">{message.length}/200 characters</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Occasion</h2>
              <p className="text-gray-600">Make it special with the perfect theme</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {occasions.map((occasion) => (
                    <div
                      key={occasion.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedOccasion === occasion.id
                          ? "border-gold-luxury bg-gold-luxury/10"
                          : "border-gray-200 hover:border-gold-luxury/50"
                      }`}
                      onClick={() => setSelectedOccasion(occasion.id)}
                    >
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${occasion.color} flex items-center justify-center mx-auto mb-2`}
                        >
                          <span className="text-2xl">{occasion.emoji}</span>
                        </div>
                        <p className="font-medium text-gray-800">{occasion.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedOccasion === "custom" && (
                  <div className="mt-4">
                    <Label htmlFor="customOccasion">Custom Occasion</Label>
                    <Input id="customOccasion" placeholder="Enter custom occasion" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gift Card Theme */}
            <Card>
              <CardHeader>
                <CardTitle>Gift Card Theme</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
                  <div className="grid grid-cols-2 gap-4">
                    {giftThemes.map((theme) => (
                      <div key={theme.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={theme.id} id={theme.id} />
                        <Label htmlFor={theme.id} className="flex-1 cursor-pointer">
                          <div>
                            <p className="font-medium">{theme.name}</p>
                            <p className="text-sm text-gray-600">{theme.preview}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Options</h2>
              <p className="text-gray-600">How would you like to send the gift?</p>
            </div>

            {/* Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle>Send via</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="space-y-3">
                    {deliveryMethods.map((method) => {
                      const IconComponent = method.icon
                      return (
                        <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <IconComponent className="w-5 h-5 text-gray-600" />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">{method.label}</p>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Schedule Delivery */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="schedule" className="font-medium">
                      Schedule Delivery
                    </Label>
                    <p className="text-sm text-gray-600">Send now or choose a specific date</p>
                  </div>
                  <Switch id="schedule" checked={scheduleDelivery} onCheckedChange={setScheduleDelivery} />
                </div>

                {scheduleDelivery && (
                  <div>
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sender Name */}
            <Card>
              <CardContent className="p-6">
                <div>
                  <Label htmlFor="senderName">Sender Name (Optional)</Label>
                  <Input
                    id="senderName"
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">This will appear on the gift card</p>
                </div>
              </CardContent>
            </Card>

            {/* Gift Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Gift Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Recipient:</span>
                    <span className="font-medium">{recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gold Amount:</span>
                    <span className="font-medium">
                      {amountType === "rupees" ? calculateGrams(finalAmount) : amount}g
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Value:</span>
                    <span className="font-medium">₹{finalAmount.toLocaleString()}</span>
                  </div>
                  {bonusGrams > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Festival Bonus:</span>
                      <span className="font-medium">+{bonusGrams}g</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="font-medium">{scheduleDelivery ? deliveryDate : "Instant"}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/gift">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Digital Gold Gift</h1>
                <p className="text-sm text-gray-600">Step {step} of 4</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                  (step === 1 && !amount) ||
                  (step === 2 && (!recipientName || !recipientContact)) ||
                  (step === 3 && !selectedOccasion)
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSendGift}
                disabled={!recipientName || !recipientContact || !amount}
                className="bg-green-600 hover:bg-green-700"
              >
                <Gift className="w-4 h-4 mr-2" />
                Send Gift
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
