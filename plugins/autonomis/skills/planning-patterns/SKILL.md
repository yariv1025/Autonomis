---
name: planning-patterns
description: |
  Decompose work into executable steps with exact files, commands, and DoD. Use when the user asks to plan, design, or break down a feature — and when acting as Planner. Every step must be a specific action (e.g. "write failing test for empty email, run it, implement check, run it"); plans must be runnable without asking questions. Apply max-files-per-unit and bite-sized steps.
allowed-tools: Read, Grep, Glob, AskUserQuestion, LSP
---

# Planning Patterns

## Rule

Every step must be a specific, executable action. Vague steps like "add validation" cannot be run or verified. Good steps name the file, the action, and the check: e.g. "Write failing test for empty email in `src/validation.test.ts`, run `npm test`, implement check in `src/validation.ts`, run `npm test` again."

**Example — good vs vague:**

- **Good:** In `src/auth/validateLogin.test.ts` add a test that calls `validateLogin('', 'pass')` and expects an error; run `npm test -- validateLogin`, expect fail. Then in `src/auth/validateLogin.ts` implement the empty-email check; run `npm test -- validateLogin`, expect pass.
- **Vague:** Add validation. *(Cannot be run or verified; no file, no command, no expected result.)*

## Work Unit Rules (Autonomis)

- **Max N files per unit** (configurable in `.autonomis/config`).
- **One concern per unit** — testable in one go.
- **DoD per unit:** tests, lint, single concern; include security/performance where applicable.
- **Bite-sized:** Each step ~2–5 minutes (one action).

## Plan Document Header

Include: Goal, Architecture (2–3 sentences), Tech Stack, Prerequisites. Reference design doc if present (e.g. `docs/plans/YYYY-MM-DD-<feature>-design.md`).

## Task Structure

For each work unit: **Files** (create/modify/test with exact paths), **Steps** (numbered: write test → run fail → implement → run pass → commit). Include validation commands and expected exit codes.

## Save Plan and State

- Save plan to `docs/plans/YYYY-MM-DD-<feature>-plan.md` (or project convention).
- Update `.autonomis/state/` with plan reference and next steps (via session-memory; use Read-Edit-Read with stable anchors).

## Risk and Validation

Match validation depth to risk: syntax/lint (every task), unit tests (low–medium), integration (medium–high), manual (high–critical). Document risks with probability, impact, mitigation.
