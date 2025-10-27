# GEARZ OSINT Detective - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Cyberpunk Gaming + Terminal Interface)

Drawing inspiration from cyberpunk games (Cyberpunk 2077, Deus Ex), terminal interfaces (Hack the Box, TryHackMe), and detective investigation boards. The aesthetic merges retro-futuristic terminals with modern web app usability, respecting the user's specified neon cyan + amber theme and glitchy HUD requirements.

**Core Principles:**
- Terminal authenticity with modern usability
- Information density without overwhelming
- Responsive across all devices (desktop, tablet, mobile)
- Immersive cyberpunk atmosphere

## Typography

**Font Families:**
- Primary (UI/Body): "Space Mono" or "Roboto Mono" (monospace for terminal feel)
- Accent (Headers/Missions): "Orbitron" or "Rajdhani" (cyberpunk sci-fi)
- System fallback: Courier New, monospace

**Hierarchy:**
- Mission Titles: 2xl to 3xl, uppercase, letter-spacing wide
- Section Headers: xl to 2xl, semi-bold
- Tool Labels: base to lg, uppercase tracking
- Body/Instructions: sm to base, normal weight
- Terminal Output: sm, monospace
- HUD Stats: xs to sm, uppercase

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 for consistency
- Tight spacing: p-2, gap-2 (HUD elements, tool icons)
- Standard spacing: p-4, gap-4 (cards, panels)
- Generous spacing: p-6, gap-6 (major sections)
- Section breaks: p-8, my-8 (between major areas)

**Grid Structure:**
- Desktop: Multi-panel dashboard (3-column: tools sidebar 1/4, main content 2/4, report panel 1/4)
- Tablet: Two-column (tools/content merged, report separate) or stacked tabs
- Mobile: Single column with tabbed navigation

**Container Approach:**
- Full viewport height utilization (h-screen with overflow handling)
- Panels use flex-1 for dynamic sizing
- Max-width constraints on text-heavy content (max-w-2xl for readability)

## Component Library

### HUD (Heads-Up Display)
- Fixed top bar spanning full width
- Contains: Mission counter, progress indicator, settings icon, glitch effect decorations
- Height: h-12 to h-16
- Grid layout for stat displays: grid grid-cols-3 or flex justify-between
- Scanline overlay effect for cyberpunk feel

### Case Brief Panel
- Card-based design with terminal border aesthetic (border-2 with cyber corners)
- Padding: p-6
- Sections: Mission title, briefing text, objectives list, required tools badges
- Scrollable content area with custom scrollbar styling
- Glitch text effect on mission number/classification

### Tool Panel
- Vertical tab navigation on desktop (left sidebar)
- Horizontal tabs on mobile (top of screen)
- Each tool as distinct interface:
  - Search: Input field with "EXECUTE SEARCH" button, results list
  - WHOIS: Domain input, structured data output table
  - Metadata: Image upload area, extracted data display
  - Pastebin: Scrollable code block with line numbers
- Tool icons with hover glow effects
- Active tool highlighted with accent treatment

### Report Box
- Bottom-fixed on desktop (h-1/3 to h-2/5), full-height modal on mobile
- Terminal-style text area (border, monospace font)
- Submit button: Large, prominent, uppercase with scan-line animation
- Character count indicator
- Expandable/collapsible on desktop

### Mentor Dialog
- Modal overlay with backdrop blur
- Terminal window aesthetic with ASCII art avatar
- Feedback sections: Score display (large numerical), explanation text, technique breakdown
- "NEXT MISSION" action button
- Typing animation effect for text reveal
- Dismiss with "X" or backdrop click

### Mission Selection Screen
- Grid of mission cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each card: Mission number badge, title, difficulty indicator, locked/unlocked state
- Locked missions: Greyscale with lock icon
- Hover effect: Elevation, border glow
- Card padding: p-4 to p-6

### Settings Panel
- Slide-in panel from right (desktop) or full-screen (mobile)
- Sections with clear headers:
  - API Configuration
  - Provider Selection (dropdown)
  - Step-by-step instructions (collapsible accordions)
  - Test connection button
- Form inputs with terminal styling
- Code snippets for API examples (with copy button)

## Visual Elements

**Borders & Containers:**
- Use 1-2px borders with cyber-corner decorations (small angled cuts)
- Double-border effect for emphasis (border + inner border)
- Scanline overlay pattern on panels (subtle repeating horizontal lines)

**Glitch Effects:**
- Apply sparingly to: Mission headers, HUD elements, "classified" badges
- CSS-based glitch (no heavy animations)
- Triggered on state changes (mission complete, new unlock)

**Terminal Elements:**
- Blinking cursor in active text inputs
- Command prompt prefix ("> _") in input fields
- Line numbers in code displays
- Monospace alignment for structured data

**Icons:**
- Use Font Awesome or Heroicons via CDN
- Style: Outline/line icons fitting cyberpunk aesthetic
- Standard icons: search, database, image, clipboard, settings, lock, check-circle

## Responsive Behavior

**Desktop (lg and above):**
- Three-panel dashboard layout
- Persistent tool sidebar
- Side-by-side content and report areas
- Fixed HUD at top

**Tablet (md):**
- Two-column when landscape, single when portrait
- Tabbed interface for tools
- Report panel as expandable drawer

**Mobile (base):**
- Single column stack
- Bottom tab navigation (Tools, Brief, Report)
- Full-screen modals for mentor feedback
- Hamburger menu for settings
- Collapsible sections to manage vertical space

## Interaction Patterns

- Tool switching: Instant (no page reload)
- Report submission: Loading spinner with "ANALYZING..." text
- Mission unlock: Brief celebration animation (border pulse)
- Progress save: Auto-save with subtle indicator
- Error states: Red terminal error message format

## Images

**Hero/Welcome Screen:**
- Full-viewport hero section on initial load
- Abstract cyberpunk cityscape or digital matrix background
- Centered logo/title with tagline
- "START INVESTIGATION" CTA button with blurred backdrop
- Fade-to-dashboard transition on click

**In-Game:**
- Mission thumbnails (if applicable): Small preview images in mission cards
- Tutorial/Help: Optional diagram images for OSINT technique explanations
- Mentor Avatar: Pixelated or line-art detective character (small, 64x64 to 128x128)

All images should support the cyberpunk aesthetic with high contrast and technological themes.