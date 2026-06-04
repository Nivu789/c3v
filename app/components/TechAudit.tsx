"use client";
import { useState } from "react";
import { auditAction } from "../actions/audit";
import { waLink, WA_MESSAGES, btnGhost } from "../lib/constants";
import { isNonEmpty, isValidEmail, isValidPhone } from "../lib/validation";
import BookCallButton from "./BookCallButton";

type Question = {
  key: string;
  q: string;
  options: string[];
  multi?: boolean;
  max?: number;
};

const QUESTIONS: Question[] = [
  {
    key: "businessType",
    q: "What best describes your business?",
    options: [
      "Startup / Early-stage product",
      "Established business (retail, services, healthcare, etc.)",
      "D2C / Ecommerce brand",
      "Agency or consulting firm",
      "Other",
    ],
  },
  {
    key: "teamSize",
    q: "How big is your team?",
    options: ["Just me", "2–10 people", "11–50 people", "50+ people"],
  },
  {
    key: "pains",
    q: "What's your biggest operational headache today?",
    multi: true,
    max: 2,
    options: [
      "Too much manual/repetitive work",
      "Customer follow-up is slow or inconsistent",
      "No clear view of business data or performance",
      "Our app/website is outdated or broken",
      "We want to add AI but don't know where to start",
      "Our tech team is too slow or too expensive",
    ],
  },
  {
    key: "tech",
    q: "How would you describe your current software/tech setup?",
    options: [
      "Mostly spreadsheets and WhatsApp",
      "A mix of tools that don't talk to each other",
      "We have a product but it needs serious work",
      "We have solid tech but want to add AI/automation",
      "Starting from scratch",
    ],
  },
  {
    key: "whatsapp",
    q: "Do you currently use WhatsApp to communicate with customers?",
    options: [
      "Yes, but it's all manual",
      "Yes, and we have some automation",
      "No, but we want to",
      "No, we use other channels",
    ],
  },
  {
    key: "automation",
    q: "How much of your team's repetitive work is currently automated?",
    options: [
      "Almost nothing — everything is done manually",
      "A little — maybe 1 or 2 things",
      "About half",
      "Most of it",
    ],
  },
  {
    key: "budget",
    q: "If you found the right tech partner, what's your rough project budget?",
    options: [
      "Under ₹50,000",
      "₹50,000 – ₹2,00,000",
      "₹2,00,000 – ₹10,00,000",
      "₹10,00,000+",
      "Not sure yet",
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1; // questions + contact capture

// ── Results logic (deterministic from answers) ──

const AUTOMATION_SCORE: Record<string, number> = {
  "Almost nothing — everything is done manually": 0,
  "A little — maybe 1 or 2 things": 1,
  "About half": 2,
  "Most of it": 3,
};
const TECH_SCORE: Record<string, number> = {
  "Mostly spreadsheets and WhatsApp": 0,
  "A mix of tools that don't talk to each other": 1,
  "We have a product but it needs serious work": 1,
  "We have solid tech but want to add AI/automation": 3,
  "Starting from scratch": 0,
};
const WA_SCORE: Record<string, number> = {
  "Yes, but it's all manual": 0,
  "Yes, and we have some automation": 2,
  "No, but we want to": 1,
  "No, we use other channels": 1,
};

type Gap = { text: string; tag: string };

const GAP_BY_PAIN: Record<string, Gap> = {
  "Too much manual/repetitive work": {
    text: "You're likely losing 10–15 hours/week to manual tasks that can be automated.",
    tag: "Automation",
  },
  "Customer follow-up is slow or inconsistent": {
    text: "Slow follow-up is quietly costing you leads — WhatsApp automation can cut response time by up to 80%.",
    tag: "WhatsApp Automation",
  },
  "No clear view of business data or performance": {
    text: "Without a connected stack, your team is making decisions without full data — a custom dashboard fixes that.",
    tag: "Custom Software",
  },
  "Our app/website is outdated or broken": {
    text: "An outdated product leaks users and trust — a focused rebuild usually pays for itself in conversion.",
    tag: "Web / Mobile",
  },
  "We want to add AI but don't know where to start": {
    text: "There are likely 2–3 high-ROI places to add AI into your workflow right now.",
    tag: "AI Integration",
  },
  "Our tech team is too slow or too expensive": {
    text: "You may be overpaying for slow delivery — a focused team can ship the same scope faster.",
    tag: "Custom Software",
  },
};

type Answers = Record<string, string | string[]>;

function readinessLevel(a: Answers): string {
  const score =
    (AUTOMATION_SCORE[a.automation as string] ?? 0) +
    (TECH_SCORE[a.tech as string] ?? 0) +
    (WA_SCORE[a.whatsapp as string] ?? 0);
  if (score <= 3) return "Early Stage";
  if (score <= 6) return "Growing";
  return "Advanced";
}

function buildGaps(a: Answers): Gap[] {
  const gaps: Gap[] = [];
  const pains = Array.isArray(a.pains) ? a.pains : [];
  for (const p of pains) {
    if (GAP_BY_PAIN[p]) gaps.push(GAP_BY_PAIN[p]);
  }

  // Top up to 3 with gaps derived from the rest of the answers.
  const fallbacks: Gap[] = [];
  if ((AUTOMATION_SCORE[a.automation as string] ?? 0) <= 1) {
    fallbacks.push({
      text: "Most of your repetitive work is still manual — automation is the fastest ROI you can unlock.",
      tag: "Automation",
    });
  }
  if (a.tech === "Mostly spreadsheets and WhatsApp" || a.tech === "A mix of tools that don't talk to each other") {
    fallbacks.push({
      text: "Disconnected tools are slowing your team down — a unified system removes the busywork.",
      tag: "Custom Software",
    });
  }
  if (a.whatsapp === "Yes, but it's all manual" || a.whatsapp === "No, but we want to") {
    fallbacks.push({
      text: "WhatsApp is where your customers already are — automating it captures leads you're currently missing.",
      tag: "WhatsApp Automation",
    });
  }
  fallbacks.push({
    text: "A short discovery call will surface the 1–2 changes with the biggest payoff for your business.",
    tag: "Strategy",
  });

  for (const f of fallbacks) {
    if (gaps.length >= 3) break;
    if (!gaps.some((g) => g.text === f.text)) gaps.push(f);
  }
  return gaps.slice(0, 3);
}

const SECTION_TINT = "rgba(0,136,255,0.04)";

export default function TechAudit() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ name: "", whatsapp: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onContactStep = step === QUESTIONS.length;
  const current = QUESTIONS[step];

  const selectSingle = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };

  const toggleMulti = (key: string, value: string, max: number) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[key]) ? [...(prev[key] as string[])] : [];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else if (arr.length < max) arr.push(value);
      return { ...prev, [key]: arr };
    });
  };

  const isSelected = (key: string, value: string) => {
    const v = answers[key];
    return Array.isArray(v) ? v.includes(value) : v === value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isNonEmpty(contact.name)) {
      setError("Please enter your full name.");
      return;
    }
    if (!isValidPhone(contact.whatsapp)) {
      setError("Please enter a valid WhatsApp number so we can send your results.");
      return;
    }
    if (contact.email && !isValidEmail(contact.email)) {
      setError("That email doesn't look right — please check it or leave it blank.");
      return;
    }

    setSending(true);

    const readiness = readinessLevel(answers);
    const gaps = buildGaps(answers);
    const qaPairs = QUESTIONS.map((qq) => {
      const v = answers[qq.key];
      return { question: qq.q, answer: Array.isArray(v) ? v.join(", ") : v || "—" };
    });

    await auditAction({
      name: contact.name,
      whatsapp: contact.whatsapp,
      email: contact.email || undefined,
      company: contact.company || undefined,
      readiness,
      answers: qaPairs,
      gaps: gaps.map((g) => g.text),
    });

    setSending(false);
    setSubmitted(true);
  };

  const restart = () => {
    setAnswers({});
    setContact({ name: "", whatsapp: "", email: "", company: "" });
    setSubmitted(false);
    setError("");
    setStep(0);
  };

  const progress = submitted ? 100 : ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <section id="audit" className="section-pad" style={{ background: SECTION_TINT }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase" }}>
            Free 5-minute tech audit
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1, marginTop: "0.75rem" }}>
            WHERE&apos;S YOUR BUSINESS<br />LEAKING TIME?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.7, fontWeight: 300, marginTop: "1.25rem", fontSize: "0.95rem", maxWidth: "520px", marginInline: "auto" }}>
            Not sure where to start? Answer 8 quick questions and we&apos;ll show you exactly where your gaps are — in product, automation, infrastructure, or AI readiness.
          </p>
        </div>

        {/* Card */}
        <div style={{ border: "1px solid var(--border)", background: "var(--surface)", padding: "clamp(1.5rem, 5vw, 3rem)" }}>
          {/* Progress bar */}
          <div style={{ height: "3px", background: "var(--border)", marginBottom: "2rem", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, width: `${progress}%`, background: "var(--accent)", transition: "width 0.3s ease" }} />
          </div>

          {submitted ? (
            <Results answers={answers} name={contact.name} onRestart={restart} />
          ) : onContactStep ? (
            <form onSubmit={handleSubmit} data-auto-id="tech-audit-form">
              <StepLabel current={TOTAL_STEPS} total={TOTAL_STEPS} />
              <h3 style={qStyle}>Where should we send your audit results?</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "2rem" }}>
                <Field label="Full name *" required value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} />
                <Field label="WhatsApp number *" type="tel" required value={contact.whatsapp} onChange={(v) => setContact({ ...contact, whatsapp: v })} />
                <Field label="Email address (optional)" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
                <Field label="Company / business name (optional)" value={contact.company} onChange={(v) => setContact({ ...contact, company: v })} />
              </div>
              {error && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent2)", lineHeight: 1.5, marginTop: "1.25rem" }}>
                  {error}
                </p>
              )}
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                <button type="button" onClick={() => setStep((s) => s - 1)} style={btnGhost}>← Back</button>
                <button type="submit" disabled={sending} style={{ ...filledBtn, flex: 1, opacity: sending ? 0.6 : 1 }}>
                  {sending ? "Generating…" : "See My Results →"}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <StepLabel current={step + 1} total={TOTAL_STEPS} />
              <h3 style={qStyle}>{current.q}</h3>
              {current.multi && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", marginTop: "0.5rem" }}>
                  SELECT UP TO {current.max}
                </p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2rem" }}>
                {current.options.map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={isSelected(current.key, opt)}
                    onClick={() =>
                      current.multi
                        ? toggleMulti(current.key, opt, current.max ?? 2)
                        : selectSingle(current.key, opt)
                    }
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                {step > 0 && (
                  <button type="button" onClick={() => setStep((s) => s - 1)} style={btnGhost}>← Back</button>
                )}
                {current.multi && (
                  <button
                    type="button"
                    disabled={!Array.isArray(answers[current.key]) || (answers[current.key] as string[]).length === 0}
                    onClick={() => setStep((s) => s + 1)}
                    style={{
                      ...filledBtn,
                      flex: 1,
                      opacity:
                        !Array.isArray(answers[current.key]) || (answers[current.key] as string[]).length === 0 ? 0.5 : 1,
                    }}
                  >
                    Continue →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Results screen ──

function Results({ answers, name, onRestart }: { answers: Answers; name: string; onRestart: () => void }) {
  const readiness = readinessLevel(answers);
  const gaps = buildGaps(answers);
  const lowBudget = answers.budget === "Under ₹50,000";

  return (
    <div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {name ? `${name}, here's your result` : "Your result"}
      </span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1, margin: "0.75rem 0 0.25rem" }}>
        TECH READINESS:&nbsp;
        <span style={{ color: "var(--accent)" }}>{readiness}</span>
      </h3>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
        Here are the three biggest gaps we&apos;d tackle first based on your answers:
      </p>

      <div style={{ display: "grid", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
        {gaps.map((g, i) => (
          <div key={i} style={{ background: "var(--bg)", padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.15em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.6rem", border: "1px solid var(--border)", color: "var(--muted)" }}>
                {g.tag}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--text)", lineHeight: 1.6, fontSize: "0.95rem", fontWeight: 300 }}>
              {g.text}
            </p>
          </div>
        ))}
      </div>

      {/* CTA block */}
      <div style={{ border: "1px solid var(--accent)", padding: "2rem", marginTop: "2rem", textAlign: "center" }}>
        {lowBudget ? (
          <>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "0.75rem" }}>
              THANKS — HERE&apos;S A STARTING POINT
            </h4>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              We&apos;ll send you some free resources to help you get started. When you&apos;re ready to invest in fixing these gaps, we&apos;re one message away.
            </p>
            <a href={waLink(WA_MESSAGES.auditResults)} target="_blank" rel="noopener noreferrer" style={{ ...filledBtn, display: "inline-flex" }}>
              Chat with us on WhatsApp
            </a>
          </>
        ) : (
          <>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
              WANT US TO FIX THIS WITH YOU?
            </h4>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              We take on 3–4 new projects per month. Here&apos;s how to claim a spot.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <BookCallButton text="Book a Free 30-min Strategy Call" variant="primary" />
              <a href={waLink(WA_MESSAGES.auditResults)} target="_blank" rel="noopener noreferrer" style={btnGhost}>
                Chat on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>

      <button type="button" onClick={onRestart} style={{ ...btnGhost, marginTop: "1.5rem", border: "none", color: "var(--muted)", padding: "0.5rem 0" }}>
        ↺ Start over
      </button>
    </div>
  );
}

// ── Small building blocks ──

const qStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
  lineHeight: 1.1,
  letterSpacing: "0.02em",
};

const filledBtn: React.CSSProperties = {
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
  alignItems: "center",
  justifyContent: "center",
};

function StepLabel({ current, total }: { current: number; total: number }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.2em" }}>
      {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  );
}

function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        fontFamily: "var(--font-body)",
        fontSize: "0.95rem",
        fontWeight: 300,
        padding: "1rem 1.25rem",
        border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        background: selected ? "rgba(0,136,255,0.08)" : "transparent",
        color: selected ? "var(--text)" : "var(--muted)",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)";
          (e.currentTarget as HTMLElement).style.color = "var(--text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLElement).style.color = "var(--muted)";
        }
      }}
    >
      <span style={{ color: "var(--accent)", fontSize: "1rem", lineHeight: 1, opacity: selected ? 1 : 0.4 }}>
        {selected ? "■" : "□"}
      </span>
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const inputMode = type === "tel" ? "tel" : type === "email" ? "email" : undefined;
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          padding: "0.9rem 1rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.95rem",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--accent)")}
        onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")}
      />
    </div>
  );
}
