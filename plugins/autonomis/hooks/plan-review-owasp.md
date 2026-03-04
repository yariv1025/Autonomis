# Plan Reviewer Hook (Suggest OWASP Skills)

**When:** After the **Plan** phase produces or updates a plan (e.g. plan file written to `docs/plans/` or `.autonomis/state/` updated with work units).

**Purpose:** Inspect the plan for technology/scope keywords and suggest domain-specific OWASP skills from [yariv1025/skills](https://github.com/yariv1025/skills). Does **not** auto-install; suggestion only.

**Steps:**

1. **Inspect** — Read the plan content (and optionally work unit titles/descriptions). Look for keywords: API, REST, GraphQL, mobile, iOS, Android, IoT, LLM, GenAI, Kubernetes, K8s, serverless, Lambda, cloud-native, container, Docker, CI/CD, pipeline, GitHub Actions, Jenkins, privacy, PII, consent, GDPR.
2. **Map** — Match keywords to OWASP skills:
   - API, REST, GraphQL, endpoints, OpenAPI → **owasp-api-security-top-10**
   - mobile, iOS, Android, app → **owasp-mobile-top-10**
   - IoT, device, firmware, embedded → **owasp-iot-top-10**
   - LLM, GenAI, prompt, chatbot, RAG → **owasp-llm-top-10**
   - Kubernetes, K8s, cluster, workload, pod → **owasp-kubernetes-top-10**
   - CI/CD, pipeline, GitHub Actions, Jenkins → **owasp-cicd-top-10**
   - serverless, Lambda, function → **owasp-serverless-top-10**
   - container, cloud-native, Docker → **owasp-cloud-native-top-10**
   - privacy, PII, consent, GDPR → **owasp-privacy-top-10**
3. **Suggest** — Tell the user: "Your plan mentions [X]. Consider installing [skill] for [Y]-specific security checks?" with install command (e.g. `npx skills add yariv1025/skills --skill <name> -a claude-code` or Cursor equivalent). Optionally record suggested skills so Design Reviewer and Code Reviewer can use them if the user installs later.

**Default:** owasp-top-10 (web) is required and enforced. This hook only suggests **additional** domain skills. No auto-install without user confirmation.
