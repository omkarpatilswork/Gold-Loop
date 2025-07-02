export interface Slide {
  id: number
  title: string
  content: string
  animation?: string
  visual?: string
  duration: number // seconds
}

export interface Lesson {
  id: string
  title: string
  emoji: string
  description: string
  slides: Slide[]
  xpReward: number
  goldBonus: number
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: number // minutes
  ctaAction: {
    primary: string
    secondary?: string
    deepLink: string
    suggestedAmount?: number
  }
  quiz: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  criteria: string
  reward: number
  earned: boolean
  earnedDate?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  emoji: string
  xpReward: number
  goldBonus: number
  type: "daily" | "weekly" | "special"
  expiresAt: string
  completed: boolean
}

export const lessons: Lesson[] = [
  {
    id: "what-is-24k-gold",
    title: "What is 24K Gold?",
    emoji: "🟡",
    description: "Learn about gold purity and why 24K is the best for investing",
    estimatedTime: 2,
    difficulty: "beginner",
    xpReward: 10,
    goldBonus: 5,
    slides: [
      {
        id: 1,
        title: "Gold Purity Scale",
        content: "Gold purity is measured in karats. 24K is the purest form of gold – 99.9% pure!",
        animation: "purity-bar",
        duration: 15,
      },
      {
        id: 2,
        title: "BIS Certification",
        content: "All Augmont gold is BIS 24K certified and stored securely in insured vaults.",
        visual: "bis-hallmark",
        duration: 12,
      },
      {
        id: 3,
        title: "Investment Grade",
        content: "24K gold is soft and ideal for investing. Lower karats are used for jewellery.",
        visual: "investment-comparison",
        duration: 13,
      },
    ],
    ctaAction: {
      primary: "Buy ₹100 Worth of 24K Gold Now",
      secondary: "See My Certificate",
      deepLink: "/buy?amount=100&source=quest",
      suggestedAmount: 100,
    },
    quiz: {
      question: "What does 24K gold mean?",
      options: ["24% pure gold", "99.9% pure gold", "24 grams of gold", "Gold with 24 colors"],
      correctAnswer: 1,
      explanation: "24K gold means 99.9% pure gold, making it the highest quality for investment!",
    },
  },
  {
    id: "why-invest-in-gold",
    title: "Why Invest in Gold?",
    emoji: "📈",
    description: "Discover how gold protects your wealth against inflation",
    estimatedTime: 3,
    difficulty: "beginner",
    xpReward: 15,
    goldBonus: 8,
    slides: [
      {
        id: 1,
        title: "10-Year Growth",
        content: "Gold value has grown ~250% in the past 10 years. It protects you against inflation.",
        animation: "price-timeline",
        duration: 18,
      },
      {
        id: 2,
        title: "Currency Protection",
        content: "While ₹ weakens and prices rise, gold stays strong — it's a safety net for your future.",
        visual: "currency-comparison",
        duration: 15,
      },
      {
        id: 3,
        title: "Portfolio Diversification",
        content: "Smart investors keep 5-10% of their portfolio in gold for stability and growth.",
        visual: "portfolio-pie",
        duration: 12,
      },
    ],
    ctaAction: {
      primary: "Start Gold SIP",
      secondary: "Try 3-Day Gold Challenge",
      deepLink: "/sip?source=quest",
      suggestedAmount: 500,
    },
    quiz: {
      question: "How much has gold grown in the past 10 years?",
      options: ["50%", "150%", "250%", "350%"],
      correctAnswer: 2,
      explanation: "Gold has grown approximately 250% in the past decade, making it a strong hedge against inflation!",
    },
  },
  {
    id: "gold-sip-explained",
    title: "Gold SIP Explained",
    emoji: "🔁",
    description: "Learn how systematic investing in gold builds wealth",
    estimatedTime: 3,
    difficulty: "intermediate",
    xpReward: 20,
    goldBonus: 10,
    slides: [
      {
        id: 1,
        title: "Monthly Auto-Invest",
        content: "A Gold SIP means investing a fixed amount (₹100–₹1000) every month automatically.",
        animation: "calendar-sip",
        duration: 16,
      },
      {
        id: 2,
        title: "Rupee Cost Averaging",
        content: "Buy more gold when prices are low, less when high. This averages out your cost over time.",
        visual: "cost-averaging",
        duration: 18,
      },
      {
        id: 3,
        title: "Compound Growth",
        content: "Even ₹100 a month builds long-term wealth — just like recurring deposits but with gold!",
        animation: "compound-growth",
        duration: 16,
      },
    ],
    ctaAction: {
      primary: "Start SIP in 2 Taps",
      secondary: "Calculate My SIP Returns",
      deepLink: "/sip/setup?source=quest",
      suggestedAmount: 500,
    },
    quiz: {
      question: "What is the main benefit of Gold SIP?",
      options: ["Higher returns", "Rupee cost averaging", "No fees", "Instant profits"],
      correctAnswer: 1,
      explanation:
        "Rupee cost averaging helps you buy more gold when prices are low and less when high, reducing overall cost!",
    },
  },
  {
    id: "physical-vs-digital",
    title: "Physical vs Digital Gold",
    emoji: "⚖️",
    description: "Compare the benefits of digital gold over physical gold",
    estimatedTime: 2,
    difficulty: "beginner",
    xpReward: 12,
    goldBonus: 6,
    slides: [
      {
        id: 1,
        title: "Storage Comparison",
        content: "Physical gold needs lockers and can be lost. Digital gold is safe in secure vaults.",
        visual: "storage-comparison",
        duration: 14,
      },
      {
        id: 2,
        title: "Liquidity & Flexibility",
        content: "Digital gold can be bought/sold instantly. Physical gold requires visits to jewellers.",
        animation: "liquidity-demo",
        duration: 16,
      },
      {
        id: 3,
        title: "Cost Efficiency",
        content: "No making charges, storage fees, or purity testing costs with digital gold.",
        visual: "cost-comparison",
        duration: 15,
      },
    ],
    ctaAction: {
      primary: "Convert Physical Gold to Digital",
      secondary: "Gift Gold Online",
      deepLink: "/swap?source=quest",
    },
    quiz: {
      question: "What's the biggest advantage of digital gold?",
      options: ["Lower price", "Instant liquidity", "Physical possession", "No purity guarantee"],
      correctAnswer: 1,
      explanation: "Digital gold offers instant liquidity - you can buy or sell anytime without visiting stores!",
    },
  },
  {
    id: "market-trends",
    title: "Gold Market Trends",
    emoji: "📊",
    description: "Understand gold price movements and timing your investments",
    estimatedTime: 4,
    difficulty: "advanced",
    xpReward: 25,
    goldBonus: 15,
    slides: [
      {
        id: 1,
        title: "Price Factors",
        content: "Gold prices change based on global events, inflation, and currency movements.",
        animation: "price-factors",
        duration: 20,
      },
      {
        id: 2,
        title: "Buying Opportunities",
        content: "Track trends and buy during dips to maximize value. Small dips create big opportunities!",
        visual: "price-chart",
        duration: 18,
      },
      {
        id: 3,
        title: "Smart Timing",
        content: "Set price alerts and use SIP to automatically benefit from market fluctuations.",
        animation: "smart-timing",
        duration: 17,
      },
    ],
    ctaAction: {
      primary: "Set Price Alert",
      secondary: "Buy on Today's Dip",
      deepLink: "/buy?alert=true&source=quest",
      suggestedAmount: 200,
    },
    quiz: {
      question: "When is the best time to buy gold?",
      options: ["Only during festivals", "When prices are high", "During price dips", "Never"],
      correctAnswer: 2,
      explanation: "Buying during price dips helps you get more gold for your money, maximizing long-term returns!",
    },
  },
]

