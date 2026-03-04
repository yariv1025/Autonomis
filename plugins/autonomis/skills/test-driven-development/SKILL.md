---
name: test-driven-development
description: |
  RED–GREEN–REFACTOR: write a failing test first, then minimal code to pass, then refactor. Use for new features, bug fixes, refactors, and behavior changes — and when acting as Implementer or Debug Investigator. Do not write production code until the test fails (RED); otherwise you cannot be sure the test actually guards the behavior.
allowed-tools: Read, Grep, Glob, Bash, Write, Edit
---

# Test-Driven Development (TDD)

## Rule

Write the test first, watch it fail, then add minimal code to pass. If you did not see the test fail, you do not know that it tests the right thing (it might always pass or test nothing). So: RED first, then GREEN, then REFACTOR.

## When to Use

Use for new features, bug fixes, refactoring, and behavior changes. Exceptions (ask user): throwaway prototypes, generated code, config-only changes.

## Red–Green–Refactor

1. **RED** — Write one minimal failing test. Run it; exit code must be **1**. The failure message should be expected (confirms the test is hitting the right code).
2. **GREEN** — Minimal code to pass. Run tests; exit code **0**. No extra features.
3. **REFACTOR** — Clean up; keep tests green. Then repeat for the next behavior.

## Test Process Discipline

Use run-once mode: `npx vitest run`, `CI=true npx jest`, `CI=true npm test`. Watch mode does not exit, so it cannot prove pass/fail for this session. After a TDD cycle, ensure no watch process is left running (e.g. `pgrep -f "vitest|jest"`; if found, stop it).

## Verification

Before claiming done: show RED phase (command + exit 1 + output) and GREEN phase (command + exit 0 + output). Evidence format: `[command] → exit [code]: [result]`.

## Autonomis Memory

Update `.autonomis/state/` or memory via session-memory skill (Read-Edit-Read). Use `.autonomis/` paths.
