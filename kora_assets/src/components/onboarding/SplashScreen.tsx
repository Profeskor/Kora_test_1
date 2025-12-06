import { useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logoImage from 'figma:asset/1785f31ddf4d2e5d462e1197f3dacde914c675e1.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Kora Logo on Marble Background */}
      <ImageWithFallback 
        src={logoImage}
        alt="Kora Properties - Timeless living"
        className="w-full h-full min-h-screen object-cover"
      />
    </div>
  );
}