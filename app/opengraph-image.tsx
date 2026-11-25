import { ImageResponse } from "next/og";

export const alt =
  "aitoolslist.ai: Find the best AI tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card, inherited by every page that doesn't define its own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f5f8fc",
          fontFamily: "sans-serif",
          backgroundColor: "#0a2a4e",
          backgroundImage:
            "radial-gradient(60% 55% at 8% -5%, rgba(0,165,236,0.42), transparent 60%), radial-gradient(55% 60% at 98% 18%, rgba(64,66,174,0.30), transparent 60%), radial-gradient(60% 60% at 75% 110%, rgba(0,139,220,0.22), transparent 60%)",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "13px",
              backgroundColor: "#008bdc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 700,
              color: "#ffffff",
              marginRight: "16px",
            }}
          >
            ai
          </div>
          <div style={{ display: "flex", fontSize: "32px", fontWeight: 700 }}>
            <span>aitoolslist</span>
            <span style={{ color: "#00a5ec" }}>.ai</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "80px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
            }}
          >
            <div style={{ display: "flex" }}>Thousands of AI tools.</div>
            <div style={{ display: "flex" }}>
              <span>Find the&nbsp;</span>
              <span style={{ color: "#00a5ec", fontStyle: "italic" }}>right one.</span>
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              fontSize: "31px",
              color: "rgba(245,241,234,0.72)",
              maxWidth: "960px",
            }}
          >
            Discover and evaluate the best AI tools across 62 categories,
            backed by independent research, evidence and expert evaluation.
          </div>
        </div>

        {/* Footer chips */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "23px",
            color: "rgba(245,241,234,0.55)",
          }}
        >
          <span>62 categories</span>
          <span style={{ margin: "0 18px", color: "#008bdc" }}>•</span>
          <span>Evidence-backed</span>
          <span style={{ margin: "0 18px", color: "#008bdc" }}>•</span>
          <span>Updated every fortnight</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
