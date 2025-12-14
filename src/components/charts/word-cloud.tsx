"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface WordCloudProps {
  data: { name: string; percentage: number; color: string }[]
  width?: number
  height?: number
}

export function WordCloud({ data, width = 400, height = 200 }: WordCloudProps) {
  const words = useMemo(() => {
    const maxPercentage = Math.max(...data.map((d) => d.percentage))
    const minSize = 12
    const maxSize = 32

    return data.map((item, index) => {
      const size = minSize + (item.percentage / maxPercentage) * (maxSize - minSize)
      // Distribute words in a cloud pattern
      const angle = (index / data.length) * 2 * Math.PI
      const radius = 30 + Math.random() * 50
      const x = width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 60
      const y = height / 2 + Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 40

      return {
        ...item,
        size,
        x: Math.max(40, Math.min(width - 60, x)),
        y: Math.max(20, Math.min(height - 20, y)),
      }
    })
  }, [data, width, height])

  return (
    <div className="relative" style={{ width, height }}>
      {words.map((word, index) => (
        <motion.div
          key={word.name}
          className="absolute cursor-default hover:opacity-80 transition-opacity"
          style={{
            left: word.x,
            top: word.y,
            fontSize: word.size,
            color: word.color,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="font-semibold whitespace-nowrap">{word.name}</span>
        </motion.div>
      ))}
    </div>
  )
}
