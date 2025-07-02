"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Smartphone, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const paymentMethods = [
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct to your bank account",
    icon: Building2,
    processingTime: "2-3 business days",
    fees: "Free",
    popular: true,
  },
  {
    id: "upi",
    name: "UPI",
    description: "Instant transfer via UPI",
    icon: Smartphone,
    processingTime: "Instant",
    fees: "Free",
    popular: false,
  },
]

export default function SellPaymentPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sellAmount = 25650 // From previous page

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (selectedMethod === "bank") {
      if (!formData.accountNumber) newErrors.accountNumber = "Account number is required"
      if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required"
      if (!formData.accountHolderName) newErrors.accountHolderName = "Account holder name is required"

      if (formData.accountNumber && formData.accountNumber.length < 9) {
        newErrors.accountNumber = "Invalid account number"
      }
      if (formData.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
        newErrors.ifscCode = "Invalid IFSC code format"
      }
    } else if (selectedMethod === "upi") {
      if (!formData.upiId) newErrors.upiId = "UPI ID is required"
      if (formData.upiId && !formData.upiId.includes("@")) {
        newErrors.upiId = "Invalid UPI ID format"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/sell/success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Payment Details</h1>
            <p className="text-sm text-gray-600">Where should we send your money?</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Sale Summary */}
        <Card className="mt-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 mb-1">₹{sellAmount.toLocaleString()}</div>
              <div className="text-sm text-green-600">Amount to be credited</div>
              <div className="text-xs text-gray-600 mt-1">2.5g gold • After TDS deduction</div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Choose Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedMethod === method.id ? "ring-2 ring-red-400 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <method.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{method.name}</span>
                          {method.popular && <Badge className="bg-red-100 text-red-700 text-xs">Popular</Badge>}
                        </div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                        <div className="flex gap-4 text-xs text-gray-500 mt-1">
                          <span>⏱️ {method.processingTime}</span>
                          <span>💰 {method.fees}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id ? "border-red-400 bg-red-400" : "border-gray-300"
                      }`}
                    >
                      {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Details Form */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">{selectedMethod === "bank" ? "Bank Account Details" : "UPI Details"}</h3>

            {selectedMethod === "bank" ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountHolderName" className="text-sm font-medium">
                    Account Holder Name
                  </Label>
                  <Input
                    id="accountHolderName"
                    placeholder="Enter full name as per bank"
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    className={errors.accountHolderName ? "border-red-500" : ""}
                  />
                  {errors.accountHolderName && <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>}
                </div>

                <div>
                  <Label htmlFor="accountNumber" className="text-sm font-medium">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className={errors.accountNumber ? "border-red-500" : ""}
                  />
                  {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                </div>

                <div>
                  <Label htmlFor="ifscCode" className="text-sm font-medium">
                    IFSC Code
                  </Label>
                  <Input
                    id="ifscCode"
                    placeholder="Enter IFSC code"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                    className={errors.ifscCode ? "border-red-500" : ""}
                  />
                  {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="upiId" className="text-sm font-medium">
                  UPI ID
                </Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className={errors.upiId ? "border-red-500" : ""}
                />
                {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                <div className="mt-2 text-xs text-gray-600">
                  Enter your UPI ID (e.g., 9876543210@paytm, name@googlepay)
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 text-sm">Secure Transaction</h4>
                <div className="text-xs text-blue-700 mt-1 space-y-1">
                  <div>• Your payment details are encrypted and secure</div>
                  <div>• We never store your banking information</div>
                  <div>• Transaction is processed through secure payment gateway</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Info */}
        <Card className="mt-4 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 text-sm">Processing Timeline</h4>
                <div className="text-xs text-yellow-700 mt-1 space-y-1">
                  <div>• Sale confirmation: Immediate</div>
                  <div>• Payment processing: {selectedMethod === "upi" ? "Instant" : "2-3 business days"}</div>
                  <div>• SMS & email updates at each step</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="mb-2 text-center">
          <div className="text-sm text-gray-600">Final amount</div>
          <div className="text-xl font-bold text-green-600">₹{sellAmount.toLocaleString()}</div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg"
        >
          {isLoading ? "Processing Sale..." : "Confirm Sale"}
        </Button>
      </div>
    </div>
  )
}
