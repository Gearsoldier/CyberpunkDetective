import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAuth } from "./auth";
import { calculateLevel, calculateMissionXP, type PlayerProgress, type MissionAttempt } from "@shared/schema";
import { checkNewAchievements } from "../client/src/lib/achievements";
import { missions } from "../client/src/lib/missions";
import { z } from "zod";

const missionAttemptSchema = z.object({
  missionId: z.number(),
  report: z.string().min(10, "Report must be at least 10 characters").max(5000, "Report too long"),
  timeElapsed: z.number().min(0),
  timestamp: z.number(),
});

function evaluateReport(report: string, mission: any): number {
  let score = 50;
  
  if (report.length > 100) score += 10;
  if (report.length > 200) score += 10;
  
  const reportLower = report.toLowerCase();
  const solutionValues = Object.values(mission.solution).map((v: any) => String(v).toLowerCase());
  
  let termsFound = 0;
  for (const value of solutionValues) {
    if (reportLower.includes(value)) {
      termsFound++;
    }
  }
  
  const termBonus = (termsFound / solutionValues.length) * 30;
  score += termBonus;
  
  return Math.min(Math.round(score), 100);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/progress", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const progress = await storage.getPlayerProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error getting progress:", error);
      res.status(500).json({ error: "Failed to get progress" });
    }
  });

  app.post("/api/mission/complete", requireAuth, async (req, res) => {
    try {
      const validationResult = missionAttemptSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid mission attempt data", 
          details: validationResult.error 
        });
      }

      const userId = req.session.userId!;
      const attempt: MissionAttempt = validationResult.data;
      const progress = await storage.getPlayerProgress(userId);

      const mission = missions.find(m => m.id === attempt.missionId);
      if (!mission) {
        return res.status(404).json({ error: "Mission not found" });
      }

      if (mission.minLevel > progress.level) {
        return res.status(403).json({ 
          error: "Mission locked",
          message: `You must be level ${mission.minLevel} to attempt this mission`
        });
      }

      const score = evaluateReport(attempt.report, mission);
      const mode = progress.mode;

      const isFirstCompletion = !progress.completedMissions.includes(attempt.missionId);
      const baseXP = calculateMissionXP(mission.xpReward, mode, score);
      const xpEarned = isFirstCompletion ? baseXP : Math.floor(baseXP * 0.25);

      const newXP = progress.xp + xpEarned;
      const newLevel = calculateLevel(newXP);

      const newProgress: PlayerProgress = {
        ...progress,
        xp: newXP,
        level: newLevel,
        completedMissions: isFirstCompletion
          ? [...progress.completedMissions, attempt.missionId]
          : progress.completedMissions,
        missionScores: {
          ...progress.missionScores,
          [attempt.missionId]: Math.max(progress.missionScores[attempt.missionId] || 0, score)
        },
        missionAttempts: {
          ...progress.missionAttempts,
          [attempt.missionId]: (progress.missionAttempts[attempt.missionId] || 0) + 1
        },
        missionTimings: {
          ...progress.missionTimings,
          [attempt.missionId]: attempt.timeElapsed || 0
        }
      };

      const newAchievements = checkNewAchievements(progress, newProgress);
      if (newAchievements.length > 0) {
        newProgress.achievements = [
          ...newProgress.achievements,
          ...newAchievements.map(a => a.id)
        ];
      }

      await storage.savePlayerProgress(userId, newProgress);

      res.json({
        success: true,
        score,
        xpEarned,
        levelUp: newLevel > progress.level,
        newLevel,
        newAchievements,
        isRepeat: !isFirstCompletion
      });
    } catch (error) {
      console.error("Error completing mission:", error);
      res.status(500).json({ error: "Failed to complete mission" });
    }
  });

  app.post("/api/progress/mode", requireAuth, async (req, res) => {
    try {
      const modeSchema = z.object({
        mode: z.enum(["beginner", "expert"])
      });
      
      const validationResult = modeSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid mode", 
          details: validationResult.error 
        });
      }

      const userId = req.session.userId!;
      await storage.updatePlayerProgress(userId, { mode: validationResult.data.mode });
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating mode:", error);
      res.status(500).json({ error: "Failed to update mode" });
    }
  });

  app.post("/api/progress/codename", requireAuth, async (req, res) => {
    try {
      const codenameSchema = z.object({
        codename: z.string().min(3).max(20)
      });
      
      const validationResult = codenameSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid codename", 
          details: validationResult.error 
        });
      }

      const userId = req.session.userId!;
      await storage.updatePlayerProgress(userId, {
        codename: validationResult.data.codename,
        introCompleted: true
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating codename:", error);
      res.status(500).json({ error: "Failed to update codename" });
    }
  });

  app.post("/api/progress/reset", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      await storage.resetPlayerProgress(userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error resetting progress:", error);
      res.status(500).json({ error: "Failed to reset progress" });
    }
  });

  app.post("/api/quiz/complete", requireAuth, async (req, res) => {
    try {
      const { termId, score } = req.body;
      if (!termId || typeof score !== 'number') {
        return res.status(400).json({ error: "Invalid quiz data" });
      }

      const userId = req.session.userId!;
      const progress = await storage.getPlayerProgress(userId);
      
      const xpEarned = score >= 66 && !progress.completedQuizzes.includes(termId) ? 50 : 0;
      
      const updatedProgress: PlayerProgress = {
        ...progress,
        xp: progress.xp + xpEarned,
        level: calculateLevel(progress.xp + xpEarned),
        completedQuizzes: progress.completedQuizzes.includes(termId) 
          ? progress.completedQuizzes 
          : [...progress.completedQuizzes, termId],
        quizScores: {
          ...progress.quizScores,
          [termId]: Math.max(progress.quizScores[termId] || 0, score)
        }
      };

      await storage.savePlayerProgress(userId, updatedProgress);
      res.json({ success: true, xpEarned });
    } catch (error) {
      console.error("Error completing quiz:", error);
      res.status(500).json({ error: "Failed to complete quiz" });
    }
  });

  app.get("/api/daily", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const today = new Date().toISOString().split('T')[0];
      const progress = await storage.getPlayerProgress(userId);
      
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const dailyMissionId = (dayOfYear % 15) + 1;
      const dailyId = `daily-${today}`;
      
      const isCompleted = progress.completedDailies.includes(dailyId);
      
      res.json({
        id: dailyId,
        date: today,
        missionId: dailyMissionId,
        completed: isCompleted,
        bonusXP: 100
      });
    } catch (error) {
      console.error("Error getting daily case:", error);
      res.status(500).json({ error: "Failed to get daily case" });
    }
  });

  app.post("/api/daily/complete", requireAuth, async (req, res) => {
    try {
      const { dailyId } = req.body;
      if (!dailyId) {
        return res.status(400).json({ error: "Invalid daily ID" });
      }

      const userId = req.session.userId!;
      const progress = await storage.getPlayerProgress(userId);
      const today = new Date().toISOString().split('T')[0];
      
      if (progress.completedDailies.includes(dailyId)) {
        return res.json({ success: true, xpEarned: 0, streakBonus: 0 });
      }

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isStreak = progress.lastDailyDate === yesterday;
      const newStreak = isStreak ? progress.dailyStreak + 1 : 1;
      const streakBonus = Math.min(newStreak * 10, 100);
      const totalXP = 100 + streakBonus;

      const updatedProgress: PlayerProgress = {
        ...progress,
        xp: progress.xp + totalXP,
        level: calculateLevel(progress.xp + totalXP),
        completedDailies: [...progress.completedDailies, dailyId],
        dailyStreak: newStreak,
        lastDailyDate: today
      };

      await storage.savePlayerProgress(userId, updatedProgress);
      res.json({ success: true, xpEarned: totalXP, streakBonus, streak: newStreak });
    } catch (error) {
      console.error("Error completing daily:", error);
      res.status(500).json({ error: "Failed to complete daily" });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard(100);
      res.json({ leaderboard });
    } catch (error) {
      console.error("Error getting leaderboard:", error);
      res.status(500).json({ error: "Failed to get leaderboard" });
    }
  });

  app.post("/api/profile/update", requireAuth, async (req, res) => {
    try {
      const updateSchema = z.object({
        theme: z.enum(["cyan", "amber", "violet"]).optional(),
        aiInstructor: z.boolean().optional(),
      });

      const validation = updateSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid profile data",
          details: validation.error.format()
        });
      }

      const userId = req.session.userId!;
      await storage.updatePlayerProgress(userId, validation.data);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
