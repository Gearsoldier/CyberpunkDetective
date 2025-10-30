import { Settings, Archive, Trophy, Info, BarChart3, BookOpen, Calendar, Users, User, Lock, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import ThemeToggle from "./ThemeToggle";
import DarkModeToggle from "./DarkModeToggle";

interface HUDProps {
  currentView: "missions" | "game" | "archives" | "achievements" | "knowledge" | "daily" | "leaderboard" | "profile" | "analytics" | "unlockables";
  level: number;
  xp: number;
  achievementCount: number;
  codename?: string;
  onSettingsClick: () => void;
  onNavigate: (view: "missions" | "archives" | "achievements" | "knowledge" | "daily" | "leaderboard" | "profile" | "analytics" | "unlockables") => void;
  onShowReport?: () => void;
}

export default function HUD({
  currentView,
  level,
  xp,
  achievementCount,
  codename,
  onSettingsClick,
  onNavigate,
  onShowReport
}: HUDProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout", {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "See you next time, detective",
      });
      setLocation("/auth");
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "Could not log out",
        variant: "destructive",
      });
    },
  });
  return (
    <div className="h-14 border-b-2 border-primary/30 glass-strong flex items-center justify-between px-4 relative overflow-hidden neon-glow">
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
          {user && (
            <Badge variant="outline" className="font-mono text-xs bg-accent/10" data-testid="badge-username">
              @{user.username}
            </Badge>
          )}
          {codename && (
            <Badge variant="outline" className="font-mono text-xs bg-accent/10" data-testid="badge-codename">
              {codename}
            </Badge>
          )}
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
          variant={currentView === "daily" ? "default" : "ghost"}
          onClick={() => onNavigate("daily")}
          data-testid="button-daily"
          className="hover-elevate"
        >
          <Calendar className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant={currentView === "leaderboard" ? "default" : "ghost"}
          onClick={() => onNavigate("leaderboard")}
          data-testid="button-leaderboard"
          className="hover-elevate"
        >
          <Users className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant={currentView === "knowledge" ? "default" : "ghost"}
          onClick={() => onNavigate("knowledge")}
          data-testid="button-knowledge"
          className="hover-elevate"
        >
          <BookOpen className="w-5 h-5" />
        </Button>

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

        <Button
          size="icon"
          variant={currentView === "analytics" ? "default" : "ghost"}
          onClick={() => onNavigate("analytics")}
          data-testid="button-analytics"
          className="hover-elevate"
        >
          <BarChart3 className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant={currentView === "unlockables" ? "default" : "ghost"}
          onClick={() => onNavigate("unlockables")}
          data-testid="button-unlockables"
          className="hover-elevate"
        >
          <Lock className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant={currentView === "profile" ? "default" : "ghost"}
          onClick={() => onNavigate("profile")}
          data-testid="button-profile"
          className="hover-elevate"
        >
          <User className="w-5 h-5" />
        </Button>
        
        {onShowReport && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onShowReport}
            data-testid="button-training-report"
            className="hover-elevate"
          >
            <Info className="w-5 h-5" />
          </Button>
        )}

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

        <DarkModeToggle />
        <ThemeToggle />

        <Button
          size="icon"
          variant="ghost"
          onClick={onSettingsClick}
          data-testid="button-settings"
          className="hover-elevate"
        >
          <Settings className="w-5 h-5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          data-testid="button-logout"
          className="hover-elevate"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
