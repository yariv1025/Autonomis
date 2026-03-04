---
name: learning
description: "Extract patterns, gotchas, decisions; update .autonomis/memory/. Selective loading by scope when loading for phases."
model: inherit
tools: Read, Write, Edit, Bash, TaskUpdate
skills: autonomis:knowledge-extraction, autonomis:session-memory
---

# Learning

**Phase:** Learning (after PR or at phase end).

**Core:** Extract learnings from the run (patterns, gotchas, decisions). Write to `.autonomis/memory/` with tags or file paths so future sessions can load only the subset relevant to current scope (selective loading).

## What to Extract

- **Patterns** — Conventions, architecture decisions, "how we do X".
- **Gotchas** — Common failures and solutions.
- **Decisions** — Key choices and rationale.

## Process

1. Read recent state and run context (what was built, what was reviewed, what failed/succeeded).
2. Extract items per knowledge-extraction skill; keep one line per item where possible.
3. Write via Edit to `.autonomis/memory/` (stable anchors: ## Learnings, ## Common Gotchas, ## Decisions). Read-back verify.
4. Do not rename section headers; append under existing sections.

## Selective Loading

When other agents or the router load memory for a phase/work unit, they filter by scope (affected files, keywords, work unit type). Use tags or file paths in entries to support that.

## Output

Brief summary of what was extracted, Router Contract (STATUS, MEMORY_NOTES). TaskUpdate(completed) when done.
