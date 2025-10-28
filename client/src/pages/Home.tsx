import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import HUD from "@/components/HUD";
import MissionSelector from "@/components/MissionSelector";
import CaseBrief from "@/components/CaseBrief";
import ToolPanel from "@/components/ToolPanel";
import ReportBox from "@/components/ReportBox";
import EnhancedMentorDialog from "@/components/EnhancedMentorDialog";
import SettingsPanel from "@/components/SettingsPanel";
import CaseArchives from "@/components/CaseArchives";
import AchievementsList from "@/components/AchievementsList";
import ProgressBar from "@/components/ProgressBar";
import ModeSelector from "@/components/ModeSelector";
import MissionTimer from "@/components/MissionTimer";
import HintPanel from "@/components/HintPanel";
import AnimatedBackground from "@/components/AnimatedBackground";
import IntroSequence from "@/components/IntroSequence";
import TrainingReport from "@/components/TrainingReport";
import WhatYouLearned from "@/components/WhatYouLearned";
import { missions } from "@/lib/missions";
import { useToast } from "@/hooks/use-toast";
import type { Mission, PlayerProgress, GameMode, MissionAttempt, Achievement } from "@shared/schema";

type View = "missions" | "game" | "archives" | "achievements";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("missions");
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [mentorData, setMentorData] = useState<{
    score?: number;
    feedback?: string;
    explanation?: string;
    xpEarned?: number;
    levelUp?: boolean;
    newLevel?: number;
    newAchievements?: Achievement[];
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missionStartTime, setMissionStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery<PlayerProgress>({
    queryKey: ["/api/progress"],
  });

  const setCodename = useMutation({
    mutationFn: async (codename: string) => {
      const response = await fetch("/api/progress/codename", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codename }),
      });
      if (!response.ok) throw new Error("Failed to set codename");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  const resetProgress = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/progress/reset", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to reset progress");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Progress Reset",
        description: "All progress has been cleared. Starting fresh!",
      });
      setCurrentView("missions");
      setCurrentMission(null);
    },
  });

  const updateMode = useMutation({
    mutationFn: async (mode: GameMode) => {
      const response = await fetch("/api/progress/mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      if (!response.ok) throw new Error("Failed to update mode");
      return response.json();
    },
    onMutate: async (newMode) => {
      // Optimistically update the UI
      await queryClient.cancelQueries({ queryKey: ["/api/progress"] });
      const previousProgress = queryClient.getQueryData(["/api/progress"]);
      
      queryClient.setQueryData(["/api/progress"], (old: PlayerProgress | undefined) => {
        if (!old) return old;
        return { ...old, mode: newMode };
      });
      
      return { previousProgress };
    },
    onError: (err, newMode, context: any) => {
      // Revert on error
      if (context?.previousProgress) {
        queryClient.setQueryData(["/api/progress"], context.previousProgress);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });

  const completeMission = useMutation({
    mutationFn: async (attempt: MissionAttempt) => {
      console.log("Submitting mission attempt:", attempt);
      const response = await fetch("/api/mission/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attempt),
      });
      console.log("Server response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error:", errorData);
        throw new Error(errorData.error || errorData.message || "Failed to complete mission");
      }
      const data = await response.json();
      console.log("Mission complete response:", data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      
      if (data.levelUp) {
        toast({
          title: "LEVEL UP!",
          description: `You've reached Level ${data.newLevel}!`,
        });
      }

      if (data.newAchievements && data.newAchievements.length > 0) {
        toast({
          title: "Achievement Unlocked!",
          description: `${data.newAchievements[0].title}`,
        });
      }
    },
  });

  const handleSelectMission = (mission: Mission) => {
    setCurrentMission(mission);
    setCurrentView("game");
    setMissionStartTime(Date.now());
    setTimeElapsed(0);
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    if (view !== "game") {
      setCurrentMission(null);
      setShowLearning(false);
    }
  };

  const handleModeChange = (mode: GameMode) => {
    updateMode.mutate(mode);
  };

  const handleSubmitReport = async (report: string) => {
    if (!currentMission || !progress) return;

    setIsSubmitting(true);

    const attempt: MissionAttempt = {
      missionId: currentMission.id,
      report,
      timeElapsed,
      timestamp: Date.now(),
    };

    try {
      const result = await completeMission.mutateAsync(attempt);

      // Generate feedback based on server-computed score
      const score = result.score || 0;
      const feedback = `Your investigation of "${currentMission.title}" shows ${score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'developing'} understanding of OSINT techniques. ${score >= 80 ? 'You correctly identified key indicators and presented your findings clearly.' : score >= 60 ? 'Consider providing more specific details and cross-referencing your sources.' : 'Review the mission brief and hints for guidance on what to investigate.'}`;

      setMentorData({
        score,
        feedback,
        explanation: currentMission.explanation,
        xpEarned: result.xpEarned,
        levelUp: result.levelUp,
        newLevel: result.newLevel,
        newAchievements: result.newAchievements,
      });

      setIsSubmitting(false);
      setMentorOpen(true);
      setShowLearning(true);
    } catch (error: any) {
      console.error("Error completing mission:", error);
      const errorMessage = error?.message || "Failed to submit report";
      toast({
        title: "Error",
        description: `${errorMessage}. Please try again.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleNextMission = () => {
    setMentorOpen(false);
    setShowLearning(false);
    const nextMission = missions.find(m => m.id === (currentMission?.id || 0) + 1);
    if (nextMission && nextMission.minLevel <= (progress?.level || 1)) {
      handleSelectMission(nextMission);
    } else {
      handleBackToMissions();
    }
  };

  const handleRetryMission = () => {
    setMentorOpen(false);
    setShowLearning(false);
    setMissionStartTime(Date.now());
    setTimeElapsed(0);
  };

  const handleBackToMissions = () => {
    setCurrentMission(null);
    setCurrentView("missions");
    setShowLearning(false);
  };

  const handleIntroComplete = (codename: string) => {
    setCodename.mutate(codename);
  };

  if (isLoading || !progress) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="font-orbitron text-2xl font-bold text-primary mb-2 animate-pulse">
            GEARZ OSINT
          </div>
          <p className="text-sm text-muted-foreground font-mono">Initializing systems...</p>
        </div>
      </div>
    );
  }

  // Show intro sequence if not completed
  if (!progress.introCompleted) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background relative transition-smooth">
      <AnimatedBackground />

      <HUD
        currentView={currentView}
        level={progress?.level ?? 1}
        xp={progress?.xp ?? 0}
        achievementCount={progress?.achievements?.length ?? 0}
        codename={progress?.codename}
        onSettingsClick={() => setSettingsOpen(true)}
        onNavigate={handleNavigate}
        onShowReport={() => setReportOpen(true)}
      />

      {currentView === "missions" && (
        <div className="flex-1 overflow-y-auto fade-in">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <ProgressBar
              xp={progress?.xp}
              level={progress?.level}
              achievements={progress?.achievements}
            />
            <ModeSelector
              selectedMode={progress?.mode ?? "beginner"}
              onModeChange={handleModeChange}
            />
          </div>
          <MissionSelector
            missions={missions}
            playerLevel={progress?.level}
            completedMissions={progress?.completedMissions}
            missionScores={progress?.missionScores}
            onSelectMission={handleSelectMission}
          />
        </div>
      )}

      {currentView === "game" && currentMission && (
        <div className="flex-1 overflow-hidden fade-in">
          <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
            <div className="lg:w-1/4 space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleBackToMissions}
                  className="flex-1 font-rajdhani uppercase tracking-wide neon-glow"
                  data-testid="button-back-to-missions"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to HQ
                </Button>
                {(progress?.mode ?? "beginner") === "expert" && (
                  <MissionTimer
                    startTime={missionStartTime}
                    onTimeUpdate={setTimeElapsed}
                  />
                )}
              </div>
              
              <div className="hidden lg:block lg:h-[calc(100%-5rem)] overflow-y-auto space-y-4">
                <CaseBrief mission={currentMission} />
                <HintPanel
                  hints={(progress?.mode ?? "beginner") === "beginner" ? currentMission.hints.beginner : currentMission.hints.expert}
                  mode={progress?.mode ?? "beginner"}
                />
              </div>
            </div>

            <div className="lg:w-1/2 lg:h-full flex flex-col gap-4">
              <ToolPanel availableTools={currentMission.tools} />
              {showLearning && currentMission && (
                <WhatYouLearned mission={currentMission} show={showLearning} />
              )}
            </div>

            <div className="lg:w-1/4 lg:h-full">
              <ReportBox
                onSubmit={handleSubmitReport}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          <div className="lg:hidden p-4 pt-0 space-y-4">
            <CaseBrief mission={currentMission} />
            <HintPanel
              hints={(progress?.mode ?? "beginner") === "beginner" ? currentMission.hints.beginner : currentMission.hints.expert}
              mode={progress?.mode ?? "beginner"}
            />
          </div>
        </div>
      )}

      {currentView === "archives" && (
        <div className="flex-1 overflow-y-auto fade-in">
          <CaseArchives
            missions={missions}
            progress={progress}
            onReplayMission={handleSelectMission}
          />
        </div>
      )}

      {currentView === "achievements" && (
        <div className="flex-1 overflow-y-auto fade-in">
          <AchievementsList progress={progress} />
        </div>
      )}

      {progress && (
        <TrainingReport
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          progress={progress}
        />
      )}

      <SettingsPanel 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        onResetProgress={() => resetProgress.mutate()}
      />
      <EnhancedMentorDialog
        open={mentorOpen}
        onClose={() => setMentorOpen(false)}
        score={mentorData.score}
        feedback={mentorData.feedback}
        explanation={mentorData.explanation}
        xpEarned={mentorData.xpEarned}
        levelUp={mentorData.levelUp}
        newLevel={mentorData.newLevel}
        newAchievements={mentorData.newAchievements}
        onNextMission={handleNextMission}
        onRetry={handleRetryMission}
        playerLevel={progress.level}
      />
    </div>
  );
}
