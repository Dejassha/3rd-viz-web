"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const tickerRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
        const lenis = new Lenis({
          duration: 2,          // slower scroll
          lerp: 0.05,           // smoother interpolation
          smoothWheel: true,
          wheelMultiplier: 0.7, // reduces wheel speed
        });
    // Make ScrollTrigger use Lenis scroll position
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined)
          lenis.scrollTo(value, { immediate: true });
        return lenis.scroll;
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickerRef.current = ticker;
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      lenis.off("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
