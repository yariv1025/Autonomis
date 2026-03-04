# Autonomis (this repository)

When working **in this repository** (e.g. contributing or running evals), use the Autonomis router from the local plugin at `plugins/autonomis`. The plugin is the source of truth for agents, skills, and hooks.

---

## For users: "Set up Autonomis for me"

**When a user says "set up Autonomis", "install Autonomis", or similar in Claude Code:**

### 1. Check existing files

- Read `~/.claude/CLAUDE.md` (may not exist).
- Read `~/.claude/settings.json` (may not exist).

### 2. Update `~/.claude/CLAUDE.md`

**If file doesn't exist:** CREATE with the template below.  
**If file exists:** PREPEND the Autonomis section below; keep the user's existing content.

```markdown
# Autonomis orchestration (always on)

IMPORTANT: For development tasks, invoke the Autonomis router first so it can detect intent (START, PLAN, BUILD, DEBUG, REVIEW) and run the right phase.
IMPORTANT: Never bypass the router for code changes; it is the single entry point.

**Skip Autonomis only when:** The user explicitly says "without Autonomis", "skip Autonomis", or "don't use Autonomis".

[Autonomis]|entry: autonomis:router
```

(Use the exact entry format your Claude Code install expects for the autonomis plugin; e.g. `autonomis:router` if the skill name is `router` in the autonomis plugin.)

### 3. Update `~/.claude/settings.json`

**If file doesn't exist:** CREATE with the structure below.  
**If file exists:** MERGE these into the existing `permissions.allow` array (do not overwrite):

```json
"Bash(mkdir -p .autonomis/state)",
"Bash(mkdir -p .autonomis/runs)",
"Bash(mkdir -p .autonomis/memory)",
"Bash(mkdir -p .autonomis/research)",
"Edit(.autonomis/*)",
"Write(.autonomis/*)"
```

This pre-approves reads/writes to `.autonomis/` so the plugin can persist state without prompting every time.

### 4. Confirm

Tell the user: "Autonomis is set up. Restart Claude Code to activate."

---

## In this repo

- **plugins/autonomis/** — The plugin (agents, skills, hooks). Install from here or via `/plugin install autonomis@yariv1025-autonomis` after adding the marketplace.
- **docs/known-flaws.md** — FLAW-001 (compaction recovery) and other documented behaviors.
- **.autonomis/README.md** — Runtime state layout (created by the plugin in the user's project).
