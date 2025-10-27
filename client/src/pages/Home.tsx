import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HUD from "@/components/HUD";
import MissionSelector from "@/components/MissionSelector";
import CaseBrief from "@/components/CaseBrief";
import ToolPanel from "@/components/ToolPanel";
import ReportBox from "@/components/ReportBox";
import MentorDialog from "@/components/MentorDialog";
import SettingsPanel from "@/components/SettingsPanel";
import { missions } from "@/lib/missions";
import type { Mission } from "@shared/schema";

export default function Home() {
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [mentorData, setMentorData] = useState<{
    score?: number;
    feedback?: string;
    explanation?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const handleSelectMission = (mission: Mission) => {
    setCurrentMission(mission);
  };

  const handleBackToMissions = () => {
    setCurrentMission(null);
  };

  const handleSubmitReport = async (report: string) => {
    if (!currentMission) return;

    setIsSubmitting(true);
    
    //todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockScore = Math.floor(Math.random() * 30) + 70;
    const mockFeedback = `Your investigation of "${currentMission.title}" shows ${mockScore >= 80 ? 'excellent' : 'good'} understanding of OSINT techniques. ${mockScore >= 80 ? 'You correctly identified key indicators and presented your findings clearly.' : 'Consider providing more specific details and cross-referencing your sources.'}`;
    
    setMentorData({
      score: mockScore,
      feedback: mockFeedback,
      explanation: currentMission.explanation,
    });
    
    setIsSubmitting(false);
    setMentorOpen(true);

    if (mockScore >= 60 && !completedMissions.includes(currentMission.id)) {
      setCompletedMissions([...completedMissions, currentMission.id]);
      
      const nextMission = missions.find(m => m.id === currentMission.id + 1);
      if (nextMission) {
        nextMission.unlocked = true;
      }
    }
  };

  const handleNextMission = () => {
    setMentorOpen(false);
    const nextMission = missions.find(m => m.id === (currentMission?.id || 0) + 1);
    if (nextMission && nextMission.unlocked) {
      setCurrentMission(nextMission);
    } else {
      handleBackToMissions();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <HUD
        currentMission={currentMission?.id || 1}
        totalMissions={missions.length}
        completedMissions={completedMissions.length}
        onSettingsClick={() => setSettingsOpen(true)}
      />

      {!currentMission ? (
        <MissionSelector
          missions={missions}
          onSelectMission={handleSelectMission}
        />
      ) : (
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
            <div className="lg:w-1/4 space-y-4">
              <Button
                variant="outline"
                onClick={handleBackToMissions}
                className="w-full font-rajdhani uppercase tracking-wide"
                data-testid="button-back-to-missions"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Mission Select
              </Button>
              <div className="hidden lg:block lg:h-[calc(100%-3rem)]">
                <CaseBrief mission={currentMission} />
              </div>
            </div>

            <div className="lg:w-1/2 lg:h-full">
              <ToolPanel availableTools={currentMission.tools} />
            </div>

            <div className="lg:w-1/4 lg:h-full">
              <ReportBox
                onSubmit={handleSubmitReport}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          <div className="lg:hidden p-4 pt-0">
            <CaseBrief mission={currentMission} />
          </div>
        </div>
      )}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <MentorDialog
        open={mentorOpen}
        onClose={() => setMentorOpen(false)}
        score={mentorData.score}
        feedback={mentorData.feedback}
        explanation={mentorData.explanation}
        onNextMission={handleNextMission}
      />
    </div>
  );
}
