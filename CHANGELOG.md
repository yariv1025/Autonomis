# Changelog

All notable changes to Autonomis are documented here.

## [0.1.0] — 2026-03-02

### Added

- Initial release: dual-platform (Claude Code + Cursor) plugin.
- Single SDLC workflow: Research → Plan → Design Review → Execution Loop → PR → Learning.
- Router as sole entry point; intents START, PLAN, BUILD, DEBUG, REVIEW.
- Deterministic Execution Loop: Implement → Validate → (on fail) Debug → Validate → (on pass) Review.
- Security-first: OWASP Top 10 and performance rubric in Design Review and Code Review.
- File-based state under `.autonomis/` (state, runs, memory, research).
- Hooks: session-start (load state), pre-compact (persist state), pre-commit, plan-review-owasp.
- Skills: router, session-memory, verification-before-completion, validator, test-driven-development, code-review-patterns, planning-patterns, debugging-patterns, knowledge-extraction, research, architecture-patterns.
- Agents: Researcher, Planner, Design Reviewer, Implementer, Validator, Debug Investigator, Code Reviewer, PR Shepherd, Learning.
- Claude Code marketplace: `/plugin marketplace add yariv1025/Autonomis` and `/plugin install autonomis@yariv1025-autonomis`.
- High-Level Architecture diagram (Mermaid) and README layout.
- CLAUDE.md for "Set up Autonomis for me" and project context.
- Settings template for `.autonomis/` permissions.

[0.1.0]: https://github.com/yariv1025/Autonomis/releases/tag/v0.1.0
