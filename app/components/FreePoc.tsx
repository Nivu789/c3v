"use client";
import { useState } from "react";
import { pocAction } from "../actions/poc";
import { waLink, WA_MESSAGES } from "../lib/constants";
import { isNonEmpty, isValidEmail, isValidPhone } from "../lib/validation";

const MIN_DESC = 100;

const included = [
  "We design and build 3 real screens of your product — no mockups, actual code",
  "You own what we build, no strings attached",
  "Takes 5–7 business days. We start after a 30-min scoping call.",
];

const budgetOptions = [
  "Yes, under ₹2,00,000",
  "Yes, ₹2,00,000 – ₹10,00,000",
  "Yes, ₹10,00,000+",
  "Not confirmed yet, depends on the POC",
];

const timelineOptions = [
  "ASAP — within 1 month",
  "1–3 months",
  "3–6 months",
  "Just exploring for now",
];

export default function FreePoc() {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    company: "",
    description: "",
    budget: "",
    workedWithAgency: "",
    timeline: "",
  });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [descFocused, setDescFocused] = useState(false);

  // Per-field validators (run on blur, then live as the user fixes them).
  const fieldValidators: Record<string, (v: string) => string> = {
    name: (v) => (isNonEmpty(v) ? "" : "Please enter your full name."),
    whatsapp: (v) => (isValidPhone(v) ? "" : "Please enter a valid WhatsApp number (8–15 digits, e.g. +91 98765 43210)."),
    email: (v) => (isValidEmail(v) ? "" : "Please enter a valid email address."),
    company: (v) => (isNonEmpty(v) ? "" : "Please enter your company or product name."),
    description: (v) => (v.trim().length >= MIN_DESC ? "" : `Please describe what you want to build in at least ${MIN_DESC} characters.`),
    budget: (v) => (v ? "" : "Please select a budget option."),
    workedWithAgency: (v) => (v ? "" : "Please answer this question."),
    timeline: (v) => (v ? "" : "Please select your timeline."),
  };

  const validateField = (k: string, v: string) => {
    const fn = fieldValidators[k];
    if (fn) setFieldErrors((e) => ({ ...e, [k]: fn(v) }));
  };

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    // Once an error is showing for this field, re-check on each keystroke so it clears as soon as it's valid.
    if (fieldErrors[k]) validateField(k, v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isNonEmpty(form.name)) {
      setError("Please enter your full name.");
      return;
    }
    if (!isValidPhone(form.whatsapp)) {
      setError("Please enter a valid WhatsApp number (8–15 digits, e.g. +91 98765 43210).");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isNonEmpty(form.company)) {
      setError("Please enter your company or product name.");
      return;
    }
    if (form.description.trim().length < MIN_DESC) {
      setError(`Please describe what you want to build in at least ${MIN_DESC} characters.`);
      return;
    }
    if (!form.budget || !form.workedWithAgency || !form.timeline) {
      setError("Please answer the budget, agency and timeline questions.");
      return;
    }
    setSending(true);
    const res = await pocAction(form);
    setSending(false);
    if (res.success) setDone(true);
    else setError(res.message || "Something went wrong.");
  };

  return (
    <section id="poc" className="section-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div className="grid-2col-lg">
          {/* Left — pitch */}
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase" }}>
              Free proof of concept
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1, marginTop: "0.75rem", marginBottom: "1rem" }}>
              NOT SURE IF WE&apos;RE THE RIGHT FIT? LET US PROVE IT FIRST.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", lineHeight: 1.8, fontWeight: 300, fontSize: "0.95rem", marginBottom: "2rem" }}>
              We&apos;ll design and build 3 screens of your product for free. No commitment. No catch.
            </p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {included.map((item) => (
                <li key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontFamily: "var(--font-body)", color: "var(--text)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, letterSpacing: "0.05em", borderLeft: "2px solid var(--border)", paddingLeft: "1rem" }}>
              No backend, no database, no auth — just the front-end so you can see and feel your product.
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent)", marginTop: "1.5rem", letterSpacing: "0.05em" }}>
              ◆ POC spots are limited — we review applications every Monday.
            </p>
          </div>

          {/* Right — application */}
          <div>
            {done ? (
              <div style={{ border: "1px solid var(--accent)", padding: "3rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1rem" }}>
                  APPLICATION RECEIVED.
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.7, fontWeight: 300 }}>
                  We review applications every Monday. If you&apos;re a fit, we&apos;ll reach out within 48 hours to schedule your scoping call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-auto-id="free-poc-form" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <Field label="Full name *" required value={form.name} onChange={(v) => set("name", v)} onBlur={() => validateField("name", form.name)} error={fieldErrors.name} />
                <Field label="WhatsApp number *" type="tel" required value={form.whatsapp} onChange={(v) => set("whatsapp", v)} onBlur={() => validateField("whatsapp", form.whatsapp)} error={fieldErrors.whatsapp} />
                <Field label="Email *" type="email" required value={form.email} onChange={(v) => set("email", v)} onBlur={() => validateField("email", form.email)} error={fieldErrors.email} />
                <Field label="Company / product name *" required value={form.company} onChange={(v) => set("company", v)} onBlur={() => validateField("company", form.company)} error={fieldErrors.company} />

                <div>
                  <Label>Describe what you want to build * (min {MIN_DESC} chars)</Label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    style={{ ...inputStyle, resize: "vertical", borderColor: descFocused ? "var(--accent)" : fieldErrors.description ? "var(--accent2)" : "var(--border)" }}
                    onFocus={() => setDescFocused(true)}
                    onBlur={() => {
                      setDescFocused(false);
                      validateField("description", form.description);
                    }}
                  />
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: form.description.trim().length >= MIN_DESC ? "var(--accent)" : "var(--muted)", marginTop: "0.4rem", textAlign: "right" }}>
                    {form.description.trim().length} / {MIN_DESC}
                  </div>
                  {fieldErrors.description && (
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--accent2)", marginTop: "0.4rem", lineHeight: 1.4 }}>
                      {fieldErrors.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Do you have a budget for the full project? *</Label>
                  <Select value={form.budget} onChange={(v) => set("budget", v)} onBlur={() => validateField("budget", form.budget)} error={fieldErrors.budget} options={budgetOptions} placeholder="Select an option" />
                </div>

                <div>
                  <Label>Have you worked with a software agency before? *</Label>
                  <Select value={form.workedWithAgency} onChange={(v) => set("workedWithAgency", v)} onBlur={() => validateField("workedWithAgency", form.workedWithAgency)} error={fieldErrors.workedWithAgency} options={["Yes", "No"]} placeholder="Select an option" />
                </div>

                <div>
                  <Label>What&apos;s your timeline to launch? *</Label>
                  <Select value={form.timeline} onChange={(v) => set("timeline", v)} onBlur={() => validateField("timeline", form.timeline)} error={fieldErrors.timeline} options={timelineOptions} placeholder="Select an option" />
                </div>

                {error && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent2)", lineHeight: 1.5 }}>
                    {error}
                    {" "}
                    <a href={waLink(WA_MESSAGES.poc)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                      Apply via WhatsApp →
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", padding: "1.1rem 2.5rem", background: "var(--accent)",
                    color: "#000", border: "none", cursor: "pointer", fontWeight: 700, width: "100%",
                    opacity: sending ? 0.6 : 1,
                  }}
                >
                  {sending ? "Submitting…" : "Apply for Free POC →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  padding: "1rem",
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>
      {children}
    </label>
  );
}

function Field({ label, value, onChange, onBlur, error, type = "text", required = false }: { label: string; value: string; onChange: (v: string) => void; onBlur?: () => void; error?: string; type?: string; required?: boolean }) {
  const inputMode = type === "tel" ? "tel" : type === "email" ? "email" : undefined;
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? "var(--accent)" : error ? "var(--accent2)" : "var(--border)";
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, borderColor }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
      />
      {error && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--accent2)", marginTop: "0.4rem", lineHeight: 1.4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ value, onChange, onBlur, error, options, placeholder }: { value: string; onChange: (v: string) => void; onBlur?: () => void; error?: string; options: string[]; placeholder: string }) {
  return (
    <div>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: "pointer", borderColor: error ? "var(--accent2)" : "var(--border)" }}
        onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--accent)")}
        onBlur={(e) => {
          (e.target as HTMLElement).style.borderColor = error ? "var(--accent2)" : "var(--border)";
          onBlur?.();
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--accent2)", marginTop: "0.4rem", lineHeight: 1.4 }}>
          {error}
        </p>
      )}
    </div>
  );
}
