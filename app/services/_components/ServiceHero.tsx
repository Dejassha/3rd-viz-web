"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ServiceHero } from "../_data/types";
import BlurredEllipses from "@/src/components/BlurredEllipses";

interface Props {
  data: ServiceHero;
  videoUrl?: string;
  themeColor?: string;
}

const getYoutubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&enablejsapi=1`;
  }
  return null;
};

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

export default function Hero({ data, videoUrl, themeColor = "#A461FF" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const youtubeUrl = getYoutubeEmbedUrl(videoUrl || "");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, [videoUrl]);

  const togglePlay = (e: React.MouseEvent) => {
    // Prevent navigating or other issues if nested
    e.stopPropagation();
    if (youtubeUrl) {
      if (!iframeRef.current) return;
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      if (!isPlaying) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
          '*'
        );
      }
      setIsPlaying(!isPlaying);
    } else {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    // ── Set ALL initial states before any paint ──
    gsap.set(mainTitleRef.current, { opacity: 0, y: 24, filter: "blur(6px)" });
    gsap.set(textRef.current, { opacity: 0, y: 36, filter: "blur(4px)" });
    gsap.set(btnRef.current, { opacity: 0, y: 20 });
    gsap.set(cardRef.current, { opacity: 0, scale: 0.94, y: 30 });
    gsap.set(lineRefs.current, { opacity: 0, scaleX: 0, transformOrigin: "center" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.15, // tiny delay so page paint settles first
    });

    // 1. Main title fades + unblurs in
    tl.to(mainTitleRef.current, {
      opacity: 1, y: 0, filter: "blur(0px)",
      duration: 0.7,
    })

      // 2. Sub-title slides + unblurs in
      .to(textRef.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.9,
      }, "-=0.45")

      // 3. Button pops in
      .to(btnRef.current, {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: "back.out(1.4)",
      }, "-=0.5")

      // 4. Card rises + scales in
      .to(cardRef.current, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.85,
        ease: "power2.out",
      }, "-=0.7")

      // 5. Decorative lines inside card expand outward
      .to(lineRefs.current, {
        opacity: 0.2, scaleX: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.4");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh bg-black overflow-hidden flex items-center"
    >
      {/* ── Decorative blurred ellipses ── */}
      <BlurredEllipses
        ellipse1={{
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.5)} 0%, ${hexToRgba(themeColor, 0.2)} 100%)`,
        }}
        ellipse2={{
          background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.5)} 0%, ${hexToRgba(themeColor, 0.2)} 100%)`,
        }}
      />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[80px] flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* ── Left: text block ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full md:flex-1 min-w-0">

          {/* Page indicator / service name */}
          {data.maintitle && (
            <h1
              ref={mainTitleRef}
              className="font-anta font-semibold tracking-widest uppercase mb-6 text-[clamp(2rem,5vw+1rem,4.5rem)] leading-[clamp(2.5rem,5vw+1.2rem,5rem)] font-normal"
              style={{ color: themeColor }}
            >
              {data.maintitle}
            </h1>
          )}

          {/* Main hook line */}
          <h2
            ref={textRef}
            className="font-anta text-white text-[clamp(1.125rem,2vw+0.8rem,1.875rem)] leading-relaxed font-normal"
          >
            {data.title}
          </h2>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mt-8">
            <button
              ref={btnRef}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-service-modal"));
                }
              }}
              className="flex items-center justify-center gap-2.5 px-8 py-3 rounded-full text-white font-outfit font-medium text-[clamp(1rem,1.5vw,1.25rem)] leading-[140%] transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              style={{ background: `linear-gradient(270deg, ${themeColor} 0%, ${hexToRgba(themeColor, 0.4)} 100%)` }}
            >
              Get a Quote
            </button>
            <Link href="/contact" passHref>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 font-outfit font-medium text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* ── Right: video card ── */}
        <div
          ref={cardRef}
          onClick={togglePlay}
          className="relative w-full md:flex-1 min-w-0 aspect-video rounded-lg flex items-center justify-center overflow-hidden group/player cursor-pointer shadow-2xl"
          style={{ background: "rgba(80, 80, 80, 0.58)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          {/* HTML5 Video or YouTube iframe Element */}
          {youtubeUrl ? (
            <iframe
              ref={iframeRef}
              src={youtubeUrl}
              className="absolute inset-0 w-full h-full object-cover border-0 pointer-events-none"
              allow="autoplay; encrypted-media"
              title="Service Hero Video"
            />
          ) : videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl /* || "/about_dummy_video.mp4" - fallback commented out */}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            /* Fallback video commented out:
            <video
              ref={videoRef}
              src="/about_dummy_video.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
            />
            */
            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-2">
              <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs uppercase tracking-widest opacity-60">No Video Available</span>
            </div>
          )}

          {/* Decorative lines — animated individually, only visible when paused */}
          <div className={`absolute left-1/2 top-[42%] -translate-x-1/2 flex flex-col gap-5 pointer-events-none transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                ref={(el) => { lineRefs.current[i] = el; }}
                className="rounded-full"
                style={{
                  width: "18.25rem",
                  height: "0.0625rem",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
                }}
              />
            ))}
          </div>

          {/* Dark overlay when not playing or when hovered while playing */}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-none ${isPlaying ? "opacity-0 group-hover/player:opacity-100" : "opacity-100"}`} />

          {/* Play/Pause button overlay */}
          <div className={`relative z-10 flex items-center justify-center transition-all duration-300 pointer-events-none ${isPlaying ? "opacity-0 scale-75 group-hover/player:opacity-100 group-hover/player:scale-100" : "opacity-100 scale-100"}`}>
            <div className="w-[4.75rem] h-[4.75rem] rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110">
              {isPlaying ? (
                // Pause Icon
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="w-2.5 h-7 bg-[#030006] rounded-sm" />
                  <div className="w-2.5 h-7 bg-[#030006] rounded-sm" />
                </div>
              ) : (
                // Play Icon
                <div
                  className="ml-1.5"
                  style={{
                    width: 0, height: 0,
                    borderTop: "1rem solid transparent",
                    borderBottom: "1rem solid transparent",
                    borderLeft: "1.75rem solid #030006",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}