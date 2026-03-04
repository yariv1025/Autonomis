---
name: research
description: |
  Synthesize research files into actionable answers and patterns. Use when research file paths are passed (e.g. from Researcher agent) and the user or Planner/Debug Investigator needs the knowledge gap answered. This skill does not run research; it turns research artifacts into Findings + Synthesis and updates memory. Use whenever you have research output to digest.
allowed-tools: Read, Write, Edit, Bash
---

# Research Synthesis

## Purpose

Loaded when the router passes research file paths (e.g. from Researcher agent). Your job is to synthesize those files to answer the knowledge gap and make the result reusable.

## Synthesis Goal

After reading the research file(s) from the prompt:
1. Answer the knowledge gap (reason from the prompt).
2. Top 2–3 actionable patterns.
3. Gotchas with solutions.
4. References for debugging.

## Output Format

Use this structure so the consumer can act on it:

- **Findings** — 3–5 bullets (patterns, gotchas).
- **Synthesis** — Knowledge gap answered, recommended approach, patterns to apply, gotchas to avoid, references.
- If a source was unavailable, note it and reduce confidence accordingly.

## Memory Update

After synthesis, update `.autonomis/state/` or `.autonomis/memory/` with the research reference (via session-memory; Read-Edit-Read). Add to References / Learnings as appropriate.

## Autonomis

Research is executed by Researcher agent(s); output goes to `.autonomis/research/`. The router passes file paths to Planner or Debug Investigator when needed. This skill guides how to use those files.
