"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LanguageBarProps {
  data: { name: string; percentage: number; color: string }[]
  className?: string
}

export function LanguageBar({ data, className }: LanguageBarProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Barra de progreso tipo GitHub */}
      <div className="h-3 rounded-full overflow-hidden flex bg-secondary/50">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className="h-full"
            style={{ backgroundColor: item.color }}
            initial={{ width: 0 }}
            animate={{ width: `${item.percentage}%` }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-foreground/80">{item.name}</span>
            <span className="text-muted-foreground font-medium">{item.percentage.toFixed(1)}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
