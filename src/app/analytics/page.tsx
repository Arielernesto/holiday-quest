"use client"

import { useAnalyticsData } from "@/hooks/use-analytics-data"
import { motion } from "framer-motion"
import Link from "next/link"
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

export default function AnalyticsPage() {
  const { data, loading } = useAnalyticsData()

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

  const { topAiImpactSentiments } = data;

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

            {topAiImpactSentiments.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Card className="bg-card/60 backdrop-blur-md border-border/40">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Principales Sentimientos sobre IA
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">La opinion mas destacada de la comunidad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {topAiImpactSentiments.map((sentiment, index) => (
                        <li key={index} className="flex items-start">
                          <Sparkles className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          <span>{sentiment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
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
