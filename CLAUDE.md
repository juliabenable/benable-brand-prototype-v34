# benable-brand-prototype-v34 — Campaign Pulse

Brand-portal prototype: captured production HTML + React overlays. v34 = clean single-experience base for polishing (v33 keeps the full A-D/W/Y/Z/0 variant exploration).

## Architecture
- Captured page HTML lives in `src/data/capturedHtml.js` (huge — grep, never read whole).
- Pages render captured HTML via `dangerouslySetInnerHTML`, then mount React overlays into injected host divs with their own `createRoot` + a MutationObserver re-mount (pattern in `CampaignDetailPage.jsx` / `CampaignsListPage.jsx`).
- Campaign page overlay: `src/components/pulse/` — ONE experience (v33's C, the polishing base; the A-D/W/Y/Z/0 exploration lives in v33 + git history):
  - `amine.jsx` — the whole page, values from Amine's build (repo AmineBenjil/benable-cohort-funnel, his V2 "stage rail" Figma 11638:139353). `AmineProgress2` = stat row ("N% through your campaign" green + "🚀 Campaign on schedule, up to 4 weeks faster than industry average"; day 30 = "🎉 Wrapped 37 days ahead of average") + `AmineRailBar` (equal-width 40px slabs, 4px gaps, 74/100px outer corners, his green ramp #b9dfcb→#124a33 w/ AA contrast fixes; label = what happened, hint = what's happening now, empty stages hatched w/ muted 0 + forward-looking hint; leading "Sourcing…" column #dbeee3 while sourcing; 20px amber badge = clickable Needs-you filter; columns click-to-filter; dark hover tooltips w/ names). `AmineTable` = creators card (16px radius, #fafafa column strip, verified badge, 7 purple stage dashes, ⚑ orange flag rows, rows expand to the cp-hist timeline, "＋ Request more" footer; subtitle "N on this campaign" / "N of M on this campaign" when filtered). `AmineRail` = 370px right rail (While you were away / Up next / The pace w/ #815aff & #c4c4c4 meters + pace-strip.jpg caption strip). `amFunnel` derives every number from CREW; `stageOf` maps crew stage 0-5 (day 30 = Thanked). No banner, no lead headline — the page opens on the progress row; the badge carries attention. Katie's welcome card renders on day 1. Assets in `public/labs/` are Amine's Figma exports.
  - `pulseData.js` — ALL demo content (DAYS day-states w/ recap/upNext/race, CREW per-day rows, TIMELINES w/ calendar dates Jul 16–Aug 6, PCT). Copy tweaks go here.
  - `LiveStatus.jsx` — motion registers: shimmer = machine working now · katie = human present (typing, never a spinner) · heartbeat = watching (breathe, one still sentence) · celebrate = go-live (emoji bounces, words still) · facts/static = quiet. Every animation is a claim — only emit from real signals in production.
  - `CampaignPulse.jsx` — shell: day scrubber (opens Day 9), stage filtering, grey #f9fafb pane (`cp-labs-pane`), scroll unlock lives in overrides.css (`:has(.cp-root)`).
  - Pre-campaign phases (Julia, Jul 27 — "day 1 would never look like a dashboard"): DAYS entries carry `phase`. Day 1 `'sourcing'` = Figma 7199:20453 "Stay Tuned!" (illustration `public/labs/stay-tuned.png`, 22px bold + 18px body, white pane); Day 3 `'review'` = Figma 7199:21448 "We Found N creators who are a great fit" (80px blurred-avatar circle, purple bold count, 48px purple Review Creators pill). During phases the grey pane is skipped (white bg) and the captured header's `.phase-pill` is patched to amber "Recruiting" (#fff0ce/#a85321); Active restores after. Cohort review NEVER renders in the creators table — it's these dedicated states.
  - Day 11 · Rematch found — when a mid-campaign rematch is FOUND it becomes an ACTION ITEM (Julia): CREW row `{ mystery: true, found: true }` → rail's leading column flips from "Sourcing…"/#dbeee3 to amber #F5A041 "Match found · N new creators to review" w/ badge (clickable → needs filter); table row = blurred tease photo (`am-avatar--blur`), "Your new match · found this morning · 96% fit", ⚑ "Review your new match", no expansion. `amFunnel` counts `found` into `flagged`.
- Brand overview overlay: `BrandPulse.jsx` (lifetime totals, milestone tracker, insight cards) mounted before `.campaigns-section`.
- CSS: `src/styles/pulse.css` only — `cp-` campaign page, `bp-` brand overview. Keep it pruned; don't append dead styles.

## Copy rules
- Operational claims say "Katie's team" (never solo Katie); Katie's first-person voice only in her signed cursive notes.
- No struggle updates; rematches framed as reassurance. Emoji stripped in crew statuses except celebrate.
- A tile row never shows a zero — it shows a sentence about what's happening.

## Dev + ship
- Dev: launch.json name `brand-prototype-v34`, port 5212. Demo page: `/brand/tonypikora/campaigns/46` (campaign) and `/brand/tonypikora/campaigns` (brand overview).
- Deploy: `bash scripts/ship.sh "commit message"` — builds, commits, pushes, watches the Pages run, curls the live URL.
- Live: https://juliabenable.github.io/benable-brand-prototype-v34/
