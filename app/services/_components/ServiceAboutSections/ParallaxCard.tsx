import React, { useRef } from "react";
import { useParallaxTilt } from "./useParallaxTilt";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxCard({ children, className = "", style = {} }: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallaxTilt(ref);
  return (
    <div
      ref={ref}
      className={`metric-card-new ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
