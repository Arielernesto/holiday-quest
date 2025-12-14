"use client"

import { motion } from "framer-motion"

interface HorizontalFunnelProps {
  data: { name: string; percentage: number; color: string }[]
}

export function HorizontalFunnel({ data }: HorizontalFunnelProps) {
  const maxPercentage = Math.max(...data.map((d) => d.percentage))

  return (
    <div className="space-y-2">
      {data.slice(0, 6).map((item, index) => {
        const width = (item.percentage / maxPercentage) * 100
        return (
          <motion.div
            key={item.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-20 sm:w-24 text-xs text-muted-foreground truncate text-right">{item.name}</div>
            <div className="flex-1 h-6 sm:h-7 bg-secondary/20 rounded-r-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-r-full flex items-center justify-end pr-2"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <span className="text-[10px] sm:text-xs font-medium text-white">{item.percentage.toFixed(1)}%</span>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
