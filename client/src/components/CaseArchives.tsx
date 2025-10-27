import { Archive, Trophy, Clock, RotateCcw, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Mission, PlayerProgress } from "@shared/schema";

interface CaseArchivesProps {
  missions: Mission[];
  progress: PlayerProgress;
  onReplayMission: (mission: Mission) => void;
}

export default function CaseArchives({ missions, progress, onReplayMission }: CaseArchivesProps) {
  const completedMissions = missions.filter(m => 
    progress.completedMissions.includes(m.id)
  );

  if (completedMissions.length === 0) {
    return (
      <div className="p-6 text-center">
        <Archive className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="font-orbitron text-xl font-bold mb-2">No Cases Solved Yet</h3>
        <p className="text-muted-foreground">
          Complete missions to build your case archive
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="font-orbitron text-3xl font-bold tracking-wider flex items-center gap-3">
          <Archive className="w-8 h-8 text-primary" />
          <span className="text-primary">CASE</span>
          <span className="text-muted-foreground">//</span>
          <span className="text-accent">ARCHIVES</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          {completedMissions.length} of {missions.length} cases solved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {completedMissions.map((mission) => {
          const score = progress.missionScores[mission.id] || 0;
          const attempts = progress.missionAttempts[mission.id] || 0;
          const isPerfect = score === 100;

          return (
            <Card
              key={mission.id}
              className="p-4 border-2 border-primary/30 hover-elevate"
              data-testid={`card-archive-${mission.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">
                        CASE #{String(mission.id).padStart(3, '0')}
                      </span>
                    </div>
                    <h3 className="font-rajdhani text-lg font-semibold leading-tight">
                      {mission.title}
                    </h3>
                  </div>
                  {isPerfect && <Trophy className="w-5 h-5 text-accent flex-shrink-0" />}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={isPerfect ? "default" : "outline"}
                    className="font-mono text-sm"
                  >
                    {score}% Score
                  </Badge>
                  <Badge variant="outline" className="font-mono text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {attempts} {attempts === 1 ? "Attempt" : "Attempts"}
                  </Badge>
                  <Badge variant="outline" className="font-mono text-xs uppercase">
                    {mission.difficulty}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {mission.brief}
                </p>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReplayMission(mission)}
                  className="w-full font-rajdhani uppercase tracking-wide"
                  data-testid={`button-replay-${mission.id}`}
                >
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Replay Mission
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
