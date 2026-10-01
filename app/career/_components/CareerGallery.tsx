'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface GalleryItem {
  caption?: string;
  media: {
    url: string;
    filename: string;
    alt?: string;
  };
}

interface CareerGalleryProps {
  images?: GalleryItem[];
  videos?: GalleryItem[];
}

export default function CareerGallery({ images: initialImages = [], videos: initialVideos = [] }: CareerGalleryProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationPlayed = useRef(false);

  if (initialImages.length === 0 && initialVideos.length === 0) return null;

  // Memoize so they are stable references
  const allImages = useMemo(() => initialImages, [initialImages]);
  const videos = useMemo(() => initialVideos, [initialVideos]);

  const [displayImages, setDisplayImages] = useState<GalleryItem[]>(() => allImages.slice(0, 4));

  // Shuffle images every 5 seconds if there are more than 4
  useEffect(() => {
    if (allImages.length <= 4 || !isInView) return;

    const interval = setInterval(() => {
      gsap.to('.photo-item', {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        onComplete: () => {
          const shuffled = [...allImages].sort(() => 0.5 - Math.random());
          setDisplayImages(shuffled.slice(0, 4));
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages, isInView]);

  // Fade images back in when displayImages changes
  useEffect(() => {
    if (animationPlayed.current && displayImages.length > 0) {
      gsap.fromTo(
        '.photo-item',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [displayImages]);

  // GSAP Initial Intro Animation
  useGSAP(() => {
    if (isInView && !animationPlayed.current && displayImages.length > 0) {
      animationPlayed.current = true;
      gsap.fromTo(
        '.photo-item',
        {
          x: 300, // Slide from the right side
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, [isInView, displayImages.length]);

  // Handle advancing to the next video when the current one ends
  const playNextVideo = () => {
    if (videos.length <= 1) return;
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  // Setup Intersection Observer to detect when gallery is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.3 } // Play and animate when at least 30% visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-play the active video when in view, and pause/reset the others
  useEffect(() => {
    if (videos.length === 0) return;

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex && isInView) {
          // Play current if in view
          video.play().catch((err) => {
            console.log("Auto-play prevented by browser:", err);
          });
        } else {
          // Pause and reset others (or if not in view)
          video.pause();
          if (index !== currentVideoIndex) {
            video.currentTime = 0;
          }
        }
      }
    });
  }, [currentVideoIndex, videos.length, isInView]);

  const scrollLeft = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div ref={containerRef} className="mb-16 overflow-hidden">
      <h2 className="text-4xl font-bold mb-12 text-white text-center" style={{ fontFamily: 'Anta, sans-serif' }}>
        Life at ThirdVizion
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto items-center">
        {/* Left: Images 4-Box Grid (Animated from behind the video) */}
        {displayImages.length > 0 && (
          <div className="flex-1 grid grid-cols-2 gap-4 relative z-0 w-full lg:w-auto px-4 lg:px-0">
            {displayImages.map((item, index) => (
              <div key={index} className="photo-item opacity-0 relative aspect-square overflow-hidden rounded-xl border border-[#32353C] group shadow-lg">
                <Image
                  src={item.media.url}
                  alt={item.media.alt || item.caption || `Gallery Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                {item.caption && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                    <p className="text-white text-sm font-medium">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Right: Videos Slideshow (Sits above the photos in z-index) */}
        {videos.length > 0 && (
          <div className="lg:w-[55%] xl:w-[60%] flex-shrink-0 relative z-10 bg-[#12141C] p-6 rounded-2xl border border-[#1E2D4A] shadow-2xl w-full">
            <h3 className="text-2xl font-bold mb-4 text-white text-center" style={{ fontFamily: 'Anta, sans-serif' }}>
              Team Testimonials
            </h3>
            
            <div className="relative group mx-auto">
              {videos.length > 1 && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 border border-[#32353C] text-white flex items-center justify-center hover:bg-[#3B82F6] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#32353C] bg-black">
                {videos.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                  >
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={item.media.url}
                      className="w-full h-full object-contain"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      onEnded={playNextVideo}
                    />
                  </div>
                ))}
              </div>

              {videos[currentVideoIndex]?.caption && (
                <p className="mt-4 text-[#8C909F] text-center text-sm px-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {videos[currentVideoIndex].caption}
                </p>
              )}

              {videos.length > 1 && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 border border-[#32353C] text-white flex items-center justify-center hover:bg-[#3B82F6] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              
              {/* Dots */}
              {videos.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {videos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentVideoIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentVideoIndex ? 'bg-[#3B82F6]' : 'bg-[#32353C] hover:bg-[#8C909F]'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
