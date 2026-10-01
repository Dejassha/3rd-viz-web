"use client";
import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  /** When the scroll range starts (default: as block enters from bottom of viewport). */
  scrollStart?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  scrollStart = 'top bottom',
  rotationEnd = 'top 25%',
  wordAnimationEnd = 'top 25%'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;
    const smoothEase = 'sine.inOut';
    /* Higher scrub = slower, smoother follow; true = smooth interpolation */
    const scrubVal = true;

    const rotateTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: smoothEase,
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: rotationEnd,
          scrub: scrubVal
        }
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>('.word');
    const wordCount = wordElements.length;
    let wordTl: gsap.core.Timeline | null = null;

    if (wordCount > 0) {
      /* Each word gets an equal segment of the scroll range so they reveal one by one */
      const segment = 1 / wordCount;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: wordAnimationEnd,
          scrub: scrubVal
        }
      });
      wordTl = tl;

      wordElements.forEach((word, i) => {
        tl.fromTo(
          word,
          { opacity: baseOpacity, willChange: 'opacity' },
          { opacity: 1, duration: segment, ease: smoothEase },
          i * segment
        );
        if (enableBlur) {
          tl.fromTo(
            word,
            { filter: `blur(${blurStrength}px)` },
            { filter: 'blur(0px)', duration: segment, ease: smoothEase },
            i * segment
          );
        }
      });
    }

    return () => {
      wordTl?.scrollTrigger?.kill();
      wordTl?.kill();
      rotateTween.scrollTrigger?.kill();
      rotateTween.kill();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    scrollStart,
    rotationEnd,
    wordAnimationEnd,
    blurStrength
  ]);

  return (
    <h2
      ref={containerRef}
      className={containerClassName || "my-3 sm:my-4 md:my-5"}
    >
      <p
        className={
          textClassName ||
          "text-[clamp(1.35rem,4.2vw,3rem)] max-md:leading-snug md:leading-normal font-semibold"
        }
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
