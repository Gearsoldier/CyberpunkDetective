import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HUDProps {
  currentMission: number;
  totalMissions: number;
  completedMissions: number;
  onSettingsClick: () => void;
}

export default function HUD({ currentMission, totalMissions, completedMissions, onSettingsClick }: HUDProps) {
  const progress = Math.round((completedMissions / totalMissions) * 100);

  return (
    <div className="h-14 border-b-2 border-primary/30 bg-card flex items-center justify-between px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="flex items-center gap-4 z-10">
        <div className="font-orbitron text-xl font-bold tracking-wider">
          <span className="text-primary">GEARZ</span>
          <span className="text-muted-foreground mx-1">//</span>
          <span className="text-accent">OSINT</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs" data-testid="badge-mission-count">
            MISSION {currentMission}/{totalMissions}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs bg-primary/10" data-testid="badge-progress">
            {progress}% COMPLETE
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2 z-10">
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span>SYSTEM ONLINE</span>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={onSettingsClick}
          data-testid="button-settings"
          className="hover-elevate"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
