"use client";
import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import { CALENDLY_URL, btnFilled, btnGhost } from "../lib/constants";

type Variant = "primary" | "ghost" | "nav";

const variantStyle: Record<Variant, React.CSSProperties> = {
  primary: btnFilled,
  ghost: btnGhost,
  nav: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "0.5rem 1.25rem",
    border: "1px solid var(--accent)",
    color: "var(--accent)",
    background: "transparent",
    textDecoration: "none",
    cursor: "pointer",
  },
};

/**
 * Calendly "Book a Call" CTA. Uses react-calendly's PopupButton once mounted
 * (so it opens an in-page modal) and falls back to a plain link before hydration.
 */
export default function BookCallButton({
  text = "Book Free Call",
  variant = "primary",
  fullWidth = false,
}: {
  text?: string;
  variant?: Variant;
  fullWidth?: boolean;
}) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  // Calendly's PopupButton needs a real DOM node as its root, which only exists
  // on the client. We render a plain link until mounted (keeps SSR/hydration in
  // sync), then swap to the popup. This one-time mount flip is the intended use.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRootElement(document.body);
  }, []);

  const style: React.CSSProperties = {
    ...variantStyle[variant],
    ...(fullWidth ? { width: "100%" } : {}),
  };

  if (!rootElement) {
    return (
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={style}>
        {text}
      </a>
    );
  }

  return (
    <div style={fullWidth ? { width: "100%" } : { display: "inline-block" }}>
      <PopupButton
        url={CALENDLY_URL}
        rootElement={rootElement}
        text={text}
        styles={style}
      />
    </div>
  );
}
