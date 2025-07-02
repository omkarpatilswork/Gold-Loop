"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Sparkles, Coins, Star, ArrowRight } from "lucide-react"

interface RewardClaimProps {
  isOpen: boolean
  onClose: () => void
  reward: {
    xp: number
    gold: number
    badge?: string
    title: string
    description: string
  }
}

export function RewardClaim({ isOpen, onClose, reward }: RewardClaimProps) {
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    setClaimed(true)
    // Add confetti animation
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Celebration Background */}
        <div className="relative bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 p-8 text-white">
          {/* Floating Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            <Sparkles className="absolute top-4 left-4 w-6 h-6 animate-bounce" />
            <Sparkles className="absolute top-8 right-6 w-4 h-4 animate-bounce delay-100" />
            <Sparkles className="absolute bottom-8 left-8 w-5 h-5 animate-bounce delay-200" />
            <Sparkles className="absolute bottom-4 right-4 w-6 h-6 animate-bounce delay-300" />
          </div>

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{reward.title}</h2>
            <p className="text-white/90 mb-6">{reward.description}</p>

            {/* Rewards Display */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Star className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm font-medium">+{reward.xp} XP</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Coins className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm font-medium">₹{reward.gold}</p>
              </div>
              {reward.badge && (
                <div className="bg-white/20 rounded-lg p-3 text-center">
                  <Badge className="bg-yellow-400 text-yellow-900">{reward.badge}</Badge>
                </div>
              )}
            </div>

            {!claimed ? (
              <Button onClick={handleClaim} className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8">
                <Gift className="w-4 h-4 mr-2" />
                Claim Reward
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold">Reward Claimed! 🎉</p>
                  <p className="text-sm text-white/80">Added to your wallet</p>
                </div>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Continue Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
