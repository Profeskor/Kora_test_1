import { ArrowLeft, X, Bed, Bath, Maximize2, MapPin, DollarSign, Check, Calendar, Car, Building2 } from 'lucide-react';
import { useState } from 'react';

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
  type: string;
  image: string;
  amenities: string[];
  features: {
    parking?: number;
    balcony?: boolean;
    furnished?: boolean;
    view?: string;
  };
  handoverDate?: string;
}

interface ComparePropertiesProps {
  properties: Property[];
  onBack: () => void;
  onRemoveProperty: (propertyId: string) => void;
  onPropertySelect?: (propertyId: string) => void;
}

export function CompareProperties({ 
  properties, 
  onBack, 
  onRemoveProperty,
  onPropertySelect 
}: ComparePropertiesProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>('overview');

  // Empty state
  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#005B78]" />
            </button>
            <div>
              <h1 className="text-[#005B78]">Compare Properties</h1>
              <p className="text-gray-500 text-sm">Side-by-side comparison</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-6 py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-[#005B78] text-xl mb-2">No Properties to Compare</h2>
          <p className="text-gray-500 text-center mb-8 max-w-sm">
            Start adding properties from the property details page to compare them side-by-side
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const comparisonFeatures = [
    { id: 'overview', label: 'Overview' },
    { id: 'price', label: 'Price & Size' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'features', label: 'Features' },
  ];

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  const formatSize = (size: number) => {
    return `${size.toLocaleString()} sq ft`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#005B78]" />
            </button>
            <div>
              <h1 className="text-[#005B78]">Compare Properties</h1>
              <p className="text-gray-500 text-sm">{properties.length} {properties.length === 1 ? 'property' : 'properties'} selected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-[73px] z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {comparisonFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedFeature === feature.id
                  ? 'bg-[#005B78] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Content */}
      <div className="p-4">
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {properties.map((property) => (
              <div
                key={property.id}
                className="w-80 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-shrink-0"
              >
                {/* Property Image & Header */}
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${property.image})` }}
                    onClick={() => onPropertySelect?.(property.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveProperty(property.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white mb-1">{property.name}</h3>
                      <p className="text-white/80 text-sm">{property.project}</p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      property.status === 'Available'
                        ? 'bg-green-500 text-white'
                        : property.status === 'Reserved'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  {/* Overview */}
                  {selectedFeature === 'overview' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-[#005B78]" />
                        <p className="text-sm">{property.location}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5 text-[#005B78]" />
                          <span className="text-[#005B78]">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="w-5 h-5 text-[#005B78]" />
                          <span className="text-[#005B78]">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-5 h-5 text-[#005B78]" />
                          <span className="text-[#005B78]">{formatSize(property.size)}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-500 text-xs mb-1">Type</p>
                        <p className="text-[#005B78]">{property.type}</p>
                      </div>

                      {property.handoverDate && (
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-gray-500 text-xs mb-1">Handover</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#005B78]" />
                            <p className="text-[#005B78]">{property.handoverDate}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price & Size */}
                  {selectedFeature === 'price' && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-500 text-xs mb-2">Price</p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-[#005B78]" />
                          <p className="text-[#005B78] text-2xl">{formatPrice(property.price)}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-500 text-xs mb-2">Built-up Area</p>
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-5 h-5 text-[#005B78]" />
                          <p className="text-[#005B78] text-xl">{formatSize(property.size)}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-500 text-xs mb-2">Price per sq ft</p>
                        <p className="text-[#005B78] text-lg">
                          AED {Math.round(property.price / property.size).toLocaleString()}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-500 text-xs mb-2">Configuration</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-[#005B78]" />
                            <span className="text-[#005B78]">{property.bedrooms} BR</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-[#005B78]" />
                            <span className="text-[#005B78]">{property.bathrooms} BA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Amenities */}
                  {selectedFeature === 'amenities' && (
                    <div className="space-y-2">
                      <p className="text-gray-500 text-xs mb-3">Available Amenities</p>
                      {property.amenities.length > 0 ? (
                        <div className="space-y-2">
                          {property.amenities.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0"
                            >
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-[#005B78] text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">No amenities listed</p>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  {selectedFeature === 'features' && (
                    <div className="space-y-4">
                      {property.features.parking !== undefined && (
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <Car className="w-5 h-5 text-[#005B78]" />
                            <span className="text-[#005B78]">Parking Spaces</span>
                          </div>
                          <span className="text-[#005B78]">{property.features.parking}</span>
                        </div>
                      )}

                      {property.features.balcony !== undefined && (
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-[#005B78]">Balcony</span>
                          <span className={property.features.balcony ? 'text-green-600' : 'text-gray-400'}>
                            {property.features.balcony ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}

                      {property.features.furnished !== undefined && (
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-[#005B78]">Furnished</span>
                          <span className={property.features.furnished ? 'text-green-600' : 'text-gray-400'}>
                            {property.features.furnished ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}

                      {property.features.view && (
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-[#005B78]">View</span>
                          <span className="text-[#005B78]">{property.features.view}</span>
                        </div>
                      )}

                      {!property.features.parking && 
                       !property.features.balcony && 
                       !property.features.furnished && 
                       !property.features.view && (
                        <p className="text-gray-400 text-sm">No features listed</p>
                      )}
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onPropertySelect?.(property.id)}
                    className="w-full py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful tip */}
        {properties.length < 4 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-[#005B78] text-sm">
              💡 <strong>Tip:</strong> You can compare up to 4 properties at once. Add more properties to see a detailed side-by-side comparison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
