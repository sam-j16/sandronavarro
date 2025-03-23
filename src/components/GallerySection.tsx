import React, { useEffect, useRef, useState } from 'react';
import './gallery.css';

const GallerySection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Using more common path patterns based on your project structure
  const images = [
    '/images/gallery/image1.JPEG',
    '/images/gallery/image2.JPEG',
    '/images/gallery/image3.JPEG',
    '/images/gallery/image4.JPEG',
    '/images/gallery/image5.JPEG',
    '/images/gallery/image6.JPEG',
    '/images/gallery/image7.JPEG'
  ];
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Duplicate the slides to create an infinite loop effect
    const track = carousel;
    const slides = Array.from(track.children);
    
    // Clone the slides to create a seamless loop
    slides.forEach(slide => {
      const clonedSlide = slide.cloneNode(true);
      track.appendChild(clonedSlide);
    });

    let animationFrameId: number;
    let position = 0;
    const SCROLL_SPEED = 1; // Adjust this value to control scroll speed

    const animate = () => {
      if (!isAnimating) return;

      position += SCROLL_SPEED;
      track.style.transform = `translateX(-${position}px)`;

      // Check if we've scrolled the width of the entire original set of slides
      const originalWidth = track.scrollWidth / 2;
      if (position >= originalWidth) {
        position = 0;
        track.style.transform = 'translateX(0px)';
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => setIsAnimating(false);
    const handleMouseLeave = () => setIsAnimating(true);

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAnimating]);
  
  return (
    <div className="gallery-section">
      <h1 className="gallery-title">Campaign Gallery</h1>
      <div className="carousel-container">
        <div 
          className="carousel-track" 
          ref={carouselRef}
        >
          {images.map((src, index) => (
            <div key={index} className="carousel-slide">
              <img 
                src={src} 
                alt={`Campaign Image ${index + 1}`} 
                className="gallery-image"
                onError={(e) => {
                  // If image fails to load, try these alternative paths
                  const target = e.target as HTMLImageElement;
                  const imageNumber = index + 1;
                  
                  // Try these paths in order if the original fails
                  const alternativePaths = [
                    `./image${imageNumber}.JPEG`,
                    `../public/images/gallery/image${imageNumber}.JPEG`,
                    `/public/images/gallery/image${imageNumber}.JPEG`,
                    `/src/components/public/images/gallery/image${imageNumber}.JPEG`,
                    `/images/gallery/image${imageNumber}.jpeg`, // lowercase extension
                    `/gallery/image${imageNumber}.JPEG`,
                    `/image${imageNumber}.JPEG`
                  ];
                  
                  // Find the first path that hasn't been tried yet
                  const nextPath = alternativePaths.find(path => !target.src.includes(path));
                  
                  if (nextPath) {
                    console.log(`Trying alternative path for image ${imageNumber}: ${nextPath}`);
                    target.src = nextPath;
                  } else {
                    console.error(`Failed to load image ${imageNumber} after trying all paths`);
                    // Use a placeholder if all paths fail
                    target.src = 'https://via.placeholder.com/300x225?text=Image+Not+Found';
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;