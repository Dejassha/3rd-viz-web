'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BlogSlideshowProps {
  images: Array<{ url: string; alt: string }>;
}

export default function BlogSlideshow({ images }: BlogSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // If only 1 image, just render it statically
  if (images.length === 1) {
    return (
      <div className="blog-detail-image">
        <Image
          src={images[0].url}
          alt={images[0].alt || 'Blog slideshow image'}
          width={860}
          height={480}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="blog-slideshow-container">
      <div className="blog-slideshow-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, idx) => (
          <div key={idx} className="blog-slideshow-slide">
            <Image
              src={img.url}
              alt={img.alt || `Slide ${idx + 1}`}
              width={860}
              height={480}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      <button className="blog-slideshow-btn prev-btn" onClick={handlePrev} aria-label="Previous image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button className="blog-slideshow-btn next-btn" onClick={handleNext} aria-label="Next image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="blog-slideshow-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`blog-slideshow-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
