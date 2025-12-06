
export type UserRole = 'broker' | 'buyer' | 'homeowner' | 'guest' | 'tenant';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  roles: UserRole[];
  currentRole?: UserRole;
  preferredRole?: UserRole;
}

export interface PropertyFeature {
  parking?: number;
  balcony?: boolean;
  furnished?: boolean;
  view?: string;
}

export interface ProximityItem {
  name: string;
  time: string;
  icon: string;
}

export interface Property {
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
  features: PropertyFeature;
  proximity?: ProximityItem[];
  handoverDate?: string;
}
