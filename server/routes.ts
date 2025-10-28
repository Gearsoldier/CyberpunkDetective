import type { Express } from "express";
import { createServer, type Server } from "http";
import { getPlayerProgress, savePlayerProgress, resetPlayerProgress } from "./db";
import { calculateLevel, calculateMissionXP, type PlayerProgress, type MissionAttempt, reportSubmissionSchema } from "@shared/schema";
import { checkNewAchievements } from "../client/src/lib/achievements";
import { missions } from "../client/src/lib/missions";
import { z } from "zod";

const playerProgressSchema = z.object({
  xp: z.number().min(0),
  level: z.number().min(1),
  completedMissions: z.array(z.number()),
  achievements: z.array(z.string()),
  missionScores: z.record(z.number()),
  missionAttempts: z.record(z.number()),
  totalPlayTime: z.number().min(0),
  mode: z.enum(["beginner", "expert"]),
});

const missionAttemptSchema = z.object({
  missionId: z.number(),
  report: z.string().min(10, "Report must be at least 10 characters").max(5000, "Report too long"),
  timeElapsed: z.number().min(0),
  timestamp: z.number(),
});

// Server-side scoring heuristic (placeholder for real AI integration)
function evaluateReport(report: string, mission: any): number {
  let score = 50; // Base score
  
  // Check report length (well-detailed reports score higher)
  if (report.length > 100) score += 10;
  if (report.length > 200) score += 10;
  
  // Check for key solution terms
  const reportLower = report.toLowerCase();
  const solutionValues = Object.values(mission.solution).map((v: any) => String(v).toLowerCase());
  
  let termsFound = 0;
  for (const value of solutionValues) {
    if (reportLower.includes(value)) {
      termsFound++;
    }
  }
  
  // Award points for finding solution terms
  const termBonus = (termsFound / solutionValues.length) * 30;
  score += termBonus;
  
  // Cap at 100
  return Math.min(Math.round(score), 100);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await getPlayerProgress();
      res.json(progress);
    } catch (error) {
      console.error("Error getting progress:", error);
      res.status(500).json({ error: "Failed to get progress" });
    }
  });


  app.post("/api/mission/complete", async (req, res) => {
    try {
      const validationResult = missionAttemptSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid mission attempt data", 
          details: validationResult.error 
        });
      }

      const attempt: MissionAttempt = validationResult.data;
      const progress = await getPlayerProgress();

      const mission = missions.find(m => m.id === attempt.missionId);
      if (!mission) {
        return res.status(404).json({ error: "Mission not found" });
      }

      // Enforce mission level requirements
      if (mission.minLevel > progress.level) {
        return res.status(403).json({ 
          error: "Mission locked",
          message: `You must be level ${mission.minLevel} to attempt this mission`
        });
      }

      // Server-side scoring (heuristic placeholder for real AI)
      // TODO: Replace with actual AI API call in production
      const score = evaluateReport(attempt.report, mission);

      // Use server-stored mode (not client-provided) to prevent XP inflation
      const mode = progress.mode;

      // Reduce XP for repeated completions (first time: 100%, repeat: 25%)
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

      await savePlayerProgress(newProgress);

      res.json({
        success: true,
        score, // Send computed score back to client
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

  app.post("/api/progress/mode", async (req, res) => {
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

      const progress = await getPlayerProgress();
      const updatedProgress = {
        ...progress,
        mode: validationResult.data.mode
      };
      
      await savePlayerProgress(updatedProgress);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating mode:", error);
      res.status(500).json({ error: "Failed to update mode" });
    }
  });

  app.post("/api/progress/codename", async (req, res) => {
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

      const progress = await getPlayerProgress();
      const updatedProgress = {
        ...progress,
        codename: validationResult.data.codename,
        introCompleted: true
      };
      
      await savePlayerProgress(updatedProgress);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating codename:", error);
      res.status(500).json({ error: "Failed to update codename" });
    }
  });

  app.post("/api/progress/reset", async (req, res) => {
    try {
      await resetPlayerProgress();
      res.json({ success: true });
    } catch (error) {
      console.error("Error resetting progress:", error);
      res.status(500).json({ error: "Failed to reset progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
