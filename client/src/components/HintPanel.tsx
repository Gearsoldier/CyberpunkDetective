import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GameMode } from "@shared/schema";

interface HintPanelProps {
  hints: string[];
  mode: GameMode;
}

export default function HintPanel({ hints, mode }: HintPanelProps) {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  if (hints.length === 0) return null;

  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  return (
    <Card className="p-4 border-accent/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between hover-elevate p-2 rounded-md"
        data-testid="button-toggle-hints"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          <span className="font-rajdhani text-sm font-semibold uppercase tracking-wide">
            Investigation Hints
          </span>
          <Badge variant="outline" className="font-mono text-xs">
            {revealedHints.length}/{hints.length}
          </Badge>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2 animate-accordion-down">
          {mode === "expert" && (
            <p className="text-xs text-muted-foreground italic">
              Expert mode: Limited hints available
            </p>
          )}
          {hints.map((hint, index) => (
            <div key={index}>
              {revealedHints.includes(index) ? (
                <Card className="p-3 bg-muted/30 text-sm" data-testid={`hint-${index}`}>
                  {hint}
                </Card>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevealHint(index)}
                  className="w-full font-mono text-xs"
                  data-testid={`button-reveal-hint-${index}`}
                >
                  Reveal Hint {index + 1}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
