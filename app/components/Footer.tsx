"use client";

const leadLinks = [
  { title: "Free Tech Audit", href: "#audit" },
  { title: "ROI Calculator", href: "#roi" },
  { title: "Free POC", href: "#poc" },
  { title: "Book Free Call", href: "#book" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "3rem 2rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto 2.5rem", display: "flex", flexWrap: "wrap", gap: "1.5rem 2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
        {leadLinks.map((l) => (
          <a key={l.title} href={l.href}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
          >{l.title}</a>
        ))}
      </div>
      <div className="footer-inner">
        <a href="#" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--text)", textDecoration: "none", letterSpacing: "0.05em" }}>
          C<sup style={{ fontSize: "0.6em", color: "var(--accent)" }}>3</sup>V
        </a>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          © {year} C³V Agency. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[{title:"LinkedIn",href:"https://www.linkedin.com/in/c3v-solutions-04a359411/"},{title:"Instagram",href:"https://www.instagram.com/c3v_solutions/"}].map((s,index) => (
            <a key={index} href={s.href} target="_blank"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >{s.title}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
