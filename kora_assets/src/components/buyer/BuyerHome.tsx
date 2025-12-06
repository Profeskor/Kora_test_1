import { Search, Heart, Calendar, MapPin, TrendingUp, Building2 } from 'lucide-react';

interface BuyerHomeProps {
  userName: string;
}

export function BuyerHome({ userName }: BuyerHomeProps) {
  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Welcome, {userName}!</h1>
        <p className="text-gray-500 text-sm">Find your dream property</p>
      </div>

      {/* Featured Banner */}
      <div className="relative bg-gradient-to-br from-[#005B78] to-[#003F54] rounded-3xl overflow-hidden mb-6">
        <div className="p-6 sm:p-8 text-white relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8" />
            <div>
              <h2 className="mb-1">New Launch: Marina Heights</h2>
              <p className="text-white/80 text-sm">Luxury waterfront living from AED 1.2M</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-[#005B78] rounded-xl hover:bg-gray-100 transition-colors text-sm">
            Explore Now
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">Explore Properties</p>
        </button>

        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">My Favorites</p>
        </button>

        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">My Visits</p>
        </button>

        <button className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-900 text-sm sm:text-base">Nearby</p>
        </button>
      </div>

      {/* Popular Searches */}
      <div className="mb-6">
        <h3 className="text-gray-900 mb-4">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {['1 BHK', '2 BHK', '3 BHK', 'Downtown', 'Marina', 'Under 1M'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-full hover:border-[#005B78] hover:text-[#005B78] transition-colors text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* My Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">My Requests</h3>
          <button className="text-[#005B78] text-sm hover:text-[#004760]">View All</button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 text-sm">Site Visit Request</p>
              <p className="text-gray-500 text-xs">Marina Heights - Pending</p>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Pending</span>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 text-sm">Interest Expressed</p>
              <p className="text-gray-500 text-xs">Palm Residences - In Progress</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
