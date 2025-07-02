"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Clock, Calendar, Shield, CheckCircle, AlertCircle, Home } from "lucide-react"
import Link from "next/link"

const timeSlots = [
  { id: "1", time: "9:00 AM - 12:00 PM", available: true },
  { id: "2", time: "12:00 PM - 3:00 PM", available: true },
  { id: "3", time: "3:00 PM - 6:00 PM", available: false },
  { id: "4", time: "6:00 PM - 9:00 PM", available: true },
]

const dates = [
  { id: "1", date: "Today", day: "Dec 19", available: false },
  { id: "2", date: "Tomorrow", day: "Dec 20", available: true },
  { id: "3", date: "Dec 21", day: "Thu", available: true },
  { id: "4", date: "Dec 22", day: "Fri", available: true },
]

export default function DigitalPickupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    address: "",
    pincode: "",
    landmark: "",
    phone: "",
    alternatePhone: "",
    selectedDate: "",
    selectedTime: "",
    goldDescription: "",
    estimatedWeight: "",
  })

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Schedule Pickup</h1>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Digital Gold Conversion
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-accent to-gold-light h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Address Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Pickup Address</h2>
              <p className="text-gray-600">Where should we pick up your gold?</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark</Label>
                    <Input
                      id="landmark"
                      placeholder="Near metro station"
                      value={formData.landmark}
                      onChange={(e) => handleInputChange("landmark", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      placeholder="+91 98765 43210"
                      value={formData.alternatePhone}
                      onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleNext}
              className="w-full bg-accent hover:bg-accent/90"
              disabled={!formData.address || !formData.pincode || !formData.phone}
            >
              Continue to Schedule
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Schedule Pickup */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Select Date & Time</h2>
              <p className="text-gray-600">Choose your convenient pickup slot</p>
            </div>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {dates.map((date) => (
                    <Button
                      key={date.id}
                      variant={selectedDate === date.id ? "default" : "outline"}
                      className={`p-4 h-auto flex flex-col ${
                        !date.available ? "opacity-50 cursor-not-allowed" : ""
                      } ${selectedDate === date.id ? "bg-accent text-white" : ""}`}
                      onClick={() => date.available && setSelectedDate(date.id)}
                      disabled={!date.available}
                    >
                      <span className="font-semibold">{date.date}</span>
                      <span className="text-sm opacity-80">{date.day}</span>
                      {!date.available && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Not Available
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Time Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTime === slot.id ? "default" : "outline"}
                      className={`w-full justify-between p-4 h-auto ${
                        !slot.available ? "opacity-50 cursor-not-allowed" : ""
                      } ${selectedTime === slot.id ? "bg-accent text-white" : ""}`}
                      onClick={() => slot.available && setSelectedTime(slot.id)}
                      disabled={!slot.available}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{slot.time}</span>
                      </div>
                      {slot.available ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Booked</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleNext}
              className="w-full bg-accent hover:bg-accent/90"
              disabled={!selectedDate || !selectedTime}
            >
              Continue to Gold Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 3: Gold Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-light to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gold-dark" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Gold Details</h2>
              <p className="text-gray-600">Tell us about your gold items</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goldDescription">Describe Your Gold Items *</Label>
                  <Textarea
                    id="goldDescription"
                    placeholder="e.g., 2 gold rings, 1 chain, old coins..."
                    value={formData.goldDescription}
                    onChange={(e) => handleInputChange("goldDescription", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedWeight">Estimated Weight (grams)</Label>
                  <Input
                    id="estimatedWeight"
                    placeholder="e.g., 15.5"
                    value={formData.estimatedWeight}
                    onChange={(e) => handleInputChange("estimatedWeight", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    This is just an estimate. Actual weight will be measured during pickup.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span>Pickup Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Address:</span>
                  <span className="text-sm font-medium text-green-800">{formData.address.substring(0, 30)}...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Date & Time:</span>
                  <span className="text-sm font-medium text-green-800">
                    {dates.find((d) => d.id === selectedDate)?.date} -{" "}
                    {timeSlots.find((t) => t.id === selectedTime)?.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Conversion Type:</span>
                  <span className="text-sm font-medium text-green-800">Digital Gold</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Important Notes</h4>
                    <ul className="text-sm text-amber-700 mt-2 space-y-1">
                      <li>• Agent will bring tamper-proof sealing kit</li>
                      <li>• Weighing will be done in front of you</li>
                      <li>• Live gold rates will be shown on app</li>
                      <li>• You can accept or reject final value after purity test</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link href="/convert/digital/confirmation">
              <Button className="w-full bg-accent hover:bg-accent/90" disabled={!formData.goldDescription}>
                Schedule Pickup
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
