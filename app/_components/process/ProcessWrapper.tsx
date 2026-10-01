// "use client";

// import { useRef } from "react";
// import DesktopProcess from "./DesktopProcess";
// import { useResponsive } from "../../../src/hooks/useResponsive";


// export default function ProcessWrapper() {
//     const containerRef = useRef<HTMLElement | null>(null);

//     const { isMobile, radius, viewportWidth } = useResponsive();

//     if (isMobile === null) return null;

//     return (
//         <section
//             ref={containerRef}
//             className="container mx-auto relative w-full text-white flex flex-col items-center py-16 pt-30"
//         >
//             {/* Header */}
//             <div
//                 className="uppercase text-left z-10 w-full"
//             >
//                 <p className=" text-xs sm:text-sm heading  uppercase mb-2">
//                     Our Process
//                 </p>
//             </div>

//             <DesktopProcess
//                 containerRef={containerRef}
//                 radius={radius}
//                 viewportWidth={viewportWidth}
//             />
//         </section>
//     );
// }

// ProcessWrapper.tsx
"use client";

import { useRef } from "react";
import DesktopProcess from "./DesktopProcess";
import { useResponsive } from "../../../src/hooks/useResponsive";

export default function ProcessWrapper() {
    const containerRef = useRef<HTMLElement | null>(null);
    const { isMobile, radius, viewportWidth } = useResponsive();

    if (isMobile === null) return null;

    return (
        // ── The section is NOT pinned. It just provides normal flow height.
        // GSAP pins the inner wrapper div inside DesktopProcess.
        <section
            ref={containerRef}
            className="relative w-full text-white"
            // Remove py-16 pt-30 from here — vertical padding on a pinned
            // parent confuses ScrollTrigger's height calculations.
            // Add padding to a sibling div above/below instead.
        >
            {/* Header - positioned absolutely so it stays visible during the pinned SVG animation */}
            <div className="absolute top-0 left-0 w-full z-20 pt-28 px-4 md:px-8 lg:px-[80px] pointer-events-none">
                <div className="text-left w-full">
                    <h2 className="heading text-white mb-2">
                        Our Process
                    </h2>
                </div>
            </div>

            {/* Spacer to push SVG content below the header */}
            <div className="pt-30" />

            <DesktopProcess
                containerRef={containerRef}
                radius={radius}
                viewportWidth={viewportWidth}
            />
        </section>
    );
}
