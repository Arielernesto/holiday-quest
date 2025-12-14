"use client"

import { useState, useEffect } from "react"
import {
  useCountdown,
  FloatingParticles,
  ChristmasLights,
  BackgroundStars,
  AnimatedMoon,
  CountdownHeader,
  DecorativeElements,
  CountdownGrid,
  MotivationalMessage,
  CTAButtons,
  Footer,
  BackButton,
} from "@/components/countdown"

// Fecha de Noche Buena 2025
const CHRISTMAS_EVE = new Date("2025-12-24T00:00:00")

export default function ResultadosPage() {
  const timeLeft = useCountdown(CHRISTMAS_EVE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" }) 
    scrollTop()
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Fondo con estrellas */}
      <BackgroundStars />

      {/* Particulas flotantes */}
      <FloatingParticles />

      {/* Luces de navidad */}
      <ChristmasLights />

      {/* Luna */}
      <AnimatedMoon />

      {/* Gradientes decorativos */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">


        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 md:gap-12">
          {/* Encabezado */}
          <CountdownHeader />

          {/* Elementos decorativos */}
          <DecorativeElements />

          {/* Contador */}
          <CountdownGrid timeLeft={timeLeft} />

          {/* Mensaje motivacional */}
          <MotivationalMessage />


          {/* Decoracion inferior */}
          <Footer />
        </div>
      </div>
    </main>
  )
}
