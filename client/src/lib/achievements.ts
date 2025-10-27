import type { Achievement, PlayerProgress } from "@shared/schema";

export const achievements: Achievement[] = [
  {
    id: "first_mission",
    title: "First Steps",
    description: "Complete your first mission",
    icon: "target",
    condition: (progress) => progress.completedMissions.length >= 1,
  },
  {
    id: "metadata_master",
    title: "Metadata Master",
    description: "Complete 3 missions using metadata analysis",
    icon: "image",
    condition: (progress) => progress.completedMissions.filter(id => id === 2 || id === 9).length >= 2,
  },
  {
    id: "dork_lord",
    title: "Dork Lord",
    description: "Complete 5 missions using search dorking",
    icon: "search",
    condition: (progress) => progress.completedMissions.length >= 5,
  },
  {
    id: "whois_wizard",
    title: "WHOIS Wizard",
    description: "Perfect score on a WHOIS investigation",
    icon: "globe",
    condition: (progress) => Object.values(progress.missionScores).some(score => score === 100),
  },
  {
    id: "speed_runner",
    title: "Speed Runner",
    description: "Complete a mission in under 2 minutes",
    icon: "zap",
    condition: (progress) => false,
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Get 100% on 3 different missions",
    icon: "award",
    condition: (progress) => Object.values(progress.missionScores).filter(score => score === 100).length >= 3,
  },
  {
    id: "level_5",
    title: "Investigator",
    description: "Reach level 5",
    icon: "shield",
    condition: (progress) => progress.level >= 5,
  },
  {
    id: "level_10",
    title: "Senior Analyst",
    description: "Reach level 10",
    icon: "star",
    condition: (progress) => progress.level >= 10,
  },
  {
    id: "expert_mode",
    title: "No Training Wheels",
    description: "Complete a mission in Expert mode",
    icon: "graduation-cap",
    condition: (progress) => progress.mode === "expert" && progress.completedMissions.length > 0,
  },
  {
    id: "completionist",
    title: "Master Detective",
    description: "Complete all missions",
    icon: "crown",
    condition: (progress) => progress.completedMissions.length >= 10,
  },
];

export function checkNewAchievements(
  oldProgress: PlayerProgress,
  newProgress: PlayerProgress
): Achievement[] {
  return achievements.filter(achievement => 
    !oldProgress.achievements.includes(achievement.id) &&
    achievement.condition(newProgress)
  );
}
