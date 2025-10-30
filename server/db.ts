import Database from "@replit/database";
import type { PlayerProgress } from "@shared/schema";

const db = new Database();

const DEFAULT_PROGRESS: PlayerProgress = {
  xp: 0,
  level: 1,
  completedMissions: [],
  achievements: [],
  missionScores: {},
  missionAttempts: {},
  totalPlayTime: 0,
  mode: "beginner",
  codename: undefined,
  introCompleted: false,
  missionTimings: {},
  theme: "cyan",
  completedQuizzes: [],
  quizScores: {},
  dailyStreak: 0,
  lastDailyDate: undefined,
  completedDailies: [],
  aiInstructor: false,
};

export async function getPlayerProgress(): Promise<PlayerProgress> {
  try {
    let result = await db.get("player_progress");
    let progress = result as any;
    
    if (!progress || typeof progress !== 'object') {
      await db.set("player_progress", DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    
    // Unwrap any nested data caused by database corruption
    while (progress.ok && progress.value && typeof progress.value === 'object') {
      progress = progress.value;
    }
    
    // Merge with defaults to ensure all fields are present
    const mergedProgress: PlayerProgress = {
      ...DEFAULT_PROGRESS,
      ...progress,
      // Ensure arrays and objects are present
      completedMissions: progress.completedMissions || [],
      achievements: progress.achievements || [],
      missionScores: progress.missionScores || {},
      missionAttempts: progress.missionAttempts || {},
      missionTimings: progress.missionTimings || {},
    };
    return mergedProgress;
  } catch (error) {
    console.error("Error getting player progress:", error);
    return DEFAULT_PROGRESS;
  }
}

export async function savePlayerProgress(progress: PlayerProgress): Promise<void> {
  try {
    await db.set("player_progress", progress);
  } catch (error) {
    console.error("Error saving player progress:", error);
    throw error;
  }
}

export async function resetPlayerProgress(): Promise<void> {
  try {
    await db.set("player_progress", DEFAULT_PROGRESS);
  } catch (error) {
    console.error("Error resetting player progress:", error);
    throw error;
  }
}

export { db };
