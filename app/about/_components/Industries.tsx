'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import elearningImg from "@assets/images/industries/elearning.png";
import healthcareImg from "@assets/images/industries/healthcare.png";
import sustainabilityImg from "@assets/images/industries/sustainability.png";
import fashionImg from "@assets/images/industries/fashion.png";
import techSoftwareImg from "@assets/images/industries/tech-software.png";

gsap.registerPlugin(ScrollTrigger);

const hexToRgba = (hex: string, alpha: number) => {
  try {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch (e) {
    return hex;
  }
};

const INDUSTRIES_DATA = [
  {
    title: "E-learning",
    tags: ["Virtual Classrooms", "Interactive Modules", "3D Simulations", "Skill Assessments"],
    description: "At ThirdVizion, we transform traditional learning and training into interactive 3D virtual experiences that dramatically boost student engagement, retention, and practical skill mastery.",
    bgImage: elearningImg,
    bgColor: "#121316",
  },
  {
    title: "Retail & E-commerce",
    tags: ["3D Showrooms", "Virtual Try-On", "Interactive Catalogs", "AR Shopping"],
    description: "Turn online shopping into immersive 3D journeys. Allow customers to explore virtual showrooms, try products in augmented reality, and make confident purchase decisions.",
    bgImage: fashionImg,
    bgColor: "#16171A",
  },
  {
    title: "Healthcare & Medical",
    tags: ["Medical Simulations", "Surgical Prep", "Anatomy 3D", "Staff Training"],
    description: "Empower medical professionals and students with risk-free 3D surgical prep, interactive anatomy models, and high-precision medical simulations.",
    bgImage: healthcareImg,
    bgColor: "#1A1C20",
  },
  {
    title: "Sustainability & Energy",
    tags: ["Eco Visualizer", "Carbon Tracking", "Green Initiatives", "Impact Reports"],
    description: "Communicate environmental initiatives and complex clean-tech infrastructure through vivid 3D visualizations that inspire stakeholder trust and public action.",
    bgImage: sustainabilityImg,
    bgColor: "#1F2126",
  },
  {
    title: "Fashion & Apparel",
    tags: ["Digital Lookbooks", "Virtual Runways", "3D Apparel", "Custom Fitting"],
    description: "Bring high fashion into the metaverse with photorealistic 3D garment visualization, digital fitting experiences, and interactive virtual runway launches.",
    bgImage: fashionImg,
    bgColor: "#24262C",
  },
  {
    title: "Technology & Software",
    tags: ["Tech Demos", "Cloud Architecture", "System Automation", "Interactive UI"],
    description: "Demonstrate complex software architectures, cloud networks, and hardware innovations through high-impact, interactive digital product demos.",
    bgImage: techSoftwareImg,
    bgColor: "#292B32",
  },
];

// Distance in px between each pinned card's landing spot.
const STACK_OFFSET_PX = 16;

// Distance from the very top of the viewport where card 0 lands.
const TOP_ANCHOR_PX = 96;

const Industries = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      const triggers: ScrollTrigger[] = [];

      cards.forEach((card, i) => {
        const landingSpot = TOP_ANCHOR_PX + i * STACK_OFFSET_PX;
        // Keep previous card pinned in its stacked position until the last card arrives
        const remainingCards = cards.length - 1 - i;
        const extraScroll = remainingCards * card.offsetHeight;

        const st = ScrollTrigger.create({
          trigger: card,
          start: `top ${landingSpot}px`,
          end: () => `+=${card.offsetHeight + extraScroll}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        triggers.push(st);
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);

      return () => {
        window.removeEventListener('load', refresh);
        triggers.forEach((t) => t.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black py-10 lg:py-16 text-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[60px]">

        {/* Top Section Title */}
        <div className="w-full mb-10 md:mb-14 text-center">
          <h2 className="heading text-white font-semibold tracking-tight font-anta">
            Industries We Work With
          </h2>
        </div>

        {/* Cards live in normal flow — required for the pin-stack to work */}
        <div className="relative w-full">
          {INDUSTRIES_DATA.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="industry-card relative w-full h-[520px] sm:h-[560px] md:h-[600px] rounded-[24px] sm:rounded-[28px] md:rounded-[36px] border border-[#FF2626]/80 sm:border-[#FF2626] backdrop-blur-2xl backdrop-saturate-150 flex flex-col justify-between shadow-[0_0_25px_rgba(255,38,38,0.45),0_0_50px_rgba(255,0,0,0.2),0_-15px_40px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(255,38,38,0.1)] overflow-hidden will-change-transform"
              style={{
                backgroundColor: hexToRgba(item.bgColor, 0.85),
              }}
            >
              {/* Specular glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none rounded-[inherit]" />

              {/* Card Content Body */}
              <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 flex-1">
                {/* Left Side: Title, Tags & Description */}
                <div className="w-full md:w-[58%] flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5 text-left">
                  {/* Title */}
                  <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight font-outfit">
                    {item.title}
                  </h3>

                  {/* Sub-tags Pill Row */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 py-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium font-outfit text-zinc-200 bg-white/10 backdrop-blur-md border border-white/15 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Star Icon + Description */}
                  <div className="flex items-start gap-3 pt-1">
                    <span className="text-[#FFC016] text-base sm:text-lg mt-0.5 select-none">✦</span>
                    <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-outfit max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right Side: Image Box */}
                <div className="w-full md:w-[40%] aspect-[16/10] sm:aspect-[4/3] max-h-[220px] sm:max-h-[260px] md:max-h-[320px] relative rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900/80 backdrop-blur-md border border-white/20 shrink-0 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <Image
                    src={item.bgImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Industries };