"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function CareerHero() {
  const scrollToRoles = () => {
    const el = document.getElementById("open-roles-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: 500, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black text-white pt-20 pb-24 md:pt-28 md:pb-32 border-b border-white/[0.08]">
      {/* ── Background: Dark Rounded Grid Matrix (Only Black & Subtle Grey) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-90 bg-repeat bg-center"
        style={{
          backgroundImage: "url('/images/career-grid-bg.png')",
          backgroundSize: "600px auto",
        }}
      />

      {/* Subtle Monochrome Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none" />

      {/* Subtle Highlight Matrix Tiles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[10%] w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 hidden sm:block" />
        <div className="absolute top-[32%] right-[14%] w-14 h-14 rounded-xl bg-white/[0.04] border border-white/10 hidden sm:block" />
        <div className="absolute bottom-[20%] left-[22%] w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 hidden sm:block" />
        <div className="absolute bottom-[16%] right-[26%] w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 hidden sm:block" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center">
        
        {/* ── Top Trust Badge / Reviews ── */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-sm mb-6 sm:mb-8 transition-transform hover:scale-105">
       
          <span className="text-xs sm:text-sm font-inter-tight font-medium text-zinc-300">
            Be a Part Of Us
          </span>
        </div>

        {/* ── Main Headline ── */}
        <h1 className="font-anta text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight text-white leading-[1.08] max-w-4xl">
          Build skills
          <br />
          <span className="text-white">
            New opportunities.
          </span>
        </h1>

        {/* ── Subtitle Description ── */}
        <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-6 font-inter-tight">
          ThirdVizion gives you a complete learning and engineering experience that helps you gain real, job-ready skills and take the next step in your career.
        </p>

        {/* ── CTA Button ── */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <button
            type="button"
            onClick={scrollToRoles}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm sm:text-base transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.18)] cursor-pointer"
          >
            <span>EXPLORE OPEN ROLES</span>
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs transition-transform group-hover:translate-x-1">
              <Icon icon="lucide:arrow-right" />
            </div>
          </button>
        </div>
      </div>

      {/* ── Left Floating Badge ── */}
      <div className="hidden lg:flex flex-col items-start gap-3 absolute left-6 xl:left-14 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="p-3.5 rounded-2xl bg-[#111114]/90 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
            <Icon icon="lucide:user-check" className="text-lg" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">20+</p>
            <p className="text-[11px] text-zinc-400 mt-1 leading-none">Employees</p>
          </div>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-[#151518] border border-white/10 shadow-xl ml-4 overflow-hidden flex items-center justify-center text-zinc-300">
          <Icon icon="lucide:sparkles" className="text-lg" />
        </div>
      </div>

      {/* ── Right Floating Badge ── */}
      <div className="hidden lg:flex flex-col items-end gap-3 absolute right-6 xl:right-14 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="p-3.5 rounded-2xl bg-[#111114]/90 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-right-6 duration-700">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
            <Icon icon="lucide:sparkle" className="text-lg" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">10+</p>
            <p className="text-[11px] text-zinc-400 mt-1 leading-none">Roles</p>
          </div>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-[#151518] border border-white/10 shadow-xl mr-4 overflow-hidden flex items-center justify-center text-zinc-300">
          <Icon icon="lucide:rocket" className="text-lg" />
        </div>
      </div>
    </section>
  );
}
