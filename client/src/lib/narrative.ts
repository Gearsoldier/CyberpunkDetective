// Narrative structure for the GEARZ OSINT Detective story
// "The Neon Cross" - A cyber criminal syndicate story with biblical undertones

export interface Antagonist {
  id: string;
  codename: string;
  realName?: string; // Revealed progressively
  role: string;
  tier: "pawn" | "general" | "lieutenant" | "leader";
  description: string;
  backstory: string;
  scriptureTheme?: string; // Biblical parallel
}

export interface Act {
  number: number;
  title: string;
  description: string;
  missionRange: [number, number]; // Start and end mission IDs
  theme: string;
  scriptureVerse?: string;
}

// The story unfolds across three acts
export const acts: Act[] = [
  {
    number: 1,
    title: "The Pawns",
    description: "A series of coordinated cyber attacks leads you to a shadowy network. Every thread you pull reveals deeper connections. Your mission: identify the foot soldiers and trace their commanders.",
    missionRange: [1, 8],
    theme: "Discovery and Foundation",
    scriptureVerse: "Seek and you shall find; knock and the door will be opened. (Matthew 7:7)"
  },
  {
    number: 2,
    title: "The Generals",
    description: "The operatives were merely pawns. Now you face the commanders - brilliant tacticians coordinating global operations. Each general controls a different arm of the syndicate. Expose them all.",
    missionRange: [9, 18],
    theme: "Strategy and Revelation",
    scriptureVerse: "The truth will set you free. (John 8:32)"
  },
  {
    number: 3,
    title: "The Shepherd's Shadow",
    description: "You've dismantled their army and exposed their generals. Now comes the final confrontation with The Shepherd - the mastermind who calls himself Abaddon. He's been watching you. He knows your methods. This ends now.",
    missionRange: [19, 25],
    theme: "Truth and Justice",
    scriptureVerse: "Be strong and courageous. Do not be afraid; do not be discouraged. (Joshua 1:9)"
  }
];

