"use client"

import { memo } from "react"
import { motion } from "framer-motion"

export const AnimatedMoon = memo(function AnimatedMoon() {
  return (
    <motion.div
      className="absolute top-20 right-10 md:top-32 md:right-20"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200"
          animate={{
            boxShadow: [
              "0 0 30px rgba(253, 224, 71, 0.3)",
              "0 0 60px rgba(253, 224, 71, 0.5)",
              "0 0 30px rgba(253, 224, 71, 0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        {/* Crateres */}
        <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-yellow-300/50" />
        <div className="absolute top-8 right-5 w-2 h-2 rounded-full bg-yellow-300/50" />
        <div className="absolute bottom-4 left-6 w-4 h-4 rounded-full bg-yellow-300/30" />
      </div>
    </motion.div>
  )
})

