import { TrendingUp, Target, Clock, Zap, Award, BarChart3, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { PlayerProgress } from "@shared/schema";

interface TrainingReportProps {
  open: boolean;
  onClose: () => void;
  progress: PlayerProgress;
}

export default function TrainingReport({ open, onClose, progress }: TrainingReportProps) {
  const completedCount = progress.completedMissions?.length || 0;
  const totalMissions = 25;
  const completionRate = (completedCount / totalMissions) * 100;

  const scores = progress.missionScores || {};
  const attempts = progress.missionAttempts || {};
  const timings = progress.missionTimings || {};

  const averageScore =
    completedCount > 0
      ? Object.values(scores).reduce((sum, score) => sum + score, 0) / completedCount
      : 0;

  const totalAttempts = Object.values(attempts).reduce((sum, att) => sum + att, 0);

  const averageTime =
    completedCount > 0
      ? Object.values(timings).reduce((sum, time) => sum + time, 0) / completedCount / 1000
      : 0;

  const efficiency = totalAttempts > 0 ? (completedCount / totalAttempts) * 100 : 0;

  const perfectScores = Object.values(scores).filter(score => score >= 95).length;
  const quizzesPassed = progress.completedQuizzes?.length || 0;
  const dailyStreak = progress.dailyStreak || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl glass-strong border-2 border-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl">
            <span className="text-primary">TRAINING</span>
            <span className="text-muted-foreground mx-2">//</span>
            <span className="text-accent">REPORT</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Comprehensive performance report and training statistics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Accuracy</p>
              </div>
              <p className="text-2xl font-bold font-orbitron">
                {averageScore.toFixed(0)}%
              </p>
            </Card>

            <Card className="p-4 bg-accent/5 border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-accent" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Avg Time</p>
              </div>
              <p className="text-2xl font-bold font-orbitron">
                {averageTime > 0 ? `${averageTime.toFixed(0)}s` : "N/A"}
              </p>
            </Card>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Total XP</p>
              </div>
              <p className="text-2xl font-bold font-orbitron">
                {progress.xp.toLocaleString()}
              </p>
            </Card>

            <Card className="p-4 bg-accent/5 border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Efficiency</p>
              </div>
              <p className="text-2xl font-bold font-orbitron">
                {efficiency.toFixed(0)}%
              </p>
            </Card>
          </div>

          {/* Additional Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-3 glass">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Perfect Scores</p>
              </div>
              <p className="text-xl font-bold font-orbitron">{perfectScores}</p>
            </Card>

            <Card className="p-3 glass">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-accent" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Quizzes Passed</p>
              </div>
              <p className="text-xl font-bold font-orbitron">{quizzesPassed}</p>
            </Card>

            <Card className="p-3 glass">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground font-rajdhani uppercase">Daily Streak</p>
              </div>
              <p className="text-xl font-bold font-orbitron">{dailyStreak}</p>
            </Card>
          </div>

          {/* Mission Progress */}
          <Card className="p-4 glass">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-rajdhani uppercase text-sm">Mission Completion</h3>
                <Badge variant="outline" className="font-mono">
                  {completedCount} / {totalMissions}
                </Badge>
              </div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completionRate.toFixed(1)}% of training missions completed
              </p>
            </div>
          </Card>

          {/* Performance Breakdown */}
          <Card className="p-4 glass">
            <h3 className="font-rajdhani uppercase text-sm mb-3">Performance Analysis</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Missions Attempted:</span>
                <span className="font-mono">{totalAttempts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Missions Completed:</span>
                <span className="font-mono">{completedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Level:</span>
                <span className="font-mono">Level {progress.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Achievements Unlocked:</span>
                <span className="font-mono">{progress.achievements.length}</span>
              </div>
            </div>
          </Card>

          {/* Skill Assessment */}
          <Card className="p-4 glass">
            <h3 className="font-rajdhani uppercase text-sm mb-3">Skill Assessment</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">OSINT Fundamentals</span>
                  <span className="font-mono">{Math.min(completedCount * 10, 100)}%</span>
                </div>
                <Progress value={Math.min(completedCount * 10, 100)} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Technical Analysis</span>
                  <span className="font-mono">{averageScore.toFixed(0)}%</span>
                </div>
                <Progress value={averageScore} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Report Writing</span>
                  <span className="font-mono">{Math.min(efficiency, 100).toFixed(0)}%</span>
                </div>
                <Progress value={Math.min(efficiency, 100)} className="h-1.5" />
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
