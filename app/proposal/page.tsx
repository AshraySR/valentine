"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CursorHearts } from "@/components/cursor-hearts"
import { CountdownTimer } from "@/components/countdown-timer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

export default function ProposalPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const [showCelebration, setShowCelebration] = useState(false)

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <section className="h-screen flex flex-col items-center justify-center p-4 space-y-12">
        {!showCelebration ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-12">
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
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-red-600 dark:text-red-400">Yay! 🎉💕</h2>
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
                  rotate: 0,
                }}
                animate={{
                  top: "-20vh",
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                🎈
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  )
}

