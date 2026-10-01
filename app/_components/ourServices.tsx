"use client";

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';
import Image from 'next/image'
import Button from '@/src/components/Button'
import { Icon } from '@iconify/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const getYoutubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
  }
  return null;
};

export interface ServiceCardItem {
    title: string;
    slug: string;
    video: string;
}

const SERVICES_DATA = [
    {
        title: "Data & Cloud",
        slug: "data-and-cloud",
        subtitle: "Boost Your Business with Smart, Scalable Technology",
        description: "We help businesses securely manage and analyze data through modern cloud solutions. Our services improve accessibility, collaboration, and scalability, helping your business operate faster and more efficiently.",
        points: [
            { name: "CRM Solutions", slug: "customer-relationship-management" },
            { name: "IAM Solutions", slug: "identity-and-access-management" },
            { name: "ERP Solutions", slug: "enterprise-resource-planning" },
            { name: "Server Management", slug: "server-management" }
        ],
        cards: [
            {
                title: "Cloud & CRM Solutions",
                slug: "customer-relationship-management",
                video: "/video/datacloud.mp4",
            },
            {
                title: "Data Center & Server",
                slug: "server-management",
                video: "/video/Data_Center_Server-2.mp4",
            },
            {
                title: "ERP Solutions",
                slug: "enterprise-resource-planning",
                video: "/video/data-cloud-3.mp4",
            },
        ],
        video: "/video/datacloud.mp4",
    },
    {
        title: "Development & Software",
        slug: "development-and-software",
        subtitle: "Build Smart Solutions for Modern Businesses",
        description: "We develop reliable and scalable software solutions tailored to your business needs. Our development services help streamline operations, improve efficiency, and support business growth through innovative technology.",
        points: [
            { name: "Web Development", slug: "web-development" },
            { name: "App Development", slug: "app-development" },
            { name: "Game Development", slug: "game-development" },
            { name: "Digital Marketing", slug: "digital-marketing" }
        ],
        cards: [
            {
                title: "Game Development",
                slug: "game-development",
                video: "/video/devolopement.mp4",
            },
            {
                title: "Website Development",
                slug: "web-development",
                video: "/video/dev-2.mp4",
            },
            {
                title: "App Development",
                slug: "app-development",
                video: "/video/dev3.mp4",
            },
        ],
        video: "/video/devolopement.mp4",
    },
    {
        title: "Immersive Tech",
        slug: "immersive-tech",
        subtitle: "Transform the Way People Experience Your Brand",
        description: "ThirdVizion, we create powerful digital experiences using immersive technologies. By combining creativity with advanced innovation, we help businesses engage their audience in more interactive and impactful ways than traditional platforms.",
        points: [
            { name: "Virtual Reality (VR)", slug: "virtual-reality" },
            { name: "Augmented Reality (AR)", slug: "augmented-reality" },
            { name: "3D Service", slug: "3d-services" }
        ],
        cards: [
            {
                title: "Virtual Reality (VR)",
                slug: "virtual-reality",
                video: "/video/immersivetech.mp4",
            },
            {
                title: "Augmented Reality (AR)",
                slug: "augmented-reality",
                video: "/video/tech-2.mp4",
            },
            {
                title: "3D Services",
                slug: "3d-services",
                video: "/video/tech-3.mp4",
            },
        ],
        video: "/video/immersivetech.mp4",
    },
];

const fallbackCardsMap: Record<string, ServiceCardItem[]> = {
    "data-and-cloud": [
        {
            title: "Cloud & CRM Solutions",
            slug: "customer-relationship-management",
            video: "/video/datacloud.mp4",
        },
        {
            title: "Data Center & Server",
            slug: "server-management",
            video: "/video/Data_Center_Server-2.mp4",
        },
        {
            title: "ERP Solutions",
            slug: "enterprise-resource-planning",
            video: "/video/data-cloud-3.mp4",
        },
    ],
    "development-and-software": [
        {
            title: "Game Development",
            slug: "game-development",
            video: "/video/devolopement.mp4",
        },
        {
            title: "Website Development",
            slug: "web-development",
            video: "/video/dev-2.mp4",
        },
        {
            title: "App Development",
            slug: "app-development",
            video: "/video/dev3.mp4",
        },
    ],
    "immersive-tech": [
        {
            title: "Virtual Reality (VR)",
            slug: "virtual-reality",
            video: "/video/immersivetech.mp4",
        },
        {
            title: "Augmented Reality (AR)",
            slug: "augmented-reality",
            video: "/video/tech-2.mp4",
        },
        {
            title: "3D Services",
            slug: "3d-services",
            video: "/video/tech-3.mp4",
        },
    ],
};

