"use client"

import { motion } from "framer-motion"

interface RadarChartProps {
  data: { name: string; percentage: number; color: string }[]
  size?: number
  showLegend?: boolean
}

export function RadarChart({ data, size = 250, showLegend = true }: RadarChartProps) {
  const responsiveSize = typeof window !== "undefined" && window.innerWidth < 640 ? Math.min(size, 200) : size

  const center = responsiveSize / 2
  const maxRadius = responsiveSize * 0.35
  const slicedData = data.slice(0, 6)
  const angleStep = (2 * Math.PI) / slicedData.length

  const points = slicedData
    .map((item, index) => {
      const angle = index * angleStep - Math.PI / 2
      const radius = (item.percentage / 100) * maxRadius
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      return `${x},${y}`
    })
    .join(" ")

  const axes = slicedData.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2
    const x = center + maxRadius * Math.cos(angle)
    const y = center + maxRadius * Math.sin(angle)
    return { x1: center, y1: center, x2: x, y2: y }
  })

  const labels = slicedData.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2
    const labelRadius = maxRadius + 20
    const x = center + labelRadius * Math.cos(angle)
    const y = center + labelRadius * Math.sin(angle)
    return { x, y, name: item.name, percentage: item.percentage }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: responsiveSize, height: responsiveSize }}>
        <svg width={responsiveSize} height={responsiveSize}>
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={maxRadius * scale}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              className="text-border/40"
            />
          ))}

          {axes.map((axis, i) => (
            <line
              key={i}
              x1={axis.x1}
              y1={axis.y1}
              x2={axis.x2}
              y2={axis.y2}
              stroke="currentColor"
              strokeWidth={1}
              className="text-border/40"
            />
          ))}

          <motion.polygon
            points={points}
            fill="currentColor"
            className="text-primary/30"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />

          {slicedData.map((item, index) => {
            const angle = index * angleStep - Math.PI / 2
            const radius = (item.percentage / 100) * maxRadius
            const x = center + radius * Math.cos(angle)
            const y = center + radius * Math.sin(angle)
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r={4}
                fill={item.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              />
            )
          })}
        </svg>

        {labels.map((label, index) => (
          <motion.div
            key={index}
            className="absolute text-center pointer-events-none"
            style={{
              left: label.x,
              top: label.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <div className="text-[9px] sm:text-xs text-foreground/80 font-medium truncate max-w-12 sm:max-w-16">
              {label.name.split("/")[0]}
            </div>
            <div className="text-[8px] sm:text-[10px] text-muted-foreground">{label.percentage.toFixed(0)}%</div>
          </motion.div>
        ))}
      </div>

      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5">
          {slicedData.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex items-center gap-1.5 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground truncate max-w-[50px]">{item.name.split("/")[0]}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
