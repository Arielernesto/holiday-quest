"use client"

import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BackButton() {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Link href="/">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4" />
          Volver a la encuesta
        </Button>
      </Link>
    </motion.div>
  )
}

