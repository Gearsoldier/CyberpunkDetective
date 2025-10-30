import { Lock, Unlock, Star, Trophy, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlayerProgress } from "@shared/schema";

interface UnlockableItem {
  id: string;
  type: "tool" | "mission" | "feature";
  name: string;
  description: string;
  requirement: string;
  requirementCheck: (progress: PlayerProgress) => boolean;
  icon: any;
  reward: string;
}

const UNLOCKABLES: UnlockableItem[] = [
  {
    id: "advanced_search",
    type: "tool",
    name: "Advanced Search Operators",
    description: "Unlock regex patterns and advanced Google dork combinations for precision targeting",
    requirement: "Complete 5 missions",
    requirementCheck: (p) => p.completedMissions.length >= 5,
    icon: Zap,
    reward: "Enhanced search capabilities"
  },
  {
    id: "deep_whois",
    type: "tool",
    name: "Deep WHOIS Analysis",
    description: "Access historical WHOIS data and registration patterns across multiple TLDs",
    requirement: "Reach Level 5",
    requirementCheck: (p) => p.level >= 5,
    icon: Shield,
    reward: "Historical domain intelligence"
  },
  {
    id: "bonus_mission_1",
    type: "mission",
    name: "Operation Ghost Protocol",
    description: "A classified investigation into dark web marketplaces. High risk, high reward.",
    requirement: "Complete all beginner missions with 80%+ average",
    requirementCheck: (p) => {
      const beginnerScores = [1, 2, 3].map(id => p.missionScores[id] || 0);
      const avg = beginnerScores.reduce((a, b) => a + b, 0) / beginnerScores.length;
      return beginnerScores.length === 3 && avg >= 80;
    },
    icon: Trophy,
    reward: "500 XP + Exclusive Badge"
  },
  {
    id: "bonus_mission_2",
    type: "mission",
    name: "The Insider Threat",
    description: "Track down a rogue insider leaking classified data. Use all your skills.",
    requirement: "Complete 15 missions",
    requirementCheck: (p) => p.completedMissions.length >= 15,
    icon: Trophy,
    reward: "750 XP + Rare Achievement"
  },
  {
    id: "expert_analytics",
    type: "feature",
    name: "Expert Analytics Suite",
    description: "Unlock advanced statistics, prediction models, and performance tracking",
    requirement: "Reach Level 10",
    requirementCheck: (p) => p.level >= 10,
    icon: Star,
    reward: "Full analytics dashboard"
  },
  {
    id: "ai_mentor_pro",
    type: "feature",
    name: "AI Mentor Pro Mode",
    description: "Enhanced AI feedback with technique recommendations and career guidance",
    requirement: "Get 5 perfect scores (100%)",
    requirementCheck: (p) => {
      const perfectScores = Object.values(p.missionScores).filter(s => s === 100).length;
      return perfectScores >= 5;
    },
    icon: Zap,
    reward: "Advanced mentorship"
  }
];

interface UnlockableContentProps {
  progress: PlayerProgress;
  onUnlock: (itemId: string) => void;
}

export default function UnlockableContent({ progress, onUnlock }: UnlockableContentProps) {
  const unlockedItems = progress.achievements || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-orbitron text-3xl font-bold tracking-wider flex items-center gap-3">
          <Lock className="w-8 h-8 text-primary" />
          <span className="text-primary">UNLOCKABLE</span>
          <span className="text-muted-foreground">//</span>
          <span className="text-accent">CONTENT</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm mt-2">
          Special tools and missions earned through excellence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UNLOCKABLES.map(item => {
          const isUnlocked = item.requirementCheck(progress);
          const isActivated = unlockedItems.includes(item.id);
          const Icon = item.icon;

          return (
            <Card 
              key={item.id}
              className={`p-4 border-2 transition-all ${
                isUnlocked ? 'border-primary/30 hover-elevate' : 'border-border opacity-60'
              }`}
              data-testid={`card-unlock-${item.id}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isUnlocked ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  {isUnlocked ? (
                    <Icon className="w-6 h-6 text-primary" />
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-rajdhani font-semibold uppercase text-sm">
                        {item.name}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className="mt-1 text-xs"
                      >
                        {item.type}
                      </Badge>
                    </div>
                    {isUnlocked && !isActivated && (
                      <Unlock className="w-4 h-4 text-primary" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground font-mono">Requirement:</span>
                      <span className={`font-mono ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                        {item.requirement}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground font-mono">Reward:</span>
                      <span className="font-mono text-accent">{item.reward}</span>
                    </div>

                    {isUnlocked && !isActivated && (
                      <Button
                        onClick={() => onUnlock(item.id)}
                        size="sm"
                        className="w-full mt-2 font-rajdhani uppercase"
                        data-testid={`button-activate-${item.id}`}
                      >
                        <Unlock className="w-3 h-3 mr-2" />
                        Activate
                      </Button>
                    )}

                    {isActivated && (
                      <Badge className="w-full justify-center bg-primary/20 text-primary">
                        ACTIVATED
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Progress Summary */}
      <Card className="p-4 border-2 border-accent/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-mono text-muted-foreground">Unlocked Content</p>
            <p className="text-2xl font-bold font-orbitron">
              {UNLOCKABLES.filter(item => item.requirementCheck(progress)).length} / {UNLOCKABLES.length}
            </p>
          </div>
          <Trophy className="w-12 h-12 text-accent opacity-30" />
        </div>
      </Card>
    </div>
  );
}
