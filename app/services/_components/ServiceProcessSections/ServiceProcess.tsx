// "use client";
// import Image from 'next/image';
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { ServiceProcessData } from '../../_data/types';
// import ProcessConnector from './ProcessConnector';
// import ProcessStepCard from './ProcessStepCard';

// interface Props {
//   data?: ServiceProcessData;
//   themeColor?: string;
// }

// const hexToRgba = (hex: string, alpha: number) => {
//   try {
//     const clean = hex.replace("#", "");
//     const r = parseInt(clean.substring(0, 2), 16);
//     const g = parseInt(clean.substring(2, 4), 16);
//     const b = parseInt(clean.substring(4, 6), 16);
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   } catch (e) {
//     return `rgba(164, 97, 255, ${alpha})`;
//   }
// };

// // Layout constants — must match the Tailwind classes used below
// const CARD_HEIGHT = 186; // h-[186px]
// const CARD_GAP = 16; // gap-4
// const LINE_X = 20; // left-[20px] (vertical core line, relative to the stack container)
// const BRANCH_X = 76; // how far the branch reaches to the RIGHT of the core line — slightly
// // past the card's left edge (60px) so the rounded tip fully closes the gap, no visible gap.
// const CORNER_RADIUS = 28; // px, rounds every turn in the connector

// // How much extra scroll distance (in viewport heights) is "consumed" while the
// // connector draws/undraws. The section stays pinned during this distance, and
// // the next page only becomes visible once progress reaches 1.
// const SCROLL_DISTANCE_VH = 1; // 1 = 100vh of extra scroll

// interface Point {
//   x: number;
//   y: number;
// }

// interface LinePath {
//   d: string;
//   width: number;
//   height: number;
// }

// // Converts a list of straight-line vertices into a path where every corner
// // is replaced with a smooth rounded curve.
// const roundedPathFromPoints = (points: Point[], radius: number): string => {
//   // Drop consecutive duplicate points (can happen where segments meet)
//   const pts = points.filter((p, i) => i === 0 || p.x !== points[i - 1].x || p.y !== points[i - 1].y);
//   if (pts.length === 0) return '';
//   if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

//   let d = `M ${pts[0].x} ${pts[0].y}`;

//   for (let i = 1; i < pts.length - 1; i++) {
//     const prev = pts[i - 1];
//     const curr = pts[i];
//     const next = pts[i + 1];

//     const d1 = Math.hypot(curr.x - prev.x, curr.y - prev.y);
//     const d2 = Math.hypot(next.x - curr.x, next.y - curr.y);
//     const r = Math.min(radius, d1 / 2, d2 / 2);

//     const p1x = d1 === 0 ? curr.x : curr.x + (prev.x - curr.x) * (r / d1);
//     const p1y = d1 === 0 ? curr.y : curr.y + (prev.y - curr.y) * (r / d1);
//     const p2x = d2 === 0 ? curr.x : curr.x + (next.x - curr.x) * (r / d2);
//     const p2y = d2 === 0 ? curr.y : curr.y + (next.y - curr.y) * (r / d2);

//     d += ` L ${p1x} ${p1y} Q ${curr.x} ${curr.y} ${p2x} ${p2y}`;
//   }

//   const last = pts[pts.length - 1];
//   d += ` L ${last.x} ${last.y}`;

//   return d;
// };

// const ServiceProcess = ({ data, themeColor = "#A461FF" }: Props) => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const boxRef = useRef<HTMLDivElement>(null);
//   const stackRef = useRef<HTMLDivElement>(null);

//   const [progress, setProgress] = useState(1);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [linePath, setLinePath] = useState<LinePath>({ d: '', width: 0, height: 0 });
//   const [activeCards, setActiveCards] = useState<{ [key: number]: boolean }>({});

//   const steps = data?.steps ?? [];
//   const stepsCount = steps.length;

//   // Mobile scroll animation logic
//   useEffect(() => {
//     if (isDesktop) return;

//     const stack = stackRef.current;
//     if (!stack || stepsCount === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("visible");
//             const idxAttr = entry.target.getAttribute("data-index");
//             if (idxAttr !== null) {
//               const index = Number(idxAttr);
//               setActiveCards((prev) => ({ ...prev, [index]: true }));
//             }
//           }
//         });
//       },
//       {
//         rootMargin: "0px 0px -15% 0px", // Trigger when the card is 15% inside viewport
//         threshold: 0.15,
//       }
//     );

//     const children = Array.from(stack.children);
//     children.forEach((child) => observer.observe(child));

//     return () => observer.disconnect();
//   }, [isDesktop, stepsCount]);

//   // Determine desktop status based on window viewport size
//   useEffect(() => {
//     const checkDesktop = () => {
//       const desktop = window.innerWidth >= 1024;
//       setIsDesktop(desktop);
//       if (!desktop) {
//         setProgress(1);
//       }
//     };
//     checkDesktop();
//     window.addEventListener('resize', checkDesktop);
//     return () => window.removeEventListener('resize', checkDesktop);
//   }, []);

//   // Total height of the stacked cards column
//   const stackHeight = useMemo(() => {
//     if (stepsCount === 0) return 0;
//     return CARD_HEIGHT + (stepsCount - 1) * (CARD_HEIGHT + CARD_GAP);
//   }, [stepsCount]);

//   // Measure layout and build the connector path dynamically from DOM card positions
//   useEffect(() => {
//     if (!isDesktop) return;

//     const measure = () => {
//       const wrapper = wrapperRef.current;
//       const box = boxRef.current;
//       const stack = stackRef.current;
//       if (!wrapper || !box || !stack || stepsCount === 0) return;

//       const wrapperRect = wrapper.getBoundingClientRect();
//       const boxRect = box.getBoundingClientRect();
//       const stackRect = stack.getBoundingClientRect();

//       const startX = boxRect.right - wrapperRect.left;
//       const startY = boxRect.top + boxRect.height / 2 - wrapperRect.top;

//       const lineX = stackRect.left - wrapperRect.left + LINE_X;

//       const firstCardEl = stack.children[0] as HTMLElement;
//       if (!firstCardEl) return;
//       const firstCardRect = firstCardEl.getBoundingClientRect();
//       const yTop = (firstCardRect.top + firstCardRect.height / 2) - wrapperRect.top;

//       const points: Point[] = [
//         { x: startX, y: startY },
//         { x: lineX, y: startY },
//         { x: lineX, y: yTop },
//       ];

//       for (let i = 0; i < stepsCount; i++) {
//         const cardEl = stack.children[i] as HTMLElement;
//         if (!cardEl) continue;
//         const cardRect = cardEl.getBoundingClientRect();

//         const cy = (cardRect.top + cardRect.height / 2) - wrapperRect.top;
//         const branchX = cardRect.left - wrapperRect.left;

//         if (i > 0) {
//           points.push({ x: lineX, y: cy });
//         }
//         points.push({ x: branchX, y: cy });
//         points.push({ x: lineX, y: cy });
//       }

//       const d = roundedPathFromPoints(points, CORNER_RADIUS);

//       setLinePath({ d, width: wrapperRect.width, height: wrapperRect.height });
//     };

//     const resizeObserver = new ResizeObserver(() => {
//       measure();
//     });

//     if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
//     if (stackRef.current) resizeObserver.observe(stackRef.current);

//     measure();
//     window.addEventListener('resize', measure);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener('resize', measure);
//     };
//   }, [stepsCount, isDesktop]);

//   // Pinned-scroll progress: 0 = nothing connected, 1 = fully connected.
//   // The section is taller than the viewport by SCROLL_DISTANCE_VH (see spacer below),
//   // and its content is sticky, so the section stays in view for that extra distance
//   // while progress goes 0 -> 1. Scrolling back up reverses it smoothly (1 -> 0).
//   useEffect(() => {
//     if (!isDesktop) return;

//     let raf = 0;

//     const update = () => {
//       raf = 0;
//       const section = sectionRef.current;
//       if (!section) return;

//       const rect = section.getBoundingClientRect();
//       const extra = window.innerHeight * SCROLL_DISTANCE_VH;

//       // rect.top === 0  -> progress 0 (just reached the pinned section)
//       // rect.top === -extra -> progress 1 (fully scrolled through the pin distance)
//       let p = -rect.top / extra;
//       p = Math.min(1, Math.max(0, p));
//       setProgress(p);
//     };

//     const onScroll = () => {
//       if (raf) return;
//       raf = requestAnimationFrame(update);
//     };

//     update();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     window.addEventListener('resize', onScroll);

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('resize', onScroll);
//       if (raf) cancelAnimationFrame(raf);
//     };
//   }, [isDesktop]);

//   if (!data || stepsCount === 0) return null;

//   return (
//     <section ref={sectionRef} className="relative w-full bg-black">

//       {/* Pinned viewport-height stage: stays in view while the connector draws on Desktop, normal flow on Mobile */}
//       <div className={`${isDesktop ? 'sticky top-0 min-h-screen' : 'relative py-16'} w-full text-white px-4 md:px-12 flex justify-center items-center`}>

//         {/* ================= BACKGROUND GLOWS ================= */}
//         {/* Background UI: Left Purple Glow */}
//         <div
//           className="absolute -left-[200px] top-[100px] w-[600px] h-[400px] rounded-full opacity-40 blur-[150px] pointer-events-none"
//           style={{ background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.4)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)` }}
//         />
//         {/* =================================================== */}

//         {/* Container holding the layout parts together smoothly */}
//         <div ref={wrapperRef} className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20 relative z-10">

//           {/* Animated glowing connector line component */}
//           {isDesktop && (
//             <ProcessConnector linePath={linePath} progress={progress} themeColor={themeColor} />
//           )}

//           {/* LEFT SIDE: Heading & Gamepad Container Frame */}
//           <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-36 h-fit z-10 pl-0 lg:pl-20">
//             <h2 className="heading mb-10 text-white">
//               Our <span className="inline" style={{ color: themeColor }}>Process</span>
//             </h2>

//             {/* EXACT FIGMA SPEC: 280px * 409px Outer Frame Glass container */}
//             <div ref={boxRef} className="relative w-[280px] md:h-[409px] bg-[#0A0A0E]/60 rounded-3xl border border-zinc-900 flex items-center justify-center overflow-visible">

//               {/* Smooth Radial Center Violet Ambient Glow */}
//               <div
//                 className="absolute w-[180px] h-[180px] rounded-full blur-[60px] pointer-events-none"
//                 style={{ backgroundColor: hexToRgba(themeColor, 0.1) }}
//               />

//               {/* Centered Neon Gamepad Graphic */}
//               <div
//                 className="relative w-36 h-36 filter"
//                 style={{ filter: `drop-shadow(0 0 25px ${hexToRgba(themeColor, 0.55)})` }}
//               >
//                 {data.main_icon && (
//                   <Image
//                     src={data.main_icon}
//                     alt="Process Controller Icon"
//                     fill
//                     className="object-contain"
//                     priority
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE: Timeline Steps Stack Frame */}
//           <div ref={stackRef} className="relative flex flex-col items-center lg:items-start gap-4 py-2 w-full lg:w-[700px] pl-0 lg:pl-20">

