export type UserRole = "broker" | "buyer" | "homeowner" | "guest" | "tenant";
export type AppScreen =
  | "splash"
  | "onboarding"
  | "landing"
  | "auth"
  | "registration"
  | "quick-pay"
  | "app";

export type AppTab = "home" | "search" | "shortlist" | "leads" | "booking";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  roles: UserRole[];
  currentRole?: UserRole;
  preferredRole?: UserRole;
  company?: string;
  jobTitle?: string;
  address?: string;
  city?: string;
  dob?: string;
  phone?: string;
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
  status: "Available" | "Reserved" | "Sold";
  type: string;
  images: string[];
  description: string;
  amenities: string[];
  features: PropertyFeature;
  proximity?: ProximityItem[];
  handoverDate?: string;
  units?: Unit[];
}

export interface Unit {
  id: string;
  label: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  price: number;
  status: "Available" | "Reserved" | "Sold";
  floor?: string;
  view?: string;
  image?: string;
}
