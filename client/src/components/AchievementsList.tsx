import { Trophy, Lock, Target, Image, Search, Globe, Zap, Award, Shield, Star, GraduationCap, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { achievements } from "@/lib/achievements";
import type { PlayerProgress } from "@shared/schema";

interface AchievementsListProps {
  progress: PlayerProgress;
}

const iconMap: Record<string, any> = {
  "target": Target,
  "image": Image,
  "search": Search,
  "globe": Globe,
  "zap": Zap,
  "award": Award,
  "shield": Shield,
  "star": Star,
  "graduation-cap": GraduationCap,
  "crown": Crown,
};

export default function AchievementsList({ progress }: AchievementsListProps) {
  const unlockedCount = progress.achievements.length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <h1 className="font-orbitron text-3xl font-bold tracking-wider flex items-center gap-3">
          <Trophy className="w-8 h-8 text-accent" />
          <span className="text-primary">ACHIEVEMENTS</span>
        </h1>

        <Card className="p-4 bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-rajdhani uppercase tracking-wide">
              Completion
            </span>
            <Badge className="font-mono">
              {unlockedCount} / {totalCount}
            </Badge>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = progress.achievements.includes(achievement.id);
          const IconComponent = iconMap[achievement.icon] || Trophy;

          return (
            <Card
              key={achievement.id}
              className={`p-4 border-2 transition-all ${
                isUnlocked
                  ? "border-accent/30 bg-accent/5"
                  : "border-border opacity-60"
              }`}
              data-testid={`card-achievement-${achievement.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-md bg-accent/20 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  {isUnlocked ? (
                    <Badge className="font-mono text-xs bg-accent">
                      UNLOCKED
                    </Badge>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                <div>
                  <h3 className="font-rajdhani text-lg font-semibold mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
