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
  USER_TOKEN_KEY,
  ALL_RESPONSES_KEY,
  STORAGE_KEY,
  PROGRESS_KEY,
  SurveySubmission,
} from "@/lib/survey-questions"
import { useEffect, useState } from "react"
import { IdentifyUser } from "@/lib/utils"
import { initSessionToken } from "@/app/actions"

export function SurveyForm() {
  const survey = useSurveyState()
  const validate = useSurveyValidation(survey.currentSection, survey.answers)
  const nav = useSurveyNavigation()

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string | string[]>[]>([])

  useEffect(() => {
    async function FetchAnswers() {
      const token = await initSessionToken()
      console.log(token)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quest/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      const responses: Record<string, string | string[]>[] = await res.json()
      setAnswers(responses)
    }
  
    FetchAnswers()
  },[])
  
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
      sessionId: await IdentifyUser(),
      userAgent: navigator.userAgent,
    }

    console.log(payload)
    const res = await submitSurveyToBackend(payload)
    const token = res.token
    if (!res.success || !token) {
      // Mostrar errores específicos del backend si están disponibles
      if (res.backendErrors) {
        const errorMessages = Object.entries(res.backendErrors)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('\n')
        setError(`Validación fallida:\n${errorMessages}`)
      } else {
        setError("Hubo un error al enviar tu encuesta. Por favor, intenta de nuevo.")
      }
      setIsSubmitting(false)
      scrollTop()
      return
    }

    survey.setUserToken(token)
    survey.setSavedAnswers(survey.answers)
    survey.setHasParticipated(true)

    localStorage.setItem(USER_TOKEN_KEY, token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    localStorage.removeItem(PROGRESS_KEY)

    const all = JSON.parse(localStorage.getItem(ALL_RESPONSES_KEY) || "[]")
    localStorage.setItem(ALL_RESPONSES_KEY, JSON.stringify([...all, payload]))

    setShowSuccess(true)
    setIsSubmitting(false)
    scrollTop()
  }

  if (survey.hasParticipated && !showSuccess) {
    return <HasParticipated userToken={survey.userToken} />
  }

  if (showSuccess) {
    return <CompletionCelebration token={survey.userToken} answers={answers} />
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
        allResponses={answers}
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
