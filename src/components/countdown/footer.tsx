"use client"

import { motion } from "framer-motion"
import { Snowflake } from "lucide-react"

export function Footer() {
  return (
    <motion.div
      className="flex items-center gap-4 text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Snowflake className="w-5 h-5" />
      </motion.div>
      <span className="text-sm">Hecho con amor por devs, para devs</span>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Snowflake className="w-5 h-5" />
      </motion.div>
    </motion.div>
  )
}

