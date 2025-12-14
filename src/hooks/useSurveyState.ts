"use client"

import { useCallback, useEffect, useState } from "react"
import {
  STORAGE_KEY,
  PROGRESS_KEY,
  USER_TOKEN_KEY,
} from "@/lib/survey-questions"

export function useSurveyState() {
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [savedAnswers, setSavedAnswers] = useState<Record<string, string | string[]>>({})
  const [hasParticipated, setHasParticipated] = useState(false)
  const [userToken, setUserToken] = useState("")
  const [sessionId] = useState(() => crypto.randomUUID())
  // Load persisted state
  useEffect(() => {
    const storedSurvey = localStorage.getItem(STORAGE_KEY)
    if (storedSurvey) {
      try {
        const parsed = JSON.parse(storedSurvey)
        setSavedAnswers(parsed.answers || {})
        setHasParticipated(true)

        const token = localStorage.getItem(USER_TOKEN_KEY)
        if (token) setUserToken(token)
        return
      } catch {}
    }

    const progress = localStorage.getItem(PROGRESS_KEY)
    if (progress) {
      try {
        const parsed = JSON.parse(progress)
        setAnswers(parsed.answers || {})
        setCurrentSection(parsed.currentSection || 0)
      } catch {}
    }
  }, [])

  // Persist progress
  const saveProgress = useCallback(() => {
    if (!hasParticipated) {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ answers, currentSection })
      )
    }
  }, [answers, currentSection, hasParticipated])

  useEffect(() => {
    saveProgress()
  }, [saveProgress])

  return {
    currentSection,
    setCurrentSection,
    answers,
    setAnswers,
    savedAnswers,
    setSavedAnswers,
    hasParticipated,
    setHasParticipated,
    userToken,
    setUserToken,
    sessionId,
  }
}
