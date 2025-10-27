import { useState } from "react";
import { Send, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReportBoxProps {
  onSubmit: (report: string) => void;
  isSubmitting?: boolean;
}

export default function ReportBox({ onSubmit, isSubmitting = false }: ReportBoxProps) {
  const [report, setReport] = useState("");

  const handleSubmit = () => {
    if (report.trim().length >= 10) {
      onSubmit(report);
      setReport("");
    }
  };

  return (
    <Card className="p-4 border-2 border-accent/30 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-md bg-accent/20 flex items-center justify-center">
          <FileText className="w-4 h-4 text-accent" />
        </div>
        <h3 className="font-rajdhani text-lg font-semibold uppercase tracking-wide">
          Intelligence Report
        </h3>
      </div>

      <Textarea
        placeholder="Document your findings here. Include key evidence, domain details, metadata, or any other intelligence gathered during your investigation..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
        className="flex-1 font-mono text-sm resize-none mb-3"
        data-testid="textarea-report"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">
          {report.length} characters {report.length < 10 && "(min: 10)"}
        </span>
        <Button
          onClick={handleSubmit}
          disabled={report.trim().length < 10 || isSubmitting}
          className="font-rajdhani uppercase tracking-wide"
          data-testid="button-submit-report"
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
