"use client"

import type React from "react"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ComparisonCardProps {
  title: string
  current: { name: string; percentage: number }
  previous?: { name: string; percentage: number }
  icon?: React.ReactNode
  color?: string
  delay?: number
}

export function ComparisonCard({ title, current, previous, icon, color = "#3b82f6", delay = 0 }: ComparisonCardProps) {
  const trend = previous ? current.percentage - previous.percentage : 0
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus
  const trendColor = trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-muted-foreground"

  return (
    <motion.div
      className="bg-card/60 backdrop-blur-md border border-border/40 rounded-xl p-4 hover:border-primary/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && <span className="text-primary">{icon}</span>}
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <motion.div
            className="text-2xl font-bold text-foreground mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {current.name}
          </motion.div>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-secondary/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${current.percentage}%` }}
                transition={{ duration: 0.8, delay: delay + 0.3 }}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{current.percentage.toFixed(1)}%</span>
          </div>
        </div>

        {previous && (
          <motion.div
            className={`flex items-center gap-1 ${trendColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{Math.abs(trend).toFixed(1)}%</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
