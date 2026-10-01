"use client";

import { useState } from "react";
import { IndustryData } from "../../_data/types";
import { IndustryCardItem } from "./IndustryCardItem";
import { IndustryTabs } from "./IndustryTabs";
import BlurredEllipses from "@/src/components/BlurredEllipses";

interface Props {
  data?: IndustryData[];
  defaultId?: string;
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
    return `rgba(59, 130, 246, ${alpha})`;
  }
};

const ArrowRight = () => (
  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="ml-2 inline-block">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function ServiceIndustry({ data, defaultId, themeColor = "#3B82F6" }: Props) {
  const defaultIndex = (defaultId && data)
    ? data.findIndex((i) => i.id === defaultId)
    : 0;

  const [activeIndex, setActiveIndex] = useState(
    defaultIndex >= 0 ? defaultIndex : 0
  );

  if (!data || data.length === 0) return null;

  const activeData = data[activeIndex];

  return (
    <section className="relative w-full bg-black overflow-hidden pt-20 md:pt-0">
      {/* Background radial blurs */}
      <BlurredEllipses
        ellipse1={{
          width: "37.5rem",
          height: "25rem",
          left: "-12.5rem",
          top: "6.25rem",
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.4)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)`,
          blur: "9.375rem",
          className: "opacity-40 rounded-full pointer-events-none",
          transform: "none",
        }}
        ellipse2={{
          width: "37.5rem",
          height: "25rem",
          right: "-12.5rem",
          top: "0",
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.4)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)`,
          blur: "9.375rem",
          className: "opacity-40 rounded-full pointer-events-none",
          transform: "none",
        }}
      />

      <div className="relative z-10">
        <h2 className="font-anta text-3xl sm:text-4xl lg:text-[3.5rem] font-normal leading-[140%] text-center mb-10 lg:mb-14 text-white">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${themeColor} 0%, ${hexToRgba(themeColor, 0.4)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Industry
          </span>{" "}
          we work
        </h2>

        {/* Tabs Slider */}
        <IndustryTabs
          data={data}
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
          themeColor={themeColor}
        />

        {/* Content Area */}
        <div key={activeData.id} className="w-full px-4 md:px-8 lg:px-[80px] flex flex-col lg:flex-row gap-8 lg:gap-12 pt-4 transition-all duration-500 animate-fadeIn overflow-hidden">
          {/* Left Text Column */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col  text-left">
            <div>
              <h3 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-normal leading-[140%] text-[#E0E2E8] mb-6">
                {activeData.heading}
              </h3>
              <p className="font-outfit text-base sm:text-lg lg:text-xl font-normal leading-[160%] text-[#B3B3B3] mb-8">
                {activeData.description}
              </p>
            </div>
            <button
              className=" relative -top-2 inline-flex items-center justify-center rounded-full font-poppins text-base sm:text-lg lg:text-xl font-normal text-[#EAF3FF] px-6 sm:px-8 lg:px-10 py-3 lg:py-4 transition-all duration-300 hover:brightness-125 w-fit cursor-pointer"
              style={{ background: themeColor }}
            >
              {activeData.buttonText}
              <ArrowRight />
            </button>
          </div>

          {/* Right Cards Grid Column */}
          <div className="w-full lg:flex-1 min-w-0 relative">
            <div
              className="absolute top-1/2 left-1/2 w-[18.75rem] h-[18.75rem] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{
                background: `radial-gradient(circle, ${hexToRgba(themeColor, 0.3)} 0%, transparent 70%)`,
                filter: "blur(5rem)",
              }}
              aria-hidden
            />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 w-full">
              {activeData.cards.map((card, i) => (
                <div
                  key={`${activeData.id}-card-${i}`}
                  className={card.span === "full" ? "sm:col-span-2" : "col-span-1"}
                >
                  <IndustryCardItem card={card} themeColor={themeColor} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
