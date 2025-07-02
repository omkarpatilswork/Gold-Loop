"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Truck,
  Scale,
  Award,
  Banknote,
  Phone,
  Calendar,
  AlertCircle,
  RefreshCw,
  FileText,
  Home,
} from "lucide-react"
import Link from "next/link"

const conversionSteps = [
  {
    id: 1,
    title: "Pickup Scheduled",
    description: "Your pickup has been confirmed",
    status: "completed",
    timestamp: "Dec 19, 2024 - 2:30 PM",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Agent En Route",
    description: "Our agent is on the way to your location",
    status: "active",
    timestamp: "Dec 20, 2024 - 1:45 PM",
    icon: Truck,
  },
  {
    id: 3,
    title: "Gold Collected",
    description: "Gold items collected and sealed",
    status: "pending",
    timestamp: "Pending",
    icon: Scale,
  },
  {
    id: 4,
    title: "Lab Testing",
    description: "Purity testing at certified lab",
    status: "pending",
    timestamp: "Pending",
    icon: Award,
  },
  {
    id: 5,
    title: "Final Approval",
    description: "Accept or reject the final value",
    status: "pending",
    timestamp: "Pending",
    icon: CheckCircle,
  },
  {
    id: 6,
    title: "Transfer Complete",
    description: "Digital gold added to wallet",
    status: "pending",
    timestamp: "Pending",
    icon: Banknote,
  },
]

export default function TrackConversionPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [currentStep, setCurrentStep] = useState(2)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const conversionDetails = {
    bookingId: "GLP" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    conversionType: "Digital Gold",
    estimatedWeight: "15.5g",
    estimatedValue: "₹89,745",
    agentName: "Rajesh Kumar",
    agentPhone: "+91 87654 32109",
    pickupAddress: "123 MG Road, Bangalore, Karnataka 560001",
    eta: "2:00 PM - 3:00 PM",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Track Conversion</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Status Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-blue-800">Conversion in Progress</h2>
                <p className="text-blue-600">Booking ID: {conversionDetails.bookingId}</p>
              </div>
              <Badge className="bg-blue-600 text-white">Step {currentStep} of 6</Badge>
            </div>
            <Progress value={(currentStep / 6) * 100} className="h-3" />
            <p className="text-sm text-blue-600 mt-2">{Math.round((currentStep / 6) * 100)}% Complete</p>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Agent En Route</h3>
                <p className="text-sm text-green-600">{conversionDetails.agentName} is on the way to your location</p>
                <p className="text-xs text-green-500 mt-1">ETA: {conversionDetails.eta}</p>
              </div>
              <Button variant="outline" size="sm" className="border-green-300 text-green-600">
                <Phone className="w-4 h-4 mr-2" />
                Call Agent
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <span>Conversion Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Conversion Type</span>
                <span className="font-medium text-gray-800">{conversionDetails.conversionType}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Estimated Weight</span>
                <span className="font-medium text-gray-800">{conversionDetails.estimatedWeight}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Estimated Value</span>
                <span className="font-medium text-gray-800">{conversionDetails.estimatedValue}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Pickup Address</span>
                <span className="font-medium text-gray-800 text-right text-sm">{conversionDetails.pickupAddress}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span>Progress Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = step.status === "completed"
                const isActive = step.status === "active"
                const isPending = step.status === "pending"

                return (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-blue-500 text-white animate-pulse"
                            : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          isCompleted ? "text-green-800" : isActive ? "text-blue-800" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-sm ${
                          isCompleted ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs ${
                          isCompleted ? "text-green-500" : isActive ? "text-blue-500" : "text-gray-400"
                        }`}
                      >
                        {step.timestamp}
                      </p>
                      {isCompleted && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs mt-1">
                          Completed
                        </Badge>
                      )}
                      {isActive && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs mt-1">
                          In Progress
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Agent Information */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Truck className="w-5 h-5" />
              <span>Your Agent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-purple-600">RK</span>
                </div>
                <div>
                  <p className="font-semibold text-purple-800">{conversionDetails.agentName}</p>
                  <p className="text-sm text-purple-600">Certified Gold Agent</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-purple-300 text-purple-600">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700">4.9★ Rating • 500+ Successful Pickups</span>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800">Important Information</h4>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  <li>• Keep your gold items ready for pickup</li>
                  <li>• Valid ID proof will be required</li>
                  <li>• Final value depends on actual weight and purity</li>
                  <li>• You can accept or reject the final offer</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
