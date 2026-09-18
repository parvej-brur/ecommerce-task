import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "linear-gradient(135deg, #1b6d44 0%, #143326 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 128,
            height: 128,
            borderRadius: 30,
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: "#fff" }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a7f3d0" }}>
          Everything you need, delivered to your doorstep
        </div>
      </div>
    ),
    { ...size },
  );
}
