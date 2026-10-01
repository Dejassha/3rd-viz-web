"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { review } from "../data/clientsData";
import leftIcon from "@assets/svg/Polygon 1.png";
import BlurredEllipses from "@/src/components/BlurredEllipses";

const AUTO_INTERVAL_MS = 5000;

interface ReviewsProps {
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

export default function Reviews({ themeColor = "#A461FF" }: ReviewsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const goNext = useCallback(() => {
        setActiveIndex((i) => (i + 1) % review.length);
    }, []);

    const goPrev = useCallback(() => {
        setActiveIndex((i) => (i - 1 + review.length) % review.length);
    }, []);

    useEffect(() => {
        const id = setInterval(goNext, AUTO_INTERVAL_MS);
        return () => clearInterval(id);
    }, [goNext]);

    const active = review[activeIndex];

    return (
        <section className="w-full text-white py-16 lg:py-24 relative overflow-hidden">
            {/* Background UI Glows */}
            <BlurredEllipses
                ellipse1={{
                    right: "-10rem",
                    top: "2rem",
                    width: "35rem",
                    height: "22rem",
                    background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.35)} 0%, ${hexToRgba(themeColor, 0.08)} 100%)`,
                    blur: "9rem",
                    className: "opacity-40 pointer-events-none",
                }}
                ellipse2={{
                    left: "-10rem",
                    bottom: "2rem",
                    top: "auto",
                    width: "35rem",
                    height: "22rem",
                    background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.35)} 0%, ${hexToRgba(themeColor, 0.08)} 100%)`,
                    blur: "9rem",
                    className: "opacity-40 pointer-events-none",
                }}
            />
            <div className="w-full px-4 md:px-8 lg:px-[80px] relative z-10">

                {/* Section title matching Our Clients section alignment */}
                <h2 className="heading text-white border-b border-zinc-800 pb-4 tracking-tight">
                    What they say
                </h2>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 justify-between items-center py-8">

                    {/* Active Review Feedback and Details */}
                    <div className="max-w-4xl min-h-[160px] sm:min-h-[180px] lg:min-h-[220px] flex flex-col justify-center w-full">
                        <div
                            key={activeIndex}
                            className="animate-review-fade-in"
                            aria-live="polite"
                        >
                            <p className="text-[#A5A5A5] bodyText leading-relaxed">
                                {active.feedback}
                            </p>
                            <div className="mt-6">
                                <h4 className="font-anta text-xl font-semibold uppercase tracking-wider" style={{ color: themeColor }}>
                                    {active.name}
                                </h4>
                                <p className="font-poppins text-[#707070] text-sm sm:text-base mt-1">
                                    {active.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Controller Layout (Horizontal layout with arrows flanking profile) */}
                    <div className="flex flex-col items-center gap-4 lg:hidden w-full">
                        <div className="flex items-center justify-center gap-6">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="shrink-0 p-3 bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800/60 rounded-full transition-colors touch-manipulation"
                                aria-label="Previous review"
                            >
                                <Image
                                    src={leftIcon}
                                    alt="Previous"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-contain"
                                />
                            </button>

                            <div className="shrink-0 relative w-24 h-24 overflow-hidden rounded-full border shadow-xl bg-white" style={{ borderColor: hexToRgba(themeColor, 0.4) }}>
                                <Image
                                    src={active.profile}
                                    alt={active.name}
                                    fill
                                    className="object-contain p-3.5"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={goNext}
                                className="shrink-0 p-3 bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800/60 rounded-full transition-colors touch-manipulation"
                                aria-label="Next review"
                            >
                                <Image
                                    src={leftIcon}
                                    alt="Next"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-contain rotate-180"
                                />
                            </button>
                        </div>

                        {/* Dot Slide Indicators */}
                        <div className="flex gap-2.5 mt-2" role="tablist" aria-label="Review slides">
                            {review.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === activeIndex}
                                    aria-label={`Go to review ${i + 1}`}
                                    onClick={() => setActiveIndex(i)}
                                    className="w-2.5 h-2.5 rounded-full transition-all duration-300 touch-manipulation"
                                    style={{
                                        backgroundColor: i === activeIndex ? themeColor : "#3f3f46",
                                        transform: i === activeIndex ? "scale(1.1)" : "scale(1)"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop Controller Layout — left arrow follows the active profile */}
                    <div className="relative hidden lg:flex flex-row items-start gap-5 w-auto shrink-0">
                        {/* Prev button — moves vertically to align with the active profile */}
                        <div
                            className="shrink-0 transition-all duration-500 ease-in-out"
                            style={{
                                transform: (() => {
                                    // Each inactive avatar = 60px + 20px gap, active = 90px + 20px gap
                                    let offset = 0;
                                    for (let i = 0; i < activeIndex; i++) {
                                        offset += 60 + 20; // all items before active are inactive (60px)
                                    }
                                    // Center the button on the active avatar (active is 90px tall, button is ~46px)
                                    offset += (90 - 46) / 2;
                                    return `translateY(${offset}px)`;
                                })()
                            }}
                        >
                            <button
                                type="button"
                                onClick={goNext}
                                className="p-3 bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800/60 rounded-full transition-all hover:scale-105 touch-manipulation"
                                aria-label="Next review"
                            >
                                <Image
                                    src={leftIcon}
                                    alt="Play"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-contain"
                                />
                            </button>
                        </div>

                        <div className="flex flex-col gap-5 items-center">
                            {review.map((item, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveIndex(i)}
                                        className={`relative cursor-pointer transition-all duration-500 ease-in-out ${isActive
                                                ? "w-[90px] h-[90px] opacity-100 scale-100"
                                                : "w-[60px] h-[60px] opacity-50 scale-90 hover:opacity-80"
                                            } rounded-full overflow-hidden border border-white/10 shadow-2xl bg-white flex items-center justify-center`}
                                        style={isActive ? { boxShadow: `0 0 0 3px ${hexToRgba(themeColor, 0.6)}` } : undefined}
                                    >
                                        <Image
                                            src={item.profile}
                                            alt={item.name}
                                            fill
                                            className={`object-contain transition-all duration-500 ${isActive ? "p-3.5 grayscale-0" : "p-2.5 grayscale"
                                                }`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
