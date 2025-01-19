'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MemoryCard } from "@/components/memory-card"
import { Candle } from "@/components/candle"
import { CursorHearts } from "@/components/cursor-hearts"
import { CountdownTimer } from "@/components/countdown-timer"
import { LoveQuiz } from "@/components/love-quiz"
import confetti from 'canvas-confetti'
import dynamic from 'next/dynamic'
import { BackgroundHearts } from "@/components/background-hearts"
//import { HeartMaze } from '@/components/heart-maze';

const HeartMaze = dynamic(() => import('@/components/heart-maze').then(mod => ({ default: mod.HeartMaze })), {
  ssr: false
})

// Sample messages for the memory cards
const memories = [
  {
    image: "/1.jpg?height=400&width=400",
    message: "Remember our first date? Your smile lit up the whole room ❤️"
  },
  {
    image: "/2.jpg?height=400&width=400",
    message: "That time we got lost but found the best adventure together 🌟"
  },
  {
    image: "/3.jpg?height=400&width=400",
    message: "Dancing in the rain, not caring about anything else 💃"
  },
  {
    image: "/4.jpg?height=400&width=400",
    message: "Our first road trip - singing at the top of our lungs 🎵"
  },
  {
    image: "/5.jpg?height=400&width=400",
    message: "That sunset picnic where time stood still ✨"
  },
  {
    image: "/6.jpg?height=400&width=400",
    message: "Making silly faces and laughing until our sides hurt 😊"
  }
]

export default function ValentinePage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(0)

  const sections = [
    { id: 'welcome', title: "Welcome" },
    { id: 'quiz', title: "Love Quiz" },
    { id: 'memories', title: "Our Memories" },
    { id: 'candles', title: "Make a Wish" },
    { id: 'maze', title: "Heart's Journey" },
    { id: 'proposal', title: "The Question" }
  ]

  const handleNext = () => {
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1))
    console.log(currentSection)
  }

  const handlePrevious = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0))
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleCandleBlown = () => {
    setCandlesBlown(prev => prev + 1)
  }

  const handleNextFour = () => {
    setCurrentSection(5)
  }


  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {currentSection === 0 && (
            <section className="relative h-screen flex flex-col items-center justify-center text-center p-4">
              <BackgroundHearts />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 1 }}
                className="space-y-8 relative z-10"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-24 h-24 text-red-500 dark:text-red-400 mx-auto" />
                </motion.div>
                
                <div className="space-y-4">
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold text-red-600 dark:text-red-400"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    A Special Question
                  </motion.h1>
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    for someone extraordinary
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button
                    onClick={handleNext}
                    className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Begin the Journey ❤️
                  </Button>
                </motion.div>
              </motion.div>
            </section>
          )}

          {currentSection === 1 && (
            <section className="h-screen flex flex-col items-center justify-center p-4 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">
                Let&apos;s play a game, shall we?
              </h2>
              <LoveQuiz />
              <div className="space-x-4">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </section>
          )}

{currentSection === 2 && (
  <section className="min-h-screen p-4 py-20">
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">
        Our Beautiful Memories Together
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Click on each photo to reveal a special message ❤️
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memories.map((memory, index) => (
          <MemoryCard
            key={index}
            imageUrl={memory.image}
            hiddenMessage={memory.message}
            index={index}
          />
        ))}
      </div>
      <div className="text-center space-x-4">
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  </section>
)}

          {currentSection === 3 && (
            <section className="h-screen flex flex-col items-center justify-center p-4 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">
                  Make a Wish
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  Blow out the candles and make a wish...
                </p>
                <div className="flex justify-center items-end gap-4 mb-8">
                  <Candle onBlown={handleCandleBlown} />
                  <Candle onBlown={handleCandleBlown} />
                  <Candle onBlown={handleCandleBlown} />
                </div>
                {candlesBlown > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg text-gray-600 dark:text-gray-400"
                  >
                    {candlesBlown === 3 
                      ? "All candles blown! Your wish will come true... ✨"
                      : `${3 - candlesBlown} candles remaining...`}
                  </motion.p>
                )}
                <div className="space-x-4">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={candlesBlown < 3}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {candlesBlown === 3 ? "Continue Journey" : `${3 - candlesBlown} candles remaining`}
                  </Button>
                </div>
              </motion.div>
            </section>
          )}

          {currentSection === 4 && (
            <section className="h-screen flex flex-col items-center justify-center p-4 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">
                Follow Your Heart
              </h2>
              <HeartMaze onComplete={handleNextFour} />
              <div className="space-x-4">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNextFour}>Next</Button>
              </div>
            </section>
          )}

          {currentSection === 5 && (
            <section className="h-screen flex flex-col items-center justify-center p-4 space-y-12">
              {!showCelebration ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-12"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">
                      Time Until Valentine&apos;s Day
                    </h2>
                    <CountdownTimer />
                  </div>
                  <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-red-600 dark:text-red-400">
                      Will You Be My Valentine?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button
                        onClick={() => {
                          setShowCelebration(true)
                          triggerConfetti()
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-6"
                      >
                        Yes! 💝
                      </Button>
                      <motion.button
                        whileHover={{ x: [0, -100, 100, -100, 100, 0] }}
                        className="text-xl px-8 py-6 bg-gray-200 dark:bg-gray-800 rounded-md"
                      >
                        Let me think.
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center space-y-8"
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-red-600 dark:text-red-400">
                    Yay! 🎉💕
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
                    You&apos;ve made me the happiest person in the world!
                  </p>
                  <div className="flex justify-center">
                    <Sparkles className="w-32 h-32 text-red-500 dark:text-red-400 animate-bounce" />
                  </div>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="fixed text-6xl"
                      initial={{ 
                        top: "100vh",
                        left: `${Math.random() * 100}vw`,
                        rotate: 0
                      }}
                      animate={{ 
                        top: "-20vh",
                        rotate: 360
                      }}
                      transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      🎈
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

