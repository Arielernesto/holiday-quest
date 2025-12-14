"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface BubbleChartProps {
  data: { name: string; percentage: number; color: string }[]
  width?: number
  height?: number
}

export function BubbleChart({ data, width = 400, height = 250 }: BubbleChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxPercentage = Math.max(...data.map((d) => d.percentage))
  const minRadius = 20
  const maxRadius = 50

  // Simple bubble positioning
  const bubbles = data.slice(0, 8).map((item, index) => {
    const radius = minRadius + (item.percentage / maxPercentage) * (maxRadius - minRadius)
    const cols = 4
    const row = Math.floor(index / cols)
    const col = index % cols
    const x = (width / cols) * (col + 0.5) + (row % 2 === 1 ? 20 : 0)
    const y = height * 0.3 + row * 80

    return { ...item, x, y, radius }
  })

  return (
    <div className="relative w-full" style={{ height }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {bubbles.map((bubble, index) => (
          <motion.g key={bubble.name}>
            <motion.circle
              cx={bubble.x}
              cy={bubble.y}
              r={bubble.radius}
              fill={bubble.color}
              fillOpacity={hoveredIndex === index ? 1 : 0.8}
              className="cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: index * 0.1,
              }}
              style={{ transformOrigin: `${bubble.x}px ${bubble.y}px` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            <motion.text
              x={bubble.x}
              y={bubble.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] sm:text-xs font-medium fill-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {bubble.percentage.toFixed(0)}%
            </motion.text>
          </motion.g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-2">
        {bubbles.map((item, index) => (
          <motion.div
            key={item.name}
            className={`flex items-center gap-1.5 text-xs transition-opacity ${
              hoveredIndex !== null && hoveredIndex !== index ? "opacity-40" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.05 }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground truncate max-w-[70px]">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <motion.div
          className="absolute top-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm font-medium">{bubbles[hoveredIndex].name}</div>
          <div className="text-xs text-muted-foreground">{bubbles[hoveredIndex].percentage.toFixed(1)}%</div>
        </motion.div>
      )}
    </div>
  )
}
