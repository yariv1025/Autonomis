# Eval comparison: with_skill vs old_skill — Feedback

Comparison of outputs across all 11 skills and 24 evals. **with_skill** = current (improved) skill; **old_skill** = snapshot (same content at run time; baseline).

---

## 1. Validator (3 evals)

**Eval 1 (node discover & run), Eval 2 (verify after change), Eval 3 (python discover run)**

- **with_skill:** Clear contract block (STATUS: FAIL, EVIDENCE with discovery-only note). Concise report; explains why PASS is not reported (no commands run).
- **old_skill:** Same behavior: discovery, no package.json/python project at root, STATUS FAIL, evidence format. Slightly more narrative ("Discovery was performed per skill heuristics…").

**Feedback:** Both follow the skill. with_skill is slightly leaner. No functional difference; evals ran in a repo with no Node/Python at root so both correctly reported FAIL with discovery evidence. **No change needed.**

---

## 2. Verification-before-completion (2 evals)

**Eval 1 (evidence before done), Eval 2 (run tests/lint)**

- **with_skill:** Explicit "What to do" and "Evidence format" sections; ran npm test/lint from root, captured exit 254; conclusion: do not claim "done" without exit 0 and evidence.
- **old_skill:** Same structure: what to do, evidence format, ran commands, conclusion that we're not done.

**Feedback:** Behavior aligned. with_skill's "What to do" is a bit more instructional. **No change needed.**

---

## 3. Test-driven-development (2 evals)

**Eval 1 (email validation TDD), Eval 2 (empty username RED–GREEN)**

- **with_skill (eval 1):** Plain Node script + test; RED (exit 1, AssertionError) and GREEN (exit 0, "All tests passed") with command and output; evidence line at end.
- **old_skill (eval 1):** Vitest-based; same RED/GREEN structure with full vitest output; same evidence.

**Feedback:** Both satisfy TDD and evidence format. with_skill used minimal Node; old_skill used Vitest. Both valid. **No change needed.**

---

## 4. Planning-patterns (2 evals)

**Eval 1 (decompose login), Eval 2 (settings page plan)**

- **with_skill:** Plan with Goal, Architecture, Tech stack, Prerequisites, then work units. Units have exact paths (e.g. `src/auth/validateLogin.ts`), numbered steps (write test → run fail → implement → run pass), validation commands, DoD. Unit 1 starts with validation; then form UI, then API, then token/redirect.
- **old_skill:** Same high-level structure (Goal, Architecture, Work units). Slightly different ordering (e.g. form UI first, then validation in Unit 2). Steps are still concrete (file + action + verify).

**Feedback:** with_skill is slightly more consistent (validation-first in eval 1) and explicit on paths. Both avoid vague steps. **Optional:** In the skill, add one example of "good step" vs "bad step" to reinforce specificity.

---

## 5. Session-memory (2 evals)

**Eval 1 (load state), Eval 2 (update state)**

- **with_skill (eval 1):** Short output: scope "auth feature"; loaded none; created state/, memory/, runs/, research/. Clear "No prior state or memory."
- **old_skill (eval 1):** Same content in slightly different wording; "Created: Full layout…"; "No prior auth-related state or memory found."

**Feedback:** Equivalent. with_skill is a bit more compact. **No change needed.**

---

## 6. Knowledge-extraction (2 evals)

**Eval 1 (extract auth learnings), Eval 2 (add decision + gotcha)**

- **with_skill (eval 1):** Three sections (Learnings, Common Gotchas, Decisions); one line each; tag `[auth]`. Clean anchors.
- **old_skill (eval 1):** Same three sections; similar content with `[auth, middleware]` etc. Slightly different phrasing ("JWT secret must be in env not in code; keep out of source").

**Feedback:** Both append to stable sections with tags. with_skill's "JWT signing secret must be in env not in code — prevents leakage and allows rotation" is slightly clearer. **No change needed.**

---

## 7. Router (3 evals)

**Eval 1 (build broken → DEBUG), Eval 2 (plan dashboard), Eval 3 (review auth branch)**

- **with_skill (eval 1):** router-contract.md with STATUS: DEBUG, selected phase/loop (Execution Loop — debug/recovery branch), Memory Notes (user goal, state loaded, validation run note).
- **old_skill (eval 1):** router-contract.json only: STATUS DEBUG, phase_or_loop, Memory_Notes [].

**Feedback:** with_skill gives an **actionable** contract (what was loaded, what was run, what to do next). old_skill is minimal JSON. **Improvement from with_skill:** keep the "Memory Notes" and "first step" style in the skill so the router always emits something actionable, not just STATUS + phase. **Suggestion:** In router SKILL.md "Output" section, explicitly ask for 1–2 sentence Memory Notes when relevant (e.g. what was loaded, what the next step is).

---

## 8. Code-review-patterns (2 evals)

**Eval 1 (two-stage review src/auth), Eval 2 (API client review)**

