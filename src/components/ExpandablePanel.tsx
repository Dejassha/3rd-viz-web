'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface Panel {
  image: string;
  alt?: string;
  /** When set, expanded state shows card layout; collapsed shows image + title + gradient */
  title?: string;
  description?: string;
  /** Tailwind color name for circle & bottom gradient (e.g. accent-blue) → uses var(--color-*) */
  color?: string;
}

/** Theme color keys → hex fallbacks so inline styles work when CSS var is missing (e.g. accent-red, accent-purple) */
const THEME_COLOR_FALLBACKS: Record<string, string> = {
  'accent-yellow': '#FDB928',
  'accent-orange': '#F38540',
  'accent-blue': '#3EA9C1',
  'accent-green': '#5EBC58',
  'accent-pink': '#EE3A5C',
  'accent-red': '#CB1A1A',
  'accent-purple': '#661BCB',
  'icon-violet': '#661BCB',
  'icon-red': '#CB1A1A',
};

function getPanelColor(colorKey?: string): string {
  if (!colorKey) return 'var(--color-accent-blue, #3EA9C1)';
  const fallback = THEME_COLOR_FALLBACKS[colorKey] ?? THEME_COLOR_FALLBACKS['accent-blue'];
  return `var(--color-${colorKey}, ${fallback})`;
}

interface ExpandablePanelProps {
  panels: Panel[];
  className?: string;
  panelClassName?: string;
  expandedWidth?: string;
  collapsedWidth?: string;
  minWidth?: string;
  height?: string;
  gap?: string;
  borderRadius?: string;
  transitionDuration?: string;
  defaultExpanded?: number;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
  panels,
  className,
  panelClassName,
  expandedWidth = '60%',
  collapsedWidth = '20%',
  minWidth = '40px',
  height = '80vh',
  gap = '0.5rem',
  borderRadius = '1rem',
  transitionDuration = '500ms',
  defaultExpanded = 0
}) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setExpandedIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setExpandedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={panelRef}
      className={cn('flex w-full  items-center justify-center', className)}
      style={{ height, gap }}
    >
      {panels.map((panel, index) => {
        const expanded = expandedIndex === index;
        const isCard = Boolean(panel.title);
        const gradientColor = getPanelColor(panel.color);

        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={cn(
              'h-full cursor-pointer transition-all ease-in-out overflow-hidden',
              isCard && expanded && 'flex flex-col items-center justify-center text-center',
              panelClassName
            )}
            style={{
              width: expanded ? expandedWidth : collapsedWidth,
              minWidth,
              borderRadius,
              transitionDuration,
            }}
          >
            {isCard && expanded ? (
              <>
                <div className="relative w-full h-full flex flex-col p-6 border border-tertiary rounded-[20px] overflow-hidden bg-[#0f0f0f] text-center justify-center items-center gap-4">
                  <div
                    className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${gradientColor} 0%, transparent 100%)`,
                    }}
                  />
                  <div className="relative z-10 p-4 bg-white rounded-full">
                    <Image
                      src={panel.image}
                      alt={panel.alt ?? `Panel ${index + 1}`}
                      width={40}
                      height={40}
                      className="size-10 object-contain"
                    />
                  </div>
                  <h2 className="subHeading text-white relative z-10">{panel.title}</h2>
                  <p className="bodyText text-white relative z-10 px-2">{panel.description}</p>
                </div>
              </>
            ) : isCard ? (
              /* Collapsed: panel image (SVG) + full title + same gradient as expanded */
              <div className="relative w-full h-full flex flex-col rounded-[20px] overflow-hidden border border-tertiary">
                {/* Same gradient as expanded card: bottom only */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[120px] pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${gradientColor} 0%, transparent 100%)`,
                  }}
                />
                <div className="relative z-10 flex flex-col items-center flex-1 min-h-0 pt-5 pb-4 px-2">
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden p-2"
                    style={{ backgroundColor: gradientColor }}
                  >
                    <Image
                      src={panel.image}
                      alt={panel.alt ?? `Panel ${index + 1}`}
                      width={32}
                      height={32}
                      className="size-full object-contain"
                    />
                  </div>
                  <div
                    className="absolute bottom-3 left-0 right-0 flex justify-center px-1"
                    style={{
                      maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
                    }}
                  >
                    <span
                      className="text-white subHeading truncate"
                     
                    >
                      {panel.title ?? ''}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src={panel.image}
                width={1000}
                height={1000}
                alt={panel.alt ?? `Panel ${index + 1}`}
                className="w-full h-full object-cover object-top"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpandablePanel;
