"use client"

import { Header } from "@/components/header"
import { SurveyForm } from "@/components/survey-form"
import { Snowflakes } from "@/components/snowflakes"
import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IdentifyUser } from "@/lib/utils"




export default function Home() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    IdentifyUser().then((id) => {
      const hasSubmitted = localStorage.getItem("dev-survey-2025-completed")
      if (hasSubmitted) {
        router.replace("/resultados")
      } 
      else {
        setIsChecking(false)
    } 
    })
  }, [router])

  if (isChecking) {
    return (
      <main className="min-h-screen relative flex items-center justify-center">
        <Snowflakes />
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      <Snowflakes />

      {/* Decorative gradients - hidden on mobile for performance */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 pb-12 sm:pb-16">
        <Header />
        <SurveyForm />

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-muted-foreground text-xs sm:text-sm space-y-2 sm:space-y-3">
          <Link href="/resultados" className="inline-flex items-center gap-1.5 sm:gap-2 text-primary hover:underline">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Ver resultados de la comunidad
          </Link>
          <p>Hecho con codigo y cafe por desarrolladores para desarrolladores</p>
          <p className="flex items-center justify-center gap-2">Felices Fiestas 2025</p>
        </footer>
      </div>
    </main>
  )
}
