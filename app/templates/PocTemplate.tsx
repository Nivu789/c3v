import type { PocPayload } from "../lib/types";

const labelStyle = {
  margin: "0 0 8px 0",
  color: "#888",
  fontSize: "12px",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

export const PocEmail = ({
  name,
  whatsapp,
  email,
  company,
  description,
  budget,
  workedWithAgency,
  timeline,
}: PocPayload) => {
  const rows: { label: string; value: string }[] = [
    { label: "WhatsApp", value: whatsapp },
    { label: "Email", value: email },
    { label: "Company / Product", value: company },
    { label: "Budget", value: budget },
    { label: "Worked with an agency before", value: workedWithAgency },
    { label: "Timeline", value: timeline },
  ];

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
            FREE POC APPLICATION
          </h1>
          <p style={{ marginTop: "10px", color: "#999", fontSize: "14px" }}>
            From <span style={{ color: "#0088ff", fontWeight: 700 }}>{name}</span>
          </p>
        </div>

        {/* Fields */}
        <div style={{ padding: "30px" }}>
          {rows.map((r) => (
            <div key={r.label} style={{ marginBottom: "24px" }}>
              <p style={labelStyle}>{r.label}</p>
              <p style={{ margin: 0, fontSize: "16px" }}>{r.value || "Not specified"}</p>
            </div>
          ))}

          <div>
            <p style={labelStyle}>What they want to build</p>
            <div
              style={{
                backgroundColor: "#181818",
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                padding: "20px",
                lineHeight: 1.7,
                color: "#ddd",
                fontSize: "15px",
                whiteSpace: "pre-wrap",
              }}
            >
              {description}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #222", padding: "20px 30px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#666", letterSpacing: "1px" }}>
            © C3V SOLUTIONS — POC APPLICATION
          </p>
        </div>
      </div>
    </div>
  );
};
