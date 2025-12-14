"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface StackedBarChartProps {
  data: { name: string; percentage: number; color: string }[]
  title?: string
}

export function StackedBarChart({ data, title }: StackedBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const total = data.reduce((sum, item) => sum + item.percentage, 0)

  return (
    <div className="space-y-3">
      {title && <p className="text-xs text-muted-foreground">{title}</p>}

      {/* Stacked bar */}
      <div className="relative h-8 sm:h-10 rounded-lg overflow-hidden bg-secondary/20 flex">
        {data.map((item, index) => {
          const width = (item.percentage / total) * 100
          return (
            <motion.div
              key={item.name}
              className="h-full cursor-pointer relative"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {width > 8 && (
                <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-medium text-white">
                  {item.percentage.toFixed(0)}%
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className={`flex items-center gap-1.5 text-xs transition-opacity ${
              hoveredIndex !== null && hoveredIndex !== index ? "opacity-40" : ""
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground truncate max-w-[80px] sm:max-w-[100px]">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-foreground font-medium">
          {data[hoveredIndex].name}: {data[hoveredIndex].percentage.toFixed(1)}%
        </motion.div>
      )}
    </div>
  )
}
