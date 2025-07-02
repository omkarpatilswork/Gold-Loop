"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CertificatePDFGenerator } from "@/lib/pdf-generator"
import { Sparkles, Download, Truck, Share2 } from "lucide-react"

interface CertificateSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  certificate: {
    id: string
    customerName: string
    goldAmount: number
    goldValue: number
    purity: string
    purchaseDate: string
    transactionId: string
    vaultId: string
    certificateType: "purchase" | "gift" | "sip" | "swap"
  }
}

export function CertificateSuccessModal({ isOpen, onClose, certificate }: CertificateSuccessModalProps) {
  const [showCelebration, setShowCelebration] = useState(false)
  const pdfGenerator = new CertificatePDFGenerator()

  useEffect(() => {
    if (isOpen) {
      setShowCelebration(true)
      const timer = setTimeout(() => setShowCelebration(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleDownloadPDF = async () => {
    try {
      await pdfGenerator.downloadPDF(certificate)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none z-50">
            <div className="absolute top-4 left-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-gold-luxury" />
            </div>
            <div className="absolute top-8 right-6 animate-bounce delay-100">
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="absolute top-16 left-1/2 animate-bounce delay-200">
              <Sparkles className="w-5 h-5 text-gold-luxury" />
            </div>
            <div className="absolute top-12 right-12 animate-bounce delay-300">
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </div>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Success Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gold-luxury to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate Generated! 🎉</h2>
            <p className="text-gray-600">Your gold certificate is ready for download and delivery</p>
          </div>

          {/* Mini Certificate Preview */}
          <div className="bg-gradient-to-br from-gold-ivory to-white p-4 rounded-lg border-2 border-gold-luxury/30">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
              <p className="font-mono font-bold text-gold-luxury">{certificate.id}</p>
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Gold Amount</p>
                  <p className="font-semibold">{certificate.goldAmount}g</p>
                </div>
                <div>
                  <p className="text-gray-600">Value</p>
                  <p className="font-semibold">₹{certificate.goldValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Button onClick={handleDownloadPDF} className="w-full bg-gold-luxury hover:bg-gold-luxury/90">
              <Download className="w-4 h-4 mr-2" />
              Download PDF Certificate
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gold-luxury text-gold-luxury">
                <Truck className="w-4 h-4 mr-2" />
                Physical Copy
              </Button>
              <Button variant="outline" className="border-gold-luxury text-gold-luxury">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <Button variant="ghost" onClick={onClose} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
