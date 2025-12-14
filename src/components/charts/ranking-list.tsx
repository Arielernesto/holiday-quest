"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Award } from "lucide-react"

interface RankingListProps {
  data: { name: string; percentage: number; color: string }[]
  showAll?: boolean
}

export function RankingList({ data, showAll = false }: RankingListProps) {
  const displayData = showAll ? data : data.slice(0, 5)

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm text-muted-foreground font-medium">
            {index + 1}
          </span>
        )
    }
  }

  return (
    <div className="space-y-2">
      {displayData.map((item, index) => (
        <motion.div
          key={item.name}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex-shrink-0">{getRankIcon(index)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
              <span className="text-sm text-muted-foreground flex-shrink-0">{item.percentage.toFixed(1)}%</span>
            </div>
            <div className="mt-1 h-1.5 bg-secondary/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
