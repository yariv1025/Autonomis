/**
 * Login form validation and submission.
 * Part of auth change: email/password login, JWT stored in cookie.
 */

const API_BASE = "/api";

export async function login(email: string, password: string): Promise<{ ok: boolean; token?: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.token) {
    document.cookie = `jwt=${data.token}`; // TODO: HttpOnly, Secure, SameSite
  }
  return { ok: res.ok, token: data.token };
}
