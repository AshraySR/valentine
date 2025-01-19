'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CandleProps {
  onBlown?: () => void
}

export function Candle({ onBlown }: CandleProps) {
  const [isBlown, setIsBlown] = useState(false)

  const handleClick = () => {
    if (!isBlown) {
      setIsBlown(true)
      onBlown?.()
    }
  }

  return (
    <div className="relative w-16 h-32 mx-2">
      <motion.div
        className="absolute bottom-0 w-8 h-24 mx-auto left-0 right-0 bg-gradient-to-t from-red-200 to-red-400 rounded"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      {!isBlown && (
        <>
          <motion.div
            className="absolute bottom-[6rem] left-[1.1rem] w-4 h-8 bg-orange-400 rounded-full blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.div
            className="absolute bottom-[7rem] left-[1.4rem] w-2 h-4 bg-white rounded-full blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </>
      )}
      <button
        onClick={handleClick}
        className="absolute inset-0 cursor-pointer"
        aria-label="Blow candle"
      />
    </div>
  )
}

