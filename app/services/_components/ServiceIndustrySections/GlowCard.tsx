"use client";

import { useState, useRef, useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  themeColor?: string;
}

const hexToRgba = (hex: string, alpha: number) => {
  try {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch (e) {
    return `rgba(164, 97, 255, ${alpha})`;
  }
};

export function GlowCard({ children, className, style, themeColor = "#A461FF" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const onMouseLeave = useCallback(() => setGlowPos(null), []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Cursor-following glow overlay */}
      {glowPos && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: glowPos.x,
            top: glowPos.y,
            width: "18rem",
            height: "18rem",
            transform: "translate(-50%, -50%)",
            background:
              `radial-gradient(circle, ${hexToRgba(themeColor, 0.18)} 0%, transparent 70%)`,
            borderRadius: "50%",
            transition: "opacity 0.15s ease",
          }}
        />
      )}
      {/* Border glow — lights up on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg"
        style={{
          opacity: glowPos ? 1 : 0,
          transition: "opacity 0.3s ease",
          boxShadow: `inset 0 0 0 1px ${hexToRgba(themeColor, 0.55)}`,
        }}
      />
      {children}
    </div>
  );
}
