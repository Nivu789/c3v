// Shared client-side validation helpers for the lead-magnet forms.
// Native `required` / `type` attributes catch the obvious cases; these
// add format checks (phone, email) and guard against whitespace-only input.

/** True when the value has non-whitespace content. */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/** Loose-but-real email shape: local@domain.tld, no spaces. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * WhatsApp / phone check. Allows digits, spaces, hyphens, parentheses and a
 * single leading "+", then requires 8–15 digits (E.164 caps the number at 15).
 */
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!/^\+?[\d\s()-]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
