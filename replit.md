# GEARZ OSINT Detective v2.0

## Project Overview
A cyberpunk-themed educational OSINT (Open Source Intelligence) game that teaches real-world investigation skills through interactive missions. Players solve cases using simulated OSINT tools and receive AI-powered mentor feedback.

## Features Implemented

### Core Gameplay
- **10 Progressive Missions**: From basic WHOIS lookups to advanced multi-source investigations
- **OSINT Tools**: Search, WHOIS, Metadata Analysis, Pastebin viewer
- **Dual Difficulty Modes**: Beginner (more hints, 1x XP) and Expert (limited hints, timed, 1.5x XP)
- **Mission Timer**: Tracks completion time in Expert mode
- **Hint System**: Context-sensitive hints that adapt to difficulty mode

### Progression System
- **XP and Leveling**: Earn XP from missions, level up to unlock advanced cases
- **10 Achievements**: Unlock badges for various accomplishments
- **Level Requirements**: Missions unlock as players progress (server-enforced)
- **Persistent Progress**: All progress saved in Replit Database
- **Anti-Cheat**: Mission level gating, reduced XP for repeats (25% after first completion)

### Enhanced AI Mentor
- **Personality System**: Mentor personality adapts based on player level
- **Typewriter Effect**: Animated text display for immersive feedback
- **"Explain Deeper" Feature**: Advanced technique breakdowns
- **Dynamic Grading**: Score feedback with detailed analysis

### UI/UX Features
- **Animated Background**: Cyberpunk grid with scanline effects
- **Glassmorphism Design**: Neon cyan and amber theme
- **Progress Tracking**: Visual XP bar and level display
- **Case Archives**: Review completed missions with scores and replay functionality
- **Achievements Page**: Track unlocked badges and completion progress
- **Fully Responsive**: Optimized for desktop, tablet, and mobile

### Navigation
- Main dashboard with mission selection
- Case archives for reviewing completed investigations
- Achievements gallery
- Settings panel for AI configuration

## Tech Stack
- **Frontend**: React + TypeScript, TailwindCSS, Wouter routing
- **Backend**: Express.js with server-side validation
- **Database**: Replit Database (@replit/database)
- **UI Components**: shadcn/ui with custom cyberpunk theming
- **State Management**: TanStack Query for server state
- **Validation**: Zod schemas for API security

## Security & Data Integrity

### Server-Side Progression Control
- All XP, levels, and achievements computed server-side
- Mission level requirements enforced (403 error if player level too low)
- Score capped to 0-100 range
- Reduced XP for repeated missions (first: 100%, repeats: 25%)
- No client-controlled progression endpoints

