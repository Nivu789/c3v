"use client";

import { btnFilled } from "../lib/constants";

const includes = [
  { label: "Tech Audit", desc: "Find your gaps in 5 minutes.", href: "#audit" },
  { label: "ROI Calculator", desc: "See what manual work is costing you.", href: "#roi" },
  { label: "Proof of Concept", desc: "We build 3 real screens before you commit.", href: "#poc" },
  { label: "Strategy Call", desc: "30 minutes mapping your next 90 days.", href: "#book" },
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

          {/* Right — the offerings as a quiet ruled list, not four buttons */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {includes.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.1rem",
                  padding: "1.15rem 0.5rem",
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
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.15em", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.03em", color: "var(--text)" }}>
                    {item.label}
                  </span>
                  <span style={{ display: "block", fontFamily: "var(--font-body)", color: "var(--muted)", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.5, marginTop: "0.2rem" }}>
                    {item.desc}
                  </span>
                </span>
                <span aria-hidden style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "0.9rem", flexShrink: 0 }}>
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
