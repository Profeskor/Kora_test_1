import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Share,
} from "react-native";
import {
  palette,
  textColors,
  backgrounds,
  borders,
  shadows,
} from "@/src/constants/colors";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Maximize2,
  Bath,
  Calendar,
  CheckCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProperty } from "../../src/api/client";
import { Property, Unit } from "../../src/types";
import { useUserStore } from "../../src/store/userStore";
import { useBookingStore } from "../../src/store/bookingStore";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
// import PaymentPlan from "../../src/components/broker/PaymentPlan";
import SimilarListings from "../../src/components/broker/SimilarListings";
import ShareOffer from "../../src/components/broker/ShareOffer";
import BrokerBookingFlow from "../../src/components/booking/BrokerBookingFlow";
import {
  Heading1,
  // , Heading2
} from "@/src/components/common/Typography";
import SignInRequiredModal from "@/src/components/guest/SignInRequiredModal";

export default function PropertyDetailScreen() {
  const { id, unitId } = useLocalSearchParams();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { addBooking } = useBookingStore();
  const isBroker = user?.currentRole === "broker";
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(
    null
  );
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [agents] = useState([
    { name: "Ahmed Khan", phone: "+971501234567" },
    { name: "Lina Ali", phone: "+971509876543" },
    { name: "Omar Hassan", phone: "+971502345678" },
    { name: "Sara Mahmoud", phone: "+971503456789" },
    { name: "Yusuf Al Noor", phone: "+971504567890" },
    { name: "Fatima Zahra", phone: "+971505678901" },
    { name: "Bilal Ahmed", phone: "+971506789012" },
    { name: "Noura Khaled", phone: "+971507890123" },
    { name: "Imran Siddiqui", phone: "+971508901234" },
    { name: "Huda Rashid", phone: "+971509012345" },
  ] as { name: string; phone: string }[]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProperty(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProperty = async (propertyId: string) => {
    try {
      const data = await getProperty(propertyId);
      setProperty(data);
      if (unitId && data?.units) {
        const unit = data.units.find((u) => u.id === unitId);
        if (unit) {
          setSelectedUnit(unit);
        } else if (data.units.length > 0) {
          setSelectedUnit(data.units[0]);
        }
      } else if (data?.units?.length) {
        setSelectedUnit(data.units[0]);
      }
    } catch (error) {
      console.error("Failed to load property details", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddToComparison = () => {
  //   if (!property) return;
  //   const result = addToComparison(property.id);
  //   if (result.added) {
  //     setCompareMessage("Added to comparison");
  //     setTimeout(() => setCompareMessage(null), 1200);
  //   } else if (result.reason === "already-added") {
  //     setCompareMessage("Already in comparison");
  //   } else {
  //     setCompareMessage("Comparison limit reached");
  //   }
  // };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  const formatFutureHandover = (dateStr?: string | null) => {
    if (!dateStr) return "Handover date TBA";
    const d = new Date(dateStr);
    const now = new Date();
    if (isNaN(d.getTime())) return "Handover date TBA";
    if (d <= now) {
      const next = new Date();
      next.setMonth(next.getMonth() + 3);
      return `Upcoming — ${next.toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })}`;
    }
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const unit = selectedUnit || property?.units?.[0] || null;
  const displayPrice = unit?.price ?? property?.price ?? 0;
  const displayBeds = unit?.bedrooms ?? property?.bedrooms ?? 0;
  const displayBaths = unit?.bathrooms ?? property?.bathrooms ?? 0;
  const displaySize = unit?.size ?? property?.size ?? 0;
  const displayStatus = unit?.status ?? property?.status ?? "Available";

  const handleDownload = async (label: string) => {
    // For Floor Plans, use the property's floorPlan if available
    if (label === "Floor Plans" && property?.floorPlan) {
      try {
        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
          Alert.alert(
            "Sharing not available",
            "Sharing is not available on this device"
          );
          return;
        }

        // Load the asset and get its local URI
        const asset = Asset.fromModule(property.floorPlan);
        await asset.downloadAsync();

        if (asset.localUri) {
          await Sharing.shareAsync(asset.localUri, {
            mimeType: "application/pdf",
            dialogTitle: `${property.name} - Floor Plan`,
          });
        } else {
          Alert.alert("Download failed", "Could not load floor plan");
        }
      } catch (error) {
        console.error("Floor plan download error:", error);
        Alert.alert("Download failed", "Could not open Floor Plans");
      }
      return;
    }

    // // For Title Deed (homeowner only) - open dummy PDF
    // if (label === "Title Deed") {
    //   const titleDeedUrl =
    //     "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    //   try {
    //     await Linking.openURL(titleDeedUrl);
    //   } catch {
    //     Alert.alert("Download failed", "Could not open Title Deed");
    //   }
    //   return;
    // }

    // Default fallback for other downloads
    const sample =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    try {
      await Linking.openURL(sample);
    } catch {
      Alert.alert("Download failed", `Could not open ${label}`);
    }
  };

  // Helper to get image source - handles both URLs (string) and local requires (number)
  const getImageSource = (img: string | number) => {
    if (typeof img === "number") {
      return img; // Local require() returns a number
    }
    return { uri: img }; // URL string
  };

  const slides = [
    {
      type: "video" as const,
      source: property?.images[0] ? getImageSource(property.images[0]) : null,
      label: "Project walkthrough",
    },
    ...(property?.images || []).map((img) => ({
      type: "image" as const,
      source: getImageSource(img),
      label: "Gallery",
    })),
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.brand.primary} />
      </View>
    );
  }
  // const formatFutureHandover = (dateStr?: string) => {
  //   if (!dateStr) return "";
  //   const date = new Date(dateStr);
  //   const formattedDate = date.toLocaleDateString("en-US", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });
  //   return formattedDate;
  // };

  if (!property) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Property not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: palette.brand.primary, marginTop: 10 }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        {/* Hero Carousel */}
        <View style={styles.carouselContainer}>
          {slides.length > 0 && slides[currentSlide].source && (
            <Image
              source={slides[currentSlide].source}
              style={styles.carouselImage}
              contentFit="cover"
            />
          )}
          <View style={styles.overlay} />

          <SafeAreaView style={styles.headerActions} edges={["top"]}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  size={24}
                  color={isFavorite ? palette.status.error : "white"}
                  fill={isFavorite ? palette.status.error : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={async () => {
                  try {
                    const shareLink = `https://kora.ae/property/${property.id}`;
                    await Share.share({
                      message: `Check out this property: ${property.name}\n${shareLink}`,
                    });
                  } catch (e) {
                    console.warn("Share failed", e);
                  }
                }}
              >
                <Share2 size={24} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* {slides[currentSlide]?.type === "video" && !isHomeowner && (
            <View style={styles.videoBadge}>
              <Play size={18} color="white" />
              <Text style={styles.videoBadgeText}>Watch walkthrough</Text>
            </View>
          )} */}

          <View style={styles.carouselNav}>
            <TouchableOpacity style={styles.navButton} onPress={prevSlide}>
              <ChevronLeft size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={nextSlide}>
              <ChevronRight size={22} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.slideDots}>
            {slides.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, idx === currentSlide && styles.dotActive]}
              />
            ))}
          </View>

          <View style={styles.imageContent}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{displayStatus}</Text>
            </View>
          </View>
        </View>

        {/* Prominent Book CTA */}
        {/* <TouchableOpacity
          style={styles.heroBookButton}
          onPress={() => router.push("/bookings/detail")}
        >
          <Text style={styles.heroBookText}>Book</Text>
        </TouchableOpacity> */}

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleSection}>
            <Heading1 style={styles.propertyName}>{property.name}</Heading1>
            <View style={styles.locationRow}>
              <MapPin size={16} color={textColors.secondary} />
              <Text style={styles.locationText}>{property.location}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(displayPrice)}</Text>
          </View>

          {/* Key Features */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Bed size={20} color={textColors.body} />

              <Text style={styles.featureValue}>
                {displayBeds === 0 ? "Studio" : displayBeds} Beds
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Bath size={20} color={textColors.body} />
              <Text style={styles.featureValue}>{displayBaths} Baths</Text>
            </View>
            <View style={styles.featureItem}>
              <Maximize2 size={20} color={textColors.body} />
              <Text style={styles.featureValue}>
                {displaySize.toLocaleString()} sqft
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Calendar size={20} color={textColors.body} />
              <Text style={styles.featureValue}>
                {/* {formatFutureHandover(property.handoverDate)} */}
                {property.handoverDate}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {/* Project Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Specifications</Text>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
              }}
              style={styles.specImage}
              contentFit="cover"
            />
          </View>

          {/* Property Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Features</Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureRow}>
                Parking: {property.features.parking || 0} covered
              </Text>
              <Text style={styles.featureRow}>
                Balcony: {property.features.balcony ? "Yes" : "No"}
              </Text>
              <Text style={styles.featureRow}>
                View: {property.features.view || "City"}
              </Text>
              <Text style={styles.featureRow}>
                Furnishing:{" "}
                {property.features.furnished ? "Furnished" : "Unfurnished"}
              </Text>
            </View>
          </View>

          {/* Nearby */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location Highlights</Text>
            <View style={styles.highlightGrid}>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>🏢 City Center</Text>
                <Text style={styles.highlightValue}>12 km away</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>✈️ Airport</Text>
                <Text style={styles.highlightValue}>25 km away</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>🏥 Hospital</Text>
                <Text style={styles.highlightValue}>2 km away</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>🛍️ Shopping</Text>
                <Text style={styles.highlightValue}>1.5 km away</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>🚆 Metro Station</Text>
                <Text style={styles.highlightValue}>3 km away</Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>🏫 Schools</Text>
                <Text style={styles.highlightValue}>5 km away</Text>
              </View>
            </View>
          </View>

          {/* Nearby Attractions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby Attractions</Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureRow}>
                📍 Dubai Marina • 5 min drive
              </Text>
              <Text style={styles.featureRow}>
                🏖️ Jumeirah Beach • 10 min drive
              </Text>
              <Text style={styles.featureRow}>
                🏢 Burj Khalifa • 15 min drive
              </Text>
              <Text style={styles.featureRow}>
                🎢 Theme Parks • 20 min drive
              </Text>
              <Text style={styles.featureRow}>
                🏬 Mall of the Emirates • 12 min drive
              </Text>
            </View>
          </View>

          {/* Unit-Specific Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Unit Specifications</Text>
            <View style={styles.specGrid}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Unit Type</Text>
                <Text style={styles.specValue}>
                  {unit?.bedrooms
                    ? `${unit.bedrooms}BR${
                        // unit.bathrooms ? `/${unit.bathrooms}BA` : ""
                        unit.bathrooms ? `` : ""
                      }`
                    : "Studio"}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Built-up Area</Text>
                <Text style={styles.specValue}>
                  {(unit?.size || property.size).toLocaleString()} sqft
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Unit Status</Text>
                <Text style={styles.specValue}>
                  {unit?.status || property.status}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Floor Plan</Text>
                <Text style={styles.specValue}>
                  {unit?.label || "Available"}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Handover Date</Text>
                <Text style={styles.specValue}>
                  {formatFutureHandover(property.handoverDate)}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Price Per Sqft</Text>
                <Text style={styles.specValue}>
                  AED{" "}
                  {(
                    (unit?.price || property.price) /
                    (unit?.size || property.size)
                  ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Schedule</Text>
            <View style={styles.paymentGrid}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Upon Booking</Text>
                <Text style={styles.paymentValue}>10%</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Construction</Text>
                <Text style={styles.paymentValue}>70%</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Upon Handover</Text>
                <Text style={styles.paymentValue}>20%</Text>
              </View>
            </View>
            <Text style={styles.scheduleNote}>
              Flexible payment plans available upon request
            </Text>
          </View>

          {/* Financing Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financing Options</Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureRow}>
                💰 Up to 50% bank financing available
              </Text>
              {/* <Text style={styles.featureRow}>
                📅 Payment plan over {unit?.bedrooms || 2}-{unit?.bedrooms || 3}{" "}
                years
              </Text> */}
              <Text style={styles.featureRow}>✅ No processing fees</Text>
              <Text style={styles.featureRow}>
                🏦 Partnered with top UAE banks
              </Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <CheckCircle size={16} color={palette.brand.primary} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Media */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documents & Media</Text>
            <View style={styles.downloadCard}>
              <View style={styles.downloadTextContainer}>
                <Text style={styles.downloadTitle}>Brochure</Text>
                <Text style={styles.downloadSub}>
                  Project highlights & specifications
                </Text>
              </View>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownload("Brochure")}
              >
                <Download size={16} color={palette.brand.primary} />
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.downloadCard}>
              <View style={styles.downloadTextContainer}>
                <Text style={styles.downloadTitle}>Floor Plans</Text>
                <Text style={styles.downloadSub}>
                  Detailed unit layouts and dimensions
                </Text>
              </View>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownload("Floor Plans")}
              >
                <Download size={16} color={palette.brand.primary} />
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
            {/* Title Deed - Only for Homeowners */}
            {user?.currentRole === "homeowner" && (
              <View style={styles.downloadCard}>
                <View style={styles.downloadTextContainer}>
                  <Text style={styles.downloadTitle}>Title Deed</Text>
                  <Text style={styles.downloadSub}>
                    Property ownership document
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => handleDownload("Title Deed")}
                >
                  <Download size={16} color={palette.brand.primary} />
                  <Text style={styles.downloadButtonText}>Download</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.downloadCard}>
              <View style={styles.downloadTextContainer}>
                <Text style={styles.downloadTitle}>Virtual Tour</Text>
                <Text style={styles.downloadSub}>
                  360° immersive experience of the unit
                </Text>
              </View>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => handleDownload("Virtual Tour")}
              >
                <Play size={16} color={palette.brand.primary} />
                <Text style={styles.downloadButtonText}>Watch</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact */}
          {/* Contact Information: persona-specific */}
          {user?.currentRole === "homeowner" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.downloadCard}>
                <Text style={styles.downloadTitle}>Contact Support</Text>
                <Text style={styles.downloadSub}>support@kora.com</Text>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => {
                    const mailtoLink = `mailto:support@kora.com?subject=${encodeURIComponent(
                      `Inquiry about ${property.name} - Unit ${
                        unit?.label || ""
                      }`
                    )}&body=${encodeURIComponent(
                      `Hello,\n\nI am interested in learning more about Unit ${
                        unit?.label || ""
                      } at ${
                        property.name
                      }.\n\nProperty Details:\n- Location: ${
                        property.location
                      }\n- Unit Price: AED ${
                        unit?.price || property?.price
                      }\n\nPlease provide more information.\n\nThank you.`
                    )}`;
                    Linking.openURL(mailtoLink).catch(() => {
                      Alert.alert("Error", "Could not open email application");
                    });
                  }}
                >
                  <Text style={styles.downloadButtonText}>Email Support</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Broker field agents list removed — brokers will select an agent when booking */}

          {(!user || user?.currentRole === "guest") && null}

          {/* Broker-specific sections */}
          {isBroker && (
            <>
              {/* Payment Plan */}
              {/* <View style={styles.section}>
                <PaymentPlan />
              </View> */}

              {/* Similar Listings */}
              <View style={styles.section}>
                <SimilarListings
                  currentPropertyId={property.id}
                  onPropertyPress={(propertyId) => {
                    router.push(`/property/${propertyId}`);
                  }}
                />
              </View>

              {/* Share the Offer */}
              <View style={styles.section}>
                <ShareOffer
                  propertyId={property.id}
                  propertyName={property.name}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <SafeAreaView style={styles.bottomBar} edges={["bottom"]}>
        {/* <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/bookings/detail")}
        >
          <Text style={styles.secondaryButtonText}>Request</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            if (!property) return;
            // Guest guard - show sign in modal
            if (!user || user?.currentRole === "guest") {
              setShowGuestModal(true);
              return;
            }

            // Brokers must use the dedicated booking flow
            if (isBroker) {
              setShowBookingFlow(true);
              return;
            }
            // Non-brokers create booking directly and show confirmation
            const newBooking = addBooking(
              property,
              unitId as string,
              user
                ? {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    mobile: user.mobile,
                  }
                : undefined
            );
            // Show confirmation modal instead of navigating immediately
            setConfirmedBookingId(newBooking.id);
            setShowBookingConfirmation(true);
          }}
        >
          <Text style={styles.primaryButtonText}>Book Now</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.ghostButton}
          onPress={() => {
            handleAddToComparison();
            if (property) {
              selectProperty(property.id);
            }
            router.push("/compare");
          }}
        >
          <Text style={styles.ghostButtonText}>Compare</Text>
        </TouchableOpacity> */}
      </SafeAreaView>

      {/* Agent selection modal for brokers */}
      <Modal visible={showAgentModal} transparent animationType="slide">
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.25)" }}
          onPress={() => setShowAgentModal(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              marginTop: "auto",
              backgroundColor: "white",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Select an Agent
            </Text>
            {agents.map((a) => {
              const active = selectedAgent === a.name;
              return (
                <TouchableOpacity
                  key={a.phone}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                    backgroundColor: active
                      ? backgrounds.subtle
                      : "transparent",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => setSelectedAgent(a.name)}
                >
                  <View>
                    <Text style={{ fontWeight: "700" }}>{a.name}</Text>
                    <Text style={{ color: textColors.secondary }}>
                      {a.phone}
                    </Text>
                  </View>
                  {active && (
                    <Text style={{ color: palette.brand.primary }}>
                      Selected
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}

            <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: borders.default,
                  alignItems: "center",
                }}
                onPress={() => {
                  setSelectedAgent(null);
                  setShowAgentModal(false);
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 10,
                  backgroundColor: palette.brand.primary,
                  alignItems: "center",
                }}
                onPress={() => {
                  if (!property) return;
                  const newBooking = addBooking(
                    property,
                    unitId as string,
                    user
                      ? {
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                          mobile: user.mobile,
                        }
                      : undefined,
                    selectedAgent || undefined
                  );
                  setShowAgentModal(false);
                  router.push(`/(main)/bookings/${newBooking.id}`);
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Broker Booking Flow - New dedicated component */}
      <Modal
        visible={showBookingFlow}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {showBookingFlow && property && (
          <BrokerBookingFlow
            property={property}
            unitId={unitId as string}
            agents={agents}
            onClose={() => setShowBookingFlow(false)}
            onBookingCreated={(bookingId) => {
              setShowBookingFlow(false);
              // Use setTimeout to ensure modal is closed before navigation on iOS
              setTimeout(() => {
                router.push(
                  `/(main)/bookings/${bookingId}?source=property&propertyId=${property.id}`
                );
              }, 300);
            }}
          />
        )}
      </Modal>

      {/* Booking Confirmation Modal for Homeowners/Buyers */}
      <Modal
        visible={showBookingConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowBookingConfirmation(false);
          if (confirmedBookingId && property) {
            router.push(
              `/(main)/bookings/${confirmedBookingId}?source=property&propertyId=${property.id}`
            );
          }
        }}
      >
        <Pressable
          style={styles.confirmationOverlay}
          onPress={() => {
            setShowBookingConfirmation(false);
            if (confirmedBookingId && property) {
              router.push(
                `/(main)/bookings/${confirmedBookingId}?source=property&propertyId=${property.id}`
              );
            }
          }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={styles.confirmationContainer}
          >
            {/* Success Icon */}
            <View style={styles.confirmationIconContainer}>
              <CheckCircle size={48} color={palette.status.success} />
            </View>

            {/* Title */}
            <Text style={styles.confirmationTitle}>Interest Registered!</Text>

            {/* Message */}
            <Text style={styles.confirmationMessage}>
              Thank you for your interest in{" "}
              <Text style={styles.confirmationHighlight}>{property?.name}</Text>
              . Our dedicated team will contact you shortly to discuss the next
              steps and answer any questions you may have.
            </Text>

            {/* What to expect */}
            <View style={styles.confirmationExpectations}>
              <Text style={styles.confirmationExpectationsTitle}>
                What happens next:
              </Text>
              <View style={styles.confirmationExpectationItem}>
                <View style={styles.confirmationBullet} />
                <Text style={styles.confirmationExpectationText}>
                  A Kora agent will call you within 24 hours
                </Text>
              </View>
              <View style={styles.confirmationExpectationItem}>
                <View style={styles.confirmationBullet} />
                <Text style={styles.confirmationExpectationText}>
                  We&apos;ll help schedule a convenient site visit
                </Text>
              </View>
              <View style={styles.confirmationExpectationItem}>
                <View style={styles.confirmationBullet} />
                <Text style={styles.confirmationExpectationText}>
                  Get personalized guidance throughout your journey
                </Text>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              style={styles.confirmationButton}
              onPress={() => {
                setShowBookingConfirmation(false);
                if (confirmedBookingId && property) {
                  router.push(
                    `/(main)/bookings/${confirmedBookingId}?source=property&propertyId=${property.id}`
                  );
                }
              }}
            >
              <Text style={styles.confirmationButtonText}>View My Booking</Text>
            </TouchableOpacity>

            {/* Secondary action */}
            <TouchableOpacity
              style={styles.confirmationSecondaryButton}
              onPress={() => {
                setShowBookingConfirmation(false);
                setConfirmedBookingId(null);
              }}
            >
              <Text style={styles.confirmationSecondaryButtonText}>
                Continue Browsing
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Guest Sign In Modal */}
      <SignInRequiredModal
        visible={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        feature="Property Booking"
      />

      {compareMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{compareMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.screenLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingBottom: 100,
  },
  carouselContainer: {
    height: 360,
    position: "relative",
    backgroundColor: palette.brand.primary,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  carouselNav: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "45%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  navButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  slideDots: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    width: 18,
    backgroundColor: "white",
  },
  videoBadge: {
    position: "absolute",
    left: 16,
    top: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  videoBadgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  headerActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    zIndex: 10,
  },
  rightActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  statusBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  heroBookButton: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: palette.brand.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    ...shadows.button,
  },
  heroBookText: {
    color: textColors.onDark,
    fontSize: 16,
    fontWeight: "700",
  },
  detailsContainer: {
    backgroundColor: backgrounds.screenLight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 8,
    padding: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 8,
    fontFamily: "Marcellus-Regular",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: textColors.secondary,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: palette.brand.primary,
    fontFamily: "Marcellus-Regular",
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: backgrounds.subtle,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  featureItem: {
    alignItems: "center",
    gap: 8,
  },
  featureValue: {
    fontSize: 14,
    color: textColors.body,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 12,
    fontFamily: "Marcellus-Regular",
  },
  specImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  featuresList: {
    backgroundColor: backgrounds.subtle,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  featureRow: {
    color: textColors.body,
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    color: textColors.body,
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: backgrounds.subtle,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  amenityText: {
    fontSize: 14,
    color: textColors.body,
  },
  downloadCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: borders.default,
    marginTop: 10,
    ...shadows.card,
  },
  downloadTextContainer: {
    marginBottom: 12,
  },
  downloadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.heading,
  },
  downloadSub: {
    color: textColors.secondary,
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: palette.brand.primary,
    backgroundColor: backgrounds.subtle,
  },
  downloadButtonText: {
    color: palette.brand.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: backgrounds.screenLight,
    borderTopWidth: 1,
    borderTopColor: borders.default,
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  secondaryButton: {
    flex: 0.9,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: palette.brand.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1.1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: textColors.onDark,
    fontSize: 16,
    fontWeight: "600",
  },
  ghostButton: {
    flex: 0.7,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.default,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgrounds.subtle,
  },
  ghostButtonText: {
    color: textColors.body,
    fontSize: 16,
    fontWeight: "600",
  },
  toast: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 12,
  },
  toastText: {
    color: "white",
    fontWeight: "600",
  },
  specGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  specItem: {
    width: "48%",
    backgroundColor: backgrounds.subtle,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: borders.default,
  },
  specLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: textColors.secondary,
    marginBottom: 6,
  },
  specValue: {
    fontSize: 14,
    fontWeight: "700",
    color: textColors.heading,
  },
  highlightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  highlightItem: {
    width: "48%",
    backgroundColor: backgrounds.card,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: borders.default,
    ...shadows.card,
  },
  highlightLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 12,
    color: textColors.secondary,
    fontWeight: "500",
  },
  paymentGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  paymentItem: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: borders.default,
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: textColors.secondary,
    marginBottom: 8,
    textAlign: "center",
  },
  paymentValue: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.brand.primary,
  },
  scheduleNote: {
    fontSize: 12,
    color: textColors.secondary,
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  // Booking Confirmation Modal Styles
  confirmationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  confirmationContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  confirmationIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Marcellus-Regular",
  },
  confirmationMessage: {
    fontSize: 15,
    color: textColors.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  confirmationHighlight: {
    fontWeight: "600",
    color: palette.brand.primary,
  },
  confirmationExpectations: {
    width: "100%",
    backgroundColor: backgrounds.subtle,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  confirmationExpectationsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 12,
  },
  confirmationExpectationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  confirmationBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.status.success,
    marginTop: 6,
    marginRight: 12,
  },
  confirmationExpectationText: {
    flex: 1,
    fontSize: 14,
    color: textColors.body,
    lineHeight: 20,
  },
  confirmationButton: {
    width: "100%",
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  confirmationButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  confirmationSecondaryButton: {
    paddingVertical: 12,
  },
  confirmationSecondaryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: textColors.secondary,
  },
});
