import { db } from "./db";
import { users, playerProgress, type User, type InsertUser, type PlayerProgressDb, type InsertPlayerProgress, type PlayerProgress } from "@shared/schema";
import { eq, desc, or } from "drizzle-orm";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export interface IStorage {
  // User management
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmailOrUsername(emailOrUsername: string): Promise<User | undefined>;
  createUser(email: string, username: string, password: string): Promise<User>;
  verifyPassword(user: User, password: string): Promise<boolean>;
  updateLastLogin(userId: number): Promise<void>;

  // Player progress management
  getPlayerProgress(userId: number): Promise<PlayerProgress>;
  savePlayerProgress(userId: number, progress: PlayerProgress): Promise<void>;
  updatePlayerProgress(userId: number, updates: Partial<PlayerProgress>): Promise<void>;
  resetPlayerProgress(userId: number): Promise<void>;

  // Leaderboard
  getLeaderboard(limit?: number): Promise<Array<{ username: string; xp: number; level: number; completedMissions: number; rank: number }>>;
  getUserRank(userId: number): Promise<number>;
}

export class PostgresStorage implements IStorage {
  // User management
  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async getUserByEmailOrUsername(emailOrUsername: string): Promise<User | undefined> {
    const [user] = await db.select().from(users)
      .where(or(eq(users.email, emailOrUsername), eq(users.username, emailOrUsername)))
      .limit(1);
    return user;
  }

  async createUser(email: string, username: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const [user] = await db.insert(users).values({
      email,
      username,
      passwordHash,
    }).returning();

    // Create default player progress for this user
    await db.insert(playerProgress).values({
      userId: user.id,
      xp: 0,
      level: 1,
      completedMissions: [],
      achievements: [],
      missionScores: {},
      missionAttempts: {},
      totalPlayTime: 0,
      mode: "beginner",
      introCompleted: false,
      missionTimings: {},
      theme: "cyan",
      completedQuizzes: [],
      quizScores: {},
      dailyStreak: 0,
      completedDailies: [],
      aiInstructor: false,
    });

    return user;
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, userId));
  }

  // Player progress management
  async getPlayerProgress(userId: number): Promise<PlayerProgress> {
    const [progress] = await db.select().from(playerProgress).where(eq(playerProgress.userId, userId)).limit(1);
    
    if (!progress) {
      throw new Error("Player progress not found");
    }

    return {
      xp: progress.xp,
      level: progress.level,
      completedMissions: progress.completedMissions as number[],
      achievements: progress.achievements as string[],
      missionScores: progress.missionScores as Record<number, number>,
      missionAttempts: progress.missionAttempts as Record<number, number>,
      totalPlayTime: progress.totalPlayTime,
      mode: progress.mode,
      codename: progress.codename || undefined,
      introCompleted: progress.introCompleted,
      missionTimings: progress.missionTimings as Record<number, number>,
      theme: progress.theme || undefined,
      completedQuizzes: progress.completedQuizzes as string[],
      quizScores: progress.quizScores as Record<string, number>,
      dailyStreak: progress.dailyStreak,
      lastDailyDate: progress.lastDailyDate || undefined,
      completedDailies: progress.completedDailies as string[],
      aiInstructor: progress.aiInstructor,
    };
  }

  async savePlayerProgress(userId: number, progress: PlayerProgress): Promise<void> {
    await db.update(playerProgress)
      .set({
        xp: progress.xp,
        level: progress.level,
        completedMissions: progress.completedMissions,
        achievements: progress.achievements,
        missionScores: progress.missionScores,
        missionAttempts: progress.missionAttempts,
        totalPlayTime: progress.totalPlayTime,
        mode: progress.mode,
        codename: progress.codename,
        introCompleted: progress.introCompleted,
        missionTimings: progress.missionTimings,
        theme: progress.theme,
        completedQuizzes: progress.completedQuizzes,
        quizScores: progress.quizScores,
        dailyStreak: progress.dailyStreak,
        lastDailyDate: progress.lastDailyDate,
        completedDailies: progress.completedDailies,
        aiInstructor: progress.aiInstructor,
        updatedAt: new Date(),
      })
      .where(eq(playerProgress.userId, userId));
  }

  async updatePlayerProgress(userId: number, updates: Partial<PlayerProgress>): Promise<void> {
    await db.update(playerProgress)
      .set({
        ...updates as any,
        updatedAt: new Date(),
      })
      .where(eq(playerProgress.userId, userId));
  }

  async resetPlayerProgress(userId: number): Promise<void> {
    await db.update(playerProgress)
      .set({
        xp: 0,
        level: 1,
        completedMissions: [],
        achievements: [],
        missionScores: {},
        missionAttempts: {},
        totalPlayTime: 0,
        mode: "beginner",
        codename: null,
        introCompleted: false,
        missionTimings: {},
        theme: "cyan",
        completedQuizzes: [],
        quizScores: {},
        dailyStreak: 0,
        lastDailyDate: null,
        completedDailies: [],
        aiInstructor: false,
        updatedAt: new Date(),
      })
      .where(eq(playerProgress.userId, userId));
  }

  // Leaderboard
  async getLeaderboard(limit: number = 100): Promise<Array<{ username: string; xp: number; level: number; completedMissions: number; accuracy: number; rank: number }>> {
    const results = await db
      .select({
        username: users.username,
        xp: playerProgress.xp,
        level: playerProgress.level,
        completedMissions: playerProgress.completedMissions,
        missionScores: playerProgress.missionScores,
      })
      .from(playerProgress)
      .innerJoin(users, eq(playerProgress.userId, users.id))
      .orderBy(desc(playerProgress.xp), desc(playerProgress.level))
      .limit(limit);

    return results.map((row, index) => {
      const missions = row.completedMissions as number[];
      const scores = row.missionScores as Record<number, number>;
      const accuracy = missions.length > 0
        ? Math.round(Object.values(scores).reduce((sum, s) => sum + s, 0) / missions.length)
        : 0;

      return {
        username: row.username,
        xp: row.xp,
        level: row.level,
        completedMissions: missions.length,
        accuracy,
        rank: index + 1,
      };
    });
  }

  async getUserRank(userId: number): Promise<number> {
    const userProgress = await this.getPlayerProgress(userId);
    const higherRankedCount = await db
      .select({ count: playerProgress.id })
      .from(playerProgress)
      .where(
        or(
          desc(playerProgress.xp),
          eq(playerProgress.xp, userProgress.xp)
        )
      );
    
    return (higherRankedCount[0]?.count || 0) + 1;
  }
}

export const storage = new PostgresStorage();
