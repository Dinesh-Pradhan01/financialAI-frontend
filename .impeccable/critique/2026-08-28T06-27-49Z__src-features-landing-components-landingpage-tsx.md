---
timestamp: 2026-08-28T06-27-49Z
slug: src-features-landing-components-landingpage-tsx
---
# Design Critique: LandingPage.tsx

Method: single-context (degraded: no subagent tool available in this session)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live sync pulse and billing toggles work well; header lacks active scrollspy for navigation anchors. |
| 2 | Match System / Real World | 2 | Conflicting currency & localization: ₹ INR in Hero/AI prompts vs $ USD in Stats and Pricing tiers. |
| 3 | User Control and Freedom | 3 | Mobile drawer and billing toggles work; preview prompts ("See CEO dashboard preview") lead nowhere. |
| 4 | Consistency and Standards | 2 | Fragmented CTA naming ("Book a Live Demo", "Request a Demo", "Start Free Trial") and inconsistent card hover treatments. |
| 5 | Error Prevention | 3 | Clean navigation with direct links to auth routes; low risk of user error. |
| 6 | Recognition Rather Than Recall | 3 | Clear role definitions and icons; module tags are slightly abstract corporate categorizations. |
| 7 | Flexibility and Efficiency | n/a | Persuade mode: Marketing landing page optimized for linear conversion path. |
| 8 | Aesthetic and Minimalist Design | 2 | High visual monotony: 4 successive sections rely on identical 3-column card grids with bullet lists. |
| 9 | Error Recovery | 3 | Standard navigation fallback paths are functional. |
| 10 | Help and Documentation | n/a | Persuade mode: Marketing surface. |
| **Total** | | **21/32** | **Acceptable (65.6%)** |

## Design Specificity Verdict

- **LLM Assessment**: The Hero section establishes a distinct, authoritative voice with its detailed Executive Overview mockup (runway, burn in ₹, anomaly radar, salary benchmarking). However, below the fold, the design degrades into generic SaaS structural monotony: 4 consecutive sections of 3-column white/light-slate cards with bulleted lists. Crucially, there is a currency identity crisis: Indian Rupee metrics in the Hero (`₹42.8L`, `Apex Technologies India Pvt. Ltd.`) clash with US Dollar pricing (`$490`, `$1,250`) in the Pricing section.
- **Deterministic Scan**: 0 rule violations detected by `detect.mjs`. Clean static Tailwind and JSX structure.
- **Visual Overlays**: No live DOM overlay active (evaluated via static source and component architecture).

## Overall Impression
The Hero section is compelling and high-signal, but the remainder of the page suffers from repetitive card-grid fatigue, a split currency identity (INR vs USD), and dead preview affordances that tease rich product UI without delivering it.

## What's Working
1. **Hero Executive Dashboard Mockup**: The simulated KPI tiles (Cash Runway, Monthly Burn, Health Index) and Anomaly Radar alert immediately communicate SpotLite's proactive intelligence angle.
2. **AI Copilot Featured Module Card**: Highlighting natural language Q&A with a concrete query/answer sample provides instant clarity on how the AI operates.
3. **Typography & Spacing Foundation**: Clean type hierarchy with bold display headlines and legible monospace numerals on key financial metrics.

## Priority Issues

### [P1] Currency and Regional Market Identity Crisis
- **Why it matters**: Indian CFOs seeing `₹42.8L` in the hero will be confused by `$490/year` in USD, while global buyers will question the India-specific legal entity names.
- **Fix**: Align the currency system globally (either support an INR/USD currency switcher or standardize on SpotLite's primary MSME market pricing in ₹ INR / Lakhs).
- **Suggested command**: `/impeccable clarify`

### [P2] "Wall of Cards" Structural Monotony Below the Fold
- **Why it matters**: 4 consecutive 3-column card grids (Modules, Roles, How It Works, Testimonials) cause scanning fatigue and look like placeholder marketing templates rather than product proof.
- **Fix**: Diversify the visual layout: convert Modules into an interactive tabbed interactive preview, display Roles with actual UI snapshots for CEO vs CFO vs HR, and use a horizontal timeline for Implementation.
- **Suggested command**: `/impeccable layout`

### [P3] Dead Interactive Affordances
- **Why it matters**: Links like *"See CEO dashboard preview →"*, *"View module specs"*, and *"Download Product Architecture PDF"* look clickable but perform no action, frustrating high-intent visitors.
- **Fix**: Either wire these triggers to interactive preview modals/sheets or replace dead text links with working demo triggers.
- **Suggested command**: `/impeccable harden`

### [P4] Fragmented CTA Funnel & Microcopy
- **Why it matters**: The page uses 5 different CTA labels (*"Request a Demo"*, *"Book a Live Demo"*, *"Schedule Live Executive Demo"*, *"Start Free 14-Day Trial"*, *"Talk to Sales"*), creating friction regarding what clicking will actually do.
- **Fix**: Standardize on two clear actions: a primary demo flow (*"Book Executive Demo"*) and a secondary exploration path (*"Explore Live Sandbox"*).
- **Suggested command**: `/impeccable clarify`

## Persona Red Flags

- **Jordan (First-Time MSME Founder)**: Disoriented by the INR vs USD currency switch; clicks "See CEO dashboard preview" expecting a quick video or tour, but nothing opens.
- **Alex (Analytical CFO)**: Wants to see concrete proof of bank statement reconciliation (e.g. SBI/HDFC/ICICI logos, actual OCR workflow, cash flow charts) rather than 4 sections of generic bullet points.
- **Casey (Mobile Executive)**: Hero dashboard card creates a very tall vertical stack on mobile; following sections turn into a scroll of 18+ stacked cards without quick jumping.

## Minor Observations
- Missing sticky header active state / scrollspy indicator for `#platform`, `#modules`, `#roles`, `#pricing`.
- Testimonials lack verifiable company logos or industry tags, reading like stock placeholders.
- Pricing toggle has a subtle animation gap when toggling between Annual and Monthly.

## Questions to Consider
- What if the "Modules" section was an interactive live tabbed demo where clicking "Customer 360" or "Risk Engine" live-swapped the Hero's interactive dashboard?
- Should pricing be offered in ₹ INR (with Lakhs/Crores) for the domestic MSME market or include an automatic geo/currency toggle?
