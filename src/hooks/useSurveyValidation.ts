import { SURVEY_SECTIONS } from "@/lib/survey-questions"

export function useSurveyValidation(
  currentSection: number,
  answers: Record<string, string | string[]>
) {
  return () => {
    const section = SURVEY_SECTIONS[currentSection]

    for (const q of section.questions) {
      if (!q.required) continue

      const value = answers[q.id]
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return `Por favor responde: "${q.question}"`
      }
    }

    return null
  }
}
