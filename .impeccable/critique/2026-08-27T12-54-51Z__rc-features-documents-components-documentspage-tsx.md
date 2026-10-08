---
timestamp: 2026-08-27T12-54-51Z
slug: rc-features-documents-components-documentspage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Real-time statutory compliance telemetry, progress bars, per-row busy spinners |
| 2 | Match System / Real World | 4 | Plain-English 'What it is' & 'Why it's needed' explanations for all 69 slots |
| 3 | User Control and Freedom | 3 | Modal replacement directly triggers file input without intermediate confirmation |
| 4 | Consistency and Standards | 4 | Unified brand chip headers, tokenized colors, consistent action buttons |
| 5 | Error Prevention | 4 | Strict PDF validation, 10MB size warnings, alert confirmation on deletion |
| 6 | Recognition Rather Than Recall | 4 | Dedicated (i) popover on every row, clear status badges, guidance pills |
| 7 | Flexibility and Efficiency | 3 | Category 4 modal has 19 rows without an internal search/filter |
| 8 | Aesthetic and Minimalist Design | 4 | Clean linear meters, zero spec codes, uncluttered card faces |
| 9 | Error Recovery | 3 | Inline upload rejection banners, clear filter resets, retry loading state |
| 10 | Help and Documentation | 4 | 3-pillar 'Why SpotLite Needs Documents' guide, contextual requirements |
| **Total** | | **33/40** | **Strong / Production-Ready** |

---

## Design Specificity Verdict

**LLM assessment**: The Documents interface feels specifically designed for Indian SME/startup corporate compliance and due diligence. It bridges statutory governance (MCA, GST, Income Tax, Udyam) with modern financial operating workflows. The typography, badge taxonomy, and segmented navigation tabs reflect high domain specificity.

**Deterministic scan**: `detect.mjs` reported 0 defects across `DocumentsPage.tsx`, `DocumentCategorySummaryCard.tsx`, `DocumentRequirementRow.tsx`, `DocumentInfoPopover.tsx`, and `PackagesSection.tsx`.

---

## Overall Impression
The Documents page has transformed from a long vertical file list into a structured compliance hub. The top telemetry immediately gives founders and CFOs their exact KYB standing, while the plain-English info popovers eliminate confusion about complex corporate filings.

---

## What's Working
1. **Glanceable Executive Telemetry**: The top compliance pill (`X of 17 Required Complete`) and storage counters give an instant snapshot of statutory readiness.
2. **Contextual Plain-English Explanations**: The `(i)` button on every document row clearly explains what the file is and why it's needed, removing internal spec codes (`[R9]`) and jargon.
3. **Segmented Navigation**: Tab-based switching (`Categories`, `Registry`, `Packages`, `All`) prevents information overload and scrolling fatigue.

---

## Priority Issues

### [P2] Search / Filter in Long Category Modals
- **What**: Category 4 (Financial & Banking) contains 19 separate document slots.
- **Why it matters**: Users looking for a specific item (e.g. "Audited Financials" or "Debt Schedules") must scroll through a long list.
- **Fix**: Add a small sticky search bar or quick filter inside the category popup when rows > 8.
- **Suggested command**: `/impeccable polish`

### [P2] Multi-Instance Document Guidance
- **What**: Several slots (e.g., `bank_statements`, `share_certificates_allotment`) represent multi-instance documents in practice.
- **Why it matters**: A user with 3 bank accounts or quarterly filings might wonder why the category row only holds one file while the Registry table holds multiple.
- **Fix**: Add a helper note or "Add another" trigger inside multi-file slots.
- **Suggested command**: `/impeccable clarify`

### [P3] Live Package Counter Badge in Tab Trigger
- **What**: The `Diligence Packages` tab trigger does not show a live badge counter like `Categories (0/17)` and `Registry (X)`.
- **Why it matters**: Creates slight visual asymmetry in the segmented tab list.
- **Fix**: Query packages count and display badge in tab trigger.
- **Suggested command**: `/impeccable polish`

---

## Persona Red Flags

- **Rohan (Busy Founder / First-time Borrower)**: Lands on the page to finish onboarding. Sees exactly what is missing (e.g. 15/17 required) and clicks `(i)` to understand why a "Board Resolution" is needed. No red flags found.
- **Priya (Corporate Accountant / Auditor)**: Wants to review all historical tax filings. Uses the `Document Registry` tab with search and bulk download. Needs to know if multi-period GST returns should be zipped or uploaded separately.
- **Vikram (Lender / Due Diligence Analyst)**: Accesses `Diligence Packages` tab to assemble loan collateral bundles. Clear path to create and share bundles.

---

## Minor Observations
- Table replace action uses the hidden file input effectively.
- Drag-and-drop handles multi-file drop gracefully with a warning toast.

---

## Questions to Consider
- Should Category 4 (Financial & Banking) group documents into sub-sections (*Cash Flow & Banking*, *Ledgers & P&L*, *Debt & Liabilities*)?
- Should completing 17/17 statutory requirements trigger a celebratory confetti or verifiable "SpotLite KYB Badge"?
