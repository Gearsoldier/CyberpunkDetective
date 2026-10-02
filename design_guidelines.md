# GEARZ OSINT Detective: Design Guidelines

A visual and interaction reference for maintaining the game's cyberpunk identity while keeping investigations readable and usable.

These guidelines describe design intent and review criteria. They do not imply that every layout, accessibility behavior, or interaction below has already been implemented or verified.

## Design direction

The original references combine cyberpunk games such as Cyberpunk 2077 and Deus Ex, terminal-style learning environments such as Hack The Box and TryHackMe, and detective evidence boards. Use these as atmosphere references, not as a requirement to reproduce another product's assets or interface.

Four principles guide new work:

1. Make evidence and next steps easy to understand
2. Use terminal styling without sacrificing ordinary web usability
3. Keep the neon atmosphere focused and restrained
4. Let small screens and keyboard users complete the same core investigation flow

## Source of truth

| Concern | Current source |
| --- | --- |
| Colors, surfaces, effects, light/dark tokens | `client/src/index.css` |
| Tailwind mappings and font families | `tailwind.config.ts` |
| Page composition and view switching | `client/src/pages/Home.tsx` |
| Game-specific panels | `client/src/components/` |
| Shared primitives | `client/src/components/ui/` |

Prefer the existing CSS variables and UI primitives over new hard-coded values. Current components use Lucide React icons; do not introduce a separate icon CDN just to match the old design brief.

## Color and typography

The base palette uses cyan for primary actions and investigation tools, amber for accents and rewards, and neutral dark surfaces for evidence. Preserve the existing light/dark tokens and selectable theme behavior when extending the interface.

- Use `primary`, `accent`, `background`, `foreground`, `muted`, and border tokens consistently
- Keep decorative glow away from long text and fine detail
- Pair status colors with text or icons; never make color the only signal
- Check contrast in every supported theme

The CSS uses Space Mono / Roboto Mono-style monospace typography for its terminal character. The original brief also proposed Orbitron and Rajdhani for headings. Verify that any chosen font is actually loaded before relying on it, and provide a usable system fallback.

| Content | Suggested treatment |
| --- | --- |
| Mission title | Large, clear, with restrained letter spacing |
| Section heading | Medium size and weight; concise wording |
| Evidence and output | Monospace, selectable text, comfortable line height |
| Instructions | Readable body size; avoid long all-caps passages |
| XP, timer, and status | Compact but legible; clear units and labels |

## Layout and spacing

Use Tailwind's 2/4/6/8 spacing rhythm: tighter within a control group, more space between investigation stages. Keep long explanations at a readable maximum width.

The original brief envisioned a multi-panel desktop dashboard, a two-column tablet layout, and stacked or tabbed mobile content. Use the actual `Home.tsx` composition as the implementation baseline rather than assuming a specific three-column layout already exists.

At narrow widths:

- Stack content without hiding the current mission or primary action
- Keep tab labels and form controls reachable without horizontal scrolling
- Let long evidence wrap or scroll inside its own panel
- Avoid fixed-height regions that trap important content
- Keep dialogs usable when a software keyboard is open

## Component conventions

### HUD and mission selection

Keep the current case, level, XP, and navigation easy to locate. Mission cards should distinguish difficulty, available/locked status, and the requirement for unlocking. Use clear text alongside lock icons and reward styling.

### Briefing and evidence tools

Separate the story, investigation objective, available tools, and expected report task. Keep tool switching immediate, with a visible active tab.

Current tool panels display simulated search, WHOIS, metadata, paste, certificate, and breach-style evidence. Label simulations honestly. Do not imply that a metadata filename field performs a real upload or that an evidence panel queries the internet.

### Report submission

Provide a clear label, comfortable writing area, report-length guidance, and an obvious submit action. Preserve the user's report while a request is pending or fails. Loading, success, and error feedback should explain what happened without relying on animation alone.

### Mentor feedback

Make the score, explanation, and next action distinct. Keep typewriter effects optional or skippable in future improvements. Current feedback is templated and the score is heuristic; interface copy should not imply a live AI review.

### Settings and profile

Group display preferences separately from destructive actions. Reset should explain exactly what is lost and require a deliberate confirmation. Avoid encouraging real API-key entry while the current AI Settings fields remain disconnected from grading.

## Motion, imagery, and sound

Use borders, subtle scanlines, and short glow transitions to establish the setting. Reserve stronger glitch or celebration effects for brief state changes.

- Respect reduced-motion preferences when implementing or revising effects
- Avoid flashing, persistent visual noise, or animation that obscures evidence
- Keep decorative artwork out of the reading path
- Use meaningful alternative text for informative images and empty alt text for decoration
- Provide obvious sound controls and account for browser autoplay restrictions
- Preserve asset attribution and confirm reuse rights before adding artwork, fonts, or music

The original welcome-screen concept included a cyberpunk cityscape or digital-matrix backdrop, a centered title, and a prominent start action. Treat that as an optional direction rather than a claim about the current screen.

## UI review checklist

- Can a first-time player identify the next step without guessing?
- Do text, controls, focus indicators, and status colors remain readable in all themes?
- Can a keyboard user move through tools, submit a report, and dismiss a dialog?
- Do Escape, Close, Back, and repeated actions leave a predictable screen state?
- Do pending and failed requests preserve context and user-entered text?
- Does the layout remain usable at narrow widths and with larger text?
- Are simulated data, unfinished features, and scoring limits described accurately?
- Are motion, sound, and decorative elements under the player's control?

For behavior, setup, and security caveats, consult the [README](README.md) and [development notes](replit.md).
