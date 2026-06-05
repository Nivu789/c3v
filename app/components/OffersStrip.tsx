"use client";

import { btnFilled } from "../lib/constants";

const includes = [
  { name: "Free Tech Audit", hook: "Find your 3 biggest growth blockers in 5 minutes.", href: "#audit" },
  { name: "ROI Calculator", hook: "See what manual work really costs you — in 60 seconds.", href: "#roi" },
  { name: "Free Proof of Concept", hook: "3 real screens of your product, built free in 5–7 days.", href: "#poc" },
  { name: "Free Strategy Call", hook: "Your next 90 days, mapped in one 30-minute call — no pitch.", href: "#book" },
];

export default function OffersStrip() {
  return (
    <section className="section-pad" style={{ maxWidth: "1440px", margin: "0 auto", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div style={{ border: "1px solid var(--border)", background: "var(--surface)", padding: "clamp(2rem, 5vw, 3.5rem)" }}>
        <div className="grid-2col-lg" style={{ gap: "clamp(2.5rem, 5vw, 4.5rem)", alignItems: "center" }}>
          {/* Left — single pitch + one CTA */}
          <div>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              textTransform: "uppercase",
              border: "1px solid rgba(0,136,255,0.45)",
              background: "rgba(0,136,255,0.08)",
              padding: "0.5rem 0.9rem",
              borderRadius: "999px",
              boxShadow: "0 0 24px rgba(0,136,255,0.15)",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)", flexShrink: 0 }} />
              No commitment, no catch
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.02, marginTop: "0.75rem", marginBottom: "1.25rem" }}>
              SEE THE VALUE BEFORE YOU COMMIT.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.7, fontWeight: 300, fontSize: "0.95rem", marginBottom: "2rem", maxWidth: "440px" }}>
              Four ways to see exactly what we&apos;d build for you — and what it&apos;s worth — before you spend a single rupee.
            </p>
            <a href="#audit" style={btnFilled}>
              Start with a Free Tech Audit →
            </a>
          </div>

          {/* Right — the offerings as an enlarged, prominent ruled list */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {includes.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "1.6rem 0.5rem",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  background: "transparent",
                  transition: "padding-left 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = "var(--surface2)";
                  t.style.paddingLeft = "1rem";
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.background = "transparent";
                  t.style.paddingLeft = "0.5rem";
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1, color: "var(--accent)", flexShrink: 0, minWidth: "2.2rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.45rem" }}>
                    {item.name}
                  </span>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.65rem)", letterSpacing: "0.02em", lineHeight: 1.05, color: "var(--text)" }}>
                    {item.hook}
                  </span>
                </span>
                <span aria-hidden style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "1.4rem", flexShrink: 0 }}>
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
