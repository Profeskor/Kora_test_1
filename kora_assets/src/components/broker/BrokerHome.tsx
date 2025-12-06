import { useState, useEffect } from "react";
import {
  Search,
  Users,
  Building2,
  Clock,
  CheckCircle,
  Calendar,
  Plus,
  ChevronRight,
  ChevronLeft,
  FileText,
  Eye,
  UserPlus,
  ClipboardList,
  Scale,
} from "lucide-react";

interface BrokerHomeProps {
  userName: string;
  onNavigate?: (screen: string) => void;
  comparisonCount?: number;
}

interface Banner {
  id: number;
  type: "launch" | "offer" | "event";
  title: string;
  description: string;
  image: string;
  cta: string;
}

export function BrokerHome({
  userName,
  onNavigate,
  comparisonCount,
}: BrokerHomeProps) {
  const [currentBannerIndex, setCurrentBannerIndex] =
    useState(0);

  // Promotional banners (up to 6)
  const banners: Banner[] = [
    {
      id: 1,
      type: "launch",
      title: "New Launch: Marina Heights",
      description:
        "Luxury waterfront living with 8% guaranteed ROI",
      image:
        "https://images.unsplash.com/photo-1657383543451-e47d1589195d?w=1080",
      cta: "View Details",
    },
    {
      id: 2,
      type: "offer",
      title: "Special Broker Incentive",
      description:
        "Extra 2% commission on Bay East units this month",
      image:
        "https://images.unsplash.com/photo-1594873604892-b599f847e859?w=1080",
      cta: "Learn More",
    },
    {
      id: 3,
      type: "event",
      title: "Broker Open House",
      description:
        "Exclusive preview of Sky Gardens - Dec 15th",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1080",
      cta: "Register Now",
    },
    {
      id: 4,
      type: "launch",
      title: "Beachfront Villas",
      description:
        "Premium 4BR villas with private beach access",
      image:
        "https://images.unsplash.com/photo-1679364297777-1db77b6199be?w=1080",
      cta: "Explore",
    },
    {
      id: 5,
      type: "offer",
      title: "Payment Plan Offer",
      description:
        "5% down payment on select units - Limited time",
      image:
        "https://images.unsplash.com/photo-1534344132535-45f01a5a3503?w=1080",
      cta: "Check Availability",
    },
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex(
        (prev) => (prev + 1) % banners.length,
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handlePrevBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + banners.length) % banners.length,
    );
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev + 1) % banners.length,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4 space-y-4">
        {/* Welcome Section - Removed for compactness */}

        {/* Promotional Banners Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-40 sm:h-48">
            {/* Banner Content */}
            <div
              className="absolute inset-0 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentBannerIndex * 100}%)`,
              }}
            >
              <div className="flex h-full">
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className="min-w-full h-full relative"
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs mb-2 capitalize">
                        {banner.type}
                      </span>
                      <h2 className="text-white mb-1 text-sm">
                        {banner.title}
                      </h2>
                      <p className="text-white/90 text-xs mb-3 line-clamp-2">
                        {banner.description}
                      </p>
                      <button className="px-4 py-1.5 bg-white text-[#005B78] rounded-lg hover:bg-gray-100 transition-colors text-xs">
                        {banner.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentBannerIndex
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-[#005B78] mb-3 text-sm text-[16px]">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Search Properties */}
            <button
              onClick={() =>
                onNavigate && onNavigate("property-search")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-xs text-[14px]">
                Search Properties
              </p>
            </button>

            {/* Create Lead */}
            <button
              onClick={() =>
                onNavigate && onNavigate("create-lead")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-xs text-[14px]">
                Create Lead
              </p>
            </button>

            {/* My Leads */}
            <button
              onClick={() =>
                onNavigate && onNavigate("my-leads")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-xs text-[14px]">
                My Leads
              </p>
            </button>

            {/* My Bookings */}
            <button
              onClick={() =>
                onNavigate && onNavigate("my-bookings")
              }
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 bg-[#E6F2F5] rounded-full flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-xs text-[14px]">
                My Bookings
              </p>
            </button>
          </div>
        </div>

        {/* My Leads */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E6F2F5] rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-[#005B78]" />
              </div>
              <h2 className="text-[#005B78] text-sm">My Leads</h2>
            </div>
            <button
              onClick={() => onNavigate?.("my-leads")}
              className="text-[#005B78] text-xs hover:underline flex items-center gap-1 text-[14px]"
            >
              View All
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 border border-blue-200 rounded-xl">
              <p className="text-[#005B78] text-xs mb-1 text-[14px]">
                New
              </p>
              <p className="text-[#005B78] text-2xl text-center font-bold">
                5
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
              <p className="text-amber-700 text-xs mb-1 text-[14px]">
                Ongoing
              </p>
              <p className="text-amber-900 text-2xl text-center font-bold">
                12
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
              <p className="text-green-700 text-xs mb-1 text-[14px]">
                Booked
              </p>
              <p className="text-green-900 text-2xl text-center font-bold">
                3
              </p>
            </div>
          </div>
        </div>

        {/* My Bookings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#005B78] text-sm">My Bookings</h2>
            <button
              onClick={() => onNavigate?.("my-bookings")}
              className="text-[#005B78] text-xs hover:underline flex items-center gap-1 text-[14px]"
            >
              View All
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[#005B78] text-xs mb-1 text-[14px]">
                Pending
              </p>
              <p className="text-[#005B78] text-2xl text-center font-bold">2</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[#005B78] text-xs mb-1 text-[14px]">
                Approved
              </p>
              <p className="text-[#005B78] text-2xl text-center font-bold">8</p>
            </div>
          </div>
        </div>

        {/* Compare Properties */}
        {comparisonCount !== undefined && comparisonCount > 0 && (
          <button
            onClick={() => onNavigate?.("compare-properties")}
            className="w-full bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center relative">
                  <Scale className="w-6 h-6 text-white" />
                  {comparisonCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {comparisonCount}
                    </span>
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-[#005B78]">Compare Properties</h3>
                  <p className="text-purple-700 text-xs">
                    {comparisonCount} {comparisonCount === 1 ? 'property' : 'properties'} selected
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-500" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}