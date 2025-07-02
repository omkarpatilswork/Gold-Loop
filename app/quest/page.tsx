"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  GraduationCap,
  Trophy,
  Star,
  Target,
  Users,
  Flame,
  Gift,
  Play,
  Clock,
  Coins,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { lessons, badges, dailyChallenges } from "@/lib/quest-data"
import { SmartCTA } from "@/components/smart-cta"

const mockUser = {
  xpPoints: 145,
  level: 3,
  streak: 5,
  completedLessons: ["what-is-24k-gold", "why-invest-in-gold"],
  earnedBadges: ["gold-rookie"],
  totalGoldEarned: 25,
}

const leaderboard = [
  { name: "Priya S.", xp: 890, badges: 8, rank: 1 },
  { name: "Rahul K.", xp: 750, badges: 6, rank: 2 },
  { name: "Anjali M.", xp: 680, badges: 5, rank: 3 },
  { name: "You", xp: 145, badges: 1, rank: 12 },
  { name: "Amit P.", xp: 120, badges: 1, rank: 13 },
]

const mockUserBehavior = {
  daysSinceSignup: 12,
  hasPurchased: true,
  hasSIP: false,
  lastActivity: new Date().toISOString(),
  completedLessons: mockUser.completedLessons.length,
  totalLessons: lessons.length,
}

export default function GoldQuestPage() {
  const [selectedTab, setSelectedTab] = useState("lessons")

  const completedLessonsCount = mockUser.completedLessons.length
  const totalLessons = lessons.length
  const progressPercentage = (completedLessonsCount / totalLessons) * 100

  const nextLevel = (mockUser.level + 1) * 50
  const currentLevelProgress = ((mockUser.xpPoints % 50) / 50) * 100

  const getLessonStatus = (lessonId: string) => {
    return mockUser.completedLessons.includes(lessonId) ? "completed" : "available"
  }

  const getEstimatedGoldValue = (goldAmount: number) => {
    return (goldAmount * 5790).toFixed(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Gold Quest</h1>
              <p className="text-sm text-gray-600">🎯 Learn Gold. Earn Gold. Repeat.</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Level {mockUser.level} - SIP Starter</h2>
                <p className="opacity-90">{mockUser.xpPoints} XP Points</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  <Flame className="w-5 h-5 text-orange-300" />
                  <span className="font-bold">{mockUser.streak} Day Streak</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {completedLessonsCount}/{totalLessons} Lessons
                </Badge>
              </div>
            </div>

            {/* XP Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {mockUser.level}</span>
                <span>Level {mockUser.level + 1}</span>
              </div>
              <Progress value={currentLevelProgress} className="h-3 bg-white/20" />
              <p className="text-sm opacity-90">{50 - (mockUser.xpPoints % 50)} XP to next level</p>
            </div>

            {/* Gold Earned */}
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Total Gold Earned</span>
                <div className="text-right">
                  <p className="font-bold">₹{mockUser.totalGoldEarned}</p>
                  <p className="text-xs opacity-75">~{(mockUser.totalGoldEarned / 5790).toFixed(3)}g</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Personalized CTA */}
        <SmartCTA userBehavior={mockUserBehavior} currentGoldPrice={5790} priceChange={-1.2} />

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lessons" className="flex items-center space-x-1">
              <GraduationCap className="w-4 h-4" />
              <span>Lessons</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center space-x-1">
              <Trophy className="w-4 h-4" />
              <span>Badges</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {lessons.map((lesson, index) => {
                const status = getLessonStatus(lesson.id)
                const isLocked = index > 0 && !mockUser.completedLessons.includes(lessons[index - 1].id)

                return (
                  <Card
                    key={lesson.id}
                    className={`transition-all hover:shadow-md ${
                      status === "completed"
                        ? "border-green-200 bg-green-50"
                        : isLocked
                          ? "border-gray-200 bg-gray-50 opacity-60"
                          : "border-blue-200 bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div
                              className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${
                                status === "completed" ? "bg-green-100" : isLocked ? "bg-gray-200" : "bg-blue-100"
                              }`}
                            >
                              {lesson.emoji}
                            </div>
                            {status === "completed" && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Star className="w-3 h-3 text-white fill-current" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>

                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.estimatedTime} min</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  lesson.difficulty === "beginner"
                                    ? "border-green-300 text-green-700"
                                    : lesson.difficulty === "intermediate"
                                      ? "border-yellow-300 text-yellow-700"
                                      : "border-red-300 text-red-700"
                                }`}
                              >
                                {lesson.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center space-x-1 text-sm">
                              <Star className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">+{lesson.xpReward} XP</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Coins className="w-4 h-4 text-gold-luxury" />
                              <span className="font-medium">₹{lesson.goldBonus}</span>
                            </div>
                          </div>

                          <Link href={`/quest/lesson/${lesson.id}`}>
                            <Button
                              size="sm"
                              disabled={isLocked}
                              className={
                                status === "completed"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-blue-600 hover:bg-blue-700"
                              }
                            >
                              <Play className="w-4 h-4 mr-1" />
                              {status === "completed" ? "Review" : isLocked ? "Locked" : "Start"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Daily Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span>Daily Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      challenge.completed ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{challenge.emoji}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                          <p className="text-sm text-gray-600">{challenge.description}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {challenge.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Expires: {new Date(challenge.expiresAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="space-y-1 mb-2">
                          <div className="flex items-center space-x-1 text-sm">
                            <Star className="w-4 h-4 text-blue-600" />
                            <span>+{challenge.xpReward} XP</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Coins className="w-4 h-4 text-gold-luxury" />
                            <span>₹{challenge.goldBonus}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          disabled={challenge.completed}
                          className={challenge.completed ? "bg-green-600" : "bg-orange-600 hover:bg-orange-700"}
                        >
                          {challenge.completed ? "Completed" : "Start"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">🎁 Special Offer</h3>
                    <p className="text-sm text-gray-600">Gold dipped ₹23 today – use your rewards now!</p>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  className={`transition-all ${
                    badge.earned || mockUser.earnedBadges.includes(badge.id)
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-gray-200 bg-gray-50 opacity-75"
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{badge.emoji}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <Badge
                      variant="outline"
                      className={
                        badge.earned || mockUser.earnedBadges.includes(badge.id)
                          ? "border-yellow-500 text-yellow-700 bg-yellow-100"
                          : "border-gray-300 text-gray-600"
                      }
                    >
                      ₹{badge.reward} reward
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">{badge.criteria}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>This Month's Top Learners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.name === "You" ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{user.xp} XP</span>
                            <span>•</span>
                            <span>{user.badges} badges</span>
                          </div>
                        </div>
                      </div>
                      {user.rank <= 3 && <Trophy className="w-5 h-5 text-yellow-600" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Section */}
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">🚀 Climb the Leaderboard</h3>
                  <p className="text-sm text-gray-600 mb-4">Invite friends and earn ₹5 gold for each referral!</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Gift className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
