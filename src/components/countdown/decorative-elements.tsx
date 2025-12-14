"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { ChristmasTree } from "./christmas-tree"
import { AnimatedGift } from "./animated-gift"

export const DecorativeElements = memo(function DecorativeElements() {
  return (
    <motion.div
      className="flex items-end gap-6 md:gap-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <div className="hidden md:block">
        <ChristmasTree />
      </div>
      <AnimatedGift />
      <div className="hidden md:block">
        <ChristmasTree />
      </div>
    </motion.div>
  )
})

