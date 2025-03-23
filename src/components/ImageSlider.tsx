// src/components/ImageSlider.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Image } from './imagecomponents';

interface ImageSliderProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export const ImageSlider = ({
  images,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className = ''
}: ImageSliderProps) => {
  // Use the imported hooks directly instead of React.useState
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  
  // Use the imported useEffect directly
  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, interval]);
  
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, interval);
  };
  
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };
  
  const resumeAutoPlay = () => {
    if (autoPlay && !autoPlayRef.current) {
      startAutoPlay();
    }
  };
  
  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    if (autoPlay) {
      startAutoPlay();
    }
  };
  
  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    if (autoPlay) {
      startAutoPlay();
    }
  };
  
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    if (autoPlay) {
      startAutoPlay();
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoPlay();
    touchStartXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = () => {
    // Touch move logic can be added for more advanced interactions
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartXRef.current;
    
    // Swipe threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    
    touchStartXRef.current = null;
    resumeAutoPlay();
  };

  // Fix for 'Parameter 'prevIndex' implicitly has an 'any' type' warnings
  // You can add explicit types to the parameters
  
  return (
    <div 
      className={`image-slider-container ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <div 
        className="slider-track"
        style={{
          display: 'flex',
          transition: 'transform 0.3s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {images.map((img, index) => (
          <div 
            key={`slide-${index}`}
            className="slide"
            style={{
              minWidth: '100%',
              height: '100%',
              position: 'relative'
            }}
          >
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              className="slider-image"
              priority={index === currentIndex}
            />
          </div>
        ))}
      </div>
      
      {showArrows && (
        <>
          <button 
            className="arrow-btn prev-btn"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button 
            className="arrow-btn next-btn"
            onClick={goToNext}
            aria-label="Next slide"
          >
            &gt;
          </button>
        </>
      )}
      
      {showDots && (
        <div className="dots-container">
          {images.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};