- **with_skill (eval 1):** Stage 1 FAIL (no src/auth/); Stage 2 "no file:line"; Decision Request Changes; Required fixes as a table (add src/auth/; when implementing: JWT secret, middleware, cookie attributes). Checklist referenced.
- **old_skill (eval 1):** Same: Stage 1 FAIL, Stage 2 skipped, Decision Request Changes, required fix "provide code under src/auth/". Shorter.

**Feedback:** with_skill is more **structured** (table of required fixes, checklist called out). Both correctly refused to approve without code. **No change needed.** (Eval 2 had reviewed generate_review.py when lib/api.ts was missing; fixtures are now in place for future runs.)

---

## 9. Architecture-patterns (2 evals)

**Eval 1 (settings page design), Eval 2 (file upload backend)**

- **with_skill (eval 1):** design.md with flows (change display name, email, password) → flow→component table → components table (SettingsPage, ProfileForm, EmailForm, PasswordForm, UserService) → API endpoints table with trade-offs → security/performance → roadmap (critical/important/enhancement).
- **old_skill (eval 1):** settings-page-design.md with generic "settings page" flows (view, edit section, change password, toggle); flow→component and components table; API and roadmap. Less specific to "display name, email, password" as three distinct flows.

**Feedback:** with_skill is **more specific** to the prompt (three concrete flows and endpoints). old_skill is good but more generic. **Improvement from with_skill:** the skill's "Map flows" step is being applied more literally (user's flows first, then map). **No skill change needed** — behavior is desired.

---

## 10. Research (2 evals)

**Eval 1 (synthesize rate limiting), Eval 2 (synthesize auth options)**

- **with_skill (eval 1):** Findings (5 bullets: token bucket, sliding/fixed window, per user/IP, gotchas on clock skew, burst, 429 vs 503); Synthesis with knowledge gap, recommended approach, 3 patterns, gotchas, references. Very structured.
- **old_skill (eval 1):** Same sections; slightly shorter findings; same synthesis idea (sliding/token bucket, Redis, 429, Retry-After). Good but less detailed.

**Feedback:** with_skill delivers **richer** Findings and Synthesis (e.g. 429 vs 503, burst vs sustained). **No change needed.**

---

## 11. Debugging-patterns (2 evals)

**Eval 1 (investigate Invalid token — no fix), Eval 2 (investigate then fix)**

- **with_skill (eval 1):** investigation.md with "Evidence to gather," "Reproduction steps (template)," "Where in the flow it breaks," "One testable hypothesis," and Memory note. No code fix; STATUS INVESTIGATING.
- **old_skill (eval 1):** eval-1-output.txt with STATUS, evidence gathered (none in repo), data flow inferred, one testable hypothesis, memory note. Same "no fix" discipline.

**Feedback:** with_skill is more **template-like** (reusable structure for any "Invalid token"–style bug). old_skill is shorter but same idea. **No change needed.**

---

## Summary table

| Skill                      | with_skill vs old_skill                    | Action              |
|----------------------------|--------------------------------------------|---------------------|
| validator                  | Same behavior; with_skill leaner           | None                |
| verification-before-completion | Same; with_skill more instructional   | None                |
| test-driven-development    | Same RED/GREEN + evidence                  | None                |
| planning-patterns           | with_skill slightly more consistent        | Optional: add example steps |
| session-memory             | Equivalent                                 | None                |
| knowledge-extraction       | Equivalent; with_skill phrasing clearer    | None                |
| router                     | with_skill more actionable (Memory Notes)  | Suggest: require short Memory Notes in Output |
| code-review-patterns       | with_skill more structured (tables)        | None                |
| architecture-patterns      | with_skill more specific to prompt flows   | None                |
| research                   | with_skill richer findings/synthesis      | None                |
| debugging-patterns         | with_skill more template-like              | None                |

---

## Recommended follow-ups

1. **Router:** In `router/SKILL.md` under "Output", add that the Router Contract should include 1–2 sentence Memory Notes when relevant (e.g. what was loaded, next step), so every run is as actionable as the with_skill eval 1 output.
2. **Planning-patterns (optional):** Add a "Good step vs vague step" example in the skill to reinforce "file + action + verify" (e.g. "Good: In `src/auth/validateLogin.test.ts` add test for empty email, run `npm test -- validateLogin`, expect fail. Bad: Add validation.").
3. **Re-run code-review-patterns evals** against the new fixtures (`evals/fixtures/src/auth/` and `evals/fixtures/lib/api.ts`) so the next comparison is on real code review rather than "no code" + template.

No other changes are required based on this comparison; the improved skills are either on par or ahead of the baseline in structure and clarity.

---

## Applied (2025-03)

- **Router:** Output section updated to require 1–2 sentence Memory Notes when relevant (what was loaded, user goal, or next step).
- **Planning-patterns:** Added "Good step vs vague step" example (concrete file + action + verify vs "Add validation").
- **Code-review-patterns:** Re-ran evals against fixtures in **iteration-2**; both evals now review real code (`evals/fixtures/src/auth/` and `evals/fixtures/lib/api.ts`). Viewer: `code-review-patterns-workspace/iteration-2/review.html`.
