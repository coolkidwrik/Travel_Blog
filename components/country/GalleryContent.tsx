'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryData = {
  images: Array<{
    url: string;
    caption: string;
    alt: string;
    _rawImage?: any;
  }>;
};

type GalleryContentProps = {
  data: GalleryData;
};

export default function GalleryContent({ data }: GalleryContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  const currentImage = data.images[currentImageIndex];
  const currentImageSrc = currentImage?._rawImage
    ? urlFor(currentImage._rawImage).width(1920).height(1080).url()
    : currentImage?.url;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.images.map((image, index) => {
          const imageSrc = image._rawImage 
            ? urlFor(image._rawImage).width(800).height(600).url()
            : image.url;

          return (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={imageSrc || image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm">{image.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImageSrc || currentImage.url}
                alt={currentImage.alt}
                width={1920}
                height={1080}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Caption */}
            {currentImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg text-center">
                  {currentImage.caption}
                </p>
                <p className="text-gray-300 text-sm text-center mt-2">
                  {currentImageIndex + 1} / {data.images.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}