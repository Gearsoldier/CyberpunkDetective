import { z } from "zod";

export const toolTypes = ["search", "whois", "metadata", "pastebin"] as const;
export type ToolType = typeof toolTypes[number];

export interface Mission {
  id: number;
  title: string;
  brief: string;
  difficulty: "easy" | "medium" | "hard";
  tools: ToolType[];
  solution: Record<string, string>;
  explanation: string;
  unlocked: boolean;
}

export interface ToolResult {
  type: ToolType;
  query: string;
  data: any;
}

export interface MissionProgress {
  missionId: number;
  completed: boolean;
  score?: number;
  attempts: number;
}

export const aiConfigSchema = z.object({
  provider: z.enum(["openai", "huggingface", "custom"]),
  apiKey: z.string().min(1, "API key is required"),
  apiEndpoint: z.string().url("Must be a valid URL"),
  model: z.string().min(1, "Model name is required"),
});

export type AIConfig = z.infer<typeof aiConfigSchema>;

export const reportSubmissionSchema = z.object({
  missionId: z.number(),
  report: z.string().min(10, "Report must be at least 10 characters"),
});

export type ReportSubmission = z.infer<typeof reportSubmissionSchema>;
