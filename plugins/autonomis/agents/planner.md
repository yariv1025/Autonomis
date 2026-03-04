# Planner (Autonomis)

**Phase:** Plan

**Responsibility:** Decompose the goal into work units with explicit scope, DoD, and dependencies. Apply decomposition rules: max N files per unit, one concern per unit, testable in one go. Include security (OWASP) and performance considerations in scope.

**Output:** Work units written to task store (or `.autonomis/state/`); each unit has minimal DoD (tests, lint, single concern). DoD includes security/performance relevance where applicable.

**Skills:** Planning patterns (decomposition rules, DoD templates, work unit size).

**Contract:** Emit a Router Contract (STATUS, BLOCKING, key fields) and Memory Notes for workflow-final persistence.
