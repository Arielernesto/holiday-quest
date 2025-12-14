"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface HeatmapGridProps {
  data: { name: string; percentage: number; color: string }[]
  columns?: number
}

export function HeatmapGrid({ data, columns = 4 }: HeatmapGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxPercentage = Math.max(...data.map((d) => d.percentage))

  return (
    <div className="relative">
      <div
        className="grid gap-1.5 sm:gap-2"
        style={{
          gridTemplateColumns: `repeat(${Math.min(columns, 2)}, 1fr)`,
        }}
      >
        <style jsx>{`
          @media (min-width: 640px) {
            div {
              grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr) !important;
            }
          }
          @media (min-width: 768px) {
            div {
              grid-template-columns: repeat(${columns}, 1fr) !important;
            }
          }
        `}</style>
        {data.map((item, index) => {
          const intensity = item.percentage / maxPercentage
          return (
            <motion.div
              key={item.name}
              className="relative aspect-square rounded-md sm:rounded-lg cursor-pointer overflow-hidden"
              style={{
                backgroundColor: item.color,
                opacity: 0.3 + intensity * 0.7,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 + intensity * 0.7 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-2">
                <span className="text-white text-[9px] sm:text-xs font-medium text-center truncate">
                  {item.name.split(" ")[0]}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {hoveredIndex !== null && (
        <motion.div
          className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg pointer-events-none z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
            {data[hoveredIndex].name}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground text-center">
            {data[hoveredIndex].percentage.toFixed(1)}%
          </div>
        </motion.div>
      )}
    </div>
  )
}
