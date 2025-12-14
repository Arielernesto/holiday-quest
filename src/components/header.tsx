"use client"

import { motion } from "framer-motion"
import { TreePine, Code2, Snowflake } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 md:py-12 px-4"
    >
      <motion.div
        className="flex justify-center items-center gap-2 sm:gap-4 mb-4 md:mb-6"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
      >
        <TreePine className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-500" />
        <motion.div
          className=""
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
        >
          <Image src="/logo.svg" width={60} height={60} alt="" className="w-6 h-6 sm:w-7 sm:h-7 md:w-12 md:h-12 text-primary-foreground" />
        </motion.div>
        <TreePine className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-500" />
      </motion.div>

      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Encuesta Dev
        </span>{" "}
        <span className="text-foreground block sm:inline">Navidad 2025</span>
      </motion.h1>

      <motion.p
        className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-pretty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Queremos conocerte mejor. Responde esta breve encuesta sobre tus herramientas y preferencias de programacion.
      </motion.p>

      <motion.div
        className="flex justify-center gap-2 sm:gap-3 mt-4 md:mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[Snowflake, Code2, TreePine, Snowflake].map((Icon, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              delay: i * 0.15,
            }}
            className="text-primary/60"
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </motion.span>
        ))}
      </motion.div>
    </motion.header>
  )
}
