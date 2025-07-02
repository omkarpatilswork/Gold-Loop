"use client"

import jsPDF from "jspdf"

interface CertificateData {
  id: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  goldAmount: number
  goldValue: number
  purity: string
  purchaseDate: string
  transactionId: string
  vaultId: string
  certificateType: string
}

export class CertificatePDFGenerator {
  private doc: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number

  constructor() {
    this.doc = new jsPDF("portrait", "mm", "a4")
    this.pageWidth = this.doc.internal.pageSize.getWidth()
    this.pageHeight = this.doc.internal.pageSize.getHeight()
    this.margin = 20
  }

  async generateCertificate(certificate: CertificateData): Promise<Blob> {
    // Set up fonts and colors
    this.doc.setFont("helvetica")

    // Add watermark
    this.addWatermark()

    // Add decorative border
    this.addDecorativeBorder()

    // Add header
    this.addHeader()

    // Add certificate content
    this.addCertificateContent(certificate)

    // Add footer with QR code
    this.addFooter(certificate)

    // Add trust seal
    this.addTrustSeal()

    return this.doc.output("blob")
  }

  private addWatermark() {
    // Add subtle background pattern
    this.doc.setGState(new this.doc.GState({ opacity: 0.1 }))
    this.doc.setFillColor(212, 175, 55) // Gold color

    // Create diamond pattern
    for (let x = 0; x < this.pageWidth; x += 30) {
      for (let y = 0; y < this.pageHeight; y += 30) {
        this.doc.circle(x, y, 2, "F")
      }
    }

    this.doc.setGState(new this.doc.GState({ opacity: 1 }))
  }

  private addDecorativeBorder() {
    // Outer border
    this.doc.setLineWidth(2)
    this.doc.setDrawColor(212, 175, 55) // Gold
    this.doc.rect(
      this.margin - 5,
      this.margin - 5,
      this.pageWidth - 2 * (this.margin - 5),
      this.pageHeight - 2 * (this.margin - 5),
    )

    // Inner border
    this.doc.setLineWidth(0.5)
    this.doc.setDrawColor(255, 215, 0) // Light gold
    this.doc.rect(this.margin, this.margin, this.pageWidth - 2 * this.margin, this.pageHeight - 2 * this.margin)
  }

  private addHeader() {
    const centerX = this.pageWidth / 2

    // Title
    this.doc.setFontSize(28)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(212, 175, 55)
    this.doc.text("GOLD CERTIFICATE", centerX, 40, { align: "center" })

    // Subtitle
    this.doc.setFontSize(14)
    this.doc.setFont("helvetica", "normal")
    this.doc.setTextColor(100, 100, 100)
    this.doc.text("Official Proof of Digital Gold Ownership", centerX, 50, { align: "center" })

    // Augmont branding
    this.doc.setFontSize(12)
    this.doc.setTextColor(0, 0, 0)
    this.doc.text("Powered by Augmont Gold", centerX, 60, { align: "center" })
  }

  private addCertificateContent(certificate: CertificateData) {
    const leftCol = this.margin + 10
    const rightCol = this.pageWidth - this.margin - 60
    let currentY = 80

    // Certificate ID
    this.doc.setFontSize(10)
    this.doc.setTextColor(100, 100, 100)
    this.doc.text("Certificate ID:", leftCol, currentY)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(certificate.id, rightCol, currentY)

    currentY += 15

    // Customer Details Section
    this.doc.setFontSize(16)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(212, 175, 55)
    this.doc.text("CERTIFICATE HOLDER", leftCol, currentY)

    currentY += 10
    this.doc.setFontSize(20)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(certificate.customerName.toUpperCase(), leftCol, currentY)

    currentY += 20

    // Gold Details Section
    this.doc.setFontSize(16)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(212, 175, 55)
    this.doc.text("GOLD DETAILS", leftCol, currentY)

    currentY += 15

    // Create a table-like structure for gold details
    const details = [
      ["Gold Amount:", `${certificate.goldAmount} grams`],
      ["Purity:", certificate.purity + " Certified"],
      ["Certificate Value:", `₹${certificate.goldValue.toLocaleString()}`],
      ["Purchase Date:", new Date(certificate.purchaseDate).toLocaleDateString("en-IN")],
      ["Vault ID:", certificate.vaultId],
      ["Transaction ID:", certificate.transactionId],
    ]

    this.doc.setFontSize(11)
    details.forEach(([label, value]) => {
      this.doc.setFont("helvetica", "normal")
      this.doc.setTextColor(100, 100, 100)
      this.doc.text(label, leftCol, currentY)

      this.doc.setFont("helvetica", "bold")
      this.doc.setTextColor(0, 0, 0)
      this.doc.text(value, leftCol + 40, currentY)

      currentY += 8
    })

    currentY += 10

    // Vault Information
    this.doc.setFontSize(16)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(212, 175, 55)
    this.doc.text("VAULT INFORMATION", leftCol, currentY)

    currentY += 10
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")
    this.doc.setTextColor(0, 0, 0)

    const vaultText = [
      "Your gold is safely stored in a BIS-accredited secure vault facility.",
      "Location: Augmont Certified Vault, Mumbai",
      "Insurance: Fully insured and audit-verified",
      "Security: 24/7 monitoring and biometric access control",
    ]

    vaultText.forEach((text) => {
      this.doc.text(text, leftCol, currentY)
      currentY += 6
    })
  }

  private addFooter(certificate: CertificateData) {
    const footerY = this.pageHeight - 40

    // QR Code (simulated as text for now - in real implementation, use QR library)
    this.doc.setFontSize(8)
    this.doc.setTextColor(100, 100, 100)
    this.doc.text("Scan QR to verify:", this.pageWidth - 60, footerY - 15)

    // QR Code placeholder
    this.doc.setDrawColor(0, 0, 0)
    this.doc.setLineWidth(0.5)
    this.doc.rect(this.pageWidth - 50, footerY - 10, 20, 20)
    this.doc.text("QR", this.pageWidth - 42, footerY + 2)

    // Verification URL
    this.doc.setFontSize(8)
    this.doc.text(`goldloop.app/verify/${certificate.id}`, this.pageWidth - 50, footerY + 15)
  }

  private addTrustSeal() {
    const sealY = this.pageHeight - 80
    const centerX = this.pageWidth / 2

    // Trust seal background
    this.doc.setFillColor(240, 248, 255)
    this.doc.setDrawColor(212, 175, 55)
    this.doc.setLineWidth(1)
    this.doc.roundedRect(this.margin, sealY, this.pageWidth - 2 * this.margin, 25, 3, 3, "FD")

    // Trust seal text
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(212, 175, 55)
    this.doc.text("VERIFIED & AUTHENTICATED", centerX, sealY + 8, { align: "center" })

    this.doc.setFontSize(8)
    this.doc.setFont("helvetica", "normal")
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(
      "This certificate has been issued by Augmont and verified under BIS Hallmarking compliance",
      centerX,
      sealY + 15,
      { align: "center" },
    )

    this.doc.text("ISO Certified • Insured • Audit Verified • Tamper Proof", centerX, sealY + 20, { align: "center" })
  }

  async downloadPDF(certificate: CertificateData, filename?: string) {
    const blob = await this.generateCertificate(certificate)
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename || `gold-certificate-${certificate.id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  async emailPDF(certificate: CertificateData, email: string) {
    const blob = await this.generateCertificate(certificate)
    // In a real implementation, this would send to your backend
    console.log("Emailing PDF to:", email)
    return blob
  }
}
