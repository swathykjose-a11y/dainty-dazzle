import { ImageResponse } from "next/og";

export const alt = "Dainty Dazzle — Fine, Handcrafted Jewelry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#F2F5EF",
          position: "relative",
        }}
      >
        {/* Subtle border frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid #D5DDD6",
            display: "flex",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 96,
            color: "#1A211D",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          Lumiere
        </div>

        {/* Divider line */}
        <div
          style={{
            width: 80,
            height: 1,
            backgroundColor: "#C4A265",
            marginTop: 32,
            marginBottom: 32,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: "#737F76",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Fine, Handcrafted Jewelry
        </div>

        {/* Bottom brand */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 13,
            color: "#737F76",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          daintydazzle.com
        </div>
      </div>
    ),
    { ...size },
  );
}
