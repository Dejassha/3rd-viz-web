"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { ServiceProcessItem } from "../../_data/types";

interface ProcessStepCardProps {
  step: ServiceProcessItem;
  isActive: boolean;
  themeColor?: string;
  serviceSlug?: string;
  stepIndex?: number;
}

const hexToRgba = (hex: string, alpha: number) => {
  try {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return `rgba(164, 97, 255, ${alpha})`;
  }
};

/**
 * Returns a specific, context-tailored icon for each step based on the service slug and step index/title.
 */
function getStepIcon(serviceSlug?: string, title?: string, index: number = 0): string {
  const slug = (serviceSlug || "").toLowerCase().trim();
  const t = (title || "").toLowerCase();

  // 1. Check by step title keywords first if available
  if (t.includes("discovery") || t.includes("strategy") || t.includes("assessment") || t.includes("consultation")) {
    if (slug.includes("crm") || slug.includes("customer")) return "lucide:users-round";
    if (slug.includes("iam") || slug.includes("identity")) return "lucide:scan-eye";
    if (slug.includes("server")) return "lucide:network";
    if (slug.includes("erp")) return "lucide:building-2";
    if (slug.includes("3d") || slug.includes("virtual") || slug.includes("augmented")) return "lucide:sparkles";
    return "lucide:compass";
  }

  if (t.includes("design") || t.includes("architecture") || t.includes("wireframe") || t.includes("prototype") || t.includes("modeling")) {
    if (slug.includes("crm")) return "lucide:workflow";
    if (slug.includes("erp")) return "lucide:boxes";
    if (slug.includes("iam")) return "lucide:fingerprint";
    if (slug.includes("server")) return "lucide:cloud-cog";
    if (slug.includes("3d") || slug.includes("virtual") || slug.includes("augmented")) return "lucide:box";
    if (slug.includes("app")) return "lucide:smartphone";
    return "lucide:layout-template";
  }

  if (t.includes("development") || t.includes("integration") || t.includes("implementation") || t.includes("engineering") || t.includes("setup")) {
    if (slug.includes("crm")) return "lucide:database-zap";
    if (slug.includes("erp")) return "lucide:layers";
    if (slug.includes("iam")) return "lucide:key-round";
    if (slug.includes("server")) return "lucide:server";
    if (slug.includes("3d") || slug.includes("virtual") || slug.includes("augmented")) return "lucide:shapes";
    if (slug.includes("app")) return "lucide:smartphone-charging";
    return "lucide:code-2";
  }

  if (t.includes("test") || t.includes("optimization") || t.includes("launch") || t.includes("qa") || t.includes("deployment")) {
    if (slug.includes("iam") || slug.includes("security")) return "lucide:shield-check";
    if (slug.includes("server")) return "lucide:gauge-circle";
    if (slug.includes("3d") || slug.includes("virtual") || slug.includes("augmented")) return "lucide:glasses";
    return "lucide:rocket";
  }

  if (t.includes("innovation") || t.includes("growth") || t.includes("maintenance") || t.includes("support") || t.includes("scaling")) {
    if (slug.includes("crm") || slug.includes("marketing")) return "lucide:trending-up";
    if (slug.includes("server") || slug.includes("cloud")) return "lucide:activity";
    return "lucide:infinity";
  }

  // 2. Index fallback mapping per service domain
  if (slug.includes("crm")) {
    const crmIcons = ["lucide:users-round", "lucide:workflow", "lucide:database-zap", "lucide:check-circle-2", "lucide:trending-up"];
    return crmIcons[index % crmIcons.length];
  }

  if (slug.includes("erp")) {
    const erpIcons = ["lucide:building-2", "lucide:boxes", "lucide:layers", "lucide:shield-check", "lucide:repeat"];
    return erpIcons[index % erpIcons.length];
  }

  if (slug.includes("iam") || slug.includes("identity")) {
    const iamIcons = ["lucide:scan-eye", "lucide:fingerprint", "lucide:key-round", "lucide:shield-check", "lucide:shield"];
    return iamIcons[index % iamIcons.length];
  }

  if (slug.includes("server")) {
    const serverIcons = ["lucide:network", "lucide:cloud-cog", "lucide:server", "lucide:gauge-circle", "lucide:activity"];
    return serverIcons[index % serverIcons.length];
  }

  if (slug.includes("3d") || slug.includes("virtual") || slug.includes("augmented")) {
    const xrIcons = ["lucide:sparkles", "lucide:box", "lucide:scan", "lucide:glasses", "lucide:infinity"];
    return xrIcons[index % xrIcons.length];
  }

  if (slug.includes("app")) {
    const appIcons = ["lucide:search-code", "lucide:smartphone", "lucide:cpu", "lucide:shield-check", "lucide:rocket"];
    return appIcons[index % appIcons.length];
  }

  // Default web / software progression
  const defaultIcons = ["lucide:compass", "lucide:layout-template", "lucide:code-2", "lucide:rocket", "lucide:trending-up"];
  return defaultIcons[index % defaultIcons.length];
}

