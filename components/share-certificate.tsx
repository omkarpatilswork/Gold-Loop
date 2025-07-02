"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Copy, Download, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CertificatePDFGenerator } from "@/lib/pdf-generator"

interface ShareCertificateProps {
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

export function ShareCertificate({ isOpen, onClose, certificate }: ShareCertificateProps) {
  const [shareMethod, setShareMethod] = useState<"whatsapp" | "email" | "link">("whatsapp")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const { toast } = useToast()
  const pdfGenerator = new CertificatePDFGenerator()

  // Add null check to prevent errors
  if (!certificate) {
    return null
  }

  const generateShareMessage = () => {
    const baseMessage = `🎉 *Gold Certificate*

I've successfully purchased ${certificate.goldAmount}g of 24K gold!

📋 *Certificate Details:*
• Certificate ID: ${certificate.id}
• Gold Amount: ${certificate.goldAmount}g (99.9% Pure)
• Current Value: ₹${certificate.goldValue.toLocaleString()}
• Purchase Date: ${new Date(certificate.purchaseDate).toLocaleDateString("en-IN")}

${customMessage ? `💬 *Personal Message:*\n${customMessage}\n\n` : ""}🏛️ *Secure Storage:*
Your gold is safely stored in BIS-certified vault facilities.

📱 *Verify Certificate:*
https://goldloop.app/verify/${certificate.id}

*Powered by GoldLoop*
ISO Certified • Insured • Audit Verified`

    return baseMessage
  }

  const generateEmailContent = () => {
    return {
      subject: `Gold Certificate - ${certificate.id}`,
      body: `Dear Friend,

I'm excited to share my gold certificate with you!

Certificate Details:
- Certificate ID: ${certificate.id}
- Gold Amount: ${certificate.goldAmount}g (24K, 99.9% Pure)
- Current Value: ₹${certificate.goldValue.toLocaleString()}
- Purchase Date: ${new Date(certificate.purchaseDate).toLocaleDateString("en-IN")}

${customMessage ? `Personal Message:\n${customMessage}\n\n` : ""}This certificate represents gold safely stored in BIS-certified vault facilities, fully insured and audit-verified.

You can verify this certificate at: https://goldloop.app/verify/${certificate.id}

Best regards,
${certificate.customerName}

---
Powered by GoldLoop - Your trusted digital gold platform
ISO Certified • Insured • Audit Verified`,
    }
  }

  const handleWhatsAppShare = async () => {
    setIsSharing(true)
    try {
      const message = generateShareMessage()
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = recipientPhone
        ? `https://wa.me/${recipientPhone.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
        : `https://wa.me/?text=${encodedMessage}`

      window.open(whatsappUrl, "_blank")

      toast({
        title: "Opening WhatsApp...",
        description: "Your certificate is ready to share!",
      })
    } catch (error) {
      toast({
        title: "Error sharing certificate",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const handleEmailShare = async () => {
    setIsSharing(true)
    try {
      const emailContent = generateEmailContent()
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`

      window.location.href = mailtoUrl

      toast({
        title: "Opening Email Client...",
        description: "Your certificate email is ready to send!",
      })
    } catch (error) {
      toast({
        title: "Error opening email",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      const shareUrl = `https://goldloop.app/certificate/shared/${certificate.id}`
      await navigator.clipboard.writeText(shareUrl)

      toast({
        title: "Link Copied!",
        description: "Certificate link copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error copying link",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleShareWithPDF = async () => {
    setIsSharing(true)
    try {
      // Generate PDF
      const pdfBlob = await pdfGenerator.generateCertificate(certificate)
      const pdfUrl = URL.createObjectURL(pdfBlob)

      if (shareMethod === "whatsapp") {
        // For WhatsApp, we'll share the message and mention PDF is available for download
        await handleWhatsAppShare()
        toast({
          title: "PDF Available",
          description: "Download the PDF separately to attach to your message",
        })
      } else if (shareMethod === "email") {
        // For email, open email client with message (PDF would need to be attached manually)
        await handleEmailShare()
        toast({
          title: "PDF Generated",
          description: "Download the PDF to attach to your email",
        })
      }

      // Cleanup
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000)
    } catch (error) {
      toast({
        title: "Error generating PDF",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-gold-luxury" />
            <span>Share Certificate</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Preview */}
          <div className="bg-gradient-to-br from-gold-ivory to-white p-4 rounded-lg border-2 border-gold-luxury/30">
            <div className="text-center">
              <Badge variant="outline" className="border-gold-luxury text-gold-luxury mb-2">
                {certificate.id}
              </Badge>
              <p className="font-semibold text-gray-900">{certificate.goldAmount}g Gold</p>
              <p className="text-sm text-gray-600">₹{certificate.goldValue.toLocaleString()}</p>
            </div>
          </div>

          {/* Share Method Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Choose sharing method:</Label>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={shareMethod === "whatsapp" ? "default" : "outline"}
                onClick={() => setShareMethod("whatsapp")}
                className="flex flex-col items-center p-3 h-auto"
              >
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs">WhatsApp</span>
              </Button>

              <Button
                variant={shareMethod === "email" ? "default" : "outline"}
                onClick={() => setShareMethod("email")}
                className="flex flex-col items-center p-3 h-auto"
              >
                <Mail className="w-5 h-5 mb-1" />
                <span className="text-xs">Email</span>
              </Button>

              <Button
                variant={shareMethod === "link" ? "default" : "outline"}
                onClick={() => setShareMethod("link")}
                className="flex flex-col items-center p-3 h-auto"
              >
                <Copy className="w-5 h-5 mb-1" />
                <span className="text-xs">Copy Link</span>
              </Button>
            </div>
          </div>

          {/* Recipient Input */}
          {shareMethod === "whatsapp" && (
            <div>
              <Label htmlFor="phone">Recipient Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to choose contact from WhatsApp</p>
            </div>
          )}

          {shareMethod === "email" && (
            <div>
              <Label htmlFor="email">Recipient Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="friend@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
          )}

          {/* Custom Message */}
          {shareMethod !== "link" && (
            <div>
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to share with your certificate..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{customMessage.length}/200 characters</p>
            </div>
          )}

          {/* Share Actions */}
          <div className="space-y-3">
            {shareMethod === "link" ? (
              <Button
                onClick={handleCopyLink}
                className="w-full bg-gold-luxury hover:bg-gold-luxury/90"
                disabled={isSharing}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Certificate Link
              </Button>
            ) : (
              <>
                <Button
                  onClick={shareMethod === "whatsapp" ? handleWhatsAppShare : handleEmailShare}
                  className="w-full bg-gold-luxury hover:bg-gold-luxury/90"
                  disabled={isSharing || (shareMethod === "email" && !recipientEmail)}
                >
                  {isSharing ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sharing...
                    </>
                  ) : (
                    <>
                      {shareMethod === "whatsapp" ? (
                        <MessageCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <Mail className="w-4 h-4 mr-2" />
                      )}
                      Share Certificate
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleShareWithPDF}
                  variant="outline"
                  className="w-full border-gold-luxury text-gold-luxury hover:bg-gold-luxury/10"
                  disabled={isSharing || (shareMethod === "email" && !recipientEmail)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Share with PDF
                </Button>
              </>
            )}
          </div>

          {/* Close Button */}
          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
