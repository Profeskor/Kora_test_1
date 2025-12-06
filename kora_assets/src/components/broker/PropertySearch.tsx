import image_b12b760ee62ef63d3e1eab0bfc8d45f236f6c19f from 'figma:asset/b12b760ee62ef63d3e1eab0bfc8d45f236f6c19f.png';
import image_0bb09df4af3278b2ab24398f9d0fe90f4236d2f9 from 'figma:asset/0bb09df4af3278b2ab24398f9d0fe90f4236d2f9.png';
import image_2fd1ce062b7aa6dd81481acc65b51a0d2a9d18f8 from 'figma:asset/2fd1ce062b7aa6dd81481acc65b51a0d2a9d18f8.png';
import image_de4cfb3721f06ce5c6aee0ae1282e83ea5a2fd70 from 'figma:asset/de4cfb3721f06ce5c6aee0ae1282e83ea5a2fd70.png';
import image_af4dca90b78f8d0692ac70519eb87289bafedb2b from 'figma:asset/af4dca90b78f8d0692ac70519eb87289bafedb2b.png';
import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X, MapPin, Bed, Maximize2 } from 'lucide-react';

interface PropertySearchProps {
  onPropertySelect: (propertyId: string) => void;
  onBack: () => void;
}

interface Property {
  id: string;
  name: string;
  project: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  status: 'Available' | 'Reserved' | 'Sold';
  image: string;
  type: string;
}

export function PropertySearch({ onPropertySelect, onBack }: PropertySearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'size' | 'newest'>('newest');
  
  // Filter states
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    sizeMin: '',
    sizeMax: '',
    bedrooms: '',
    project: '',
    status: 'all'
  });

  // Mock property data
  const properties: Property[] = [
    {
      id: '1',
      name: 'IL VENTO - Feel The Wind',
      project: 'IL VENTO',
      location: 'Dubai Maritime',
      price: 5200000,
      size: 2800,
      bedrooms: 3,
      bathrooms: 4,
      status: 'Available',
      image: image_af4dca90b78f8d0692ac70519eb87289bafedb2b,
      type: 'Apartment'
    },
    {
      id: '2',
      name: 'Marina Heights - Unit 205',
      project: 'Marina Heights',
      location: 'Dubai Marina',
      price: 1850000,
      size: 1250,
      bedrooms: 2,
      bathrooms: 2,
      status: 'Available',
      image: image_0bb09df4af3278b2ab24398f9d0fe90f4236d2f9,
      type: 'Apartment'
    },
    {
      id: '3',
      name: 'Bay East - Penthouse 3',
      project: 'Bay East',
      location: 'Business Bay',
      price: 3200000,
      size: 2100,
      bedrooms: 3,
      bathrooms: 3,
      status: 'Available',
      image: image_2fd1ce062b7aa6dd81481acc65b51a0d2a9d18f8,
      type: 'Penthouse'
    },
    {
      id: '4',
      name: 'Sky Gardens - Villa 12',
      project: 'Sky Gardens',
      location: 'Arabian Ranches',
      price: 4500000,
      size: 3500,
      bedrooms: 4,
      bathrooms: 5,
      status: 'Available',
      image: image_b12b760ee62ef63d3e1eab0bfc8d45f236f6c19f,
      type: 'Villa'
    },
    {
      id: '5',
      name: 'Waterfront Towers - Unit 1802',
      project: 'Waterfront Towers',
      location: 'Jumeirah Beach',
      price: 2750000,
      size: 1800,
      bedrooms: 3,
      bathrooms: 3,
      status: 'Reserved',
      image: image_de4cfb3721f06ce5c6aee0ae1282e83ea5a2fd70,
      type: 'Apartment'
    },
  ];

  const handleApplyFilters = () => {
    setShowFilters(false);
    // Apply filter logic here
  };

  const handleClearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      sizeMin: '',
      sizeMax: '',
      bedrooms: '',
      project: '',
      status: 'all'
    });
  };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project, location, or unit..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
          />
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Filters</span>
          </button>

          <div className="flex-1 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-[rgb(96,115,118)] appearance-none focus:outline-none focus:ring-2 focus:ring-[#005B78]"
            >
              <option value="newest" className="bg-white text-gray-900">Newest First</option>
              <option value="price" className="bg-white text-gray-900">Price: Low to High</option>
              <option value="size" className="bg-white text-gray-900">Size: Large to Small</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Filters</h3>
            <button
              onClick={handleClearFilters}
              className="text-sm text-[#005B78] hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Price Range (AED)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]"
              />
            </div>
          </div>

          {/* Size Range */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Size (sq ft)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.sizeMin}
                onChange={(e) => setFilters({ ...filters, sizeMin: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.sizeMax}
                onChange={(e) => setFilters({ ...filters, sizeMax: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Bedrooms</label>
            <div className="flex gap-2">
              {['Studio', '1', '2', '3', '4+'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => setFilters({ ...filters, bedrooms: bed })}
                  className={`flex-1 py-2 rounded-xl border transition-colors ${
                    filters.bedrooms === bed
                      ? 'bg-[#005B78] text-white border-[#005B78]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#005B78]'
                  }`}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Status</label>
            <div className="flex gap-2">
              {['all', 'Available', 'Reserved'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilters({ ...filters, status })}
                  className={`flex-1 py-2 rounded-xl border transition-colors capitalize ${
                    filters.status === status
                      ? 'bg-[#005B78] text-white border-[#005B78]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#005B78]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Property List */}
      <div className="px-4 py-6">
        <p className="text-gray-600 text-sm mb-4">{properties.length} properties found</p>
        
        <div className="space-y-4">
          {properties.map((property) => (
            <button
              key={property.id}
              onClick={() => onPropertySelect(property.id)}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
                    property.status === 'Available'
                      ? 'bg-green-500/90 text-white'
                      : 'bg-amber-500/90 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{property.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#005B78]">{formatPrice(property.price)}</p>
                </div>

                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} BR</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" />
                    <span>{property.size.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}