---
name: code-review-patterns
description: |
  How to run a structured code review with spec compliance first, then security (OWASP) and performance. Use whenever the user asks for a review, audit, or "check this code" — and when acting as Code Reviewer. Every finding must include file:line and recommendation; consider OWASP Top 10 and performance (N+1, blocking, leaks). Use owasp-top-10 skill when available.
allowed-tools: Read, Grep, Glob, LSP
---

# Code Review Patterns

## Rule

Review spec compliance before code quality. If the change does not meet requirements or tests fail, reviewing style or performance is wasted — fix the spec gap first. So: verify it implements the requirement and tests pass, then review quality.

## Two Stages

1. **Spec compliance** — Does it implement the requirement? Trace implementation to acceptance criteria; run tests. Only proceed to Stage 2 if Stage 1 passes.
2. **Code quality** — Security, correctness, performance, maintainability, UX/A11y where applicable.

## Security

Consider **OWASP Top 10**; use **owasp-top-10** skill when available. Checklist: input validation, auth/authz, no secrets in code, parameterized queries (no SQL concat), output encoding (no XSS), CSRF, file handling (no path traversal).

Quick scans: `grep` for secrets, SQL concatenation, `eval`, `innerHTML`/`dangerouslySetInnerHTML`. Flag only when certain; false positives erode trust.

## Performance

Check: N+1 queries, unnecessary loops, missing cache, blocking sync, memory leaks. Cite file:line for each finding.

## Evidence

Every finding: file:line + fix recommendation. Severity: CRITICAL (must fix), MAJOR (should fix), MINOR (can defer). Do not approve if any CRITICAL issues remain.

## Output

Use this structure so the reviewer's decision is actionable:

- **Stage 1:** Spec compliance (pass/fail, tests run).
- **Stage 2:** Security, performance, quality findings with file:line and recommendation.
- **Decision:** Approve | Request Changes.
- **Required fixes:** List with file:line and recommendation (only when Decision is Request Changes).

## Autonomis

Design Reviewer and Code Reviewer are separate. Both use **owasp-top-10** and the performance rubric. Emit Router Contract (STATUS, CRITICAL_ISSUES, EVIDENCE_ITEMS) and Memory Notes.
