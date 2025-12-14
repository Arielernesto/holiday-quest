"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ALL_RESPONSES_KEY, type SurveySubmission } from "@/lib/survey-questions"
import { Snowflakes } from "@/components/snowflakes"
import { LanguageBar } from "@/components/language-bar"
import { StatCard } from "@/components/stat-card"
import { DonutChart } from "@/components/charts/donut-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { RadarChart } from "@/components/charts/radar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { ComparisonCard } from "@/components/charts/comparison-card"
import { RankingList } from "@/components/charts/ranking-list"
import { WordCloud } from "@/components/charts/word-cloud"
import { StackedBarChart } from "@/components/charts/stacked-bar-chart"
import { ProgressRing } from "@/components/charts/progress-ring"
import { BubbleChart } from "@/components/charts/bubble-chart"
import { HorizontalFunnel } from "@/components/charts/horizontal-funner"
import { MySurveyComparison } from "@/components/my-survey-component"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Code,
  Monitor,
  Layers,
  ArrowLeft,
  Clock,
  Sparkles,
  Briefcase,
  Terminal,
  Database,
  BarChart3,
  Brain,
  Target,
  TrendingUp,
} from "lucide-react"

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#a855f7",
]

interface AnalyticsData {
  totalResponses: number
  languageStats: { name: string; percentage: number; color: string }[]
  osStats: { name: string; percentage: number; color: string }[]
  editorStats: { name: string; percentage: number; color: string }[]
  frameworkStats: { name: string; percentage: number; color: string }[]
  experienceStats: { name: string; percentage: number; color: string }[]
  roleStats: { name: string; percentage: number; color: string }[]
  aiToolsStats: { name: string; percentage: number; color: string }[]
  workModeStats: { name: string; percentage: number; color: string }[]
  terminalStats: { name: string; percentage: number; color: string }[]
  databaseStats: { name: string; percentage: number; color: string }[]
  toolsStats: { name: string; percentage: number; color: string }[]
  companySizeStats: { name: string; percentage: number; color: string }[]
  testingStats: { name: string; percentage: number; color: string }[]
  aiImpactStats: { name: string; percentage: number; color: string }[]
}

