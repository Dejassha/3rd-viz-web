// "use client";
// import React, { useEffect, useRef } from "react";

// interface LinePath {
//   d: string;
//   width: number;
//   height: number;
// }

// interface ProcessConnectorProps {
//   linePath: LinePath;
//   progress: number;
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

// export default function ProcessConnector({ linePath, progress, themeColor = "#A461FF" }: ProcessConnectorProps) {
//   const pathRef = useRef<SVGPathElement>(null);
//   const glowPathRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     const length = pathRef.current?.getTotalLength() ?? 0;
//     const offset = length * (1 - progress);

//     if (pathRef.current) {
//       pathRef.current.style.strokeDasharray = `${length}`;
//       pathRef.current.style.strokeDashoffset = `${offset}`;
//     }
//     if (glowPathRef.current) {
//       glowPathRef.current.style.strokeDasharray = `${length}`;
//       glowPathRef.current.style.strokeDashoffset = `${offset}`;
//     }
//   }, [progress, linePath.d]);

//   if (!linePath.d) return null;

//   return (
//     <svg
//       className="absolute hidden lg:block pointer-events-none z-0 top-0 left-0"
//       style={{ width: `${linePath.width}px`, height: `${linePath.height}px` }}
//       viewBox={`0 0 ${linePath.width} ${linePath.height}`}
//       preserveAspectRatio="none"
//       fill="none"
//     >
//       <defs>
//         <linearGradient id="processLineGradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor={themeColor} />
//           <stop offset="100%" stopColor={hexToRgba(themeColor, 0.4)} />
//         </linearGradient>
//       </defs>

//       {/* Static faint base line, always visible */}
//       <path d={linePath.d} stroke="rgba(63,63,70,0.8)" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />

//       {/* Soft glow layer beneath the active line */}
//       <path
//         ref={glowPathRef}
//         d={linePath.d}
//         stroke={themeColor}
//         strokeWidth={6}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         opacity={0.45}
//         style={{ filter: 'blur(6px)' }}
//       />

//       {/* Crisp animated active line */}
//       <path
//         ref={pathRef}
//         d={linePath.d}
//         stroke="url(#processLineGradient)"
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         style={{ filter: `drop-shadow(0 0 6px ${hexToRgba(themeColor, 0.9)})` }}
//       />
//     </svg>
//   );
// }
"use client";
import React, { useEffect, useRef } from "react";

interface LinePath {
  trunkD: string;
  branchesD: string;
  width: number;
  height: number;
}

interface ProcessConnectorProps {
  linePath: LinePath;
  progress: number;
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

export default function ProcessConnector({ linePath, progress, themeColor = "#A461FF" }: ProcessConnectorProps) {
  const trunkRef = useRef<SVGPathElement>(null);
  const trunkGlowRef = useRef<SVGPathElement>(null);
  const branchesRef = useRef<SVGPathElement>(null);
  const branchesGlowRef = useRef<SVGPathElement>(null);

  // Progressive 2-phase stroke animation:
  // Phase 1 (progress 0.0 -> 0.25): Center trunk line extends rightward from icon box to spine
  // Phase 2 (progress 0.25 -> 1.0): Spine and branch lines draw outward to connect each card
  const trunkProgress = Math.min(1, Math.max(0, progress / 0.25));
  const branchesProgress = Math.min(1, Math.max(0, (progress - 0.25) / 0.75));

  useEffect(() => {
    // 1. Trunk Path Animation
    const trunkLen = trunkRef.current?.getTotalLength() ?? 0;
    const trunkOffset = trunkLen * (1 - trunkProgress);
    if (trunkRef.current) {
      trunkRef.current.style.strokeDasharray = `${trunkLen}`;
      trunkRef.current.style.strokeDashoffset = `${trunkOffset}`;
    }
    if (trunkGlowRef.current) {
      trunkGlowRef.current.style.strokeDasharray = `${trunkLen}`;
      trunkGlowRef.current.style.strokeDashoffset = `${trunkOffset}`;
    }

    // 2. Branches Path Animation
    const branchesLen = branchesRef.current?.getTotalLength() ?? 0;
    const branchesOffset = branchesLen * (1 - branchesProgress);
    if (branchesRef.current) {
      branchesRef.current.style.strokeDasharray = `${branchesLen}`;
      branchesRef.current.style.strokeDashoffset = `${branchesOffset}`;
    }
    if (branchesGlowRef.current) {
      branchesGlowRef.current.style.strokeDasharray = `${branchesLen}`;
      branchesGlowRef.current.style.strokeDashoffset = `${branchesOffset}`;
    }
  }, [trunkProgress, branchesProgress, linePath.trunkD, linePath.branchesD]);

  if (!linePath.trunkD && !linePath.branchesD) return null;

  return (
    <svg
      className="absolute hidden lg:block pointer-events-none z-20 top-0 left-0"
      style={{ width: `${linePath.width}px`, height: `${linePath.height}px` }}
      viewBox={`0 0 ${linePath.width} ${linePath.height}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="processLineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={themeColor} />
          <stop offset="100%" stopColor={hexToRgba(themeColor, 0.4)} />
        </linearGradient>
      </defs>

      {/* Static faint base line */}
      <path d={linePath.trunkD} stroke="rgba(63,63,70,0.8)" strokeWidth={1} strokeLinejoin="round" strokeLinecap="butt" />
      <path d={linePath.branchesD} stroke="rgba(63,63,70,0.8)" strokeWidth={1} strokeLinejoin="round" strokeLinecap="butt" />

      {/* Soft glow layer */}
      <path
        ref={trunkGlowRef}
        d={linePath.trunkD}
        stroke={themeColor}
        strokeWidth={6}
        strokeLinecap="butt"
        strokeLinejoin="round"
        opacity={0.45}
        style={{ filter: 'blur(6px)' }}
      />
      <path
        ref={branchesGlowRef}
        d={linePath.branchesD}
        stroke={themeColor}
        strokeWidth={6}
        strokeLinecap="butt"
        strokeLinejoin="round"
        opacity={0.45}
        style={{ filter: 'blur(6px)' }}
      />

      {/* Crisp animated active line */}
      <path
        ref={trunkRef}
        d={linePath.trunkD}
        stroke="url(#processLineGradient)"
        strokeWidth={2}
        strokeLinecap="butt"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px ${hexToRgba(themeColor, 0.9)})` }}
      />
      <path
        ref={branchesRef}
        d={linePath.branchesD}
        stroke="url(#processLineGradient)"
        strokeWidth={2}
        strokeLinecap="butt"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px ${hexToRgba(themeColor, 0.9)})` }}
      />
    </svg>
  );
}