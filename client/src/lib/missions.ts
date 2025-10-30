import type { Mission } from "@shared/schema";

// GEARZ OSINT Detective: The Complete 25-Mission Campaign
// "The Neon Cross" - Track a cyber criminal syndicate from pawns to the mastermind
// Subtle biblical themes woven throughout the investigation

export const missions: Mission[] = [
  // ========================================
  // ACT 1: THE PAWNS (Missions 1-8)
  // Teaching fundamentals while uncovering the network
  // ========================================
  
  {
    id: 1,
    title: "Operation First Light",
    brief: "A phishing campaign targeting small businesses has been detected. The domain 'sunrise-corp.io' is suspected. This is your first case. Investigate the domain registration and find who's behind it. Remember: 'Seek and you shall find.'",
    difficulty: "beginner",
    tools: ["search", "whois"],
    solution: {
      registered: "2023",
      organization: "Sunrise Holdings LTD",
      registrant: "GhostTrader"
    },
    explanation: "WHOIS data reveals domain ownership. This wasn't random - GhostTrader is selling stolen credentials. You've found your first thread. Pull it and see where it leads.",
    hints: {
      beginner: [
        "Use WHOIS tool with 'sunrise-corp.io'",
        "Check the registration date - new domains often indicate phishing",
        "Note the registrant organization name"
      ],
      expert: ["Cross-reference with breach databases"]
    },
    minLevel: 1,
    xpReward: 100,
    act: 1,
    antagonistId: "ghost_trader",
    narrativeBeat: "Your journey begins. Every investigation starts with a single thread.",
    scriptureHint: "Matthew 7:7 - Seek and you shall find"
  },
  
  {
    id: 2,
    title: "Case: Hidden Witness",
    brief: "An anonymous tip included a photo 'evidence.jpg' claiming to show a meeting between criminals. The image metadata might reveal when and where this photo was taken. Extract the GPS coordinates and camera data. Truth hides in plain sight.",
    difficulty: "beginner",
    tools: ["metadata"],
    solution: {
      latitude: "37.7749",
      longitude: "-122.4194",
      camera: "Canon EOS 5D",
      timestamp: "2023-08-15"
    },
    explanation: "Metadata tells stories that criminals forget to erase. This photo links back to PixelPhantom - a social engineer who crafts elaborate deceptions. The GPS coordinates point to a known dead drop location.",
    hints: {
      beginner: [
        "Use metadata tool on 'evidence.jpg'",
        "GPS coordinates reveal the exact location",
        "Camera model can verify authenticity"
      ],
      expert: ["Check if the timestamp aligns with other intelligence"]
    },
    minLevel: 1,
    xpReward: 100,
    act: 1,
    antagonistId: "pixel_phantom",
    scriptureHint: "Luke 12:2 - Nothing is concealed that will not be revealed"
  },

  {
    id: 3,
    title: "Operation Google Shepherd",
    brief: "MegaCorp accidentally exposed internal documents. Use advanced search operators (Google dorking) to find PDFs and Excel files from 'megacorp.com'. These documents might contain evidence of the breach. Remember: knowledge can be found by those who search diligently.",
    difficulty: "beginner",
    tools: ["search"],
    solution: {
      technique: "site:megacorp.com filetype:pdf",
      files_found: "classified",
      breach_evidence: "confirmed"
    },
    explanation: "Google dorking revealed how DataLeech gained access - exposed configuration files. The criminals hide in plain sight, using public search engines to find their prey. Ironic, isn't it?",
    hints: {
      beginner: [
        "Try: site:megacorp.com filetype:pdf",
        "Look for sensitive documents in results",
        "Common formats: pdf, xls, doc, conf"
      ],
      expert: ["Combine multiple operators for precision"]
    },
    minLevel: 1,
    xpReward: 150,
    act: 1,
    antagonistId: "data_leech",
    scriptureHint: "Proverbs 2:4-5 - Seek wisdom like silver, search for it like hidden treasure"
  },

  {
    id: 4,
    title: "The Betrayed Trust",
    brief: "Employee credentials from MegaCorp surfaced on a paste site. Find paste ID 'a7f3k9m2' containing email addresses from megacorp.com. Count the exposed credentials. These people trusted their employer to protect them. That trust was betrayed.",
    difficulty: "intermediate",
    tools: ["pastebin", "search"],
    solution: {
      emails_found: "30",
      paste_id: "a7f3k9m2",
      domain: "megacorp.com",
      uploader: "DataLeech"
    },
    explanation: "Thirty pieces of silver... I mean, thirty stolen credentials. DataLeech harvests data without mercy. These aren't just numbers - they're people whose lives are now at risk. Your mission: stop this from happening to others.",
    hints: {
      beginner: [
        "Use pastebin tool with ID 'a7f3k9m2'",
        "Count all email addresses carefully",
        "Note who uploaded this data"
      ],
      expert: ["Search for related pastes to find the full scope"]
    },
    minLevel: 1,
    xpReward: 200,
    act: 1,
    antagonistId: "data_leech",
    scriptureHint: "Matthew 26:15 - The price of betrayal"
  },

  {
    id: 5,
    title: "Shadow Infrastructure",
    brief: "IP address 45.33.32.156 is linked to command-and-control servers. Use WHOIS and search to identify the hosting provider, location, and associated domains. Map out this dark infrastructure. Even shadows can't hide from light.",
    difficulty: "intermediate",
    tools: ["whois", "search"],
    solution: {
      hosting: "DigitalOcean",
      country: "Netherlands",
      associated_domains: "5",
      operator: "ShadowCourier"
    },
    explanation: "Bulletproof hosting in the Netherlands - a classic money laundering setup. ShadowCourier uses these servers to coordinate cryptocurrency movements. The infrastructure isn't random; it's deliberately distributed to avoid detection. But you found it.",
    hints: {
      beginner: [
        "WHOIS lookup on 45.33.32.156",
        "Organization field shows hosting provider",
        "Search the IP to find linked domains"
      ],
      expert: ["Check the ASN for IP range patterns"]
    },
    minLevel: 1,
    xpReward: 250,
    act: 1,
    antagonistId: "shadow_courier",
    scriptureHint: "Ephesians 5:11 - Expose the deeds done in darkness"
  },

  {
    id: 6,
    title: "Case: False Signals",
    brief: "Someone is spreading disinformation about emergency services during a crisis. DNS records for 'emergencyalert.net' might reveal the truth. Check the DNS history and current records. Truth matters, especially when lives are at stake.",
    difficulty: "intermediate",
    tools: ["dns", "search"],
    solution: {
      nameserver: "malicious-ns.com",
      redirect_ip: "45.33.32.156",
      operator: "SignalJammer",
      purpose: "disinformation"
    },
    explanation: "SignalJammer redirects emergency communications to fake sites, spreading chaos and panic. These aren't just technical attacks - they're attacks on truth itself. In times of crisis, lies can be deadly.",
    hints: {
      beginner: [
        "Check DNS records for emergencyalert.net",
        "Look for unusual name servers",
        "Note any IP redirections"
      ],
      expert: ["Compare current DNS with historical records"]
    },
    minLevel: 1,
    xpReward: 250,
    act: 1,
    antagonistId: "signal_jammer",
    scriptureHint: "John 8:44 - The father of lies"
  },

  {
    id: 7,
    title: "The Ransomed",
    brief: "A hospital was hit with ransomware. Analyze the attacker's email headers from 'ransom-demand@darkmail.to'. Trace the email path and identify the true origin. These criminals prey on the vulnerable and sick. No mercy.",
    difficulty: "intermediate",
    tools: ["email", "search"],
    solution: {
      origin_ip: "45.33.32.156",
      email_provider: "darkmail.to",
      attacker: "CryptoViper",
      targets: "hospitals"
    },
    explanation: "CryptoViper targets hospitals - places where lives hang in the balance. The ransom demand came through anonymized email, but the headers tell the truth. This isn't just crime; it's evil. Time to shut them down.",
    hints: {
      beginner: [
        "Analyze email headers for origin IP",
        "Check for anonymization services",
        "Note the email routing path"
      ],
      expert: ["Look for patterns in timing and infrastructure"]
    },
    minLevel: 1,
    xpReward: 300,
    act: 1,
    antagonistId: "crypto_viper",
    scriptureHint: "James 5:4 - The cries of the oppressed reach heaven"
  },

  {
    id: 8,
    title: "Operation Watchtower",
    brief: "You've dismantled the pawns, but they all point to something bigger. Analyze certificate transparency logs for '*.neoncross.net' to find all subdomains. This network is vast. Who's really in command? It's time to see the bigger picture.",
    difficulty: "advanced",
    tools: ["cert", "dns", "search"],
    solution: {
      subdomains: "infrastructure.neoncross.net, command.neoncross.net, recruit.neoncross.net",
      total_count: "12",
      organization: "The Neon Cross",
      next_tier: "generals"
    },
    explanation: "Certificate logs revealed the scope: The Neon Cross syndicate spans continents with military-grade organization. Each pawn you caught was coordinated by generals. Your investigation has just begun. Time to climb the ladder.",
    hints: {
      beginner: [
        "Search certificate transparency logs for neoncross.net",
        "List all discovered subdomains",
        "Count the total infrastructure"
      ],
      expert: ["Map the organizational structure from subdomain names"]
    },
    minLevel: 1,
    xpReward: 400,
    act: 1,
    antagonistId: "cert_thief",
    narrativeBeat: "The pattern is clear: every criminal you've caught is part of The Neon Cross. This is organized. Professional. Military. The generals are watching.",
    scriptureHint: "Habakkuk 2:1 - I will stand at my watch and see what He will say"
  },

  // ========================================
  // ACT 2: THE GENERALS (Missions 9-18)
  // Advanced techniques, multi-step investigations
  // ========================================

  {
    id: 9,
    title: "Operation Iron Foundation",
    brief: "IronBishop controls the technical infrastructure. Track down their server network by analyzing ASN data and IP ranges. Their entire operation relies on this foundation. Destroy it, and they crumble. Build on rock, not sand.",
    difficulty: "advanced",
    tools: ["whois", "dns", "search"],
    solution: {
      asn: "AS64512",
      ip_range: "45.33.32.0/24",
      server_count: "47",
      general: "IronBishop",
      weakness: "centralized_dns"
    },
    explanation: "IronBishop built an empire on bulletproof hosting and distributed servers. But even the strongest foundation has cracks. Their DNS infrastructure is centralized - one point of failure. That's your opening.",
    hints: {
      beginner: [
        "Look up ASN information for their network",
        "Map the IP range allocation",
        "Count servers in the infrastructure"
      ],
      expert: ["Identify the DNS chokepoint"]
    },
    minLevel: 1,
    xpReward: 450,
    act: 2,
    antagonistId: "iron_bishop",
    narrativeBeat: "You've proven yourself. The generals know your name now. Time to hunt them.",
    scriptureHint: "Matthew 7:24-27 - The house built on rock vs sand"
  },

  {
    id: 10,
    title: "The Oracle's Eyes",
    brief: "CrimsonOracle gathers intelligence on law enforcement. They know you're coming. Use OSINT to find their surveillance network before they find you. Check social media monitoring tools and data broker sites for YOUR information. Know your enemy.",
    difficulty: "advanced",
    tools: ["search", "breach"],
    solution: {
      surveillance_tools: "SocialEye, DataBrokerPro",
      your_exposure: "moderate",
      general: "CrimsonOracle",
      counter_intel: "operational security compromised"
    },
    explanation: "CrimsonOracle has been watching YOU. They know your methods, your patterns. This is personal now. Counter-surveillance is crucial - if they see you coming, they disappear. Time to turn the tables.",
    hints: {
      beginner: [
        "Search for surveillance tools targeting investigators",
        "Check what information is public about you",
        "Identify the intelligence gathering methods"
      ],
      expert: ["Use this knowledge to feed them false information"]
    },
    minLevel: 1,
    xpReward: 500,
    act: 2,
    antagonistId: "crimson_oracle",
    scriptureHint: "Proverbs 27:12 - The prudent see danger and take refuge"
  },

  {
    id: 11,
    title: "Mercury's Web",
    brief: "MercuryHand coordinates operations across time zones. Analyze leaked chat logs and timestamps to map their global network. Find the coordination hub. They move fast - you need to move faster. Time is not on your side.",
    difficulty: "advanced",
    tools: ["search", "metadata"],
    solution: {
      time_zones: "UTC, UTC+8, UTC-5",
      coordination_hub: "Singapore",
      general: "MercuryHand",
      operation_window: "02:00-04:00 UTC"
    },
    explanation: "MercuryHand uses time zones to their advantage - operations run 24/7 across the globe. But the coordination point is Singapore. That's where orders originate. That's where you strike.",
    hints: {
      beginner: [
        "Analyze chat timestamps for patterns",
        "Convert times to different zones",
        "Find where most activity originates"
      ],
      expert: ["Identify the command-and-control window"]
    },
    minLevel: 1,
    xpReward: 500,
    act: 2,
    antagonistId: "mercury_hand",
    scriptureHint: "Ecclesiastes 3:1 - There is a time for everything"
  },

  {
    id: 12,
    title: "Case: The Enforcer",
    brief: "VoidMarshal eliminates threats to the syndicate. A whistleblower went missing after contacting authorities. Their last known digital footprint was an encrypted message. Decrypt it using OSINT techniques. Find them before VoidMarshal does. Some shepherds devour their flock.",
    difficulty: "expert",
    tools: ["search", "email", "breach"],
    solution: {
      whistleblower_location: "Safe House Beta",
      threat_level: "Critical",
      general: "VoidMarshal",
      encryption_key: "base64_encoded",
      time_remaining: "48 hours"
    },
    explanation: "You decrypted the message: 'They found me. Safe House Beta compromised. VoidMarshal coming.' You managed to extract the whistleblower just in time. VoidMarshal arrived 2 hours later. This was close. Too close.",
    hints: {
      beginner: [
        "Look for common encryption patterns",
        "Check for base64 encoding",
        "Cross-reference safe house locations"
      ],
      expert: ["Time is critical - work backwards from the threat"]
    },
    minLevel: 1,
    xpReward: 600,
    act: 2,
    antagonistId: "void_marshal",
    scriptureHint: "Ezekiel 34:2-3 - Woe to the shepherds who devour the flock"
  },

  {
    id: 13,
    title: "Silver Tongued Serpent",
    brief: "SilverTongue recruits for The Neon Cross using social engineering and propaganda. Analyze their recruitment posts on dark web forums. Identify the psychological tactics, target demographics, and messaging patterns. Stop the recruitment pipeline.",
    difficulty: "expert",
    tools: ["search", "pastebin"],
    solution: {
      recruitment_sites: "darkforum.onion, cryptoanarchy.net",
      target_demo: "disillusioned youth, hacktivists",
      general: "SilverTongue",
      messaging: "false_prophet_tactics",
      conversion_rate: "12%"
    },
    explanation: "SilverTongue preys on the vulnerable - promising purpose, belonging, and justice. But it's all lies. They're recruiting soldiers for a criminal empire, wrapping it in revolutionary rhetoric. False prophets always sound convincing. Your analysis exposed their tactics.",
    hints: {
      beginner: [
        "Search dark web recruitment forums",
        "Analyze the messaging and promises",
        "Identify who they're targeting"
      ],
      expert: ["Study the psychological manipulation techniques"]
    },
    minLevel: 1,
    xpReward: 600,
    act: 2,
    antagonistId: "silver_tongue",
    scriptureHint: "Matthew 7:15 - Beware of false prophets in sheep's clothing"
  },

  {
    id: 14,
    title: "Operation Cross-Reference",
    brief: "You've gathered intelligence on multiple generals. Now correlate the data: infrastructure (IronBishop), surveillance (CrimsonOracle), operations (MercuryHand), enforcement (VoidMarshal), and recruitment (SilverTongue). Find the connection point. Who coordinates them all?",
    difficulty: "expert",
    tools: ["search", "dns", "cert"],
    solution: {
      coordination_server: "inner.neoncross.net",
      access_level: "lieutenant-only",
      generals_reporting_to: "inner_circle",
      evidence: "command_structure_confirmed"
    },
    explanation: "All generals report to the same server: inner.neoncross.net. Access restricted to lieutenants and above. The hierarchy is clear now. Above the generals sits an inner circle. And above them... The Shepherd.",
    hints: {
      beginner: [
        "Look for common infrastructure across all generals",
        "Check DNS records for coordination servers",
        "Map the command structure"
      ],
      expert: ["Certificate logs will show the full hierarchy"]
    },
    minLevel: 1,
    xpReward: 700,
    act: 2,
    antagonistId: "iron_bishop",
    scriptureHint: "1 Corinthians 14:33 - God is not a God of confusion but of order"
  },

  {
    id: 15,
    title: "The Mole Hunt",
    brief: "One of the generals is leaking information. Not to you - to a rival syndicate. Use traffic analysis and communication patterns to identify which general is the traitor. Trust no one. Even among thieves, there's treachery.",
    difficulty: "expert",
    tools: ["search", "email", "dns"],
    solution: {
      traitor: "MercuryHand",
      rival_syndicate: "The Red Hand",
      communication_method: "steganography",
      motivation: "power_play",
      evidence_location: "hidden_in_images"
    },
    explanation: "MercuryHand was playing both sides. Hidden messages in image metadata revealed communications with The Red Hand. But this betrayal wasn't about money - it was about power. They wanted to overthrow The Shepherd. Too bad you found them first.",
    hints: {
      beginner: [
        "Analyze communication patterns for anomalies",
        "Check for unusual data transfers",
        "Look for steganography in shared files"
      ],
      expert: ["The traitor will have two separate communication channels"]
    },
    minLevel: 1,
    xpReward: 700,
    act: 2,
    antagonistId: "mercury_hand",
    narrativeBeat: "The generals are falling. But someone is always watching, staying one step ahead.",
    scriptureHint: "Mark 3:25 - A house divided against itself cannot stand"
  },

  {
    id: 16,
    title: "Operation Firewall Down",
    brief: "IronBishop's infrastructure is crumbling. They're trying to rebuild. Block their DNS propagation by identifying their new nameservers and reporting them. Cut off the head of their technical operations. No foundation, no empire.",
    difficulty: "expert",
    tools: ["dns", "whois", "search"],
    solution: {
      new_nameservers: "ns1.backup-iron.net, ns2.backup-iron.net",
      registrar: "NameCheap",
      report_submitted: "abuse@namecheap.com",
      general: "IronBishop",
      status: "infrastructure_destroyed"
    },
    explanation: "You identified and reported their new nameservers before they could propagate. IronBishop's entire infrastructure collapsed. Servers offline. Operations halted. The technical foundation of The Neon Cross is shattered. One general down.",
    hints: {
      beginner: [
        "Find their new DNS infrastructure",
        "Identify the registrar",
        "Report to abuse contacts"
      ],
      expert: ["Act fast - DNS changes propagate quickly"]
    },
    minLevel: 1,
    xpReward: 800,
    act: 2,
    antagonistId: "iron_bishop",
    scriptureHint: "Matthew 7:27 - When the foundation fails, great is the fall"
  },

  {
    id: 17,
    title: "The Oracle Falls",
    brief: "CrimsonOracle's surveillance network gave them power. But surveillance is a two-edged sword. Use their own tools against them. Access their intelligence gathering logs and expose their methods publicly. Let them feel what it's like to be watched.",
    difficulty: "expert",
    tools: ["search", "breach", "pastebin"],
    solution: {
      oracle_database: "intel-db.neoncross.net",
      records_exposed: "10,000+",
      methods_revealed: "social_media_monitoring, data_brokers, OSINT",
      general: "CrimsonOracle",
      status: "credibility_destroyed"
    },
    explanation: "You leaked their entire intelligence database. CrimsonOracle is blind now. Worse - the people they were surveilling know. Their sources are compromised. Their methods exposed. The Oracle who saw everything can see nothing now. Poetic justice.",
    hints: {
      beginner: [
        "Find their intelligence database",
        "Extract and document their methods",
        "Publish the findings publicly"
      ],
      expert: ["Use paste sites and media outlets for maximum exposure"]
    },
    minLevel: 1,
    xpReward: 800,
    act: 2,
    antagonistId: "crimson_oracle",
    scriptureHint: "Luke 8:17 - Nothing hidden that will not be disclosed"
  },

  {
    id: 18,
    title: "Operation Shepherd's Warning",
    brief: "You've dismantled the generals. But victory comes with a price. You've received an encrypted message from The Shepherd himself. Decrypt it using everything you've learned. This is his warning. His challenge. His invitation to the endgame.",
    difficulty: "expert",
    tools: ["search", "cert", "breach"],
    solution: {
      message_decoded: "Congratulations, Detective. You've proven worthy. But can you find ME?",
      signature: "The Shepherd - Abaddon",
      challenge_accepted: "true",
      next_phase: "inner_circle",
      warning: "he_knows_you"
    },
    explanation: "The message decoded: 'Well done, Detective. You've broken my army and exposed my generals. Impressive. But they were expendable. Now comes the real test. My inner circle protects me. Can you breach it? Or will you become another lost sheep? - The Shepherd.' It's signed: Abaddon. This is personal now.",
    hints: {
      beginner: [
        "Use all OSINT techniques learned so far",
        "Look for patterns in previous encrypted messages",
        "The key is in the signature"
      ],
      expert: ["The Shepherd wants you to find him. Question why."]
    },
    minLevel: 1,
    xpReward: 900,
    act: 2,
    narrativeBeat: "The infrastructure is down. The generals are finished. Only the inner circle remains between you and The Shepherd. He's watching. He's waiting. This is what he wanted all along.",
    scriptureHint: "Revelation 9:11 - Abaddon, the Destroyer"
  },

  // ========================================
  // ACT 3: THE SHEPHERD'S SHADOW (Missions 19-25)
  // Master-level investigations, final confrontation
  // ========================================

  {
    id: 19,
    title: "The Judas Protocol",
    brief: "JudasProtocol infiltrates organizations by planting moles. A law enforcement agency has been compromised. Use OSINT to identify the insider before they leak your investigation. Trust is a luxury you can't afford. Betrayal has a price.",
    difficulty: "expert",
    tools: ["search", "email", "breach"],
    solution: {
      mole_identified: "Agent Martinez",
      department: "Cyber Crimes Division",
      evidence: "leaked_case_files",
      handler: "JudasProtocol",
      compensation: "cryptocurrency_payments"
    },
    explanation: "Agent Martinez sold out for cryptocurrency. Case files, investigation plans, your identity - all leaked to JudasProtocol. The betrayal runs deep. You caught them just before they could warn The Shepherd of your next move. Trust no one.",
    hints: {
      beginner: [
        "Look for unusual access patterns in case files",
        "Check for cryptocurrency transactions",
        "Analyze communication timing"
      ],
      expert: ["The mole will access files they have no operational need for"]
    },
    minLevel: 1,
    xpReward: 1000,
    act: 3,
    antagonistId: "judas_protocol",
    narrativeBeat: "You've entered the inner circle's domain. These aren't just criminals - they're masters of their craft. Every move must be perfect.",
    scriptureHint: "John 13:27 - Then Satan entered Judas"
  },

  {
    id: 20,
    title: "The Seven Seals",
    brief: "SevenSeals protects The Shepherd's communications with military-grade encryption. But no code is unbreakable. Analyze their encryption patterns, find the implementation flaw, and decrypt the inner circle's recent communications. Break the seal.",
    difficulty: "expert",
    tools: ["search", "cert", "email"],
    solution: {
      encryption_type: "AES-256 with custom key derivation",
      implementation_flaw: "timestamp_based_seed",
      decrypted_messages: "operational_plans",
      lieutenant: "SevenSeals",
      revelation: "shepherd_location_hint"
    },
    explanation: "Even the best encryption has weaknesses. SevenSeals used timestamps for key derivation - elegant but flawed. You cracked it. The communications revealed operational plans and a crucial detail: The Shepherd operates from 'Sanctuary-7'. Location still unknown, but you're getting closer.",
    hints: {
      beginner: [
        "Analyze the encryption implementation",
        "Look for pattern-based key generation",
        "Check for timestamp dependencies"
      ],
      expert: ["Military-grade doesn't mean perfect - find the human error"]
    },
    minLevel: 1,
    xpReward: 1000,
    act: 3,
    antagonistId: "seven_seals",
    scriptureHint: "Revelation 5:5 - The Lion has triumphed to open the seals"
  },

  {
    id: 21,
    title: "Operation Lazarus",
    brief: "You've shut down their operations multiple times. They keep coming back. LazarusNode rebuilds everything. Find their backup infrastructure, recovery protocols, and offline storage. This time, make sure they stay down. No more resurrections.",
    difficulty: "expert",
    tools: ["search", "dns", "whois", "cert"],
    solution: {
      backup_locations: "3 continents, 7 data centers",
      recovery_protocol: "automated_resurrection",
      offline_storage: "cold_wallets, encrypted_drives",
      lieutenant: "LazarusNode",
      destruction_method: "simultaneous_takedown"
    },
    explanation: "LazarusNode built redundancy into everything - backup servers across three continents, automated recovery scripts, offline storage. But you mapped it all. Law enforcement coordinated simultaneous raids. Seven data centers seized. Cold wallets frozen. This time, there's no coming back from the dead.",
    hints: {
      beginner: [
        "Map all backup infrastructure",
        "Identify recovery automation",
        "Find offline storage locations"
      ],
      expert: ["Simultaneous action required - they can't rebuild if everything falls at once"]
    },
    minLevel: 1,
    xpReward: 1100,
    act: 3,
    antagonistId: "lazarus_node",
    scriptureHint: "John 11:43-44 - Lazarus rose, but not all resurrections are divine"
  },

  {
    id: 22,
    title: "The Inner Circle Crumbles",
    brief: "JudasProtocol, SevenSeals, and LazarusNode are finished. But The Shepherd had contingencies. Analyze the power vacuum. Who's trying to take control? Who's loyal to the end? Who's running? The final confrontation is coming. Are you ready?",
    difficulty: "expert",
    tools: ["search", "breach", "email", "dns"],
    solution: {
      loyalists: "3 unknown operatives",
      deserters: "12 mid-level members",
      power_grab: "none - Shepherd maintains control",
      shepherd_message: "Come find me, Detective",
      location_clue: "Sanctuary-7 coordinates unlocked"
    },
    explanation: "The inner circle fell, but The Shepherd's grip is iron. No power grabs. No chaos. Just three unknown loyalists and a message for you: 'Impressive work, Detective. You've dismantled my empire piece by piece. Now comes the final test. Sanctuary-7 awaits. Come alone, or don't come at all. - The Shepherd.' The coordinates are encoded in his message. He WANTS you to find him.",
    hints: {
      beginner: [
        "Monitor communications for power struggles",
        "Track who remains loyal",
        "Decode the Shepherd's message"
      ],
      expert: ["This is a trap. But it's also your only chance."]
    },
    minLevel: 1,
    xpReward: 1200,
    act: 3,
    narrativeBeat: "The inner circle is broken. All that remains is The Shepherd himself. He's been watching your entire investigation. He knows every move you've made. And now he's inviting you to face him. This ends where it began: with a choice.",
    scriptureHint: "Matthew 26:31 - The sheep will be scattered when the shepherd is struck"
  },

  {
    id: 23,
    title: "Sanctuary-7 Located",
    brief: "You've decoded the coordinates: Sanctuary-7 is a private island compound. Use satellite imagery, ship tracking, and infrastructure analysis to map the entire facility. Know every entrance, every blind spot, every escape route. When you go in, there's no backup. Only you and him.",
    difficulty: "expert",
    tools: ["search", "metadata", "dns", "cert"],
    solution: {
      location: "Private island, coordinates 13.4443, 144.7937",
      facility_type: "Data center disguised as resort",
      entrances: "3 - main dock, helipad, service tunnel",
      security: "Advanced surveillance, armed guards",
      shepherd_presence: "Confirmed - 24/7 occupancy",
      weakness: "Service tunnel - minimal monitoring"
    },
    explanation: "Sanctuary-7 is a fortress. Private island in the Pacific, legitimate front as a tech retreat. But satellite imagery shows serious security infrastructure. The Shepherd lives there 24/7 - paranoid, prepared, waiting. The service tunnel is your best entry point. This is it. The final mission. Time to end this.",
    hints: {
      beginner: [
        "Use satellite imagery for facility layout",
        "Track supply ships for schedules",
        "Map all entry and exit points"
      ],
      expert: ["Find the weakness - every fortress has one"]
    },
    minLevel: 1,
    xpReward: 1300,
    act: 3,
    antagonistId: "abaddon",
    scriptureHint: "Psalm 91:1 - Dwelling in the shelter of the Most High"
  },

  {
    id: 24,
    title: "The Shepherd's True Face",
    brief: "You've infiltrated Sanctuary-7. One final OSINT task before the confrontation: Access The Shepherd's personal files. Find out WHO he really is, WHY he built this empire, and WHAT drives him. Know your enemy before you face him. The truth will shock you.",
    difficulty: "expert",
    tools: ["search", "breach", "metadata", "email"],
    solution: {
      real_name: "Dr. Elijah Cross",
      background: "Former FBI cyber division",
      motivation: "Revenge against corruption",
      ideology: "Destroy the corrupt system from within",
      victims: "Thousands",
      self_justification: "Necessary evil for greater good"
    },
    explanation: "The Shepherd's true identity: Dr. Elijah Cross, former FBI cyber division. He saw corruption at every level and snapped. Decided to become the very evil he once fought, justifying it as 'exposing' the broken system. He's not a criminal mastermind - he's a fallen guardian. A shepherd who devoured his flock. The worst kind of betrayal.",
    hints: {
      beginner: [
        "Access personal file servers",
        "Search for background records",
        "Read his manifesto and communications"
      ],
      expert: ["The truth is in what he tells himself, not what he tells others"]
    },
    minLevel: 1,
    xpReward: 1400,
    act: 3,
    antagonistId: "abaddon",
    narrativeBeat: "You know who he is now. Dr. Elijah Cross - a man who lost faith in justice and became a monster. The final confrontation is here. Face him. End this.",
    scriptureHint: "Ezekiel 34:10 - I am against the shepherds and will hold them accountable"
  },

  {
    id: 25,
    title: "Operation Shepherd's Fall",
    brief: "This is it. The final confrontation. Use every OSINT skill you've learned to compile the complete case against Dr. Elijah Cross / The Shepherd / Abaddon. Build an airtight digital evidence package: his identity, his crimes, his network, his victims. Make it so thorough that even he can't deny the truth. Then face him. End the investigation. Bring the shepherd to justice.",
    difficulty: "expert",
    tools: ["search", "whois", "dns", "email", "metadata", "breach", "cert", "pastebin"],
    solution: {
      evidence_package: "Complete - identity, crimes, victims, infrastructure",
      total_victims: "2,847 individuals, 134 organizations",
      financial_damage: "$487 million",
      confession: "Obtained through evidence confrontation",
      outcome: "Arrested - maximum security",
      legacy: "The Neon Cross dismantled completely",
      your_codename: "Vindicated",
      final_scripture: "The truth has set them free"
    },
    explanation: "You presented the evidence. Every victim. Every crime. Every lie. Dr. Elijah Cross - The Shepherd, Abaddon - sat in silence as the weight of his sins crashed down. 'I thought I was exposing corruption,' he finally said. 'I became worse than them.' He confessed everything. The Neon Cross is finished. 2,847 victims will see justice. You've completed the investigation. The case is closed. Well done, Detective. You sought truth and found it. You brought light to darkness. The shepherd has fallen. The flock is free.",
    hints: {
      beginner: [
        "Compile all evidence from previous missions",
        "Document every victim and crime",
        "Present irrefutable proof"
      ],
      expert: ["The truth itself is your greatest weapon"]
    },
    minLevel: 1,
    xpReward: 2000,
    act: 3,
    antagonistId: "abaddon",
    narrativeBeat: "Investigation complete. The Neon Cross is finished. The Shepherd is in custody. You did it. Through determination, skill, and the pursuit of truth, you brought justice to thousands of victims. This is what it means to be a detective. Remember: truth always wins in the end.",
    scriptureHint: "John 8:32 - You will know the truth, and the truth will set you free"
  }
];

// Adjust XP curve for 25 levels
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  // Progressive curve: early levels are achievable, later levels require dedication
  const baseXP = 150;
  const multiplier = 1.35;
  return Math.floor(baseXP * Math.pow(multiplier, level - 2));
}

// Calculate level from total XP
export function calculateLevel(xp: number): number {
  let level = 1;
  let xpRequired = 0;
  
  while (xp >= xpRequired + xpForLevel(level + 1)) {
    xpRequired += xpForLevel(level + 1);
    level++;
    if (level >= 25) break;
  }
  
  return Math.min(level, 25);
}
