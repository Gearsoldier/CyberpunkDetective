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
    reverseDNS: "example-vps.digitalocean.com"
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
...

[Additional 7 accounts redacted]`
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
    snippet: `No search results found for "${query}". Try different keywords.`
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
