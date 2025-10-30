import type { Express } from "express";
import { storage } from "./storage";
import { registerSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

export function registerAuthRoutes(app: Express) {
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validation = registerSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid registration data",
          details: validation.error.format()
        });
      }

      const { email, username, password } = validation.data;

      // Check if user already exists
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // Create user
      const user = await storage.createUser(email, username, password);

      // Set session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid login data",
          details: validation.error.format()
        });
      }

      const { emailOrUsername, password } = validation.data;

      // Find user
      const user = await storage.getUserByEmailOrUsername(emailOrUsername);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verify password
      const isValid = await storage.verifyPassword(user, password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Update last login
      await storage.updateLastLogin(user.id);

      // Set session
      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Failed to log out" });
      }
      res.json({ success: true });
    });
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        req.session.userId = undefined;
        return res.status(401).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });
}
