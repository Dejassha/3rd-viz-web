// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { circles, svgWidth, colorTransitions } from "../data";
// import { buildPath, splitDescription } from "../process/utils/processUtils"

// gsap.registerPlugin(ScrollTrigger);

// interface Props {
//     containerRef: React.RefObject<HTMLElement | null>;
//     radius: number;
//     viewportWidth: number;
// }

// export default function DesktopProcess({ containerRef, radius, viewportWidth }: Props) {
//     const svgRef = useRef<SVGSVGElement | null>(null);
//     const pathRef = useRef<SVGPathElement | null>(null);

//     // useEffect(() => {
//     //     const section = containerRef.current;
//     //     const svg = svgRef.current;
//     //     const path = pathRef.current;

//     //     if (!section || !svg || !path) return;

//     //     const totalLength = path.getTotalLength();

//     //     gsap.set(path, {
//     //         strokeDasharray: totalLength,
//     //         strokeDashoffset: totalLength,
//     //     });

//     //     const scrollTween = gsap.to(svg, {
//     //         x: () => -(svg.scrollWidth - window.innerWidth),
//     //         ease: "none",
//     //         scrollTrigger: {
//     //             trigger: section,
//     //             start: "top top",
//     //             end: () => `+=${svg.scrollWidth}`,
//     //             scrub: 1,
//     //             pin: true,
//     //         },
//     //     });

//     //     const pathAnimation = gsap.to(path, {
//     //         strokeDashoffset: 0,
//     //         ease: "none",
//     //         scrollTrigger: {
//     //             trigger: section,
//     //             start: "top top",
//     //             end: () => `+=${svg.scrollWidth}`,
//     //             scrub: 1,
//     //         },
//     //     });

//     //     const colorAnimation = gsap.to({}, {
//     //         scrollTrigger: {
//     //             trigger: section,
//     //             start: "top top",
//     //             end: () => `+=${svg.scrollWidth}`,
//     //             scrub: 0.1,
//     //             onUpdate: (self) => {
//     //                 const progress = self.progress;
//     //                 const currentColor = getCurrentColor(progress);

//     //                 if (path) {
//     //                     path.style.stroke = currentColor;
//     //                 }
//     //             },
//     //         },
//     //     });

//     //     return () => {
//     //         scrollTween.kill();
//     //         pathAnimation.kill();
//     //         colorAnimation.kill();
//     //     };
//     // }, [containerRef]);
// // Fix 1: start: "top+=0 center" — section center-ல வரும்போது start
// // Fix 2: path initial stroke-ஐ "none" → useEffect-ல set பண்ணு

// useEffect(() => {
//     const section = containerRef.current;
//     const svg = svgRef.current;
//     const path = pathRef.current;

//     if (!section || !svg || !path) return;

//     const totalLength = path.getTotalLength();

//     // ✅ Fix 2: Initial stroke JS-லயே set பண்ணு, attribute-ல வேண்டாம்
//     const initialColor = getCurrentColor(0);
//     path.style.stroke = initialColor;

//     gsap.set(path, {
//         strokeDasharray: totalLength,
//         strokeDashoffset: totalLength,
//     });

//     // ✅ Fix 1: start → section top viewport center-ல வரும்போது
//     const triggerConfig = {
//         trigger: section,
//         start: "top center",   // <-- இது section enter ஆன பிறகு மட்டும் start
//         end: () => `+=${svg.scrollWidth}`,
//         scrub: 1,
//         pin: true,
//     };

//     const scrollTween = gsap.to(svg, {
//         x: () => -(svg.scrollWidth - window.innerWidth),
//         ease: "none",
//         scrollTrigger: {
//             ...triggerConfig,
//         },
//     });

//     const pathAnimation = gsap.to(path, {
//         strokeDashoffset: 0,
//         ease: "none",
//         scrollTrigger: {
//             trigger: section,
//             start: "top center",
//             end: () => `+=${svg.scrollWidth}`,
//             scrub: 1,
//         },
//     });

//     const colorAnimation = gsap.to({}, {
//         scrollTrigger: {
//             trigger: section,
//             start: "top center",
//             end: () => `+=${svg.scrollWidth}`,
//             scrub: 0.1,
//             onUpdate: (self) => {
//                 const progress = self.progress;
//                 const currentColor = getCurrentColor(progress);
//                 if (path) {
//                     path.style.stroke = currentColor;
//                 }
//             },
//         },
//     });

