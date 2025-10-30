import { useMemo } from "react";
import { BarChart3, TrendingUp, Clock, Target, Award, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlayerProgress, Mission } from "@shared/schema";

interface AnalyticsDashboardProps {
  progress: PlayerProgress;
  missions: Mission[];
}

export default function AnalyticsDashboard({ progress, missions }: AnalyticsDashboardProps) {
  const analytics = useMemo(() => {
    const completedCount = progress.completedMissions.length;
    const totalMissions = missions.length;
    const completionRate = totalMissions > 0 ? (completedCount / totalMissions) * 100 : 0;

    // Calculate average score
    const scores = Object.values(progress.missionScores);
    const avgScore = scores.length > 0 
      ? scores.reduce((a, b) => a + b, 0) / scores.length 
      : 0;

    // Calculate average time (in seconds)
    const timings = Object.values(progress.missionTimings || {});
    const avgTime = timings.length > 0 
      ? timings.reduce((a, b) => a + b, 0) / timings.length 
      : 0;

    // Perfect scores
    const perfectScores = scores.filter(s => s === 100).length;

    // Difficulty breakdown
    const difficultyStats = progress.completedMissions.reduce((acc, missionId) => {
      const mission = missions.find(m => m.id === missionId);
      if (mission) {
        acc[mission.difficulty] = (acc[mission.difficulty] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Skill heatmap - which tools used most
    const toolUsage = progress.completedMissions.reduce((acc, missionId) => {
      const mission = missions.find(m => m.id === missionId);
      if (mission) {
        mission.tools.forEach(tool => {
          acc[tool] = (acc[tool] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      completionRate,
      avgScore,
      avgTime,
      perfectScores,
      difficultyStats,
      toolUsage,
      totalXP: progress.xp,
      level: progress.level,
      achievementCount: progress.achievements.length
    };
  }, [progress, missions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    return "text-destructive";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-orbitron text-3xl font-bold tracking-wider flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          <span className="text-primary">ANALYTICS</span>
          <span className="text-muted-foreground">//</span>
          <span className="text-accent">DASHBOARD</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm mt-2">
          Your investigation performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-2 border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase">Completion</p>
              <p className="text-2xl font-bold font-orbitron">{analytics.completionRate.toFixed(0)}%</p>
            </div>
            <Target className="w-8 h-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-4 border-2 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase">Avg Score</p>
              <p className={`text-2xl font-bold font-orbitron ${getScoreColor(analytics.avgScore)}`}>
                {analytics.avgScore.toFixed(0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-accent opacity-50" />
          </div>
        </Card>

        <Card className="p-4 border-2 border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase">Perfect Scores</p>
              <p className="text-2xl font-bold font-orbitron">{analytics.perfectScores}</p>
            </div>
            <Award className="w-8 h-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-4 border-2 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase">Avg Time</p>
              <p className="text-xl font-bold font-mono">{formatTime(analytics.avgTime)}</p>
            </div>
            <Clock className="w-8 h-8 text-accent opacity-50" />
          </div>
        </Card>
      </div>

      {/* Difficulty Breakdown */}
      <Card className="p-6 border-2 border-primary/30">
        <h3 className="font-rajdhani text-lg font-semibold uppercase mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Difficulty Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(analytics.difficultyStats).map(([difficulty, count]) => {
            const total = missions.filter(m => m.difficulty === difficulty).length;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            return (
              <div key={difficulty} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono capitalize">{difficulty}</span>
                  <span className="text-muted-foreground">{count} / {total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Skill Heatmap */}
      <Card className="p-6 border-2 border-accent/30">
        <h3 className="font-rajdhani text-lg font-semibold uppercase mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-accent" />
          Tool Proficiency Heatmap
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(analytics.toolUsage).sort((a, b) => b[1] - a[1]).map(([tool, count]) => {
            const maxUsage = Math.max(...Object.values(analytics.toolUsage));
            const intensity = maxUsage > 0 ? count / maxUsage : 0;
            
            return (
              <div 
                key={tool}
                className="p-3 rounded-lg border-2 border-border text-center"
                style={{
                  backgroundColor: `hsl(var(--primary) / ${intensity * 0.2})`
                }}
              >
                <p className="text-xs font-mono uppercase text-muted-foreground mb-1">{tool}</p>
                <p className="text-lg font-bold font-orbitron">{count}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {(intensity * 100).toFixed(0)}%
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Learning Curve */}
      <Card className="p-6 border-2 border-primary/30 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <h3 className="font-rajdhani text-lg font-semibold uppercase mb-4 flex items-center gap-2 relative z-10">
          <TrendingUp className="w-5 h-5 text-primary" />
          Learning Curve
        </h3>
        <div className="h-64 flex items-end gap-3 px-2 relative z-10">
          {progress.completedMissions.slice(0, 10).map((missionId, index) => {
            const score = progress.missionScores[missionId] || 0;
            const height = (score / 100) * 100;
            const isExcellent = score >= 90;
            const isGood = score >= 70;
            
            return (
              <div 
                key={missionId}
                className="flex-1 relative group cursor-pointer"
                data-testid={`bar-mission-${missionId}`}
              >
                <div 
                  className={`relative rounded-t-lg transition-all duration-300 ${
                    isExcellent 
                      ? 'bg-gradient-to-t from-green-500/60 via-green-400/40 to-green-300/20 border-t-2 border-green-400 shadow-lg shadow-green-500/20' 
                      : isGood 
                      ? 'bg-gradient-to-t from-primary/60 via-primary/40 to-primary/20 border-t-2 border-primary shadow-lg shadow-primary/20'
                      : 'bg-gradient-to-t from-accent/60 via-accent/40 to-accent/20 border-t-2 border-accent shadow-lg shadow-accent/20'
                  } hover:scale-105 hover:shadow-2xl`}
                  style={{ height: `${Math.max(height, 10)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
                  {isExcellent && (
                    <div className="absolute inset-0 animate-pulse bg-green-400/10 rounded-t-lg" />
                  )}
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
                  <Badge 
                    variant="outline" 
                    className={`text-xs whitespace-nowrap font-mono shadow-lg ${
                      isExcellent ? 'bg-green-500/10 border-green-500' : 
                      isGood ? 'bg-primary/10 border-primary' : 
                      'bg-accent/10 border-accent'
                    }`}
                  >
                    Mission {missionId}: {score}%
                  </Badge>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-mono">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 pt-4 border-t border-primary/20 flex justify-between items-center text-xs text-muted-foreground font-mono relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>First Mission</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Recent Missions</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <div className="mt-4 flex gap-4 text-xs font-mono relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-t from-green-500/60 to-green-300/20 border border-green-400" />
            <span className="text-muted-foreground">90%+ Excellence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-t from-primary/60 to-primary/20 border border-primary" />
            <span className="text-muted-foreground">70%+ Proficient</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-t from-accent/60 to-accent/20 border border-accent" />
            <span className="text-muted-foreground">&lt;70% Training</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
