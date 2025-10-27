import { FileText, Target, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Mission } from "@shared/schema";

interface CaseBriefProps {
  mission: Mission;
}

export default function CaseBrief({ mission }: CaseBriefProps) {
  return (
    <Card className="p-6 border-2 border-primary/30 h-full overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-muted-foreground">
                CASE #{String(mission.id).padStart(3, '0')}
              </span>
              <Badge variant="outline" className="font-mono text-xs uppercase">
                {mission.difficulty}
              </Badge>
            </div>
            <h2 className="font-orbitron text-2xl font-bold tracking-wide" data-testid="text-mission-title">
              {mission.title}
            </h2>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold font-rajdhani uppercase tracking-wide">
            <Target className="w-4 h-4 text-accent" />
            <span>Mission Brief</span>
          </div>
          <p className="text-sm leading-relaxed" data-testid="text-mission-brief">
            {mission.brief}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold font-rajdhani uppercase tracking-wide">
            <Wrench className="w-4 h-4 text-accent" />
            <span>Required Tools</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {mission.tools.map((tool) => (
              <Badge key={tool} variant="outline" className="font-mono text-xs uppercase" data-testid={`badge-tool-${tool}`}>
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            Use the investigation tools to gather intelligence. Submit your findings in the report panel when ready.
          </p>
        </div>
      </div>
    </Card>
  );
}
