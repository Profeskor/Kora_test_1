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
import PaymentPlan from "../../src/components/broker/PaymentPlan";
import SimilarListings from "../../src/components/broker/SimilarListings";
import ShareOffer from "../../src/components/broker/ShareOffer";
import BrokerBookingFlow from "../../src/components/booking/BrokerBookingFlow";

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
    const sample =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    try {
      await Linking.openURL(sample);
    } catch {
      Alert.alert("Download failed", `Could not open ${label}`);
    }
  };

  const slides = [
    {
      type: "video" as const,
      uri: property?.images[0],
      label: "Project walkthrough",
    },
    ...(property?.images || []).map((img) => ({
      type: "image" as const,
      uri: img,
      label: "Gallery",
    })),
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005B78" />
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
          <Text style={{ color: "#005B78", marginTop: 10 }}>Go Back</Text>
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
          {slides.length > 0 && (
            <Image
              source={{ uri: slides[currentSlide].uri }}
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
                  color={isFavorite ? "#EF4444" : "white"}
                  fill={isFavorite ? "#EF4444" : "transparent"}
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
            <Text style={styles.propertyName}>{property.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.locationText}>{property.location}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(displayPrice)}</Text>
          </View>

          {/* Key Features */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Bed size={20} color="#4B5563" />

              <Text style={styles.featureValue}>
                {displayBeds === 0 ? "Studio" : displayBeds} Beds
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Bath size={20} color="#4B5563" />
              <Text style={styles.featureValue}>{displayBaths} Baths</Text>
            </View>
            <View style={styles.featureItem}>
              <Maximize2 size={20} color="#4B5563" />
              <Text style={styles.featureValue}>
                {displaySize.toLocaleString()} sqft
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Calendar size={20} color="#4B5563" />
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
                        unit.bathrooms ? `/${unit.bathrooms}BA` : ""
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
                  <CheckCircle size={16} color="#005B78" />
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
                <Download size={16} color="#005B78" />
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
                <Download size={16} color="#005B78" />
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
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
                <Play size={16} color="#005B78" />
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
            // Brokers must use the dedicated booking flow
            if (isBroker) {
              setShowBookingFlow(true);
              return;
            }
            // Non-brokers create booking directly
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
            // Navigate with source=property so back button returns here
            router.push(
              `/(main)/bookings/${newBooking.id}?source=property&propertyId=${property.id}`
            );
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
                    backgroundColor: active ? "#E6F2F5" : "transparent",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => setSelectedAgent(a.name)}
                >
                  <View>
                    <Text style={{ fontWeight: "700" }}>{a.name}</Text>
                    <Text style={{ color: "#6B7280" }}>{a.phone}</Text>
                  </View>
                  {active && <Text style={{ color: "#005B78" }}>Selected</Text>}
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
                  borderColor: "#D1D5DB",
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
                  backgroundColor: "#005B78",
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
    backgroundColor: "white",
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
    backgroundColor: "#0f172a",
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
    backgroundColor: "#005B78",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  heroBookText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  detailsContainer: {
    backgroundColor: "white",
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
    color: "#111827",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: "#6B7280",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#005B78",
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
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
    color: "#374151",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  specImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  featuresList: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  featureRow: {
    color: "#374151",
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
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
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  amenityText: {
    fontSize: 14,
    color: "#374151",
  },
  downloadCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  downloadTextContainer: {
    marginBottom: 12,
  },
  downloadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  downloadSub: {
    color: "#6B7280",
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
    borderColor: "#005B78",
    backgroundColor: "#F0F9FF",
  },
  downloadButtonText: {
    color: "#005B78",
    fontWeight: "700",
    fontSize: 14,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  secondaryButton: {
    flex: 0.9,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#005B78",
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1.1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  ghostButton: {
    flex: 0.7,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  ghostButtonText: {
    color: "#374151",
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
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  specLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 6,
  },
  specValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  highlightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  highlightItem: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  highlightLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  paymentGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  paymentItem: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
    textAlign: "center",
  },
  paymentValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#005B78",
  },
  scheduleNote: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
