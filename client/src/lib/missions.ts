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
  },
  {
    id: 11,
    title: "Certificate Transparency Hunt",
    brief: "A target organization 'quantumtech.io' has been rapidly expanding its infrastructure. Use Certificate Transparency logs to discover all their SSL certificates and subdomains. This reveals their entire web presence including hidden services and development environments.",
    difficulty: "expert",
    tools: ["search"],
    solution: {
      subdomains_found: "23",
      wildcard_certs: "yes",
      cdn_provider: "Cloudflare"
    },
    explanation: "Certificate Transparency (CT) logs are public records of all SSL/TLS certificates issued. They're a goldmine for subdomain enumeration because every HTTPS-enabled service must have a certificate. Search 'site:crt.sh quantumtech.io' or use specialized CT log viewers to discover the full attack surface.",
    hints: {
      beginner: [
        "Search for: site:crt.sh quantumtech.io",
        "Certificate logs reveal all subdomains with HTTPS",
        "Look for patterns in subdomain naming"
      ],
      expert: ["Identify wildcard certificates and shared infrastructure"]
    },
    minLevel: 8,
    xpReward: 550
  },
  {
    id: 12,
    title: "Breach Database Investigation",
    brief: "Intelligence indicates that employees from 'techventures.com' may have had their credentials exposed in recent data breaches. Search breach databases and paste sites to identify compromised accounts. Document usernames, breach dates, and associated services.",
    difficulty: "expert",
    tools: ["pastebin", "search"],
    solution: {
      breached_accounts: "8",
      breach_date: "2023-Q2",
      services: "LinkedIn, Adobe, Dropbox"
    },
    explanation: "Breach databases like Have I Been Pwned track credential leaks across hundreds of data breaches. OSINT investigators monitor these for corporate exposure. Even old breaches matter - people reuse passwords. Use Google dorks 'site:pastebin.com @techventures.com password' to find leaked credentials.",
    hints: {
      beginner: [
        "Search pastebin for email patterns",
        "Look for dumps containing company domain",
        "Document the breach source and date"
      ],
      expert: ["Correlate breaches across multiple paste sites and forums"]
    },
    minLevel: 9,
    xpReward: 600
  },
  {
    id: 13,
    title: "Social Media Archaeology",
    brief: "A person of interest deleted their social media presence, but the internet never forgets. Use archive sites and cached search results to recover deleted posts, profile information, and connections from the username 'gh0st_trader_2019'. Reconstruct their digital timeline.",
    difficulty: "expert",
    tools: ["search"],
    solution: {
      archived_posts: "found",
      real_name: "identified",
      connections: "cryptocurrency trading group"
    },
    explanation: "The Internet Archive (Wayback Machine) and Google's cache preserve deleted content. Search 'cache:username' or 'site:archive.org username' to find removed posts. Deleted doesn't mean gone - cached pages, screenshots, and archives persist for years. This technique is crucial for attribution and background investigations.",
    hints: {
      beginner: [
        "Search: site:archive.org gh0st_trader_2019",
        "Try Google cache for recent deletions",
        "Look for mentions of the username on other sites"
      ],
      expert: ["Cross-reference multiple archive sources and timestamps"]
    },
    minLevel: 10,
    xpReward: 650
  },
  {
    id: 14,
    title: "Tracking the Dark Web Footprint",
    brief: "A threat actor is operating on both clear web and dark web forums. You've found their handle 'CipherPhantom' on a public paste site. Search for their activity patterns, cryptocurrency addresses, and operational security mistakes that could reveal their identity or location.",
    difficulty: "expert",
    tools: ["search", "pastebin"],
    solution: {
      bitcoin_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      timezone: "UTC+3",
      opsec_failure: "reused email pattern"
    },
    explanation: "Threat actors often reuse usernames, crypto addresses, and PGP keys across platforms. These unique identifiers create attribution trails. Analyze posting times for timezone inference, search for address reuse in blockchain explorers, and look for OPSEC failures like reused emails or metadata leaks. One mistake can compromise years of anonymity.",
    hints: {
      beginner: [
        "Search for the username across multiple platforms",
        "Bitcoin addresses are unique identifiers",
        "Posting patterns reveal timezone and habits"
      ],
      expert: ["Build a correlation map of all digital artifacts"]
    },
    minLevel: 11,
    xpReward: 700
  },
  {
    id: 15,
    title: "The Attribution Chain",
    brief: "ULTIMATE CHALLENGE: You've intercepted communications about a planned cyberattack. Using a single email address 'operations@zephyr-tech.net', build a complete intelligence profile: 1) Domain infrastructure, 2) Associated accounts across platforms, 3) Breach exposure, 4) Geographic indicators, 5) Threat actor attribution. This is professional-grade threat intelligence work.",
    difficulty: "expert",
    tools: ["whois", "search", "metadata", "pastebin"],
    solution: {
      domain_registrar: "Namecheap",
      hosting_country: "Romania",
      associated_breaches: "2",
      linked_social_accounts: "4",
      threat_group: "FIN7"
    },
    explanation: "Professional threat intelligence combines all OSINT disciplines into comprehensive attribution. Start with domain WHOIS, pivot to associated infrastructure, search for credential leaks, analyze social media presence, correlate posting patterns, and build a timeline. The goal is answering: WHO, WHAT, WHERE, WHEN, WHY. This capstone mission tests everything you've learned.",
    hints: {
      beginner: [
        "Start with WHOIS on the domain",
        "Search the email across all platforms",
        "Document every finding with timestamps",
        "Look for patterns connecting different data points"
      ],
      expert: ["Build a complete threat actor profile with high confidence attribution"]
    },
    minLevel: 12,
    xpReward: 1000
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
