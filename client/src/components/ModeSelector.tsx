import { GraduationCap, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GameMode } from "@shared/schema";

interface ModeSelectorProps {
  selectedMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export default function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card
        className={`p-4 cursor-pointer border-2 transition-all hover-elevate active-elevate-2 ${
          selectedMode === "beginner"
            ? "border-primary bg-primary/5"
            : "border-border"
        }`}
        onClick={() => onModeChange("beginner")}
        data-testid="card-mode-beginner"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <GraduationCap className="w-6 h-6 text-primary" />
            {selectedMode === "beginner" && (
              <Badge className="font-mono text-xs">ACTIVE</Badge>
            )}
          </div>
          <div>
            <h3 className="font-rajdhani text-lg font-semibold">Beginner</h3>
            <p className="text-xs text-muted-foreground">
              More hints, easier grading
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            1x XP Multiplier
          </Badge>
        </div>
      </Card>

      <Card
        className={`p-4 cursor-pointer border-2 transition-all hover-elevate active-elevate-2 ${
          selectedMode === "expert"
            ? "border-accent bg-accent/5"
            : "border-border"
        }`}
        onClick={() => onModeChange("expert")}
        data-testid="card-mode-expert"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Zap className="w-6 h-6 text-accent" />
            {selectedMode === "expert" && (
              <Badge variant="default" className="font-mono text-xs bg-accent text-accent-foreground">
                ACTIVE
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-rajdhani text-lg font-semibold">Expert</h3>
            <p className="text-xs text-muted-foreground">
              Minimal hints, timed missions
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs border-accent text-accent">
            1.5x XP Multiplier
          </Badge>
        </div>
      </Card>
    </div>
  );
}
