import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1730005523015-422bd53dda0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9wZXJ0eSUyMHRlYWwlMjBvY2VhbnxlbnwxfHx8fDE3NjQ5MzMzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Luxury and Comfort,',
      subtitle: 'Just a Tap Away',
      description: 'Discover premium properties with world-class amenities and exceptional service designed for your lifestyle',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1763467941420-a971deda1779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB0dXJxdW9pc2UlMjB3YXRlcnxlbnwxfHx8fDE3NjQ5MzMzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Book with Ease,',
      subtitle: 'Live with Style',
      description: 'Schedule site visits, express interest, and secure your dream property with our streamlined booking process',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1762681947187-f63117047d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHRlYWwlMjBibHVlfGVufDF8fHx8MTc2NDkzMzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Your Home,',
      subtitle: 'Your Way',
      description: 'Manage payments, documents, and services all in one place for a seamless homeownership experience',
    },
  ];

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Image Carousel */}
      <div className="flex-1 relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/90"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-32 left-0 right-0 px-8 text-center z-10">
              <h2 className="text-white mb-1 sm:text-4xl leading-tight text-[24px]">
                {slide.title}
              </h2>
              <h2 className="text-white mb-6 sm:text-4xl leading-tight text-[24px]">
                {slide.subtitle}
              </h2>
              <p className="text-white/80 sm:text-base leading-relaxed max-w-md mx-auto text-[14px]">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-48 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-[#005B78] rounded-full'
                : 'w-2 h-2 bg-white/50 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-8 left-0 right-0 px-8 z-20">
        <button
          onClick={handleContinue}
          className="w-full bg-[#005B78] text-white py-4 rounded-2xl hover:bg-[#004a61] transition-colors text-lg shadow-lg"
        >
          Continue
        </button>
      </div>

      {/* Skip Button */}
      {currentSlide < slides.length - 1 && (
        <button
          onClick={onComplete}
          className="absolute top-16 right-8 text-white/70 hover:text-white text-sm z-20"
        >
          Skip
        </button>
      )}
    </div>
  );
}