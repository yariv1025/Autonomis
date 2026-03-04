# Session Start Hook

**When:** Claude Code / Cursor session starts.

**Purpose:** Load state from `.autonomis/` so the orchestrator can resume. Inject into context: current phase, work units, router state, and **selective** memory (only the subset relevant to current scope: affected files, keywords, work unit type).

**Actions:**

1. `Read(file_path=".autonomis/state/current.json")` or equivalent (phase, runId, work units).
2. If resuming a run: `Read(file_path=".autonomis/runs/<runId>/snapshot.json")` (or last snapshot) for Router Contract, Memory Notes.
3. Load memory: list files in `.autonomis/memory/` and read only those matching current scope (by tags or file paths in entries). If no scope yet, load minimal (e.g. last N entries).
4. Present to the model: "Autonomis state loaded. Phase: X. RunId: Y. [Summary of work units and memory.] Resume from here."

**Contract:** Session start = **load from disk**. Pre-compact = **write to disk**. Together they mitigate FLAW-001 (context compaction loses sub-agent output).
