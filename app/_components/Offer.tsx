"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { offerItems } from "./data"
import { OfferIcon } from "./OfferIcon"

gsap.registerPlugin(ScrollTrigger)

function collectOfferSvgPaths(containers: HTMLElement[]) {
    const strokePaths: SVGPathElement[][] = containers.map(() => [])
    const fillPaths: SVGPathElement[][] = containers.map(() => [])

    containers.forEach((root, index) => {
        const svg = root.querySelector("svg")
        if (!svg) return
        svg.querySelectorAll("path").forEach((node) => {
            const el = node as SVGPathElement
            const fill = el.getAttribute("fill")
            const stroke = el.getAttribute("stroke")
            const hasFill = Boolean(fill && fill !== "none")
            const hasStroke = Boolean(stroke && stroke !== "none")

            if (hasFill && !hasStroke) {
                fillPaths[index].push(el)
                return
            }
            if (hasStroke) {
                const len = el.getTotalLength()
                if (len < 0.5) return
                el.style.strokeDasharray = String(len)
                el.style.strokeDashoffset = String(len)
                strokePaths[index].push(el)
            }
        })
    })

    return { strokePaths, fillPaths }
}

// export default function Offer() {
//     const sectionRef = useRef<HTMLElement>(null)
//     const textSlidesRef = useRef<(HTMLDivElement | null)[]>([])
//     const iconsRef = useRef<(HTMLDivElement | null)[]>([])
//     const iconWrapRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const section = sectionRef.current
//         const iconWrap = iconWrapRef.current
//         if (!section || !iconWrap) return

//         const textSlides = textSlidesRef.current.filter(Boolean) as HTMLDivElement[]
//         const icons = iconsRef.current.filter(Boolean) as HTMLDivElement[]
//         const n = offerItems.length
//         if (textSlides.length !== n || icons.length !== n) return

//         const { strokePaths, fillPaths } = collectOfferSvgPaths(icons)
//         fillPaths.forEach((paths) => {
//             if (paths.length) gsap.set(paths, { opacity: 0 })
//         })

//         let pinTrigger: ScrollTrigger | null = null
//         let tl: gsap.core.Timeline | null = null

//         const mm = gsap.matchMedia()
//         mm.add(
//             {
//                 mobile: "(max-width: 767px)",
//                 tablet: "(min-width: 768px) and (max-width: 1023px)",
//                 desktop: "(min-width: 1024px)",
//             },
//             (context) => {
//                 const isMobile = context.conditions?.mobile
//                 const isDesktop = context.conditions?.desktop
//                 const end = isMobile ? "+=250%" : isDesktop ? "+=350%" : "+=280%"
//                 const scrub = isMobile ? 1 : 1.6

//                 pinTrigger = ScrollTrigger.create({
//                     trigger: section,
//                     start: "top top",
//                     end,
//                     pin: true,
//                     pinSpacing: true,
                   
//                 })

//                 tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: section,
//                         start: "top top",
//                         end,
//                         scrub,
//                     },
//                 })

//                 gsap.set(icons, { rotationY: -90, autoAlpha: 0 })
//                 gsap.set(iconWrap, { perspective: 800 })
//                 gsap.set(textSlides, { autoAlpha: 0, y: 28 })
//                 gsap.set(textSlides[0], { autoAlpha: 1, y: 0 })
//                 gsap.set(icons[0], { rotationY: 0, autoAlpha: 1 })

//                 const s0 = strokePaths[0]
//                 if (s0.length) {
//                     tl!.to(s0, {
//                         strokeDashoffset: 0,
//                         duration: 0.48,
//                         stagger: 0.07,
//                         ease: "power2.out",
//                     })
//                 }

//                 for (let i = 0; i < n - 1; i++) {
//                     const strokesOut = strokePaths[i]
//                     const fillsOut = fillPaths[i]
//                     const strokesIn = strokePaths[i + 1]
//                     const fillsIn = fillPaths[i + 1]

//                     tl!.to([icons[i]], {
//                         rotationY: -90,
//                         autoAlpha: 0,
//                         duration: 0.5,
//                         ease: "power2.in",
//                     }, ">")

