import { BookOpen, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Mission } from "@shared/schema";

interface WhatYouLearnedProps {
  mission: Mission;
  show: boolean;
}

export default function WhatYouLearned({ mission, show }: WhatYouLearnedProps) {
  if (!show) return null;

  const learningPoints = [
    {
      title: "Technique Mastered",
      icon: CheckCircle2,
      content: getTechniqueDescription(mission.id),
    },
    {
      title: "Key Insight",
      icon: Lightbulb,
      content: mission.explanation,
    },
    {
      title: "Real-World Application",
      icon: BookOpen,
      content: getRealWorldApplication(mission.id),
    },
  ];

  return (
    <div className="space-y-4 slide-up">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-accent" />
        <h3 className="font-orbitron text-lg">
          <span className="text-accent">WHAT YOU</span>
          <span className="text-muted-foreground mx-2">//</span>
          <span className="text-primary">LEARNED</span>
        </h3>
      </div>

      <div className="grid gap-4">
        {learningPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <Card key={index} className="p-4 glass hover-elevate transition-smooth">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <Badge variant="outline" className="font-rajdhani uppercase text-xs">
                    {point.title}
                  </Badge>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {point.content}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function getTechniqueDescription(missionId: number): string {
  const techniques: Record<number, string> = {
    1: "WHOIS lookup reveals domain registration details including ownership, registration date, and contact information. Essential for investigating suspicious websites.",
    2: "EXIF metadata extraction from images can reveal GPS coordinates, camera information, timestamps, and software used - crucial for digital forensics.",
    3: "Google dorking uses advanced search operators to find exposed sensitive information. Operators like 'site:', 'filetype:', and 'intext:' are powerful reconnaissance tools.",
    4: "Pastebin monitoring helps detect credential leaks and data breaches. Threat actors often use paste sites to share stolen information.",
    5: "IP address investigation combines WHOIS data with geolocation to map infrastructure. Understanding hosting providers helps attribute threat actor operations.",
    6: "LinkedIn and professional network reconnaissance reveals organizational structure, technology stacks, and potential social engineering targets.",
    7: "DNS enumeration discovers subdomains that may have weaker security. Certificate Transparency logs and wildcard DNS searches expose the full attack surface.",
    8: "Email header analysis traces message origin and routing. Received headers, SPF/DKIM records, and server IPs reveal spoofing attempts and true senders.",
    9: "Image geolocation combines EXIF data, visual landmarks, and reverse image search. Even without GPS data, architectural features can narrow locations.",
    10: "Multi-technique investigation requires correlating data from multiple sources to build comprehensive threat profiles and attribute threat actor operations.",
    11: "Certificate Transparency logs are public records of all SSL certificates. They're invaluable for subdomain enumeration since every HTTPS service needs a certificate.",
    12: "Breach database monitoring tracks credential exposure across data leaks. Even old breaches matter due to password reuse across services.",
    13: "Internet archives and cached pages preserve deleted content. The Wayback Machine, Google cache, and screenshots persist long after original deletion.",
    14: "Threat actor profiling tracks digital artifacts like usernames, crypto addresses, and PGP keys across platforms. OPSEC failures create attribution trails.",
    15: "Professional attribution combines all OSINT techniques into comprehensive intelligence reports answering: WHO, WHAT, WHERE, WHEN, WHY.",
  };
  return techniques[missionId] || "OSINT technique successfully applied to real-world scenario.";
}

function getRealWorldApplication(missionId: number): string {
  const applications: Record<number, string> = {
    1: "Security teams use WHOIS data to track phishing domains. Law enforcement uses it for cybercrime attribution. Organizations monitor brand impersonation attempts.",
    2: "Journalists verify image authenticity by checking metadata. Law enforcement uses EXIF data to track suspects. HR investigators verify resume claims.",
    3: "Penetration testers find exposed files before attackers do. Security researchers discover misconfigured systems. Bug bounty hunters locate vulnerable endpoints.",
    4: "SOC analysts monitor paste sites for credential leaks. Fraud prevention teams detect compromised accounts. Incident responders track breach scope.",
    5: "Threat intelligence analysts map adversary infrastructure. Incident responders identify C2 servers. Network defenders block malicious IP ranges.",
    6: "Recruiters verify candidate backgrounds. Sales teams research prospects. Security teams identify social engineering targets for awareness training.",
    7: "Penetration testers map attack surfaces before engagements. Security researchers discover forgotten subdomains. Bug hunters find vulnerable test environments.",
    8: "Email administrators detect phishing campaigns. Security analysts trace malware delivery. Law enforcement tracks cybercriminals through email metadata.",
    9: "Conflict verification uses geolocation to confirm event locations. Missing persons investigators track last known locations. Brand protection teams find counterfeit operations.",
    10: "Corporate security teams investigate threats. Law enforcement builds cybercrime cases. Threat intelligence firms produce client reports.",
    11: "Red teams discover forgotten services. Security operations find shadow IT. Compliance teams audit certificate management.",
    12: "Identity theft prevention monitors customer exposure. Fraud teams detect account takeover. Compliance teams track data breach impact.",
    13: "Legal teams gather evidence of deleted statements. Journalists verify changed claims. Investigators track narrative evolution.",
    14: "Cybercrime units build attribution cases. Threat intel firms profile adversary groups. National security tracks APT operations.",
    15: "This capstone technique is used by professional threat intelligence analysts, cybercrime investigators, and national security agencies worldwide.",
  };
  return applications[missionId] || "This OSINT technique is used daily by security professionals, journalists, and investigators worldwide.";
}
