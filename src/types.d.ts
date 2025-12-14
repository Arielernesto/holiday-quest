export interface QuestResponse {
  _id: string;
  sessionId: string;
  ip?: string;
  userToken?: string;
  submittedAt: string; // ISO string
  userAgent: string;
  experience: string;
  role: string;
  work_mode: string;
  company_size: string;
  salary_satisfaction: string;
  language: string;
  secondary_languages: string[];
  os: string;
  editor: string;
  terminal: string;
  keyboard: string;
  frameworks: string[];
  tools: string[];
  database: string[];
  ai_tools: string[];
  testing: string[];
  learning: string;
  challenge: string;
  ai_impact: string;
  tech_content: string[];
  wish: string;
  prediction: string;
  __v?: number; // Mongoose version key
}