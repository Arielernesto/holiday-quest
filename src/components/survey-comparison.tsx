"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Users, Percent, Copy, Check, Code, Monitor, Briefcase, Layers, Sparkles, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ALL_RESPONSES_KEY,
  calculateSimilarity,
  type SurveySubmission,
  type SurveyComparison,
} from "@/lib/survey-questions"

interface SurveyComparisonProps {
  token: string
  userAnswers: Record<string, string | string[]>[]
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

  useEffect(() => {
    calculateLocalComparison()
    console.log(userAnswers)
  }, [userAnswers])

  const calculateLocalComparison = () => {
    // Obtener todas las respuestas del localStorage
    const storedResponses = localStorage.getItem(ALL_RESPONSES_KEY)
    const allResponses: SurveySubmission[] = storedResponses ? JSON.parse(storedResponses) : []

    // Filtrar para no comparar con uno mismo
    const otherResponses = allResponses.filter((r) => JSON.stringify(r) !== JSON.stringify(userAnswers))

    if (otherResponses.length === 0) {
      // Si no hay otras respuestas, mostrar datos simulados
      setComparison({
        totalResponses: 1,
        matchPercentage: 100,
        matchingFields: [],
        similarDevs: 0,
      })
      setLoading(false)
      return
    }

    // Calcular similitud con cada respuesta
    const similarities = otherResponses.map((response) => calculateSimilarity(userAnswers, response))

    // Calcular estadísticas por campo
    const fields = ["language", "os", "editor", "role", "work-mode", "frameworks"]
    const matchingFields = fields.map((field) => {
      const userValue = userAnswers[field]
      if (!userValue) return { field, label: fieldLabels[field] || field, matches: 0, percentage: 0 }

      const userArr = Array.isArray(userValue) ? userValue : [userValue]
      const matches = otherResponses.filter((r) => {
        const otherValue = r[field]
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
    const similarDevs = similarities.filter((s) => s >= 60).length
    const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length

    setComparison({
      totalResponses: allResponses.length,
      matchPercentage: Math.round(avgSimilarity),
      matchingFields,
      similarDevs,
    })
    setLoading(false)
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
      <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/40 overflow-hidden">
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

      {/* Comparison Stats */}
      {comparison && comparison.totalResponses > 1 && (
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
                <h4 className="text-sm font-medium text-muted-foreground">Coincidencias por campo</h4>
                {comparison.matchingFields.map((field, index) => (
                  <motion.div
                    key={field.field}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
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
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* If only one response */}
      {comparison && comparison.totalResponses <= 1 && (
        <Card className="bg-card/60 backdrop-blur-md border-primary/30">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Eres el primero en responder. Comparte la encuesta para ver comparaciones con otros devs.
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