// Gang hierarchy - The Neon Cross syndicate
export const antagonists: Record<string, Antagonist> = {
  // Act 1: The Pawns (Missions 1-8)
  "ghost_trader": {
    id: "ghost_trader",
    codename: "GhostTrader",
    role: "Dark Web Merchant",
    tier: "pawn",
    description: "A data broker selling stolen credentials on hidden marketplaces.",
    backstory: "Started as a petty scammer, now moving stolen data for the syndicate.",
    scriptureTheme: "The love of money is the root of all evil"
  },
  "pixel_phantom": {
    id: "pixel_phantom",
    codename: "PixelPhantom",
    role: "Social Engineer",
    tier: "pawn",
    description: "Master of deception, crafting convincing fake identities to infiltrate organizations.",
    backstory: "Former graphic designer turned digital impersonator.",
    scriptureTheme: "Wolves in sheep's clothing"
  },
  "data_leech": {
    id: "data_leech",
    codename: "DataLeech",
    role: "Credential Harvester",
    tier: "pawn",
    description: "Operates phishing campaigns and credential stuffing attacks.",
    backstory: "Automated their crimes, harvesting thousands of accounts daily.",
    scriptureTheme: "Thieves who break in and steal"
  },
  "shadow_courier": {
    id: "shadow_courier",
    codename: "ShadowCourier",
    role: "Money Mule Coordinator",
    tier: "pawn",
    description: "Launders cryptocurrency through complex chains of transactions.",
    backstory: "Recruited desperate individuals to move dirty money.",
    scriptureTheme: "Mammon - the false god of wealth"
  },
  "signal_jammer": {
    id: "signal_jammer",
    codename: "SignalJammer",
    role: "Communication Disruptor",
    tier: "pawn",
    description: "Spreads disinformation and disrupts emergency communications.",
    backstory: "Uses chaos as cover for larger operations.",
    scriptureTheme: "The father of lies"
  },
  "crypto_viper": {
    id: "crypto_viper",
    codename: "CryptoViper",
    role: "Ransomware Operator",
    tier: "pawn",
    description: "Deploys ransomware against small businesses and hospitals.",
    backstory: "No mercy, only profit. Targets the vulnerable.",
    scriptureTheme: "Oppression of the weak"
  },
  "metadata_maven": {
    id: "metadata_maven",
    codename: "MetadataMaven",
    role: "Digital Stalker",
    tier: "pawn",
    description: "Harvests metadata from public sources to dox targets.",
    backstory: "Turned OSINT skills toward malicious ends.",
    scriptureTheme: "Invasion of privacy"
  },
  "cert_thief": {
    id: "cert_thief",
    codename: "CertThief",
    role: "Certificate Forger",
    tier: "pawn",
    description: "Creates fraudulent SSL certificates for phishing sites.",
    backstory: "Makes fake sites look legitimate, deceiving thousands.",
    scriptureTheme: "False witness"
  },

  // Act 2: The Generals (Missions 9-18)
  "iron_bishop": {
    id: "iron_bishop",
    codename: "IronBishop",
    realName: "Unknown",
    role: "Infrastructure Commander",
    tier: "general",
    description: "Controls the technical infrastructure - servers, domains, and network architecture for the entire syndicate.",
    backstory: "Former systems administrator who built an empire in the shadows.",
    scriptureTheme: "Building on sand vs. rock - false foundations"
  },
  "crimson_oracle": {
    id: "crimson_oracle",
    codename: "CrimsonOracle",
    role: "Intelligence Director",
    tier: "general",
    description: "Gathers intelligence on targets, law enforcement, and competitors. Always two steps ahead.",
    backstory: "Ex-intelligence analyst who sold out for power.",
    scriptureTheme: "Knowledge without wisdom"
  },
  "mercury_hand": {
    id: "mercury_hand",
    codename: "MercuryHand",
    role: "Operations General",
    tier: "general",
    description: "Coordinates day-to-day criminal operations across continents.",
    backstory: "Masterful organizer with a ruthless efficiency.",
    scriptureTheme: "The right hand not knowing what the left hand does - deception"
  },
  "void_marshal": {
    id: "void_marshal",
    codename: "VoidMarshal",
    role: "Enforcement Chief",
    tier: "general",
    description: "Handles 'problems' - whistleblowers, rivals, and anyone who gets too close.",
    backstory: "Feared by all, questioned by none.",
    scriptureTheme: "Those who live by the sword"
  },
  "silver_tongue": {
    id: "silver_tongue",
    codename: "SilverTongue",
    role: "Recruitment & Propaganda",
    tier: "general",
    description: "Recruits new members and spreads the syndicate's ideology.",
    backstory: "Charismatic leader who twists truth into lies.",
    scriptureTheme: "False prophets"
  },

  // Act 3: Inner Circle & The Leader (Missions 19-25)
  "judas_protocol": {
    id: "judas_protocol",
    codename: "JudasProtocol",
    realName: "Classified",
    role: "Chief Betrayer",
    tier: "lieutenant",
    description: "Plants moles in law enforcement and rival organizations. Trust no one.",
    backstory: "Turned betrayal into an art form. Everyone has a price.",
    scriptureTheme: "Judas - the ultimate betrayal"
  },
  "seven_seals": {
    id: "seven_seals",
    codename: "SevenSeals",
    role: "Cryptography Master",
    tier: "lieutenant",
    description: "Creates unbreakable codes and protects the syndicate's communications.",
    backstory: "Genius mathematician who sealed their secrets away.",
    scriptureTheme: "The seven seals - hidden mysteries"
  },
  "lazarus_node": {
    id: "lazarus_node",
    codename: "LazarusNode",
    role: "Resurrection Specialist",
    tier: "lieutenant",
    description: "Rebuilds operations after they've been taken down. They always come back.",
    backstory: "No matter how many times you shut them down, they rise again.",
    scriptureTheme: "Lazarus - rising from death"
  },
  "abaddon": {
    id: "abaddon",
    codename: "The Shepherd / Abaddon",
    realName: "???",
    role: "Supreme Leader",
    tier: "leader",
    description: "The mastermind behind The Neon Cross. Calls himself The Shepherd, but his true name is Abaddon - the Destroyer. Believes he's bringing justice through chaos. You are his greatest challenge yet.",
    backstory: "A brilliant mind corrupted by power. Sees himself as a prophet exposing society's corruption, but has become the very evil he claimed to fight. He's been watching your progress. This is personal.",
    scriptureTheme: "Abaddon - the angel of the abyss, the Destroyer (Revelation 9:11). The shepherd who leads the flock astray."
  }
};

// Narrative beats that play between missions
export const narrativeBeats: Record<number, string> = {
  1: "Your first case. A simple phishing operation. Or so it seems...",
  8: "Every criminal you've caught points to the same syndicate: The Neon Cross. The pattern is clear now.",
  9: "You've proven yourself. Now the real work begins. Time to hunt the generals.",
  15: "The generals are falling. But someone is always one step ahead, covering their tracks.",
  18: "The infrastructure is crumbling. Only the inner circle remains. And him.",
  19: "You've received an encrypted message: 'Congratulations, Detective. You've done well. But can you find ME? - The Shepherd'",
  24: "One more layer. One more deception. Then you'll finally meet The Shepherd face to face.",
  25: "This is it. The final confrontation. Everything you've learned has led to this moment. Seek the truth and set the captives free."
};

export function getAct(missionId: number): Act | undefined {
  return acts.find(act => 
    missionId >= act.missionRange[0] && missionId <= act.missionRange[1]
  );
}

export function getNarrativeBeat(missionId: number): string | undefined {
  return narrativeBeats[missionId];
}

export function getAntagonist(antagonistId: string): Antagonist | undefined {
  return antagonists[antagonistId];
}
