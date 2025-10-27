import type { Mission } from "@shared/schema";

export const missions: Mission[] = [
  {
    id: 1,
    title: "The Suspicious Domain",
    brief: "A phishing campaign has been detected originating from the domain sunrise-corp.io. Your mission is to investigate this domain and gather intelligence about its registration and ownership. Use WHOIS lookup to uncover when it was registered and who owns it.",
    difficulty: "beginner",
    tools: ["search", "whois"],
    solution: {
      registered: "2023",
      organization: "Sunrise Holdings LTD"
    },
    explanation: "WHOIS data reveals domain ownership and registration details. Attackers often use newly registered domains for phishing campaigns to avoid detection. Always check domain age and registrant information when investigating suspicious websites.",
    hints: {
      beginner: [
        "Start by using the WHOIS tool with 'sunrise-corp.io'",
        "Look for the registration date in the WHOIS output",
        "The organization name is listed in the registrant information"
      ],
      expert: ["Check both WHOIS and search results for correlation"]
    },
    minLevel: 1,
    xpReward: 100
  },
  {
    id: 2,
    title: "Digital Footprint",
    brief: "An anonymous tipster sent us a screenshot from a social media post. The image 'suspicious_photo.jpg' contains hidden metadata that could reveal the location where it was taken. Analyze the image metadata to extract GPS coordinates and camera information.",
    difficulty: "beginner",
    tools: ["metadata"],
    solution: {
      latitude: "37.7749",
      longitude: "-122.4194",
      camera: "Canon EOS 5D"
    },
    explanation: "Image metadata (EXIF data) often contains GPS coordinates, camera settings, and timestamps. This information can be crucial for geolocation and attribution. Many social media platforms strip this data, but leaked or directly shared images may retain it.",
    hints: {
      beginner: [
        "Use the metadata tool with the filename 'suspicious_photo.jpg'",
        "GPS coordinates show the exact location where the photo was taken",
        "Camera make and model can help verify image authenticity"
      ],
      expert: ["Cross-reference GPS coordinates with known locations"]
    },
    minLevel: 1,
    xpReward: 100
  },
  {
    id: 3,
    title: "Google Dorking 101",
    brief: "Intelligence suggests that a company may have accidentally exposed sensitive documents online. Use advanced search operators (Google dorking) to find publicly accessible files from 'megacorp.com'. Search for exposed PDFs, Excel files, or configuration files.",
    difficulty: "beginner",
    tools: ["search"],
    solution: {
      technique: "site:megacorp.com filetype:pdf",
      files_found: "classified"
    },
    explanation: "Google dorking uses advanced search operators to find specific information that may be unintentionally exposed. Operators like 'site:', 'filetype:', and 'intext:' can reveal sensitive data that organizations didn't realize was public.",
    hints: {
      beginner: [
        "Try searching: site:megacorp.com filetype:pdf",
        "Look for exposed documents in search results",
        "Common file types to search: pdf, xls, doc, conf"
      ],
      expert: ["Combine multiple operators for precise results"]
    },
    minLevel: 1,
    xpReward: 150
  },
  {
    id: 4,
    title: "The Data Leak",
    brief: "Intelligence suggests that sensitive corporate credentials have been leaked on a paste site. Search through recent pastes to find the data dump with ID 'a7f3k9m2' containing employee email addresses from megacorp.com. Document how many credentials were exposed.",
    difficulty: "intermediate",
    tools: ["pastebin", "search"],
    solution: {
      emails_found: "12",
      paste_id: "a7f3k9m2",
      domain: "megacorp.com"
    },
    explanation: "Pastebin and similar sites are commonly used by hackers to share stolen credentials. Monitoring these sites for company-related data is a crucial OSINT technique. Use Google dorks like 'site:pastebin.com domain.com' to find relevant leaks.",
    hints: {
      beginner: [
        "Use the pastebin tool with ID 'a7f3k9m2'",
        "Count the number of email addresses in the leak",
        "Note the domain name of the leaked credentials"
      ],
      expert: ["Search for related pastes using dorking techniques"]
    },
    minLevel: 2,
    xpReward: 200
  },
  {
    id: 5,
    title: "Shadow Infrastructure",
    brief: "We've identified a suspicious IP address (45.33.32.156) linked to malicious activity. Use search techniques and WHOIS to map out the hosting provider, geolocation, and any associated domains. Build a complete profile of this infrastructure.",
    difficulty: "intermediate",
    tools: ["whois", "search"],
    solution: {
      hosting: "DigitalOcean",
      country: "Netherlands",
      associated_domains: "3"
    },
    explanation: "Threat actors often use bulletproof hosting or VPS services to hide their infrastructure. Understanding the hosting provider and geolocation helps identify patterns and attribution. Cross-reference IP addresses with domain registrations for a complete picture.",
    hints: {
      beginner: [
        "Run WHOIS lookup on 45.33.32.156",
        "Check the organization field for hosting provider",
        "Search for the IP to find associated domains"
      ],
      expert: ["Identify the ASN and check for IP range patterns"]
    },
    minLevel: 3,
    xpReward: 250
  },
  {
    id: 6,
    title: "LinkedIn Footprinting",
    brief: "Your target is a cybersecurity company. Use search techniques to gather intelligence about their employees, technology stack, and organizational structure. Search for 'CyberTech Solutions employees' to find publicly available professional profiles and job postings.",
    difficulty: "intermediate",
    tools: ["search"],
    solution: {
      employee_count: "50+",
      tech_stack: "AWS, Python, React",
      security_team: "identified"
    },
    explanation: "Professional networking sites like LinkedIn are goldmines for OSINT. Employee profiles reveal technology stacks, organizational hierarchy, and potential social engineering targets. Job postings often disclose internal tools and security practices.",
    hints: {
      beginner: [
        "Search for company employees on professional networks",
        "Job postings reveal technology requirements",
        "Employee titles indicate organizational structure"
      ],
      expert: ["Map the org chart and identify key decision makers"]
    },
    minLevel: 4,
    xpReward: 300
  },
  {
    id: 7,
    title: "DNS Enumeration",
    brief: "Perform DNS reconnaissance on 'techcorp.com' to discover subdomains and services. Subdomains often reveal development servers, staging environments, and forgotten services that may have security weaknesses. Use search to find exposed subdomains.",
    difficulty: "advanced",
    tools: ["search", "whois"],
    solution: {
      subdomains: "dev.techcorp.com, api.techcorp.com, staging.techcorp.com",
      nameservers: "AWS Route53"
    },
    explanation: "DNS enumeration reveals the attack surface of an organization. Subdomains like 'dev', 'staging', 'admin' often have weaker security than production systems. Tools like subfinder, amass, and certificate transparency logs are used for subdomain discovery.",
    hints: {
      beginner: [
        "Search for: site:*.techcorp.com",
        "Common subdomains: dev, api, staging, admin, test",
        "Certificate transparency logs reveal subdomains"
      ],
      expert: ["Use wildcard searches and zone transfer attempts"]
    },
    minLevel: 5,
    xpReward: 350
  },
  {
    id: 8,
    title: "Email Header Analysis",
    brief: "You've received a suspicious email claiming to be from 'security@bankofamerica.com'. Analyze the email headers to determine if it's legitimate or a phishing attempt. Check the sender's actual server, SPF records, and routing information.",
    difficulty: "advanced",
    tools: ["search", "whois"],
    solution: {
      real_sender: "phishing-server.ru",
      spf_check: "failed",
      verdict: "phishing"
    },
    explanation: "Email headers contain routing information that reveals the true origin of a message. Analyzing 'Received:' headers, SPF/DKIM results, and server IPs helps identify phishing attempts. Legitimate emails pass SPF, DKIM, and DMARC checks.",
    hints: {
      beginner: [
        "Check if sender domain matches the from address",
        "Look for foreign server IPs in routing information",
        "SPF failures indicate spoofing attempts"
      ],
      expert: ["Trace the full email path through Received headers"]
    },
    minLevel: 6,
    xpReward: 400
  },
  {
    id: 9,
    title: "Image Geolocation Challenge",
    brief: "Analyze 'leaked_screenshot.png' to determine where this photo was taken. Use metadata extraction combined with visual analysis and reverse image search to pinpoint the exact location. This is a critical skill for digital forensics.",
    difficulty: "advanced",
    tools: ["metadata", "search"],
    solution: {
      location: "Moscow, Russia",
      coordinates: "55.7558, 37.6173",
      method: "EXIF GPS data"
    },
    explanation: "Geolocation combines technical OSINT (EXIF data) with visual analysis (landmarks, signs, architecture). Even without GPS coordinates, reverse image search and visual clues can narrow down locations. This technique is used in conflict verification and criminal investigations.",
    hints: {
      beginner: [
        "Start with metadata tool on 'leaked_screenshot.png'",
        "GPS coordinates directly reveal the location",
        "Cross-reference with search for verification"
      ],
      expert: ["Use multiple sources to verify location accuracy"]
    },
    minLevel: 7,
    xpReward: 450
  },
  {
    id: 10,
    title: "The Full Investigation",
    brief: "FINAL MISSION: A sophisticated APT group is running a multi-stage operation. You've intercepted a phishing email with an attached image and a suspicious link. Use ALL your OSINT skills: 1) Analyze image metadata, 2) Investigate the linked domain, 3) Search for infrastructure patterns, 4) Check for credential leaks. Compile a comprehensive threat intelligence report.",
    difficulty: "expert",
    tools: ["metadata", "whois", "search", "pastebin"],
    solution: {
      image_location: "Moscow, Russia",
      domain_age: "7 days",
      hosting: "Namecheap",
      leaked_credentials: "yes",
      threat_actor: "APT29"
    },
    explanation: "Advanced OSINT investigations require combining multiple techniques and data sources. By correlating metadata, domain intelligence, infrastructure mapping, and breach data, you can build comprehensive threat profiles. This multi-source approach is the foundation of professional threat intelligence analysis.",
    hints: {
      beginner: [
        "Use all available tools systematically",
        "Document findings from each tool",
        "Look for connections between different data points",
        "Recent domain registration is a red flag"
      ],
      expert: ["Build a complete attack chain from all evidence"]
    },
    minLevel: 8,
    xpReward: 500
  }
];

export function getMissionById(id: number): Mission | undefined {
  return missions.find(m => m.id === id);
}

export function getAvailableMissions(playerLevel: number): Mission[] {
  return missions.filter(m => m.minLevel <= playerLevel);
}

export function getCompletedMissions(completedIds: number[]): Mission[] {
  return missions.filter(m => completedIds.includes(m.id));
}
