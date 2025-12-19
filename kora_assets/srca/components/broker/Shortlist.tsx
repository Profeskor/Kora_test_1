import { useState } from 'react';
import { Heart, Search, Trash2, Scale, UserPlus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ShortlistProperty {
  id: string;
  name: string;
  image: string;
  startingPrice: string;
  availableUnits: number;
  location: string;
  bedroomRange: string;
  badge?: string;
}

interface ShortlistProps {
  onBack: () => void;
  onPropertySelect: (propertyId: string) => void;
  onCreateLead?: (propertyId: string) => void;
  onCompare?: (propertyId: string) => void;
}

export function Shortlist({ onBack, onPropertySelect, onCreateLead, onCompare }: ShortlistProps) {
  const [shortlistedProperties, setShortlistedProperties] = useState<ShortlistProperty[]>([
    {
      id: '1',
      name: 'IL VENTO at Dubai Maritime City',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      startingPrice: 'AED 1.2M',
      availableUnits: 45,
      location: 'Dubai Maritime City',
      bedroomRange: '1-3 BR Apartments',
      badge: 'Exclusive',
    },
    {
      id: '2',
      name: 'Marina Heights Tower',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      startingPrice: 'AED 980K',
      availableUnits: 32,
      location: 'Dubai Marina',
      bedroomRange: '1-2 BR Apartments',
      badge: 'New Launch',
    },
    {
      id: '3',
      name: 'Sky Gardens Residences',
      image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80',
      startingPrice: 'AED 1.5M',
      availableUnits: 28,
      location: 'DIFC',
      bedroomRange: '2-4 BR Apartments',
    },
    {
      id: '4',
      name: 'Bay East Tower',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      startingPrice: 'AED 850K',
      availableUnits: 56,
      location: 'Business Bay',
      bedroomRange: '1-2 BR Apartments',
      badge: 'Hot Deal',
    },
    {
      id: '5',
      name: 'Palm Residence',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      startingPrice: 'AED 2.8M',
      availableUnits: 12,
      location: 'Palm Jumeirah',
      bedroomRange: '3-5 BR Villas',
      badge: 'Luxury',
    },
  ]);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [removedProperty, setRemovedProperty] = useState<{ property: ShortlistProperty; index: number } | null>(null);

  const handleRemove = (property: ShortlistProperty, index: number) => {
    // Store for undo
    setRemovedProperty({ property, index });
    
    // Remove from list
    setShortlistedProperties(prev => prev.filter(p => p.id !== property.id));
    
    // Show toast with undo
    toast.success('Property removed from shortlist', {
      action: {
        label: 'Undo',
        onClick: () => handleUndo(),
      },
      duration: 5000,
    });
  };

  const handleUndo = () => {
    if (removedProperty) {
      setShortlistedProperties(prev => {
        const newList = [...prev];
        newList.splice(removedProperty.index, 0, removedProperty.property);
        return newList;
      });
      setRemovedProperty(null);
      toast.success('Property restored to shortlist');
    }
  };

  const handleCompare = (propertyId: string) => {
    if (onCompare) {
      onCompare(propertyId);
      toast.success('Property added to comparison');
    }
  };

  const handleAddLead = (propertyId: string) => {
    if (onCreateLead) {
      onCreateLead(propertyId);
    }
  };

  const filteredProperties = shortlistedProperties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Empty State
  if (shortlistedProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#005B78]" />
              </button>
              <h1 className="text-[#005B78] text-xl">My Shortlist</h1>
            </div>
          </div>
        </header>

        {/* Empty State Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
          <div className="w-32 h-32 bg-gradient-to-br from-[#005B78]/10 to-[#005B78]/5 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-[#005B78]/30" />
          </div>
          
          <h2 className="text-[#005B78] text-2xl mb-3 text-center">Your Shortlist is Empty</h2>
          
          <p className="text-gray-600 text-center mb-8 max-w-sm">
            Start browsing properties and tap the ♡ icon to save them here for later.
          </p>

          <button
            onClick={onBack}
            className="px-8 py-4 bg-[#005B78] text-white rounded-xl hover:bg-[#004a5e] transition-colors shadow-lg"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  // Populated State
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#005B78]" />
            </button>
            <h1 className="text-[#005B78] text-xl">My Shortlist</h1>
          </div>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center hover:bg-[#CCE5EB] transition-colors"
          >
            <Search className="w-5 h-5 text-[#005B78]" />
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005B78] focus:border-transparent"
              autoFocus
            />
          </div>
        )}

        {/* Count */}
        <p className="text-gray-600 text-sm mt-2">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Shortlisted
        </p>
      </header>

      {/* Property Cards */}
      <div className="px-4 py-6 space-y-4">
        {filteredProperties.map((property, index) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Property Image */}
            <div
              className="relative h-48 cursor-pointer"
              onClick={() => onPropertySelect(property.id)}
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              
              {/* Project Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white">{property.name}</h3>
              </div>

              {/* Badge */}
              {property.badge && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#005B78] text-white rounded-full text-xs shadow-lg">
                  {property.badge}
                </div>
              )}

              {/* Favorite Icon */}
              <div className="absolute top-3 left-3">
                <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => onPropertySelect(property.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[#005B78] text-2xl mb-1">{property.startingPrice}</p>
                  <p className="text-gray-600 text-sm">Starting Price</p>
                </div>
                <div className="text-right">
                  <p className="text-[#005B78] text-xl mb-1">{property.availableUnits}</p>
                  <p className="text-gray-600 text-sm">Units Available</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">📍</span>
                  <span className="text-gray-700 text-sm">{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">🏠</span>
                  <span className="text-gray-700 text-sm">{property.bedroomRange}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(property, index);
                }}
                className="flex-1 px-2 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-xs">Remove</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompare(property.id);
                }}
                className="flex-1 px-2 py-2 border border-[#005B78] text-[#005B78] rounded-lg hover:bg-[#E6F2F5] transition-colors flex items-center justify-center gap-1.5"
              >
                <Scale className="w-4 h-4" />
                <span className="text-xs">Compare</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddLead(property.id);
                }}
                className="flex-1 px-2 py-2 bg-[#005B78] text-white rounded-lg hover:bg-[#004a5e] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-xs">Add Lead</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProperties.length === 0 && searchQuery && (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <Search className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-600 text-center">
            No properties found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}