export const badges: Badge[] = [
  {
    id: "gold-rookie",
    name: "Gold Rookie",
    description: "Complete your first lesson",
    emoji: "🥉",
    criteria: "Complete 1 lesson",
    reward: 2,
    earned: false,
  },
  {
    id: "gold-scholar",
    name: "Gold Scholar",
    description: "Complete all learning modules",
    emoji: "🎓",
    criteria: "Complete all 5 lessons",
    reward: 10,
    earned: false,
  },
  {
    id: "sip-champ",
    name: "SIP Champ",
    description: "Start SIP after completing lessons",
    emoji: "🏆",
    criteria: "Start SIP from Gold Quest",
    reward: 25,
    earned: false,
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 100% in all quizzes",
    emoji: "🧠",
    criteria: "Perfect score in all quizzes",
    reward: 15,
    earned: false,
  },
  {
    id: "referral-guru",
    name: "Referral Guru",
    description: "Invite 3 friends to Gold Quest",
    emoji: "👥",
    criteria: "3 successful referrals",
    reward: 50,
    earned: false,
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "7-day learning streak",
    emoji: "🔥",
    criteria: "Learn for 7 consecutive days",
    reward: 20,
    earned: false,
  },
]

export const dailyChallenges: Challenge[] = [
  {
    id: "daily-lesson",
    title: "Learn Something New",
    description: "Complete 1 lesson today",
    emoji: "📚",
    xpReward: 10,
    goldBonus: 5,
    type: "daily",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
  },
  {
    id: "market-check",
    title: "Check Gold Price",
    description: "View today's gold price trend",
    emoji: "📈",
    xpReward: 5,
    goldBonus: 2,
    type: "daily",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
  },
  {
    id: "weekly-streak",
    title: "Weekly Learning Streak",
    description: "Complete 3 lessons this week",
    emoji: "🔥",
    xpReward: 25,
    goldBonus: 10,
    type: "weekly",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
  },
]
