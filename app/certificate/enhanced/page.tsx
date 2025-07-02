"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Filter, Search } from "lucide-react"
import Link from "next/link"
import { GoldCertificate } from "@/components/gold-certificate"
import { PhysicalDeliveryFlow } from "@/components/physical-delivery-flow"
import { CertificatePDFGenerator } from "@/lib/pdf-generator"
import { Input } from "@/components/ui/input"
import { ShareCertificate } from "@/components/share-certificate"

const mockCertificates = [
  {
    id: "GC-AX99-2345",
    customerName: "Omkar Patil",
    goldAmount: 2.5,
    goldValue: 14475,
    purity: "24K, 99.9%",
    purchaseDate: "2024-01-15",
    transactionId: "TXN-789456123",
    vaultId: "VAULT-MUM-001",
    certificateType: "purchase" as const,
  },
  {
    id: "GC-BX88-1234",
    customerName: "Omkar Patil",
    goldAmount: 1.0,
    goldValue: 5790,
    purity: "24K, 99.9%",
    purchaseDate: "2024-01-10",
    transactionId: "TXN-789456124",
    vaultId: "VAULT-MUM-001",
    certificateType: "gift" as const,
  },
  {
    id: "GC-CX77-5678",
    customerName: "Omkar Patil",
    goldAmount: 0.5,
    goldValue: 2895,
    purity: "24K, 99.9%",
    purchaseDate: "2024-01-05",
    transactionId: "TXN-789456125",
    vaultId: "VAULT-MUM-001",
    certificateType: "sip" as const,
  },
]

export default function EnhancedCertificatePage() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof mockCertificates)[0] | null>(null)
  const [showDeliveryFlow, setShowDeliveryFlow] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Add state for share modal
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedCertificateForShare, setSelectedCertificateForShare] = useState<(typeof mockCertificates)[0] | null>(
    null,
  )

  const pdfGenerator = new CertificatePDFGenerator()

  const handleDownloadPDF = async (certificate: (typeof mockCertificates)[0]) => {
    try {
      await pdfGenerator.downloadPDF(certificate)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleRequestDelivery = (certificate: (typeof mockCertificates)[0]) => {
    setSelectedCertificate(certificate)
    setShowDeliveryFlow(true)
  }

  // Add share handler
  const handleShare = (certificate: (typeof mockCertificates)[0]) => {
    setSelectedCertificateForShare(certificate)
    setShowShareModal(true)
  }

  const filteredCertificates = mockCertificates.filter(
    (cert) =>
      cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalGold = mockCertificates.reduce((sum, cert) => sum + cert.goldAmount, 0)
  const totalValue = mockCertificates.reduce((sum, cert) => sum + cert.goldValue, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Gold Certificates</h1>
              <p className="text-sm text-gray-600">Enhanced Certificate Management</p>
            </div>
          </div>
          <Button className="bg-gold-luxury hover:bg-gold-luxury/90">
            <Plus className="w-4 h-4 mr-2" />
            New Certificate
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Portfolio Summary */}
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your Gold Certificate Portfolio</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="opacity-75">Total Certificates</p>
                  <p className="text-xl font-bold">{mockCertificates.length}</p>
                </div>
                <div>
                  <p className="opacity-75">Total Gold</p>
                  <p className="text-xl font-bold">{totalGold.toFixed(1)}g</p>
                </div>
                <div>
                  <p className="opacity-75">Total Value</p>
                  <p className="text-xl font-bold">₹{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search certificates by ID or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((certificate) => (
            <GoldCertificate
              key={certificate.id}
              certificate={certificate}
              onDownloadPDF={() => handleDownloadPDF(certificate)}
              onRequestDelivery={() => handleRequestDelivery(certificate)}
              onShare={() => handleShare(certificate)}
              onViewFull={() => {
                // Handle view full certificate
                console.log("View full certificate:", certificate.id)
              }}
            />
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No certificates found matching your search.</p>
            </CardContent>
          </Card>
        )}

        {/* Physical Delivery Dialog */}
        <Dialog open={showDeliveryFlow} onOpenChange={setShowDeliveryFlow}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Physical Certificate Delivery</DialogTitle>
            </DialogHeader>
            {selectedCertificate && (
              <PhysicalDeliveryFlow
                certificateId={selectedCertificate.id}
                goldAmount={selectedCertificate.goldAmount}
                goldValue={selectedCertificate.goldValue}
                onClose={() => setShowDeliveryFlow(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Share Certificate Dialog */}
        {selectedCertificateForShare && (
          <ShareCertificate
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            certificate={selectedCertificateForShare}
          />
        )}
      </div>
    </div>
  )
}
