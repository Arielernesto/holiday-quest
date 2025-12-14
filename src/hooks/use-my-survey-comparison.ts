import { useState, useEffect } from "react";
import { ALL_RESPONSES_KEY, USER_TOKEN_KEY, calculateSimilarity, getSurveyByToken, type SurveySubmission, QuestResponse } from "@/lib/survey-questions";

interface FieldMatch {
  field: string;
  label: string;
  userValue: string | string[];
  communityTop: { name: string; percentage: number };
  matches: number;
  percentage: number;
  isMatch: boolean;
}

const fieldLabels: Record<string, string> = {
  language: "Lenguaje favorito",
  os: "Sistema operativo",
  editor: "Editor/IDE",
  role: "Rol",
  "work-mode": "Modo de trabajo",
  frameworks: "Frameworks",
  experience: "Experiencia",
  tools: "Herramientas",
  database: "Bases de datos",
  "ai-tools": "Herramientas IA",
  "ai-impact": "Impacto de la IA",
  learning: "Tecnología a aprender",
  challenge: "Mayor desafío",
  wish: "Deseo Tech",
  prediction: "Tendencia 2025",
};

// Helper function to map QuestResponse to the answers format expected by the component
function mapQuestResponseToAnswers(quest: QuestResponse): Record<string, string | string[]> {
  const answers: Record<string, string | string[]> = {};
  for (const key in quest) {
    // Exclude metadata fields and type-incompatible fields
    if (
      key !== "_id" &&
      key !== "sessionId" &&
      key !== "ip" &&
      key !== "userToken" &&
      key !== "submittedAt" &&
      key !== "userAgent" &&
      key !== "__v"
    ) {
      answers[key] = quest[key as keyof QuestResponse] as string | string[];
    }
  }
  return answers;
}

export function useMySurveyComparisonData() {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]> | null>(null);
  const [comparison, setComparison] = useState<{
    totalResponses: number;
    matchPercentage: number;
    fieldMatches: FieldMatch[];
    similarDevs: number;
    topMatches: { name: string; percentage: number; color: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem(USER_TOKEN_KEY);
    if (savedToken) {
      setToken(savedToken);
      loadUserSurvey(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserSurvey = async (searchToken: string) => {
    setLoading(true);
    setError("");
    console.log("Attempting to load survey for token:", searchToken);

    const storedResponses = localStorage.getItem(ALL_RESPONSES_KEY);
    const allResponses: SurveySubmission[] = storedResponses ? JSON.parse(storedResponses) : [];
    console.log("All responses from localStorage:", allResponses);

    try {
      const userSurvey = await getSurveyByToken(searchToken);
      console.log("Raw response from getSurveyByToken:", userSurvey);

      if (userSurvey.success && userSurvey.data) {
        const mappedAnswers = mapQuestResponseToAnswers(userSurvey.data);
        console.log("Mapped user answers:", mappedAnswers);
        setUserAnswers(mappedAnswers);
        calculateComparison(mappedAnswers, allResponses);
      } else {
        setError(userSurvey.message || "No se encontraron datos de encuesta para el token proporcionado.");
        setLoading(false);
        console.error("Error: No survey data found for token.", userSurvey.message);
      }
    } catch (err: any) {
      console.error("Error loading user survey:", err);
      setError(err.message || "Error al cargar la encuesta. Intenta de nuevo.");
      setLoading(false);
    }
  };

  const calculateComparison = (answers: Record<string, string | string[]>, allResponses: SurveySubmission[]) => {
    setUserAnswers(answers);
    const otherResponses = allResponses.filter((r) => JSON.stringify(r.answers) !== JSON.stringify(answers));

    if (otherResponses.length === 0) {
      setComparison({
        totalResponses: 1,
        matchPercentage: 100,
        fieldMatches: [],
        similarDevs: 0,
        topMatches: [],
      });
      setLoading(false);
      return;
    }

    const similarities = otherResponses.map((response) => calculateSimilarity(answers, response.answers));

    // Include all fields from fieldLabels for display, even if user didn't answer
    const allDisplayFields = Object.keys(fieldLabels);
    
    const fieldMatches: FieldMatch[] = allDisplayFields.map((field) => {
      const userValue = answers[field];
      const userArr = userValue ? (Array.isArray(userValue) ? userValue : [userValue]) : [];

      // Count community preferences
      const counts: Record<string, number> = {};
      otherResponses.forEach((r) => {
        const otherValue = (r.answers as any)[field];
        if (!otherValue) return;
        const otherArr = Array.isArray(otherValue) ? otherValue : [otherValue];
        otherArr.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      });

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const top = sorted[0] || ["-", 0]; // Default to '-' if no community responses
      const topPercentage = (top[1] / otherResponses.length) * 100;

      const matches = otherResponses.filter((r) => {
        const otherValue = (r.answers as any)[field];
        if (!otherValue) return false;
        const otherArr = Array.isArray(otherValue) ? otherValue : [otherValue];
        return userArr.some((v) => otherArr.includes(v));
      }).length;

      const isMatch = userArr.length > 0 && userArr.includes(top[0]);

      return {
        field,
        label: fieldLabels[field] || field,
        userValue: userArr.length > 0 ? userArr : "No respondido",
        communityTop: { name: top[0], percentage: topPercentage },
        matches,
        percentage: Math.round((matches / otherResponses.length) * 100),
        isMatch,
      };
    });

    const similarDevs = similarities.filter((s) => s >= 60).length;
    const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length;

    // Top matching categories for visualization
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"];
    const topMatches = fieldMatches
      .filter((f) => f.percentage > 0) // Only include fields with some match for topMatches visualization
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6)
      .map((f, i) => ({
        name: f.label,
        percentage: f.percentage,
        color: colors[i % colors.length],
      }));

    setComparison({
      totalResponses: allResponses.length,
      matchPercentage: Math.round(avgSimilarity),
      fieldMatches,
      similarDevs,
      topMatches,
    });
    setLoading(false);
  };

  const handleSearch = () => {
    if (inputToken.trim()) {
      setToken(inputToken.trim());
      loadUserSurvey(inputToken.trim());
    }
  };

  return { token, setToken, inputToken, setInputToken, userAnswers, comparison, loading, error, handleSearch, loadUserSurvey };
}
