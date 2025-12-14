"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface TreemapChartProps {
  data: { name: string; percentage: number; color: string }[]
  width?: number
  height?: number
}

interface TreemapItem {
  name: string
  percentage: number
  color: string
  x: number
  y: number
  width: number
  height: number
}

function calculateTreemap(
  data: { name: string; percentage: number; color: string }[],
  width: number,
  height: number,
): TreemapItem[] {
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage)
  const total = sortedData.reduce((sum, item) => sum + item.percentage, 0)
  const items: TreemapItem[] = []

  let currentX = 0
  let currentY = 0
  let remainingWidth = width
  let remainingHeight = height
  let vertical = true

  sortedData.forEach((item) => {
    const ratio = item.percentage / total
    let itemWidth: number
    let itemHeight: number

    if (vertical) {
      itemWidth = remainingWidth * ratio * 2
      itemHeight = remainingHeight
      if (itemWidth > remainingWidth) {
        itemWidth = remainingWidth
        itemHeight = remainingHeight * ratio * 2
      }
    } else {
      itemHeight = remainingHeight * ratio * 2
      itemWidth = remainingWidth
      if (itemHeight > remainingHeight) {
        itemHeight = remainingHeight
        itemWidth = remainingWidth * ratio * 2
      }
    }

    itemWidth = Math.min(itemWidth, remainingWidth)
    itemHeight = Math.min(itemHeight, remainingHeight)

    items.push({
      ...item,
      x: currentX,
      y: currentY,
      width: itemWidth,
      height: itemHeight,
    })

    if (vertical) {
      currentX += itemWidth
      remainingWidth -= itemWidth
      if (remainingWidth < width * 0.1) {
        currentX = 0
        currentY += itemHeight
        remainingWidth = width
        remainingHeight -= itemHeight
        vertical = false
      }
    } else {
      currentY += itemHeight
      remainingHeight -= itemHeight
      if (remainingHeight < height * 0.1) {
        currentY = 0
        currentX += itemWidth
        remainingHeight = height
        remainingWidth -= itemWidth
        vertical = true
      }
    }
  })

  return items
}

export function TreemapChart({ data, width = 400, height = 200 }: TreemapChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const items = calculateTreemap(data.slice(0, 8), width, height)

  return (
    <div className="relative w-full" style={{ aspectRatio: `${width}/${height}` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {items.map((item, index) => (
          <motion.g key={item.name}>
            <motion.rect
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              fill={item.color}
              stroke="currentColor"
              strokeWidth={2}
              className="text-background cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: hoveredIndex === index ? 0.8 : 1,
              }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              style={{ transformOrigin: `${item.x + item.width / 2}px ${item.y + item.height / 2}px` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {item.width > 50 && item.height > 30 && (
              <motion.text
                x={item.x + item.width / 2}
                y={item.y + item.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[10px] sm:text-xs font-medium fill-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.08 }}
              >
                {item.name.length > 8 ? item.name.slice(0, 8) + "..." : item.name}
              </motion.text>
            )}
          </motion.g>
        ))}
      </svg>

      {hoveredIndex !== null && (
        <motion.div
          className="absolute bg-card border border-border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg pointer-events-none z-10"
          style={{
            left: `${((items[hoveredIndex].x + items[hoveredIndex].width / 2) / width) * 100}%`,
            top: `${(items[hoveredIndex].y / height) * 100}%`,
            transform: "translate(-50%, -120%)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-xs sm:text-sm font-medium text-foreground">{data[hoveredIndex].name}</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            {data[hoveredIndex].percentage.toFixed(1)}%
          </div>
        </motion.div>
      )}
    </div>
  )
}