### Known Limitations (Prototype/Demo)
- **Mock AI Scoring**: Currently uses client-side mock scores (marked with //todo comments)
- **Production Ready**: In real deployment, report text would be sent to server, AI scoring would happen server-side, and only server-computed scores would be used
- This prototype demonstrates the game mechanics and UI; real AI integration would add server-side report analysis

## File Structure
```
client/
├── src/
│   ├── components/
│   │   ├── HUD.tsx - Top navigation bar
│   │   ├── MissionSelector.tsx - Mission selection grid
│   │   ├── CaseBrief.tsx - Mission briefing panel
│   │   ├── ToolPanel.tsx - OSINT investigation tools
│   │   ├── ReportBox.tsx - Report submission interface
│   │   ├── EnhancedMentorDialog.tsx - AI feedback dialog
│   │   ├── SettingsPanel.tsx - AI configuration
│   │   ├── ProgressBar.tsx - XP and level display
│   │   ├── ModeSelector.tsx - Beginner/Expert mode
│   │   ├── MissionTimer.tsx - Mission completion timer
│   │   ├── HintPanel.tsx - Progressive hint system
│   │   ├── CaseArchives.tsx - Completed missions archive
│   │   ├── AchievementsList.tsx - Achievement gallery
│   │   ├── AnimatedBackground.tsx - Cyberpunk effects
│   │   └── TypewriterText.tsx - Animated text component
│   ├── lib/
│   │   ├── missions.ts - 10 mission definitions
│   │   ├── toolData.ts - Simulated OSINT data
│   │   └── achievements.ts - Achievement definitions
│   ├── pages/
│   │   └── Home.tsx - Main application page
│   └── App.tsx - Application root
│
server/
├── db.ts - Replit Database integration
└── routes.ts - Validated API endpoints

shared/
└── schema.ts - TypeScript types and validation schemas
```

## API Endpoints
- `GET /api/progress` - Fetch player progress (read-only)
- `POST /api/mission/complete` - Complete a mission with server-side validation
  - Validates mission level requirements
  - Caps scores to 0-100
  - Computes XP with anti-cheat measures
  - Awards achievements
- `POST /api/progress/reset` - Reset progress (testing/admin only)

## Data Models

### PlayerProgress
```typescript
{
  xp: number;
  level: number;
  completedMissions: number[];
  achievements: string[];
  missionScores: Record<number, number>;
  missionAttempts: Record<number, number>;
  totalPlayTime: number;
  mode: "beginner" | "expert";
}
```

### Mission
```typescript
{
  id: number;
  title: string;
  brief: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  tools: ToolType[];
  solution: Record<string, string>;
  explanation: string;
  hints: { beginner: string[]; expert: string[] };
  minLevel: number;
  xpReward: number;
}
```

## Design System
- **Primary Color**: Cyan (#187580) - OSINT tools, borders
- **Accent Color**: Amber (#F59E0B) - Highlights, achievements
- **Fonts**:
  - Headers: Orbitron (cyberpunk branding)
  - UI Labels: Rajdhani (technical aesthetic)
  - Code/Data: Space Mono (terminal style)
- **Icons**: Lucide React (no emoji anywhere in the app)

## Game Mechanics

### XP System
- Base XP per mission varies (100-500 based on difficulty)
- Expert mode: 1.5x multiplier
- Score multiplier: 0-100% based on assessment
- Repeat penalty: 25% XP on subsequent completions
- Formula: `XP = baseXP × modeMultiplier × (score/100) × repeatMultiplier`

### Level Progression
- Level = floor(sqrt(XP / 100)) + 1
- XP for next level = (currentLevel)² × 100
- Missions unlock at specific levels (server-enforced)

### Achievements
- First Steps: Complete first mission
- Metadata Master: Complete 3 metadata missions
- Dork Lord: Complete 5 missions
- WHOIS Wizard: Perfect score on WHOIS investigation
- Perfectionist: 100% on 3 missions
- Level milestones: 5, 10
- Expert Mode: Complete mission in expert mode
- Master Detective: Complete all missions

## Future Enhancements
- Real AI API integration (server-side report analysis)
- Sound effects and audio feedback
- More advanced OSINT tools (Shodan, Certificate Transparency)
- Multiplayer leaderboards
- Custom mission editor
- Export reports as PDF
- Social features (share achievements)

## AI Configuration
Users can configure their own AI mentor by providing:
- Provider: OpenAI, Hugging Face, or custom endpoint
- API Key: User's own key
- Model: Specific model name
- Endpoint: API URL

Built-in instructions guide users to obtain free Hugging Face API keys.

## Development Notes
- All OSINT data is simulated - no real network calls
- Mock data clearly marked with //todo comments
- Progress persists in Replit Database
- Fully type-safe with TypeScript
- Server-side validation with Zod schemas
- Responsive design with mobile-first approach
- No emoji characters (Lucide icons only)

## Security Measures
- Mission level gating prevents accessing locked content
- Score validation (0-100 range enforced)
- XP penalties for mission replays
- No client-controlled progression
- Zod schema validation on all API inputs

## Recent Changes (v2.0)
- Added progression system with XP, levels, achievements
- Expanded from 5 to 10 missions
- Enhanced AI mentor with personality and typewriter effects
- Added beginner/expert modes
- Implemented mission timer
- Created case archives and achievements pages
- Added animated cyberpunk background
- Improved mobile responsiveness
- Integrated Replit Database for persistence
- Implemented server-side anti-cheat measures
- Removed all emoji (Lucide icons only)
- Added comprehensive API validation
