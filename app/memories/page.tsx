"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { CursorHearts } from "@/components/cursor-hearts"
import { MemoryCard } from "@/components/memory-card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const memories = [
  {
    image: "/1.jpg?height=400&width=400",
    message: "Remember our first date? Your smile lit up the whole room ❤️",
  },
  {
    image: "/2.jpg?height=400&width=400",
    message: "That time we got lost but found the best adventure together 🌟",
  },
  {
    image: "/3.jpg?height=400&width=400",
    message: "Dancing in the rain, not caring about anything else 💃",
  },
  {
    image: "/4.jpg?height=400&width=400",
    message: "Our first road trip - singing at the top of our lungs 🎵",
  },
  {
    image: "/5.jpg?height=400&width=400",
    message: "That sunset picnic where time stood still ✨",
  },
  {
    image: "/6.jpg?height=400&width=400",
    message: "Making silly faces and laughing until our sides hurt 😊",
  },
]

export default function MemoriesPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <section className="min-h-screen p-4 py-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 text-center">
            Our Beautiful Memories Together
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Click on each photo to reveal a special message ❤️
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memories.map((memory, index) => (
              <MemoryCard key={index} imageUrl={memory.image} hiddenMessage={memory.message} index={index} />
            ))}
          </div>
          <div className="text-center space-x-4">
            <Button onClick={() => router.push("/quiz")}>Previous</Button>
            <Button onClick={() => router.push("/candles")}>Next</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

