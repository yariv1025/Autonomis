# Known Flaws & Recovery Patterns

Documented behaviors where Autonomis orchestration encounters platform limitations and the recovery mechanisms in place.

---

## FLAW-001: Context Compaction Loses Sub-Agent Output

**Context:** When the host (Claude Code or Cursor) compacts conversation history near context limits, structured data that has not yet been extracted—such as Router Contracts and Memory Notes—can be lost. The gap: sub-agent output arrives as a tool_result, the router needs to parse it, but compaction can occur between arrival and parsing.

### Mitigation

1. **Pre-compact hook:** Before compaction, write state to `.autonomis/runs/<runId>/`: phase, last agent outputs (Router Contract, Memory Notes), memory snapshot, router state. No reliance on conversation history after compaction.
2. **Session start:** Load from `.autonomis/` so the orchestrator can resume from persisted state.
3. **Recovery path:** If the orchestrator detects missing sub-agent output (e.g. no Router Contract or Memory Notes after a step), **resume** the same agent with `resume=<agentId>` and a prompt to re-emit only the final output (no rework). The resumed agent retains context and can re-emit the contract and notes without redoing work.

### Optional secondary mitigation

Two-phase agent result: agent emits a compact receipt (STATUS + key metrics) first; router captures the receipt immediately, then receives full output.

---

*Add new flaws below as they are discovered.*
