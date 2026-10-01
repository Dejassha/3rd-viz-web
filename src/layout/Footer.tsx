"use client";

import LaserFlow from "../components/LaserFlow";
import { linksData, servicesData } from "../data/layoutData";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const STRIPE_COLORS = [
  "#FDB928", "#F38540", "#3EA9C1", "#FDB928", "#EE3A5C",
  "#5EBC58", "#F38540", "#FDB928", "#3EA9C1", "#5EBC58", "#EE3A5C",
];

const socialLinks = [
  // {
  //   label: "YouTube",
  //   href: "https://www.youtube.com/@ThirdVizion",
  //   icon: "mdi:youtube",
  // },
  // {
  //   label: "Instagram",
  //   href: "https://www.instagram.com/thirdvizionlabs?igsh=bDY0N3d5b2hsdm9y",
  //   icon: "mdi:instagram",
  // },
  // {
  //   label: "Facebook",
  //   href: "https://www.facebook.com/profile.php?id=61580211779605",
  //   icon: "mdi:facebook",
  // },
  // {
  //   label: "LinkedIn",
  //   href: "https://share.google/AQvxKb1AUk9MkzOiS",
  //   icon: "mdi:linkedin",
  // },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ThirdVizion",
    icon: "logos:youtube-icon",
    color: "#FF0000",
    iconClass: "text-2xl sm:text-2xl",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thirdvizionlabs",
    icon: "thesvg-color:instagram",
    color: "#E4405F",
    iconClass: "text-2xl sm:text-2xl",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61580211779605",
    icon: "logos:facebook",
    color: "#1877F2",
    iconClass: "text-2xl sm:text-2xl",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: "devicon:linkedin",
    color: "#0A66C2",
    iconClass: "text-2xl sm:text-2xl",
  },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [verticalOffset, setVerticalOffset] = useState(-0.485);
  const [footerServices, setFooterServices] = useState<any[]>(servicesData as unknown as any[]);

  useEffect(() => {
    let active = true;
    async function fetchFooterServices() {
      try {
        const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
        const svcRes = await fetch(`${payloadUrl}/api/services?limit=100&depth=1`);
        if (!svcRes.ok || !active) return;
        const svcData = await svcRes.json();
        if (svcData.docs && Array.isArray(svcData.docs)) {
          const activeSlugs = new Set(svcData.docs.map((s: any) => s.slug));
          let baseData = JSON.parse(JSON.stringify(servicesData));
          baseData = baseData
            .map((cat: any) => ({
              ...cat,
              items: cat.items
                .filter((it: any) => activeSlugs.has(it.serviceSlug))
                .map((it: any) => {
                  const cmsSvc = svcData.docs.find((s: any) => s.slug === it.serviceSlug);
                  return {
                    ...it,
                    title: cmsSvc ? cmsSvc.title : it.title,
                  };
                }),
            }))
            .filter((cat: any) => cat.items.length > 0);
          setFooterServices(baseData);
        }
      } catch (e) {
        console.error("Footer services fetch error:", e);
      }
    }
    fetchFooterServices();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVerticalOffset(-0.488);
      } else if (window.innerWidth < 1024) {
        setVerticalOffset(-0.484);
      } else {
        setVerticalOffset(-0.475);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="overflow-hidden w-full bg-black text-white">
      {/* Address & Newsletter Section */}
      <section className="bg-[#141414] py-6 sm:py-8 lg:py-10 relative overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row justify-between items-start px-4 md:px-8 lg:px-[80px] gap-6 lg:gap-12">
          {/* LEFT SIDE */}
          <div className="text-white space-y-4 sm:space-y-5 max-w-md w-full">
            <h6 className="font-inter text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
              Third Vizion Labs
            </h6>

            <div className="space-y-1">
              <p className="text-gray-400 text-xs sm:text-sm font-medium">Address</p>
              <p className="text-white leading-relaxed text-xs sm:text-sm">
                No:11, 1st floor, Ramdass Nagar,<br />
                Kolathur, Chennai, Tamil Nadu 600099
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 pt-1">
              <div className="space-y-1">
                <p className="text-gray-400 text-xs sm:text-sm font-medium">For Enquiry</p>
                <a
                  href="mailto:business@thirdvizion.com"
                  className="text-white text-xs sm:text-sm hover:text-[#3EA9C1] transition-colors"
                >
                  business@thirdvizion.com
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Follow Us</p>
                <div className="flex items-center gap-2.5 mt-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
                    >
                      <Icon
                        icon={social.icon}
                        className={social.iconClass || "text-xl sm:text-xl"}
                        style={{ color: social.color }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* DPIIT / Startup India Recognition Badge */}
            <div className="pt-2 sm:pt-3">
              <p className="text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Recognition</p>
              <div
                className="inline-flex items-center gap-3 bg-[#1d1d20] border border-white/10 rounded-xl p-2.5 sm:px-3 sm:py-2.5 shadow-lg select-none"
              >
                <div className="bg-white rounded-lg px-2 py-1 flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src="/images/dpiit-startup-india.png"
                    alt="DPIIT #startupindia Recognition"
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white">
                      Recognized Startup
                    </span>
                    <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                      Govt of India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="max-w-md w-full space-y-3 sm:space-y-4 mt-2 lg:mt-0">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-medium leading-snug">
              Subscribe to <br className="hidden sm:inline" /> our newsletter
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center w-full gap-3 sm:gap-0 relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#222222] text-white placeholder-gray-400 h-11 sm:h-12 rounded-xl pl-4 pr-4 sm:pr-32 border border-white/15 focus:border-white/40 outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="sm:absolute sm:right-1.5 h-10 sm:h-9 px-4 bg-white text-black font-semibold text-xs sm:text-sm rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
              >
                {subscribed ? (
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <Icon icon="lucide:check" className="text-sm" /> Subscribed
                  </span>
                ) : (
                  <>
                    <span>Submit</span>
                    <Icon icon="lucide:arrow-right" className="text-sm transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Links & THIRDVIZION Combined Wrapper with Full Height LaserFlow Background */}
      <div className="relative overflow-hidden grid-bg">
        {/* LaserFlow canvas spanning full width & height down to THIRDVIZION across all screen sizes */}
        <div className="absolute inset-0 w-full pointer-events-none z-0 overflow-hidden">
          <div className="w-full h-full absolute top-0 left-0 right-0">
            <LaserFlow
              colors={STRIPE_COLORS}
              colorSmudge={0.2}
              flowSpeed={0.35}
              verticalBeamOffset={verticalOffset}
              horizontalBeamOffset={0.25}
              horizontalSizing={3.0}
              falloffStart={2.5}
            />
          </div>
        </div>

        {/* Links Section */}
        <section className="relative z-10 py-6 sm:py-8 lg:py-12 px-4 md:px-8 lg:px-[80px] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-6 sm:gap-8 lg:gap-x-12 lg:gap-y-6">
            {/* Quick Links Column */}
            <div className="space-y-2 sm:space-y-3 min-w-[120px]">
              <h6 className="font-outline text-sm sm:text-base lg:text-lg font-semibold text-white uppercase tracking-wider">
                Links
              </h6>
              <ul className="flex flex-col gap-1.5 sm:gap-2">
                {linksData.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm lg:text-base font-normal text-tertiary hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Categories Columns */}
            {footerServices.map((group) => (
              <div key={group.category} className="space-y-2 sm:space-y-3 min-w-[120px]">
                <h6 className="font-outline text-sm sm:text-base lg:text-lg font-semibold text-white uppercase tracking-wider">
                  {group.category}
                </h6>
                <ul className="flex flex-col gap-1.5 sm:gap-2">
                  {group.items.map((item: any) => (
                    <li key={item.title}>
                      <a
                        href={`/services/${group.slug}/${item.serviceSlug}`}
                        className="text-xs sm:text-sm lg:text-base font-normal text-tertiary hover:text-white transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* THIRDVIZION Brand Banner Section */}
        <section aria-label="THIRDVIZION" className="relative z-10 p-0 m-0 overflow-hidden leading-none pt-2 sm:pt-4">
          <div className="w-full flex justify-between items-end gap-0.5 sm:gap-1 md:gap-2 lg:gap-4 px-2 sm:px-4 pb-0 mb-0 leading-none">
            {"THIRDVIZION".split("").map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="font-inter font-bold text-[clamp(1.8rem,7.5vw,13rem)] uppercase text-transparent shrink-0 leading-none"
                style={{
                  WebkitTextStroke: "1.5px #5C5C5C",
                  paintOrder: "stroke fill",
                  lineHeight: 0.75,
                  marginBottom: "-0.05em",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;