//             {steps.map((step, index) => {
//               const isActive = isDesktop
//                 ? progress * stepsCount >= index + 0.5
//                 : !!activeCards[index];
//               return (
//                 <div
//                   key={step.id}
//                   data-index={index}
//                   className={isDesktop
//                     ? "w-full"
//                     : "w-full transition-all duration-700 ease-out translate-y-10 opacity-0 [&.visible]:translate-y-0 [&.visible]:opacity-100 mobile-step"
//                   }
//                 >
//                   <ProcessStepCard
//                     step={step}
//                     isActive={isActive}
//                     themeColor={themeColor}
//                   />
//                 </div>
//               );
//             })}

//           </div>

//         </div>
//       </div>

//       {/* Scroll-distance spacer: consumed while the connector draws/undraws.
//           Must stay in sync with SCROLL_DISTANCE_VH above. */}
//       {isDesktop && (
//         <div style={{ height: `${SCROLL_DISTANCE_VH * 100}vh` }} aria-hidden="true" />
//       )}
//     </section>
//   );
// };

// export default ServiceProcess;
"use client";
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { ServiceProcessData } from '../../_data/types';
import ProcessConnector from './ProcessConnector';
import ProcessStepCard from './ProcessStepCard';

interface Props {
  data?: ServiceProcessData;
  themeColor?: string;
  serviceSlug?: string;
}

