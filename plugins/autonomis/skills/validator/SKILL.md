---
name: validator
description: |
  Discover and run project test/lint/build commands, then parse results into structured evidence. Use whenever the user or workflow needs to verify "tests pass" or "lint is clean" — for any language or stack (Node, Python, Go, Rust, Make, etc.). Use this skill so that "done" is backed by exit codes and output, not by assumption. No PASS without running the commands and capturing evidence.
allowed-tools: Read, Bash, Grep, Glob
---

# Validator (Discover → Run → Parse)

## Purpose

Claiming "done" without evidence leads to broken main or silent regressions. This skill provides evidence: discover project test/lint/build commands, run them, parse exit codes and optional output (JUnit, JSON). The implementer does not declare success — the validator does, after running and capturing results.

## Implementation Options

- **(A) Skill-driven:** Skill instructs the LLM to run Bash: discover commands (from `package.json`, `pyproject.toml`, `Makefile`, `go test`, `cargo test`, etc.), run them, parse results with a strict contract (exit code, optional path to results).
- **(B) Script:** A small script (Node/Python) invoked by the skill discovers commands, runs them, returns structured JSON; LLM only reads result.

Either way: project-agnostic, multi-language (discovery table or heuristics by project root files).

## Discovery Heuristics

| Project root file      | Test command (examples)     | Lint/Build        |
|------------------------|----------------------------|-------------------|
| package.json           | npm test, vitest run, jest  | npm run lint/build |
| pyproject.toml/setup.py| pytest                     | ruff, flake8      |
| Makefile               | make test                  | make lint/build   |
| go.mod                 | go test ./...              | go build          |
| Cargo.toml             | cargo test                 | cargo clippy      |

Use run mode (e.g. `CI=true npm test`, `npx vitest run`). Watch mode does not exit, so it cannot produce a definite pass/fail; use run-once invocations only.

## Contract

- **Input:** Current work unit scope (files or project root).
- **Output:** Use this structure so downstream steps can gate on it:

  - STATUS: PASS | FAIL
  - SCENARIOS_PASSED / SCENARIOS_TOTAL (when available from runner output)
  - EVIDENCE: array of `[command] → exit [code]: [summary]`

- **Gate:** Do not report PASS unless all relevant commands were executed in this session and evidence was captured. A missing run is not a pass.

## Example output

```
STATUS: PASS
SCENARIOS_PASSED: 12
SCENARIOS_TOTAL: 12
EVIDENCE:
  - npm run lint → exit 0: no issues
  - npx vitest run → exit 0: 12 passed
```

## Autonomis

Used in Execution Loop after Implement and after Debug. Verification-before-completion skill aligns: no completion claims without fresh verification evidence.
