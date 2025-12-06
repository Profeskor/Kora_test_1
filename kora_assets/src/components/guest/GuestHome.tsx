import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GuestHomeProps {
  userName?: string;
}

interface Banner {
  id: number;
  type: "launch" | "offer" | "event";
  title: string;
  description: string;
  image: string;
  cta: string;
}

export function GuestHome({ userName = "Guest" }: GuestHomeProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Marketing banners for guest users
  const banners: Banner[] = [
    {
      id: 1,
      type: "launch",
      title: "New Launch: Marina Heights",
      description: "Luxury waterfront living with 8% guaranteed ROI",
      image:
        "https://images.unsplash.com/photo-1657383543451-e47d1589195d?w=1080",
      cta: "View Details",
    },
    {
      id: 2,
      type: "offer",
      title: "Exclusive Dubai Maritime",
      description: "Premium apartments with private beach access",
      image:
        "https://images.unsplash.com/photo-1594873604892-b599f847e859?w=1080",
      cta: "Explore Now",
    },
    {
      id: 3,
      type: "event",
      title: "Virtual Property Tours",
      description: "Experience properties from anywhere in the world",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1080",
      cta: "Book Tour",
    },
    {
      id: 4,
      type: "launch",
      title: "Beachfront Villas",
      description: "Premium 4BR villas with private beach access",
      image:
        "https://images.unsplash.com/photo-1679364297777-1db77b6199be?w=1080",
      cta: "Explore",
    },
    {
      id: 5,
      type: "offer",
      title: "Payment Plan Offer",
      description: "5% down payment on select units - Limited time",
      image:
        "https://images.unsplash.com/photo-1534344132535-45f01a5a3503?w=1080",
      cta: "Check Availability",
    },
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  };

  const currentBanner = banners[currentBannerIndex];

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Welcome Section */}
      <div className="bg-white px-6 py-6 border-b border-gray-200">
        <h1 className="text-[#005B78] text-2xl mb-1">
          Welcome, {userName}!
        </h1>
        <p className="text-gray-600">
          Explore our exclusive property collection
        </p>
      </div>

      {/* Marketing Carousel Section */}
      <div className="px-4 py-6">
        <div className="relative">
          {/* Banner Card */}
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${currentBanner.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              {/* Badge */}
              <div className="mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                    currentBanner.type === "launch"
                      ? "bg-green-500 text-white"
                      : currentBanner.type === "offer"
                      ? "bg-orange-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {currentBanner.type}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-white text-2xl mb-2">
                {currentBanner.title}
              </h2>

              {/* Description */}
              <p className="text-white/90 text-sm mb-4">
                {currentBanner.description}
              </p>

              {/* CTA Button */}
              <button className="self-start px-6 py-3 bg-white text-[#005B78] rounded-xl hover:bg-gray-100 transition-colors shadow-md">
                {currentBanner.cta}
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentBannerIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Card - Encourage Sign Up */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-[#E6F2F5] to-[#CCE5EB] rounded-2xl p-6 border border-[#005B78]/20">
          <h3 className="text-[#005B78] text-lg mb-2">
            Get More with an Account
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            Sign in to save your favorite properties, schedule site visits, and access exclusive broker tools.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2.5 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors text-sm">
              Sign In
            </button>
            <button className="flex-1 px-4 py-2.5 bg-white text-[#005B78] rounded-xl hover:bg-gray-50 transition-colors text-sm border border-[#005B78]/20">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
