---
name: Spotlite Design System
description: Institutional financial intelligence design system for MSMEs (SBI/YONO-inspired)
colors:
  brand-primary: "oklch(0.28 0.14 265)"
  brand-primary-hi: "oklch(0.38 0.16 265)"
  brand-secondary: "oklch(0.42 0.15 270)"
  brand-on-brand: "oklch(1 0 0)"
  severity-high: "oklch(0.55 0.22 25)"
  severity-moderate: "oklch(0.75 0.16 65)"
  severity-low: "oklch(0.55 0.18 250)"
  success: "oklch(0.62 0.17 150)"
  danger: "oklch(0.55 0.22 25)"
  bg: "oklch(0.985 0.003 260)"
  surface: "oklch(1 0 0)"
  surface-alt: "oklch(0.96 0.006 260)"
  text-primary: "oklch(0.16 0.02 260)"
  text-secondary: "oklch(0.46 0.02 260)"
  text-tertiary: "oklch(0.65 0.01 260)"
  border-c: "oklch(0.9 0.008 260)"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
  h1:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "0.5rem"
  default: "0.875rem"
  pill: "9999px"
---

# Design System

## Overview

Spotlite's visual language blends institutional trust (inspired by PSU banking architectures like SBI/YONO) with proactive, modern financial intelligence. The interface is optimized for rapid scanning, high financial data density, and clear risk/opportunity communication.

## Colors

### Brand & Accents
- `brand` (`--brand-primary`): Deep institutional navy/cobalt for key branding and primary actions.
- `brand-secondary` (`--brand-secondary`): Royal purple accent for AI coach and personas.
- `surface` (`--surface`): Crisp white card surfaces.
- `surface-alt` (`--surface-alt`): Subtle slate-gray background for secondary modules.

### Semantic & Severity
- `destructive` / `severity-high` (`--severity-high`): Red for critical compliance risks, rejection, and errors.
- `severity-moderate` (`--severity-moderate`): Amber for warnings and pending items.
- `severity-low` (`--severity-low`): Blue for informational highlights.
- `success` (`--success`): Emerald for verified records and positive gains.

> **CRITICAL RULE**: Never use arbitrary Tailwind hex values (e.g., text-[#ccc]). You must ONLY use the semantic color tokens defined in our Tailwind theme.

## Typography

- **Display & Headings**: Inter sans-serif with tight tracking and high contrast.
- **Numbers & Values**: Tabular mono figures (`JetBrains Mono` / `font-mono tabular-nums`) for currency amounts, timestamps, and metrics to ensure alignment.

## Layout

- 12-column responsive grid for desktop dashboards.
- Double-column layout (`grid grid-cols-1 md:grid-cols-2 gap-3`) for document vaults and checklist modules.
- Collapsible desktop sidebar with mobile bottom navigation bar.

## Elevation & Depth

- Low-contrast border outlines (`border-border-c`) rather than heavy drop shadows.
- Subtle elevation cards (`shadow-2xs`, `shadow-xs`) with micro-interactions.

## Shapes

- Standard cards: `rounded-xl` / `rounded-2xl` (`0.875rem`).
- Badges and status pills: `rounded-full`.
- Buttons and inputs: `rounded-xl` (`0.75rem` - `0.875rem`).

## Components

- **DocumentRequirementRow**: Double-column document verification rows with upload, replace, preview, and download capabilities.
- **DocumentCategorySummaryCard**: Progress rings, ratio badges, and completion meters.
- **DocumentStatusBadge**: Semantically color-coded status chips with accessibility-conscious contrast.

## Do's and Don'ts

### Do's
- Use semantic color classes (`text-primary`, `text-secondary`, `bg-surface`, `bg-surface-alt`, `border-border-c`, `text-destructive`, `text-success`).
- Format currency amounts with tabular numerals and Indian numbering schemes (`₹1,23,456`).
- Maintain WCAG AA contrast on all interactive elements.

### Don'ts
- **Never use arbitrary Tailwind hex values (e.g., text-[#ccc]). You must ONLY use the semantic color tokens defined in our Tailwind theme.**
- Never hardcode ad-hoc borders or surface colors without using theme tokens.
- Never show raw unstructured numbers without tabular formatting.
