# Autonomis (this repository)

When working **in this repository** (e.g. contributing or running evals), use the Autonomis router from the local plugin at `plugins/autonomis`. The plugin is the source of truth for agents, skills, and hooks.

---

## For users: "Set up Autonomis for me" (Cursor)

**Cursor’s analogue to Claude Code’s CLAUDE.md:** project-level instructions live in **AGENTS.md** (this file) and/or **.cursor/rules/** (`.mdc` files with YAML frontmatter). There is no file literally named "CLAUDE.md" in Cursor.

**When a user says "set up Autonomis", "install Autonomis", or similar in Cursor:**

### 1. Install the plugin

- Add marketplace: `/plugin marketplace add yariv1025/Autonomis`
- Install: `/plugin install autonomis@yariv1025-autonomis`

### 2. Add project instructions

In the **user’s project** (not this repo), add an **AGENTS.md** at the project root with content like:

```markdown
# Autonomis orchestration (always on)

IMPORTANT: For development tasks, invoke the Autonomis router first so it can detect intent (START, PLAN, BUILD, DEBUG, REVIEW) and run the right phase.
IMPORTANT: Never bypass the router for code changes; it is the single entry point.

Skip Autonomis only when the user explicitly says "without Autonomis", "skip Autonomis", or "don't use Autonomis".

Use the Autonomis plugin/skill to run the router (e.g. via Cursor’s plugin or skill invocation for autonomis:router).
```

Alternatively (or in addition), add a rule under `.cursor/rules/` (e.g. `autonomis.mdc`) with the same instructions.

### 3. Ensure .autonomis/ permissions

The plugin needs to read/write `.autonomis/` (state, runs, memory, research). If Cursor or the environment restricts file access, ensure `.autonomis/*` is allowed or create the directories: `.autonomis/state`, `.autonomis/runs`, `.autonomis/memory`, `.autonomis/research`.

### 4. Confirm

Tell the user: "Autonomis is set up for Cursor. Use the Autonomis plugin/skill to run the router when starting development tasks."

---

## In this repo

- **plugins/autonomis/** — The plugin (agents, skills, hooks). Install from here or via the marketplace.
- **docs/known-flaws.md** — FLAW-001 (compaction recovery) and other documented behaviors.
- **.autonomis/README.md** — Runtime state layout (created by the plugin in the user's project).
- **autonomis-architecture-explorer.html** — Open in a browser to view the high-level architecture diagram.
