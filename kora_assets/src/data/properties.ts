// Shared property data for the application

export interface PropertyData {
  id: string;
  name: string;
  tagline?: string;
  project: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  status: 'Available' | 'Reserved' | 'Sold';
  type: string;
  images: string[];
  description: string;
  amenities: string[];
  features: {
    parking?: number;
    balcony?: boolean;
    furnished?: boolean;
    view?: string;
  };
  proximity?: Array<{
    name: string;
    time: string;
    icon: 'school' | 'building' | 'landmark' | 'beach';
  }>;
  handoverDate?: string;
}

export const PROPERTIES_DATA: Record<string, PropertyData> = {
  '1': {
    id: '1',
    name: 'IL VENTO',
    tagline: 'Feel The Wind',
    project: 'IL VENTO',
    location: 'Dubai Maritime',
    price: 5200000,
    size: 2800,
    bedrooms: 3,
    bathrooms: 4,
    status: 'Available',
    type: 'Apartment',
    images: [
      'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0OTM0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1715985160053-d339e8b6eb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwbHV4dXJ5JTIwYXBhcnRtZW50fGVufDF8fHx8MTc2NDkzNDIyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760067537116-de1f76fe8f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwYmFsY29ueSUyMHZpZXd8ZW58MXx8fHwxNzY0OTM0MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Experience luxury waterfront living at IL VENTO, where contemporary design meets the tranquility of Dubai Maritime. This stunning 3-bedroom apartment offers panoramic views of the marina, premium finishes throughout, and access to world-class amenities. Feel the wind as you relax on your private balcony overlooking the stunning waterfront.',
    amenities: [
      'Infinity Pool',
      'Fitness Center',
      'Private Beach Access',
      'Concierge Service',
      '24/7 Security',
      'Covered Parking',
      'Children\'s Play Area',
      'BBQ Area',
      'Landscaped Gardens',
      'High-Speed WiFi',
    ],
    features: {
      parking: 2,
      balcony: true,
      furnished: false,
      view: 'Marina View',
    },
    proximity: [
      {
        name: 'Dubai Marina',
        time: '5 min',
        icon: 'landmark',
      },
      {
        name: 'Jumeirah Beach',
        time: '10 min',
        icon: 'beach',
      },
      {
        name: 'Burj Khalifa',
        time: '15 min',
        icon: 'building',
      },
    ],
    handoverDate: 'Q4 2025',
  },
  '2': {
    id: '2',
    name: 'Marina Heights - Unit 205',
    project: 'Marina Heights',
    location: 'Dubai Marina',
    price: 1850000,
    size: 1250,
    bedrooms: 2,
    bathrooms: 2,
    status: 'Available',
    type: 'Apartment',
    images: [
      'https://images.unsplash.com/photo-1657383543451-e47d1589195d?w=800',
      'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0OTM0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Modern 2-bedroom apartment in the heart of Dubai Marina. Featuring floor-to-ceiling windows, contemporary design, and easy access to restaurants, shopping, and entertainment.',
    amenities: [
      'Swimming Pool',
      'Gym',
      'Parking',
      'Security',
      'Playground',
    ],
    features: {
      parking: 1,
      balcony: true,
      furnished: false,
      view: 'Marina View',
    },
    handoverDate: 'Q3 2025',
  },
  '3': {
    id: '3',
    name: 'Bay East - Penthouse 3',
    project: 'Bay East',
    location: 'Business Bay',
    price: 3200000,
    size: 2100,
    bedrooms: 3,
    bathrooms: 3,
    status: 'Available',
    type: 'Penthouse',
    images: [
      'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0OTM0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Luxurious penthouse in Business Bay with stunning city views, modern amenities, and premium finishes.',
    amenities: [
      'Rooftop Pool',
      'Gym',
      'Spa',
      'Valet Parking',
      'Concierge',
    ],
    features: {
      parking: 2,
      balcony: true,
      furnished: true,
      view: 'City View',
    },
    handoverDate: 'Q2 2026',
  },
  '4': {
    id: '4',
    name: 'Sky Gardens - Villa 12',
    project: 'Sky Gardens',
    location: 'DIFC',
    price: 4500000,
    size: 3500,
    bedrooms: 4,
    bathrooms: 5,
    status: 'Available',
    type: 'Villa',
    images: [
      'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0OTM0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Spacious 4-bedroom villa with private garden, modern design, and access to exclusive amenities.',
    amenities: [
      'Private Garden',
      'Community Pool',
      'Gym',
      'Kids Play Area',
      'Security',
    ],
    features: {
      parking: 3,
      balcony: false,
      furnished: false,
      view: 'Garden View',
    },
    handoverDate: 'Q1 2026',
  },
  '5': {
    id: '5',
    name: 'Waterfront Towers - Unit 1802',
    project: 'Waterfront Towers',
    location: 'Palm Jumeirah',
    price: 2750000,
    size: 1800,
    bedrooms: 2,
    bathrooms: 3,
    status: 'Reserved',
    type: 'Apartment',
    images: [
      'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0OTM0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description:
      'Premium waterfront apartment on Palm Jumeirah with breathtaking sea views and resort-style amenities.',
    amenities: [
      'Beach Access',
      'Infinity Pool',
      'Gym',
      'Spa',
      'Concierge',
    ],
    features: {
      parking: 2,
      balcony: true,
      furnished: true,
      view: 'Sea View',
    },
    handoverDate: 'Q3 2025',
  },
};

// Helper function to get property data by ID
export const getPropertyById = (id: string): PropertyData | null => {
  return PROPERTIES_DATA[id] || null;
};

// Helper function to get multiple properties by IDs
export const getPropertiesByIds = (ids: string[]): PropertyData[] => {
  return ids.map(id => PROPERTIES_DATA[id]).filter(Boolean);
};
