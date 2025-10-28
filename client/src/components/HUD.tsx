import { Settings, Archive, Trophy, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HUDProps {
  currentView: "missions" | "game" | "archives" | "achievements";
  level: number;
  xp: number;
  achievementCount: number;
  onSettingsClick: () => void;
  onNavigate: (view: "missions" | "archives" | "achievements") => void;
}

export default function HUD({
  currentView,
  level,
  xp,
  achievementCount,
  onSettingsClick,
  onNavigate
}: HUDProps) {
  return (
    <div className="h-14 border-b-2 border-primary/30 bg-card flex items-center justify-between px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="flex items-center gap-4 z-10">
        <button
          onClick={() => onNavigate("missions")}
          className="font-orbitron text-xl font-bold tracking-wider hover-elevate px-2 py-1 rounded-md transition-all"
          data-testid="button-logo"
        >
          <span className="text-primary">GEARZ</span>
          <span className="text-muted-foreground mx-1">//</span>
          <span className="text-accent">OSINT</span>
        </button>
        
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs" data-testid="badge-level">
            LVL {level}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs bg-primary/10" data-testid="badge-xp">
            {xp.toLocaleString()} XP
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2 z-10">
        <Button
          size="icon"
          variant={currentView === "archives" ? "default" : "ghost"}
          onClick={() => onNavigate("archives")}
          data-testid="button-archives"
          className="hover-elevate"
        >
          <Archive className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant={currentView === "achievements" ? "default" : "ghost"}
          onClick={() => onNavigate("achievements")}
          data-testid="button-achievements"
          className="hover-elevate relative"
        >
          <Trophy className="w-5 h-5" />
          {achievementCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {achievementCount}
            </Badge>
          )}
        </Button>
        
        <Link href="/about">
          <Button
            size="icon"
            variant="ghost"
            data-testid="button-about"
            className="hover-elevate"
          >
            <Info className="w-5 h-5" />
          </Button>
        </Link>

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