const SERVICE_PROCESS_ICONS: Record<string, string> = {
  // Development & Software
  'web-development': 'lucide:globe',
  'app-development': 'lucide:smartphone',
  'game-development': 'lucide:gamepad-2',
  'digital-marketing': 'lucide:trending-up',

  // Data & Cloud
  'customer-relationship-management': 'lucide:users-round',
  'enterprise-resource-planning': 'lucide:boxes',
  'identity-and-access-management': 'lucide:shield-check',
  'server-management': 'lucide:server',

  // Immersive Tech
  '3d-services': 'lucide:box',
  'augmented-reality': 'lucide:scan',
  'virtual-reality': 'lucide:headset',
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

// Layout constants — must match the Tailwind classes used below
const CARD_HEIGHT = 186; // h-[186px]
const CARD_GAP = 16; // gap-4
const LINE_X = -30; // left of the stack container so spine line runs outside cards
const BRANCH_X = 76; // how far the branch reaches to the RIGHT of the core line — slightly
// past the card's left edge (60px) so the rounded tip fully closes the gap, no visible gap.
const CORNER_RADIUS = 28; // px, controls how gradual each branch's bend looks

// How much extra scroll distance (in viewport heights) is "consumed" while the
// connector draws/undraws. The section stays pinned during this distance, and
// the next page only becomes visible once progress reaches 1.
const SCROLL_DISTANCE_VH = 1; // 1 = 100vh of extra scroll

interface LinePath {
  trunkD: string;
  branchesD: string;
  width: number;
  height: number;
}

interface CardAnchor {
  cy: number;
  branchX: number;
}

const buildConnectorPath = (
  startX: number,
  startY: number,
  lineX: number,
  cards: CardAnchor[],
  radius: number
): { trunkD: string; branchesD: string } => {
  if (cards.length === 0) return { trunkD: '', branchesD: '' };

  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];

  const r0 = cards.length > 1
    ? Math.max(0, Math.min(radius, (cards[1].cy - cards[0].cy) / 2))
    : radius;
  const rLast = cards.length > 1
    ? Math.max(0, Math.min(radius, (cards[cards.length - 1].cy - cards[cards.length - 2].cy) / 2))
    : radius;

  const topY = firstCard.cy < startY ? firstCard.cy + r0 : startY;
  const bottomY = lastCard.cy > startY ? lastCard.cy - rLast : startY;

  // 1. Horizontal trunk from Gamepad box to vertical spine line
  const trunkD = `M ${startX} ${startY} L ${lineX} ${startY}`;

  // 2. Main vertical spine line connecting from the top curve start to bottom curve start
  let branchesD = `M ${lineX} ${topY} L ${lineX} ${bottomY}`;

  // 3. Smooth curved branches flowing into each card node dot
  cards.forEach((card, i) => {
    const gapAbove = i === 0 ? Infinity : cards[i].cy - cards[i - 1].cy;
    const gapBelow = i === cards.length - 1 ? Infinity : cards[i + 1].cy - cards[i].cy;
    const r = Math.max(0, Math.min(radius, gapAbove / 2, gapBelow / 2));

    if (Math.abs(card.cy - startY) < 10) {
      // Middle card aligned with main horizontal trunk
      branchesD += ` M ${lineX} ${card.cy} L ${card.branchX} ${card.cy}`;
    } else if (card.cy < startY) {
      // Cards ABOVE main trunk: curve flows UP from spine into card node
      branchesD += ` M ${lineX} ${card.cy + r} Q ${lineX} ${card.cy} ${card.branchX} ${card.cy}`;
    } else {
      // Cards BELOW main trunk: curve flows DOWN from spine into card node
      branchesD += ` M ${lineX} ${card.cy - r} Q ${lineX} ${card.cy} ${card.branchX} ${card.cy}`;
    }
  });

  return { trunkD, branchesD };
};

