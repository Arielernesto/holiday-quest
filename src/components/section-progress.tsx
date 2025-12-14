"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionProgressProps {
  sections: { id: string; title: string }[]
  currentSection: number
  completedSections: number[]
}

export function SectionProgress({ sections, currentSection, completedSections }: SectionProgressProps) {
  return (
    <div className="mb-6 md:mb-8">
      {/* Desktop/Tablet: horizontal layout */}
      <div className="hidden sm:flex items-center justify-center gap-1 md:gap-2">
        {sections.map((section, index) => {
          const isCompleted = completedSections.includes(index)
          const isCurrent = index === currentSection
          const isPast = index < currentSection

          return (
            <div key={section.id} className="flex items-center">
              <motion.div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-colors relative",
                  isCompleted
                    ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
                    : isCurrent
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-secondary/50 text-muted-foreground border-2 border-border/50",
                )}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                ) : (
                  index + 1
                )}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
              {index < sections.length - 1 && (
                <div
                  className={cn(
                    "w-6 md:w-8 lg:w-12 h-0.5 mx-0.5 md:mx-1",
                    isPast || isCompleted ? "bg-primary/50" : "bg-border/30",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: compact indicator with section name */}
      <div className="flex sm:hidden flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          {sections.map((_, index) => {
            const isCompleted = completedSections.includes(index)
            const isCurrent = index === currentSection

            return (
              <motion.div
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  isCurrent ? "w-8 bg-primary" : isCompleted ? "w-2 bg-green-500" : "w-2 bg-border/50",
                )}
                animate={{ scale: isCurrent ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 1.5, repeat: isCurrent ? Number.POSITIVE_INFINITY : 0 }}
              />
            )
          })}
        </div>
        <span className="text-xs text-muted-foreground">
          {currentSection + 1} / {sections.length}: {sections[currentSection]?.title}
        </span>
      </div>
    </div>
  )
}
