# Autonomis

**A dual-platform (Claude Code + Cursor) plugin for agentic development:** one SDLC-driven workflow—Research → Plan → Design Review → Execution Loop → PR → Learning—with security (OWASP Top 10) and performance built in from the start.

**Current version:** 0.1.0

---

## What Autonomis Does

- **Single entry point:** A router detects intent (START, PLAN, BUILD, DEBUG, REVIEW) and runs the right phase or full pipeline.
- **Deterministic execution loop:** Implement → Validate → (on fail) Debug → Validate → (on pass) Code Review. Fixed order; iteration cap and human escalation when validation keeps failing.
- **Security and performance first:** Design Review and Code Review must use OWASP Top 10 and a performance rubric; no sign-off without them.
- **File-based state:** Everything under `.autonomis/` (state, runs, memory, research). Optional beads-backed task store later.
- **Compaction-safe:** Pre-compact hook writes state to disk; session start loads it; recovery path when sub-agent output is lost (see [docs/known-flaws.md](docs/known-flaws.md)).

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  YOU: "build a login flow" / "debug the failing test" / "review this PR"    │
│                              ┌──────────────────────────────────────────┐   │
│                       ┌──────►  Research → Plan → Design Review          │   │
│                       │      │  (OWASP + performance gates)               │   │
│  ┌─────────────────┐  │      └──────────────────┬───────────────────────┘   │
│  │                 │  │                          │                          │
│  │  Router         │──┼────── BUILD/DEBUG/REVIEW ─┼──► Execution Loop        │
│  │  (single entry) │  │       (Implement → Validate → Debug → Review)       │
│  │                 │  │                          │                          │
│  └─────────────────┘  │      ┌──────────────────▼───────────────────────┐   │
│                       └──────►  PR → Learning                            │   │
│                              │  (memory updated for next session)         │   │
│                              └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**You say what you want. The router runs the right phase and agents.**

---

## Install

### Claude Code