//                     if (strokesOut.length) {
//                         tl!.to(
//                             strokesOut,
//                             {
//                                 strokeDashoffset: (j, el) =>
//                                     (el as SVGPathElement).getTotalLength(),
//                                 duration: 0.36,
//                                 stagger: { each: 0.04, from: "end" },
//                                 ease: "power2.in",
//                             },
//                             "<"
//                         )
//                     }
//                     if (fillsOut.length) {
//                         tl!.to(
//                             fillsOut,
//                             {
//                                 opacity: 0,
//                                 duration: 0.3,
//                                 stagger: { each: 0.035, from: "end" },
//                                 ease: "power2.in",
//                             },
//                             "<"
//                         )
//                     }

//                     tl!.to([textSlides[i]], {
//                         autoAlpha: 0,
//                         y: -24,
//                         duration: 0.45,
//                         ease: "power2.in",
//                     }, "-=0.5")
//                     tl!.to({}, { duration: 0.08 })

//                     tl!.fromTo(
//                         [icons[i + 1]],
//                         { rotationY: 90, autoAlpha: 0 },
//                         {
//                             rotationY: 0,
//                             autoAlpha: 1,
//                             duration: 0.6,
//                             ease: "power2.out",
//                         }
//                     )

//                     if (fillsIn.length) {
//                         tl!.fromTo(
//                             fillsIn,
//                             { opacity: 0 },
//                             {
//                                 opacity: 1,
//                                 duration: 0.32,
//                                 stagger: 0.045,
//                                 ease: "power2.out",
//                             },
//                             "-=0.5"
//                         )
//                     }
//                     if (strokesIn.length) {
//                         tl!.to(
//                             strokesIn,
//                             {
//                                 strokeDashoffset: 0,
//                                 duration: 0.52,
//                                 stagger: 0.07,
//                                 ease: "power2.out",
//                             },
//                             "-=0.5"
//                         )
//                     }

//                     tl!.fromTo(
//                         [textSlides[i + 1]],
//                         { autoAlpha: 0, y: 24 },
//                         {
//                             autoAlpha: 1,
//                             y: 0,
//                             duration: 0.55,
//                             ease: "power2.out",
//                         },
//                         "-=0.5"
//                     )
//                 }

//                 return () => {
//                     pinTrigger?.kill()
//                     tl?.scrollTrigger?.kill()
//                     tl?.kill()
//                 }
//             }
//         )

//         return () => mm.revert()
//     }, [])

//     return (
//         <section
//             ref={sectionRef}
//             // className="min-h-screen sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center w-full bg-inherit"
//              className="h-auto min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center w-full bg-inherit"
//         >
//             <div className="container px-4 py-6 sm:py-14 md:py-16 flex flex-col justify-center  items-center lg:items-stretch gap-4 sm:gap-6 lg:gap-6">
//                 <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-2xl lg:max-w-none">
//                     <h3 className="heading text-white text-3xl lg:text-6xl text-center lg:text-left">
//                         What We Offer
//                     </h3>
//                 </div>
// {/* 
//                 <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-10 justify-center lg:justify-between items-center w-full max-w-2xl lg:max-w-none lg:w-full flex-1 min-h-0">
              
//                     <div
//                         ref={iconWrapRef}
//                         className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 shrink-0 flex items-center justify-center mx-auto order-2 lg:order-1 lg:mx-0"
//                         style={{ perspective: 800 }}
//                     >
//                         {offerItems.map((item, i) => (
//                             <div
//                                 key={i}
//                                 ref={(el) => { iconsRef.current[i] = el }}
//                                 className="absolute inset-0 flex items-center justify-center opacity-0"
//                                 style={{ backfaceVisibility: "hidden" }}
//                                 aria-hidden={i > 0}
//                             >
//                                 <OfferIcon index={i} className="h-full w-full" />
//                             </div>
//                         ))}
//                     </div>
//                     <div className="relative flex-1 min-w-0 h-[300px] sm:h-[350px] md:h-[400px] w-full max-w-2xl  order-1 lg:order-2 text-center lg:text-left flex  flex-col justify-center overflow-hidden">
//                         {offerItems.map((item, i) => (
//                             <div
//                                 key={i}
//                                 ref={(el) => { textSlidesRef.current[i] = el }}
//                                 className={`absolute inset-0 flex flex-col gap-3 sm:gap-6 items-center lg:items-start justify-center ${i === 0 ? "" : "opacity-0 invisible"}`}
//                                 aria-hidden={i > 0}
//                             >
//                                 <h4 className="subHeading text-white">
//                                     {item.title}
//                                 </h4>
//                                 <p className="bodyText text-tertiary leading-relaxed text-center lg:text-left">
//                                     {item.description}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div> */}

