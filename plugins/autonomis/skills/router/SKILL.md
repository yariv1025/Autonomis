---
name: autonomis-router
description: |
  The single entry point for Autonomis. Use this skill whenever the user wants to build, implement, plan, design, review code, debug, fix bugs, run research, open a PR, or run a full SDLC flow — even if they say "help me with this repo", "something's broken", "we need to ship feature X", or "from scratch". Triggers on: build, implement, plan, design, review, debug, fix, research, PR, learn. Do not list capabilities; execute the matching workflow.
---

# Autonomis Router

**Execution engine.** When loaded: Detect intent → Load state from `.autonomis/` → Execute phase or full SDLC → Persist state.

Listing capabilities wastes the user's time; they asked for action. So: detect intent, load state, then run the selected workflow. Do not describe what Autonomis can do — do it.

## Intents

| Priority | Intent   | Keywords / signals | Action |
|----------|----------|--------------------|--------|
| 1 | **START** | "start", "full flow", "from scratch", "do the whole thing" | Full SDLC: Research → Plan → Design Review → Execution Loop → PR → Learning |
| 2 | **DEBUG** | error, bug, fix, broken, crash, fail, debug, troubleshoot | Enter Execution Loop in debug/recovery branch |
| 3 | **PLAN** | plan, design, architect, roadmap, strategy, spec | Plan phase (decompose into work units) |
| 4 | **REVIEW** | review, audit, check, assess | Design Review gate or code review in Execution |
| 5 | **BUILD** | build, implement, create, add, develop, feature | Execution Loop: Implement → Validate → Review |

**Conflict:** Error/debug signals override build/plan. "fix the build" or "tests are failing" should route to DEBUG so the user gets a fix, not a fresh plan.

## SDLC Phases (full run)

1. **Research** — Gather context, prior art; write to `.autonomis/research/` or memory.
2. **Plan** — Decompose into work units (scope, DoD, dependencies); apply max-files-per-unit rules.
3. **Design Review** — Gate: owasp-top-10 + performance rubric; approve or request changes.
4. **Execution Loop** — Per work unit: Implement → Validate → (on fail) Debug → Validate → (on pass) Code Review. Iteration cap (default 3); then escalate.
5. **PR** — Create PR, monitor CI, handle review comments.
6. **Learning** — Extract patterns; update `.autonomis/memory/` with selective loading by scope.

## State (load first)

- **Session start:** Load from `.autonomis/state/`, `.autonomis/runs/<runId>/` if resuming, and selective `.autonomis/memory/` by current scope.
- **Pre-compact hook:** Writes state to `.autonomis/runs/<runId>/` before compaction (see docs/known-flaws.md FLAW-001).
- **Recovery:** If sub-agent output is lost, resume same agent with `resume=<agentId>` to re-emit output only.

## Agents and Skills (reference)

- **Research:** Researcher (autonomis:researcher); skill: autonomis:research (synthesis).
- **Plan:** Planner (autonomis:planner); skills: autonomis:planning-patterns.
- **Design Review:** Design Reviewer (autonomis:design-reviewer); skills: owasp-top-10, autonomis:architecture-patterns.
- **Execution:** Implementer (autonomis:implementer), Integration Verifier (autonomis:integration-verifier), Debug Investigator (autonomis:debug-investigator), Code Reviewer (autonomis:code-reviewer); skills: autonomis:session-memory, autonomis:test-driven-development, autonomis:verification-before-completion, autonomis:validator, autonomis:code-review-patterns, owasp-top-10.
- **PR:** PR Shepherd (autonomis:pr-shepherd).
- **Learning:** Learning (autonomis:learning); skills: autonomis:knowledge-extraction.

Execute the selected workflow; do not describe it.

## Output

Emit Router Contract: STATUS (e.g. START | DEBUG | PLAN | REVIEW | BUILD), selected phase or loop, and **Memory Notes** (1–2 sentences when relevant: e.g. what was loaded from `.autonomis/`, what the user goal is, or the recommended next step). Memory Notes make the contract actionable so the next step or agent knows what to do without re-reading the whole context. No prose summary of capabilities.
