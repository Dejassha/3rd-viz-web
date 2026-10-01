import React from "react";

export interface EllipseConfig {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  height?: string;
  background?: string;
  blur?: string;
  transform?: string;
  className?: string;
}

interface BlurredEllipsesProps {
  ellipse1?: EllipseConfig;
  ellipse2?: EllipseConfig;
}

export default function BlurredEllipses({ ellipse1, ellipse2 }: BlurredEllipsesProps) {
  const default1: EllipseConfig = {
    width: "40.375rem",
    height: "26.25rem",
    right: "-5rem",
    top: "-3.75rem",
    background: "linear-gradient(90deg, rgba(0, 254, 34, 0.66) 0%, rgba(69, 0, 161, 0.66) 50%, rgba(122, 24, 255, 0.66) 100%)",
    blur: "15.5625rem",
    transform: "matrix(0.26, 0.97, 0.97, -0.26, 0, 0)",
  };

  const default2: EllipseConfig = {
    width: "40.375rem",
    height: "26.25rem",
    left: "-20.3125rem",
    top: "-27.5rem",
    background: "linear-gradient(90deg, rgba(65, 6, 105, 0.66) 0%, rgba(69, 0, 161, 0.66) 50%, rgba(122, 24, 255, 0.66) 100%)",
    blur: "15.5625rem",
    transform: "matrix(0.26, 0.97, 0.97, -0.26, 0, 0)",
  };

  const e1 = { ...default1, ...ellipse1 };
  const e2 = { ...default2, ...ellipse2 };

  return (
    <>
      <style>{`
        @keyframes float-glow-1 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.04);
          }
          66% {
            transform: translate(-15px, 15px) scale(0.96);
          }
        }
        @keyframes float-glow-2 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
        .animate-float-glow-1 {
          animation: float-glow-1 25s ease-in-out infinite;
        }
        .animate-float-glow-2 {
          animation: float-glow-2 30s ease-in-out infinite;
        }
      `}</style>

      {/* Ellipse 1 (floating container wrapper) */}
      <div
        className="pointer-events-none absolute animate-float-glow-1"
        style={{
          width: e1.width,
          height: e1.height,
          top: e1.top,
          left: e1.left,
          right: e1.right,
          bottom: e1.bottom,
        }}
      >
        <div
          className={`w-full h-full ${e1.className || ""}`}
          style={{
            background: e1.background,
            filter: e1.blur ? `blur(${e1.blur})` : undefined,
            transform: e1.transform,
          }}
        />
      </div>

      {/* Ellipse 2 (floating container wrapper) */}
      <div
        className="pointer-events-none absolute animate-float-glow-2"
        style={{
          width: e2.width,
          height: e2.height,
          top: e2.top,
          left: e2.left,
          right: e2.right,
          bottom: e2.bottom,
        }}
      >
        <div
          className={`w-full h-full ${e2.className || ""}`}
          style={{
            background: e2.background,
            filter: e2.blur ? `blur(${e2.blur})` : undefined,
            transform: e2.transform,
          }}
        />
      </div>
    </>
  );
}
