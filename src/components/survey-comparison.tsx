"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Users, Percent, Copy, Check, Code, Monitor, Briefcase, Layers, Sparkles, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  calculateSimilarity,
  type SurveySubmission,
  type SurveyComparison,
} from "@/lib/survey-questions"
import { initSessionToken } from "@/app/actions"

interface SurveyComparisonProps {
  token: string
  userAnswers: Record<string, string | string[]> | Record<string, string | string[]>[]
}

const fieldIcons: Record<string, React.ReactNode> = {
  language: <Code className="w-4 h-4" />,
  os: <Monitor className="w-4 h-4" />,
  editor: <Code className="w-4 h-4" />,
  role: <Briefcase className="w-4 h-4" />,
  "work-mode": <Briefcase className="w-4 h-4" />,
  frameworks: <Layers className="w-4 h-4" />,
  tools: <Layers className="w-4 h-4" />,
  database: <Layers className="w-4 h-4" />,
}

const fieldLabels: Record<string, string> = {
  language: "Lenguaje favorito",
  os: "Sistema operativo",
  editor: "Editor/IDE",
  role: "Rol",
  "work-mode": "Modo de trabajo",
  frameworks: "Frameworks",
  tools: "Herramientas",
  database: "Bases de datos",
}

export function SurveyComparisonCard({ token, userAnswers }: SurveyComparisonProps) {
  const [copied, setCopied] = useState(false)
  const [comparison, setComparison] = useState<SurveyComparison | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFirstResponse, setIsFirstResponse] = useState(false)

  // Normalizar userAnswers para que siempre sea un objeto
  const normalizedUserAnswers = Array.isArray(userAnswers) 
    ? (userAnswers.length > 0 ? userAnswers[0] : {})
    : userAnswers

  useEffect(() => {
    calculateBackendComparison()
  }, [normalizedUserAnswers])

  const calculateBackendComparison = async () => {
    try {
      // Obtener todas las respuestas del backend
      const jwtToken = await initSessionToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quest/all`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      })

      if (!response.ok) {
        throw new Error("No se pudieron cargar las respuestas")
      }

      const allResponses = await response.json()

      // Si hay solo una respuesta (la del usuario actual), es el primero
      if (allResponses.length <= 1) {
        setIsFirstResponse(true)
        setComparison({
          totalResponses: 1,
          matchPercentage: 100,
          matchingFields: [],
          similarDevs: 0,
        })
        setLoading(false)
        return
      }

      // Filtrar respuestas de otros usuarios (excluir la actual)
      const otherResponses = allResponses.filter((r: any) => {
        const rAnswers = r.answers || r
        return JSON.stringify(rAnswers) !== JSON.stringify(normalizedUserAnswers)
      })

      if (otherResponses.length === 0) {
        setIsFirstResponse(true)
        setComparison({
          totalResponses: 1,
          matchPercentage: 100,
          matchingFields: [],
          similarDevs: 0,
        })
        setLoading(false)
        return
      }

      setIsFirstResponse(false)

      // Calcular similitud con cada respuesta
      const similarities = otherResponses.map((response: any) => {
        const otherAnswers = response.answers || response
        return calculateSimilarity(normalizedUserAnswers, otherAnswers)
      })

      // Calcular estadísticas por campo
      const fields = ["language", "os", "editor", "role", "work-mode", "frameworks"]
      const matchingFields = fields.map((field) => {
        const userValue = normalizedUserAnswers[field as keyof typeof normalizedUserAnswers]
        if (!userValue) return { field, label: fieldLabels[field] || field, matches: 0, percentage: 0 }

        const userArr = Array.isArray(userValue) ? userValue : [userValue]
        const matches = otherResponses.filter((r: any) => {
          const otherAnswers = r.answers || r
          const otherValue = otherAnswers[field]
          if (!otherValue) return false
          const otherArr = Array.isArray(otherValue) ? otherValue : [otherValue]
          return userArr.some((v) => otherArr.includes(v))
        }).length

        return {
          field,
          label: fieldLabels[field] || field,
          matches,
          percentage: Math.round((matches / otherResponses.length) * 100),
        }
      })

      // Contar devs muy similares (>60% de coincidencia)
      const similarDevs = similarities.filter((s: number) => s >= 60).length
      const avgSimilarity = similarities.reduce((a: number, b: number) => a + b, 0) / similarities.length

      setComparison({
        totalResponses: allResponses.length,
        matchPercentage: Math.round(avgSimilarity),
        matchingFields,
        similarDevs,
      })
      setLoading(false)
    } catch (error) {
      console.error("Error calculating comparison:", error)
      setComparison({
        totalResponses: 1,
        matchPercentage: 100,
        matchingFields: [],
        similarDevs: 0,
      })
      setLoading(false)
    }
  }

  const copyToken = async () => {
    await navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <Card className="bg-card/60 backdrop-blur-md border-primary/30">
        <CardContent className="p-6 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
            className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full"
          />
          <p className="mt-4 text-sm text-muted-foreground">Analizando resultados...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Token Card */}
      <Card className="bg-linear-to-br from-primary/20 to-accent/20 border-primary/40 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Tu Token Personal</h3>
              <p className="text-xs text-muted-foreground">Guardalo para consultar tu encuesta</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-primary/30">
            <code className="flex-1 text-xs sm:text-sm font-mono text-primary break-all">{token}</code>
            <Button size="sm" variant="ghost" onClick={copyToken} className="shrink-0">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* If only one response */}
      {isFirstResponse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-linear-to-br from-primary/20 via-accent/10 to-primary/20 border-primary/40 overflow-hidden">
            <CardContent className="p-6 sm:p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold mb-3 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                ¡Eres el primero en responder!
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Sé pionero en la comunidad dev de 2025. Comparte esta encuesta con otros desarrolladores para ver comparaciones y descubrir qué tienen en común.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6 mb-6">
                <div className="bg-background/50 rounded-lg p-3 border border-primary/20">
                  <div className="text-2xl font-bold text-primary">1</div>
                  <div className="text-xs text-muted-foreground">Respuesta enviada</div>
                </div>
                <div className="bg-background/50 rounded-lg p-3 border border-accent/20">
                  <div className="text-2xl font-bold text-accent">∞</div>
                  <div className="text-xs text-muted-foreground">Posibilidades</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                📱 Comparte tu token o la encuesta en tu comunidad favorita:
              </p>

              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToken}
                  className="text-xs sm:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copiar Token
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Comparison Stats - Only show if NOT first response */}
      {!isFirstResponse && comparison && comparison.totalResponses > 1 && (
        <Card className="bg-card/60 backdrop-blur-md border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Devs como tu
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {/* Main percentage */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="relative inline-flex items-center justify-center"
              >
                <svg className="w-28 h-28 sm:w-36 sm:h-36" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted/30"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 45 * (1 - comparison.matchPercentage / 100),
                    }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-2xl sm:text-3xl font-bold"
                  >
                    {comparison.matchPercentage}%
                  </motion.span>
                  <span className="text-xs text-muted-foreground">similitud</span>
                </div>
              </motion.div>
              <p className="text-sm text-muted-foreground mt-2">promedio con la comunidad</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-lg sm:text-xl font-bold">{comparison.totalResponses}</p>
                <p className="text-xs text-muted-foreground">respuestas</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
                <Percent className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="text-lg sm:text-xl font-bold">{comparison.similarDevs}</p>
                <p className="text-xs text-muted-foreground">devs similares</p>
              </div>
            </div>

            {/* Field breakdown */}
            {comparison.matchingFields.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Campos con coincidencias</h4>
                {comparison.matchingFields.map((field, index) => (
                  <motion.div
                    key={field.field}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
                      {fieldIcons[field.field] || <Code className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs sm:text-sm truncate">{field.label}</span>
                        <span className="text-xs font-medium text-primary">{field.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${field.percentage}%` }}
                          transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                          className="h-full bg-linear-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}    </motion.div>
  )
}