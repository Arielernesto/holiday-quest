"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { TreePine, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const CTAButtons = memo(function CTAButtons() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Link href="/">
        <Button size="lg" className="gap-2 group">
          <TreePine className="w-5 h-5 group-hover:animate-bounce" />
          Participar en la encuesta
        </Button>
      </Link>
      <Link href="/analytics">
        <Button size="lg" variant="outline" className="gap-2 bg-transparent">
          <Sparkles className="w-5 h-5" />
          Ver datos de prueba
        </Button>
      </Link>
    </motion.div>
  )
})

