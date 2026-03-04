export function validateEmail(str) {
  if (typeof str !== "string") return false;
  const idx = str.indexOf("@");
  return idx !== -1 && str.length > idx + 1;
}