//                 // Replace the inner flex container and both child divs:

// <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-10 justify-center lg:justify-between items-center w-full max-w-2xl lg:max-w-none lg:w-full flex-1 min-h-0">

//     {/* Icon — top on mobile, left on desktop */}
//     <div
//         ref={iconWrapRef}
//         className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 shrink-0 flex items-center justify-center mx-auto lg:mx-0"
//         style={{ perspective: 800 }}
//     >
//         {offerItems.map((item, i) => (
//             <div
//                 key={i}
//                 ref={(el) => { iconsRef.current[i] = el }}
//                 className="absolute inset-0 flex items-center justify-center opacity-0"
//                 style={{ backfaceVisibility: "hidden" }}
//                 aria-hidden={i > 0}
//             >
//                 <OfferIcon index={i} className="h-full w-full" />
//             </div>
//         ))}
//     </div>

//     {/* Text slides — below icon on mobile, right on desktop */}
//     <div className="relative flex-1 min-w-0 w-full max-w-2xl text-center lg:text-left"
//          style={{ minHeight: "260px" }}>
//         {offerItems.map((item, i) => (
//             <div
//                 key={i}
//                 ref={(el) => { textSlidesRef.current[i] = el }}
//                 className={`absolute inset-0 flex flex-col gap-3 sm:gap-6 items-center lg:items-start justify-center ${i === 0 ? "" : "opacity-0 invisible"}`}
//                 aria-hidden={i > 0}
//             >
//                 <h4 className="subHeading text-white">
//                     {item.title}
//                 </h4>
//                 <p className="bodyText text-tertiary leading-relaxed text-center lg:text-left">
//                     {item.description}
//                 </p>
//             </div>
//         ))}
//     </div>
// </div>
//             </div>
//         </section>
//     )
// }
export default function Offer() {
    const sectionRef = useRef<HTMLElement>(null)
    const textSlidesRef = useRef<(HTMLDivElement | null)[]>([])
    const iconsRef = useRef<(HTMLDivElement | null)[]>([])
    const iconWrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const iconWrap = iconWrapRef.current
        if (!section || !iconWrap) return

        const textSlides = textSlidesRef.current.filter(Boolean) as HTMLDivElement[]
        const icons = iconsRef.current.filter(Boolean) as HTMLDivElement[]
        const n = offerItems.length
        if (textSlides.length !== n || icons.length !== n) return

        const { strokePaths, fillPaths } = collectOfferSvgPaths(icons)
        fillPaths.forEach((paths) => {
            if (paths.length) gsap.set(paths, { opacity: 0 })
        })

        const mm = gsap.matchMedia()
        mm.add(
            {
                mobile: "(max-width: 1023px)",   // ← mobile+tablet both skip pin
                desktop: "(min-width: 1024px)",
            },
            (context) => {
                const isMobile = context.conditions?.mobile

                if (isMobile) {
                    // ── MOBILE: reset everything, show all slides stacked ──
                    gsap.set(icons, { rotationY: 0, autoAlpha: 1 })
                    gsap.set(textSlides, { autoAlpha: 1, y: 0 })
                    fillPaths.forEach((paths) => {
                        if (paths.length) gsap.set(paths, { opacity: 1 })
                    })
                    strokePaths.forEach((paths) => {
                        paths.forEach((el) => {
                            el.style.strokeDashoffset = "0"
                        })
                    })
                    return
                }

                // ── DESKTOP only: pin + scroll animation ──
                const end = "+=350%"
                const scrub = 1.6

                const pinTrigger = ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end,
                    pin: true,
                    pinSpacing: true,
                })

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end,
                        scrub,
                    },
                })

                gsap.set(icons, { rotationY: -90, autoAlpha: 0 })
                gsap.set(iconWrap, { perspective: 800 })
                gsap.set(textSlides, { autoAlpha: 0, y: 28 })
                gsap.set(textSlides[0], { autoAlpha: 1, y: 0 })
                gsap.set(icons[0], { rotationY: 0, autoAlpha: 1 })

                const s0 = strokePaths[0]
                if (s0.length) {
                    tl.to(s0, {
                        strokeDashoffset: 0,
                        duration: 0.48,
                        stagger: 0.07,
                        ease: "power2.out",
                    })
                }

                for (let i = 0; i < n - 1; i++) {
                    const strokesOut = strokePaths[i]
                    const fillsOut = fillPaths[i]
                    const strokesIn = strokePaths[i + 1]
                    const fillsIn = fillPaths[i + 1]

                    tl.to([icons[i]], { rotationY: -90, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, ">")

                    if (strokesOut.length) {
                        tl.to(strokesOut, {
                            strokeDashoffset: (j, el) => (el as SVGPathElement).getTotalLength(),
                            duration: 0.36, stagger: { each: 0.04, from: "end" }, ease: "power2.in",
                        }, "<")
                    }
                    if (fillsOut.length) {
                        tl.to(fillsOut, { opacity: 0, duration: 0.3, stagger: { each: 0.035, from: "end" }, ease: "power2.in" }, "<")
                    }

                    tl.to([textSlides[i]], { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, "-=0.5")
                    tl.to({}, { duration: 0.08 })

                    tl.fromTo([icons[i + 1]],
                        { rotationY: 90, autoAlpha: 0 },
                        { rotationY: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }
                    )

                    if (fillsIn.length) {
                        tl.fromTo(fillsIn, { opacity: 0 }, { opacity: 1, duration: 0.32, stagger: 0.045, ease: "power2.out" }, "-=0.5")
                    }
                    if (strokesIn.length) {
                        tl.to(strokesIn, { strokeDashoffset: 0, duration: 0.52, stagger: 0.07, ease: "power2.out" }, "-=0.5")
                    }

                    tl.fromTo([textSlides[i + 1]],
                        { autoAlpha: 0, y: 24 },
                        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
                        "-=0.5"
                    )
                }

                return () => {
                    pinTrigger.kill()
                    tl.scrollTrigger?.kill()
                    tl.kill()
                }
            }
        )

        return () => mm.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="flex items-start lg:items-center justify-center w-full bg-inherit 
                       py-10 lg:min-h-screen"
        >
            <div className="container px-4 flex flex-col gap-6 lg:gap-6">
                
                {/* Heading */}
                <h3 className="heading text-white text-3xl lg:text-6xl text-center lg:text-left">
                    What We Offer
                </h3>

                {/* Mobile/Tablet: stacked cards, Desktop: animated side-by-side */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 lg:items-center lg:justify-between w-full">

                    {/* ── MOBILE: show all items as stacked cards ── */}
                    <div className="flex flex-col gap-8 lg:hidden w-full">
                        {offerItems.map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 text-center">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                                    <OfferIcon index={i} className="h-full w-full" />
                                </div>
                                <h4 className="subHeading text-white">{item.title}</h4>
                                <p className="bodyText text-tertiary leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── DESKTOP: GSAP animated icon ── */}
                    <div
                        ref={iconWrapRef}
                        className="hidden lg:flex relative w-64 h-64 shrink-0 items-center justify-center"
                        style={{ perspective: 800 }}
                    >
                        {offerItems.map((item, i) => (
                            <div
                                key={i}
                                ref={(el) => { iconsRef.current[i] = el }}
                                className="absolute inset-0 flex items-center justify-center opacity-0"
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <OfferIcon index={i} className="h-full w-full" />
                            </div>
                        ))}
                    </div>

                    {/* ── DESKTOP: GSAP animated text ── */}
                    <div className="hidden lg:flex relative flex-1 min-w-0 h-[400px] text-left">
                        {offerItems.map((item, i) => (
                            <div
                                key={i}
                                ref={(el) => { textSlidesRef.current[i] = el }}
                                className={`absolute inset-0 flex flex-col gap-6 items-start justify-center ${i === 0 ? "" : "opacity-0 invisible"}`}
                            >
                                <h4 className="subHeading text-white">{item.title}</h4>
                                <p className="bodyText text-tertiary leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}