"use client";

import { useState } from "react";
import BlurredEllipses from "@/src/components/BlurredEllipses";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  faqData: FaqItem[];
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

export default function FAQ({ faqData, themeColor = "#A461FF" }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!faqData?.length) return null;

  return (
    <section className="w-full text-white py-10 md:py-16 relative overflow-hidden">
      {/* Background UI Glows */}
      <BlurredEllipses
        ellipse1={{
          left: "-10rem",
          top: "4rem",
          width: "35rem",
          height: "22rem",
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.35)} 0%, ${hexToRgba(themeColor, 0.08)} 100%)`,
          blur: "9rem",
          className: "opacity-40 pointer-events-none",
        }}
        ellipse2={{
          right: "-10rem",
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

        {/* Section Title matching Our Clients section alignment */}
        <h2 className="heading font-semibold tracking-tight mb-6 md:mb-8">
          FAQs
        </h2>

        <div className="w-full">
          <div className="flex flex-col">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-zinc-800/80 transition-all duration-300"
                >
                  <button
                    type="button"
                    className="w-full text-left py-3.5 md:py-4.5 flex items-center justify-between group transition-colors duration-200"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    {/* Question text: responsive sizes, white/zinc-100 */}
                    <span className="font-poppins text-zinc-100 text-base sm:text-lg md:text-xl font-normal tracking-tight flex-1 pr-6 leading-snug transition-colors duration-200 group-hover:text-white">
                      {faq.question}
                    </span>

                    {/* Toggle Icon: thin '+' (white) and '-' (pink/rose red) */}
                    <span
                      className={`text-xl md:text-2xl font-light select-none transition-colors duration-300 shrink-0 ml-4`}
                      style={{ color: isOpen ? themeColor : '#a1a1aa' }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Expandable Answer area */}
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pb-4 md:pb-5" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="font-outfit text-zinc-400 text-sm md:text-base leading-relaxed max-w-[90%]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
