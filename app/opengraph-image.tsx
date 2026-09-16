import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F3EDE2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 100,
            fontSize: 18,
            letterSpacing: "0.15em",
            color: "#B3A796",
            textTransform: "uppercase",
          }}
        >
          Portfolio · 2026
        </div>

        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            color: "#3B3024",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Somesh M
        </div>

        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: "#7A6C5C",
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          AI Developer & Full Stack Engineer
        </div>

        <div
          style={{
            width: 60,
            height: 3,
            background: "#3B3024",
            marginBottom: 40,
          }}
        />

        <div
          style={{
            fontSize: 24,
            color: "#B3A796",
            lineHeight: 1.5,
          }}
        >
          Building intelligent, AI-powered software systems
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 100,
            fontSize: 18,
            color: "#B3A796",
            letterSpacing: "0.05em",
          }}
        >
          {SITE.url.replace(/\/$/, "")}
        </div>
      </div>
    ),
    size,
  );
}
