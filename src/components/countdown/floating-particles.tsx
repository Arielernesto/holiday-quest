"use client"

import { motion } from "framer-motion"
import { Snowflake, Star, Sparkles, Gift, Bell, Candy } from "lucide-react"

export function FloatingParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    icon: [Snowflake, Star, Sparkles, Gift, Bell, Candy][i % 6],
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 10,
    size: 12 + Math.random() * 16,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => {
        const Icon = particle.icon
        return (
          <motion.div
            key={particle.id}
            className="absolute text-primary/20"
            style={{ left: `${particle.x}%` }}
            initial={{ y: -50, opacity: 0, rotate: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            <Icon style={{ width: particle.size, height: particle.size }} />
          </motion.div>
        )
      })}
    </div>
  )
}

