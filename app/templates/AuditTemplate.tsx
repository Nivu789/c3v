import type { AuditPayload } from "../lib/types";

const labelStyle = {
  margin: "0 0 8px 0",
  color: "#888",
  fontSize: "12px",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

export const AuditEmail = ({
  name,
  whatsapp,
  email,
  company,
  readiness,
  answers,
  gaps,
}: AuditPayload) => {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#111111",
          border: "1px solid #222",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "30px", borderBottom: "1px solid #222", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700, letterSpacing: "2px" }}>
            NEW TECH AUDIT LEAD
          </h1>
          <p style={{ marginTop: "10px", color: "#999", fontSize: "14px" }}>
            Readiness level:{" "}
            <span style={{ color: "#0088ff", fontWeight: 700 }}>{readiness}</span>
          </p>
        </div>

        {/* Contact */}
        <div style={{ padding: "30px", borderBottom: "1px solid #222" }}>
          <div style={{ marginBottom: "24px" }}>
            <p style={labelStyle}>Name</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{name}</p>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <p style={labelStyle}>WhatsApp</p>
            <p style={{ margin: 0, fontSize: "16px" }}>{whatsapp}</p>
          </div>
          {email ? (
            <div style={{ marginBottom: "24px" }}>
              <p style={labelStyle}>Email</p>
              <p style={{ margin: 0, fontSize: "16px" }}>{email}</p>
            </div>
          ) : null}
          {company ? (
            <div>
              <p style={labelStyle}>Company</p>
              <p style={{ margin: 0, fontSize: "16px" }}>{company}</p>
            </div>
          ) : null}
        </div>

        {/* Identified gaps */}
        <div style={{ padding: "30px", borderBottom: "1px solid #222" }}>
          <p style={labelStyle}>Identified Gaps</p>
          <ul style={{ margin: "8px 0 0 0", paddingLeft: "18px", color: "#ddd", fontSize: "14px", lineHeight: 1.7 }}>
            {gaps.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>

        {/* Answers */}
        <div style={{ padding: "30px" }}>
          <p style={{ ...labelStyle, marginBottom: "16px" }}>Audit Answers</p>
          {answers.map((a, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <p style={{ margin: "0 0 4px 0", color: "#888", fontSize: "13px" }}>{a.question}</p>
              <p style={{ margin: 0, fontSize: "15px", color: "#fff" }}>{a.answer}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #222", padding: "20px 30px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#666", letterSpacing: "1px" }}>
            © C3V SOLUTIONS — TECH AUDIT NOTIFICATION
          </p>
        </div>
      </div>
    </div>
  );
};