const ServiceCard = ({
    card,
    categorySlug,
    aspectClass = "aspect-[16/8]",
    isLarge = false,
}: {
    card: ServiceCardItem;
    categorySlug: string;
    aspectClass?: string;
    isLarge?: boolean;
}) => {
    const embedUrl = getYoutubeEmbedUrl(card.video);

    return (
        <a
            href={`/services/${categorySlug}/${card.slug}`}
            className={`group/card relative w-full ${aspectClass} rounded-2xl md:rounded-[22px] overflow-hidden border border-white/10 hover:border-white/30 shadow-2xl bg-black/40 transition-all duration-300 block`}
        >
            {embedUrl ? (
                <iframe
                    src={embedUrl}
                    className="w-full h-full object-cover border-0 pointer-events-none absolute inset-0"
                    allow="autoplay; encrypted-media"
                    title={card.title}
                />
            ) : (
                <video
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    preload="metadata"
                    playsInline
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                />
            )}

            {/* Bottom Glass Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent sm:bg-black/45 sm:backdrop-blur-md pt-6 pb-3 sm:py-3.5 px-4 sm:px-6 flex items-center justify-start border-t border-white/10 transition-colors duration-300 group-hover/card:bg-black/60">
                <span className={`text-white font-outfit font-semibold tracking-wide ${isLarge ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'}`}>
                    {card.title}
                </span>
            </div>
        </a>
    );
};

const ServiceCardsGrid = ({
    cards,
    categorySlug,
}: {
    cards: ServiceCardItem[];
    categorySlug: string;
}) => {
    if (!cards || cards.length === 0) return null;
    const topCard = cards[0];
    const bottomCards = cards.slice(1, 3);

    return (
        <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-5 w-full">
            {topCard && (
                <ServiceCard
                    card={topCard}
                    categorySlug={categorySlug}
                    aspectClass="aspect-[16/8] sm:aspect-[16/7.8]"
                    isLarge={true}
                />
            )}
            {bottomCards.length > 0 && (
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 w-full">
                    {bottomCards.map((card, idx) => (
                        <ServiceCard
                            key={idx}
                            card={card}
                            categorySlug={categorySlug}
                            aspectClass="aspect-[16/10.5] sm:aspect-[16/10]"
                            isLarge={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const OurServices = () => {
    // Ref for the main container
    const serviceRef = useRef<HTMLDivElement>(null);
    // Ref for the right section (videos)
    const rightRef = useRef<HTMLDivElement>(null);

    const [servicesList, setServicesList] = useState<any[]>(SERVICES_DATA);

    useEffect(() => {
        let active = true;
        async function fetchServices() {
            try {
                const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
                
                const catRes = await fetch(`${payloadUrl}/api/categories?limit=100&sort=order`);
                const svcRes = await fetch(`${payloadUrl}/api/services?limit=100&depth=1`);
                if (!svcRes.ok || !active) return;
                const svcData = await svcRes.json();

                if (svcData.docs && Array.isArray(svcData.docs) && svcData.docs.length > 0) {
                    const activeSlugs = new Set(svcData.docs.map((s: any) => s.slug));
                    
                    if (catRes.ok) {
                        const catData = await catRes.json();
                        if (catData.docs && catData.docs.length >= 3) {
                            const mapped = catData.docs.map((cat: any) => {
                                const points = (svcData.docs || [])
                                    .filter((svc: any) => {
                                        const svcCatId = typeof svc.category === 'object' ? svc.category?.id : svc.category;
                                        return svcCatId === cat.id;
                                    })
                                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                                    .map((svc: any) => ({
                                        name: svc.title,
                                        slug: svc.slug,
                                    }));

                                const fallbackVideoMap: Record<string, string> = {
                                    "data-and-cloud": "/video/datacloud.mp4",
                                    "development-and-software": "/video/devolopement.mp4",
                                    "immersive-tech": "/video/immersivetech.mp4",
                                };

                                return {
                                    title: cat.title.replace(/^Title:\s*/i, '').trim(),
                                    slug: cat.slug,
                                    subtitle: cat.subtitle,
                                    description: cat.description,
                                    video: cat.video || fallbackVideoMap[cat.slug] || "/video/datacloud.mp4",
                                    cards: (cat.cards || fallbackCardsMap[cat.slug] || SERVICES_DATA.find(s => s.slug === cat.slug)?.cards || []).filter((c: any) => activeSlugs.has(c.slug)),
                                    points,
                                };
                            });
                            setServicesList(mapped);
                            return;
                        }
                    }

                    // Fallback to SERVICES_DATA filtered by activeSlugs
                    const updated = SERVICES_DATA.map((serviceGroup) => {
                        const filteredPoints = serviceGroup.points.filter((pt) => activeSlugs.has(pt.slug));
                        const filteredCards = serviceGroup.cards.filter((card) => activeSlugs.has(card.slug));
                        return {
                            ...serviceGroup,
                            points: filteredPoints,
                            cards: filteredCards.length > 0 ? filteredCards : serviceGroup.cards,
                        };
                    });
                    setServicesList(updated);
                }
            } catch (error) {
                console.error('Error loading homepage services from CMS:', error);
            }
        }
        fetchServices();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        // Create a GSAP context for cleanup
        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop animation (lg: 1024px)
            mm.add("(min-width: 1024px)", () => {
                // Pin the right section (videos) while the left section (text) scrolls
                ScrollTrigger.create({
                    trigger: serviceRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: rightRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                });

                // Transition videos as their corresponding text blocks scroll into view
                const textBlocks = gsap.utils.toArray<HTMLElement>(".service-text-block");
                const imageBlocks = gsap.utils.toArray<HTMLElement>(".service-image-block");

                // Set initial states
                imageBlocks.forEach((img, idx) => {
                    if (idx === 0) {
                        gsap.set(img, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" });
                    } else {
                        gsap.set(img, { opacity: 0, y: 70, scale: 0.94, pointerEvents: "none" });
                    }
                });

                textBlocks.forEach((block, i) => {
                    if (i === 0) return; // First video is already visible

                    // Create a single timeline for each transition so scrub reverses cleanly
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: block,
                            start: "top 75%",
                            end: "top 35%",
                            scrub: 0.8,
                            onEnter: () => {
                                gsap.set(imageBlocks[i], { pointerEvents: "auto" });
                                gsap.set(imageBlocks[i - 1], { pointerEvents: "none" });
                            },
                            onLeaveBack: () => {
                                gsap.set(imageBlocks[i], { pointerEvents: "none" });
                                gsap.set(imageBlocks[i - 1], { pointerEvents: "auto" });
                            }
                        }
                    });

                    // Translate & fade out previous card cluster and translate & fade in current cluster
                    tl.to(imageBlocks[i - 1], {
                        opacity: 0,
                        y: -70,
                        scale: 0.94,
                        duration: 1,
                        ease: "power2.inOut",
                    }, 0)
                    .to(imageBlocks[i], {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power2.inOut",
                    }, 0);
                });

                ScrollTrigger.refresh();
            });
        }, serviceRef);

        return () => ctx.revert();
    }, [servicesList]);

    return (
        <section
            ref={serviceRef}
            className="bg-primary relative overflow-hidden pt-2 lg:pt-4">
            <h2 className="heading text-center text-white mb-2 lg:mb-3">
                Our Services
            </h2>

            <div className="w-full mx-auto flex flex-col lg:flex-row items-start justify-start gap-12 lg:gap-16 xl:gap-20 py-1 md:py-2 px-4 md:px-8 lg:px-[60px] xl:px-[80px]">
              
                {/* Left Side: Text Details */}
                <div className="w-full lg:w-[46%] xl:w-[45%] relative">
                    {servicesList.map((service, index) => (
                        <div key={index} className="service-text-block py-8 lg:py-16 lg:min-h-[85vh] flex flex-col justify-center items-start text-left space-y-6 lg:space-y-8">

                            {/* Mobile 3-Card Grid */}
                            <div className="lg:hidden mt-6 mb-4 w-full">
                                <ServiceCardsGrid
                                    cards={service.cards}
                                    categorySlug={service.slug}
                                />
                            </div>

                            <h2 className="heading text-white">{service.title}</h2>
                            <div className="space-y-4">
                                <h3 className="subHeading text-white/90">{service.subtitle}</h3>
                                <p className="bodyText text-tertiary leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-6 lg:pt-8 w-full border-t border-white/10">
                                {service.points.map((point: any, i: number) => (
                                    <li key={i}>
                                        <a
                                            href={`/services/${service.slug}/${point.slug}`}
                                            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-outfit text-lg group/link py-1"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(62,169,193,0.8)] group-hover/link:scale-125 transition-transform shrink-0" />
                                            <span>{point.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Right Side: Pinned 3-Cards Grid Cluster */}
                <div ref={rightRef} className="hidden lg:flex w-full lg:w-[54%] xl:w-[55%] items-start justify-start pt-8 lg:pt-16 min-h-screen">
                    <div className="w-full relative min-h-[480px] xl:min-h-[520px]">
                        {servicesList.map((service, index) => (
                            <div
                                key={index}
                                style={{ zIndex: index + 1 }}
                                className="service-image-block absolute inset-0 w-full flex flex-col justify-start will-change-transform"
                            >
                                <ServiceCardsGrid
                                    cards={service.cards}
                                    categorySlug={service.slug}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OurServices;

