"use client"

import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface CountdownUnitProps {
  value: number
  label: string
  icon: LucideIcon
}

export function CountdownUnit({ value, label, icon: Icon }: CountdownUnitProps) {
  return (
    <motion.div className="relative group" whileHover={{ scale: 1.05, y: -5 }}>
      <motion.div
        className="bg-gradient-to-br from-card via-secondary to-card p-3 md:p-6 rounded-2xl border border-border/50 backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fondo decorativo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="relative z-10">
          <motion.div
            className="flex justify-center mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
          </motion.div>

          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: -20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.8 }}
              className="block text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tabular-nums"
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>

          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1 block">{label}</span>
        </div>

        {/* Brillo en hover */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </motion.div>
    </motion.div>
  )
}

