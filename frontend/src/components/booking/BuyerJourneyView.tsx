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

  // Unified Booking Journey Steps - User-centric messaging emphasizing team follow-up
  const journeySteps = [
    {
      id: "interest_expressed",
      label: "Interest Registered",
      description: "Your interest has been received – we're on it!",
      completedDescription: "Interest confirmed – our team reached out",
    },
    {
      id: "agent_contact",
      label: "Agent Contact",
      description: "A Kora agent will contact you within 24 hours",
      completedDescription: "Agent connected – next steps discussed",
    },
    {
      id: "site_visit",
      label: "Site Visit",
      description: "We'll help you schedule a convenient property tour",
      completedDescription: "Property visit completed",
    },
    {
      id: "offer_reservation",
      label: "Offer & Reservation",
      description: "Review terms and secure your unit",
      completedDescription: "Unit reserved – documentation in progress",
    },
    {
      id: "awaiting_finalisation",
      label: "Finalisation",
      description: "Our team handles all the paperwork for you",
      completedDescription: "Documentation completed",
    },
    {
      id: "handover",
      label: "Handover",
      description: "Receive your keys and welcome home!",
      completedDescription: "Congratulations – keys handed over!",
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
              source={
                typeof booking.property.image === "number"
                  ? booking.property.image
                  : { uri: booking.property.image }
              }
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

        {/* Interest Status - Reassuring message about team follow-up */}
        <View style={styles.statusSection}>
          <CheckCircle size={20} color="#10B981" />
          <View style={styles.statusContent}>
            <Text style={styles.statusText}>
              {safeCurrentIndex === 0
                ? "Interest Registered – We'll be in touch soon!"
                : `Step ${safeCurrentIndex} of ${journeySteps.length} Complete`}
            </Text>
            {safeCurrentIndex === 0 && (
              <Text style={styles.statusSubtext}>
                Expect a call from your Kora agent within 24 hours
              </Text>
            )}
          </View>
        </View>

        {/* Journey Steps with Progress Line */}
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Your Booking Journey</Text>
          <Text style={styles.stepsSubtitle}>
            Step {safeCurrentIndex + 1} of {journeySteps.length}
          </Text>
          {journeySteps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isCompleted = status === "completed";
            const isCurrent = status === "current";
            const isPending = status === "pending";
            // Use completedDescription for completed steps, otherwise use regular description
            const displayDescription =
              isCompleted && step.completedDescription
                ? step.completedDescription
                : step.description;

            return (
              <View key={step.id}>
                <View style={[styles.step, isCurrent && styles.stepCurrent]}>
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
                    <View style={styles.stepHeader}>
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
                      {isCurrent && (
                        <View style={styles.currentBadge}>
                          <Text style={styles.currentBadgeText}>Current</Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.stepDescription,
                        isCompleted && styles.stepDescriptionCompleted,
                        isCurrent && styles.stepDescriptionCurrent,
                        isPending && styles.stepDescriptionPending,
                      ]}
                    >
                      {displayDescription}
                    </Text>
                  </View>
                </View>

                {/* Progress Line - Green for completed, blue for current to next, gray for pending */}
                {index < journeySteps.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      isCompleted && styles.progressLineCompleted,
                      isCurrent && styles.progressLineCurrent,
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
              {nextStep.id === "offer_reservation" && (
                <TouchableOpacity style={styles.reserveButton}>
                  <Text style={styles.reserveButtonText}>Make Reservation</Text>
                  <ArrowRight size={16} color="white" />
                </TouchableOpacity>
              )}
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
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#ECFDF5",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#10B981",
  },
  statusSubtext: {
    fontSize: 13,
    color: "#059669",
    marginTop: 2,
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
    marginBottom: 4,
  },
  stepsSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 20,
  },
  step: {
    flexDirection: "row",
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderRadius: 12,
  },
  stepCurrent: {
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 16,
    width: 56,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentBadge: {
    backgroundColor: "#005B78",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    borderColor: "#BFDBFE",
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
    borderColor: "#E5E7EB",
  },
  progressLine: {
    width: 3,
    height: 20,
    backgroundColor: "#E5E7EB",
    marginLeft: 26,
    marginVertical: 4,
    borderRadius: 2,
  },
  progressLineCompleted: {
    backgroundColor: "#10B981",
  },
  progressLineCurrent: {
    backgroundColor: "#93C5FD",
  },
  stepContent: {
    flex: 1,
    paddingTop: 2,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  stepLabelCompleted: {
    color: "#059669",
  },
  stepLabelCurrent: {
    color: "#005B78",
    fontWeight: "700",
  },
  stepLabelPending: {
    color: "#9CA3AF",
  },
  stepDescription: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
    lineHeight: 18,
  },
  stepDescriptionCompleted: {
    color: "#6B7280",
    fontStyle: "italic",
  },
  stepDescriptionCurrent: {
    color: "#1E40AF",
    fontWeight: "500",
  },
  stepDescriptionPending: {
    color: "#C4C9CF",
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
