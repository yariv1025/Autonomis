# Pre-Compact Hook

**When:** Before context compaction (when the host is about to summarize or truncate conversation history).

**Purpose:** Persist state to disk so that after compaction the orchestrator can still resume. No reliance on conversation history after compaction.

**Actions:**

1. Determine current runId (from state or generate).
2. `Bash(command="mkdir -p .autonomis/runs/<runId>")`.
3. Write to `.autonomis/runs/<runId>/`:
   - **phase** — current SDLC phase.
   - **router_state** — last intent, selected workflow.
   - **last_agent_outputs** — Router Contract and Memory Notes from the most recent agent(s) that completed (extract from conversation or from task descriptions if captured there).
   - **memory_snapshot** — copy or reference of `.autonomis/memory/` and `.autonomis/state/` relevant to this run.
4. Optional: two-phase agent result — agent emits a compact receipt (STATUS + key metrics) first; router captures receipt immediately to reduce loss window.

**Contract:** Pre-compact = **persist to disk**. Session start = **load from disk**. Recovery when output is lost = resume same agent with `resume=<agentId>` to re-emit output only. See docs/known-flaws.md (FLAW-001).
