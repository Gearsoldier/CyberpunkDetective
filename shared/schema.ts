import { z } from "zod";

export const toolTypes = ["search", "whois", "metadata", "pastebin", "linkedin", "dns", "email", "cert", "breach"] as const;
export type ToolType = typeof toolTypes[number];

export const difficultyLevels = ["beginner", "intermediate", "advanced", "expert"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

export const gameModes = ["beginner", "expert"] as const;
export type GameMode = typeof gameModes[number];

export interface Mission {
  id: number;
  title: string;
  brief: string;
  difficulty: DifficultyLevel;
  tools: ToolType[];
  solution: Record<string, string>;
  explanation: string;
  hints: {
    beginner: string[];
    expert: string[];
  };
  minLevel: number;
  xpReward: number;
  act?: number; // Story act (1-3)
  antagonistId?: string; // Reference to gang member
  narrativeBeat?: string; // Story progression text
  scriptureHint?: string; // Optional biblical reference
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: PlayerProgress) => boolean;
}

export interface PlayerProgress {
  xp: number;
  level: number;
  completedMissions: number[];
  achievements: string[];
  missionScores: Record<number, number>;
  missionAttempts: Record<number, number>;
  totalPlayTime: number;
  mode: GameMode;
  codename?: string;
  introCompleted?: boolean;
  missionTimings: Record<number, number>; // Track time spent on each mission
  theme?: "cyan" | "amber" | "violet";
  completedQuizzes: string[]; // glossary term IDs
  quizScores: Record<string, number>; // term id -> score (0-100)
  dailyStreak: number;
  lastDailyDate?: string; // YYYY-MM-DD format
  completedDailies: string[]; // daily case IDs
  aiInstructor: boolean; // Enable AI-powered grading
}

export interface ToolResult {
  type: ToolType;
  query: string;
  data: any;
}

export interface MissionAttempt {
  missionId: number;
  report: string;
  timeElapsed: number;
  timestamp: number;
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
  mode: z.enum(["beginner", "expert"]),
});

export type ReportSubmission = z.infer<typeof reportSubmissionSchema>;

// XP and Level calculations
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

export function xpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  return xpForLevel(currentLevel + 1);
}

export function calculateMissionXP(baseXP: number, mode: GameMode, score: number): number {
  const modeMultiplier = mode === "expert" ? 1.5 : 1.0;
  const scoreMultiplier = score / 100;
  return Math.floor(baseXP * modeMultiplier * scoreMultiplier);
}
