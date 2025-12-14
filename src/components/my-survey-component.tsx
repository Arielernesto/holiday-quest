"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Users, Percent, Code, Monitor, Briefcase, Layers, TrendingUp, Target, Award, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ALL_RESPONSES_KEY, USER_TOKEN_KEY, calculateSimilarity, type SurveySubmission } from "@/lib/survey-questions"
import { StackedBarChart } from "./charts/stacked-bar-chart"
import { ProgressRing } from "./charts/progress-ring"

interface FieldMatch {
  field: string
  label: string
  userValue: string | string[]
  communityTop: { name: string; percentage: number }
  matches: number
  percentage: number
  isMatch: boolean
}

const fieldIcons: Record<string, React.ReactNode> = {
  language: <Code className="w-4 h-4" />,
  os: <Monitor className="w-4 h-4" />,
  editor: <Code className="w-4 h-4" />,
  role: <Briefcase className="w-4 h-4" />,
  "work-mode": <Briefcase className="w-4 h-4" />,
  frameworks: <Layers className="w-4 h-4" />,
  experience: <TrendingUp className="w-4 h-4" />,
}

const fieldLabels: Record<string, string> = {
  language: "Lenguaje favorito",
  os: "Sistema operativo",
  editor: "Editor/IDE",
  role: "Rol",
  "work-mode": "Modo de trabajo",
  frameworks: "Frameworks",
  experience: "Experiencia",
  tools: "Herramientas",
  database: "Bases de datos",
  "ai-tools": "Herramientas IA",
}

