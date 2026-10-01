"use client";

import { IndustryCard } from "../../_data/types";
import { GlowCard } from "./GlowCard";

interface IndustryCardItemProps {
  card: IndustryCard;
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

export function IndustryCardItem({ card, themeColor = "#A461FF" }: IndustryCardItemProps) {
  const baseClasses = "rounded-xl p-6 lg:p-7 flex flex-col justify-center min-h-[11rem] h-full w-full transition-all duration-300 shadow-lg";

  if (card.variant === "accent") {
    return (
      <GlowCard
        themeColor={themeColor}
        className={baseClasses}
        style={{
          background: hexToRgba(themeColor, 0.45),
          border: `0.0625rem solid ${hexToRgba(themeColor, 0.6)}`,
        }}
      >
        <div>
          <h4 className="font-outfit text-lg sm:text-xl lg:text-2xl font-medium text-white mb-2">
            {card.title}
          </h4>
          {card.description && (
            <p className="font-poppins text-xs sm:text-sm lg:text-base font-normal text-white/80 leading-relaxed">
              {card.description}
            </p>
          )}
        </div>
      </GlowCard>
    );
  }

  if (card.variant === "dark") {
    return (
      <GlowCard
        themeColor={themeColor}
        className={`${baseClasses} items-center justify-center text-center`}
        style={{
          background: "#272A2E",
          border: "0.0625rem solid rgba(64, 72, 80, 0.3)",
        }}
      >
        <h4 className="font-outfit text-lg sm:text-xl lg:text-2xl font-medium text-[#E0E2E8]">
          {card.title}
        </h4>
      </GlowCard>
    );
  }

  // default variant
  return (
    <GlowCard
      themeColor={themeColor}
      className={baseClasses}
      style={{
        background: "#181C20",
        border: "0.0625rem solid rgba(64, 72, 80, 0.2)",
      }}
    >
      <div>
        <h4 className="font-outfit text-lg sm:text-xl lg:text-2xl font-medium text-[#E0E2E8] mb-2">
          {card.title}
        </h4>
        {card.description && (
          <p className="font-poppins text-xs sm:text-sm lg:text-base font-normal text-[#969696] leading-relaxed">
            {card.description}
          </p>
        )}
      </div>
    </GlowCard>
  );
}
