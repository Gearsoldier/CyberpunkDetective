import { Lock, CheckCircle, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Mission } from "@shared/schema";

interface MissionSelectorProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
}

export default function MissionSelector({ missions, onSelectMission }: MissionSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-primary/20 text-primary";
      case "medium": return "bg-accent/20 text-accent";
      case "hard": return "bg-destructive/20 text-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="font-orbitron text-3xl font-bold tracking-wider">
          <span className="text-primary">MISSION</span>
          <span className="text-muted-foreground mx-2">//</span>
          <span className="text-accent">SELECT</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          Choose your investigation. Complete missions to unlock advanced cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map((mission) => (
          <Card
            key={mission.id}
            className={`p-4 border-2 transition-all ${
              mission.unlocked
                ? "hover-elevate active-elevate-2 cursor-pointer border-primary/30"
                : "opacity-60 cursor-not-allowed border-border"
            }`}
            onClick={() => mission.unlocked && onSelectMission(mission)}
            data-testid={`card-mission-${mission.id}`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm text-muted-foreground">
                    CASE #{String(mission.id).padStart(3, '0')}
                  </span>
                </div>
                {!mission.unlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                {mission.unlocked && mission.id === 1 && (
                  <CheckCircle className="w-4 h-4 text-primary" />
                )}
              </div>

              <h3 className="font-rajdhani text-xl font-semibold leading-tight">
                {mission.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {mission.brief}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`font-mono text-xs uppercase ${getDifficultyColor(mission.difficulty)}`}>
                  {mission.difficulty}
                </Badge>
                <Badge variant="outline" className="font-mono text-xs">
                  {mission.tools.length} TOOLS
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
