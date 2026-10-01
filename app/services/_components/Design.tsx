"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  image: string;
}

interface Props {
  data: Testimonial[];
}

const TestimonialsSection = ({ data }: Props) => {
  // If no data array is passed, don't break the page render
  if (!data || data.length === 0) return null;

  // Track which reviewer avatar the user has clicked on (defaulting to first user)
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = data[activeIndex];

  return (
    <section className="w-full text-white bg-black py-20 border-t border-zinc-900">
      <div className="container mx-auto">
        
        {/* Section Heading Title matching Figma text */}
        <h2 className="text-xl md:text-2xl font-bold tracking-wider mb-10 uppercase">
          What they <span className="text-zinc-400 font-normal">say</span>
        </h2>

        {/* Master Box Layout Wrapper */}
        <div className="w-full bg-[#0d0d11]/40 border border-zinc-900 rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[300px]">
          
          {/* Subtle background container ambient color wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-purple-950/10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN (Spans 9 grid paths): Main Active Content Panel */}
            <div className="md:col-span-9 flex flex-col justify-between h-full pr-0 md:pr-8">
              
              {/* Dynamic Review Block Quote Statement */}
              <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-10 transition-all duration-300">
                {activeTestimonial.review}
              </p>

              {/* Identity Footer Badge */}
              <div className="mt-auto">
                <h3 className="text-sm font-semibold tracking-wider text-purple-400 uppercase transition-colors">
                  {activeTestimonial.name}
                </h3>
                <p className="text-xs tracking-widest text-zinc-500 uppercase mt-0.5">
                  {activeTestimonial.role}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN (Spans 3 grid paths): Interactive Floating Avatar Stack */}
            <div className="md:col-span-3 flex md:flex-col flex-row gap-5 items-center justify-center md:justify-start border-t md:border-t-0 md:border-l border-zinc-900/80 pt-6 md:pt-0 md:pl-8">
              
              {data.map((item, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className="relative focus:outline-none group flex items-center"
                    aria-label={`View testimonial from ${item.name}`}
                  >
                    {/* Tiny animated indicator arrow showing selection alignment */}
                    <span className={`absolute -left-4 text-purple-500 text-xs transition-all duration-200 hidden md:block ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-40'
                    }`}>
                      ◀
                    </span>

                    {/* Circular Avatar Image Disc Border Ring */}
                    <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full p-[2px] transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-b from-purple-500 to-zinc-800 scale-105 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                        : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80'
                    }`}>
                      
                      {/* Inner Image Mask Clip */}
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className={`object-cover transition-all duration-300 ${
                            isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;