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
        // Mensajes más específicos según el tipo de pregunta
        if (q.type === "multiple") {
          return `Por favor selecciona al menos una opción: "${q.question}"`
        }
        return `Este campo es obligatorio: "${q.question}"`
      }

      // Validación adicional para campos de texto
      if (q.type === "text" && typeof value === "string" && value.trim().length === 0) {
        return `Por favor responde la pregunta: "${q.question}"`
      }
    }

    return null
  }
}
