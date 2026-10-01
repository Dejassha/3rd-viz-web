"use client";

import ScrollReveal from "@/src/components/ScrollReveal";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Motive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const missionTextRef = useRef<HTMLDivElement>(null);
  const visionTextRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const mission = missionTextRef.current;
    const vision = visionTextRef.current;
    if (!path || !mission || !vision) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Mission line animation: synced exactly with Mission text reveal (top 80% -> top 35%)
    const missionTween = gsap.fromTo(
      path,
      { strokeDashoffset: pathLength },
      {
        strokeDashoffset: pathLength * 0.58,
        ease: "none",
        scrollTrigger: {
          trigger: mission,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      }
    );

    // Vision line animation: synced exactly with Vision text reveal (top 80% -> top 35%)
    const visionTween = gsap.fromTo(
      path,
      { strokeDashoffset: pathLength * 0.58 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: vision,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      }
    );

    return () => {
      missionTween.kill();
      visionTween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === mission || st.trigger === vision) st.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-8 sm:py-10 lg:py-20 relative overflow-x-hidden">
      <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden hidden lg:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 962"
          className="w-full h-full"
          fill="none"
        >
          <path
            ref={pathRef}
            d="M -30 60 C 250 180, 450 320, 320 480 C 200 600, 450 680, 750 620 C 1050 560, 1150 780, 1470 850"
            stroke="url(#paint0_linear_572_191)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <defs>
            <linearGradient id="paint0_linear_572_191" x1="1444.71" y1="879.126" x2="33.4784" y2="354.62" gradientUnits="userSpaceOnUse">
              <stop offset="0.0629839" stopColor="#FDB928" />
              <stop offset="0.297654" stopColor="#F38540" />
              <stop offset="0.503482" stopColor="#3EA9C1" />
              <stop offset="0.755578" stopColor="#5EBC58" />
              <stop offset="1" stopColor="#EE3A5C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Our Mission Block */}
      <div className="z-10 container">
        <h3 className="heading text-white">Our Mission</h3>

        <div ref={missionTextRef}>
          <ScrollReveal
            scrollStart="top 80%"
            wordAnimationEnd="top 35%"
            rotationEnd="top 35%"
            containerClassName="text-white subHeading font-inter-tight text-left my-3 sm:my-5 lg:my-8"
            textClassName="text-inherit font-normal leading-relaxed"
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
          >
            At ThirdVizion Labs, we design and build intelligent digital solutions
            that help businesses operate smarter, scale faster, and stay
            future-ready.We specialize in custom ERP systems, business automation,
            software development, cloud solutions, and immersive technologies
            tailored to unique business needs. Our approach goes beyond technology
            to focus on solving real operational challenges. By streamlining
            workflows, centralizing data, and enhancing efficiency, we simplify
            complex business processes.
          </ScrollReveal>
        </div>
      </div>

      {/* Our Vision Block */}
      <div className="py-16 sm:py-24 lg:py-32 container">
        <h3 className="heading text-white text-right">Our Vision</h3>

        <div ref={visionTextRef}>
          <ScrollReveal
            scrollStart="top 80%"
            wordAnimationEnd="top 35%"
            rotationEnd="top 35%"
            containerClassName="text-white subHeading text-right my-3 sm:my-4 lg:my-8"
            textClassName="text-inherit font-normal leading-relaxed"
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
          >
            At ThirdVizion Labs, we design and build intelligent digital solutions
            that help businesses operate smarter, scale faster, and stay
            future-ready.We specialize in custom ERP systems, business automation,
            software development, cloud solutions, and immersive technologies
            tailored to unique business needs. Our approach goes beyond technology
            to focus on solving real operational challenges. By streamlining
            workflows, centralizing data, and enhancing efficiency, we simplify
            complex business processes.
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

export default Motive;
