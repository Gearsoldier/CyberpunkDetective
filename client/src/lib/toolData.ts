import type { ToolType } from "@shared/schema";

//todo: remove mock functionality
export const searchResults: Record<string, any[]> = {
  "sunrise-corp.io": [
    {
      title: "Sunrise Corp - Official Website",
      url: "https://sunrise-corp.io",
      snippet: "Welcome to Sunrise Corp. Premium business solutions for the digital age."
    },
    {
      title: "WHOIS sunrise-corp.io - DomainTools",
      url: "https://whois.domaintools.com/sunrise-corp.io",
      snippet: "Domain registration information for sunrise-corp.io. Registered 2023-11-15."
    },
    {
      title: "Sunrise Corp Reviews - TrustPilot",
      url: "https://trustpilot.com/sunrise-corp",
      snippet: "1.2 stars - Multiple reports of phishing attempts and fraudulent activity."
    }
  ],
  "megacorp.com": [
    {
      title: "Megacorp Official Site",
      url: "https://megacorp.com",
      snippet: "Leading enterprise solutions provider since 1995."
    },
    {
      title: "site:megacorp.com filetype:pdf - Exposed Documents",
      url: "https://megacorp.com/internal/confidential.pdf",
      snippet: "Quarterly financial report - CONFIDENTIAL - Q3 2024..."
    },
    {
      title: "Megacorp Employee Handbook (PDF)",
      url: "https://megacorp.com/docs/employee_handbook.pdf",
      snippet: "Internal policies and procedures for Megacorp employees..."
    }
  ],
  "megacorp.com leak": [
    {
      title: "Megacorp employee database leaked - Security News",
      url: "https://securitynews.io/megacorp-leak",
      snippet: "Major data breach exposes employee credentials..."
    },
    {
      title: "[LEAK] Megacorp.com emails - Pastebin",
      url: "https://pastebin.com/a7f3k9m2",
      snippet: "12 employee emails and passwords from megacorp.com domain..."
    }
  ],
  "45.33.32.156": [
    {
      title: "IP Lookup 45.33.32.156 - IPinfo",
      url: "https://ipinfo.io/45.33.32.156",
      snippet: "Location: Amsterdam, Netherlands. Hosting: DigitalOcean. ASN: AS14061"
    },
    {
      title: "Malicious activity from 45.33.32.156",
      url: "https://abuseipdb.com/check/45.33.32.156",
      snippet: "Reported for: SSH brute force, port scanning, malware distribution"
    },
    {
      title: "Reverse DNS: 45.33.32.156",
      url: "https://mxtoolbox.com/ptr/45.33.32.156",
      snippet: "PTR Record: malicious-server-01.digitalocean.com"
    }
  ],
  "CyberTech Solutions employees": [
    {
      title: "50+ CyberTech Solutions Employees on LinkedIn",
      url: "https://linkedin.com/company/cybertech-solutions",
      snippet: "Security engineers, penetration testers, and SOC analysts..."
    },
    {
      title: "CyberTech Solutions - Careers Page",
      url: "https://cybertech.com/careers",
      snippet: "We're hiring! Tech stack: AWS, Python, React, Kubernetes..."
    },
    {
      title: "CyberTech Solutions Security Team",
      url: "https://cybertech.com/about/team",
      snippet: "Led by CISO Jennifer Martinez, our team of 15 security professionals..."
    }
  ],
  "site:*.techcorp.com": [
    {
      title: "dev.techcorp.com - Development Environment",
      url: "https://dev.techcorp.com",
      snippet: "TechCorp internal development server - Login required"
    },
    {
      title: "api.techcorp.com - API Documentation",
      url: "https://api.techcorp.com/docs",
      snippet: "RESTful API endpoints for TechCorp services..."
    },
    {
      title: "staging.techcorp.com - Staging Environment",
      url: "https://staging.techcorp.com",
      snippet: "Pre-production testing environment (unsecured)"
    }
  ]
};

