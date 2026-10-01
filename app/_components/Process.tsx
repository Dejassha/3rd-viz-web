"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { circles, colorTransitions, svgWidth } from "./data"
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Indhu() {
    const [radius, setRadius] = useState<number>(10);
    // const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [viewportWidth, setViewportWidth] = useState<number>(0);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);


    // Responsive detection
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setIsMobile(width < 1024);
            setViewportWidth(width);

            if (width < 240) setRadius(30);
            else if (width < 1000) setRadius(15);
            else setRadius(80);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to get current color based on scroll progress
    const getCurrentColor = (progress: number): string => {
        if (colorTransitions.useSingleColor) {
            return colorTransitions.singleColor;
        }

        const currentTransition = colorTransitions.transitions.find(
            (transition) => progress >= transition.startProgress && progress <= transition.endProgress
        );

        return (
            currentTransition?.color ?? colorTransitions.transitions[0]?.color
        )
    };

    // Function to create gradient stops for precise color transitions
    const getPreciseGradientStops = () => {
        if (colorTransitions.useSingleColor) {
            return [
                <stop key="single-start" offset="0%" stopColor={colorTransitions.singleColor} />,
                <stop key="single-end" offset="100%" stopColor={colorTransitions.singleColor} />
            ];
        }

        const gradientStops: any[] = [];

        colorTransitions.transitions.forEach((transition, index) => {
            gradientStops.push(
                <stop
                    key={`start-${index}`}
                    offset={`${transition.startProgress * 100}%`}
                    stopColor={transition.color}
                />,
                <stop
                    key={`end-${index}`}
                    offset={`${transition.endProgress * 100}%`}
                    stopColor={transition.color}
                />
            );
        });

        return gradientStops;
    };

    // Function to apply pulse animation
    const applyPulseEffect = () => {
        if (!colorTransitions.pulseEffect || !pathRef.current) return;

        const path = pathRef.current;
        gsap.to(path, {
            strokeOpacity: 1 - colorTransitions.pulseIntensity,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    };

    // Function to apply glow effect
    const applyGlowEffect = () => {
        if (!colorTransitions.glowEffect || !pathRef.current) return;

        const path = pathRef.current;
        path.style.filter = `drop-shadow(0 0 ${colorTransitions.glowIntensity * 8}px currentColor)`;
    };

    useEffect(() => {

        if (isMobile) return;

        const section = containerRef.current;
        const svg = svgRef.current;
        const path = pathRef.current;

        if (!section || !svg || !path) return;

        // Clean up any existing ScrollTriggers
        ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === section || st.trigger === svg || st.vars?.trigger === section) {
                st.kill();
            }
        });

        const totalLength = path.getTotalLength();
        gsap.set(path, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength,
            strokeWidth: colorTransitions.strokeWidth,
            strokeOpacity: colorTransitions.strokeOpacity
        });

        // Apply visual effects
        applyPulseEffect();
        applyGlowEffect();

        // Scale viewBox units (6500) to actual rendered DOM pixels so SUCCESS is centered
        const getScrollAmount = () => {
            const viewportWidth = window.innerWidth;
            const lastCircleCx = circles[circles.length - 1].cx;
            const rectWidth = svg.getBoundingClientRect().width || svg.scrollWidth || 6500;
            const actualCirclePx = lastCircleCx * (rectWidth / 6500);
            return -(actualCirclePx - viewportWidth / 2);
        };

        const calculateEnd = () => {
            const scrollAmount = Math.abs(getScrollAmount());
            return `+=${scrollAmount}`;
        };

        const scrollTween = gsap.to(svg, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: calculateEnd,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                pinSpacing: true,
                markers: false,
                onLeave: () => {
                    // Ensure proper cleanup when leaving section
                    ScrollTrigger.refresh();
                },
                onEnterBack: () => {
                    // Ensure proper re-entry behavior
                    ScrollTrigger.refresh();
                }
            },
        });

        const pathAnimation = gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: calculateEnd,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        // PRECISE COLOR TRANSITION CONTROL BASED ON SCROLL PROGRESS
        const colorAnimation = gsap.to({}, {
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: calculateEnd,
                scrub: 0.1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const currentColor = getCurrentColor(progress);

                    // Update the path color
                    path.style.stroke = currentColor;

                    // Update circle colors based on progress
                    circles.forEach((circle) => {
                        if (
                            progress >= circle.progressStart &&
                            progress <= circle.progressEnd
                        ) {
                            const circleElement = document.querySelector(`circle[cx="${circle.cx}"]`) as SVGCircleElement | null;
                            if (circleElement) {
                                circleElement.style.strokeWidth = "3";
                                circleElement.style.filter = "drop-shadow(0 0 8px currentColor)";
                            }
                        }
                    });
                },
            },
        });

        // Optimized resize handler with debounce
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            scrollTween?.kill();
            pathAnimation?.kill();
            colorAnimation?.kill();

            // Kill all ScrollTriggers associated with this section
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === section || st.vars?.trigger === section) {
                    st.kill();
                }
            });
        };
    }, [isMobile]);


    useEffect(() => {
        if (isMobile === null) return;
        // if (isMobile === null) return null;

        const items = document.querySelectorAll(".mobile-step");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.3,
            }
        );

        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, [isMobile]);

    // --- DESKTOP ORIGINAL DESIGN ---
    const splitDescription = (description: string): string[] => {
        const words = description.split(" ");
        const totalWords = words.length;
        const targetLines = 3;
        const wordsPerLine = Math.ceil(totalWords / targetLines);

        const lines = [];
        let currentLine: string[] = [];
        let currentWordCount = 0;

        words.forEach((word, index) => {
            currentLine.push(word);
            currentWordCount++;
            if (currentWordCount >= wordsPerLine || index === words.length - 1) {
                if (currentLine.length > 2 || index === words.length - 1) {
                    lines.push(currentLine.join(" "));
                    currentLine = [];
                    currentWordCount = 0;
                }
            }
        });
        while (lines.length < targetLines) lines.push("");
        return lines.slice(0, targetLines);
    };

    const pathD = `
    M ${circles[0].cx} ${circles[0].cy}
    ${circles
            .slice(1)
            .map((circle, i) => {
                const prevCircle = circles[i];
                const controlPoint1 = {
                    x: prevCircle.cx + (circle.cx - prevCircle.cx) * 0.25,
                    y: prevCircle.cy,
                };
                const controlPoint2 = {
                    x: circle.cx - (circle.cx - prevCircle.cx) * 0.25,
                    y: circle.cy,
                };
                return `C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${circle.cx} ${circle.cy}`;
            })
            .join(" ")}
    `;

    return (
        <>
            {isMobile === true && (
                <section className="container mx-auto bg-black text-white w-full h-full py-16 flex flex-col items-center">

                    {/* Heading */}
                    <div
                        className="text-center mb-10"
                        style={{ fontFamily: "DeaconTest, sans-serif", fontWeight: 600 }}
                    >
                        <h1 className="text-3xl md:text-4xl capitalize text-white">
                            how we <span className="text-[#FFC016]">deliver</span> excellence
                        </h1>
                    </div>

                    {/* Vertical scroll container */}
                    <div className="w-full max-w-96 overflow-y-auto h-full space-y-12 no-scrollbar">
                        {circles.map((c) => (
                            <div
                                key={c.id}
                                className="flex flex-col items-center text-center translate-y-10 mobile-step"
                            >
                                {/* Circle image with drop animation */}
                                <div
                                    className="relative w-24 h-24 rounded-full bg-[#1a1a1a] border flex items-center justify-center"
                                    style={{
                                        borderColor: c.color,
                                    }}
                                >
                                    <Image
                                        src={c.img}
                                        alt={c.label}
                                        // fill
                                        sizes="56px"
                                        className="object-contain"
                                    />
                                </div>

                                <h2
                                    className="text-2xl font-semibold mt-4"
                                    style={{
                                        fontFamily: "Outfit, sans-serif",
                                        color: c.color,
                                    }}
                                >
                                    {c.label}
                                </h2>

                                <p
                                    className="text-gray-300 text-sm leading-relaxed mt-2"
                                    style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
                                >
                                    {c.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            <section
                ref={containerRef}
                className=" mx-auto relative w-full min-h-screen bg-black text-white flex items-center justify-start py-16 isolate"
            >
                <div className="absolute inset-0 bg-black" />

                <div
                    className="absolute top-24 left-1/2 -translate-x-1/2 uppercase text-center z-10 w-full px-4"
                    style={{ fontFamily: "DeaconTest, sans-serif", fontWeight: 600 }}
                >
                    <p className="text-xs sm:text-sm text-[#FFC016] tracking-wide uppercase mb-2">
                        Our Process
                    </p>
                    <h1
                        className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl leading-tight text-[#ffffff] capitalize"
                        style={{ textShadow: "none" }}
                    >
                        how we <span className="text-[#FFC016]">deliver</span> excellence
                    </h1>
                </div>

                <div className="relative shrink-0 w-full h-150 lg:h-175 2xl:h-200 z-10 overflow-visible">
                    <svg
                        ref={svgRef}
                        viewBox={`0 0 ${svgWidth} 600`}
                        className="w-1500 h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Background path */}
                        <path
                            d={pathD}
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Main animated path with precise color control */}
                        <path
                            ref={pathRef}
                            d={pathD}
                            stroke={colorTransitions.useSingleColor ? colorTransitions.singleColor : "currentColor"}
                            strokeWidth={colorTransitions.strokeWidth}
                            strokeLinecap="round"
                            fill="none"
                            strokeOpacity={colorTransitions.strokeOpacity}
                        />

                        <defs>
                            {/* Gradient definition (backup for gradient mode) */}
                            <linearGradient id="gradientGlow" x1="0" y1="0" x2="1" y2="0">
                                {getPreciseGradientStops()}
                            </linearGradient>

                            {/* Glow filter */}
                            {colorTransitions.glowEffect && (
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation={colorTransitions.glowIntensity * 4} result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            )}
                        </defs>

                        {circles.map((c) => {
                            const labelY = c.cy + radius + 70;
                            const descStartY = labelY + 50;
                            const lineHeight = 28;
                            const fontSize =
                                viewportWidth >= 1536
                                    ? 18 + radius / 7
                                    : viewportWidth >= 1024
                                        ? 16 + radius / 9
                                        : 12;
                            const descriptionLines = splitDescription(c.description);

                            return (
                                <g key={c.id}>
                                    <circle
                                        cx={c.cx}
                                        cy={c.cy}
                                        r={radius}
                                        fill="transparent"
                                        stroke={c.color}
                                        strokeWidth="2"
                                    />
                                    <clipPath id={`clip-${c.id}`}>
                                        <circle cx={c.cx} cy={c.cy} r={radius} />
                                    </clipPath>
                                    <image
                                        href={c.img.src}
                                        x={c.cx - radius}
                                        y={c.cy - radius}
                                        width={radius * 2}
                                        height={radius * 2}
                                        preserveAspectRatio="xMidYMid slice"
                                        clipPath={`url(#clip-${c.id})`}
                                    />
                                    <rect
                                        x={c.cx - 220}
                                        y={labelY - 25}
                                        width="440"
                                        height="130"
                                        fill="rgba(0, 0, 0, 0.85)"
                                        rx="15"
                                    />
                                    <text
                                        x={c.cx}
                                        y={labelY}
                                        textAnchor="middle"
                                        fill={c.color}
                                        fontSize={fontSize * 1.7}
                                        fontWeight={400}
                                        style={{ fontFamily: "anta, sans-serif" }}
                                    >
                                        {c.label}
                                    </text>
                                    {descriptionLines.map((line, i) => (
                                        <text
                                            key={i}
                                            x={c.cx}
                                            y={descStartY + i * lineHeight}
                                            textAnchor="middle"
                                            fill="#FFFFFF"
                                            fontSize={fontSize * 0.65}
                                            fontWeight={400}
                                            style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
                                        >
                                            {line}
                                        </text>
                                    ))}
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <style>
                    {`
                `}
                </style>
            </section>
        </>
    );
}
