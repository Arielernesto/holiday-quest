"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Gift, PartyPopper, Sparkles, Star, TreePine, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SurveyComparisonCard } from "./survey-comparison"

interface CompletionCelebrationProps {
  token: string
  answers: Record<string, string | string[]>
}

export function CompletionCelebration({ token, answers }: CompletionCelebrationProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; icon: string; color: string; delay: number }[]
  >([])

  useEffect(() => {
    const icons = ["star", "sparkle", "gift", "tree", "heart"]
    const colors = ["text-primary", "text-yellow-400", "text-green-400", "text-blue-400", "text-pink-400"]
    const particleCount = typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 40
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }))
    setParticles(newParticles)
  }, [])

  const renderIcon = (icon: string) => {
    const props = { className: "w-full h-full" }
    switch (icon) {
      case "star":
        return <Star {...props} />
      case "sparkle":
        return <Sparkles {...props} />
      case "gift":
        return <Gift {...props} />
      case "tree":
        return <TreePine {...props} />
      case "heart":
        return <Heart {...props} />
      default:
        return <Star {...props} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-sm sm:max-w-lg md:max-w-2xl mx-auto relative px-2 sm:px-0"
    >
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-4 h-4 sm:w-6 sm:h-6 ${particle.color}`}
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              repeat: 2,
              repeatDelay: 1,
            }}
          >
            {renderIcon(particle.icon)}
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/80 backdrop-blur-xl border-primary/40 overflow-hidden relative mb-4">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />

        <CardContent className="p-6 sm:p-8 md:p-10 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="relative mx-auto mb-6 sm:mb-8"
          >
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220,38,38,0.3)",
                  "0 0 60px rgba(220,38,38,0.6)",
                  "0 0 20px rgba(220,38,38,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary-foreground" />
            </motion.div>

            {/* Orbiting stars */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.75,
                }}
              >
                <motion.div
                  style={{
                    transform: `translateX(50px)`,
                  }}
                  className="sm:translate-x-[60px]"
                >
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent"
          >
            Gracias por participar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8"
          >
            Tu opinion es muy valiosa para la comunidad dev.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Felices fiestas y happy coding
          </motion.p>

          <motion.div
            className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[Gift, TreePine, Star, Sparkles, Heart].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="text-primary/70"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <Link href="/analytics">
              <Button
                size="default"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Ver Resultados
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>

      <SurveyComparisonCard token={token} userAnswers={answers} />
    </motion.div>
  )
}
