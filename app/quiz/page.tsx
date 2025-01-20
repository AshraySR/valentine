"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { CursorHearts } from "@/components/cursor-hearts"
import { LoveQuiz } from "@/components/love-quiz"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <section className="h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">
          Let&apos;s play a game, shall we?
        </h2>
        <LoveQuiz />
        <div className="space-x-4">
          <Button onClick={() => router.push("/")}>Previous</Button>
          <Button onClick={() => router.push("/memories")}>Next</Button>
        </div>
      </section>
    </main>
  )
}

