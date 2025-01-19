'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface MemoryCardProps {
  imageUrl: string
  hiddenMessage: string
  index: number
  onClick?: () => void
}

export function MemoryCard({ imageUrl, hiddenMessage, index, onClick }: MemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  return (
    <motion.div
      className="relative aspect-square cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => {
        setIsFlipped(!isFlipped)
        onClick?.()
      }}
    >
      <motion.div
        className="w-full h-full rounded-lg overflow-hidden shadow-lg"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full h-full">
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 text-white text-center"
              >
                <p className="text-lg font-medium">{hiddenMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.stopPropagation()
              setShowMessage(!showMessage)
            }}
          >
            {showMessage ? 'Hide' : 'Read Message'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}