export const whoisData: Record<string, any> = {
  "sunrise-corp.io": {
    domain: "sunrise-corp.io",
    registrar: "Namecheap, Inc.",
    registrationDate: "2023-11-15",
    expirationDate: "2024-11-15",
    organization: "Sunrise Holdings LTD",
    registrantCountry: "Panama",
    nameservers: ["ns1.namecheap.com", "ns2.namecheap.com"],
    status: "clientTransferProhibited"
  },
  "45.33.32.156": {
    ip: "45.33.32.156",
    organization: "DigitalOcean, LLC",
    country: "Netherlands",
    city: "Amsterdam",
    asn: "AS14061",
    range: "45.33.0.0/16",
    reverseDNS: "malicious-server-01.digitalocean.com"
  },
  "techcorp.com": {
    domain: "techcorp.com",
    registrar: "GoDaddy",
    registrationDate: "2010-03-22",
    expirationDate: "2026-03-22",
    organization: "TechCorp Industries Inc.",
    registrantCountry: "United States",
    nameservers: ["ns-123.awsdns-01.com", "ns-456.awsdns-02.org"],
    status: "ok"
  }
};

export const metadataResults: Record<string, any> = {
  "suspicious_photo.jpg": {
    fileName: "suspicious_photo.jpg",
    fileSize: "2.4 MB",
    cameraMake: "Canon",
    cameraModel: "Canon EOS 5D Mark IV",
    dateTime: "2024:03:15 14:23:17",
    gpsLatitude: "37.7749° N",
    gpsLongitude: "122.4194° W",
    location: "San Francisco, CA, USA",
    software: "Adobe Photoshop 2023"
  },
  "leaked_screenshot.png": {
    fileName: "leaked_screenshot.png",
    fileSize: "1.1 MB",
    dateTime: "2024:10:20 09:15:42",
    gpsLatitude: "55.7558° N",
    gpsLongitude: "37.6173° E",
    location: "Moscow, Russia",
    software: "Windows Screenshot Tool"
  }
};

export const pastebinData: Record<string, any> = {
  "a7f3k9m2": {
    id: "a7f3k9m2",
    title: "[LEAK] Megacorp employee credentials",
    author: "Anonymous",
    date: "2024-10-18",
    content: `# Megacorp.com Employee Database Leak
# Found in unsecured S3 bucket
# 12 accounts total

admin@megacorp.com:P@ssw0rd123
john.doe@megacorp.com:Summer2024!
jane.smith@megacorp.com:MegaCorp#45
hr.manager@megacorp.com:HR2024secure
it.support@megacorp.com:ITdesk789
sarah.johnson@megacorp.com:Johnson!2024
mike.wilson@megacorp.com:Wilson@Mega
lisa.brown@megacorp.com:BrownL!st
david.garcia@megacorp.com:Garcia#Dev
emily.rodriguez@megacorp.com:EmRod2024!
james.martinez@megacorp.com:JMart!nez
anna.anderson@megacorp.com:And3rson!`
  }
};

export function performSearch(query: string): any[] {
  const lowerQuery = query.toLowerCase();
  for (const [key, results] of Object.entries(searchResults)) {
    if (lowerQuery.includes(key.toLowerCase())) {
      return results;
    }
  }
  return [{
    title: "No results found",
    url: "#",
    snippet: `No search results found for "${query}". Try different keywords or search operators.`
  }];
}

export function performWhoisLookup(domain: string): any {
  const lowerDomain = domain.toLowerCase().trim();
  return whoisData[lowerDomain] || {
    domain: lowerDomain,
    error: "Domain not found in database. This may be a non-existent or unregistered domain."
  };
}

export function analyzeMetadata(fileName: string): any {
  return metadataResults[fileName] || {
    fileName,
    error: "No metadata available for this file."
  };
}

export function searchPastebin(pasteId: string): any {
  return pastebinData[pasteId] || {
    id: pasteId,
    error: "Paste not found."
  };
}
