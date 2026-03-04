# Autonomis runtime state

This directory is created and used by the Autonomis plugin. Do not edit by hand unless you know what you are doing.

## Layout

- **state/** — Current phase, work units, router state (loaded on session start).
- **runs/<runId>/** — Per-run snapshots (pre-compact writes, receipts).
- **memory/** — Patterns, learnings, decisions; load selectively by scope (files, keywords, work unit type).
- **research/** — Research artifacts from the Research phase.
- **config** (optional) — Iteration cap N, strictness (e.g. `max_iterations=3`).

## Task store (v1)

File-based implementation of the task store interface:

- **getReadyTasks** — Tasks with status pending and dependencies satisfied.
- **createTask** — Create work unit or phase task.
- **updateStatus** — Mark task in_progress / completed / blocked.
- **addDependency** — Link tasks (downstream blocked by upstream).
- **getState** / **setState** — Orchestrator state (phase, runId, etc.).

An optional beads backend can be added later via the same interface.
