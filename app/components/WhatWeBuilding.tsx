"use client";

import Link from "next/link";

type Build = {
  tag: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

const builds: Build[] = [
  {
    tag: "AI Analytics Platform",
    title: "Sales Insights Coach",
    body: "An AI sales-intelligence platform that analyzes customer conversations and surfaces actionable insights to lift conversion.",
    href: "https://sales-insights-coach.onrender.com/",
    linkLabel: "Visit",
  },
  {
    tag: "Lead Generation Tool",
    title: "Contact Scraper AI",
    body: "A smart contact-extraction system that automates outreach by collecting and organizing public business contacts.",
    href: "https://contact-scraper-ai.onrender.com/",
    linkLabel: "Visit",
  },
];

export default function WhatWeBuilding() {
  return (
    <section
      id="work"
      className="section-pad"
      aria-label="What we're building"
      style={{ maxWidth: "1440px", margin: "0 auto" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase" }}>
          What we&apos;re building
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
          ◆ Founding case studies — coming soon
        </span>
      </div>

      <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {builds.map((b) => (
          <li key={b.title} style={{ height: "100%" }}>
            <BuildCard item={b} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function BuildCard({ item }: { item: Build }) {
  return (
    <Link href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        style={{
          border: "1px solid var(--border)",
          padding: "1.75rem",
          position: "relative",
          overflow: "hidden",
          background: "rgba(255,255,255,0.01)",
          transition: "all 0.3s ease",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-6px)";
          el.style.borderColor = "var(--accent)";
          el.style.boxShadow = "0 0 30px rgba(0,136,255,0.12)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle, rgba(0,136,255,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase" }}>
          {item.tag}
        </span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", marginTop: "0.75rem", marginBottom: "0.75rem", lineHeight: 1 }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.7, fontSize: "0.9rem", fontWeight: 300 }}>
          {item.body}
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {item.linkLabel}
          </span>
          <span aria-hidden style={{ color: "var(--accent)", fontSize: "1.2rem" }}>→</span>
        </div>
      </article>
    </Link>
  );
}
