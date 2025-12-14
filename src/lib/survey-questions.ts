// ============================================
// CONFIGURACION DE PREGUNTAS DE LA ENCUESTA
// ============================================
// Ahora organizado por SECCIONES para mejor navegación
// Cada sección agrupa preguntas relacionadas

export type QuestionType = "single" | "multiple" | "text"

export interface SurveyQuestion {
  id: string
  question: string
  type: QuestionType
  options?: string[]
  allowCustom?: boolean
  required?: boolean
}

export interface SurveySection {
  id: string
  title: string
  description: string
  icon: string // nombre del icono de Lucide
  questions: SurveyQuestion[]
}

export const SURVEY_SECTIONS: SurveySection[] = [
  {
    id: "basics",
    title: "Perfil Básico",
    description: "Cuéntanos sobre ti y tu experiencia",
    icon: "User",
    questions: [
      {
        id: "experience",
        question: "¿Cuántos años de experiencia tienes programando?",
        type: "single",
        options: ["Menos de 1 año", "1-2 años", "3-5 años", "6-10 años", "Más de 10 años"],
        required: true,
      },
      {
        id: "role",
        question: "¿Cuál es tu rol principal?",
        type: "single",
        options: [
          "Frontend Developer",
          "Backend Developer",
          "Full Stack Developer",
          "DevOps/SRE",
          "Mobile Developer",
          "Data Engineer/Scientist",
          "Machine Learning Engineer",
          "Tech Lead",
          "Engineering Manager",
          "Estudiante",
        ],
        allowCustom: true,
        required: true,
      },
      {
        id: "work-mode",
        question: "¿Cómo trabajas actualmente?",
        type: "single",
        options: ["Remoto 100%", "Híbrido", "Presencial", "Freelance", "Startup propia", "Desempleado/Buscando"],
        required: true,
      },
      {
        id: "company-size",
        question: "¿Qué tamaño tiene tu empresa/equipo?",
        type: "single",
        options: ["Solo yo", "2-10 personas", "11-50 personas", "51-200 personas", "201-1000 personas", "Más de 1000"],
        required: false,
      },
      {
        id: "salary-satisfaction",
        question: "¿Qué tan satisfecho estás con tu salario actual?",
        type: "single",
        options: ["Muy insatisfecho", "Insatisfecho", "Neutral", "Satisfecho", "Muy satisfecho"],
        required: false,
      },
    ],
  },
  {
    id: "languages",
    title: "Lenguajes y Entorno",
    description: "Tu stack tecnológico favorito",
    icon: "Code",
    questions: [
      {
        id: "language",
        question: "¿Cuál es tu lenguaje de programación favorito?",
        type: "single",
        options: [
          "JavaScript/TypeScript",
          "Python",
          "Java",
          "C#",
          "Go",
          "Rust",
          "PHP",
          "Ruby",
          "C/C++",
          "Kotlin",
          "Swift",
          "Scala",
          "Elixir",
        ],
        allowCustom: true,
        required: true,
      },
      {
        id: "secondary-languages",
        question: "¿Qué otros lenguajes usas frecuentemente?",
        type: "multiple",
        options: [
          "JavaScript",
          "TypeScript",
          "Python",
          "Java",
          "C#",
          "Go",
          "Rust",
          "PHP",
          "Ruby",
          "C/C++",
          "Kotlin",
          "Swift",
          "SQL",
          "Bash/Shell",
        ],
        allowCustom: true,
        required: false,
      },
      {
        id: "os",
        question: "¿Qué sistema operativo usas para programar?",
        type: "single",
        options: ["Windows", "macOS", "Linux (Ubuntu)", "Linux (Fedora)", "Linux (Arch)", "Linux (Otra distro)", "WSL"],
        allowCustom: true,
        required: true,
      },
      {
        id: "editor",
        question: "¿Cuál es tu editor/IDE principal?",
        type: "single",
        options: [
          "VS Code",
          "IntelliJ IDEA",
          "Vim/Neovim",
          "WebStorm",
          "PyCharm",
          "Sublime Text",
          "Eclipse",
          "Cursor",
          "Zed",
          "Windsurf",
        ],
        allowCustom: true,
        required: true,
      },
      {
        id: "terminal",
        question: "¿Qué terminal usas?",
        type: "single",
        options: ["Terminal nativo", "iTerm2", "Windows Terminal", "Warp", "Hyper", "Alacritty", "Kitty", "Ghostty"],
        allowCustom: true,
        required: false,
      },
      {
        id: "keyboard",
        question: "¿Qué tipo de teclado usas?",
        type: "single",
        options: [
          "Teclado de laptop",
          "Mecánico",
          "Membrana",
          "Ergonómico split",
          "Apple Magic Keyboard",
          "Teclado gaming",
        ],
        allowCustom: true,
        required: false,
      },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks y Herramientas",
    description: "Las tecnologías que usas día a día",
    icon: "Layers",
    questions: [
      {
        id: "frameworks",
        question: "¿Qué frameworks/librerías usas frecuentemente?",
        type: "multiple",
        options: [
          "React",
          "Vue",
          "Angular",
          "Svelte",
          "Next.js",
          "Nuxt",
          "Node.js",
          "Django",
          "Spring Boot",
          "Laravel",
          "Flutter",
          "React Native",
          ".NET",
          "Express",
          "FastAPI",
          "NestJS",
          "Astro",
          "Remix",
        ],
        allowCustom: true,
        required: true,
      },
      {
        id: "tools",
        question: "¿Qué herramientas usas en tu día a día?",
        type: "multiple",
        options: [
          "Git",
          "Docker",
          "Kubernetes",
          "GitHub Actions",
          "Jenkins",
          "AWS",
          "Azure",
          "GCP",
          "Vercel",
          "Netlify",
          "Figma",
          "Postman",
          "Notion",
          "Jira",
          "Linear",
          "Slack",
          "Discord",
        ],
        allowCustom: true,
        required: false,
      },
      {
        id: "database",
        question: "¿Qué bases de datos prefieres?",
        type: "multiple",
        options: [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Redis",
          "SQLite",
          "Firebase",
          "Supabase",
          "PlanetScale",
          "DynamoDB",
          "Neon",
          "Turso",
          "CockroachDB",
        ],
        allowCustom: true,
        required: false,
      },
      {
        id: "ai-tools",
        question: "¿Qué herramientas de IA usas para programar?",
        type: "multiple",
        options: [
          "GitHub Copilot",
          "ChatGPT",
          "Claude",
          "v0",
          "Cursor AI",
          "Codeium",
          "Amazon CodeWhisperer",
          "Gemini",
          "Perplexity",
          "Windsurf AI",
          "Ninguna",
        ],
        allowCustom: true,
        required: false,
      },
      {
        id: "testing",
        question: "¿Qué herramientas de testing usas?",
        type: "multiple",
        options: [
          "Jest",
          "Vitest",
          "Cypress",
          "Playwright",
          "Testing Library",
          "Mocha",
          "Pytest",
          "JUnit",
          "Selenium",
          "No uso testing",
        ],
        allowCustom: true,
        required: false,
      },
    ],
  },
  {
    id: "future",
    title: "Futuro y Opiniones",
    description: "Tus planes y deseos tech",
    icon: "Sparkles",
    questions: [
      {
        id: "learning",
        question: "¿Qué tecnología te gustaría aprender en 2025?",
        type: "text",
        required: false,
      },
      {
        id: "challenge",
        question: "¿Cuál es tu mayor desafío como desarrollador?",
        type: "single",
        options: [
          "Mantenerse actualizado",
          "Work-life balance",
          "Encontrar buenos proyectos",
          "Síndrome del impostor",
          "Debugging complejo",
          "Comunicación con equipo",
          "Documentación",
          "Code reviews",
        ],
        allowCustom: true,
        required: false,
      },
      {
        id: "ai-impact",
        question: "¿Cómo crees que la IA impactará tu trabajo en 2025?",
        type: "single",
        options: [
          "Seré más productivo",
          "Reemplazará tareas repetitivas",
          "Me preocupa perder mi trabajo",
          "No cambiará mucho",
          "Creará productos con IA",
          "Aún no lo sé",
        ],
        required: false,
      },
      {
        id: "tech-content",
        question: "¿Dónde consumes contenido tech principalmente?",
        type: "multiple",
        options: [
          "YouTube",
          "Twitter/X",
          "Dev.to",
          "Medium",
          "Hacker News",
          "Reddit",
          "Newsletters",
          "Podcasts",
          "Twitch",
          "LinkedIn",
        ],
        allowCustom: true,
        required: false,
      },
      {
        id: "wish",
        question: "¿Cuál es tu deseo tech para esta Navidad?",
        type: "text",
        required: false,
      },
      {
        id: "prediction",
        question: "¿Qué crees que será tendencia en 2025?",
        type: "text",
        required: false,
      },
    ],
  },
]

// Claves para localStorage
export const STORAGE_KEY = "dev-survey-2024-completed"
export const PROGRESS_KEY = "dev-survey-2024-progress"
export const ALL_RESPONSES_KEY = "dev-survey-2024-all-responses"
export const USER_TOKEN_KEY = "dev-survey-2024-token"

export interface SurveySubmission {
  answers: Record<string, string | string[]>
  submittedAt: string
  userAgent?: string
  sessionId: string
}

export interface SurveyBackendResponse {
  success: boolean
  token?: string
  message?: string
}

export interface SurveyComparison {
  totalResponses: number
  matchPercentage: number
  matchingFields: {
    field: string
    label: string
    matches: number
    percentage: number
  }[]
  similarDevs: number
}

export function generateSurveyToken(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return `DEV-${timestamp}-${random}`.toUpperCase()
}

export function calculateSimilarity(
  userAnswers: Record<string, string | string[]>,
  otherAnswers: Record<string, string | string[]>,
): number {
  const comparableFields = ["language", "os", "editor", "role", "work-mode", "experience"]
  let matches = 0
  let total = 0

  for (const field of comparableFields) {
    if (userAnswers[field] && otherAnswers[field]) {
      total++
      const userValue = Array.isArray(userAnswers[field]) ? userAnswers[field] : [userAnswers[field]]
      const otherValue = Array.isArray(otherAnswers[field]) ? otherAnswers[field] : [otherAnswers[field]]

      // Verificar si hay coincidencia
      if (userValue.some((v) => otherValue.includes(v))) {
        matches++
      }
    }
  }

  // También comparar arrays (frameworks, tools, etc.)
  const arrayFields = ["frameworks", "tools", "database", "ai-tools", "testing"]
  for (const field of arrayFields) {
    if (userAnswers[field] && otherAnswers[field]) {
      const userArr = Array.isArray(userAnswers[field]) ? userAnswers[field] : [userAnswers[field]]
      const otherArr = Array.isArray(otherAnswers[field]) ? otherAnswers[field] : [otherAnswers[field]]

      if (userArr.length > 0 && otherArr.length > 0) {
        total++
        const intersection = userArr.filter((v) => otherArr.includes(v))
        const union = [...new Set([...userArr, ...otherArr])]
        const jaccardSimilarity = intersection.length / union.length
        if (jaccardSimilarity >= 0.3) {
          matches += jaccardSimilarity
        }
      }
    }
  }

  return total > 0 ? (matches / total) * 100 : 0
}

export async function submitSurveyToBackend(data: SurveySubmission): Promise<SurveyBackendResponse> {
  console.log(data)
  return { success: false }
  const BACKEND_URL = "/api/survey"

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Error al enviar encuesta")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error submitting survey:", error)
    return { success: false }
  }
}

export async function getSurveyByToken(token: string): Promise<{ success: boolean; data?: SurveySubmission }> {
  try {
    const response = await fetch(`/api/survey?token=${encodeURIComponent(token)}`)
    if (!response.ok) {
      throw new Error("Error al obtener encuesta")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching survey:", error)
    return { success: false }
  }
}

export async function getComparison(token: string): Promise<{ success: boolean; comparison?: SurveyComparison }> {
  try {
    const response = await fetch(`/api/survey/compare?token=${encodeURIComponent(token)}`)
    if (!response.ok) {
      throw new Error("Error al obtener comparación")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching comparison:", error)
    return { success: false }
  }
}
