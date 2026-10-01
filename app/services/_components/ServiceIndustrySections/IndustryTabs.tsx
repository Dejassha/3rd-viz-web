"use client";

import { useRef, useEffect } from "react";
import { IndustryData } from "../../_data/types";

interface IndustryTabsProps {
  data: IndustryData[];
  activeIndex: number;
  onTabChange: (index: number) => void;
  themeColor?: string;
}

const ChevronLeft = () => (
  <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none"
    stroke="#969696" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none"
    stroke="#969696" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function IndustryTabs({ data, activeIndex, onTabChange, themeColor = "#A461FF" }: IndustryTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsRef.current || !tabsListRef.current) return;
    const container = tabsRef.current;
    if (activeIndex === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const activeTab = tabsListRef.current.children[activeIndex] as HTMLElement;
    if (activeTab) {
      const scrollLeft =
        activeTab.offsetLeft -
        container.clientWidth / 2 +
        activeTab.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [activeIndex]);

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      onTabChange(activeIndex > 0 ? activeIndex - 1 : data.length - 1);
    } else {
      onTabChange(activeIndex < data.length - 1 ? activeIndex + 1 : 0);
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-3 mb-8 lg:mb-12 container mx-auto px-4 md:px-8">
      <button
        onClick={() => handleScroll("left")}
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#484848] hover:border-[#969696] transition-colors bg-black/40 z-10"
        aria-label="Scroll tabs left"
      >
        <ChevronLeft />
      </button>

      <div
        ref={tabsRef}
        className="flex-1 overflow-x-auto scrollbar-none scroll-smooth min-w-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          ref={tabsListRef}
          className="flex items-center gap-1 sm:gap-2 min-w-max mx-auto px-2"
        >
          {data.map((industry, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={industry.id}
                onClick={() => onTabChange(index)}
                className={`flex-shrink-0 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 text-center font-outfit text-base sm:text-lg lg:text-xl font-normal leading-[150%] rounded-t-lg transition-all duration-300 whitespace-nowrap ${isActive
                  ? "bg-[#181C20]"
                  : "text-[#969696] hover:text-white"
                  }`}
                style={isActive ? {
                  color: themeColor,
                  borderBottom: `4px solid ${themeColor}`
                } : undefined}
              >
                {industry.name}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#484848] hover:border-[#969696] transition-colors bg-black/40 z-10"
        aria-label="Scroll tabs right"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
