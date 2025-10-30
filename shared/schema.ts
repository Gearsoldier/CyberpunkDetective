import { z } from "zod";
import { pgTable, serial, varchar, integer, boolean, timestamp, json, text, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

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
  act?: number;
  antagonistId?: string;
  narrativeBeat?: string;
  scriptureHint?: string;
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
  missionTimings: Record<number, number>;
  theme?: "cyan" | "amber" | "violet";
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  dailyStreak: number;
  lastDailyDate?: string;
  completedDailies: string[];
  aiInstructor: boolean;
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

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
  usernameIdx: index("username_idx").on(table.username),
}));

export const playerProgress = pgTable("player_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  completedMissions: json("completed_missions").$type<number[]>().default([]).notNull(),
  achievements: json("achievements").$type<string[]>().default([]).notNull(),
  missionScores: json("mission_scores").$type<Record<number, number>>().default({}).notNull(),
  missionAttempts: json("mission_attempts").$type<Record<number, number>>().default({}).notNull(),
  totalPlayTime: integer("total_play_time").default(0).notNull(),
  mode: varchar("mode", { length: 20 }).$type<GameMode>().default("beginner").notNull(),
  codename: varchar("codename", { length: 50 }),
  introCompleted: boolean("intro_completed").default(false).notNull(),
  missionTimings: json("mission_timings").$type<Record<number, number>>().default({}).notNull(),
  theme: varchar("theme", { length: 20 }).$type<"cyan" | "amber" | "violet">(),
  completedQuizzes: json("completed_quizzes").$type<string[]>().default([]).notNull(),
  quizScores: json("quiz_scores").$type<Record<string, number>>().default({}).notNull(),
  dailyStreak: integer("daily_streak").default(0).notNull(),
  lastDailyDate: varchar("last_daily_date", { length: 10 }),
  completedDailies: json("completed_dailies").$type<string[]>().default([]).notNull(),
  aiInstructor: boolean("ai_instructor").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  xpIdx: index("xp_idx").on(table.xp),
  levelIdx: index("level_idx").on(table.level),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type PlayerProgressDb = typeof playerProgress.$inferSelect;
export type InsertPlayerProgress = typeof playerProgress.$inferInsert;

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, lastLogin: true });
export type InsertUserSchema = z.infer<typeof insertUserSchema>;

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

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
