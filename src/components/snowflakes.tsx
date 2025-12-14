"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Snowflake, Star, TreePine } from "lucide-react"

interface SnowflakeItem {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  type: "snowflake" | "star" | "tree"
}

export function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([])

  useEffect(() => {
    const types: SnowflakeItem["type"][] = ["snowflake", "star", "tree"]
    const flakes: SnowflakeItem[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      size: 12 + Math.random() * 14,
      type: types[Math.floor(Math.random() * types.length)],
    }))
    setSnowflakes(flakes)
  }, [])

  const renderIcon = (type: SnowflakeItem["type"], size: number) => {
    const props = { size, strokeWidth: 1.5 }
    switch (type) {
      case "star":
        return <Star {...props} />
      case "tree":
        return <TreePine {...props} />
      default:
        return <Snowflake {...props} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-foreground/10"
          style={{
            left: `${flake.x}%`,
            top: -30,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, Math.sin(flake.id) * 30, 0],
            rotate: [0, flake.type === "snowflake" ? 360 : 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {renderIcon(flake.type, flake.size)}
        </motion.div>
      ))}
    </div>
  )
}
