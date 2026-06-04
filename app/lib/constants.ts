// Shared contact + booking constants and small helpers.
// Centralised so every CTA across the site stays consistent.

export const WHATSAPP_NUMBER = "918848458738";
export const CALENDLY_URL = "https://calendly.com/c3v-solutions/30min";
export const CONTACT_EMAIL = "c3v.solutions@gmail.com";

/** Build a wa.me link with a properly URL-encoded prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Prefilled WhatsApp messages used by the various lead magnets.
export const WA_MESSAGES = {
  general: "Hi, I'd like to get a free tech audit for my business.",
  auditResults:
    "Hi, I just completed the tech audit and would like to discuss my results.",
  automationPlan:
    "Hi, I'd like a free automation plan for my business.",
  poc: "Hi, I'd like to apply for the free proof of concept.",
  roadmapCall: "Hi, I'd like to book a free 90-day roadmap session.",
} as const;

// Reusable button style tokens (inline-style based, matching the site).
export const btnFilled: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  padding: "1rem 2rem",
  background: "var(--accent)",
  color: "#000",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export const btnGhost: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  padding: "1rem 2rem",
  border: "1px solid var(--border)",
  color: "var(--muted)",
  background: "transparent",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  transition: "border-color 0.2s, color 0.2s",
};
