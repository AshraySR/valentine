'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import confetti from 'canvas-confetti'

const mazeLayout = [
  [2, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
]

interface Position {
  x: number
  y: number
}

interface HeartMazeProps {
  onComplete: () => void
}

export function HeartMaze({ onComplete}: HeartMazeProps) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleMove = useCallback((dx: number, dy: number) => {
    const newX = playerPos.x + dx
    const newY = playerPos.y + dy

    if (
      newX >= 0 &&
      newX < mazeLayout[0].length &&
      newY >= 0 &&
      newY < mazeLayout.length &&
      mazeLayout[newY][newX] !== 1
    ) {
      setPlayerPos({ x: newX, y: newY })

      if (mazeLayout[newY][newX] === 3 && !showSuccess) {
        setShowSuccess(true)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        onComplete()
      }
    }
  }, [playerPos, onComplete, showSuccess])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handleMove(0, -1)
          break
        case 'ArrowDown':
          handleMove(0, 1)
          break
        case 'ArrowLeft':
          handleMove(-1, 0)
          break
        case 'ArrowRight':
          handleMove(1, 0)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleMove])

  return (
    <Card className="p-6 relative">
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Guide Your Heart Home
          </h3>
          <p className="text-muted-foreground">
            Use arrow keys or buttons to navigate to the heart
          </p>
        </div>

        <div className="relative">
          <div className="grid gap-1 mx-auto w-fit">
            {mazeLayout.map((row, y) => (
              <div key={y} className="flex gap-1">
                {row.map((cell, x) => (
                  <motion.div
                    key={`${x}-${y}`}
                    className={`w-8 h-8 rounded-sm flex items-center justify-center
                      ${cell === 1 ? 'bg-red-200 dark:bg-red-900' : 'bg-pink-50 dark:bg-pink-950'}
                      ${cell === 3 ? 'text-red-500' : ''}
                    `}
                  >
                    {cell === 3 && '❤️'}
                    {playerPos.x === x && playerPos.y === y && (
                      <motion.div
                        className="w-6 h-6 bg-red-500 dark:bg-red-400 rounded-full"
                        layoutId="player"
                        transition={{ type: "spring", duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
            >
              <div className="text-white text-center p-4">
                <h4 className="text-2xl font-bold mb-2">You made it! 💖</h4>
                <p>Moving to the next section...</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 w-[120px] mx-auto mt-6">
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMove(0, -1)}
            className="aspect-square"
          >
            ↑
          </Button>
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMove(-1, 0)}
            className="aspect-square"
          >
            ←
          </Button>
          <div className="aspect-square" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMove(1, 0)}
            className="aspect-square"
          >
            →
          </Button>
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMove(0, 1)}
            className="aspect-square"
          >
            ↓
          </Button>
          <div />
        </div>
      </div>
    </Card>
  )
}