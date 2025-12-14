"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  delay?: number
}

export function StatCard({ title, value, subtitle, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <Card className="bg-card/60 backdrop-blur-md border-border/40 hover:border-primary/30 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate mr-2">{title}</CardTitle>
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
        </CardHeader>
        <CardContent className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring" }}
          >
            {value}
          </motion.div>
          {subtitle && <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{subtitle}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}
