"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { avatharIcons, metricsData } from "./data"
import type { MetricItem } from "./data"
import { arrowIcon, starIcon } from "@/src/assets/svg/iconExport"

gsap.registerPlugin(ScrollTrigger)

const NUMERIC_VALUES = [50, 12, 20, 4.5];

interface MetricCardProps {
    item: MetricItem
    cardRef?: React.Ref<HTMLDivElement | null>
    numberRef?: React.Ref<HTMLSpanElement | null>
    /** Gradient for simple cards: first = pink/magenta, second = gold/orange */
    gradientVariant?: "pink" | "gold"
}

function MetricCard({ item, cardRef, numberRef, gradientVariant = "pink" }: MetricCardProps) {
    const [isClicked, setIsClicked] = useState(false);

    if (item.type === "simple") {
        const bottomColor = gradientVariant === "gold" ? "#FDB928" : "#CB1A8C"
        const fogRgb = gradientVariant === "gold" ? "253, 185, 40" : "203, 26, 140"
        const hoverClasses = gradientVariant === "gold"
            ? "group-hover:shadow-[0_0_35px_rgba(253,185,40,0.35)] group-hover:border-[#FDB928]/50"
            : "group-hover:shadow-[0_0_35px_rgba(203,26,140,0.35)] group-hover:border-[#CB1A8C]/50"
        
        const defaultGradient = `linear-gradient(180deg, rgba(5, 5, 5, 0) 0%, ${bottomColor} 100%)`
        const mergedGradient = gradientVariant === "gold"
            ? "linear-gradient(180deg, #2A1D03 0%, #835406 48%, #FDB928 100%)"
            : "linear-gradient(180deg, #28041C 0%, #6E094B 48%, #CB1A8C 100%)"

        return (
            <div
                ref={cardRef}
                onClick={() => setIsClicked(!isClicked)}
                className={`metric-card group relative overflow-hidden h-full flex flex-col justify-between space-y-4 w-full min-w-0 border border-[#1B1B1B] rounded-2xl p-4 sm:p-6 lg:py-11 text-white opacity-0 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${hoverClasses}`}
                style={
                    isClicked
                        ? { background: mergedGradient }
                        : {
                            background: defaultGradient,
                            backgroundSize: "100% 130px",
                            backgroundPosition: "bottom",
                            backgroundRepeat: "no-repeat",
                        }
                }
            >
                {/* Fog Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 overflow-hidden rounded-2xl">
                    <div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[140%] h-[130%] rounded-full blur-2xl transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                            background: `radial-gradient(circle, rgba(${fogRgb}, 0.5) 0%, rgba(${fogRgb}, 0.2) 45%, transparent 75%)`
                        }}
                    />
                </div>

                <h6 className="bodyText max-w-2xs relative z-10">{item.description}</h6>
                <p className="text-5xl lg:text-6xl font-outfit mt-4 flex items-baseline relative z-10">
                    <span ref={numberRef}>0</span><span className="text-tertiary text-3xl lg:text-5xl ml-[2px]">{item.suffix}</span>
                </p>
            </div>
        )
    }

    if (item.type === "clients") {
        const edgeGlow = "linear-gradient(90deg, #3EA9C1 0%, rgba(62, 169, 193, 0) 100%)"
        const edgeGlowRight = "linear-gradient(270deg, #3EA9C1 0%, rgba(62, 169, 193, 0) 100%)"
        const fogRgb = "62, 169, 193"
        return (
            <div
                ref={cardRef}
                className="metric-card group relative overflow-hidden flex flex-wrap items-center gap-4 sm:gap-6 border border-[#1B1B1B] group-hover:border-[#3EA9C1]/50 rounded-2xl p-4 sm:p-6 text-white opacity-0 transition-all duration-500 hover:-translate-y-1.5 group-hover:shadow-[0_0_35px_rgba(62,169,193,0.35)]"
                style={{
                    backgroundImage: `${edgeGlow}, ${edgeGlowRight}`,
                    backgroundSize: "24px 100%, 24px 100%",
                    backgroundPosition: "left top, right top",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Fog Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 overflow-hidden rounded-2xl">
                    <div
                        className="absolute inset-0 w-full h-full rounded-2xl blur-2xl transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(${fogRgb}, 0.45) 0%, rgba(${fogRgb}, 0.15) 50%, transparent 80%)`
                        }}
                    />
                </div>

                <div className="flex items-center -space-x-3 sm:-space-x-4 relative z-10">
                    {avatharIcons.map((icon, index) => (
                        <div
                            key={index}
                            className="relative flex shrink-0 rounded-full overflow-hidden w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                        >
                            <Image
                                src={icon}
                                alt="Client"
                                fill
                                className="object-cover"
                                sizes="(max-width:640px) 40px, (max-width:768px) 48px, 56px, 64px"
                            />
                        </div>
                    ))}
                </div>
                <p className="font-medium flex items-baseline flex-wrap relative z-10">
                    <span className="text-4xl font-outfit">
                        <span ref={numberRef}>0</span>
                    </span>
                    <span className="text-tertiary text-3xl ml-[2px]">{item.suffix}</span>
                    <span className="text-white/90 ml-2 bodyText pb-1">{item.label}</span>
                </p>
            </div>
        )
    }

    if (item.type === "satisfaction") {
        return (
            <div
                ref={cardRef}
                className="metric-card group relative overflow-hidden h-full bg-white p-4 sm:p-6 rounded-2xl flex flex-col justify-between opacity-0 transition-all duration-500 hover:-translate-y-1.5 group-hover:shadow-[0_0_35px_rgba(62,169,193,0.35)]"
            >
                {/* Fog Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 overflow-hidden rounded-2xl">
                    <div
                        className="absolute inset-0 w-full h-full rounded-2xl blur-2xl transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                            background: `radial-gradient(circle at 50% 80%, rgba(62, 169, 193, 0.35) 0%, rgba(203, 26, 140, 0.15) 50%, transparent 80%)`
                        }}
                    />
                </div>

                <div className="absolute left-0 bottom-0 z-10 [&_svg]:w-auto [&_svg]:h-auto">
                    {arrowIcon}
                </div>
                <h6 className="bodyText max-w-md pr-4 relative z-10">{item.description}</h6>
                <div className="relative z-10">
                    <p className="text-5xl lg:text-6xl font-outfit">
                        <span ref={numberRef}>0</span><span className="text-tertiary text-3xl lg:text-5xl">{item.suffix}</span>
                    </p>
                    <div className="flex gap-0.5 items-center [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6 mt-1">
                        {item.stars.map((fill, i) => (
                            <span
                                key={i}
                                className={
                                    fill < 1
                                        ? "inline-block w-3 overflow-hidden shrink-0"
                                        : "inline-block shrink-0"
                                }
                            >
                                {starIcon}
                            </span>
                        ))}
                    </div>
                    <p className="bodyText mt-1">{item.subtitle}</p>
                </div>
            </div>
        )
    }

    return null
}

function Metrics() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const section = sectionRef.current
        const cards = cardRefs.current
        const numbers = numberRefs.current
        if (!section) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 95%",
                end: "top 50%",
                toggleActions: "play none none none",
            },
        })

        tl.fromTo(
            cards.filter(Boolean),
            { opacity: 0, y: 28 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.22,
                ease: "power2.out",
                overwrite: "auto",
            }
        )


        const countDuration = 1.6
        const countEase = "power2.out"

        NUMERIC_VALUES.forEach((endValue, i) => {
            const obj = { value: 0 }
            tl.to(
                obj,
                {
                    value: endValue,
                    duration: countDuration,
                    ease: countEase,
                    onUpdate: () => {
                        const el = numbers[i]
                        if (!el) return
                        el.textContent =
                            i === 3 ? obj.value.toFixed(1) : Math.round(obj.value).toString()
                    },
                },
                i === 0 ? ">" : "<"
            )
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    const leftCard = metricsData[0]
    const middleCards = metricsData.slice(1, 3)
    const rightCard = metricsData[3]

    return (
        <div ref={sectionRef} className="pt-10 sm:pt-14 pb-2 sm:pb-4 flex flex-col gap-8 justify-center w-full px-4 md:px-8 lg:px-[80px]">
            <h3 className="text-white heading max-w-md">Metrics of our work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                <div className="flex flex-col min-w-0 h-full">
                    <MetricCard
                        item={leftCard}
                        gradientVariant="pink"
                        cardRef={(el) => { cardRefs.current[0] = el }}
                        numberRef={(el) => { numberRefs.current[0] = el }}
                    />
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 min-w-0">
                    {middleCards.map((item, index) => (
                        <div key={index} className="flex flex-col min-w-0">
                            <MetricCard
                                item={item}
                                gradientVariant={index === 0 ? "gold" : undefined}
                                cardRef={(el) => { cardRefs.current[index + 1] = el }}
                                numberRef={(el) => { numberRefs.current[index + 1] = el }}
                            />
                        </div>
                    ))}
                </div>

                <div className="md:col-span-2 lg:col-span-1 flex flex-col min-w-0 h-full">
                    <MetricCard
                        item={rightCard}
                        cardRef={(el) => { cardRefs.current[3] = el }}
                        numberRef={(el) => { numberRefs.current[3] = el }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Metrics
