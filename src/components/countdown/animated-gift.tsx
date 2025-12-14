"use client"

import { motion } from "framer-motion"
import { Star, Sparkles } from "lucide-react"

export function AnimatedGift() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary to-red-600 rounded-lg relative overflow-hidden"
        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
      >
        {/* Lazo vertical */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-6 bg-yellow-400" />
        {/* Lazo horizontal */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 md:h-6 bg-yellow-400" />
        {/* Moo central */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-700" />
        </motion.div>
        {/* Brillos */}
        <motion.div
          className="absolute top-2 right-2"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="w-4 h-4 text-white/60" />
        </motion.div>
      </motion.div>

      {/* Sombra */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 md:w-28 lg:w-36 h-4 bg-black/20 rounded-full blur-sm"
        animate={{ scaleX: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

