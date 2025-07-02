"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Download, Share, Award, Calendar, Coins } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ShareCertificate } from "@/components/share-certificate"
import { CertificatePDFGenerator } from "@/lib/pdf-generator"
import { useToast } from "@/hooks/use-toast"

const certificates = [
  {
    id: "CERT001",
    type: "Purchase",
    amount: "2.5g",
    value: "₹14,475",
    date: "2024-01-15",
    purity: "99.9%",
    status: "Active",
  },
  {
    id: "CERT002",
    type: "Gift Received",
    amount: "1.0g",
    value: "₹5,790",
    date: "2024-01-10",
    purity: "99.9%",
    status: "Active",
  },
  {
    id: "CERT003",
    type: "SIP Purchase",
    amount: "0.5g",
    value: "₹2,895",
    date: "2024-01-05",
    purity: "99.9%",
    status: "Active",
  },
  {
    id: "CERT004",
    type: "Phygital Swap",
    amount: "8.4g",
    value: "₹48,636",
    date: "2023-12-28",
    purity: "99.9%",
    status: "Active",
  },
]

export default function CertificatePage() {
  const totalGold = certificates.reduce((sum, cert) => sum + Number.parseFloat(cert.amount), 0)
  const totalValue = certificates.reduce((sum, cert) => sum + Number.parseInt(cert.value.replace(/[₹,]/g, "")), 0)

  // Add state and handlers at the top of the component
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const { toast } = useToast()
  const pdfGenerator = new CertificatePDFGenerator()

  // Add handlers
  const handleDownloadPDF = async (cert: any) => {
    try {
      const certificate = {
        id: cert.id,
        customerName: "Omkar Patil",
        goldAmount: Number.parseFloat(cert.amount),
        goldValue: Number.parseInt(cert.value.replace(/[₹,]/g, "")),
        purity: "24K, " + cert.purity,
        purchaseDate: cert.date,
        transactionId: "TXN-" + cert.id.slice(-6),
        vaultId: "VAULT-MUM-001",
        certificateType: cert.type.toLowerCase().includes("purchase")
          ? ("purchase" as const)
          : cert.type.toLowerCase().includes("gift")
            ? ("gift" as const)
            : cert.type.toLowerCase().includes("sip")
              ? ("sip" as const)
              : ("swap" as const),
      }
      await pdfGenerator.downloadPDF(certificate)
      toast({
        title: "PDF Downloaded Successfully!",
        description: "Your certificate has been saved to your device",
      })
    } catch (error) {
      toast({
        title: "Error downloading PDF",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleShare = (cert: any) => {
    const certificate = {
      id: cert.id,
      customerName: "Omkar Patil",
      goldAmount: Number.parseFloat(cert.amount),
      goldValue: Number.parseInt(cert.value.replace(/[₹,]/g, "")),
      purity: "24K, " + cert.purity,
      purchaseDate: cert.date,
      transactionId: "TXN-" + cert.id.slice(-6),
      vaultId: "VAULT-MUM-001",
      certificateType: cert.type.toLowerCase().includes("purchase")
        ? ("purchase" as const)
        : cert.type.toLowerCase().includes("gift")
          ? ("gift" as const)
          : cert.type.toLowerCase().includes("sip")
            ? ("sip" as const)
            : ("swap" as const),
    }
    setSelectedCertificate(certificate)
    setShowShareModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-semibold text-gray-800">Gold Certificates</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Summary */}
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-2">Your Gold Portfolio</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="opacity-75">Total Gold</p>
                  <p className="text-xl font-bold">{totalGold.toFixed(1)}g</p>
                </div>
                <div>
                  <p className="opacity-75">Total Value</p>
                  <p className="text-xl font-bold">₹{totalValue.toLocaleString()}</p>
                </div>
              </div>
              <Badge variant="secondary" className="mt-4 bg-white/20 text-white">
                {certificates.length} Certificates
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Add this after the Summary card and before the Certificates List */}
        <Card className="bg-gradient-to-r from-gold-luxury/10 to-purple-100 border-gold-luxury/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">✨ Enhanced Certificate Experience</h3>
                <p className="text-sm text-gray-600">
                  Try our new certificate management with PDF generation and physical delivery
                </p>
              </div>
              <Link href="/certificate/enhanced">
                <Button className="bg-gold-luxury hover:bg-gold-luxury/90">Try Enhanced</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Certificates List */}
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{cert.type}</h3>
                      <p className="text-sm text-gray-600">Certificate ID: {cert.id}</p>
                    </div>
                  </div>
                  <Badge
                    variant={cert.status === "Active" ? "default" : "secondary"}
                    className="bg-green-100 text-green-800"
                  >
                    {cert.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Coins className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Amount</span>
                    </div>
                    <p className="font-semibold text-gray-800">{cert.amount}</p>
                    <p className="text-sm text-gray-600">Purity: {cert.purity}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Value & Date</span>
                    </div>
                    <p className="font-semibold text-gray-800">{cert.value}</p>
                    <p className="text-sm text-gray-600">{cert.date}</p>
                  </div>
                </div>

                {/* Update the action buttons in the certificate cards */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleDownloadPDF(cert)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleShare(cert)}>
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Generate New Certificate */}
        <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-2">Need a Custom Certificate?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Generate personalized certificates for specific transactions or periods
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">Generate Certificate</Button>
          </CardContent>
        </Card>
      </div>
      {/* Share Certificate Dialog */}
      {selectedCertificate && (
        <ShareCertificate
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          certificate={selectedCertificate}
        />
      )}
    </div>
  )
}
