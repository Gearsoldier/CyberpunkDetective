import type { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized - Please log in" });
  }

  try {
    const user = await storage.getUserById(req.session.userId);
    if (!user) {
      req.session.userId = undefined;
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    storage.getUserById(req.session.userId)
      .then(user => {
        if (user) {
          (req as any).user = user;
        }
        next();
      })
      .catch(error => {
        console.error("Optional auth error:", error);
        next();
      });
  } else {
    next();
  }
}
