"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface PieChartProps {
  data: { name: string; percentage: number; color: string }[]
  size?: number
  showLegend?: boolean
}

export function PieChart({ data, size = 200, showLegend = true }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const center = size / 2
  const radius = size * 0.4

  let accumulatedAngle = -90

  const slices = data.map((item, index) => {
    const startAngle = accumulatedAngle
    const sliceAngle = (item.percentage / 100) * 360
    accumulatedAngle += sliceAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = ((startAngle + sliceAngle) * Math.PI) / 180

    const x1 = center + radius * Math.cos(startRad)
    const y1 = center + radius * Math.sin(startRad)
    const x2 = center + radius * Math.cos(endRad)
    const y2 = center + radius * Math.sin(endRad)

    const largeArcFlag = sliceAngle > 180 ? 1 : 0

    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

    return {
      ...item,
      path,
      startAngle,
      sliceAngle,
    }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {slices.map((slice, index) => (
            <motion.path
              key={slice.name}
              d={slice.path}
              fill={slice.color}
              stroke="currentColor"
              strokeWidth={2}
              className="text-background cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: hoveredIndex === index ? 1.05 : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ transformOrigin: `${center}px ${center}px` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </svg>

        {hoveredIndex !== null && (
          <motion.div
            className="absolute bg-card border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none z-10"
            style={{ left: center, top: center, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-sm font-medium text-foreground">{data[hoveredIndex].name}</div>
            <div className="text-xs text-muted-foreground">{data[hoveredIndex].percentage.toFixed(1)}%</div>
          </motion.div>
        )}
      </div>

      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 max-w-[250px]">
          {data.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.name}
              className={`flex items-center gap-1.5 text-xs transition-opacity ${
                hoveredIndex !== null && hoveredIndex !== index ? "opacity-40" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground truncate max-w-[60px]">{item.name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
