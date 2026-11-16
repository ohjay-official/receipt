import { ImageResponse } from "next/og";

export const alt = "Receipt. Previewed. Verified.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#202A36",
          color: "#EEF0F5",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 620 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2 }}>Previewed.</div>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2 }}>Verified.</div>
          <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, color: "#A3A9B8" }}>
            Don&apos;t merge a preview without a Receipt.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 340,
            background: "#F4F1EA",
            color: "#202A36",
            padding: "28px 28px 32px",
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: 2 }}>RECEIPT</div>
          <div style={{ fontSize: 32, marginTop: 16 }}>Pull request #3</div>
          <div style={{ fontSize: 16, marginTop: 10 }}>VERIFIED</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 16 }}>
            <span>Fix</span>
            <span>186ecdc</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 16 }}>
            <span>Green</span>
            <span>43699955024</span>
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginTop: 36,
              border: "3px solid #B4232F",
              color: "#B4232F",
              padding: "8px 12px",
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            VERIFIED
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
