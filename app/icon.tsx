import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Browser-tab favicon: the brand "ai" mark (coral rounded square).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8541f",
          color: "#ffffff",
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        ai
      </div>
    ),
    { ...size },
  );
}
