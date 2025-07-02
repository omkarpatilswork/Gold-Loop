"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Coins, CreditCard, Smartphone, Building } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const mockGoldPrice = 5790

export default function BuyGoldPage() {
  const [amount, setAmount] = useState("")
  const [amountType, setAmountType] = useState<"rupees" | "grams">("rupees")
  const [roundUp, setRoundUp] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const { toast } = useToast()

  const calculateGrams = (rupees: number) => (rupees / mockGoldPrice).toFixed(3)
  const calculateRupees = (grams: number) => (grams * mockGoldPrice).toFixed(0)

  const finalAmount =
    roundUp && amount ? Math.ceil(Number.parseFloat(amount) / 100) * 100 : Number.parseFloat(amount) || 0

  const handleBuy = () => {
    if (!amount) {
      toast({
        title: "Please enter an amount",
        variant: "destructive",
      })
      return
    }

    // Redirect to success page with transaction details
    const params = new URLSearchParams({
      amount: finalAmount.toString(),
      goldAmount: (amountType === "rupees" ? calculateGrams(finalAmount) : amount).toString(),
      paymentMethod: paymentMethod,
      roundUp: roundUp.toString(),
    })

    window.location.href = `/buy/success?${params.toString()}`
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
          <h1 className="text-xl font-semibold text-gray-800">Buy Gold</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Real-time Price */}
        <Card className="bg-gradient-to-r from-gold-light to-accent/20 border-gold-light/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Current Gold Price</p>
              <p className="text-3xl font-bold text-gray-800">₹{mockGoldPrice}/g</p>
              <Badge variant="secondary" className="mt-2">
                Live Price
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-accent" />
              <span>How much gold do you want to buy?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle between Rupees and Grams */}
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
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">You will get:</p>
                <p className="text-lg font-semibold">
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
                  Enable Round-Up
                </Label>
                <p className="text-sm text-gray-600">
                  {amount && roundUp
                    ? `Round up to ₹${Math.ceil(Number.parseFloat(amount) / 100) * 100}`
                    : "Round up to nearest ₹100"}
                </p>
              </div>
              <Switch id="roundup" checked={roundUp} onCheckedChange={setRoundUp} />
            </div>

            {roundUp && amount && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  Extra ₹{finalAmount - Number.parseFloat(amount)} will be added to your Round-Up savings!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === "upi" ? "border-accent bg-accent/10" : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">UPI</p>
                  <p className="text-sm text-gray-600">Pay with any UPI app</p>
                </div>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === "card" ? "border-accent bg-accent/10" : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">Debit/Credit Card</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                </div>
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === "netbanking" ? "border-accent bg-accent/10" : "border-gray-200"
              }`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium">Net Banking</p>
                  <p className="text-sm text-gray-600">All major banks supported</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buy Button */}
        <Button
          onClick={handleBuy}
          className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-lg font-semibold"
          disabled={!amount}
        >
          Buy Gold for ₹{finalAmount.toLocaleString()}
        </Button>
      </div>
    </div>
  )
}
