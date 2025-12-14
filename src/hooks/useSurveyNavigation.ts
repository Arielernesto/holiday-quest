import { useState } from "react"
import { SURVEY_SECTIONS } from "@/lib/survey-questions"

export function useSurveyNavigation() {
  const [completedSections, setCompletedSections] = useState<number[]>([])

  const isLastSection = (current: number) =>
    current === SURVEY_SECTIONS.length - 1

  return {
    completedSections,
    setCompletedSections,
    isLastSection,
  }
}
