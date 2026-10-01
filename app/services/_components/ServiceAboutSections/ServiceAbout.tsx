"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ParallaxCard } from "./ParallaxCard";
import { NotificationCard } from "./NotificationCard";
import BlurredEllipses from "@/src/components/BlurredEllipses";
import { StatsCard } from "../../_data/types";

const WAVE_HEIGHTS = [
  "1.5rem", "3rem", "4.5rem", "6rem", "8rem", "8.5rem",
  "6rem", "4rem", "2.5rem", "3.5rem", "2rem",
];

const DEFAULT_STATS: StatsCard[] = [
  { count: "99", sysmbol: "%", heading: "Client Satisfaction" },
  { count: "25", sysmbol: "+", heading: "Tools We Know" },
  { count: "15", sysmbol: "+", heading: "Tools We Expertise" },
];

interface ServiceAboutProps {
  statscards?: StatsCard[];
  themeColor?: string;
}

const hexToRgba = (hex: string, alpha: number) => {
  try {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return `rgba(59, 130, 246, ${alpha})`;
  }
};

export default function ServiceAbout({ statscards, themeColor = "#3B82F6" }: ServiceAboutProps) {
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Normalize stats to guarantee "Client Satisfaction", "Tools We Know", and "Tools We Expertise"
  const stats: StatsCard[] = [
    {
      count: statscards?.[0]?.count || DEFAULT_STATS[0].count,
      sysmbol: statscards?.[0]?.sysmbol || DEFAULT_STATS[0].sysmbol,
      heading: "Client Satisfaction",
    },
    {
      count: statscards?.[1]?.count || DEFAULT_STATS[1].count,
      sysmbol: statscards?.[1]?.sysmbol || DEFAULT_STATS[1].sysmbol,
      heading: "Tools We Know",
    },
    {
      count: statscards?.[2]?.count || DEFAULT_STATS[2].count,
      sysmbol: statscards?.[2]?.sysmbol || DEFAULT_STATS[2].sysmbol,
      heading: "Tools We Expertise",
    },
  ];

  /* ── Card 1: infinite wave bars pulse ── */
  const runWaveAnim = (ctx: gsap.Context) => {
    ctx.add(() => {
      gsap.fromTo(".wave-bar",
        { scaleY: 0.15 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "sine.inOut",
          stagger: { each: 0.08, from: "start" },
          yoyo: true,
          repeat: -1,
          transformOrigin: "bottom"
        }
      );
    });
  };

  /* ── Card 2: infinite stacked cards floating ── */
  const runStackAnim = (ctx: gsap.Context) => {
    ctx.add(() => {
      gsap.fromTo(".stacked-card",
        { y: 8 },
        {
          y: -8,
          duration: 3.8,
          ease: "sine.inOut",
          stagger: 0.6,
          yoyo: true,
          repeat: -1
        }
      );
    });
  };

  /* ── Card 3: infinite dot travelling along SVG path ── */
  const runPathAnim = (ctx: gsap.Context) => {
    ctx.add(() => {
      const dot = document.querySelector<SVGCircleElement>(".travelling-dot");
      const dotGlow = document.querySelector<SVGCircleElement>(".travelling-dot-glow");
      const path = document.querySelector<SVGPathElement>(".card3-path");
      if (!dot || !path || !dotGlow) return;

      const length = path.getTotalLength();
      const obj = { t: 0 };

      gsap.fromTo(obj,
        { t: 0 },
        {
          t: 1,
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          onUpdate: () => {
            const pt = path.getPointAtLength(obj.t * length);
            dot.setAttribute("cx", pt.x.toString());
            dot.setAttribute("cy", pt.y.toString());
            dotGlow.setAttribute("cx", pt.x.toString());
            dotGlow.setAttribute("cy", pt.y.toString());
          },
        }
      );

      // Infinitely pulsing end node glow
      gsap.fromTo(".card3-node",
        { scale: 0.8, opacity: 0.5 },
        { scale: 1.2, opacity: 1, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "142px 55px" }
      );
    });
  };

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      /* ─── INITIAL entrance animation ─── */
      const tl = gsap.timeline();
      tl.from(".metric-card-new", { opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power2.out" });
      tl.from(".wave-bar", { scaleY: 0, duration: 1, stagger: 0.05, ease: "back.out(1.5)", transformOrigin: "bottom" }, "-=0.4");
      tl.from(".stacked-card", { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "<");
      tl.to(".card3-path", { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "<");
      tl.from(".card3-node", { scale: 0, opacity: 0, duration: 0.6, transformOrigin: "142px 55px", ease: "back.out(2.5)" }, "-=0.5");

      // Initial count-up (runs alongside entrance)
      stats.forEach((item, i) => {
        const endVal = parseInt(item.count, 10) || 0;
        const obj = { value: 0 };
        tl.to(obj, {
          value: endVal,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            const el = numberRefs.current[i];
            if (el) el.textContent = Math.round(obj.value).toString();
          },
        }, "-=1.5");
      });

      // Seamlessly start the continuous animations right after entrance finishes
      tl.call(() => {
        runWaveAnim(ctx);
        runStackAnim(ctx);
        runPathAnim(ctx);
      });
    }, cardsRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section className="relative w-full bg-black py-12 lg:py-16 overflow-hidden">
      {/* Decorative blurs */}
      <BlurredEllipses
        ellipse1={{
          width: "27.8125rem",
          height: "18.3125rem",
          top: "-8.25rem",
          left: "-9.5625rem",
          right: "auto",
          bottom: "auto",
          background: `linear-gradient(135deg, ${hexToRgba(themeColor, 0.5)} 0%, ${hexToRgba(themeColor, 0.15)} 100%)`,
          blur: "10.1875rem",
          transform: "rotate(140.24deg)",
        }}
        ellipse2={{
          width: "27.8125rem",
          height: "18.3125rem",
          top: "auto",
          left: "auto",
          right: "-6.25rem",
          bottom: "-6.25rem",
          background: `linear-gradient(135deg, ${hexToRgba(themeColor, 0.5)} 0%, ${hexToRgba(themeColor, 0.15)} 100%)`,
          blur: "10.1875rem",
          transform: "rotate(140.24deg)",
        }}
      />

      {/* Cards Grid */}
      <div ref={cardsRef} className="relative z-10 w-full px-6 md:px-12 lg:px-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1000px]">

        {/* ─── CARD 1: Client Satisfaction ─── */}
        <ParallaxCard className="flex flex-col justify-between p-6 lg:p-8 min-h-[24rem] sm:min-h-[26rem] bg-[#0F0F0F] rounded-[2.5rem]">
          <div className="w-full h-[12rem] flex flex-col pt-4 gap-4 bg-[#09090b] border border-white/[0.03] rounded-[1.75rem] py-4 px-6 translate-x-[15px] [transform:translateZ(30px)] [box-shadow:inset_0px_4px_20px_rgba(0,0,0,0.5)]">
            <span className="font-outfit text-sm font-medium tracking-wide" style={{ color: themeColor }}>Satisfaction</span>
            <div className="flex items-end justify-between w-full h-[6.5rem] pb-1 px-1">
              {WAVE_HEIGHTS.map((h, i) => (
                <div key={i} className="wave-bar rounded-full w-[5.5%] md:w-[0.75rem] origin-bottom"
                  style={{ height: h, background: `linear-gradient(180deg, ${themeColor} 0%, ${hexToRgba(themeColor, 0.3)} 100%)` }} />
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-start mt-auto pt-6 px-6 sm:px-8 translate-x-[25px] z-10 [transform:translateZ(40px)]">
            <div className="flex items-baseline gap-1">
              <span className="font-poppins font-bold text-white leading-none tracking-tight text-5xl sm:text-6xl lg:text-7xl"
                ref={(el) => { numberRefs.current[0] = el; }}>0</span>
              <span className="font-poppins font-bold text-white leading-none text-3xl sm:text-4xl lg:text-5xl">{stats[0].sysmbol}</span>
            </div>
            <span className="font-outfit text-[#E0E2E8] text-lg sm:text-xl lg:text-2xl mt-3 font-medium">{stats[0].heading}</span>
          </div>
        </ParallaxCard>

        {/* ─── CARD 2: Tools We Know (stacked) ─── */}
        <ParallaxCard className="relative flex flex-col justify-between p-6 lg:p-8 min-h-[24rem] sm:min-h-[26rem] bg-[#0F0F0F] rounded-[2.5rem] isolate">
          <div className="relative w-full max-w-[15rem] sm:max-w-[17.5rem] mx-auto flex flex-col items-center h-[12rem] pt-2">
            <div className="absolute top-0 z-0 flex justify-center w-full [transform:translateZ(10px)] scale-[0.84] origin-top opacity-60">
              <div className="stacked-card w-full flex justify-center">
                <NotificationCard width="100%" accentColor={themeColor} showText={false} className="h-[5rem] brightness-50" />
              </div>
            </div>
            <div className="absolute top-[2rem] z-10 flex justify-center w-full [transform:translateZ(20px)] scale-[0.92] origin-top opacity-85">
              <div className="stacked-card w-full flex justify-center">
                <NotificationCard width="100%" accentColor={themeColor} showText={false} className="h-[5rem] brightness-75" />
              </div>
            </div>
            <div className="absolute top-[4rem] z-20 flex justify-center w-full [transform:translateZ(30px)] scale-100 origin-top">
              <div className="stacked-card w-full flex justify-center">
                <NotificationCard
                  width="100%"
                  accentColor={themeColor}
                  showText={true}
                  title="Modern Tech Stack"
                  tag="Frameworks & Tools"
                  subText="Production Proven"
                  className="h-[5rem] shadow-2xl"
                />
              </div>
            </div>
            <div className="absolute top-[9.5rem] w-full px-6 flex flex-col gap-[0.75rem] opacity-[0.15] pointer-events-none z-0">
              {[0, 1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-dashed border-white" />)}
            </div>
          </div>
          <div className="w-full flex flex-col items-start mt-auto pt-6 px-6 sm:px-8 z-10 [transform:translateZ(40px)]">
            <div className="flex items-baseline gap-1">
              <span className="font-poppins font-bold text-white leading-none tracking-tight text-5xl sm:text-6xl lg:text-7xl"
                ref={(el) => { numberRefs.current[1] = el; }}>0</span>
              <span className="font-poppins font-bold text-white leading-none text-3xl sm:text-4xl lg:text-5xl">{stats[1].sysmbol}</span>
            </div>
            <span className="font-outfit text-[#E0E2E8] text-lg sm:text-xl lg:text-2xl mt-3 font-medium">{stats[1].heading}</span>
          </div>
        </ParallaxCard>

        {/* ─── CARD 3: Curve + travelling dot ─── */}
        <ParallaxCard
          className="relative flex flex-col justify-between p-6 lg:p-8 min-h-[24rem] sm:min-h-[26rem] rounded-[2.5rem] overflow-hidden"
          style={{ background: `radial-gradient(circle at 70% 30%, ${hexToRgba(themeColor, 0.16)} 0%, #0F0F0F 55%)` }}
        >
          <div className="relative w-full h-[12rem] pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 200 150" fill="none" className="w-[110%] h-[110%] transform -translate-y-1 translate-x-2" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={hexToRgba(themeColor, 0.5)} />
                  <stop offset="30%" stopColor={themeColor} />
                  <stop offset="55%" stopColor={themeColor} />
                  <stop offset="70%" stopColor="#E0E2E8" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <filter id="purpleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <g className="card3-svg-group">
                {/* Static path */}
                <path
                  className="card3-path"
                  d="M 15 125 C 30 115,45 65,65 65 C 85 65,90 95,110 95 C 130 95,135 60,142 55 C 155 45,175 30,190 10"
                  stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round"
                />

                {/* ── Travelling dot — starts at path origin ── */}
                <circle className="travelling-dot" cx="15" cy="125" r="4" fill="#ffffff" opacity="0.9">
                  <animate attributeName="r" values="4;5.5;4" dur="1s" repeatCount="indefinite" />
                </circle>
                {/* Glow behind travelling dot */}
                <circle className="travelling-dot-glow" cx="15" cy="125" r="10" fill={themeColor} opacity="0.35" filter="url(#purpleGlow)" />
              </g>
            </svg>
          </div>
          <div className="w-full flex flex-col items-start mt-auto pt-6 px-6 sm:px-8 z-10 [transform:translateZ(40px)]">
            <div className="flex items-baseline gap-1">
              <span className="font-poppins font-bold text-white leading-none tracking-tight text-5xl sm:text-6xl lg:text-7xl"
                ref={(el) => { numberRefs.current[2] = el; }}>0</span>
              <span className="font-poppins font-bold text-white leading-none text-3xl sm:text-4xl lg:text-5xl">{stats[2].sysmbol}</span>
            </div>
            <span className="font-outfit text-[#E0E2E8] text-lg sm:text-xl lg:text-2xl mt-3 font-medium">{stats[2].heading}</span>
          </div>
        </ParallaxCard>

      </div>
    </section>
  );
}