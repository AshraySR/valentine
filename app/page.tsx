"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { CursorHearts } from "@/components/cursor-hearts"
import { BackgroundHearts } from "@/components/background-hearts"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 transition-colors duration-300">
      <CursorHearts />
      <ThemeToggle />

      <section className="relative h-screen flex flex-col items-center justify-center text-center p-4">
        <BackgroundHearts />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="space-y-8 relative z-10"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-24 h-24 text-red-500 dark:text-red-400 mx-auto" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-red-600 dark:text-red-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              A Special Question
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              for someone extraordinary
            </motion.p>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
            <Button
              onClick={() => router.push("/quiz")}
              className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Begin the Journey ❤️
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

