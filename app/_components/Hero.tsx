
"use client";

import Image from "next/image";
import { serviceIcons } from "./data";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RotatingText from "@/src/components/RotatingText";

const ROTATING_WORDS = ["Vision", "Creation", "Possibility ", "Innovation !"];

const GRID_SIZES = { xsm: 60, md: 80, lg: 90 } as const;
const ICON_SIZES = { xsm: 55, md: 70, lg: 80 } as const;
const CENTER_MARGIN = 0.32;

function getSizes(width: number) {
  if (width < 480) return { grid: GRID_SIZES.xsm, icon: ICON_SIZES.xsm };
  if (width < 1024) return { grid: GRID_SIZES.md, icon: ICON_SIZES.md };
  return { grid: GRID_SIZES.lg, icon: ICON_SIZES.lg };
}

function getIconCount(width: number) {
  const baseCount = width < 480 ? 3 : 4;
  return baseCount + Math.floor(Math.random() * 3); // 3-5 for mobile, 4-6 for desktop
}

function isOutsideCenter(col: number, row: number, cols: number, rows: number): boolean {
  const centerCol = cols / 2;
  const centerRow = rows / 2;
  const marginCol = cols * CENTER_MARGIN;
  const marginRow = rows * CENTER_MARGIN;
  const inCenterX = col >= centerCol - marginCol && col <= centerCol + marginCol;
  const inCenterY = row >= centerRow - marginRow && row <= centerRow + marginRow;
  return !(inCenterX && inCenterY);
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type ServiceIcon = (typeof serviceIcons)[number];

function Hero() {
  const [positions, setPositions] = useState<{ left: number; top: number }[]>([]);
  const [displayedIcons, setDisplayedIcons] = useState<ServiceIcon[]>([]);
  const [sizes, setSizes] = useState<{ grid: number; icon: number }>({ grid: GRID_SIZES.lg, icon: ICON_SIZES.lg });
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const shuffleRef = useRef<() => void>(() => {});

  useEffect(() => {

const update = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const { grid, icon } = getSizes(w);
  const count = getIconCount(w);

  setSizes((s) =>
    s.grid === grid && s.icon === icon ? s : { grid, icon }
  );

  const cols = Math.max(2, Math.floor(w / grid));
  const rows = Math.max(2, Math.floor(h / grid));

  const cells: { col: number; row: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isOutsideCenter(c, r, cols, rows)) {
        cells.push({ col: c, row: r });
      }
    }
  }

  const padding = (grid - icon) / 2;
  const numIcons = Math.min(count, cells.length);

  function isAdjacent(a: { col: number; row: number }, b: { col: number; row: number }) {
    const sameRowOrCol = a.col === b.col || a.row === b.row;
    const adjacent = Math.abs(a.col - b.col) <= 1 && Math.abs(a.row - b.row) <= 1;
    return sameRowOrCol || adjacent;
  }

  function pickNonAdjacentCells(
    cells: { col: number; row: number }[],
    count: number
  ) {
    const shuffled = shuffle(cells);
    const selected: { col: number; row: number }[] = [];

    for (const cell of shuffled) {
      const isTooClose = selected.some((s) =>
        isAdjacent(s, cell)
      );
      if (!isTooClose) {
        selected.push(cell);
      }
      if (selected.length === count) break;
    }

    return selected;
  }

  const picked = pickNonAdjacentCells(cells, numIcons);

  setPositions(
    picked.map(({ col, row }) => ({
      left: col * grid + padding,
      top: row * grid + padding,
    }))
  );

  const getColorGroup = (hex: string) => {
    const h = hex.toUpperCase();
    if (["#1316D2", "#2600E5", "#661BCB"].includes(h)) return 1; // Dark blues/violet
    if (["#1AA8CB", "#00C7E5"].includes(h)) return 2; // Light blues
    if (["#CB1A8C", "#E500CB", "#CB1A1A"].includes(h)) return 3; // Pinks/Reds
    if (["#E57A00", "#FDCC26"].includes(h)) return 4; // Orange/Yellow
    return 5; // Green
  };

  const pickedIcons: ServiceIcon[] = [];
  const usedGroups = new Set<number>();
  for (const icon of shuffle([...serviceIcons])) {
    const group = getColorGroup(icon.hex);
    if (!usedGroups.has(group)) {
      usedGroups.add(group);
      pickedIcons.push(icon);
    }
    if (pickedIcons.length === numIcons) break;
  }
  // Fallback in case we need more icons than available groups
  if (pickedIcons.length < numIcons) {
    for (const icon of shuffle([...serviceIcons])) {
      if (!pickedIcons.some((p) => p.hex === icon.hex)) {
        pickedIcons.push(icon);
      }
      if (pickedIcons.length === numIcons) break;
    }
  }

  setDisplayedIcons(shuffle(pickedIcons));
};
    shuffleRef.current = update;
    update();
    // const picked = pickNonAdjacentCells(cells, numIcons);
    const onResize = () => requestAnimationFrame(update);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // useEffect(() => {
  //   const container = iconContainerRef.current;
  //   if (!container || !positions.length) return;

  //   const icons = Array.from(container.children) as HTMLElement[];
  //   if (!icons.length) return;
  // const isMobile = window.innerWidth < 480;
  // const holdDelay = isMobile ? "+=3.5" : "+=2";
  // const inStagger = isMobile ? 0.2 : 0.15;
  // const outStagger = isMobile ? 0.15 : 0.1;

  // gsap.killTweensOf(icons);
  // let cancelled = false;

  //   const run = () => {
  //     const tl = gsap.timeline({ onComplete: run });
  //     tl.to(icons, {
  //       opacity: 1,
  //       scale: 1,
  //       duration: 0.6,
  //       // stagger: 0.15,
  //       stagger: inStagger,
  //       ease: "back.out(1.4)",
  //     })
  //       .to(
  //         icons,
  //         {
  //           opacity: 0,
  //           scale: 0,
  //           duration: 0.4,
  //           stagger: 0.1,
  //           ease: "power2.in",
  //         },
  //         // "+=2"
  //          holdDelay
  //       )
  //       .call(() => shuffleRef.current());
  //   };

  //   gsap.set(icons, { opacity: 0, scale: 0 });
  //   run();

  //   return () => gsap.killTweensOf(icons);
  // }, [positions]);
useEffect(() => {
  const container = iconContainerRef.current;
  if (!container || !positions.length) return;

  const icons = Array.from(container.children) as HTMLElement[];
  if (!icons.length) return;

  const isMobile = window.innerWidth < 480;
  const holdDelay = isMobile ? "+=3.5" : "+=2";
  const inStagger = isMobile ? 0.2 : 0.15;
  const outStagger = isMobile ? 0.15 : 0.1;

  gsap.killTweensOf(icons);
  let cancelled = false;

  const tl = gsap.timeline({
    onComplete: () => {
      if (!cancelled) {
        // Small timeout lets React re-render before next cycle starts
        setTimeout(() => {
          if (!cancelled) shuffleRef.current();
        }, 80);
      }
    },
  });

  tl.set(icons, { opacity: 0, scale: 0 })
    .to(icons, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: { each: inStagger, from: "random" },
      ease: "back.out(1.4)",
    })
    .to(
      icons,
      {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: { each: outStagger, from: "random" },
        ease: "power2.in",
      },
      holdDelay
    );

  return () => {
    cancelled = true;
    tl.kill();
  };
}, [positions]);

  return (
    <section className="relative w-full min-h-screen grid-bg grid-bg-hero grid-glow overflow-hidden">
      <div ref={iconContainerRef} className="absolute inset-0 pointer-events-none">
        {displayedIcons.map((icon, i) => {
          const pos = positions[i];
          if (!pos) return null;
          const iconPx = sizes.icon;
          const imgSize = Math.round(iconPx * 0.38);
          return (
            <div
              key={`${pos.left}-${pos.top}-${i}`}
              className="absolute flex items-center justify-center opacity-0 scale-0 origin-center"
              style={{
                left: pos.left,
                top: pos.top,
                width: iconPx,
                height: iconPx,
              }}
            >
              <div
                className="p-2 flex rounded items-center justify-center"
                style={{
                  width: iconPx,
                  height: iconPx,
                  background: icon.hex,
                  boxShadow: `0 0 ${iconPx > 60 ? 25 : 16}px ${icon.hex}`,
                }}
              >
                <Image
                  src={icon.icon}
                  alt=""
                  width={imgSize}
                  height={imgSize}
                  className="pointer-events-none select-none w-auto h-auto"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative h-screen flex flex-col items-center justify-center">
        <div className="relative inline-flex flex-col items-center justify-center">
          <div
            className="absolute inset-0 rounded-lg h-full w-full bg-[radial-gradient(126.22%_126.22%_at_50%_50%,#050505_0%,rgba(5,5,5,0)_100%)] blur-[36px] z-0"
            aria-hidden
          />
          <div className="layout-band relative z-10 flex flex-col items-center justify-center text-white gap-3 sm:gap-4 pb-32 text-center">
            <h1 className="heading max-w-xl">Engineer the Future. Innovate the</h1>
            <div className="inline-block border border-white/30 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl rotate-[4deg] my-2 sm:my-4">
              <RotatingText
                texts={ROTATING_WORDS}
                mainClassName="font-outfit text-4xl md:text-5xl lg:text-6xl tracking-wider sm:tracking-widest text-white min-w-[4ch]"
                staggerFrom="last"
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                rotationInterval={2000}
                duration={0.45}
                ease="back.out(1.2)"
                animateInitial
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
