"use client";
import { useRef } from "react";

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const grid = gridRef.current;
  //   if (!grid) return;
  //   const onMove = (e: MouseEvent) => {
  //     const x = (e.clientX / window.innerWidth) * 100;
  //     const y = (e.clientY / window.innerHeight) * 100;
  //     grid.style.backgroundPosition = `${x * 0.3}px ${y * 0.3}px`;
  //   };
  //   window.addEventListener("mousemove", onMove);
  //   return () => window.removeEventListener("mousemove", onMove);
  // }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "64vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 2rem",
      }}
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.4,
          transition: "background-position 0.1s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,136,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        className="animate-float"
      />
      <div
        style={{
          position: "absolute", bottom: "15%", left: "5%",
          width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(255,61,0,0.06) 0%, transparent 70%)",
          borderRadius: "50%", animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <div className="hero-content">
        {/* Tag line */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div style={{
            width: "8px", height: "8px",
            background: "var(--accent)", borderRadius: "50%",
            boxShadow: "0 0 12px var(--accent)",
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase",
          }}>
            AI · Automation · Custom Software
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 8.8vw, 8rem)",
          lineHeight: 0.9, letterSpacing: "0.02em",
          color: "var(--text)", marginBottom: "0.2rem",
        }}>BUILD.</h1>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 8.8vw, 8rem)",
          lineHeight: 0.9, letterSpacing: "0.02em",
          color: "transparent", WebkitTextStroke: "1px var(--accent)",
          marginBottom: "0.2rem",
        }}>AUTOMATE.</h1>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 8.8vw, 8rem)",
          lineHeight: 0.9, letterSpacing: "0.02em",
          color: "var(--text)",
        }}>SCALE.</h1>

        {/* Sub-content row */}
        <div className="flex lg:flex-row flex-col flex-wrap gap-8 lg:items-start" style={{ marginTop: "3rem" }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)",
            color: "var(--muted)", maxWidth: "500px",
            lineHeight: 1.6, fontWeight: 300,
          }}>
            We help businesses stop wasting time on work that software can do for them —{" "}
            <span style={{
              color: "var(--accent)",
              fontWeight: 500,
              background: "rgba(0,136,255,0.10)",
              padding: "0.08em 0.3em",
              borderRadius: "4px",
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            }}>
              from websites and apps to AI and automation. The full stack, under one roof.
            </span>
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <a
  href="#audit"
  style={{
    fontFamily: "var(--font-mono)",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "1rem 2rem",
    border: "1px solid rgba(0,136,255,0.45)",
    background:
      "linear-gradient(135deg, rgba(0,136,255,0.18), rgba(0,136,255,0.05))",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "100%",
    height: "fit-content",
    alignSelf: "flex-start",
    position: "relative",
    overflow: "hidden",
    boxShadow:
      "0 0 30px rgba(0,136,255,0.18), inset 0 0 20px rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  }}
  onMouseEnter={(e) => {
    const target = e.currentTarget as HTMLElement;

    target.style.transform = "translateY(-4px) scale(1.02)";
    target.style.boxShadow =
      "0 12px 40px rgba(0,136,255,0.35), 0 0 20px rgba(0,136,255,0.2)";
    target.style.borderColor = "rgba(255,255,255,0.75)";
    target.style.background =
      "linear-gradient(135deg, rgba(0,136,255,0.28), rgba(0,136,255,0.08))";
  }}
  onMouseLeave={(e) => {
    const target = e.currentTarget as HTMLElement;

    target.style.transform = "translateY(0) scale(1)";
    target.style.boxShadow =
      "0 0 30px rgba(0,136,255,0.18), inset 0 0 20px rgba(255,255,255,0.03)";
    target.style.borderColor = "rgba(0,136,255,0.45)";
    target.style.background =
      "linear-gradient(135deg, rgba(0,136,255,0.18), rgba(0,136,255,0.05))";
  }}
>
  {/* Glow effect */}
  <div
    style={{
      position: "absolute",
      inset: "-40%",
      background:
        "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
      transform: "rotate(12deg)",
      animation: "shine 4s linear infinite",
      pointerEvents: "none",
    }}
  />

  {/* Live indicator */}
  <div
    style={{
      width: "8px",
      height: "8px",
      borderRadius: "999px",
      background: "#00ff88",
      boxShadow: "0 0 10px #00ff88",
      marginRight: "12px",
      animation: "pulseDot 1.8s infinite",
      flexShrink: 0,
    }}
  />

  Get Your Free Tech Audit →
</a>
            <a
              href="#work"
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "1rem 2rem", border: "1px solid var(--border)",
                color: "var(--muted)", textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s", display: "inline-flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              }}
            >See Our Work</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          letterSpacing: "0.2em", color: "var(--muted)",
          textTransform: "uppercase", writingMode: "vertical-rl",
        }}>Scroll</span>
        <div style={{
          width: "1px", height: "60px",
          background: "linear-gradient(var(--accent), transparent)",
        }} />
      </div>
    </section>
  );
}
