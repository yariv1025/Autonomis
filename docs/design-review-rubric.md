# Design Review Rubric

Used by the **Design Reviewer** agent. Plan/design is rejected if security or performance concerns are not addressed.

## Security (required)

- **OWASP Top 10** — Use **owasp-top-10** skill. Check: injection, broken auth, sensitive data exposure, XXE, broken access control, misconfiguration, XSS, insecure deserialization, vulnerable components, insufficient logging.
- **Authentication & authorization** — Identity at every entry point; authz per resource; no cross-user data access.
- **Input validation** — All inputs validated server-side; no SQL concat, no XSS vectors.
- **Secrets** — No hardcoded credentials; use env/config.

## Performance (required)

- **Scalability** — Stateless where possible; no single-point bottlenecks.
- **Latency** — Bounded complexity; no N+1; async where appropriate.
- **Resource use** — Connection pooling, limits, timeouts.
- **Complexity** — Algorithms and data structures appropriate to scale.

## Gate

- **APPROVE** — No blocking security or performance issues; mitigations documented where needed.
- **CHANGES_REQUESTED** — Blocking issues listed with file/section and recommendation. Iterate until approved or user overrides.

Design Reviewer must emit Router Contract (STATUS, BLOCKING, CRITICAL_ISSUES) and Memory Notes.
