"use client"

import { motion } from "framer-motion"

interface ProgressRingProps {
  data: { name: string; percentage: number; color: string }[]
  size?: number
}

export function ProgressRing({ data, size = 200 }: ProgressRingProps) {
  const rings = data.slice(0, 4)
  const baseRadius = size * 0.15
  const ringGap = size * 0.08
  const strokeWidth = size * 0.06

  return (
    <div className="relative flex flex-col items-center gap-4">
      <svg width={size} height={size} className="transform -rotate-90">
        {rings.map((item, index) => {
          const radius = baseRadius + index * ringGap
          const circumference = 2 * Math.PI * radius
          const center = size / 2

          return (
            <g key={item.name}>
              {/* Background ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-secondary/30"
              />
              {/* Progress ring */}
              <motion.circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: circumference - (item.percentage / 100) * circumference,
                }}
                transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
              />
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5">
        {rings.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-1.5 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-medium text-foreground">{item.percentage.toFixed(0)}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
