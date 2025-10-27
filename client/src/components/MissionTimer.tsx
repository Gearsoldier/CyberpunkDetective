import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MissionTimerProps {
  startTime: number;
  onTimeUpdate?: (elapsed: number) => void;
}

export default function MissionTimer({ startTime, onTimeUpdate }: MissionTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(newElapsed);
      onTimeUpdate?.(newElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onTimeUpdate]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <Badge variant="outline" className="font-mono text-sm" data-testid="badge-timer">
      <Clock className="w-3 h-3 mr-1" />
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </Badge>
  );
}
