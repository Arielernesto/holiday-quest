"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronLeft, ChevronRight, Send } from "lucide-react"

import { SectionProgress } from "./section-progress"
import { CompletionCelebration } from "./completion-celebration"
import { HasParticipated } from "./HasParticipated"
import { QuestionForm } from "./question-form"

import { useSurveyState } from "@/hooks/useSurveyState"
import { useSurveyValidation } from "@/hooks/useSurveyValidation"
import { useSurveyNavigation } from "@/hooks/useSurveyNavigation"

import {
  SURVEY_SECTIONS,
  submitSurveyToBackend,
  generateSurveyToken,
  USER_TOKEN_KEY,
  ALL_RESPONSES_KEY,
  STORAGE_KEY,
  PROGRESS_KEY,
} from "@/lib/survey-questions"
import { useState } from "react"

export function SurveyForm() {
  const survey = useSurveyState()
  const validate = useSurveyValidation(survey.currentSection, survey.answers)
  const nav = useSurveyNavigation()

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const next = () => {
    const err = validate()
    if (err) return setError(err)

    if (!nav.completedSections.includes(survey.currentSection)) {
      nav.setCompletedSections((p) => [...p, survey.currentSection])
    }

    survey.setCurrentSection((p) => p + 1)
    setError("")
    scrollTop()
  }

  const submit = async () => {
    const err = validate()
    if (err) return setError(err)

    setIsSubmitting(true)

    const payload = {
      answers: survey.answers,
      submittedAt: new Date().toISOString(),
      sessionId: survey.sessionId,
      userAgent: navigator.userAgent,
    }

    const res = await submitSurveyToBackend(payload)
    const token = res.token || generateSurveyToken()

    survey.setUserToken(token)
    survey.setSavedAnswers(survey.answers)
    survey.setHasParticipated(true)

    localStorage.setItem(USER_TOKEN_KEY, token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    localStorage.removeItem(PROGRESS_KEY)

    const all = JSON.parse(localStorage.getItem(ALL_RESPONSES_KEY) || "[]")
    localStorage.setItem(ALL_RESPONSES_KEY, JSON.stringify([...all, payload]))

    // setShowSuccess(true)
    // setIsSubmitting(false)
    // scrollTop()
  }

  if (survey.hasParticipated && !showSuccess) {
    return <HasParticipated userToken={survey.userToken} />
  }

  if (showSuccess) {
    return <CompletionCelebration token={survey.userToken} answers={survey.savedAnswers} />
  }

  return (
    <motion.div className="max-w-3xl mx-auto">
      <SectionProgress
        sections={SURVEY_SECTIONS}
        currentSection={survey.currentSection}
        completedSections={nav.completedSections}
      />

      <QuestionForm
        currentSection={survey.currentSection}
        answers={survey.answers}
        onAnswerChange={(id, value) => {
          survey.setAnswers((p) => ({ ...p, [id]: value }))
          setError("")
        }}
      />

      <AnimatePresence>
        {error && (
          <motion.div className="mt-4 flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          disabled={survey.currentSection === 0}
          onClick={() => survey.setCurrentSection((p) => p - 1)}
        >
          <ChevronLeft /> Anterior
        </Button>

        {nav.isLastSection(survey.currentSection) ? (
          <Button onClick={submit} disabled={isSubmitting}>
            <Send /> Enviar
          </Button>
        ) : (
          <Button onClick={next}>
            Siguiente <ChevronRight />
          </Button>
        )}
      </div>
    </motion.div>
  )
}