const ServiceProcess = ({ data, themeColor = "#A461FF", serviceSlug }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [linePath, setLinePath] = useState<LinePath>({ trunkD: '', branchesD: '', width: 0, height: 0 });
  const [activeCards, setActiveCards] = useState<{ [key: number]: boolean }>({});

  const steps = data?.steps ?? [];
  const stepsCount = steps.length;

  const selectedIcon = serviceSlug ? SERVICE_PROCESS_ICONS[serviceSlug.toLowerCase().trim()] : null;
  const isCustomUpload = typeof data?.main_icon === 'string' && (data.main_icon.startsWith('http') || data.main_icon.startsWith('/media'));

  // Mobile scroll animation logic
  useEffect(() => {
    if (isDesktop) return;

    const stack = stackRef.current;
    if (!stack || stepsCount === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            const idxAttr = entry.target.getAttribute("data-index");
            if (idxAttr !== null) {
              const index = Number(idxAttr);
              setActiveCards((prev) => ({ ...prev, [index]: true }));
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -15% 0px", // Trigger when the card is 15% inside viewport
        threshold: 0.15,
      }
    );

    const children = Array.from(stack.children);
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [isDesktop, stepsCount]);

  // Determine desktop status based on window viewport size
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (!desktop) {
        setProgress(1);
      }
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Total height of the stacked cards column
  const stackHeight = useMemo(() => {
    if (stepsCount === 0) return 0;
    return CARD_HEIGHT + (stepsCount - 1) * (CARD_HEIGHT + CARD_GAP);
  }, [stepsCount]);

  // Measure layout and build the connector path dynamically from DOM card positions
  useEffect(() => {
    if (!isDesktop) return;

    const measure = () => {
      const wrapper = wrapperRef.current;
      const box = boxRef.current;
      const stack = stackRef.current;
      if (!wrapper || !box || !stack || stepsCount === 0) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const stackRect = stack.getBoundingClientRect();

      const startX = boxRect.right - wrapperRect.left;
      const startY = boxRect.top + boxRect.height / 2 - wrapperRect.top;

      const lineX = stackRect.left - wrapperRect.left + LINE_X;

      const cards: CardAnchor[] = [];
      for (let i = 0; i < stepsCount; i++) {
        const cardEl = stack.children[i] as HTMLElement;
        if (!cardEl) continue;
        const cardRect = cardEl.getBoundingClientRect();
        const cy = (cardRect.top + cardRect.height / 2) - wrapperRect.top;
        const branchX = cardRect.left - wrapperRect.left;
        cards.push({ cy, branchX });
      }

      const { trunkD, branchesD } = buildConnectorPath(startX, startY, lineX, cards, CORNER_RADIUS);

      setLinePath({ trunkD, branchesD, width: wrapperRect.width, height: wrapperRect.height });
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    if (stackRef.current) resizeObserver.observe(stackRef.current);

    measure();
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stepsCount, isDesktop]);

  // Pinned-scroll progress: 0 = nothing connected, 1 = fully connected.
  // The section is taller than the viewport by SCROLL_DISTANCE_VH (see spacer below),
  // and its content is sticky, so the section stays in view for that extra distance
  // while progress goes 0 -> 1. Scrolling back up reverses it smoothly (1 -> 0).
  useEffect(() => {
    if (!isDesktop) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const extra = window.innerHeight * SCROLL_DISTANCE_VH;

      // rect.top === 0  -> progress 0 (just reached the pinned section)
      // rect.top === -extra -> progress 1 (fully scrolled through the pin distance)
      let p = -rect.top / extra;
      p = Math.min(1, Math.max(0, p));
      setProgress(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  if (!data || stepsCount === 0) return null;

  return (
    <section ref={sectionRef} className="relative w-full bg-black">

      {/* Pinned viewport-height stage: stays in view while the connector draws on Desktop, normal flow on Mobile */}
      <div className={`${isDesktop ? 'sticky top-0 min-h-screen' : 'relative py-16'} container text-white flex justify-center items-center`}>

        {/* ================= BACKGROUND GLOWS ================= */}
        {/* Background UI: Left Purple Glow */}
        <div
          className="absolute -left-[200px] top-[100px] w-[600px] h-[400px] rounded-full opacity-40 blur-[150px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${hexToRgba(themeColor, 0.4)} 0%, ${hexToRgba(themeColor, 0.1)} 100%)` }}
        />
        {/* =================================================== */}

        {/* Container holding the layout parts together smoothly */}
        <div ref={wrapperRef} className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-16 relative z-10">

          {/* Animated glowing connector line component */}
          {isDesktop && (
            <ProcessConnector linePath={linePath} progress={progress} themeColor={themeColor} />
          )}

          {/* LEFT SIDE: Heading & Gamepad Container Frame */}
          <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-36 h-fit z-10 pl-0">
            <h2 className="heading mb-10 text-white">
              Our <span className="inline" style={{ color: themeColor }}>Process</span>
            </h2>

            {/* EXACT FIGMA SPEC: 280px * 409px Outer Frame Glass container */}
            <div ref={boxRef} className="relative w-[280px] md:h-[409px] bg-[#0A0A0E]/60 rounded-3xl border border-zinc-900 flex items-center justify-center overflow-visible">

              {/* Smooth Radial Center Violet Ambient Glow */}
              <div
                className="absolute w-[180px] h-[180px] rounded-full blur-[60px] pointer-events-none"
                style={{ backgroundColor: hexToRgba(themeColor, 0.1) }}
              />

              {/* Centered Neon Service Graphic */}
              <div
                className="relative w-36 h-36 flex items-center justify-center filter transition-transform duration-500 hover:scale-105"
                style={{ filter: `drop-shadow(0 0 25px ${hexToRgba(themeColor, 0.6)})` }}
              >
                {isCustomUpload ? (
                  <Image
                    src={data!.main_icon}
                    alt="Process Icon"
                    fill
                    className="object-contain"
                    priority
                  />
                ) : selectedIcon ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      icon={selectedIcon}
                      className="w-24 h-24 stroke-[1.25]"
                      style={{
                        color: themeColor,
                      }}
                    />
                  </div>
                ) : data?.main_icon ? (
                  <Image
                    src={data.main_icon}
                    alt="Process Controller Icon"
                    fill
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      icon="lucide:sparkles"
                      className="w-24 h-24 stroke-[1.25]"
                      style={{
                        color: themeColor,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Timeline Steps Stack Frame */}
          <div ref={stackRef} className="relative flex flex-col items-center lg:items-start gap-4 py-2 w-full lg:w-[620px] pl-0">

            {steps.map((step, index) => {
              const isActive = isDesktop
                ? progress * stepsCount >= index + 0.5
                : !!activeCards[index];
              return (
                <div
                  key={step.id}
                  data-index={index}
                  className={isDesktop
                    ? "w-full"
                    : "w-full transition-all duration-700 ease-out translate-y-10 opacity-0 [&.visible]:translate-y-0 [&.visible]:opacity-100 mobile-step"
                  }
                >
                  <ProcessStepCard
                    step={step}
                    isActive={isActive}
                    themeColor={themeColor}
                    serviceSlug={serviceSlug}
                    stepIndex={index}
                  />
                </div>
              );
            })}

          </div>

        </div>
      </div>

      {/* Scroll-distance spacer: consumed while the connector draws/undraws.
          Must stay in sync with SCROLL_DISTANCE_VH above. */}
      {isDesktop && (
        <div style={{ height: `${SCROLL_DISTANCE_VH * 100}vh` }} aria-hidden="true" />
      )}
    </section>
  );
};

export default ServiceProcess;