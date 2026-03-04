# Eval workspaces (aligned with [skill-creator](https://skills.sh/anthropics/skills/skill-creator))

Each skill has a `-workspace` directory used for evaluation runs. The pipeline matches the skill-creator workflow: **assertions → grade runs → aggregate benchmark → generate viewer**.

**Note:** Eval workspaces are not shipped in the published plugin; they are used only for development and benchmarking. To run evals, clone the repo and use the skill-creator tooling (see skill-creator skill or `.agents/skills/skill-creator` if present).

## Layout

- `skill-snapshot/` — Copy of the skill at the start of the iteration (baseline).
- `iteration-N/` — Iteration directory:
  - `eval-<id>-<name>/` — One directory per eval (from `evals/evals.json`).
  - Inside each: `with_skill/outputs/` and `old_skill/outputs/` (run outputs).
  - `with_skill/timing.json`, `old_skill/timing.json` — Optional; written when you capture task-completion notification (Step 3). Contains `total_tokens`, `duration_ms`, `total_duration_seconds`.
  - `with_skill/grading.json`, `old_skill/grading.json` — Per-run grading (expectations with `text`, `passed`, `evidence`).
  - `eval_metadata.json` — Eval id, name, prompt, assertions.
  - `benchmark.json`, `benchmark.md` — Aggregated pass rates and deltas (with_skill vs old_skill).
  - `review.html` — Static eval viewer (Outputs tab + Benchmark tab). Open in browser to review and submit feedback.

## Full pipeline (skill-creator steps)

1. **Assertions** — Each skill’s `evals/evals.json` has `expectations` (verifiable statements) per eval. Sync to workspace `eval_metadata.json` if you add evals by hand.
2. **Run evals** — Spawn with_skill and old_skill (or without_skill) runs per eval; save outputs to `eval-<id>-<name>/with_skill/outputs/` and `.../old_skill/outputs/`.
3. **Capture timing when runs complete** — When each subagent task completes, you get a notification with `total_tokens` and `duration_ms`. **Save that immediately** to `timing.json` in that run’s directory (e.g. `eval-1-foo/with_skill/timing.json`). This is the only opportunity to capture timing; it is not persisted elsewhere. Example:
   ```json
   {
     "total_tokens": 84852,
     "duration_ms": 23332,
     "total_duration_seconds": 23.3
   }
   ```
   Process each notification as it arrives. If you skip this step, the Benchmark tab will show zeros for time/tokens; you cannot retrofill timing after the fact.

   **Backfill for existing runs:** All current run directories already have a `timing.json` (written by `ensure_timing_json.py` with placeholder `0` for tokens/duration because the completion notifications were not captured). To backfill:
   ```bash
   cd .agents/skills/skill-creator
   python3 -m scripts.ensure_timing_json --skills-root ../../plugins/autonomis/skills
   ```
   **Re-run evals to capture real timing:** To write real `duration_ms` and `total_duration_seconds` into every `timing.json`, run all content evals with the Claude CLI (no API key needed):
   ```bash
   cd .agents/skills/skill-creator
   python3 -m scripts.run_all_content_evals --skills-root ../../plugins/autonomis/skills --timeout 90
   ```
   (The script defaults to the CLI; no `--use-cli` or API key needed.)
   Using the CLI (**`--use-cli`**) is the standard setup when you don't use the Anthropic API. Only **duration** is then recorded: `duration_ms` and `total_duration_seconds` in each `timing.json`; **`total_tokens`** stays `0` (token counts require the API). The Benchmark tab will show real times; token columns will show zero. After the run finishes, re-run aggregate_benchmark and generate_review for each iteration.
4. **Grade runs** — From repo root or from `.agents/skills/skill-creator`:
   ```bash
   cd .agents/skills/skill-creator
   python3 -m scripts.grade_workspace_runs --iteration-dir ../../plugins/autonomis/skills/<skill>-workspace/iteration-1
   ```
   Writes `grading.json` into each `with_skill/` and `old_skill/` from the skill’s assertions and output content.
5. **Aggregate benchmark** — Produces `benchmark.json` and `benchmark.md` in the iteration dir:
   ```bash
   python3 -m scripts.aggregate_benchmark ../../plugins/autonomis/skills/<skill>-workspace/iteration-1 \
     --skill-name <skill> --skill-path ../../plugins/autonomis/skills/<skill>
   ```
   Reads `timing.json` from each run dir when present (from Step 3); otherwise time/tokens show as zero.
6. **Generate viewer** — Static HTML with Outputs + Benchmark tab:
   ```bash
   python3 eval-viewer/generate_review.py ../../plugins/autonomis/skills/<skill>-workspace/iteration-1 \
     --skill-name <skill> --benchmark ../../plugins/autonomis/skills/<skill>-workspace/iteration-1/benchmark.json \
     --static ../../plugins/autonomis/skills/<skill>-workspace/iteration-1/review.html
   ```
