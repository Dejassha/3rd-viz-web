
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { headerData, servicesData as fallbackServicesData } from "@/src/data/layoutData";
import logo from "@assets/images/logo.png";
import { Icon } from "@iconify/react";

import gsap from "gsap";

const activeUnderlineGradient =
  "linear-gradient(to right, #FDB928, #F38540, #3EA9C1,#EE3A5C,#5EBC58)";

function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(56);
  const [servicesData, setServicesData] = useState<any[]>(fallbackServicesData as unknown as any[]);

  useEffect(() => {
    let active = true;
    async function fetchServices() {
      try {
        const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

        const catRes = await fetch(`${payloadUrl}/api/categories?limit=100&sort=order`);
        const svcRes = await fetch(`${payloadUrl}/api/services?limit=100&depth=1`);

        if (!active) return;

        let baseData = JSON.parse(JSON.stringify(fallbackServicesData));

        if (svcRes.ok) {
          const svcData = await svcRes.json();
          const catData = catRes.ok ? await catRes.json() : { docs: [] };

          if (catData.docs && catData.docs.length >= 3) {
            const mapped = catData.docs.map((cat: any) => {
              const items = (svcData.docs || [])
                .filter((svc: any) => {
                  const svcCatId = typeof svc.category === 'object' ? svc.category?.id : svc.category;
                  return svcCatId === cat.id;
                })
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((svc: any) => ({
                  title: svc.title,
                  serviceSlug: svc.slug,
                  description: svc.hero?.title || '',
                  iconColor: 'icon-violet',
                }));

              return {
                category: cat.title.replace(/^Title:\s*/i, '').trim(),
                slug: cat.slug,
                items,
              };
            }).filter((cat: any) => cat.items.length > 0);
            baseData = mapped;
          } else if (svcData.docs && Array.isArray(svcData.docs) && svcData.docs.length > 0) {
            const activeSlugs = new Set(svcData.docs.map((s: any) => s.slug));
            baseData = baseData
              .map((cat: any) => {
                const filteredItems = cat.items
                  .filter((it: any) => activeSlugs.has(it.serviceSlug))
                  .map((it: any) => {
                    const cmsSvc = svcData.docs.find((s: any) => s.slug === it.serviceSlug);
                    return {
                      ...it,
                      title: cmsSvc ? cmsSvc.title : it.title,
                    };
                  });
                return {
                  ...cat,
                  items: filteredItems,
                };
              })
              .filter((cat: any) => cat.items.length > 0);
          }
        }
        setServicesData(baseData);
      } catch (error) {
        console.error('Error loading header services from CMS:', error);
      }
    }
    fetchServices();
    return () => { active = false; };
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null); // middle line
  const line3Ref = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Mega-menu hover handlers ──────────────────────────────────────────────
  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowServices(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShowServices(false), 200);
  };

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Measure header height for mobile drawer offset ────────────────────────
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeaderHeight(el.offsetHeight));
    ro.observe(el);
    setHeaderHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // ── GSAP floating/shrink on scroll ───────────────────────────────────────
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 1024;

    gsap.to(el, {
      maxWidth: isScrolled ? (isMobile ? "94%" : "90%") : "100%",
      marginLeft: isScrolled ? (isMobile ? "3%" : "5%") : "0%",
      marginRight: isScrolled ? (isMobile ? "3%" : "5%") : "0%",
      borderRadius: isScrolled ? 20 : 0,
      top: isScrolled ? (isMobile ? 8 : 16) : 0,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: true,
      ...(isScrolled
        ? {
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }
        : {
          clearProps:
            "backgroundColor,backdropFilter,WebkitBackdropFilter,borderColor",
        }),
    });
  }, [isScrolled]);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ── GSAP hamburger ↔ X + drawer fade ─────────────────────────────────────
  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    const menu = menuRef.current;
    if (!l1 || !l2 || !l3 || !menu) return;

    const ease = "power3.inOut";

    if (isOpen) {
      gsap.to(l2, { opacity: 0, duration: 0.15, ease });
      gsap.to(l1, { rotate: 45, y: 9, duration: 0.3, ease, delay: 0.05 });
      gsap.to(l3, { rotate: -45, y: -9, duration: 0.3, ease, delay: 0.05 });
      gsap.fromTo(
        menu,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.35, ease }
      );
    } else {
      gsap.to(l1, { rotate: 0, y: 0, duration: 0.3, ease });
      gsap.to(l3, { rotate: 0, y: 0, duration: 0.3, ease });
      gsap.to(l2, { opacity: 1, duration: 0.15, ease, delay: 0.2 });
      gsap.to(menu, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          STICKY HEADER BAR
          3-column grid: logo | nav (centered) | spacer
          This keeps the nav perfectly centered regardless of
          logo width, without needing a Button on the right.
      ════════════════════════════════════════════════════ */}
      <div
        ref={headerRef}
        className={`px-4 lg:px-6 py-2 flex items-center text-white sticky z-50 border border-transparent ${isHome && !isScrolled && !isOpen ? "grid-bg" : ""
          }`}
        style={{
          maxWidth: "100%",
          marginLeft: "0%",
          marginRight: "0%",
          borderRadius: 0,
          top: 0,
        }}
      >
        {/* ── Logo ── */}
        <Image
          priority
          className="size-12 object-contain flex-shrink-0"
          src={logo}
          alt="Logo"
        />

        {/* ── DESKTOP NAV — absolutely centered ── */}
        <nav
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-8 whitespace-nowrap">
            {headerData.map((item) => {
              const isActive = pathname === item.href;
              const isServices = item.label === "Services";

              return (
                <li
                  key={item.href}
                  className="relative group flex-shrink-0"
                  onMouseEnter={() => isServices && handleEnter()}
                  onMouseLeave={() => isServices && handleLeave()}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (isServices) {
                        e.preventDefault();
                        setShowServices((prev) => !prev);
                      }
                    }}
                    className="hover:text-white/80 transition-colors text-white text-base flex items-center gap-1 py-2"
                  >
                    {item.label}
                    {isServices && (
                      <Icon
                        icon="lucide:chevron-down"
                        className={`text-sm transition-transform duration-300 ${showServices ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </a>

                  {/* Active / hover underline */}
                  <span
                    className={`absolute rounded-[20px] -bottom-0.5 left-0 right-0 h-0.5 transition-all duration-300 transform origin-left ${isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                    style={{ background: activeUnderlineGradient }}
                    aria-hidden
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── HAMBURGER (mobile / tablet only) — pushed to right ── */}
        <div className="lg:hidden ml-auto">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative size-6 cursor-pointer flex flex-col justify-center items-center gap-[5px] z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span
              ref={line1Ref}
              className="block h-[3px] w-6 bg-white rounded-full origin-center"
            />
            <span
              ref={line2Ref}
              className="block h-[3px] w-6 bg-white rounded-full origin-center"
            />
            <span
              ref={line3Ref}
              className="block h-[3px] w-6 bg-white rounded-full origin-center"
            />
          </button>
        </div>

        {/* ── DESKTOP MEGA-MENU (Services dropdown) ── */}
        <div
          className={`hidden lg:block absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[880px] pt-3 transition-all duration-300 z-50 ${showServices
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="bg-[#0f0f0f]/95 border border-white/10 rounded-2xl px-10 py-7 shadow-2xl backdrop-blur-2xl grid grid-cols-3 gap-12 text-left">
            {servicesData.map((cat) => (
              <div key={cat.slug} className="space-y-4">
                <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider font-outfit">
                  {cat.category}
                </h4>
                <ul className="space-y-2.5">
                  {cat.items.map((service: any) => {
                    const isServiceActive =
                      pathname === `/services/${cat.slug}/${service.serviceSlug}`;
                    return (
                      <li
                        key={service.serviceSlug}
                        className="group/service relative w-full"
                      >
                        <a
                          href={`/services/${cat.slug}/${service.serviceSlug}`}
                          className={`text-sm font-outfit transition-colors duration-200 block ${isServiceActive
                              ? "text-white font-semibold"
                              : "text-white/70 hover:text-white"
                            }`}
                        >
                          {service.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div
        ref={menuRef}
        className="lg:hidden fixed inset-x-0 bottom-0 bg-black/95 overflow-y-auto flex flex-col items-center pointer-events-none opacity-0 z-40"
        style={{ top: headerHeight }}
      >
        <nav className="flex flex-col items-center gap-6 w-full max-w-lg px-6 py-10 text-center">
          {headerData.map((item, index) => {
            const isActive = pathname === item.href;
            const isServices = item.label === "Services";

            /* ── Services: all categories expanded inline ── */
            if (isServices) {
              return (
                <div
                  key={item.href}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <span className="text-sm font-bold text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 w-full text-center">
                    Our Services
                  </span>

                  <div className="w-full space-y-8 py-2">
                    {servicesData.map((cat) => (
                      <div key={cat.slug} className="space-y-3">
                        <h4 className="text-xs font-outfit text-accent-blue uppercase tracking-widest">
                          {cat.category}
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {cat.items.map((service: any) => {
                            const isServiceActive =
                              pathname ===
                              `/services/${cat.slug}/${service.serviceSlug}`;
                            return (
                              <li
                                key={service.serviceSlug}
                                className="group/ms relative inline-block mx-auto px-2"
                              >
                                <a
                                  href={`/services/${cat.slug}/${service.serviceSlug}`}
                                  onClick={() => setIsOpen(false)}
                                  className={`text-base transition-all duration-300 ${isServiceActive
                                      ? "text-white font-outfit"
                                      : "text-white/70 hover:text-white"
                                    }`}
                                >
                                  {service.title}
                                </a>
                                <div
                                  className={`h-0.5 rounded-full mt-0.5 transition-all duration-300 transform origin-center ${isServiceActive
                                      ? "opacity-100 scale-x-100"
                                      : "opacity-0 scale-x-0 group-hover/ms:opacity-100 group-hover/ms:scale-x-100"
                                    }`}
                                  style={{ background: activeUnderlineGradient }}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="h-px w-20 bg-white/10" />
                </div>
              );
            }

            /* ── Regular nav link ── */
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-bold w-full text-center transition-all duration-300 ${isActive
                    ? "text-white scale-110"
                    : "text-white/60 hover:text-white"
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
                {isActive && (
                  <div
                    className="h-1 rounded-full mt-1 mx-auto max-w-[80%]"
                    style={{ background: activeUnderlineGradient }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Header;