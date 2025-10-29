import OpenAI from "openai";

// Using Replit AI Integrations service for OpenAI access
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL ? new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "dummy"
}) : null;

export interface GradingRequest {
  missionTitle: string;
  missionObjective: string;
  expectedAnswer: string;
  userReport: string;
  hints: string[];
}

export interface GradingResponse {
  score: number;
  feedback: string;
  explanation: string;
}

export async function gradeWithAI(request: GradingRequest): Promise<GradingResponse> {
  if (!openai) {
    throw new Error("AI Instructor not configured");
  }

  const prompt = `You are an OSINT (Open Source Intelligence) instructor evaluating a student's investigation report.

Mission: ${request.missionTitle}
Objective: ${request.missionObjective}

Expected Answer: ${request.expectedAnswer}

Student's Report:
${request.userReport}

Evaluate the student's report and provide:
1. A score from 0-100 based on accuracy, completeness, and methodology
2. Constructive feedback on what they did well and what needs improvement
3. A brief explanation of the correct approach

Respond in JSON format:
{
  "score": <number 0-100>,
  "feedback": "<constructive feedback>",
  "explanation": "<correct methodology explanation>"
}`;

  try {
    const response = await openai.chat.completions.create({
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      model: "gpt-5-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const result = JSON.parse(content);
    
    return {
      score: Math.min(100, Math.max(0, result.score || 0)),
      feedback: result.feedback || "Good effort!",
      explanation: result.explanation || "Keep practicing your OSINT skills."
    };
  } catch (error) {
    console.error("AI grading error:", error);
    throw error;
  }
}

export function isAIAvailable(): boolean {
  return !!openai;
}
