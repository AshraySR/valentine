'use client'

import { motion } from 'framer-motion'

export function BackgroundHearts() {
  // Pre-calculated positions to avoid hydration issues
  const heartPositions = [
    { top: 20, left: 20, delay: 0 },
    { top: 40, left: 60, delay: 0.2 },
    { top: 60, left: 30, delay: 0.4 },
    { top: 80, left: 70, delay: 0.6 },
    { top: 30, left: 80, delay: 0.8 },
    { top: 70, left: 20, delay: 1 },
    { top: 20, left: 90, delay: 1.2 },
    { top: 90, left: 40, delay: 1.4 },
    { top: 50, left: 50, delay: 1.6 },
    { top: 10, left: 30, delay: 1.8 },
    { top: 85, left: 85, delay: 2 },
    { top: 45, left: 15, delay: 2.2 },
    { top: 15, left: 75, delay: 2.4 },
    { top: 75, left: 45, delay: 2.6 },
    { top: 35, left: 65, delay: 2.8 },
    { top: 65, left: 35, delay: 3 },
    { top: 25, left: 55, delay: 3.2 },
    { top: 55, left: 25, delay: 3.4 },
    { top: 95, left: 95, delay: 3.6 },
    { top: 5, left: 5, delay: 3.8 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {heartPositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute text-red-400/20 dark:text-red-600/20"
          initial={{ 
            top: `${position.top}%`,
            left: `${position.left}%`,
            scale: 1.5,
            rotate: 0
          }}
          animate={{ 
            y: [-20, 20],
            rotate: 360
          }}
          transition={{
            duration: 3,
            delay: position.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

