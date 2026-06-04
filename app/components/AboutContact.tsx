import { waLink, WA_MESSAGES, CONTACT_EMAIL, btnGhost } from "../lib/constants";
import BookCallButton from "./BookCallButton";

const values = [
  { letter: "C", sup: "1", title: "Craft" },
  { letter: "C", sup: "2", title: "Clarity" },
  { letter: "C", sup: "3", title: "Commitment" },
  { letter: "V", sup: "", title: "Velocity" },
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.25em",
  color: "var(--accent)",
  textTransform: "uppercase",
};

const heading: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(2.2rem, 5vw, 4rem)",
  lineHeight: 1,
  marginTop: "0.6rem",
  marginBottom: "1.25rem",
};

export default function AboutContact() {
  return (
    <section
      id="contact"
      className="section-pad"
      aria-labelledby="about-heading contact-heading"
      style={{ maxWidth: "1440px", margin: "0 auto" }}
    >
      <div className="grid-2col-lg" style={{ alignItems: "start" }}>
        {/* ── About ── */}
        <div id="about" style={{ scrollMarginTop: "90px" }}>
          <span style={eyebrow}>Who we are</span>
          <h2 id="about-heading" style={heading}>
            ABOUT C<sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>3</sup>V
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.85, fontSize: "1rem", fontWeight: 300 }}>
            C<sup style={{ fontSize: "0.7em" }}>3</sup>V is a small crew of developers and designers who treat great
            software as craft — not a factory churning out tickets. We started C<sup style={{ fontSize: "0.7em" }}>3</sup>V to prove
            serious software can be built fast, in the open, and without locking clients in.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text)", lineHeight: 1.85, fontSize: "1rem", fontWeight: 300, marginTop: "1.25rem" }}>
            We&apos;re early — deliberately so. Every project gets our full attention, and the businesses we build for
            now become the case studies we&apos;re known for next.
          </p>

          {/* Compact values strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem 2.5rem", marginTop: "1.75rem" }}>
            {values.map((v) => (
              <div key={v.title} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "transparent", WebkitTextStroke: "1px var(--accent)", lineHeight: 1 }}>
                  {v.letter}
                  {v.sup && <sup style={{ fontSize: "0.55em" }}>{v.sup}</sup>}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>
                  {v.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact / book a call ── */}
        <div id="book" style={{ scrollMarginTop: "90px" }}>
          <span style={eyebrow}>Book a free call</span>
          <h2 id="contact-heading" style={heading}>
            LET&apos;S BUILD SOMETHING.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.8, fontWeight: 300, fontSize: "1rem", maxWidth: "480px", marginBottom: "2rem" }}>
            30 minutes, no pitch. We&apos;ll tell you exactly what to build, automate, or fix first — a clear plan for your next 90 days.
          </p>

          <div className="cta-row">
            <BookCallButton text="Book Free Call" variant="primary" />
            <a href={waLink(WA_MESSAGES.roadmapCall)} target="_blank" rel="noopener noreferrer" style={btnGhost}>
              Chat on WhatsApp
            </a>
          </div>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", marginTop: "2rem", letterSpacing: "0.1em" }}>
            ◆ We take on 3–4 new projects per month — slots fill up fast.
          </p>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", marginTop: "1.5rem", letterSpacing: "0.05em" }}>
            Or email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
