"use client"

import { motion } from "framer-motion"
import { Bell, Sparkles, CalendarDays } from "lucide-react"

export function CountdownHeader() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex justify-center gap-3 mb-4"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Bell className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        <Bell className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
      </motion.div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
        <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
          Los Resultados Llegan en
        </span>
      </h1>

      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground"
        animate={{
          textShadow: [
            "0 0 20px rgba(239, 68, 68, 0.3)",
            "0 0 40px rgba(239, 68, 68, 0.5)",
            "0 0 20px rgba(239, 68, 68, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Noche Buena
      </motion.h2>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground mt-4 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <CalendarDays className="w-5 h-5" />
        24 de Diciembre, 2024
      </motion.p>
    </motion.div>
  )
}

