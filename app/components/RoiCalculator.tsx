"use client";
import { useState } from "react";
import { waLink, WA_MESSAGES, btnGhost } from "../lib/constants";

const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

export default function RoiCalculator() {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(2);
  const [salary, setSalary] = useState(25000);

  // Monthly hours = people × hours/day × 22 working days
  const monthlyHours = people * hours * 22;
  // Hourly cost = monthly salary / (22 days × 8 hrs)
  const hourlyCost = salary / 176;
  const monthlyCost = monthlyHours * hourlyCost;
  const yearlyCost = monthlyCost * 12;
  const savings = monthlyCost * 0.6;

  const numInputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    padding: "0.9rem 1rem",
    fontFamily: "var(--font-mono)",
    fontSize: "1.1rem",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "0.75rem",
  };

  return (
    <section id="roi" className="section-pad" style={{ maxWidth: "1320px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase" }}>
          See how much manual work is costing you
        </span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1, marginTop: "0.75rem" }}>
          THINK AUTOMATION IS EXPENSIVE?
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.7, fontWeight: 300, marginTop: "1rem", fontSize: "0.95rem" }}>
          See what <span style={{ color: "var(--text)" }}>not</span> automating costs you.
        </p>
      </div>

      <div className="grid-2col-lg" style={{ alignItems: "stretch" }}>
        {/* Inputs */}
        <div style={{ border: "1px solid var(--border)", background: "var(--surface)", padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <label style={labelStyle}>People doing repetitive tasks daily</label>
            <input type="number" min={1} value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 0))} style={numInputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Hours/day each spends on those tasks — {hours}h</label>
            <input
              type="range"
              min={1}
              max={8}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", marginTop: "0.4rem" }}>
              <span>1h</span>
              <span>8h</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Average monthly salary (₹)</label>
            <input type="number" min={0} step={1000} value={salary} onChange={(e) => setSalary(Math.max(0, Number(e.target.value) || 0))} style={numInputStyle} />
          </div>
        </div>

        {/* Output */}
        <div style={{ border: "1px solid var(--border)", background: "var(--bg)", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
          <Row label="Monthly hours lost to manual work" value={`${Math.round(monthlyHours).toLocaleString("en-IN")} hrs`} />
          <Row label="Cost of that lost time / month" value={inr(monthlyCost)} />
          <Row label="Yearly cost" value={inr(yearlyCost)} big />
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>
              Conservative automation savings
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.2rem)", color: "var(--accent)", lineHeight: 1 }}>
              {inr(savings)}<span style={{ fontSize: "1rem", color: "var(--muted)" }}> / month</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 300, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
          Most of our clients recover the cost of automation within 3–4 months.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#audit" style={{ ...btnGhost, background: "var(--accent)", color: "#000", border: "none", fontWeight: 700 }}>
            Get a Free Automation Plan →
          </a>
          <a href={waLink(WA_MESSAGES.automationPlan)} target="_blank" rel="noopener noreferrer" style={btnGhost}>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--muted)", fontWeight: 300 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: big ? "1.4rem" : "1.1rem", color: "var(--text)", whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}
