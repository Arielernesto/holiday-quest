"use client"

import { motion } from "framer-motion"
import { Clock, CalendarDays, Sun, Zap } from "lucide-react"
import { CountdownUnit } from "./countdown-unit"

interface CountdownGridProps {
  timeLeft: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

export function CountdownGrid({ timeLeft }: CountdownGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-3xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <CountdownUnit value={timeLeft.days} label="Dias" icon={CalendarDays} />
      <CountdownUnit value={timeLeft.hours} label="Horas" icon={Sun} />
      <CountdownUnit value={timeLeft.minutes} label="Minutos" icon={Clock} />
      <CountdownUnit value={timeLeft.seconds} label="Segundos" icon={Zap} />
    </motion.div>
  )
}

