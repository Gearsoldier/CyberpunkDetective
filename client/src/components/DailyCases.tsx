import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar, Flame, Trophy, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { missions } from "@/lib/missions";
import type { Mission } from "@shared/schema";

interface DailyCase {
  id: string;
  date: string;
  missionId: number;
  completed: boolean;
  bonusXP: number;
}

interface DailyCasesProps {
  currentStreak: number;
  onStartCase: (mission: Mission) => void;
}

export default function DailyCases({ currentStreak, onStartCase }: DailyCasesProps) {
  const { toast } = useToast();

  const { data: dailyCase, isLoading } = useQuery<DailyCase>({
    queryKey: ["/api/daily"],
  });

  const dailyMission = dailyCase ? missions.find(m => m.id === dailyCase.missionId) : null;

  const handleStartDaily = () => {
    if (dailyMission) {
      onStartCase(dailyMission);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading daily case...</div>
      </div>
    );
  }

  if (!dailyCase || !dailyMission) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No daily case available
      </div>
    );
  }

  const streakBonus = Math.min(currentStreak * 10, 100);

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Daily Case
        </h1>
        <p className="text-muted-foreground">
          Complete one special case each day for bonus XP and streak rewards
        </p>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{currentStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">+{dailyCase.bonusXP + streakBonus}</div>
                <div className="text-sm text-muted-foreground">Total Bonus XP</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{new Date(dailyCase.date).toLocaleDateString()}</div>
                <div className="text-sm text-muted-foreground">Today's Date</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Case Card */}
      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="flex items-center gap-2">
                {dailyMission.title}
                {dailyCase.completed && (
                  <Badge variant="default">Completed</Badge>
                )}
              </CardTitle>
              <CardDescription>{dailyMission.brief}</CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              {dailyMission.difficulty}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {dailyMission.tools.map((tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ))}
          </div>

          {currentStreak > 0 && (
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-sm">Streak Bonus Active</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Bonus:</span>
                  <span className="font-mono">+{dailyCase.bonusXP} XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Streak Bonus ({currentStreak} days):</span>
                  <span className="font-mono text-orange-500">+{streakBonus} XP</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between text-sm font-bold">
                  <span>Total Reward:</span>
                  <span className="text-primary">+{dailyCase.bonusXP + streakBonus} XP</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          {dailyCase.completed ? (
            <div className="w-full text-center py-4">
              <div className="text-green-500 font-semibold mb-2">Case Completed!</div>
              <div className="text-sm text-muted-foreground">
                Come back tomorrow for a new daily case
              </div>
            </div>
          ) : (
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleStartDaily}
              data-testid="button-start-daily"
            >
              <Clock className="w-4 h-4 mr-2" />
              Start Daily Case
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Info Section */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">How Daily Cases Work</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>A new case appears every day - complete it for bonus XP</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Build your streak by completing cases on consecutive days</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Streak bonus: +10 XP per day (max +100 XP at 10-day streak)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Missing a day resets your streak back to 0</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
