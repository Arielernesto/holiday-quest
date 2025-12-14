"use client"

import { motion } from "framer-motion"

export function ChristmasLights() {
  const colors = ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#ec4899", "#8b5cf6"]
  const lights = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: i * 0.1,
  }))

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between px-2 md:px-8">
      {lights.map((light) => (
        <motion.div key={light.id} className="flex flex-col items-center">
          <div className="w-px h-4 md:h-8 bg-green-800" />
          <motion.div
            className="w-2 h-3 md:w-3 md:h-4 rounded-full"
            style={{ backgroundColor: light.color }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.9, 1.1, 0.9],
              boxShadow: [`0 0 5px ${light.color}`, `0 0 20px ${light.color}`, `0 0 5px ${light.color}`],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: light.delay,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

