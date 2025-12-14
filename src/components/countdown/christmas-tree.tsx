"use client"

import { motion } from "framer-motion"

export function ChristmasTree() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <svg width="120" height="160" viewBox="0 0 120 160" className="md:w-[160px] md:h-[200px]">
        {/* Estrella */}
        <motion.g
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          style={{ transformOrigin: "60px 15px" }}
        >
          <polygon
            points="60,0 65,12 78,12 68,20 72,32 60,24 48,32 52,20 42,12 55,12"
            fill="#eab308"
            className="drop-shadow-lg"
          />
        </motion.g>

        {/* Capas del arbol */}
        <polygon points="60,25 20,70 100,70" fill="#166534" />
        <polygon points="60,50 15,100 105,100" fill="#15803d" />
        <polygon points="60,75 10,135 110,135" fill="#16a34a" />

        {/* Tronco */}
        <rect x="50" y="135" width="20" height="25" fill="#78350f" rx="2" />

        {/* Luces del arbol */}
        {[
          { cx: 40, cy: 60, color: "#ef4444" },
          { cx: 80, cy: 65, color: "#3b82f6" },
          { cx: 35, cy: 90, color: "#eab308" },
          { cx: 85, cy: 85, color: "#ec4899" },
          { cx: 60, cy: 95, color: "#22c55e" },
          { cx: 30, cy: 120, color: "#8b5cf6" },
          { cx: 70, cy: 115, color: "#ef4444" },
          { cx: 90, cy: 125, color: "#3b82f6" },
          { cx: 50, cy: 125, color: "#eab308" },
        ].map((light, i) => (
          <motion.circle
            key={i}
            cx={light.cx}
            cy={light.cy}
            r="4"
            fill={light.color}
            animate={{
              opacity: [0.5, 1, 0.5],
              r: [3, 5, 3],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              filter: `drop-shadow(0 0 6px ${light.color})`,
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