export default function ProcessStepCard({
  step,
  isActive,
  themeColor = "#A461FF",
  serviceSlug,
  stepIndex = 0,
}: ProcessStepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const onMouseLeave = useCallback(() => setGlowPos(null), []);

  const isCustomImage =
    typeof step.icon === "string" &&
    (step.icon.startsWith("http") || step.icon.startsWith("/media"));

  const stepIconName = getStepIcon(serviceSlug, step.title, stepIndex);

  return (
    <div className="w-full relative z-10 group flex items-center justify-center lg:justify-start">
      {/* Tiny node circle where the horizontal line connects to the box container */}
      <div
        className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full hidden lg:block transition-all duration-300"
        style={{
          backgroundColor: isActive ? themeColor : "#3f3f46",
          boxShadow: isActive ? `0 0 10px ${hexToRgba(themeColor, 0.9)}` : "none",
        }}
      />

      {/* EXACT FIGMA SPEC: Card Box Module Panel */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl p-6 sm:p-8 flex items-center gap-6 backdrop-blur-md transition-all duration-300 relative overflow-hidden group/card"
        style={{
          borderColor: isActive ? hexToRgba(themeColor, 0.45) : undefined,
          boxShadow: isActive ? `0 0 25px ${hexToRgba(themeColor, 0.12)}` : undefined,
        }}
      >
        {/* Cursor-following glow overlay */}
        {glowPos && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: glowPos.x,
              top: glowPos.y,
              width: "18rem",
              height: "18rem",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${hexToRgba(themeColor, 0.18)} 0%, transparent 70%)`,
              borderRadius: "50%",
              transition: "opacity 0.15s ease",
            }}
          />
        )}

        {/* Border glow — lights up on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            opacity: glowPos ? 1 : 0,
            transition: "opacity 0.3s ease",
            boxShadow: `inset 0 0 0 1px ${hexToRgba(themeColor, 0.55)}`,
          }}
        />

        {/* ICON DIV: Cyber Diamond Badge with Dynamic Service-Specific Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 relative flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110">
          {isCustomImage ? (
            <div className="w-full h-full relative">
              <Image
                src={step.icon}
                alt={step.title}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div
              className="w-11 h-11 sm:w-13 sm:h-13 rotate-45 rounded-xl border flex items-center justify-center transition-all duration-300 bg-black/60 shadow-lg relative overflow-hidden"
              style={{
                borderColor: isActive ? hexToRgba(themeColor, 0.6) : "rgba(255, 255, 255, 0.12)",
                boxShadow: isActive ? `0 0 15px ${hexToRgba(themeColor, 0.35)}` : undefined,
              }}
            >
              {/* Inner ambient glow */}
              <div
                className="absolute inset-0 blur-sm pointer-events-none opacity-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${themeColor} 0%, transparent 80%)`,
                }}
              />

              {/* Upright icon inside the tilted diamond */}
              <div className="-rotate-45 flex items-center justify-center relative z-10">
                <Icon
                  icon={stepIconName}
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300"
                  style={{
                    color: isActive ? "#ffffff" : hexToRgba(themeColor, 0.9),
                    filter: isActive ? `drop-shadow(0 0 8px ${themeColor})` : undefined,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* TEXT CONTAINER */}
        <div className="flex-1 text-left">
          <h3 className="text-base sm:text-xl font-semibold text-zinc-100 tracking-wide group-hover/card:text-white transition-colors leading-snug">
            {step.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

