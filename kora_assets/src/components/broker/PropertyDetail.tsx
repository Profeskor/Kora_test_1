import image_3a6594777eb7755633dc7d52e1c0bd07d31cae7d from 'figma:asset/3a6594777eb7755633dc7d52e1c0bd07d31cae7d.png';
import { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Check,
  Car,
  Waves,
  Dumbbell,
  Shield,
  Wifi,
  Wind,
  ChevronLeft,
  ChevronRight,
  School,
  Building2,
  MessageCircle,
  X,
  Loader2,
  CheckCircle,
  Download,
  FileText,
  LayoutGrid,
  UserPlus,
  CalendarCheck,
  Scale,
} from 'lucide-react';

interface PropertyDetailProps {
  propertyId: string;
  onBack: () => void;
  onAddToLead?: () => void;
  onBookNow?: () => void;
  onAddToComparison?: (propertyId: string) => 'added' | 'duplicate' | 'limit_reached';
}

interface PropertyData {
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
}

export function PropertyDetail({
  propertyId,
  onBack,
  onAddToLead,
  onBookNow,
  onAddToComparison,
}: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'loading' | 'success'>('loading');
  const [emailForm, setEmailForm] = useState({
    recipient: '',
    subject: '',
    body: '',
  });

  // Helper function to generate and download a dummy PDF
  const downloadDummyPDF = (filename: string, content: string) => {
    // Create a simple PDF-like content using data URL
    // In production, you'd use a PDF library like jsPDF or pdfmake
    const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 24 Tf
50 700 Td
(${content}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000317 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
417
%%EOF
    `;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle brochure download
  const handleBrochureDownload = () => {
    setToastType('loading');
    setToastMessage('Preparing Property Brochure...');
    setShowToast(true);
    
    setTimeout(() => {
      const filename = `${property.name.replace(/\s+/g, '_')}_Brochure.pdf`;
      const content = `KORA PROPERTIES - ${property.name} - Property Brochure`;
      downloadDummyPDF(filename, content);
      
      setToastType('success');
      setToastMessage('Brochure downloaded successfully!');
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  // Handle floor plan download
  const handleFloorPlanDownload = () => {
    setToastType('loading');
    setToastMessage('Preparing Floor Plans...');
    setShowToast(true);
    
    setTimeout(() => {
      const filename = `${property.name.replace(/\s+/g, '_')}_Floor_Plans.pdf`;
      const content = `KORA PROPERTIES - ${property.name} - Floor Plans`;
      downloadDummyPDF(filename, content);
      
      setToastType('success');
      setToastMessage('Floor plans downloaded successfully!');
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  // Handle adding to comparison
  const handleAddToComparison = () => {
    if (onAddToComparison) {
      const result = onAddToComparison(propertyId);
      // Show success toast
      setToastType('success');
      setToastMessage(
        result === 'added'
          ? 'Property added to Comparison List'
          : result === 'duplicate'
          ? 'Property already in Comparison List'
          : 'Comparison List limit reached'
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Mock property data - in real app this would fetch based on propertyId
  const propertyData: Record<string, PropertyData> = {
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
        view: 'City View',
      },
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
        'https://images.unsplash.com/photo-1594873604892-b599f847e859?w=800',
        'https://images.unsplash.com/photo-1760067537116-de1f76fe8f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwYmFsY29ueSUyMHZpZXd8ZW58MXx8fHwxNzY0OTM0MjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      description:
        'Exclusive penthouse offering breathtaking views of Business Bay and Burj Khalifa. This prestigious residence features premium finishes and private terrace.',
      amenities: [
        'Rooftop Pool',
        'Spa',
        'Valet Parking',
        'Concierge',
        'Private Elevator',
      ],
      features: {
        parking: 2,
        balcony: true,
        furnished: true,
        view: 'Burj Khalifa View',
      },
    },
    '4': {
      id: '4',
      name: 'Sky Gardens - Villa 12',
      project: 'Sky Gardens',
      location: 'Arabian Ranches',
      price: 4500000,
      size: 3500,
      bedrooms: 4,
      bathrooms: 5,
      status: 'Available',
      type: 'Villa',
      images: [
        'https://images.unsplash.com/photo-1679364297777-1db77b6199be?w=800',
        'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0OTM0MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      description:
        'Spacious 4-bedroom villa in gated community with private garden and pool. Perfect for families seeking tranquility while staying connected to the city.',
      amenities: [
        'Private Pool',
        'Garden',
        'Garage',
        'Maid\'s Room',
        'Community Park',
      ],
      features: {
        parking: 3,
        balcony: false,
        furnished: false,
        view: 'Garden View',
      },
    },
    '5': {
      id: '5',
      name: 'Waterfront Towers - Unit 1802',
      project: 'Waterfront Towers',
      location: 'Jumeirah Beach',
      price: 2750000,
      size: 1800,
      bedrooms: 3,
      bathrooms: 3,
      status: 'Reserved',
      type: 'Apartment',
      images: [
        'https://images.unsplash.com/photo-1534344132535-45f01a5a3503?w=800',
        'https://images.unsplash.com/photo-1715985160053-d339e8b6eb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwbHV4dXJ5JTIwYXBhcnRtZW50fGVufDF8fHx8MTc2NDkzNDIyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      description:
        'Beachfront apartment with stunning sea views. This 3-bedroom residence offers direct beach access and resort-style living in Jumeirah Beach.',
      amenities: [
        'Beach Access',
        'Pool',
        'Gym',
        'Spa',
        'Restaurant',
      ],
      features: {
        parking: 2,
        balcony: true,
        furnished: false,
        view: 'Sea View',
      },
    },
  };

  const property = propertyData[propertyId] || propertyData['1'];

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleWhatsAppShare = () => {
    // Show loading toast
    setToastType('loading');
    setToastMessage('Preparing PDF... Opening WhatsApp');
    setShowToast(true);
    setShowShareModal(false);

    // Simulate PDF generation and WhatsApp opening
    setTimeout(() => {
      const message = `Check out this property: ${property.name} at ${property.location}\n\nPrice: ${formatPrice(property.price)}\n${property.bedrooms} Bedrooms | ${property.bathrooms} Bathrooms | ${property.size.toLocaleString()} sq ft\n\n${property.description}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setShowToast(false);
    }, 1500);
  };

  const handleEmailShare = () => {
    setShowShareModal(false);
    setShowEmailModal(true);
    // Pre-fill email form
    setEmailForm({
      recipient: '',
      subject: `${property.name} Brochure from Kora Properties`,
      body: `Dear Client,\n\nI am pleased to share with you the details of this exceptional property:\n\n${property.name}\nLocation: ${property.location}\nPrice: ${formatPrice(property.price)}\n\n${property.description}\n\nPlease find the PDF brochure attached.\n\nBest regards,\nKora Properties Team`,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email sending
    setToastType('loading');
    setShowToast(true);
    setToastMessage('Sending email...');
    setTimeout(() => {
      setToastType('success');
      setToastMessage('Email sent successfully!');
      setShowEmailModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-80 bg-gray-900">
        <img
          src={property.images[currentImageIndex]}
          alt={property.name}
          className="w-full h-full object-cover"
        />

        {/* Image Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#005B78]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#005B78]" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#005B78]" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-[#005B78]'
                  }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Share2 className="w-5 h-5 text-[#005B78]" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-20 right-4">
          <span
            className={`px-4 py-2 rounded-full text-sm backdrop-blur-sm ${
              property.status === 'Available'
                ? 'bg-green-500/90 text-white'
                : property.status === 'Reserved'
                ? 'bg-amber-500/90 text-white'
                : 'bg-gray-500/90 text-white'
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Property Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-[#005B78] mb-1">{property.name}</h1>
              {property.tagline && (
                <p className="text-[#005B78] text-sm italic mb-2">
                  {property.tagline}
                </p>
              )}
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#005B78]">{formatPrice(property.price)}</p>
            </div>
          </div>
        </div>

        {/* Key Details */}
        <div className="bg-white rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#005B78]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Bed className="w-6 h-6 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-sm">{property.bedrooms}</p>
              <p className="text-gray-500 text-xs">Bedrooms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#005B78]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Bath className="w-6 h-6 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-sm">{property.bathrooms}</p>
              <p className="text-gray-500 text-xs">Bathrooms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#005B78]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Maximize2 className="w-6 h-6 text-[#005B78]" />
              </div>
              <p className="text-[#005B78] text-sm">
                {property.size.toLocaleString()}
              </p>
              <p className="text-gray-500 text-xs">sq ft</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-[#005B78] mb-3">Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Project Specifications - Only for IL VENTO */}
        {propertyId === '1' && (
          <div className="bg-white rounded-2xl p-4">
            <h2 className="text-[#005B78] mb-4">Project Specifications</h2>
            <img
              src={image_3a6594777eb7755633dc7d52e1c0bd07d31cae7d}
              alt="IL VENTO Project Specifications"
              className="w-full rounded-xl"
            />
          </div>
        )}

        {/* Features */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-[#005B78] mb-3">Property Features</h2>
          <div className="space-y-3">
            {property.features.parking && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005B78]/10 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-[#005B78]" />
                </div>
                <div>
                  <p className="text-[#005B78] text-sm">Parking Spaces</p>
                  <p className="text-gray-500 text-xs">
                    {property.features.parking} covered spaces
                  </p>
                </div>
              </div>
            )}
            {property.features.view && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005B78]/10 rounded-xl flex items-center justify-center">
                  <Wind className="w-5 h-5 text-[#005B78]" />
                </div>
                <div>
                  <p className="text-[#005B78] text-sm">View</p>
                  <p className="text-gray-500 text-xs">
                    {property.features.view}
                  </p>
                </div>
              </div>
            )}
            {property.features.balcony && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005B78]/10 rounded-xl flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#005B78]" />
                </div>
                <div>
                  <p className="text-[#005B78] text-sm">Private Balcony</p>
                  <p className="text-gray-500 text-xs">
                    With stunning views
                  </p>
                </div>
              </div>
            )}
            {property.features.furnished !== undefined && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005B78]/10 rounded-xl flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#005B78]" />
                </div>
                <div>
                  <p className="text-[#005B78] text-sm">Furnishing</p>
                  <p className="text-gray-500 text-xs">
                    {property.features.furnished ? 'Fully Furnished' : 'Unfurnished'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Proximity Section */}
          {property.proximity && property.proximity.length > 0 && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <h3 className="text-[#005B78] text-sm mb-3">Nearby</h3>
              <div className="space-y-3">
                {property.proximity.map((location, index) => {
                  const getIcon = () => {
                    switch (location.icon) {
                      case 'school':
                        return <School className="w-5 h-5 text-[#005B78]" />;
                      case 'building':
                        return <Building2 className="w-5 h-5 text-[#005B78]" />;
                      case 'beach':
                        return <Waves className="w-5 h-5 text-[#005B78]" />;
                      case 'landmark':
                        return <MapPin className="w-5 h-5 text-[#005B78]" />;
                      default:
                        return <MapPin className="w-5 h-5 text-[#005B78]" />;
                    }
                  };

                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#005B78]/10 rounded-xl flex items-center justify-center">
                        {getIcon()}
                      </div>
                      <div className="flex-1">
                        <p className="text-[#005B78] text-sm">{location.name}</p>
                        <p className="text-gray-500 text-xs">{location.time} away</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-[#005B78] mb-3">Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#005B78] flex-shrink-0" />
                <span className="text-gray-700 text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable Content */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-[#005B78] mb-4">Downloads</h2>
          <div className="space-y-3">
            {/* Property Brochure */}
            <button
              onClick={handleBrochureDownload}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#005B78]/5 to-[#005B78]/10 rounded-xl hover:from-[#005B78]/10 hover:to-[#005B78]/20 transition-all group border border-[#005B78]/20 text-[13px]"
            >
              <div className="w-14 h-14 bg-[#005B78] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#005B78] mb-1 text-[14px] font-bold">Property Brochure</p>
                <p className="text-gray-500 text-xs">
                  Complete property details with images (PDF)
                </p>
              </div>
              <Download className="w-5 h-5 text-[#005B78] group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Floor Plans */}
            <button
              onClick={handleFloorPlanDownload}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#005B78]/5 to-[#005B78]/10 rounded-xl hover:from-[#005B78]/10 hover:to-[#005B78]/20 transition-all group border border-[#005B78]/20 text-[13px]"
            >
              <div className="w-14 h-14 bg-[#005B78] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#005B78] mb-1 font-bold text-[14px]">Floor Plans</p>
                <p className="text-gray-500 text-xs">
                  Detailed layout and dimensions (PDF)
                </p>
              </div>
              <Download className="w-5 h-5 text-[#005B78] group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Contact Agent Section */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-[#005B78] mb-3">Contact Information</h2>
          <div className="space-y-3">
            <a
              href="tel:+971123456789"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-[#005B78] rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[#005B78] text-sm">Call Agent</p>
                <p className="text-gray-500 text-xs">+971 12 345 6789</p>
              </div>
            </a>
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-[#005B78] rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[#005B78] text-sm">Email Agent</p>
                <p className="text-gray-500 text-xs">broker@kora.ae</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50">
        <div className="max-w-lg mx-auto">
          {/* Three Action Buttons */}
          <div className="flex gap-2 items-center">
            {/* Add Lead Button - Primary CTA */}
            <button
              onClick={onAddToLead}
              className="flex-1 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">Add Lead</span>
            </button>

            {/* Create Booking Button - Secondary CTA */}
            <button
              onClick={onBookNow}
              className="flex-1 py-3 bg-white border-2 border-[#005B78] text-[#005B78] rounded-xl hover:bg-[#005B78]/5 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="text-sm">Booking</span>
            </button>

            {/* Add to Comparison Button - Tertiary/Utility */}
            <button
              onClick={handleAddToComparison}
              className="flex-1 py-3 bg-gray-100 text-[#005B78] rounded-xl hover:bg-gray-200 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
              title="Add to Comparison"
            >
              <Scale className="w-4 h-4" />
              <span className="text-sm">Compare</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom padding to account for fixed action bar */}
      <div className="h-20"></div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-[#005B78] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-xl">Share Property Details</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-white/80 text-sm mb-6">
              Select a channel to share the PDF brochure for {property.name}.
            </p>

            <div className="space-y-3">
              {/* WhatsApp Option */}
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-white rounded-2xl p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-[#005B78] mb-1">Share via WhatsApp</p>
                    <p className="text-gray-500 text-xs">
                      Share a professional PDF brochure instantly
                    </p>
                  </div>
                </div>
              </button>

              {/* Email Option */}
              <button
                onClick={handleEmailShare}
                className="w-full bg-white rounded-2xl p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#005B78] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-[#005B78] mb-1">Share via Email</p>
                    <p className="text-gray-500 text-xs">
                      Generate and send the PDF to a client&apos;s email
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[#005B78] text-xl">Send Email Brochure</h2>
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-[#005B78]" />
              </button>
            </div>
            <p className="text-gray-500 text-xs mb-6">
              PDF attachment is automatically included
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-[#005B78] text-sm mb-2">
                  Recipient Email
                </label>
                <input
                  type="email"
                  name="recipient"
                  value={emailForm.recipient}
                  onChange={handleEmailChange}
                  placeholder="client@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]/20 focus:border-[#005B78] text-[#005B78]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#005B78] text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={emailForm.subject}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]/20 focus:border-[#005B78] text-[#005B78]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#005B78] text-sm mb-2">
                  Message
                </label>
                <textarea
                  name="body"
                  value={emailForm.body}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setEmailForm((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }));
                  }}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005B78]/20 focus:border-[#005B78] text-[#005B78] resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-[#005B78] rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#005B78] text-white rounded-xl hover:bg-[#004A5F] transition-colors"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div
          className={`fixed bottom-4 left-4 right-4 bg-gray-50 rounded-xl p-4 shadow-lg flex items-center justify-between ${
            toastType === 'success' ? 'border-green-500' : 'border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {toastType === 'loading' ? (
              <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <p className="text-gray-700 text-sm">{toastMessage}</p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="w-5 h-5 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}