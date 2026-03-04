# Autonomis Hooks

Deterministic quality and state gates. They run at session/commit time, independent of the LLM.

## Session start

**When:** Claude Code / Cursor session starts.

**Purpose:** Load from `.autonomis/` and inject into context: state, current phase, work units, memory (selective by scope). Enables the orchestrator to resume.

(Implemented by platform adapter or rule that instructs the assistant to read `.autonomis/state/` and relevant `.autonomis/memory/` on session start.)

See [session-start.md](session-start.md) for step-by-step actions.

## Pre-compact

**When:** Before context compaction.

**Purpose:** Write state to `.autonomis/runs/<runId>/` before compaction: phase, last agent outputs (Router Contract, Memory Notes), memory snapshot, router state. Ensures no reliance on conversation history after compaction. See docs/known-flaws.md (FLAW-001).

See [pre-compact.md](pre-compact.md) for step-by-step actions.

## Pre-commit

**Purpose:** Ensure only reviewed work is committed (e.g. block commit if unreviewed changes exist, or allow only after Review marks unit done). Optionally run tests before commit.

### Install

```bash
cp plugins/autonomis/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Plan reviewer (suggest OWASP skills)

**When:** After the Plan phase produces or updates a plan.

**Purpose:** Inspect plan content for technology keywords and suggest domain OWASP skills (e.g. owasp-api-security-top-10, owasp-llm-top-10). Suggestion only; no auto-install. See [plan-review-owasp.md](plan-review-owasp.md).
