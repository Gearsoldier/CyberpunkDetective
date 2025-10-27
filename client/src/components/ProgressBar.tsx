import { Trophy, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { xpForNextLevel, calculateLevel } from "@shared/schema";

interface ProgressBarProps {
  xp?: number;
  level?: number;
  achievements?: string[];
}

export default function ProgressBar({ xp = 0, level = 1, achievements = [] }: ProgressBarProps) {
  const nextLevelXP = xpForNextLevel(xp);
  const currentLevelXP = xp - (level > 1 ? Math.pow(level - 1, 2) * 100 : 0);
  const xpNeeded = nextLevelXP - xp;
  const progressPercent = (currentLevelXP / (nextLevelXP - (level > 1 ? Math.pow(level - 1, 2) * 100 : 0))) * 100;

  return (
    <Card className="p-4 border-primary/30">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-orbitron text-lg font-bold">
                Level {level}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {xp.toLocaleString()} XP
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <Badge variant="outline" className="font-mono text-xs">
              {achievements.length} Achievements
            </Badge>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Progress to Level {level + 1}</span>
            <span className="text-primary">{xpNeeded} XP needed</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>
    </Card>
  );
}
