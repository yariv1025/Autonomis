---
name: architecture-patterns
description: |
  Design architecture from functionality: map user/admin/system flows first, then assign components. Use when the user asks to design, architect, or plan system structure — and when acting as Design Reviewer. Include API design, service boundaries, data model, caching, and security; address performance (N+1, blocking, unbounded growth) in the design.
allowed-tools: Read, Grep, Glob, LSP
---

# Architecture Patterns

## Rule

Map functionality flows before designing components. Designing components first often leads to mismatched boundaries or unused abstractions. So: map what the system must do (flows), then map each step to components, then design each component's contract and behavior.

## Process

1. **Map flows** — User flows, admin flows, system flows (step-by-step).
2. **Map to components** — Each flow step → frontend route, API endpoint, service, database, etc.
3. **Design components** — Purpose (functionality), inputs, outputs, dependencies, error handling.

## Focus Areas

- API design (versioning, errors, auth).
- Service boundaries and communication.
- Data model (normalization, indexes).
- Caching and performance.
- Security (auth, rate limiting).

## Performance

Consider latency, scalability, resource use, complexity. Address N+1, blocking calls, and unbounded growth in design review so they do not become production issues.

## Output

Use this structure so the design is actionable:

- Functionality summary; flows mapped.
- System context; components table (purpose, inputs, outputs, dependencies).
- API endpoints; key decisions with trade-offs.
- Implementation roadmap: critical / important / enhancement.

## Autonomis

Design Reviewer uses this skill plus **owasp-top-10** and performance checklist. Plans and designs should not be approved if security or performance concerns are left unaddressed.
