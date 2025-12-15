"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SurveyQuestionCard } from "./survey-question-card"
import { Sparkles } from "lucide-react"
import { sectionIcons } from "@/lib/helpers"
import { SURVEY_SECTIONS } from "@/lib/survey-questions"

interface Props {
  currentSection: number
  answers: Record<string, string | string[]>
  onAnswerChange: (id: string, value: string | string[]) => void
  allResponses: Record<string, string | string[]>[]
}

export function QuestionForm({
  currentSection,
  answers,
  onAnswerChange,
  allResponses,
}: Props) {
  const section = SURVEY_SECTIONS[currentSection]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="bg-card/60 backdrop-blur-md border-primary/30 mb-6">
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              {sectionIcons[section.icon] || <Sparkles />}
            </div>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {section.questions.map((q, index) => (
            <SurveyQuestionCard
              key={q.id}
              question={q}
              index={index}
              value={answers[q.id] || (q.type === "multiple" ? [] : "")}
              onChange={(value) => onAnswerChange(q.id, value)}
              allResponses={allResponses}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
