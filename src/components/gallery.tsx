// src/components/Gallery.tsx
import React, { useState } from 'react'; // Import useState directly

import { Image } from './imagecomponents';

interface GalleryProps {
  images: string[];
  className?: string;
  columns?: number;
}

export const Gallery = ({
  images,
  className = '',
  columns = 3
}: GalleryProps) => {
  // Use useState directly, not React.useState
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div className={`gallery ${className}`}>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div 
            key={`gallery-item-${index}`}
            className="gallery-item"
            onClick={() => openLightbox(img)}
          >
            <Image
              src={img}
              alt={`Gallery image ${index + 1}`}
              className="gallery-image"
              priority={index < 6}
            />
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div 
          className="lightbox"
          onClick={closeLightbox}
        >
          <div 
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-btn"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <img 
              src={selectedImage}
              alt="Enlarged gallery image"
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};