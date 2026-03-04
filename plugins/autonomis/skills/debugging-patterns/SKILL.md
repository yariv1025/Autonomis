---
name: debugging-patterns
description: |
  Systematic debugging: gather evidence and find root cause before changing code. Use whenever the user reports a bug, error, crash, or "something's broken" — and when acting as Debug Investigator. Do not propose fixes until you have logs, stack trace, and a testable hypothesis; symptom-only fixes hide the real bug and often regress.
allowed-tools: Read, Grep, Glob, Bash, LSP
---

# Systematic Debugging

## Rule

Find root cause before attempting fixes. Patching symptoms (e.g. silencing an error) often hides the real bug and causes regressions elsewhere. So: gather evidence, form a testable hypothesis, then implement one minimal fix and verify.

## Four Phases

1. **Root cause** — Read errors, reproduce, check recent changes, gather evidence (logs, stack traces). Trace data flow; fix at source.
2. **Pattern** — Find working examples, compare, identify differences.
3. **Hypothesis** — Form one testable hypothesis (falsifiable). Test minimally; verify before continuing.
4. **Implementation** — Create failing regression test first, then single minimal fix, then verify.

## Log-First

Gather error message, stack trace, reproduction steps, and diagnostic output before proposing fixes. In multi-component systems, add logging at boundaries to see where it breaks.

## Loop Cap

After 3 failed fix attempts, stop guessing. Escalate: set NEEDS_EXTERNAL_RESEARCH or AskUserQuestion. Document attempts in `.autonomis/state/` or memory (e.g. `[DEBUG-N]: what was tried → result`) so the next step does not repeat them.

## TDD for Fixes

Regression test must fail before fix (RED), then pass after fix (GREEN). That confirms the test is actually catching the bug. Cover relevant variants (locale, config, role, data shape) where applicable; avoid hardcoded single-case fixes.

## Output

Emit Router Contract: STATUS (FIXED | INVESTIGATING | BLOCKED) and Memory Notes for persistence. Use `.autonomis/` for state and memory.