export function MySurveyComparison() {
  const [token, setToken] = useState("")
  const [inputToken, setInputToken] = useState("")
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]> | null>(null)
  const [comparison, setComparison] = useState<{
    totalResponses: number
    matchPercentage: number
    fieldMatches: FieldMatch[]
    similarDevs: number
    topMatches: { name: string; percentage: number; color: string }[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedToken = localStorage.getItem(USER_TOKEN_KEY)
    if (savedToken) {
      setToken(savedToken)
      loadUserSurvey(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const loadUserSurvey = (searchToken: string) => {
    setLoading(true)
    setError("")

    const storedResponses = localStorage.getItem(ALL_RESPONSES_KEY)
    const allResponses: SurveySubmission[] = storedResponses ? JSON.parse(storedResponses) : []

    // Find user's survey (simplified - in real app would use API)
    const userSurvey = allResponses.find((r) => {
      const savedToken = localStorage.getItem(USER_TOKEN_KEY)
      return savedToken === searchToken
    })

    if (!userSurvey && allResponses.length > 0) {
      // Use first response as demo
      calculateComparison(allResponses[0].answers, allResponses)
    } else if (userSurvey) {
      setUserAnswers(userSurvey.answers)
      calculateComparison(userSurvey.answers, allResponses)
    } else {
      setError("No se encontraron datos de encuesta")
      setLoading(false)
    }
  }

  const calculateComparison = (answers: Record<string, string | string[]>, allResponses: SurveySubmission[]) => {
    setUserAnswers(answers)
    const otherResponses = allResponses.filter((r) => JSON.stringify(r.answers) !== JSON.stringify(answers))

    if (otherResponses.length === 0) {
      setComparison({
        totalResponses: 1,
        matchPercentage: 100,
        fieldMatches: [],
        similarDevs: 0,
        topMatches: [],
      })
      setLoading(false)
      return
    }

    const similarities = otherResponses.map((response) => calculateSimilarity(answers, response.answers))

    const fields = ["language", "os", "editor", "role", "work-mode", "experience", "frameworks", "ai-tools"]
    const fieldMatches: FieldMatch[] = fields.map((field) => {
      const userValue = answers[field]
      if (!userValue) {
        return {
          field,
          label: fieldLabels[field] || field,
          userValue: "",
          communityTop: { name: "-", percentage: 0 },
          matches: 0,
          percentage: 0,
          isMatch: false,
        }
      }

      const userArr = Array.isArray(userValue) ? userValue : [userValue]

      // Count community preferences
      const counts: Record<string, number> = {}
      otherResponses.forEach((r) => {
        const otherValue = r.answers[field]
        if (!otherValue) return
        const otherArr = Array.isArray(otherValue) ? otherValue : [otherValue]
        otherArr.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1
        })
      })

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
      const top = sorted[0] || ["", 0]
      const topPercentage = (top[1] / otherResponses.length) * 100

      const matches = otherResponses.filter((r) => {
        const otherValue = r.answers[field]
        if (!otherValue) return false
        const otherArr = Array.isArray(otherValue) ? otherValue : [otherValue]
        return userArr.some((v) => otherArr.includes(v))
      }).length

      const isMatch = userArr.includes(top[0])

      return {
        field,
        label: fieldLabels[field] || field,
        userValue,
        communityTop: { name: top[0], percentage: topPercentage },
        matches,
        percentage: Math.round((matches / otherResponses.length) * 100),
        isMatch,
      }
    })

    const similarDevs = similarities.filter((s) => s >= 60).length
    const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length

    // Top matching categories for visualization
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"]
    const topMatches = fieldMatches
      .filter((f) => f.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6)
      .map((f, i) => ({
        name: f.label,
        percentage: f.percentage,
        color: colors[i % colors.length],
      }))

    setComparison({
      totalResponses: allResponses.length,
      matchPercentage: Math.round(avgSimilarity),
      fieldMatches,
      similarDevs,
      topMatches,
    })
    setLoading(false)
  }

  const handleSearch = () => {
    if (inputToken.trim()) {
      setToken(inputToken.trim())
      loadUserSurvey(inputToken.trim())
    }
  }

  if (loading) {
    return (
      <Card className="bg-card/60 backdrop-blur-md border-primary/30">
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
          <p className="mt-4 text-sm text-muted-foreground">Cargando tu perfil...</p>
        </CardContent>
      </Card>
    )
  }

  if (!token && !userAnswers) {
    return (
      <Card className="bg-card/60 backdrop-blur-md border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Target className="w-5 h-5 text-primary" />
            Buscar mi Encuesta
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Ingresa tu token para ver como te comparas con la comunidad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="DEV-XXXXXX-XXXXXXXX"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">
            Si no tienes token, completa la encuesta primero para obtener uno.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!comparison) return null

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main comparison card */}
      <Card className="bg-gradient-to-br from-primary/10 via-card/80 to-accent/10 border-primary/30 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Award className="w-5 h-5 text-primary" />
            Tu Perfil vs la Comunidad
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Basado en {comparison.totalResponses} respuestas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main stats row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-xl bg-primary/10 border border-primary/20">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <Percent className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-primary" />
                <p className="text-xl sm:text-2xl font-bold">{comparison.matchPercentage}%</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">similitud</p>
              </motion.div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-accent/10 border border-accent/20">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }}>
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-accent" />
                <p className="text-xl sm:text-2xl font-bold">{comparison.similarDevs}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">devs similares</p>
              </motion.div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.4 }}>
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-green-500" />
                <p className="text-xl sm:text-2xl font-bold">
                  {comparison.fieldMatches.filter((f) => f.isMatch).length}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">en tendencia</p>
              </motion.div>
            </div>
          </div>

          {/* Similarity ring visualization */}
          {comparison.topMatches.length > 0 && (
            <div className="flex justify-center">
              <ProgressRing data={comparison.topMatches} size={180} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed field comparison */}
      <Card className="bg-card/60 backdrop-blur-md border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-base">Comparacion por Campo</CardTitle>
          <CardDescription className="text-xs">Tu respuesta vs la preferencia de la comunidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {comparison.fieldMatches
            .filter((f) => f.userValue)
            .map((field, index) => (
              <motion.div
                key={field.field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2 p-3 rounded-lg bg-secondary/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      {fieldIcons[field.field] || <Code className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm font-medium">{field.label}</span>
                  </div>
                  {field.isMatch && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                      En tendencia
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 rounded bg-primary/10 border border-primary/20">
                    <p className="text-muted-foreground mb-0.5">Tu respuesta</p>
                    <p className="font-medium truncate">
                      {Array.isArray(field.userValue) ? field.userValue.slice(0, 2).join(", ") : field.userValue}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-accent/10 border border-accent/20">
                    <p className="text-muted-foreground mb-0.5">Top comunidad</p>
                    <p className="font-medium truncate">
                      {field.communityTop.name} ({field.communityTop.percentage.toFixed(0)}%)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${field.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        field.isMatch
                          ? "bg-gradient-to-r from-green-500 to-emerald-400"
                          : "bg-gradient-to-r from-primary to-accent"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground w-10 text-right">{field.percentage}%</span>
                </div>
              </motion.div>
            ))}
        </CardContent>
      </Card>

      {/* Stacked bar visualization */}
      {comparison.topMatches.length > 0 && (
        <Card className="bg-card/60 backdrop-blur-md border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">Distribucion de Coincidencias</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedBarChart
              data={comparison.topMatches}
              title="Porcentaje de devs que coinciden contigo en cada categoria"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
