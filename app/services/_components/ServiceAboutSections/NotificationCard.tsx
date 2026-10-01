import React from "react";

interface NotificationCardProps {
  width?: string;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
  showText?: boolean;
  title?: string;
  tag?: string;
  subText?: string;
}

export function NotificationCard({
  width = "100%",
  accentColor = "#3B82F6",
  className = "",
  style = {},
  showText = true,
  title = "Tech & Tools",
  tag = "Verified",
  subText = "Production Ready",
}: NotificationCardProps) {
  return (
    <div
      className={`flex items-center gap-2.5 p-1.5 pr-5 ${className}`}
      style={{
        background: "#191919",
        border: "0.0625rem solid rgba(64,72,80,0.3)",
        borderRadius: "1.625rem",
        width,
        isolation: "isolate",
        ...style,
      }}
    >
      <div className="relative flex-shrink-0 w-[4rem] h-[2.6875rem] md:w-[4.75rem] md:h-[3.1875rem] bg-black rounded-xl flex items-center justify-center">
        <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none"
          stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1 pt-1">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: accentColor }} />
            <span className="font-outfit text-[0.625rem] md:text-xs text-[#E0E2E8] leading-[150%]">{tag}</span>
          </div>
          <span className="font-poppins font-semibold text-sm md:text-lg text-white leading-[140%] truncate">{title}</span>
          <span className="font-outfit text-[0.625rem] md:text-xs text-[#E0E2E8]/70 leading-[150%]">{subText}</span>
        </div>
      )}
    </div>
  );
}
