"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { CursorHearts } from "@/components/cursor-hearts"
import { Candle } from "@/components/candle"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CandlesPage() {
  const router = useRouter()
  const [candlesBlown, setCandlesBlown] = useState(0)

  const handleCandleBlown = () => {
    setCandlesBlown((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <section className="h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">Make a Wish</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">Blow out the candles and make a wish...</p>
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
            <Button onClick={() => router.push("/memories")}>Previous</Button>
            <Button
              onClick={() => router.push("/maze")}
              disabled={candlesBlown < 3}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {candlesBlown === 3 ? "Continue Journey" : `${3 - candlesBlown} candles remaining`}
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