1. Add a plugin marketplace that includes this repo (or follow [plugin-structure](https://skills.sh/anthropics/claude-plugins-official/plugin-structure)).
2. Install the `autonomis` plugin; point at `plugins/autonomis` (`.claude-plugin/plugin.json`).

### Cursor

1. **From Marketplace (when published):** Install **Autonomis** from the [Cursor Marketplace](https://cursor.com/marketplace).
2. **From repo:** Clone this repo and add `plugins/autonomis` as a local plugin (`.cursor-plugin/plugin.json`).

### After install

- **Optional:** Run interactive install (when implemented) to set IDE, project type, and OWASP suggestions.
- **Optional:** Install the pre-commit hook:  
  `cp plugins/autonomis/hooks/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`

---

## Quick Start

### Use the router

Ask to build, plan, review, or debug. The router loads state from `.autonomis/` and runs the right phase.

| You say… | Router does |
|----------|-------------|
| "Plan a settings page" | PLAN → Planner (decomposition, DoD, security/performance in scope) |
| "Build the login flow" | BUILD → Execution Loop (Implement → Validate → Debug → Review) |
| "Debug the failing test" | DEBUG → Execution Loop (log-first, then fix, then validate) |
| "Review this branch" | REVIEW → Design Review or Code Review (OWASP + performance rubric) |

### Runtime state

The plugin creates and uses `.autonomis/` in your project root: state, runs, memory, research. See [.autonomis/README.md](.autonomis/README.md).

---

## Layout

```
plugins/autonomis/
├── .claude-plugin/plugin.json    # Claude Code manifest
├── .cursor-plugin/plugin.json    # Cursor Marketplace manifest
├── agents/                       # Planner, Implementer, Code Reviewer, etc.
├── skills/                       # router, session-memory, validator, TDD, etc.
├── hooks/                        # session-start, pre-compact, pre-commit, plan-review-owasp
│   ├── hooks.json                # Hook registration (Cursor)
│   ├── session-start.md
│   ├── pre-compact.md
│   ├── pre-commit                # Install to .git/hooks/pre-commit
│   └── plan-review-owasp.md
.autonomis/                       # Runtime state (created by plugin)
docs/                             # known-flaws.md, evals-pipeline.md
.agents/skills/skill-creator/     # Eval pipeline for contributors (see below)
```

Eval workspaces (`plugins/autonomis/skills/*-workspace/`) are **not** in the repo; they are recreated when you run the eval pipeline locally.

---

## Evaluating Skills (For Contributors)

You can run the full skill evaluation pipeline from this repo to improve the plugin’s skills. **Eval workspaces and run artifacts are not committed** so the published plugin stays small; you generate them locally when you run evals.

### What’s in the repo

- **Skill definitions** — Each skill under `plugins/autonomis/skills/<name>/` has `SKILL.md` and optionally `evals/evals.json` (assertions).
- **Eval tooling** — `.agents/skills/skill-creator/` contains scripts and the eval viewer used to run evals, grade runs, aggregate benchmarks, and generate the review HTML.

### What’s not in the repo

- **Eval workspaces** — Directories like `plugins/autonomis/skills/<name>-workspace/` (e.g. `router-workspace/`, `validator-workspace/`) are **gitignored**. They contain iteration dirs, run outputs, `grading.json`, `timing.json`, `benchmark.json`, and `review.html`. You create these when you run the pipeline.

### How to run evals

1. **Clone the repo** and ensure you have Python 3 and the `claude` CLI (for running evals; no API key required for duration-only timing).
2. **Read the full pipeline** in [docs/evals-pipeline.md](docs/evals-pipeline.md). It covers:
   - Assertions in each skill’s `evals/evals.json`
   - Running with_skill vs old_skill per eval
   - Capturing timing (optional; CLI gives duration, API gives tokens)
   - Grading runs, aggregating benchmarks, generating the static viewer
3. **Run from the skill-creator directory:**
   ```bash
   cd .agents/skills/skill-creator
   # Run all content evals (creates *-workspace dirs and outputs)
   python3 -m scripts.run_all_content_evals --skills-root ../../plugins/autonomis/skills --timeout 90
   # Then grade, aggregate, and generate review per iteration (see docs/evals-pipeline.md)
   ```
4. **Open the generated viewer** at e.g. `plugins/autonomis/skills/<skill>-workspace/iteration-1/review.html` to review outputs and benchmarks.

Re-running evals in the future: run the same pipeline; your local `*-workspace/` dirs will be updated. They remain untracked so they are not pushed to GitHub.

---

## Inspired By

Autonomis synthesizes ideas from four open-source projects (all MIT-licensed), which we thank and recommend exploring:

| Project | What we drew from |
|--------|---------------------|
| **cc10x** ([github.com/romiluz13/cc10x](https://github.com/romiluz13/cc10x)) | Intent-based routing (BUILD/DEBUG/REVIEW/PLAN), router-as-single-entry-point, session memory and verification-before-completion disciplines, pre-compact state persistence and recovery (FLAW-001), pre-commit test gate. |
| **babysitter** (A5C AI) | Hook-driven orchestration, human escalation and iteration caps, quality gates and process structure. |
| **beads** (Beads Contributors) | Task and dependency model; Autonomis uses a file-based task store with an interface that allows an optional beads backend later. |
| **metaswarm** (Dave Sifry) | Selective context loading by scope (files, keywords, work type) so memory stays bounded and relevant. |

Autonomis is an independent project; we use these concepts and patterns with gratitude and attribution. Code and design in this repository are our own.

*If your project is listed here and you prefer different attribution or wording, please open an issue.*

---

## Publish / Deploy to GitHub

The repo is ready to push to GitHub and use as the source for both Claude Code and Cursor:

1. **Initialize git (if not already):**  
   `git init && git add . && git status`  
   Ensure no `*-workspace` or `.agents` paths are listed as removed if you already had them tracked; see step 2.

2. **If you previously committed eval workspaces and want to stop tracking them (keep them only locally):**
   ```bash
   git rm -r --cached plugins/autonomis/skills/architecture-patterns-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/code-review-patterns-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/debugging-patterns-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/knowledge-extraction-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/planning-patterns-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/research-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/router-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/session-memory-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/test-driven-development-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/validator-workspace 2>/dev/null || true
   git rm -r --cached plugins/autonomis/skills/verification-before-completion-workspace 2>/dev/null || true
   ```

3. **Stage everything that should be committed** (respects .gitignore; includes .agents, excludes *-workspace):
   ```bash
   git add .
   ```

4. **Create a GitHub repo** (e.g. `yariv1025/Autonomis`), add it as `origin`, then:
   ```bash
   git commit -m "Plugin ready for publish"
   git push -u origin main
   ```

5. **Claude Code:** Configure your Claude Code plugin marketplace to include this repository; users install the `autonomis` plugin from the `plugins/autonomis` directory.

6. **Cursor:** Submit the repository at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish) for listing in the Cursor Marketplace (manual review). Or use a [Team Marketplace](https://cursor.com/docs/plugins#team-marketplaces) and add this repo so your team can install from it.

---

## License

MIT. See [LICENSE](LICENSE).
