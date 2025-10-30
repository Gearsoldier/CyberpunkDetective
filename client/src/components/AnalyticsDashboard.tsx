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
      <Card className="p-6 border-2 border-primary/30">
        <h3 className="font-rajdhani text-lg font-semibold uppercase mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Learning Curve
        </h3>
        <div className="h-48 flex items-end gap-2">
          {progress.completedMissions.slice(0, 10).map((missionId, index) => {
            const score = progress.missionScores[missionId] || 0;
            const height = (score / 100) * 100;
            
            return (
              <div 
                key={missionId}
                className="flex-1 bg-primary/20 rounded-t relative group cursor-pointer hover-elevate"
                style={{ height: `${height}%`, minHeight: '10%' }}
                data-testid={`bar-mission-${missionId}`}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    M{missionId}: {score}%
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-t" />
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between text-xs text-muted-foreground font-mono">
          <span>First Mission</span>
          <span>Recent Missions</span>
        </div>
      </Card>
    </div>
  );
}
