"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useMemo } from "react";
import { clientsData, internationalClientsData } from "../data/clientsData";

function OurClients() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const directionRef = useRef<number>(-1);
  const pos1Ref = useRef<number>(0);
  const pos2Ref = useRef<number>(0);
  const pos3Ref = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);

  const { row2, row3 } = useMemo(() => {
    const half = Math.ceil(clientsData.length / 2);
    return {
      row2: clientsData.slice(0, half),
      row3: clientsData.slice(half),
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      directionRef.current = currentY > lastScrollY.current ? -1 : 1;
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      const speed1 = 0.8;
      const speed2 = 1.1;
      const speed3 = 0.9;

      // ROW 1 - International Clients
      if (row1Ref.current) {
        const w1 = row1Ref.current.scrollWidth / 4;
        pos1Ref.current += directionRef.current * speed1;
        if (pos1Ref.current <= -w1) pos1Ref.current += w1;
        if (pos1Ref.current >= 0) pos1Ref.current -= w1;
        row1Ref.current.style.transform = `translate3d(${pos1Ref.current}px,0,0)`;
      }

      // ROW 2 - Clients Group 1 (opposite direction)
      if (row2Ref.current) {
        const w2 = row2Ref.current.scrollWidth / 4;
        pos2Ref.current += -directionRef.current * speed2;
        if (pos2Ref.current <= -w2) pos2Ref.current += w2;
        if (pos2Ref.current >= 0) pos2Ref.current -= w2;
        row2Ref.current.style.transform = `translate3d(${pos2Ref.current}px,0,0)`;
      }

      // ROW 3 - Clients Group 2
      if (row3Ref.current) {
        const w3 = row3Ref.current.scrollWidth / 4;
        pos3Ref.current += directionRef.current * speed3;
        if (pos3Ref.current <= -w3) pos3Ref.current += w3;
        if (pos3Ref.current >= 0) pos3Ref.current -= w3;
        row3Ref.current.style.transform = `translate3d(${pos3Ref.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const renderRow = (
    logos: StaticImageData[],
    rowRef: React.RefObject<HTMLDivElement | null>
  ) => (
    <div
      ref={rowRef}
      className="flex flex-nowrap will-change-transform w-max min-w-full"
    >
      {/* Repeat x4 to eliminate empty gaps */}
      {[...logos, ...logos, ...logos, ...logos].map((client, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center flex-shrink-0 mx-4"
          style={{ width: 170, height: 85 }}
        >
          <div className="relative w-[150px] aspect-[8/5]">
            <Image
              src={client}
              alt={`Client ${idx + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-10 md:py-16">
      <h2 className="heading text-white px-4 md:px-8 lg:px-[80px] mb-4">
        Our Clients
      </h2>

      <div className="overflow-hidden relative py-6 md:py-8 flex flex-col gap-10 md:gap-14">
        {renderRow(internationalClientsData, row1Ref)}
        {renderRow(row2, row2Ref)}
        {renderRow(row3, row3Ref)}
      </div>
    </div>
  );
}

export default OurClients;
