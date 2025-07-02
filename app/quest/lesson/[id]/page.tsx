"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star, Coins, CheckCircle, X, Gift } from "lucide-react"
import Link from "next/link"
import { lessons } from "@/lib/quest-data"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const lessonId = params.id as string

  const lesson = lessons.find((l) => l.id === lessonId)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [autoProgress, setAutoProgress] = useState(true)

  useEffect(() => {
    if (!lesson) return

    if (autoProgress && currentSlide < lesson.slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => prev + 1)
      }, lesson.slides[currentSlide].duration * 1000)

      return () => clearTimeout(timer)
    } else if (autoProgress && currentSlide === lesson.slides.length - 1) {
      // Auto-show quiz after last slide
      const timer = setTimeout(() => {
        setShowQuiz(true)
      }, lesson.slides[currentSlide].duration * 1000)

      return () => clearTimeout(timer)
    }
  }, [currentSlide, lesson, autoProgress])

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lesson not found</p>
      </div>
    )
  }

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return

    setQuizCompleted(true)
    if (selectedAnswer === lesson.quiz.correctAnswer) {
      setShowReward(true)
      toast({
        title: "Perfect Score! 🎉",
        description: `You earned ${lesson.xpReward + 5} XP and ₹${lesson.goldBonus + 2} bonus!`,
      })
    } else {
      toast({
        title: "Good Try! 💪",
        description: `You earned ${lesson.xpReward} XP and ₹${lesson.goldBonus} gold!`,
      })
    }
  }

  const handleLessonComplete = () => {
    // Navigate to CTA action
    router.push(lesson.ctaAction.deepLink)
  }

  const progressPercentage = showQuiz ? 100 : ((currentSlide + 1) / lesson.slides.length) * 100

  const renderSlideContent = (slide: any) => {
    return (
      <div className="text-center space-y-6">
        {/* Slide Visual/Animation Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <div className="text-6xl">{lesson.emoji}</div>
        </div>

        {/* Slide Content */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{slide.title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{slide.content}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {lesson.slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index <= currentSlide ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderQuiz = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Quiz</h2>
          <p className="text-gray-600">Test your knowledge to earn bonus rewards!</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{lesson.quiz.question}</h3>

            <div className="space-y-3">
              {lesson.quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !quizCompleted && setSelectedAnswer(index)}
                  disabled={quizCompleted}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    quizCompleted
                      ? index === lesson.quiz.correctAnswer
                        ? "border-green-500 bg-green-50 text-green-800"
                        : index === selectedAnswer && index !== lesson.quiz.correctAnswer
                          ? "border-red-500 bg-red-50 text-red-800"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      : selectedAnswer === index
                        ? "border-blue-500 bg-blue-50 text-blue-800"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {quizCompleted && index === lesson.quiz.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {quizCompleted && index === selectedAnswer && index !== lesson.quiz.correctAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {quizCompleted && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">{lesson.quiz.explanation}</p>
              </div>
            )}

            {!quizCompleted && (
              <Button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Submit Answer
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/quest">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{lesson.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge variant="outline" className="text-xs">
                    {lesson.difficulty}
                  </Badge>
                  <span>•</span>
                  <span>{lesson.estimatedTime} min</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-blue-600" />
                <span>+{lesson.xpReward} XP</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Coins className="w-4 h-4 text-gold-luxury" />
                <span>₹{lesson.goldBonus}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{showQuiz ? "Quiz" : `Slide ${currentSlide + 1} of ${lesson.slides.length}`}</span>
              <span>{progressPercentage.toFixed(0)}% Complete</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {showQuiz ? (
            renderQuiz()
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-8">{renderSlideContent(lesson.slides[currentSlide])}</CardContent>
            </Card>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={() => {
                if (showQuiz) {
                  setShowQuiz(false)
                  setCurrentSlide(lesson.slides.length - 1)
                } else if (currentSlide > 0) {
                  setCurrentSlide(currentSlide - 1)
                  setAutoProgress(false)
                }
              }}
              disabled={currentSlide === 0 && !showQuiz}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button variant="ghost" onClick={() => setAutoProgress(!autoProgress)} className="text-sm">
              Auto-progress: {autoProgress ? "ON" : "OFF"}
            </Button>

            <Button
              onClick={() => {
                if (showQuiz && quizCompleted) {
                  handleLessonComplete()
                } else if (!showQuiz && currentSlide < lesson.slides.length - 1) {
                  setCurrentSlide(currentSlide + 1)
                  setAutoProgress(false)
                } else if (!showQuiz) {
                  setShowQuiz(true)
                }
              }}
              disabled={showQuiz && !quizCompleted}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showQuiz && quizCompleted ? (
                <>
                  {lesson.ctaAction.primary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : showQuiz ? (
                "Complete Quiz First"
              ) : currentSlide < lesson.slides.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Take Quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Reward Animation */}
          {showReward && (
            <Card className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Gift className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <div className="absolute inset-0 animate-ping">
                    <Gift className="w-16 h-16 text-green-600 opacity-75 mx-auto" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Perfect Score! 🎉</h3>
                <p className="text-gray-600 mb-4">
                  You earned {lesson.xpReward + 5} XP and ₹{lesson.goldBonus + 2} bonus gold!
                </p>
                <Badge className="bg-green-100 text-green-800">Bonus Unlocked!</Badge>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