7. **Human review** — Open `review.html` in a browser. Use "Outputs" to step through each test case (with_skill vs old_skill) and leave feedback. Use "Submit All Reviews" to download `feedback.json`; place it in the **iteration directory** (e.g. `iteration-1/feedback.json`) so the next iteration’s viewer can show "Previous feedback" when using `--previous-workspace`.
8. **Next iteration** — Improve the skill from feedback, re-run evals into `iteration-2/`, then run steps 3–6 with `--previous-workspace iteration-1` to compare.

## How to review

Open the static viewer for a skill:

```
plugins/autonomis/skills/<skill-name>-workspace/iteration-1/review.html
```

Example: `plugins/autonomis/skills/validator-workspace/iteration-1/review.html`

- **Outputs** — Step through each eval and config (with_skill / old_skill); view grading (expectations pass/fail and evidence); add free-text feedback per run.
- **Benchmark** — Pass rates, timing, and delta (with_skill vs old_skill).
- When done, click **Submit All Reviews** to download `feedback.json`. Save it as `<workspace>/iteration-1/feedback.json` for the pipeline to use in the next iteration.

## Skills with evals

| Skill | Evals | Viewer |
|-------|-------|--------|
| validator | 3 | validator-workspace/iteration-1/review.html |
| verification-before-completion | 2 | verification-before-completion-workspace/iteration-1/review.html |
| test-driven-development | 2 | test-driven-development-workspace/iteration-1/review.html |
| planning-patterns | 2 | planning-patterns-workspace/iteration-1/review.html |
| session-memory | 2 | session-memory-workspace/iteration-1/review.html |
| knowledge-extraction | 2 | knowledge-extraction-workspace/iteration-1/review.html |
| router | 3 | router-workspace/iteration-1/review.html |
| code-review-patterns | 2 | code-review-patterns-workspace/iteration-1/review.html |
| architecture-patterns | 2 | architecture-patterns-workspace/iteration-1/review.html |
| research | 2 | research-workspace/iteration-1/review.html |
| debugging-patterns | 2 | debugging-patterns-workspace/iteration-1/review.html |

## Benchmark

Benchmark and viewer are produced by the pipeline above. The script `grade_workspace_runs.py` writes `grading.json` into each config dir (`with_skill/`, `old_skill/`) using the flat layout (no `run-1` subdirs). `aggregate_benchmark.py` supports this: it reads `config_dir/grading.json` when there are no `run-*` subdirs. Delta in the summary is **with_skill − old_skill** (with_skill is primary).

---

## Code-review-patterns fixtures

Eval prompts for **code-review-patterns** refer to real files so the skill reviews the intended code:

- **Eval 1:** `plugins/autonomis/skills/code-review-patterns/evals/fixtures/src/auth/` (login + JWT-in-cookie stubs).
- **Eval 2:** `plugins/autonomis/skills/code-review-patterns/evals/fixtures/lib/api.ts` (API client stub).

Re-runs of code-review evals will now review these fixtures instead of reporting "file not found" or reviewing unrelated files.

---

## Phase 4: Description optimization (optional)

To optimize each skill’s `description` for better triggering:

1. **Trigger eval set** — Create ~20 queries (mix of should-trigger / should-not-trigger) per skill; save as JSON (e.g. `plugins/autonomis/skills/<skill>/evals/trigger_evals.json`). A sample set for **validator** is at `validator/evals/trigger_evals.json`.
2. **Review** — Use `.agents/skills/skill-creator/assets/eval_review.html`: replace `__EVAL_DATA_PLACEHOLDER__`, `__SKILL_NAME_PLACEHOLDER__`, `__SKILL_DESCRIPTION_PLACEHOLDER__`, save as HTML, open in browser; export reviewed set as `eval_set.json`.
3. **Run loop** (requires `claude` CLI and Python deps):
   ```bash
   pip install anthropic
   cd /path/to/Autonomis
   python3 .agents/skills/skill-creator/scripts/run_loop.py \
     --eval-set plugins/autonomis/skills/<skill>/evals/trigger_evals.json \
     --skill-path plugins/autonomis/skills/<skill> \
     --model <your-model-id> \
     --max-iterations 5 \
     --verbose \
     --use-cli
   ```
   Use your usual Claude model ID (e.g. `claude-sonnet-4-20250514`). If `ModuleNotFoundError: anthropic` appears, install with `pip install anthropic` from a venv that has the skill-creator scripts on the path (or run from `.agents/skills/skill-creator` after `pip install anthropic` there).

   **Improvement step without API key:** Use `--use-cli` so the improvement step uses the Claude Code CLI (`claude -p`) instead of the Anthropic API. No `ANTHROPIC_API_KEY` required for the improve step when using `--use-cli`.

   **Optional:** Add `--results-dir <path>` to save `results.json`, `report.html`, and logs to a timestamped subdirectory.
4. **Apply** — Take `best_description` from the output and update the skill’s SKILL.md frontmatter.
