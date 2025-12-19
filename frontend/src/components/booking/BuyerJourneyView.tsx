import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageSquare,
  Mail,
  ExternalLink,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useBookingStore } from "../../store/bookingStore";
import { MasterStatus } from "../../types/booking";

interface BuyerJourneyViewProps {
  bookingId: string;
  onBack: () => void;
  onSwitchProperty?: (bookingId: string) => void;
}

export default function BuyerJourneyView({
  bookingId,
  onBack,
  onSwitchProperty,
}: BuyerJourneyViewProps) {
  const router = useRouter();
  const { bookings, getBookingById } = useBookingStore();

  const booking = useMemo(
    () => getBookingById(bookingId),
    [bookingId, getBookingById]
  );

  // Get other properties for switcher
  const otherProperties = useMemo(
    () =>
      bookings
        .filter((b) => b.id !== bookingId)
        .slice(0, 5)
        .map((b) => ({
          id: b.id,
          name: b.property.name,
          unit: b.property.unitNumber,
          image: b.property.image,
        })),
    [bookingId, bookings]
  );

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Unified Booking Journey Steps
  const journeySteps = [
    {
      id: "interest_expressed",
      label: "Interest Expressed",
      description: "You expressed interest in this property",
    },
    {
      id: "agent_contact",
      label: "Agent Contact",
      description: "Our agent will reach out with details",
    },
    {
      id: "site_visit",
      label: "Site Visit",
      description: "Schedule your property visit",
    },
    {
      id: "offer_reservation",
      label: "Offer / Reservation",
      description: "Review and accept the offer",
    },
    {
      id: "awaiting_finalisation",
      label: "Awaiting Finalisation",
      description: "Documentation and paperwork",
    },
    {
      id: "handover",
      label: "Handover",
      description: "Complete and get your keys",
    },
  ];

  // Determine step status based on master status
  const getStepStatus = (stepId: string) => {
    const statusHierarchy: MasterStatus[] = [
      "interest_expressed",
      "agent_contact",
      "site_visit",
      "offer_reservation",
      "awaiting_finalisation",
      "handover",
    ];

    const currentIndex = statusHierarchy.indexOf(booking.masterStatus);
    const stepIndex = statusHierarchy.indexOf(stepId as MasterStatus);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  // Find next step
  const currentStepIndex = journeySteps.findIndex(
    (step) => getStepStatus(step.id) === "current"
  );

  // If nothing is marked current, default to first step
  const safeCurrentIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  const nextStepIndex =
    safeCurrentIndex + 1 < journeySteps.length ? safeCurrentIndex + 1 : -1;

  const nextStep = nextStepIndex >= 0 ? journeySteps[nextStepIndex] : null;

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getVisitDetails = () => {
    const visitSub = booking.subSections.find(
      (s) =>
        s.type === "visit" &&
        (s.data as any).visitType === "site_visit" &&
        (s.data as any).status === "scheduled"
    );
    return visitSub ? (visitSub.data as any) : null;
  };

  const visitDetails = getVisitDetails();

  const handleViewUnitDetail = () => {
    // Navigate to property detail page
    router.push(`/property/${booking.property.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {booking.property.name}
            {booking.property.unitNumber && ` • ${booking.property.unitNumber}`}
          </Text>
          <Text style={styles.headerPrice}>
            AED {booking.property.price.toLocaleString()}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.journey}>
        {/* Property Image with Button */}
        <View style={styles.imageSection}>
          {booking.property.image ? (
            <Image
              source={{ uri: booking.property.image }}
              style={styles.propertyImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>
                {booking.property.name.charAt(0)}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.viewUnitButton}
            onPress={handleViewUnitDetail}
            activeOpacity={0.8}
          >
            <Text style={styles.viewUnitButtonText}>View Unit Details</Text>
            <ExternalLink size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Interest Status */}
        <View style={styles.statusSection}>
          <CheckCircle size={20} color="#10B981" />
          <Text style={styles.statusText}>
            {nextStepIndex >= 0
              ? journeySteps[nextStepIndex - 1]
                ? journeySteps[nextStepIndex - 1]?.label
                : "Interest Expressed"
              : "Interest Expressed"}{" "}
            Done
          </Text>
        </View>

        {/* Journey Steps with Progress Line */}
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Your Booking Journey</Text>
          {journeySteps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isCompleted = status === "completed";
            const isCurrent = status === "current";
            const isPending = status === "pending";

            return (
              <View key={step.id}>
                <View style={styles.step}>
                  {/* Step Indicator */}
                  <View style={styles.stepIndicator}>
                    {isCompleted ? (
                      <View style={styles.stepDotCompleted}>
                        <CheckCircle size={24} color="white" strokeWidth={2} />
                      </View>
                    ) : isCurrent ? (
                      <View style={styles.stepDotCurrent}>
                        <View style={styles.stepDotInner} />
                      </View>
                    ) : (
                      <View style={styles.stepDotPending} />
                    )}
                  </View>

                  {/* Step Content */}
                  <View style={styles.stepContent}>
                    <Text
                      style={[
                        styles.stepLabel,
                        isCompleted && styles.stepLabelCompleted,
                        isCurrent && styles.stepLabelCurrent,
                        isPending && styles.stepLabelPending,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text
                      style={[
                        styles.stepDescription,
                        isPending && styles.stepDescriptionPending,
                      ]}
                    >
                      {step.description}
                    </Text>
                  </View>
                </View>

                {/* Progress Line */}
                {index < journeySteps.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      (isCompleted || isCurrent) && styles.progressLineActive,
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* What's Next Section - Only show if there's a next step */}
        {nextStep && (
          <View style={styles.whatsNext}>
            <Text style={styles.whatsNextTitle}>What&lsquo;s Next?</Text>
            <View style={styles.whatsNextCard}>
              <View style={styles.whatsNextContent}>
                <View style={styles.whatsNextBadge}>
                  <Text style={styles.whatsNextBadgeText}>
                    Step {nextStepIndex + 1}
                  </Text>
                </View>
                <Text style={styles.whatsNextStep}>{nextStep.label}</Text>
                <Text style={styles.whatsNextDescription}>
                  {nextStep.description}
                </Text>
              </View>

              {/* Visit Details - if site visit is next */}
              {nextStep.id === "site_visit" && visitDetails && (
                <>
                  <View style={styles.visitDetails}>
                    <View style={styles.visitDetailRow}>
                      <Calendar size={16} color="#005B78" />
                      <Text style={styles.visitDetailText}>
                        {formatDate(visitDetails.dateTime)} •{" "}
                        {formatTime(visitDetails.dateTime)}
                      </Text>
                    </View>
                    {visitDetails.location && (
                      <View style={styles.visitDetailRow}>
                        <MapPin size={16} color="#005B78" />
                        <Text style={styles.visitDetailText}>
                          {visitDetails.location}
                        </Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.directionsButton}
                    onPress={() => {
                      const url = `https://maps.google.com/?q=${encodeURIComponent(
                        visitDetails.location || ""
                      )}`;
                      Linking.openURL(url);
                    }}
                  >
                    <MapPin size={16} color="white" />
                    <Text style={styles.directionsButtonText}>
                      Get Directions
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.visitActions}>
                    <TouchableOpacity style={styles.visitActionButton}>
                      <Text style={styles.visitActionText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.visitActionButton}>
                      <Text style={styles.visitActionText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Reservation Action - if offer/reservation is next */}
              {/* {nextStep.id === "offer_reservation" && (
                <TouchableOpacity style={styles.reserveButton}>
                  <Text style={styles.reserveButtonText}>Make Reservation</Text>
                  <ArrowRight size={16} color="white" />
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        )}

        {/* Contact Agent */}
        {booking.assignedBroker && (
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Agent</Text>
            <View style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactAvatar}>
                  <Text style={styles.contactAvatarText}>
                    {booking.assignedBroker.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.contactName}>
                    {booking.assignedBroker}
                  </Text>
                  <Text style={styles.contactRole}>Real Estate Agent</Text>
                </View>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    const phoneNumber = "+1234567890"; // Replace with actual agent phone number
                    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
                      Alert.alert("Error", "Unable to open phone dialer");
                    });
                  }}
                >
                  <Phone size={16} color="#005B78" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    const phoneNumber = "+1234567890"; // Replace with actual agent phone number
                    Linking.openURL(`sms:${phoneNumber}`).catch(() => {
                      Alert.alert("Error", "Unable to open SMS app");
                    });
                  }}
                >
                  <MessageSquare size={18} color="#005B78" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    const phoneNumber = "+1234567890"; // Replace with actual agent phone number
                    Linking.openURL(`mailto:${phoneNumber}`).catch(() => {
                      Alert.alert("Error", "Unable to open email app");
                    });
                  }}
                >
                  <Mail size={18} color="#005B78" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Your Previous Interests */}
        {/* {otherProperties.length > 0 && (
          <View style={styles.previousInterestsSection}>
            <Text style={styles.previousInterestsTitle}>
              Your Previous Interests
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.interestsList}
              contentContainerStyle={styles.interestsContent}
            >
              {otherProperties.map((prop) => (
                <TouchableOpacity
                  key={prop.id}
                  style={styles.interestItem}
                  onPress={() => onSwitchProperty?.(prop.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.interestImageContainer}>
                    {prop.image ? (
                      <Image
                        source={{ uri: prop.image }}
                        style={styles.interestImage}
                      />
                    ) : (
                      <View style={styles.interestPlaceholder}>
                        <Text style={styles.interestPlaceholderText}>
                          {prop.name.charAt(0)}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.interestLabel} numberOfLines={2}>
                    {prop.unit || prop.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  headerPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#005B78",
  },
  content: {
    flex: 1,
  },
  journey: {
    paddingBottom: 40,
  },
  imageSection: {
    height: 250,
    backgroundColor: "#E5E7EB",
    position: "relative",
  },
  propertyImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: 64,
    fontWeight: "700",
    color: "#005B78",
  },
  viewUnitButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(0, 91, 120, 0.95)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  viewUnitButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  statusSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#ECFDF5",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
  },
  stepsContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },
  step: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 16,
    width: 56,
  },
  stepDotCompleted: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotCurrent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E6F2F5",
  },
  stepDotInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "white",
  },
  stepDotPending: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  progressLine: {
    width: 2,
    height: 20,
    backgroundColor: "#E5E7EB",
    marginLeft: 27,
    marginVertical: 4,
  },
  progressLineActive: {
    backgroundColor: "#10B981",
  },
  stepContent: {
    flex: 1,
    paddingTop: 2,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  stepLabelCompleted: {
    color: "#6B7280",
  },
  stepLabelCurrent: {
    color: "#005B78",
  },
  stepLabelPending: {
    color: "#9CA3AF",
  },
  stepDescription: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "400",
  },
  stepDescriptionPending: {
    color: "#B5BCC3",
  },
  whatsNext: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  whatsNextTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  whatsNextCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  whatsNextContent: {
    marginBottom: 16,
  },
  whatsNextBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F2F5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  whatsNextBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#005B78",
  },
  whatsNextStep: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  whatsNextDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  visitDetails: {
    gap: 12,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  visitDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  visitDetailText: {
    fontSize: 14,
    color: "#374151",
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005B78",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  visitActions: {
    flexDirection: "row",
    gap: 12,
  },
  visitActionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  visitActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  reserveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D4AF37",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
  },
  reserveButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  contactCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  contactAvatarText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#005B78",
  },
  contactName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  contactRole: {
    fontSize: 12,
    color: "#6B7280",
  },
  contactActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  contactButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  previousInterestsSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  previousInterestsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  interestsList: {
    marginHorizontal: -20,
  },
  interestsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  interestItem: {
    alignItems: "center",
    width: 70,
  },
  interestImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  interestImage: {
    width: "100%",
    height: "100%",
  },
  interestPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  interestPlaceholderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#005B78",
  },
  interestLabel: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 14,
  },
});
