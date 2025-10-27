import type { Mission } from "@shared/schema";

//todo: remove mock functionality
export const missions: Mission[] = [
  {
    id: 1,
    title: "The Suspicious Domain",
    brief: "A phishing campaign has been detected originating from the domain sunrise-corp.io. Your mission is to investigate this domain and gather intelligence about its registration and ownership. Use your OSINT tools to uncover when it was registered and who owns it.",
    difficulty: "easy",
    tools: ["search", "whois"],
    solution: {
      registered: "2023",
      organization: "Sunrise Holdings LTD"
    },
    explanation: "WHOIS data reveals domain ownership and registration details. Attackers often use newly registered domains for phishing campaigns to avoid detection. Always check domain age and registrant information when investigating suspicious websites.",
    unlocked: true
  },
  {
    id: 2,
    title: "Digital Footprint",
    brief: "An anonymous tipster sent us a screenshot from a social media post. The image contains hidden metadata that could reveal the location where it was taken. Analyze the image metadata to extract GPS coordinates and camera information.",
    difficulty: "easy",
    tools: ["metadata"],
    solution: {
      latitude: "37.7749",
      longitude: "-122.4194",
      camera: "Canon EOS 5D"
    },
    explanation: "Image metadata (EXIF data) often contains GPS coordinates, camera settings, and timestamps. This information can be crucial for geolocation and attribution. Many social media platforms strip this data, but leaked or directly shared images may retain it.",
    unlocked: true
  },
  {
    id: 3,
    title: "The Data Leak",
    brief: "Intelligence suggests that sensitive corporate credentials have been leaked on a paste site. Search through recent pastes to find any data dumps containing employee email addresses or passwords from megacorp.com. Document what you find.",
    difficulty: "medium",
    tools: ["pastebin", "search"],
    solution: {
      emails_found: "12",
      paste_id: "a7f3k9m2",
      domain: "megacorp.com"
    },
    explanation: "Pastebin and similar sites are commonly used by hackers to share stolen credentials. Monitoring these sites for company-related data is a crucial OSINT technique. Use Google dorks like 'site:pastebin.com domain.com' to find relevant leaks.",
    unlocked: false
  },
  {
    id: 4,
    title: "Shadow Infrastructure",
    brief: "We've identified a suspicious IP address (45.33.32.156) linked to malicious activity. Use search techniques and WHOIS to map out the hosting provider, geolocation, and any associated domains. Build a profile of this infrastructure.",
    difficulty: "medium",
    tools: ["whois", "search"],
    solution: {
      hosting: "DigitalOcean",
      country: "Netherlands",
      associated_domains: "3"
    },
    explanation: "Threat actors often use bulletproof hosting or VPS services to hide their infrastructure. Understanding the hosting provider and geolocation helps identify patterns and attribution. Cross-reference IP addresses with domain registrations for a complete picture.",
    unlocked: false
  },
  {
    id: 5,
    title: "The Full Investigation",
    brief: "FINAL MISSION: A sophisticated threat actor is running a multi-stage operation. You've received a phishing email with an attached image and a suspicious link. Use ALL your OSINT tools to: 1) Analyze the image metadata, 2) Investigate the linked domain, 3) Search for associated infrastructure, 4) Check for data leaks. Compile a comprehensive threat intelligence report.",
    difficulty: "hard",
    tools: ["metadata", "whois", "search", "pastebin"],
    solution: {
      image_location: "Moscow, Russia",
      domain_age: "7 days",
      hosting: "Namecheap",
      leaked_credentials: "yes"
    },
    explanation: "Advanced OSINT investigations require combining multiple techniques and data sources. By correlating metadata, domain intelligence, infrastructure mapping, and breach data, you can build comprehensive threat profiles. This multi-source approach is used by professional threat intelligence analysts daily.",
    unlocked: false
  }
];

export function getMissionById(id: number): Mission | undefined {
  return missions.find(m => m.id === id);
}

export function getUnlockedMissions(): Mission[] {
  return missions.filter(m => m.unlocked);
}
