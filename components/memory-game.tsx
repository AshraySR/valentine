'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"

interface MemoryCard {
  id: number
  image: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const images = [
      '/placeholder.svg?height=200&width=200&text=1',
      '/placeholder.svg?height=200&width=200&text=2',
      '/placeholder.svg?height=200&width=200&text=3',
      '/placeholder.svg?height=200&width=200&text=4',
    ]
    
    const gameCards = [...images, ...images]
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5)

    setCards(gameCards)
  }, [])

  const handleCardClick = (id: number) => {
    if (isLocked) return
    if (flippedCards.length === 2) return
    if (cards[id].isMatched) return
    if (flippedCards.includes(id)) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)
    setFlippedCards([...flippedCards, id])

    if (flippedCards.length === 1) {
      setIsLocked(true)
      const firstCard = cards[flippedCards[0]]
      const secondCard = cards[id]

      if (firstCard.image === secondCard.image) {
        newCards[flippedCards[0]].isMatched = true
        newCards[id].isMatched = true
        setCards(newCards)
        setFlippedCards([])
        setIsLocked(false)
      } else {
        setTimeout(() => {
          newCards[flippedCards[0]].isFlipped = false
          newCards[id].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
          setIsLocked(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCardClick(card.id)}
        >
          <Card className="aspect-square cursor-pointer">
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 backface-hidden"
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-full h-full bg-red-100 dark:bg-red-900 rounded-lg" />
              </motion.div>
              <motion.div
                className="absolute inset-0 backface-hidden"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: card.isFlipped ? 360 : 180 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={card.image || "/placeholder.svg"}
                  alt="Memory card"
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

