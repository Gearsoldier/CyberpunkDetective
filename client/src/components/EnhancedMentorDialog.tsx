import { useState, useEffect } from "react";
import { Bot, CheckCircle, XCircle, ArrowRight, ChevronDown, ChevronUp, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TypewriterText from "./TypewriterText";
import type { Achievement } from "@shared/schema";

interface EnhancedMentorDialogProps {
  open: boolean;
  onClose: () => void;
  score?: number;
  feedback?: string;
  explanation?: string;
  xpEarned?: number;
  levelUp?: boolean;
  newLevel?: number;
  newAchievements?: Achievement[];
  onNextMission?: () => void;
  onRetry?: () => void;
  playerLevel?: number;
}

export default function EnhancedMentorDialog({
  open,
  onClose,
  score,
  feedback,
  explanation,
  xpEarned = 0,
  levelUp = false,
  newLevel,
  newAchievements = [],
  onNextMission,
  onRetry,
  playerLevel = 1,
}: EnhancedMentorDialogProps) {
  const passed = score !== undefined && score >= 60;
  const [showDeeper, setShowDeeper] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (open) {
      setTypingComplete(false);
      setShowDeeper(false);
    }
  }, [open]);

  const getMentorPersonality = () => {
    if (playerLevel <= 2) {
      return {
        greeting: "Hey there, detective!",
        style: "encouraging"
      };
    } else if (playerLevel <= 5) {
      return {
        greeting: "Not bad, investigator.",
        style: "neutral"
      };
    } else {
      return {
        greeting: "Impressive work, ace.",
        style: "sarcastic"
      };
    }
  };

  const personality = getMentorPersonality();

  const deeperExplanation = `Advanced Technique Breakdown:

This OSINT methodology is used by professional threat intelligence analysts and digital forensics investigators worldwide. The tools and techniques you just practiced are the same ones used to:

• Track Advanced Persistent Threats (APTs)
• Investigate cybercrime operations
• Verify social media disinformation campaigns
• Support law enforcement digital forensics
• Conduct corporate due diligence

Real-world applications include correlating multiple data sources, maintaining operational security, and building evidence chains that hold up under scrutiny. Professionals combine automated tools with manual analysis to uncover patterns that single-source investigations miss.`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl border-2 border-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="font-orbitron text-xl tracking-wide">AI MENTOR</span>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {personality.greeting}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Mission feedback and performance assessment from your AI mentor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {score !== undefined && (
            <Card className="p-6 bg-muted/30 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-rajdhani text-sm uppercase tracking-wide text-muted-foreground">
                  Mission Assessment
                </span>
                {passed ? (
                  <CheckCircle className="w-6 h-6 text-primary" />
                ) : (
                  <XCircle className="w-6 h-6 text-destructive" />
                )}
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-orbitron text-5xl font-bold" data-testid="text-score">
                  {score}
                </span>
                <span className="text-2xl text-muted-foreground">/100</span>
                {xpEarned > 0 && (
                  <Badge className="ml-auto font-mono" variant="outline">
                    +{xpEarned} XP
                  </Badge>
                )}
              </div>
              <Badge
                variant={passed ? "default" : "destructive"}
                className="font-mono uppercase"
              >
                {passed ? "Mission Complete" : "Additional Training Required"}
              </Badge>

              {levelUp && newLevel && (
                <Card className="mt-3 p-3 bg-primary/10 border-primary/30 animate-pulse-glow">
                  <div className="flex items-center gap-2 text-primary">
                    <Trophy className="w-5 h-5" />
                    <span className="font-orbitron font-bold">
                      LEVEL UP! Now Level {newLevel}
                    </span>
                  </div>
                </Card>
              )}
            </Card>
          )}

          {newAchievements.length > 0 && (
            <Card className="p-4 bg-accent/10 border-accent/30">
              <h4 className="font-rajdhani text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                New Achievements Unlocked!
              </h4>
              <div className="space-y-2">
                {newAchievements.map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-2 text-sm">
                    <Trophy className="w-5 h-5 text-accent" />
                    <div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {feedback && (
            <div className="space-y-2">
              <h4 className="font-rajdhani text-sm uppercase tracking-wide text-muted-foreground">
                Performance Analysis
              </h4>
              <Card className="p-4 bg-card font-mono text-sm leading-relaxed">
                {typingComplete ? (
                  <p data-testid="text-feedback">{feedback}</p>
                ) : (
                  <TypewriterText
                    text={feedback}
                    speed={20}
                    onComplete={() => setTypingComplete(true)}
                  />
                )}
              </Card>
            </div>
          )}

          {explanation && (
            <div className="space-y-2">
              <h4 className="font-rajdhani text-sm uppercase tracking-wide text-muted-foreground">
                OSINT Technique Explanation
              </h4>
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm leading-relaxed" data-testid="text-explanation">
                  {explanation}
                </p>
              </Card>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeeper(!showDeeper)}
                className="w-full font-rajdhani uppercase tracking-wide mt-2"
                data-testid="button-explain-deeper"
              >
                {showDeeper ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                {showDeeper ? "Hide" : "Explain Deeper"}
              </Button>

              {showDeeper && (
                <Card className="p-4 bg-muted/30 mt-2 animate-accordion-down">
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono">
                    {deeperExplanation}
                  </pre>
                </Card>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {!passed && onRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="flex-1"
                data-testid="button-retry-mission"
              >
                Retry Mission
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className={passed ? "flex-1" : "flex-1"}
              data-testid="button-close-mentor"
            >
              Close
            </Button>
            {passed && onNextMission && (
              <Button
                onClick={onNextMission}
                className="flex-1 font-rajdhani uppercase tracking-wide"
                data-testid="button-next-mission"
              >
                Next Mission
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
