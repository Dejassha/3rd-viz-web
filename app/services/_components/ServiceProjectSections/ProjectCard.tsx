"use client";

import Image from "next/image";
import { useRef, useEffect, MouseEvent } from "react";
import { ServiceProject } from "../../_data/types";

interface ProjectCardProps {
  project: ServiceProject;
  index: number;
  themeColor?: string;
}

const hexToRgba = (hex: string, alpha: number) => {
  if (!hex || typeof hex !== "string") return `rgba(0, 0, 0, 0)`;
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6 && clean.length !== 3) return `rgba(0, 0, 0, 0)`;
  const fullHex = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0, 0, 0, 0)`;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ProjectCard = ({
  project,
  index,
  themeColor = "#3B82F6",
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !imgWrapperRef.current) {
        return;
      }

      if (window.innerWidth < 1024) {
        imgWrapperRef.current.style.transform = "scale(1.05)";
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress =
        (windowHeight - rect.top) /
        (windowHeight + rect.height);

      const translateY = (progress - 0.5) * 60;

      imgWrapperRef.current.style.transform =
        `translateY(${translateY}px) scale(1.15)`;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  
  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (window.innerWidth < 1024) {
      return;
    }

    if (!cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * 3;

    const rotateY =
      ((centerX - x) / centerX) * 3;

    cardRef.current.style.transition = "none";

    cardRef.current.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) {
      return;
    }

    cardRef.current.style.transition =
      "transform 0.5s ease-out";

    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div className="group relative w-full">
      
      <div
        className="
          hidden
          lg:block
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[520px]
          h-[360px]
          rounded-full
          opacity-20
          blur-[130px]
          pointer-events-none
          z-0
        "
        style={{
          background: `radial-gradient(
            circle,
            ${hexToRgba(themeColor, 0.5)} 0%,
            transparent 75%
          )`,
        }}
      />

      
      <div
        ref={cardRef}
        className="
          relative
          z-10
          w-full
          will-change-transform
        "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="
            relative
            w-full
            aspect-[16/8]
            overflow-hidden
            rounded-xl
            border-2
            shadow-2xl
            bg-zinc-950/40
          "
          style={{
            borderColor: hexToRgba(themeColor, 0.3),
          }}
        >
          
          <div
            ref={imgWrapperRef}
            className="
              absolute
              inset-0
              will-change-transform
              transition-transform
              duration-300
              ease-out
              flex
              items-center
              justify-center
            "
            style={{
              transform: "scale(1)",
            }}
          >
            {project.banner_image ? (
              <Image
                src={project.banner_image}
                alt={project.alt || project.title || "Project Banner"}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-88
                "
                priority={index < 2}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/80 text-zinc-400 p-6 text-center">
                <svg
                  className="w-10 h-10 mb-2 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-zinc-400">
                  No image uploaded
                </span>
              </div>
            )}

            {project.title && (
              <div className="  absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-15">
                <h3
                  className="
                    bg-black/80
                    backdrop-blur-md
                    px-5
                    py-1.5
                    rounded-full
                    inline-block
                    text-white
                    text-base
                    md:text-lg
                    lg:text-xl
                    font-medium
                    text-center
                    border
                    border-zinc-800
                    drop-shadow-lg
                  "
                >
                  {project.title}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;