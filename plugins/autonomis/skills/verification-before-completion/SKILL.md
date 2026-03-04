---
name: verification-before-completion
description: |
  Do not claim "done", "tests pass", or "lint clean" without running the actual commands and showing exit codes and output. Use this skill whenever you are about to declare a task complete — so the user and the system get proof instead of assumption. Works with validator (discover → run → parse) or manual run; evidence format is required.
allowed-tools: Read, Grep, Glob, Bash, LSP
---

# Verification Before Completion

## Rule

No completion claims without fresh verification evidence. "Looks good" or "should pass" without running the command is not acceptable — the next person (or CI) might see a different result.

## What to do

1. **Identify** what command proves the claim (test, lint, build). Discover from package.json, pyproject.toml, Makefile, go test, cargo test, etc.
2. **Run** the full command in run-once mode (no watch).
3. **Read** output; check exit code.
4. **Then** state the claim with evidence in the format below.

The implementer does not declare "done"; the validator (or you, following this skill) does, after running and capturing. This keeps completion claims falsifiable.

## Evidence format

Use this for each command run:

`[command] → exit [code]: [result summary]`

Example: `npx vitest run → exit 0: 12 passed`

Tests, build, and lint must show exit 0 and output from this session before you claim success.
