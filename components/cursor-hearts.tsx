'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Heart {
  id: number
  x: number
  y: number
}

export function CursorHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const newHeart: Heart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }

      setHearts(prev => [...prev, newHeart])
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0.5, x: heart.x, y: heart.y }}
            animate={{
              scale: 1,
              y: heart.y - 100,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute text-2xl"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