//     return () => {
//         scrollTween.kill();
//         pathAnimation.kill();
//         colorAnimation.kill();
//     };
// }, [containerRef]);

//     const getCurrentColor = (progress: number): string => {
//         if (colorTransitions.useSingleColor) {
//             return colorTransitions.singleColor;
//         }

//         const currentTransition = colorTransitions.transitions.find(
//             (transition) =>
//                 progress >= transition.startProgress &&
//                 progress <= transition.endProgress
//         );

//         return (
//             currentTransition?.color ??
//             colorTransitions.transitions[0]?.color
//         );
//     };

//     // Function to create gradient stops for precise color transitions
//     const getPreciseGradientStops = () => {
//         if (colorTransitions.useSingleColor) {
//             return [
//                 <stop key="single-start" offset="0%" stopColor={colorTransitions.singleColor} />,
//                 <stop key="single-end" offset="100%" stopColor={colorTransitions.singleColor} />
//             ];
//         }

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const gradientStops: any[] = [];


//         colorTransitions.transitions.forEach((transition, index) => {
//             gradientStops.push(
//                 <stop
//                     key={`start-${index}`}
//                     offset={`${transition.startProgress * 100}%`}
//                     stopColor={transition.color}
//                 />,
//                 <stop
//                     key={`end-${index}`}
//                     offset={`${transition.endProgress * 100}%`}
//                     stopColor={transition.color}
//                 />
//             );
//         });

//         return gradientStops;
//     };

//     return (
//         <div className="relative shrink-0 w-full z-10 overflow-hidden -mt-20">
//             <svg
//                 ref={svgRef}
//                 viewBox={`0 0 ${svgWidth} 600`}
//                 className="w-1500 h-full"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 preserveAspectRatio="xMidYMid meet"
//             >
//                 {/* Background path */}
//                 <path
//                     d={buildPath}
//                     stroke="rgba(255, 255, 255, 0.05)"
//                     strokeWidth="3"
//                     fill="none"
//                     strokeLinecap="round"
//                 />

//                 {/* Main animated path with precise color control */}
//                 <path
//                     ref={pathRef}
//                     d={buildPath}
//                     stroke={colorTransitions.useSingleColor ? colorTransitions.singleColor : "currentColor"}
//                     strokeWidth={colorTransitions.strokeWidth}
//                     strokeLinecap="round"
//                     fill="none"
//                     strokeOpacity={colorTransitions.strokeOpacity}
//                 />

//                 <defs>
//                     {/* Gradient definition (backup for gradient mode) */}
//                     <linearGradient id="gradientGlow" x1="0" y1="0" x2="1" y2="0">
//                         {getPreciseGradientStops()}
//                     </linearGradient>

//                     {/* Glow filter */}
//                     {colorTransitions.glowEffect && (
//                         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                             <feGaussianBlur stdDeviation={colorTransitions.glowIntensity * 4} result="coloredBlur" />
//                             <feMerge>
//                                 <feMergeNode in="coloredBlur" />
//                                 <feMergeNode in="SourceGraphic" />
//                             </feMerge>
//                         </filter>
//                     )}
//                 </defs>

//                 {circles.map((c) => {
//                     const labelY = c.cy + radius + 70;
//                     const descStartY = labelY + 50;
//                     const lineHeight = 28;
//                     const fontSize =
//                         viewportWidth >= 1536
//                             ? 18 + radius / 7
//                             : viewportWidth >= 1024
//                                 ? 16 + radius / 9
//                                 : viewportWidth <= 1020
//                                     ? 16 + radius / 9
//                                     : 8;
//                     const descriptionLines = splitDescription(c.description);

