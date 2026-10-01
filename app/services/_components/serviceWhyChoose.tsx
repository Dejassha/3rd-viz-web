"use client";

import { WhyChooseItem } from "../_data/types";
import { Icon } from "@iconify/react";

interface Props {
  data: WhyChooseItem[];
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

export default function ServiceWhyChoose({ data, themeColor = "#3B82F6" }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section className="relative w-full bg-[#050505] py-20 lg:py-28 overflow-hidden">
      {/* Background decoration blurs */}
      <div
        className="absolute right-[-10rem] top-[-10rem] w-[30rem] h-[30rem] rounded-full opacity-20 blur-[8rem] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${hexToRgba(themeColor, 0.4)} 0%, transparent 70%)` }}
      />
      <div
        className="absolute left-[-10rem] bottom-[-10rem] w-[30rem] h-[30rem] rounded-full opacity-20 blur-[8rem] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${hexToRgba(themeColor, 0.2)} 0%, transparent 70%)` }}
      />

      <div className="container mx-auto relative z-10">
        <h2 className="font-anta text-3xl sm:text-4xl lg:text-[3.5rem] font-normal leading-[140%] text-center mb-12 lg:mb-20 text-white">
          Why{" "}
          <span
            className="bg-clip-text text-transparent font-bold"
            style={{
              backgroundImage: `linear-gradient(90deg, ${themeColor} 0%, ${hexToRgba(themeColor, 0.6)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Choose Us
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((item, index) => {
            // Mapping default basic feather names to Lucide icons
            const iconName = item.icon.includes(":") ? item.icon : `lucide:${item.icon}`;

            return (
              <div
                key={index}
                className="group relative rounded-2xl p-8 bg-[#0D0D0E]/80 border border-white/[0.03] transition-all duration-500 hover:bg-[#121214] flex flex-col justify-between min-h-[16rem]"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${hexToRgba(themeColor, 0.08)} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Top line with Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-outfit text-4xl lg:text-5xl font-extrabold text-white/5 group-hover:text-white/20 transition-colors duration-500 select-none">
                      {item.num}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05] transition-all duration-500"
                      style={{ color: themeColor, borderColor: hexToRgba(themeColor, 0.3) }}
                    >
                      <Icon icon={iconName} className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-outfit text-xl lg:text-2xl font-semibold text-[#E0E2E8] mb-4 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm lg:text-base font-normal text-[#969696] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}