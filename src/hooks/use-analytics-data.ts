import { useEffect, useState } from "react";
import { ALL_RESPONSES_KEY, type SurveySubmission } from "@/lib/survey-questions";
import { initSessionToken } from "@/app/actions";

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#a855f7",
];

interface AnalyticsData {
  totalResponses: number;
  languageStats: { name: string; percentage: number; color: string }[];
  osStats: { name: string; percentage: number; color: string }[];
  editorStats: { name: string; percentage: number; color: string }[];
  frameworkStats: { name: string; percentage: number; color: string }[];
  experienceStats: { name: string; percentage: number; color: string }[];
  roleStats: { name: string; percentage: number; color: string }[];
  aiToolsStats: { name: string; percentage: number; color: string }[];
  workModeStats: { name: string; percentage: number; color: string }[];
  terminalStats: { name: string; percentage: number; color: string }[];
  databaseStats: { name: string; percentage: number; color: string }[];
  toolsStats: { name: string; percentage: number; color: string }[];
  companySizeStats: { name: string; percentage: number; color: string }[];
  testingStats: { name: string; percentage: number; color: string }[];
  aiImpactStats: { name: string; percentage: number; color: string }[];
  topAiImpactSentiments: string[];
}

function calculateStats(
  responses: SurveySubmission[],
  questionId: string,
  isMultiple = false,
): { name: string; percentage: number; color: string }[] {
  if (responses.length === 0) return [];

  const counts: Record<string, number> = {};

  responses.forEach((response) => {
    const answer = (response as any)[questionId]; // Using 'any' for now, will refactor types later if needed
    if (!answer) return;

    if (isMultiple && Array.isArray(answer)) {
      answer.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    } else if (typeof answer === "string") {
      counts[answer] = (counts[answer] || 0) + 1;
    }
  });

  const total = isMultiple ? Object.values(counts).reduce((a, b) => a + b, 0) : responses.length;

  return Object.entries(counts)
    .map(([name, count], index) => ({
      name,
      percentage: (count / total) * 100,
      color: COLORS[index % COLORS.length],
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 12);
}

function generateDemoResponses(): SurveySubmission[] {
    return [
      {
        answers: {
          language: "JavaScript/TypeScript",
          os: "macOS",
          editor: "VS Code",
          experience: "3-5 anos",
          role: "Full Stack Developer",
          "work-mode": "Remoto 100%",
          terminal: "iTerm2",
          frameworks: ["React", "Next.js", "Node.js"],
          "ai-tools": ["GitHub Copilot", "ChatGPT"],
          database: ["PostgreSQL", "Redis"],
          tools: ["Git", "Docker", "AWS"],
          "company-size": "11-50 personas",
          testing: ["Jest", "Cypress"],
          "ai-impact": "Sere mas productivo",
        },
        submittedAt: new Date().toISOString(),
        sessionId: "demo1",
      },
      {
        answers: {
          language: "Python",
          os: "Linux (Ubuntu)",
          editor: "VS Code",
          experience: "6-10 anos",
          role: "Backend Developer",
          "work-mode": "Hibrido",
          terminal: "Terminal nativo",
          frameworks: ["Django", "FastAPI"],
          "ai-tools": ["ChatGPT", "Claude"],
        database: ["PostgreSQL", "MongoDB"],
        tools: ["Git", "Docker", "Kubernetes"],
        "company-size": "51-200 personas",
        testing: ["Pytest"],
        "ai-impact": "Reemplazara tareas repetitivas",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo2",
    },
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "Windows",
        editor: "Cursor",
        experience: "1-2 anos",
        role: "Frontend Developer",
        "work-mode": "Presencial",
        terminal: "Windows Terminal",
        frameworks: ["React", "Vue", "Next.js"],
        "ai-tools": ["v0", "GitHub Copilot"],
        database: ["Firebase", "Supabase"],
        tools: ["Git", "Figma", "Postman"],
        "company-size": "2-10 personas",
        testing: ["Vitest", "Testing Library"],
        "ai-impact": "Creare productos con IA",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo3",
    },
    {
      answers: {
        language: "Go",
        os: "Linux (Arch)",
        editor: "Vim/Neovim",
        experience: "Mas de 10 anos",
        role: "DevOps/SRE",
        "work-mode": "Remoto 100%",
        terminal: "Alacritty",
        frameworks: ["Node.js"],
        "ai-tools": ["Ninguna"],
        database: ["PostgreSQL", "Redis", "MongoDB"],
        tools: ["Git", "Docker", "Kubernetes", "AWS"],
        "company-size": "201-1000 personas",
        testing: ["No uso testing"],
        "ai-impact": "No cambiara mucho",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo4",
    },
    {
      answers: {
        language: "Java",
        os: "macOS",
        editor: "IntelliJ IDEA",
        experience: "6-10 anos",
        role: "Backend Developer",
        "work-mode": "Hibrido",
        terminal: "Warp",
        frameworks: ["Spring Boot", ".NET"],
        "ai-tools": ["Amazon CodeWhisperer"],
        database: ["PostgreSQL", "MySQL"],
        tools: ["Git", "Jenkins", "Azure"],
        "company-size": "Mas de 1000",
        testing: ["JUnit"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo5",
    },
    {
      answers: {
        language: "Rust",
        os: "Linux (Fedora)",
        editor: "Zed",
        experience: "3-5 anos",
        role: "Backend Developer",
        "work-mode": "Remoto 100%",
        terminal: "Kitty",
        frameworks: ["Node.js", "React"],
        "ai-tools": ["Claude", "ChatGPT"],
        database: ["SQLite", "PostgreSQL"],
        tools: ["Git", "Docker"],
        "company-size": "2-10 personas",
        testing: ["No uso testing"],
        "ai-impact": "Reemplazara tareas repetitivas",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo6",
    },
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "macOS",
        editor: "VS Code",
        experience: "Menos de 1 ano",
        role: "Estudiante",
        "work-mode": "Desempleado/Buscando",
        terminal: "Terminal nativo",
        frameworks: ["React", "Next.js"],
        "ai-tools": ["ChatGPT", "v0", "GitHub Copilot"],
        database: ["Firebase"],
        tools: ["Git", "Notion"],
        "company-size": "Solo yo",
        testing: ["Jest"],
        "ai-impact": "Creare productos con IA",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo7",
    },
    {
      answers: {
        language: "C#",
        os: "Windows",
        editor: "VS Code",
        experience: "3-5 anos",
        role: "Full Stack Developer",
        "work-mode": "Presencial",
        terminal: "Windows Terminal",
        frameworks: [".NET", "React", "Angular"],
        "ai-tools": ["GitHub Copilot"],
        database: ["MySQL", "MongoDB"],
        tools: ["Git", "Azure", "Jira"],
        "company-size": "51-200 personas",
        testing: ["Jest", "Selenium"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo8",
    },
    {
      answers: {
        language: "Python",
        os: "macOS",
        editor: "PyCharm",
        experience: "3-5 anos",
        role: "Data Engineer/Scientist",
        "work-mode": "Hibrido",
        terminal: "iTerm2",
        frameworks: ["FastAPI", "Django"],
        "ai-tools": ["ChatGPT", "Gemini"],
        database: ["PostgreSQL", "MongoDB", "Redis"],
        tools: ["Git", "Docker", "AWS"],
        "company-size": "11-50 personas",
        testing: ["Pytest"],
        "ai-impact": "Sere mas productivo",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo9",
    },
    {
      answers: {
        language: "JavaScript/TypeScript",
        os: "Linux (Ubuntu)",
        editor: "VS Code",
        experience: "1-2 anos",
        role: "Frontend Developer",
        "work-mode": "Remoto 100%",
        terminal: "Ghostty",
        frameworks: ["React", "Svelte", "Astro"],
        "ai-tools": ["Claude", "v0", "Cursor AI"],
        database: ["Supabase", "Neon"],
        tools: ["Git", "Vercel", "Figma"],
        "company-size": "2-10 personas",
        testing: ["Vitest", "Playwright"],
        "ai-impact": "Creare productos con IA",
      },
      submittedAt: new Date().toISOString(),
      sessionId: "demo10",
    },
  ];
}

function getTopAiImpactSentiments(stats: { name: string; percentage: number; color: string }[], count: number = 3): string[] {
  return stats
    .filter(s => s.percentage > 0)
    .slice(0, count)
    .map((s) => `${s.name} (${s.percentage.toFixed(1)}%)`);
}

export function useAnalyticsData() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await initSessionToken()
        console.log(token)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quest/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const responses: SurveySubmission[] = await res.json();

        const demoResponses = responses.length > 0 ? responses : generateDemoResponses();
        const aiImpactStats = calculateStats(demoResponses, "ai_impact");

        setData({
          totalResponses: demoResponses.length,
          languageStats: calculateStats(demoResponses, "language"),
          osStats: calculateStats(demoResponses, "os"),
          editorStats: calculateStats(demoResponses, "editor"),
          frameworkStats: calculateStats(demoResponses, "frameworks", true),
          experienceStats: calculateStats(demoResponses, "experience"),
          roleStats: calculateStats(demoResponses, "role"),
          aiToolsStats: calculateStats(demoResponses, "ai_tools", true),
          workModeStats: calculateStats(demoResponses, "work_mode"),
          terminalStats: calculateStats(demoResponses, "terminal"),
          databaseStats: calculateStats(demoResponses, "database", true),
          toolsStats: calculateStats(demoResponses, "tools", true),
          companySizeStats: calculateStats(demoResponses, "company_size"),
          testingStats: calculateStats(demoResponses, "testing", true),
          aiImpactStats,
          topAiImpactSentiments: getTopAiImpactSentiments(aiImpactStats),
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { data, loading };
}