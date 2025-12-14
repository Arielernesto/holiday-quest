"use client"

import { motion } from "framer-motion"

interface BarChartProps {
  data: { name: string; percentage: number; color: string }[]
  horizontal?: boolean
  showValues?: boolean
}

export function BarChart({ data, horizontal = true, showValues = true }: BarChartProps) {
  if (horizontal) {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className="space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground/90 truncate max-w-[60%]">{item.name}</span>
              {showValues && <span className="text-muted-foreground font-medium">{item.percentage.toFixed(1)}%</span>}
            </div>
            <div className="h-2.5 bg-secondary/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Vertical bars
  const maxHeight = 120
  return (
    <div className="flex items-end justify-around gap-2 h-40">
      {data.slice(0, 8).map((item, index) => (
        <motion.div
          key={item.name}
          className="flex flex-col items-center gap-2 flex-1 max-w-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="w-full rounded-t-md"
            style={{ backgroundColor: item.color }}
            initial={{ height: 0 }}
            animate={{ height: (item.percentage / 100) * maxHeight }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          />
          <span className="text-xs text-muted-foreground text-center truncate w-full">{item.name.split(" ")[0]}</span>
        </motion.div>
      ))}
    </div>
  )
}
