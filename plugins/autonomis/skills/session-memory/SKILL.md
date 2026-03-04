---
name: session-memory
description: |
  Load and save context, progress, and patterns under .autonomis/ so work survives compaction and context switches. Use at session start (load state/memory), at phase end (update state), and when starting a work unit (selective load by scope). Do not rely on conversation history after compaction — state lives in .autonomis/.
allowed-tools: Read, Write, Edit, Bash
---

# Session Memory (Autonomis)

## Rule

- **LOAD** at session start and before key decisions (from `.autonomis/state/`, `.autonomis/memory/`).
- **UPDATE** at phase end and after learnings (to `.autonomis/`).
- **Selective loading:** When starting a work unit or phase, load only the subset of memory relevant to current scope (affected files, keywords, work unit type). Use tags or file paths in memory entries so the orchestrator can filter.

Conversation history can be compacted or lost; the pre-compact hook persists state to `.autonomis/runs/<id>/`, and session start loads from there. So persistent context must live under `.autonomis/`, not in the chat.

## Layout

```
.autonomis/
├── state/       # Current phase, work units, router state
├── runs/<id>/   # Per-run snapshots (pre-compact, receipts)
├── memory/      # Patterns, learnings, decisions (indexed for scope)
├── research/    # Research artifacts
└── config       # Optional: iteration cap N, strictness
```

## Operations

- **Read:** Use `Read(file_path=".autonomis/state/...")` — permission-free.
- **Create:** `Bash(command="mkdir -p .autonomis/state .autonomis/memory .autonomis/runs .autonomis/research")` then `Write` for new files.
- **Update:** Use `Edit(old_string="...", new_string="...")` on existing files; then `Read` to verify so you do not overwrite incorrectly.
