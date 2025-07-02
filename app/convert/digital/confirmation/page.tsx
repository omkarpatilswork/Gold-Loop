"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Truck,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Award,
  FileText,
  Share2,
  Home,
  Gift,
} from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function ConversionConfirmationPage() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setShowConfetti(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const pickupDetails = {
    bookingId: "GLP" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: "Tomorrow",
    time: "12:00 PM - 3:00 PM",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    phone: "+91 98765 43210",
    agentName: "Rajesh Kumar",
    agentPhone: "+91 87654 32109",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Pickup Confirmed</h1>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Booking ID: {pickupDetails.bookingId}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Success Animation */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">🎉 Pickup Scheduled Successfully!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your gold conversion pickup has been confirmed. Our agent will contact you before arrival.
          </p>
        </div>

        {/* Bonus Reward */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6" />
                <div>
                  <p className="font-semibold">🎁 First Time Bonus Unlocked!</p>
                  <p className="text-sm opacity-90">You'll get ₹50 bonus digital gold after conversion</p>
                </div>
              </div>
              <Badge className="bg-white text-green-600">+₹50</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>Pickup Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {pickupDetails.date}, {pickupDetails.time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Pickup Address</p>
                    <p className="text-sm text-gray-600">{pickupDetails.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Your Contact</p>
                    <p className="text-sm text-gray-600">{pickupDetails.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Details */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Shield className="w-5 h-5" />
              <span>Your Pickup Agent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">RK</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">{pickupDetails.agentName}</p>
                  <p className="text-sm text-blue-600">Certified Gold Agent</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-600">
                <Phone className="w-4 h-4 mr-2" />
                Call Agent
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700">4.9★ Rating • 500+ Successful Pickups</span>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span>What Happens Next?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Agent Confirmation Call",
                  desc: "Our agent will call you 30 minutes before pickup",
                  time: "30 mins before",
                  status: "pending",
                },
                {
                  step: 2,
                  title: "Secure Pickup",
                  desc: "Weighing and sealing done in front of you",
                  time: "At pickup time",
                  status: "pending",
                },
                {
                  step: 3,
                  title: "Lab Testing",
                  desc: "XRF purity testing at certified lab",
                  time: "Within 24 hours",
                  status: "pending",
                },
                {
                  step: 4,
                  title: "Final Approval",
                  desc: "Accept or reject the final value",
                  time: "After testing",
                  status: "pending",
                },
                {
                  step: 5,
                  title: "Digital Gold Transfer",
                  desc: "Gold added to your wallet instantly",
                  time: "After approval",
                  status: "pending",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Reminders */}
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-800">
              <FileText className="w-5 h-5" />
              <span>Important Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-600">•</span>
                <span>Keep your gold items ready and accessible</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600">•</span>
                <span>Valid ID proof will be required during pickup</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600">•</span>
                <span>You can track the entire process in the app</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600">•</span>
                <span>Final value can be accepted or rejected after testing</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/convert/track">
            <Button className="w-full bg-accent hover:bg-accent/90">
              Track Your Conversion
              <Clock className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Details
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Support */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help or have questions?</p>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
