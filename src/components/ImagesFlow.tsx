'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image, { type StaticImageData } from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const DEFAULT_POSITIONS = [
  { x: -0.8, y: -0.6 }, { x: 0.7, y: 0.4 }, { x: -0.5, y: 0.7 }, { x: 0.6, y: -0.5 },
  { x: -0.8, y: 0.2 }, { x: 0.8, y: -0.3 }, { x: -0.6, y: -0.8 }, { x: 0.4, y: 0.6 },
  { x: -0.7, y: 0.5 }, { x: 0.5, y: -0.7 }, { x: -0.4, y: -0.4 }, { x: 0.3, y: 0.8 },
  { x: -0.8, y: 0.3 }, { x: 0.6, y: 0.2 }, { x: -0.2, y: -0.7 }, { x: 0.7, y: -0.6 },
  { x: -0.5, y: 0.4 }, { x: 0.4, y: -0.4 }, { x: -0.6, y: 0.6 }, { x: 0.8, y: 0.5 },
  { x: -0.3, y: -0.5 }, { x: 0.5, y: 0.3 }, { x: -0.7, y: -0.2 }, { x: 0.2, y: 0.7 },
  { x: -0.4, y: 0.8 }, { x: 0.6, y: -0.8 }, { x: -0.8, y: 0.1 }, { x: 0, y: 0 },
];

export interface ImagesFlowProps {
  introTitle: string;
  introSubtitle?: string;
  flowText?: string;
  outroTitle: string;
  outroSubtitle?: string;
  images: (string | StaticImageData)[];
  className?: string;
}

const ImagesFlow: React.FC<ImagesFlowProps> = ({
  introTitle,
  introSubtitle,
  flowText = 'Every moment holds a universe waiting to be discovered',
  outroTitle,
  outroSubtitle,
  images,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const update = () =>
      setDimensions({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
      });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);


useEffect(() => {
  const flow = flowRef.current;
  if (!flow || images.length === 0) return;

  // Only select non-last images for 3D animation
  const imgElements = Array.from(
    flow.querySelectorAll<HTMLElement>('.image-flow-item')
  );
  const lastImageEl = flow.querySelector<HTMLElement>('.last-image-item');

  if (imgElements.length === 0) return;

  const isMobile = dimensions.width < 800;
  const spread = isMobile ? 1.5 : 0.7;
  const screenHeight = dimensions.height;
  const screenWidth = dimensions.width;

  const positions = [...DEFAULT_POSITIONS];
  while (positions.length < images.length - 1) {
    positions.push({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
  }

  const initPos = images.slice(0, -1).map(() => ({
    xPercent: -50, yPercent: -50, x: 0, y: 0, z: -1000, scale: 0,
  }));
  const finalPos = images.slice(0, -1).map((_, i) => ({
    xPercent: -50, yPercent: -50,
    x: (positions[i]?.x ?? 0) * screenWidth * spread,
    y: (positions[i]?.y ?? 0) * screenHeight * spread,
    z: 2000,
    scale: 1,
  }));

  imgElements.forEach((el, i) => gsap.set(el, initPos[i]));

  // Last image starts hidden
  if (lastImageEl) {
    gsap.set(lastImageEl, { opacity: 0 });
  }


const st = ScrollTrigger.create({
  trigger: flow,
  start: 'top top',
  end: `+=${screenHeight * 6}px`, // slight increase for slow feel
  pin: true,
  pinSpacing: true,
  scrub: 1.5, // smoother scrub
  onUpdate: (self) => {
    const progress = self.progress;

    // All images animate across 100% — no last image wait
    imgElements.forEach((eachImage, index) => {
      // Evenly space each image across full progress
      const imgDelay = (index / imgElements.length) * 0.6;
      const imgProgress = Math.max(0, Math.min((progress - imgDelay) / 0.4, 1));

      const start = initPos[index];
      const end = finalPos[index];

      gsap.set(eachImage, {
        xPercent: -50,
        yPercent: -50,
        x: gsap.utils.interpolate(start.x, end.x, imgProgress),
        y: gsap.utils.interpolate(start.y, end.y, imgProgress),
        z: gsap.utils.interpolate(start.z, end.z, imgProgress),
        scale: gsap.utils.interpolate(start.scale, end.scale, imgProgress),
      });
    });

    
    if (lastImageEl) {
      const lastProgress = Math.max(0, (progress - 0.85) / 0.15);
      gsap.set(lastImageEl, { opacity: lastProgress });
    }
  },
});
  return () => st.kill();
}, [images, dimensions]);


 
return (
  <main ref={containerRef} className={cn('w-full overflow-x-hidden', className)}>
    <section ref={flowRef} className="relative min-h-screen overflow-hidden bg-primary">

      {/* Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 h-[120%] w-[120%] -translate-x-[10%] -translate-y-[5%] animate-particle-drift-slow opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.2) 1.2px, transparent 1.2px),
              radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 72px 72px',
            backgroundPosition: '0 0, 36px 36px',
          }}
        />
        <div
          className="absolute inset-0 h-[120%] w-[120%] translate-x-[5%] -translate-y-[10%] animate-particle-drift-slow-reverse opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      {/* Flow text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-20 w-full -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <p
          className="whitespace-pre-line opacity-80"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', letterSpacing: '0.05em' }}
        >
          {flowText}
        </p>
      </div>

      {/* ✅ 3D container — non-last images only */}
      <div
        className="absolute left-0 top-0 z-10 h-full w-full"
        // style={{ perspective: 2000, transformStyle: 'preserve-3d' }}
        style={{ perspective: 2000 }}
      >
        {images.slice(0, -1).map((imageSrc, index) => (
          <div
            key={`${typeof imageSrc === 'string' ? imageSrc : imageSrc.src}-${index}`}
            className="image-flow-item absolute left-1/2 top-1/2 h-[700px] w-[500px] max-w-[90vw]"
            // style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image src={imageSrc} alt="" fill className="object-cover" sizes="500px" />
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Last image — completely outside perspective, no transform, just opacity */}
      <div
        className="last-image-item absolute inset-0 z-20"
        // No transform, no translate, no scale — just sits flat and full screen
      >
        <div className="relative h-full w-full after:absolute after:inset-0 after:bg-black/40">
          <Image
            src={images[images.length - 1]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

    </section>
  </main>
);

};

export default ImagesFlow;
