import { useQuery } from "@tanstack/react-query";
import { Trophy, Target, Zap, Award, Share2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { PlayerProgress } from "@shared/schema";

interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  xp: number;
  accuracy: number;
  completedMissions: number;
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
}

export default function Leaderboard() {
  const { toast } = useToast();

  const { data, isLoading } = useQuery<LeaderboardData>({
    queryKey: ["/api/leaderboard"],
  });

  const handleShareStats = () => {
    const playerEntry = data?.leaderboard[0];
    if (!playerEntry) return;

    const shareText = `GEARZ OSINT Detective Stats

Username: ${playerEntry.username}
Level: ${playerEntry.level}
Missions: ${playerEntry.completedMissions}
Accuracy: ${playerEntry.accuracy}%

Think you can beat me? https://gearz-osint.replit.app`;

    if (navigator.share) {
      navigator.share({
        title: "GEARZ OSINT Detective",
        text: shareText,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Stats Copied!",
          description: "Share your achievements with others",
        });
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Stats Copied!",
        description: "Share your achievements with others",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading leaderboard...</div>
      </div>
    );
  }

  const playerEntry = data?.leaderboard[0];

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Top OSINT detectives tracking The Neon Cross
        </p>
      </div>

      {/* Player Stats */}
      {playerEntry && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">#{playerEntry.rank}</div>
                <div className="text-sm text-muted-foreground mt-1">Rank</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{playerEntry.level}</div>
                <div className="text-sm text-muted-foreground mt-1">Level</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{playerEntry.completedMissions}</div>
                <div className="text-sm text-muted-foreground mt-1">Missions</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{playerEntry.accuracy}%</div>
                <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>Top investigators worldwide</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShareStats}
              data-testid="button-share-stats"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Stats
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data?.leaderboard.map((entry) => (
              <div
                key={entry.username}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  entry.rank === 1 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30' 
                    : 'bg-card hover-elevate'
                }`}
                data-testid={`leaderboard-entry-${entry.rank}`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  {entry.rank === 1 ? (
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto" />
                  ) : entry.rank === 2 ? (
                    <Trophy className="w-7 h-7 text-gray-400 mx-auto" />
                  ) : entry.rank === 3 ? (
                    <Trophy className="w-6 h-6 text-orange-600 mx-auto" />
                  ) : (
                    <div className="text-xl font-bold text-muted-foreground">
                      {entry.rank}
                    </div>
                  )}
                </div>

                {/* Username & Level */}
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-2">
                    {entry.username}
                    {entry.rank <= 3 && (
                      <Badge variant="outline" className="text-xs">
                        Top {entry.rank}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Level {entry.level}
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>{entry.completedMissions}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <Award className="w-4 h-4" />
                    <span>{entry.accuracy}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Zap className="w-4 h-4" />
                    <span>{entry.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Leaderboard Info</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Rankings update in real-time based on level, XP, and performance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Accuracy is calculated from your mission completion scores</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Complete more missions and maintain high scores to climb the ranks</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Share your stats to challenge friends and colleagues</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
