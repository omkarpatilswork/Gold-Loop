"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, TrendingUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

const frequencies = [
  { id: "weekly", label: "Weekly", multiplier: 4.33, popular: false },
  { id: "monthly", label: "Monthly", multiplier: 1, popular: true },
  { id: "quarterly", label: "Quarterly", multiplier: 0.33, popular: false },
]

const sipDates = [1, 5, 10, 15, 20, 25]

export default function SIPSetupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "smart"

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    amount: "",
    frequency: "monthly",
    date: 5,
    duration: "12",
    autoIncrease: false,
  })
  const [projectedValue, setProjectedValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate projected returns
  useEffect(() => {
    if (formData.amount && formData.duration) {
      const monthlyAmount = Number.parseInt(formData.amount)
      const months = Number.parseInt(formData.duration)
      const annualReturn = 0.12 // 12% assumed return

      // SIP future value calculation
      const monthlyReturn = annualReturn / 12
      const futureValue =
        monthlyAmount * (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn))
      setProjectedValue(Math.round(futureValue))
    }
  }, [formData.amount, formData.duration])

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/sip/success")
  }

  const totalInvestment = Number.parseInt(formData.amount || "0") * Number.parseInt(formData.duration || "0")
  const expectedReturns = projectedValue - totalInvestment

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-ivory via-white to-gold-light/20">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gold-light/30">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="sm" onClick={() => (step > 1 ? setStep(step - 1) : router.back())}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Setup Your SIP</h1>
            <p className="text-sm text-gray-600">Step {step} of 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-gold-DEFAULT to-gold-dark h-1 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">How much do you want to invest?</h2>
              <p className="text-gray-600 text-sm">Start with as little as ₹100</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Monthly Investment Amount
                </Label>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="500"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="pl-8 text-lg font-semibold h-12"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[100, 500, 1000, 2000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                      className="text-xs"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Calculation */}
            {formData.amount && (
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-800">Projected Returns</span>
                  </div>
                  <div className="text-sm text-green-700">
                    With ₹{formData.amount}/month for 1 year, you could have:
                  </div>
                  <div className="text-lg font-bold text-green-800 mt-1">
                    ₹{(Number.parseInt(formData.amount) * 12 * 1.12).toLocaleString()}
                    <span className="text-sm font-normal"> (12% returns)</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Frequency */}
        {step === 2 && (
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Choose Investment Frequency</h2>
              <p className="text-gray-600 text-sm">How often do you want to invest?</p>
            </div>

            <div className="space-y-3">
              {frequencies.map((freq) => (
                <Card
                  key={freq.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.frequency === freq.id ? "ring-2 ring-gold-DEFAULT shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setFormData({ ...formData, frequency: freq.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.frequency === freq.id ? "border-gold-DEFAULT bg-gold-DEFAULT" : "border-gray-300"
                          }`}
                        >
                          {formData.frequency === freq.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{freq.label}</span>
                            {freq.popular && <Badge className="bg-gold-DEFAULT text-white text-xs">Popular</Badge>}
                          </div>
                          <div className="text-sm text-gray-600">
                            {freq.id === "weekly" && "Every week on the same day"}
                            {freq.id === "monthly" && "Once every month"}
                            {freq.id === "quarterly" && "Every 3 months"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Date & Duration */}
        {step === 3 && (
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Investment Schedule</h2>
              <p className="text-gray-600 text-sm">Choose date and duration</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium">Investment Date</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {sipDates.map((date) => (
                    <Button
                      key={date}
                      variant={formData.date === date ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData({ ...formData, date })}
                      className={formData.date === date ? "bg-gold-DEFAULT hover:bg-gold-dark" : ""}
                    >
                      {date}th
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Label htmlFor="duration" className="text-sm font-medium">
                  Investment Duration (Months)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="12"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="mt-2"
                />
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[6, 12, 24, 36].map((duration) => (
                    <Button
                      key={duration}
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, duration: duration.toString() })}
                      className="text-xs"
                    >
                      {duration}M
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Review Your SIP</h2>
              <p className="text-gray-600 text-sm">Confirm your investment details</p>
            </div>

            <Card className="bg-gradient-to-r from-gold-light/20 to-gold-DEFAULT/10">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Investment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount:</span>
                    <span className="font-semibold">
                      ₹{formData.amount}/{formData.frequency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-semibold">{formData.duration} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Investment Date:</span>
                    <span className="font-semibold">{formData.date}th of every month</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Investment:</span>
                      <span className="font-semibold">₹{totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expected Value:</span>
                      <span className="font-semibold text-green-600">₹{projectedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expected Returns:</span>
                      <span className="font-semibold text-green-600">+₹{expectedReturns.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Important Notes</h4>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      <li>• SIP will auto-debit from your linked account</li>
                      <li>• You can pause/stop anytime without penalty</li>
                      <li>• Returns are market-linked and not guaranteed</li>
                      <li>• Gold will be stored in secure vaults</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        {step < 4 ? (
          <Button
            onClick={handleNext}
            disabled={(step === 1 && !formData.amount) || (step === 3 && !formData.duration)}
            className="w-full bg-gradient-to-r from-gold-DEFAULT to-gold-dark text-white font-semibold py-3 rounded-xl"
          >
            Continue
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl"
          >
            {isLoading ? "Setting up your SIP..." : "Start My SIP"}
          </Button>
        )}
      </div>
    </div>
  )
}
