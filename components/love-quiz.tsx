'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import confetti from 'canvas-confetti'

const questions = [
  {
    question: "Where did we first meet?",
    options: ["At a café", "Through friends", "At work", "Online"],
    correctAnswer: 1
  },
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Pasta", "Tacos"],
    correctAnswer: 2
  },
  {
    question: "What makes me smile the most?",
    options: ["Your jokes", "Surprise gifts", "Morning texts", "Random hugs"],
    correctAnswer: 3
  },
  {
    question: "Our first movie together was...",
    options: ["A romantic comedy", "A horror movie", "An action film", "An animation"],
    correctAnswer: 0
  },
  {
    question: "What's my dream vacation spot?",
    options: ["Paris", "Maldives", "New York", "Tokyo"],
    correctAnswer: 1
  },
  {
    question: "What's my favorite way to spend weekends?",
    options: ["Netflix and chill", "Going on adventures", "Cooking together", "Game nights"],
    correctAnswer: 2
  }
]

const celebrate = () => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 }
  });
}

export function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      celebrate()
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-center mb-4">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(index)}
                    className="text-left"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <h3 className="text-2xl font-bold">
                You scored {score} out of {questions.length}!
              </h3>
              <p className="text-muted-foreground">
                {score === questions.length
                  ? "Perfect! You know me so well! ❤️"
                  : "Not bad! We should spend more time together! 😊"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

