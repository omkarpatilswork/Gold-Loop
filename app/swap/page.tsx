"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RefreshCw, MapPin, Camera, Calculator, Gift, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const swapSteps = [
  { id: 1, title: "Upload Photos", completed: false, active: true },
  { id: 2, title: "Purity Test", completed: false, active: false },
  { id: 3, title: "Conversion", completed: false, active: false },
  { id: 4, title: "Digital Gold", completed: false, active: false },
]

const nearbyStores = [
  { name: "Gold Palace", distance: "0.8 km", rating: 4.8, address: "MG Road" },
  { name: "Precious Metals", distance: "1.2 km", rating: 4.6, address: "Brigade Road" },
  { name: "Golden Touch", distance: "1.5 km", rating: 4.7, address: "Commercial Street" },
]

export default function SwapPage() {
  const [swapMethod, setSwapMethod] = useState<"store" | "pickup">("store")
  const [goldWeight, setGoldWeight] = useState("")
  const [estimatedPurity, setEstimatedPurity] = useState(85)
  const { toast } = useToast()

  const estimatedGrams = goldWeight ? ((Number.parseFloat(goldWeight) * estimatedPurity) / 100).toFixed(2) : "0"
  const estimatedValue = goldWeight ? (Number.parseFloat(estimatedGrams) * 5790).toFixed(0) : "0"
  const bonusGrams = goldWeight ? (Number.parseFloat(estimatedGrams) * 0.01).toFixed(3) : "0"

  const handleSwapInitiate = () => {
    toast({
      title: "Swap Request Initiated! 🔄",
      description: "We'll guide you through the next steps",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 text-orange-600" />
            <h1 className="text-xl font-semibold text-gray-800">Phygital Swap</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Process Steps */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              {swapSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.active
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.completed ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  {index < swapSteps.length - 1 && (
                    <div className={`w-12 h-1 mx-2 ${step.completed ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">Convert Physical Gold to Digital</h3>
              <p className="text-sm text-gray-600">Get instant digital gold for your old jewelry</p>
            </div>
          </CardContent>
        </Card>

        {/* Swap Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Swap Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                swapMethod === "store" ? "border-orange-500 bg-orange-50" : "border-gray-200"
              }`}
              onClick={() => setSwapMethod("store")}
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Visit Partner Store</p>
                  <p className="text-sm text-gray-600">Get instant testing and conversion</p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                swapMethod === "pickup" ? "border-orange-500 bg-orange-50" : "border-gray-200"
              }`}
              onClick={() => setSwapMethod("pickup")}
            >
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Book Home Pickup</p>
                  <p className="text-sm text-gray-600">We'll come to you (Coming Soon)</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Coming Soon
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {swapMethod === "store" && (
          <Card>
            <CardHeader>
              <CardTitle>Nearby Partner Stores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nearbyStores.map((store, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{store.name}</h3>
                      <p className="text-sm text-gray-600">{store.address}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          ⭐ {store.rating}
                        </Badge>
                        <span className="text-xs text-gray-500">{store.distance}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Gold Details Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-orange-600" />
              <span>Estimate Your Gold</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="weight">Approximate Weight (grams)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight in grams"
                value={goldWeight}
                onChange={(e) => setGoldWeight(e.target.value)}
              />
            </div>

            <div>
              <Label>Estimated Purity: {estimatedPurity}%</Label>
              <Progress value={estimatedPurity} className="mt-2" />
              <p className="text-xs text-gray-600 mt-1">Actual purity will be tested at the store</p>
            </div>

            {goldWeight && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-800 mb-3">Estimated Conversion</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Digital Gold</p>
                    <p className="text-lg font-bold text-gray-800">{estimatedGrams}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Value</p>
                    <p className="text-lg font-bold text-gray-800">
                      ₹{Number.parseInt(estimatedValue).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-100 rounded border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Gift className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Bonus: +{bonusGrams}g extra gold (1% bonus)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-orange-600" />
              <span>Upload Gold Photos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Take clear photos of your gold items</p>
              <p className="text-sm text-gray-500 mb-4">Include all angles for accurate assessment</p>
              <Button variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Clear, well-lit photos</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Multiple angles</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Include hallmarks</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Show any damage</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Initiate Swap */}
        <Button
          onClick={handleSwapInitiate}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
          disabled={!goldWeight}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Initiate Gold Swap
        </Button>

        {/* Benefits */}
        <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Why Choose Phygital Swap?</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Instant conversion</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Fair market rates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Certified purity testing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>1% bonus gold</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
