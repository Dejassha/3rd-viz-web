"use client";

import { useState, useEffect } from "react";

/** Breakpoints (min-width in px) - align with Tailwind defaults */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export interface UseResponsiveOptions {
  /** Width below this is considered "mobile" (default: lg = 1024) */
  mobileMaxWidth?: number;
}

export interface ResponsiveState {
  width: number;
  radius: number;
  viewportWidth: number;
  /** true when width < mobileMaxWidth (default < 1024) */
  isMobile: boolean;
  /** true when width >= lg (1024) */
  isLap: boolean;
  /** true when width >= sm (640) */
  isSm: boolean;
  /** true when width >= md (768) */
  isMd: boolean;
  /** true when width >= lg (1024) */
  isLg: boolean;
  /** true when width >= xl (1280) */
  isXl: boolean;
  /** Check if a breakpoint matches (min-width) */
  up: (key: BreakpointKey) => boolean;
  /** Check if width is below a breakpoint (max-width) */
  down: (key: BreakpointKey) => boolean;
}

function getWidth(): number {
  if (typeof window === "undefined") return BREAKPOINTS.lg;
  return window.innerWidth;
}

export function useResponsive(
  options: UseResponsiveOptions = {},
): ResponsiveState {
  const { mobileMaxWidth = BREAKPOINTS.lg } = options;
  const [width, setWidth] = useState(getWidth);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [radius, setRadius] = useState<number>(10);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsMobile(width < 1024);
      setViewportWidth(width);

      if (width < 240) setRadius(30);
      else if (width < 1000) setRadius(50);
      else setRadius(80);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const update = () => setWidth(getWidth());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    width,
    radius,
    viewportWidth,
    isMobile: width < mobileMaxWidth,
    isLap: width >= BREAKPOINTS.lg,
    isSm: width >= BREAKPOINTS.sm,
    isMd: width >= BREAKPOINTS.md,
    isLg: width >= BREAKPOINTS.lg,
    isXl: width >= BREAKPOINTS.xl,
    up: (key) => width >= BREAKPOINTS[key],
    down: (key) => width < BREAKPOINTS[key],
  };
}
