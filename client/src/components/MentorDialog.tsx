import { Bot, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MentorDialogProps {
  open: boolean;
  onClose: () => void;
  score?: number;
  feedback?: string;
  explanation?: string;
  onNextMission?: () => void;
}

export default function MentorDialog({
  open,
  onClose,
  score,
  feedback,
  explanation,
  onNextMission,
}: MentorDialogProps) {
  const passed = score !== undefined && score >= 60;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <span className="font-orbitron text-xl tracking-wide">AI MENTOR FEEDBACK</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {score !== undefined && (
            <Card className="p-6 bg-muted/30 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-rajdhani text-sm uppercase tracking-wide text-muted-foreground">
                  Assessment Score
                </span>
                {passed ? (
                  <CheckCircle className="w-6 h-6 text-primary" />
                ) : (
                  <XCircle className="w-6 h-6 text-destructive" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-orbitron text-5xl font-bold" data-testid="text-score">
                  {score}
                </span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <Badge
                variant={passed ? "default" : "destructive"}
                className="mt-3 font-mono uppercase"
              >
                {passed ? "Mission Complete" : "Additional Training Required"}
              </Badge>
            </Card>
          )}

          {feedback && (
            <div className="space-y-2">
              <h4 className="font-rajdhani text-sm uppercase tracking-wide text-muted-foreground">
                Analysis
              </h4>
              <Card className="p-4 bg-card">
                <p className="text-sm leading-relaxed" data-testid="text-feedback">
                  {feedback}
                </p>
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
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
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
