"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { PartyPopper, Gift, Code2, Zap, Heart } from "lucide-react"

export const MotivationalMessage = memo(function MotivationalMessage() {
  return (
    <motion.div
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div
        className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="flex justify-center gap-2 mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <PartyPopper className="w-6 h-6 text-yellow-500" />
          <Gift className="w-6 h-6 text-primary" />
          <PartyPopper className="w-6 h-6 text-yellow-500" />
        </motion.div>

        <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">Prepara tu codigo de regalo</h3>

        <p className="text-muted-foreground mb-4">
          En Noche Buena revelaremos los resultados de la encuesta de la comunidad dev. Descubre que lenguajes,
          herramientas y tendencias dominan entre los programadores este 2025.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: Code2, text: "Lenguajes favoritos" },
            { icon: Zap, text: "Frameworks populares" },
            { icon: Heart, text: "Herramientas amadas" },
          ].map((item, i) => (
            <motion.span
              key={i}
              className="flex items-center gap-1 text-sm bg-secondary/50 px-3 py-1 rounded-full text-secondary-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.2)" }}
            >
              <item.icon className="w-3 h-3" />
              {item.text}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
})

