"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface DonutChartProps {
  data: { name: string; percentage: number; color: string }[]
  size?: number
  thickness?: number
  showLegend?: boolean
}

export function DonutChart({ data, size = 200, thickness = 40, showLegend = true }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const responsiveSize = typeof window !== "undefined" && window.innerWidth < 640 ? Math.min(size, 160) : size
  const responsiveThickness =
    typeof window !== "undefined" && window.innerWidth < 640 ? Math.min(thickness, 30) : thickness

  const radius = (responsiveSize - responsiveThickness) / 2
  const circumference = 2 * Math.PI * radius
  const center = responsiveSize / 2

  let accumulatedPercentage = 0

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: responsiveSize, height: responsiveSize }}>
        <svg width={responsiveSize} height={responsiveSize} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={responsiveThickness}
            className="text-secondary/30"
          />
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
            const strokeDashoffset = -(accumulatedPercentage / 100) * circumference
            accumulatedPercentage += item.percentage

            return (
              <motion.circle
                key={item.name}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={hoveredIndex === index ? responsiveThickness + 4 : responsiveThickness}
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
                className="cursor-pointer transition-all"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {hoveredIndex !== null ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <span className="text-lg sm:text-xl font-bold text-foreground">
                {data[hoveredIndex].percentage.toFixed(1)}%
              </span>
              <p className="text-[10px] sm:text-xs text-muted-foreground max-w-[80px] truncate">
                {data[hoveredIndex].name}
              </p>
            </motion.div>
          ) : (
            <>
              <motion.span
                className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {data.length}
              </motion.span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">opciones</span>
            </>
          )}
        </div>
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
              transition={{ delay: 0.8 + index * 0.05 }}
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground truncate max-w-[60px]">{item.name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
