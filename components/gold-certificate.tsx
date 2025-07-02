"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Truck, Share2, Shield, Award, Sparkles, CheckCircle } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface CertificateData {
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

interface GoldCertificateProps {
  certificate: CertificateData
  onDownloadPDF?: () => void
  onRequestDelivery?: () => void
  onViewFull?: () => void
  onShare?: () => void
}

export function GoldCertificate({
  certificate,
  onDownloadPDF,
  onRequestDelivery,
  onViewFull,
  onShare,
}: GoldCertificateProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getCertificateTypeLabel = (type: string) => {
    const labels = {
      purchase: "Gold Purchase",
      gift: "Gold Gift",
      sip: "SIP Investment",
      swap: "Phygital Swap",
    }
    return labels[type as keyof typeof labels] || "Gold Certificate"
  }

  return (
    <div className="relative">
      {/* Celebration Animation */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className="relative">
          <Sparkles className="w-6 h-6 text-gold-luxury animate-pulse" />
          <div className="absolute inset-0 animate-ping">
            <Sparkles className="w-6 h-6 text-gold-luxury opacity-75" />
          </div>
        </div>
      </div>

      <Card
        className="relative overflow-hidden bg-gradient-to-br from-gold-ivory via-white to-gold-ivory border-2 border-gold-luxury/30 shadow-2xl hover:shadow-3xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Holographic Badge */}
        <div className="absolute top-4 right-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-luxury via-yellow-400 to-gold-luxury animate-holographic rounded-full"></div>
            <div className="absolute inset-1 bg-gold-ivory rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-gold-luxury" />
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ${
              isHovered ? "animate-shimmer" : ""
            }`}
          />
        </div>

        <CardContent className="p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-gold-luxury mr-2" />
              <h1 className="font-serif text-2xl font-bold text-gray-900">Gold Certificate</h1>
            </div>
            <p className="text-sm text-gray-600 font-medium">{getCertificateTypeLabel(certificate.certificateType)}</p>
            <Badge variant="outline" className="mt-2 border-gold-luxury text-gold-luxury bg-gold-luxury/10">
              Certificate ID: {certificate.id}
            </Badge>
          </div>

          {/* Customer Details */}
          <div className="bg-gradient-to-r from-gold-luxury/5 to-transparent p-4 rounded-lg mb-6 border-l-4 border-gold-luxury">
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-2">{certificate.customerName}</h2>
            <p className="text-sm text-gray-600">Certificate issued on {formatDate(certificate.purchaseDate)}</p>
          </div>

          {/* Gold Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/50 p-4 rounded-lg border border-gold-luxury/20">
              <p className="text-sm text-gray-600 mb-1">Gold Amount</p>
              <p className="text-2xl font-bold text-gray-900">{certificate.goldAmount}g</p>
              <p className="text-xs text-gray-500">Purity: {certificate.purity}</p>
            </div>
            <div className="bg-white/50 p-4 rounded-lg border border-gold-luxury/20">
              <p className="text-sm text-gray-600 mb-1">Certificate Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{certificate.goldValue.toLocaleString()}</p>
              <p className="text-xs text-gray-500">At time of purchase</p>
            </div>
          </div>

          {/* Vault & Transaction Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Vault ID:</span>
              <span className="font-mono text-sm font-medium">{certificate.vaultId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm font-medium">{certificate.transactionId}</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-3 rounded-lg border-2 border-gold-luxury/20">
              <QRCodeSVG
                value={`https://goldloop.app/verify/${certificate.id}`}
                size={80}
                fgColor="#D4AF37"
                bgColor="#FFFFFF"
              />
            </div>
          </div>

          {/* Trust Seal */}
          <div className="text-center mb-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-800">Verified & Secured</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Issued by Augmont | ISO Certified Vault Partner
              <br />
              BIS Hallmarking Compliant | Insured & Audit-Verified
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            {onViewFull && (
              <Button
                onClick={onViewFull}
                className="w-full bg-gold-luxury hover:bg-gold-luxury/90 text-white font-semibold py-3"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Certificate
              </Button>
            )}

            <div className="grid grid-cols-2 gap-3">
              {onDownloadPDF && (
                <Button
                  onClick={onDownloadPDF}
                  variant="outline"
                  className="border-gold-luxury text-gold-luxury hover:bg-gold-luxury/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              )}

              {onRequestDelivery && (
                <Button
                  onClick={onRequestDelivery}
                  variant="outline"
                  className="border-gold-luxury text-gold-luxury hover:bg-gold-luxury/10"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Physical Copy
                </Button>
              )}
            </div>

            {onShare && (
              <Button onClick={onShare} variant="ghost" className="text-gray-600 hover:text-gold-luxury">
                <Share2 className="w-4 h-4 mr-2" />
                Share Certificate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