function calculateStats(
  responses: SurveySubmission[],
  questionId: string,
  isMultiple = false,
): { name: string; percentage: number; color: string }[] {
  if (responses.length === 0) return []

  const counts: Record<string, number> = {}

  responses.forEach((response) => {
    const answer = response.answers[questionId]
    if (!answer) return

    if (isMultiple && Array.isArray(answer)) {
      answer.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1
      })
    } else if (typeof answer === "string") {
      counts[answer] = (counts[answer] || 0) + 1
    }
  })

  const total = isMultiple ? Object.values(counts).reduce((a, b) => a + b, 0) : responses.length

  return Object.entries(counts)
    .map(([name, count], index) => ({
      name,
      percentage: (count / total) * 100,
      color: COLORS[index % COLORS.length],
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 12)
}

function generateDemoResponses(): SurveySubmission[] {
  return [
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "macOS",
        editor: "VS Code",
        experience: "3-5 anos",
        role: "Full Stack Developer",
        "work-mode": "Remoto 100%",
        terminal: "iTerm2",
        frameworks: ["React", "Next.js", "Node.js"],
        "ai-tools": ["GitHub Copilot", "ChatGPT"],
        database: ["PostgreSQL", "Redis"],
        tools: ["Git", "Docker", "AWS"],
        "company-size": "11-50 personas",
        testing: ["Jest", "Cypress"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo1",
    },
    {
      answers: {
        language: "Python",
        os: "Linux (Ubuntu)",
        editor: "VS Code",
        experience: "6-10 anos",
        role: "Backend Developer",
        "work-mode": "Hibrido",
        terminal: "Terminal nativo",
        frameworks: ["Django", "FastAPI"],
        "ai-tools": ["ChatGPT", "Claude"],
        database: ["PostgreSQL", "MongoDB"],
        tools: ["Git", "Docker", "Kubernetes"],
        "company-size": "51-200 personas",
        testing: ["Pytest"],
        "ai-impact": "Reemplazara tareas repetitivas",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo2",
    },
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "Windows",
        editor: "Cursor",
        experience: "1-2 anos",
        role: "Frontend Developer",
        "work-mode": "Presencial",
        terminal: "Windows Terminal",
        frameworks: ["React", "Vue", "Next.js"],
        "ai-tools": ["v0", "GitHub Copilot"],
        database: ["Firebase", "Supabase"],
        tools: ["Git", "Figma", "Postman"],
        "company-size": "2-10 personas",
        testing: ["Vitest", "Testing Library"],
        "ai-impact": "Creare productos con IA",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo3",
    },
    {
      answers: {
        language: "Go",
        os: "Linux (Arch)",
        editor: "Vim/Neovim",
        experience: "Mas de 10 anos",
        role: "DevOps/SRE",
        "work-mode": "Remoto 100%",
        terminal: "Alacritty",
        frameworks: ["Node.js"],
        "ai-tools": ["Ninguna"],
        database: ["PostgreSQL", "Redis", "MongoDB"],
        tools: ["Git", "Docker", "Kubernetes", "AWS"],
        "company-size": "201-1000 personas",
        testing: ["No uso testing"],
        "ai-impact": "No cambiara mucho",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo4",
    },
    {
      answers: {
        language: "Java",
        os: "macOS",
        editor: "IntelliJ IDEA",
        experience: "6-10 anos",
        role: "Backend Developer",
        "work-mode": "Hibrido",
        terminal: "Warp",
        frameworks: ["Spring Boot", ".NET"],
        "ai-tools": ["Amazon CodeWhisperer"],
        database: ["PostgreSQL", "MySQL"],
        tools: ["Git", "Jenkins", "Azure"],
        "company-size": "Mas de 1000",
        testing: ["JUnit"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo5",
    },
    {
      answers: {
        language: "Rust",
        os: "Linux (Fedora)",
        editor: "Zed",
        experience: "3-5 anos",
        role: "Backend Developer",
        "work-mode": "Remoto 100%",
        terminal: "Kitty",
        frameworks: ["Node.js", "React"],
        "ai-tools": ["Claude", "ChatGPT"],
        database: ["SQLite", "PostgreSQL"],
        tools: ["Git", "Docker"],
        "company-size": "2-10 personas",
        testing: ["No uso testing"],
        "ai-impact": "Reemplazara tareas repetitivas",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo6",
    },
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "macOS",
        editor: "VS Code",
        experience: "Menos de 1 ano",
        role: "Estudiante",
        "work-mode": "Desempleado/Buscando",
        terminal: "Terminal nativo",
        frameworks: ["React", "Next.js"],
        "ai-tools": ["ChatGPT", "v0", "GitHub Copilot"],
        database: ["Firebase"],
        tools: ["Git", "Notion"],
        "company-size": "Solo yo",
        testing: ["Jest"],
        "ai-impact": "Creare productos con IA",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo7",
    },
    {
      answers: {
        language: "C#",
        os: "Windows",
        editor: "VS Code",
        experience: "3-5 anos",
        role: "Full Stack Developer",
        "work-mode": "Presencial",
        terminal: "Windows Terminal",
        frameworks: [".NET", "React", "Angular"],
        "ai-tools": ["GitHub Copilot"],
        database: ["MySQL", "MongoDB"],
        tools: ["Git", "Azure", "Jira"],
        "company-size": "51-200 personas",
        testing: ["Jest", "Selenium"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo8",
    },
    {
      answers: {
        language: "Python",
        os: "macOS",
        editor: "PyCharm",
        experience: "3-5 anos",
        role: "Data Engineer/Scientist",
        "work-mode": "Hibrido",
        terminal: "iTerm2",
        frameworks: ["FastAPI", "Django"],
        "ai-tools": ["ChatGPT", "Gemini"],
        database: ["PostgreSQL", "MongoDB", "Redis"],
        tools: ["Git", "Docker", "AWS"],
        "company-size": "11-50 personas",
        testing: ["Pytest"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo9",
    },
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "Linux (Ubuntu)",
        editor: "VS Code",
        experience: "1-2 anos",
        role: "Frontend Developer",
        "work-mode": "Remoto 100%",
        terminal: "Ghostty",
        frameworks: ["React", "Svelte", "Astro"],
        "ai-tools": ["Claude", "v0", "Cursor AI"],
        database: ["Supabase", "Neon"],
        tools: ["Git", "Vercel", "Figma"],
        "company-size": "2-10 personas",
        testing: ["Vitest", "Playwright"],
        "ai-impact": "Creare productos con IA",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo10",
    },
  ]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResponses = localStorage.getItem(ALL_RESPONSES_KEY)
    const responses: SurveySubmission[] = storedResponses ? JSON.parse(storedResponses) : []
    const demoResponses = responses.length > 0 ? responses : generateDemoResponses()

    setData({
      totalResponses: demoResponses.length,
      languageStats: calculateStats(demoResponses, "language"),
      osStats: calculateStats(demoResponses, "os"),
      editorStats: calculateStats(demoResponses, "editor"),
      frameworkStats: calculateStats(demoResponses, "frameworks", true),
      experienceStats: calculateStats(demoResponses, "experience"),
      roleStats: calculateStats(demoResponses, "role"),
      aiToolsStats: calculateStats(demoResponses, "ai-tools", true),
      workModeStats: calculateStats(demoResponses, "work-mode"),
      terminalStats: calculateStats(demoResponses, "terminal"),
      databaseStats: calculateStats(demoResponses, "database", true),
      toolsStats: calculateStats(demoResponses, "tools", true),
      companySizeStats: calculateStats(demoResponses, "company-size"),
      testingStats: calculateStats(demoResponses, "testing", true),
      aiImpactStats: calculateStats(demoResponses, "ai-impact"),
    })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </motion.div>
      </div>
    )
  }

  if (!data) return null

  return (
    <main className="min-h-screen relative">
      <Snowflakes />

      <div className="hidden sm:block fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 pb-12 sm:pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 text-xs sm:text-sm">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Volver
            </Button>
          </Link>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1.5 sm:mb-2 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Resultados de la Comunidad
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Analisis detallado de datos anonimos agregados
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          <StatCard title="Participantes" value={data.totalResponses} icon={Users} delay={0} />
          <StatCard title="Lenguajes" value={data.languageStats.length} subtitle="diferentes" icon={Code} delay={0.1} />
          <StatCard
            title="Frameworks"
            value={data.frameworkStats.length}
            subtitle="populares"
            icon={Layers}
            delay={0.2}
          />
          <StatCard
            title="Herramientas IA"
            value={data.aiToolsStats.length}
            subtitle="en uso"
            icon={Brain}
            delay={0.3}
          />
        </div>

        <Tabs defaultValue="overview" className="mb-6 sm:mb-8">
          <TabsList className="bg-card/60 backdrop-blur-md border border-border/40 p-0.5 sm:p-1 mb-4 sm:mb-6 w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger
              value="my-profile"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
            >
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Mi Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Lenguajes</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Herramientas</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Perfiles</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <ComparisonCard
                title="Lenguaje Top"
                current={data.languageStats[0] || { name: "-", percentage: 0 }}
                icon={<Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                color={data.languageStats[0]?.color}
                delay={0}
              />
              <ComparisonCard
                title="SO Preferido"
                current={data.osStats[0] || { name: "-", percentage: 0 }}
                icon={<Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                color={data.osStats[0]?.color}
                delay={0.1}
              />
              <ComparisonCard
                title="Editor Top"
                current={data.editorStats[0] || { name: "-", percentage: 0 }}
                icon={<Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                color={data.editorStats[0]?.color}
                delay={0.2}
              />
              <ComparisonCard
                title="Framework Top"
                current={data.frameworkStats[0] || { name: "-", percentage: 0 }}
                icon={<Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                color={data.frameworkStats[0]?.color}
                delay={0.3}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Distribucion de Lenguajes
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Visualizacion estilo GitHub</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LanguageBar data={data.languageStats} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Frameworks Populares
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Tecnologias mas usadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StackedBarChart data={data.frameworkStats.slice(0, 8)} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Experiencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <DonutChart data={data.experienceStats} size={180} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Sistemas Operativos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <PieChart data={data.osStats} size={180} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Modo de Trabajo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <DonutChart data={data.workModeStats} size={180} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Card className="bg-card/60 backdrop-blur-md border-border/40">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Impacto de la IA en 2025
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Como creen que afectara su trabajo</CardDescription>
                </CardHeader>
                <CardContent>
                  <HorizontalFunnel data={data.aiImpactStats} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="my-profile" className="space-y-4 sm:space-y-6">
            <MySurveyComparison />
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Ranking de Lenguajes
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Los mas votados por la comunidad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RankingList data={data.languageStats} showAll />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Distribucion Visual
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Proporcion de cada lenguaje</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-2 sm:py-4">
                    <RadarChart data={data.languageStats} size={240} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Popularidad por Lenguaje
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Tamano proporcional al uso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BubbleChart data={data.languageStats} width={380} height={220} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Top 4 Lenguajes
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Anillos de progreso comparativos</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <ProgressRing data={data.languageStats} size={200} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Editores de Codigo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={data.editorStats} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Terminales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={data.terminalStats} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Bases de Datos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RankingList data={data.databaseStats} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Herramientas IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WordCloud data={data.aiToolsStats} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-card/60 backdrop-blur-md border-border/40">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Frameworks y Librerias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BubbleChart data={data.frameworkStats} width={500} height={250} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-card/60 backdrop-blur-md border-border/40">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Herramientas de Testing
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Frameworks y librerias de testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <HorizontalFunnel data={data.testingStats} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RankingList data={data.roleStats} showAll />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Experiencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={data.experienceStats} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Modalidad de Trabajo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <PieChart data={data.workModeStats} size={180} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Sistemas Operativos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <DonutChart data={data.osStats} size={180} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Tamano de Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <DonutChart data={data.companySizeStats} size={180} />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
