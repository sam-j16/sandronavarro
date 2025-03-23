import { useState, useEffect } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const Image = ({ src, alt, className = '', priority = false }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setError(true);
    };
    
    img.src = src;
  }, [src]);

  if (error) {
    return (
      <div className={`image-placeholder ${className}`}>
        <span>Image not found</span>
      </div>
    );
  }

  return (
    <div className={`image-container ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`image ${isLoaded ? 'image-loaded' : 'image-loading'}`}
        loading={priority ? 'eager' : 'lazy'}
      />
      {!isLoaded && (
        <div className="image-placeholder">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};