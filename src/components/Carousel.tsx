import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  title: string;
  description: string;
}

export function Carousel({ images, title, description }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-3xl mx-auto mb-10 bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-photo-secondary text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="relative max-w-2xl mx-auto mb-6 rounded-lg overflow-hidden shadow-md bg-photo-light">
        <div className="h-96 flex items-center justify-center bg-gray-900">
          {images[currentIndex] ? (
            <img
              src={images[currentIndex]}
              alt={`${title} - slide ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-white text-center">
              <p className="text-lg">Gallery Image {currentIndex + 1}</p>
              <p className="text-sm text-gray-400">No image available</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-3">
        <button
          onClick={goToPrevious}
          className="w-11 h-11 rounded-full bg-photo-secondary text-white flex items-center justify-center hover:bg-photo-primary transition-colors shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="w-11 h-11 rounded-full bg-photo-secondary text-white flex items-center justify-center hover:bg-photo-primary transition-colors shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-photo-secondary opacity-100'
                : 'bg-photo-primary opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
