/**
 * JWT storage and cookie helpers.
 * Spec: store token in cookie after login for dashboard access.
 */

const COOKIE_NAME = "jwt";

export function getStoredToken(): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? match[2] : null;
}

export function setStoredToken(token: string): void {
  document.cookie = `${COOKIE_NAME}=${token}`;
}
