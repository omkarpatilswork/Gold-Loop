"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowLeft, Home, TrendingUp } from "lucide-react"
import Link from "next/link"
import { GoldCertificate } from "@/components/gold-certificate"
import { CertificatePDFGenerator } from "@/lib/pdf-generator"
import { ShareCertificate } from "@/components/share-certificate"
import { useSearchParams } from "next/navigation"

// Mock transaction data - in real app, this would come from URL params or API
const mockTransaction = {
  id: "TXN-789456123",
  amount: 2500, // INR
  goldAmount: 0.43, // grams
  goldPrice: 5790, // per gram
  paymentMethod: "UPI",
  timestamp: new Date().toISOString(),
  roundUpAmount: 0,
  status: "completed",
}

const mockCertificate = {
  id: `GC-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  customerName: "Omkar Patil",
  goldAmount: mockTransaction.goldAmount,
  goldValue: mockTransaction.amount,
  purity: "24K, 99.9%",
  purchaseDate: mockTransaction.timestamp,
  transactionId: mockTransaction.id,
  vaultId: "VAULT-MUM-001",
  certificateType: "purchase" as const,
}

export default function BuySuccessPage() {
  const [showCelebration, setShowCelebration] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const searchParams = useSearchParams()
  const pdfGenerator = new CertificatePDFGenerator()

  useEffect(() => {
    // Celebration animation for 3 seconds
    const timer = setTimeout(() => setShowCelebration(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownloadPDF = async () => {
    try {
      await pdfGenerator.downloadPDF(mockCertificate, `gold-certificate-${mockCertificate.id}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-light/20">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-10 left-10 animate-bounce">
            <Sparkles className="w-8 h-8 text-gold-luxury" />
          </div>
          <div className="absolute top-20 right-16 animate-bounce delay-100">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="absolute top-32 left-1/2 animate-bounce delay-200">
            <Sparkles className="w-7 h-7 text-gold-luxury" />
          </div>
          <div className="absolute top-16 right-1/3 animate-bounce delay-300">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="absolute top-40 left-1/4 animate-bounce delay-500">
            <Sparkles className="w-6 h-6 text-gold-luxury" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold-light/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">Purchase Successful</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Success Header */}
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            {showCelebration && (
              <div className="absolute inset-0 animate-ping">
                <div className="w-20 h-20 bg-green-500 rounded-full opacity-75"></div>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Purchase Successful!</h1>
          <p className="text-lg text-gray-600 mb-4">Your gold has been added to your vault</p>
          <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 text-lg px-4 py-2">
            Transaction ID: {mockTransaction.id}
          </Badge>
        </div>

        {/* Transaction Summary */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gold Purchased:</span>
                  <span className="font-semibold text-lg">{mockTransaction.goldAmount}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gold Price:</span>
                  <span className="font-semibold">₹{mockTransaction.goldPrice}/g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-lg">₹{mockTransaction.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold">{mockTransaction.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Purchase Date:</span>
                  <span className="font-semibold">
                    {new Date(mockTransaction.timestamp).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
            </div>

            {mockTransaction.roundUpAmount > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  🎯 Round-up savings: ₹{mockTransaction.roundUpAmount} added to your Round-Up wallet
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gold Certificate Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Gold Certificate</h2>
            <p className="text-gray-600">Official proof of your digital gold ownership</p>
          </div>

          <div className="max-w-md mx-auto">
            <GoldCertificate
              certificate={mockCertificate}
              onDownloadPDF={handleDownloadPDF}
              onRequestDelivery={() => {
                // Navigate to physical delivery flow
                window.location.href = `/certificate/delivery?id=${mockCertificate.id}`
              }}
              onViewFull={() => {
                // Navigate to full certificate view
                window.location.href = `/certificate/view/${mockCertificate.id}`
              }}
              onShare={handleShare}
            />
          </div>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-gold-light/20 to-accent/10 border-gold-light/50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Track Your Gold</h4>
                <p className="text-sm text-gray-600 mt-1">Monitor price changes and portfolio growth</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Start SIP</h4>
                <p className="text-sm text-gray-600 mt-1">Invest regularly with systematic plans</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Earn Rewards</h4>
                <p className="text-sm text-gray-600 mt-1">Complete Gold Quest challenges</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Link href="/" className="flex-1">
            <Button className="w-full bg-accent hover:bg-accent/90 text-white py-3">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/buy" className="flex-1">
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 py-3">
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy More Gold
            </Button>
          </Link>
        </div>
      </div>

      {/* Share Modal */}
      <ShareCertificate
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        certificate={mockCertificate}
      />
    </div>
  )
}
