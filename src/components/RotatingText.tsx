"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  texts: string[];
  duration?: number;
  ease?: string;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  animateInitial?: boolean;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      duration = 0.5,
      ease = "power2.out",
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      animateInitial = false,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
    const contentRef = useRef<HTMLSpanElement>(null);
    const hasEnteredOnce = useRef(false);
    const isExiting = useRef(false);

    const splitIntoCharacters = useCallback((text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (segment) => segment.segment);
      }
      return Array.from(text);
    }, []);

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex];
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }
      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy, splitIntoCharacters]);

    const runEnterAnimation = useCallback(() => {
      const container = contentRef.current;
      if (!container) return;
      const chars = container.querySelectorAll<HTMLElement>("[data-rotating-char]");
      if (chars.length === 0) return;

      gsap.set(chars, { y: "100%", opacity: 0 });
      const fromMap: Record<string, "start" | "end" | "center" | "random"> = {
        first: "start",
        last: "end",
        center: "center",
        random: "random",
      };
      const staggerFromGsap =
        typeof staggerFrom === "number"
          ? staggerFrom
          : fromMap[staggerFrom] ?? "start";
      const staggerConfig =
        staggerDuration > 0
          ? { each: staggerDuration, from: staggerFromGsap }
          : 0;
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger: staggerConfig,
        overwrite: true,
      });
    }, [duration, ease, staggerDuration, staggerFrom]);

    const runExitAnimation = useCallback(
      (onComplete: () => void) => {
        const container = contentRef.current;
        if (!container) {
          onComplete();
          return;
        }
        const chars = container.querySelectorAll<HTMLElement>("[data-rotating-char]");
        if (chars.length === 0) {
          onComplete();
          return;
        }
        const fromMap: Record<string, "start" | "end" | "center" | "random"> = {
          first: "start",
          last: "end",
          center: "center",
          random: "random",
        };
        const staggerFromGsap =
          typeof staggerFrom === "number"
            ? staggerFrom
            : fromMap[staggerFrom] ?? "start";
        const staggerConfig =
          staggerDuration > 0
            ? { each: staggerDuration, from: staggerFromGsap }
            : 0;
        gsap.to(chars, {
          y: "-120%",
          opacity: 0,
          duration: duration * 0.8,
          ease: "power2.in",
          stagger: staggerConfig,
          overwrite: true,
          onComplete,
        });
      },
      [duration, staggerDuration, staggerFrom]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex === currentTextIndex) return;
      if (isExiting.current) return;
      isExiting.current = true;
      runExitAnimation(() => {
        handleIndexChange(nextIndex);
        isExiting.current = false;
      });
    }, [currentTextIndex, texts.length, loop, runExitAnimation, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex === currentTextIndex) return;
      if (isExiting.current) return;
      isExiting.current = true;
      runExitAnimation(() => {
        handleIndexChange(prevIndex);
        isExiting.current = false;
      });
    }, [currentTextIndex, texts.length, loop, runExitAnimation, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex === currentTextIndex) return;
        if (isExiting.current) return;
        isExiting.current = true;
        runExitAnimation(() => {
          handleIndexChange(validIndex);
          isExiting.current = false;
        });
      },
      [texts.length, currentTextIndex, runExitAnimation, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        if (isExiting.current) return;
        isExiting.current = true;
        runExitAnimation(() => {
          handleIndexChange(0);
          isExiting.current = false;
        });
      }
    }, [currentTextIndex, runExitAnimation, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset]
    );

    useLayoutEffect(() => {
      if (!animateInitial && !hasEnteredOnce.current) {
        hasEnteredOnce.current = true;
        return;
      }
      runEnterAnimation();
    }, [currentTextIndex, animateInitial, runEnterAnimation]);

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative",
          mainClassName
        )}
        {...rest}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <span
          ref={contentRef}
          className={cn(
            splitBy === "lines"
              ? "flex flex-col w-full"
              : "flex flex-wrap whitespace-pre-wrap relative"
          )}
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex) => {
            return (
              <span
                key={wordIndex}
                className={cn("inline-flex", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <span
                    key={charIndex}
                    data-rotating-char
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </span>
                ))}
                {wordObj.needsSpace && (
                  <span className="whitespace-pre"> </span>
                )}
              </span>
            );
          })}
        </span>
      </span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
