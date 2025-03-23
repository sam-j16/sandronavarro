import { useState } from 'react';

// Create a completely standalone gallery component without importing from Gallery.tsx
const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Corrected image paths based on your file structure
  const galleryImages = [
    '/images/images/gallery/image1.JPEG',
    '/images/images/gallery/image2.JPEG',
    '/images/images/gallery/image3.JPEG',
    '/images/images/gallery/image4.JPEG',
    '/images/images/gallery/image5.JPEG',
    '/images/images/gallery/image6.JPEG',
    '/images/images/gallery/image7.JPEG'
  ];

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };
    
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Campaign Gallery</h2>
      
      <div className="gallery">
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <div
              key={`gallery-item-${index}`}
              className="gallery-item"
              onClick={() => openLightbox(img)}
            >
              <div className="image-container">
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                  loading={index < 6 ? 'eager' : 'lazy'}
                />
              </div>
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
    </div>
  );
};

export default PhotoGallery;