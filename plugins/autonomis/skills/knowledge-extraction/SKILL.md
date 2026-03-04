---
name: knowledge-extraction
description: |
  Extract patterns, gotchas, and decisions from work and write them to .autonomis/memory/ so future sessions can reuse them. Use after phases or work units — and when acting as Learning agent. Tag or path entries so the orchestrator can load only the subset relevant to the current scope; keep entries brief (index, not document).
allowed-tools: Read, Write, Edit, Bash
---

# Knowledge Extraction

## Purpose

After phases or work units, extract learnings so future sessions can load only the subset relevant to the current scope. Selective loading (by files, keywords, work unit type) keeps context bounded and relevant.

## What to Extract

- **Patterns** — Reusable conventions, architecture decisions, "how we do X here".
- **Gotchas** — Common failures and solutions; reference file:line or area.
- **Decisions** — Key choices and rationale (so we don't contradict later).

## Where to Write

- `.autonomis/memory/` — Use tags or file paths in entries so the orchestrator can filter by scope when loading.
- Keep entries brief; one line per item where possible. Index, not document.

## Selective Loading

When starting a work unit or phase, load from `.autonomis/memory/` only the subset relevant to current scope (affected files, keywords, work unit type). This prevents unbounded context growth.

## Format

Use stable anchors (e.g. ## Learnings, ## Common Gotchas, ## Decisions). Use Edit + Read-back to verify. Do not rename section headers; append under existing sections.

**Example:** Under ## Common Gotchas, append: `auth: JWT must be validated with signature; don't trust client-only claims (see src/auth.ts).`
