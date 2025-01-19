'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const valentinesDay = new Date('2025-02-14T00:00:00')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = valentinesDay.getTime() - now.getTime()

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div
          key={unit}
          className="flex flex-col items-center p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-3xl font-bold text-red-600 dark:text-red-400">
            {value}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
            {unit}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

