import { useState } from 'react';
import MentorDialog from '../MentorDialog';
import { Button } from '@/components/ui/button';

export default function MentorDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Mentor Feedback</Button>
      <MentorDialog
        open={open}
        onClose={() => setOpen(false)}
        score={85}
        feedback="Excellent work, detective! You correctly identified the domain registration date and ownership details using WHOIS lookup. Your report was thorough and well-structured."
        explanation="WHOIS data reveals domain ownership and registration details. Attackers often use newly registered domains for phishing campaigns to avoid detection. Always check domain age and registrant information when investigating suspicious websites."
        onNextMission={() => {
          console.log('Next mission clicked');
          setOpen(false);
        }}
      />
    </>
  );
}
