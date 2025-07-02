"use client"

import { useState } from "react"
import { Home, TrendingUp, ArrowUpDown, Gift, User, Coins } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/sip", icon: TrendingUp, label: "SIP" },
  { href: "/sell", icon: ArrowUpDown, label: "Sell" },
  { href: "/gift", icon: Gift, label: "Gift" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
  const pathname = usePathname()
  const [showQuickActions, setShowQuickActions] = useState(false)

  return (
    <>
      {/* Quick Action Overlay */}
      {showQuickActions && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setShowQuickActions(false)}>
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-2xl border border-amber-200">
            <div className="grid grid-cols-2 gap-3 w-48">
              <Link href="/buy" onClick={() => setShowQuickActions(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  Buy Gold
                </Button>
              </Link>
              <Link href="/sip" onClick={() => setShowQuickActions(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  Start SIP
                </Button>
              </Link>
              <Link href="/sell" onClick={() => setShowQuickActions(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  Sell Gold
                </Button>
              </Link>
              <Link href="/convert" onClick={() => setShowQuickActions(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  Convert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-amber-200 z-30">
        <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            if (index === 2) {
              // Middle item - Quick Action Button with animated gold coin
              return (
                <div key="quick-action" className="relative">
                  <Button
                    onClick={() => setShowQuickActions(!showQuickActions)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg group"
                  >
                    <div className="relative">
                      <ArrowUpDown
                        className={`w-5 h-5 transition-all duration-300 ${showQuickActions ? "scale-0 rotate-45" : "scale-100"} group-hover:scale-0`}
                      />
                      <Coins
                        className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${showQuickActions ? "scale-100 rotate-180" : "scale-0"} group-hover:scale-100 group-hover:animate-spin`}
                      />
                    </div>
                  </Button>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive ? "text-amber-600 bg-amber-50" : "text-gray-600 hover:text-amber-600"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
