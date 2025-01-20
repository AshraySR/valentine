"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { CursorHearts } from "@/components/cursor-hearts"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const HeartMaze = dynamic(() => import("@/components/heart-maze").then((mod) => ({ default: mod.HeartMaze })), {
  ssr: false,
})

export default function MazePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <section className="h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">Help Me Find Your Heart</h2>
        <HeartMaze onComplete={() => router.push("/proposal")} />
        <div className="space-x-4">
          <Button onClick={() => router.push("/candles")}>Previous</Button>
          <Button onClick={() => router.push("/proposal")}>Next</Button>
        </div>
      </section>
    </main>
  )
}