//                     return (
//                         <g key={c.id}>
//                             <circle
//                                 cx={c.cx}
//                                 cy={c.cy}
//                                 r={radius}
//                                 fill="transparent"
//                                 stroke={c.color}
//                                 strokeWidth="2"
//                             />
//                             <clipPath id={`clip-${c.id}`}>
//                                 <circle cx={c.cx} cy={c.cy} r={radius} />
//                             </clipPath>
//                             <image
//                                 href={c.img.src}
//                                 x={c.cx - radius}
//                                 y={c.cy - radius}
//                                 width={radius * 2}
//                                 height={radius * 2}
//                                 preserveAspectRatio="xMidYMid slice"
//                                 clipPath={`url(#clip-${c.id})`}
//                             />
//                             <rect
//                                 x={c.cx - 220}
//                                 y={labelY - 25}
//                                 width="440"
//                                 height="130"
//                                 // fill="rgba(0, 0, 0, 0.85)"
//                                 rx="15"
//                             />
//                             <text
//                                 x={c.cx}
//                                 y={labelY}
//                                 textAnchor="middle"
//                                 fill={c.color}
//                                 className="heading"
//                             >
//                                 {c.label}
//                             </text>
//                             {descriptionLines.map((line, i) => (
//                                 <text
//                                     key={i}
//                                     x={c.cx}
//                                     y={descStartY + i * lineHeight}
//                                     textAnchor="middle"
//                                     fill="#FFFFFF"
//                                     style={{
//                                         fontSize: "20"
//                                     }}
//                                     className="subHeading"
//                                 >
//                                     {line}
//                                 </text>
//                             ))}
//                         </g>
//                     );
//                 })}
//             </svg>
//         </div>
//     );
// }

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { circles, svgWidth, colorTransitions } from "../data";
import { buildPath, splitDescription } from "../process/utils/processUtils"

gsap.registerPlugin(ScrollTrigger);

interface Props {
    containerRef: React.RefObject<HTMLElement | null>;
    radius: number;
    viewportWidth: number;
}

export default function DesktopProcess({ containerRef, radius, viewportWidth }: Props) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const nodeRefs = useRef<(SVGGElement | null)[]>([]);

    useEffect(() => {
        const section = containerRef.current;
        const svg = svgRef.current;
        const path = pathRef.current;

        if (!section || !svg || !path) return;

        const totalLength = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength,
        });

        const cx1 = circles[0]?.cx || 0;
        const lastCx = circles[circles.length - 1]?.cx || svgWidth;
        const scale = () => (svg.getBoundingClientRect().width || svg.scrollWidth || 6500) / svgWidth;
        const startX = () => (window.innerWidth / 2) - (cx1 * scale());
        const endX = () => (window.innerWidth / 2) - (lastCx * scale());
        const scrollDistance = () => Math.abs(startX() - endX());

        const scrollTween = gsap.fromTo(
            svg,
            { x: startX },
            {
                x: endX,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${scrollDistance()}`,
                    scrub: 1,
                    pin: true,
                },
            }
        );

        const pathAnimation = gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollDistance()}`,
                scrub: 1,
            },
        });

        const colorAnimation = gsap.to({}, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollDistance()}`,
                scrub: 0.1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const currentColor = getCurrentColor(progress);

                    if (path) {
                        path.style.stroke = currentColor;
                    }
                },
            },
        });

        return () => {
            scrollTween.kill();
            pathAnimation.kill();
            colorAnimation.kill();
        };
    }, [containerRef]);

    const getCurrentColor = (progress: number): string => {
        if (colorTransitions.useSingleColor) {
            return colorTransitions.singleColor;
        }

        const currentTransition = colorTransitions.transitions.find(
            (transition) =>
                progress >= transition.startProgress &&
                progress <= transition.endProgress
        );

        return (
            currentTransition?.color ??
            colorTransitions.transitions[0]?.color
        );
    };

    // Function to create gradient stops for precise color transitions
    const getPreciseGradientStops = () => {
        if (colorTransitions.useSingleColor) {
            return [
                <stop key="single-start" offset="0%" stopColor={colorTransitions.singleColor} />,
                <stop key="single-end" offset="100%" stopColor={colorTransitions.singleColor} />
            ];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    return (
        <div className="relative shrink-0 w-full z-10 overflow-hidden">
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
                    d={buildPath}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Main animated path with precise color control */}
                <path
                    ref={pathRef}
                    d={buildPath}
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

                {circles.map((c, idx) => {
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
                        <g 
                            key={c.id}
                            ref={(el) => { nodeRefs.current[idx] = el; }}
                            style={{
                                transformOrigin: `${c.cx}px ${c.cy}px`
                            }}
                        >
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
                                // fill="rgba(0, 0, 0, 0.85)"
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
    );
}