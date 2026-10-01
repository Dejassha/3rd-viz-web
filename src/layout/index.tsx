'use client';

import { Suspense, useEffect, useRef } from 'react';
import Footer from "./Footer";
import FixedSocialRail from "./FixedSocialRail";
import Header from "./Header";
import SmoothScroll from "@/src/components/SmoothScroll";

const SEGMENTS = 100;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const path = svg.querySelector('path');
    if (!path) return;

    const points: { x: number; y: number }[] = [];
    const mouse = { x: 0, y: 0 };

    const move = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      mouse.x = x;
      mouse.y = y;
      if (points.length === 0) {
        for (let i = 0; i < SEGMENTS; i++) {
          points.push({ x, y });
        }
      }
    };

    let rafId: number;
    const anim = () => {
      let px = mouse.x;
      let py = mouse.y;
      points.forEach((p, index) => {
        p.x = px;
        p.y = py;
        const n = points[index + 1];
        if (n) {
          px = px - (p.x - n.x) * 0.6;
          py = py - (p.y - n.y) * 0.6;
        }
      });
      path.setAttribute('d', `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`);
      rafId = requestAnimationFrame(anim);
    };

    const resize = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      svg.style.width = ww + 'px';
      svg.style.height = wh + 'px';
      svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
    };

    document.addEventListener('mousemove', move);
    window.addEventListener('resize', resize);
    resize();
    rafId = requestAnimationFrame(anim);

    return () => {
      document.removeEventListener('mousemove', move);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {/* <svg ref={svgRef} className="trail" viewBox="0 0 1 1">
        <defs>
          <linearGradient id="trailStripeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDB928" />
            <stop offset="18%" stopColor="#F38540" />
            <stop offset="36%" stopColor="#3EA9C1" />
            <stop offset="54%" stopColor="#5EBC58" />
            <stop offset="72%" stopColor="#EE3A5C" />
            <stop offset="100%" stopColor="#FDB928" />
          </linearGradient>
        </defs>
        <path d="" />
      </svg> */}
      {children}
      <Footer />
      <FixedSocialRail />
    </SmoothScroll>
  );
}
