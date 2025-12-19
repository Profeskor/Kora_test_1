import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Linking,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Phone,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  CheckCircle,
  Building2,
  X,
  MessageSquare,
} from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SubSection, MasterStatus } from "../../types/booking";
import { useUserStore } from "../../store/userStore";
import { useBookingStore } from "../../store/bookingStore";
import {
  getTimelineSteps,
  getCurrentStepIndex,
  isTerminalState,
  TIMELINE_STEPS,
} from "./bookingTimelineConfig";
import { useRouter } from "expo-router";

interface BrokerDealFileProps {
  bookingId: string;
  onBack: () => void;
  onBookingSelect?: (bookingId: string) => void;
}

export default function BrokerDealFile({
  bookingId,
  onBack,
  onBookingSelect,
}: BrokerDealFileProps) {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [brokerNoteText, setBrokerNoteText] = useState("");
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<MasterStatus | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const router = useRouter();

  // Use the onBack prop passed from the parent for proper navigation
  const handleBackNavigation = () => {
    onBack();
  };

  const { bookings, getBookingById } = useBookingStore();

  const booking = useMemo(
    () => getBookingById(bookingId),
    [bookingId, bookings]
  );

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Sort sub-sections by date
  const sortedSubSections = [...booking.subSections].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  // Get recent bookings for context switching
  const recentBookings = bookings.filter((b) => b.id !== bookingId).slice(0, 5);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const handleCall = () => {
    const phoneNumber = booking.client.phone.replace(/\s/g, "");
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Error", "Unable to open phone dialer");
    });
  };

  const handleWhatsApp = () => {
    const phoneNumber = booking.client.phone.replace(/[^0-9]/g, "");
    const message = `Hello ${booking.client.name}, regarding your inquiry for ${
      booking.property.name
    }${booking.property.unitNumber ? ` - ${booking.property.unitNumber}` : ""}`;
    Linking.openURL(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    ).catch(() => {
      Alert.alert("Error", "Unable to open WhatsApp");
    });
  };

  const handleEmail = () => {
    const subject = `Inquiry: ${booking.property.name}${
      booking.property.unitNumber ? ` - ${booking.property.unitNumber}` : ""
    }`;
    const body = `Hello ${booking.client.name},\n\nRegarding your inquiry...`;
    Linking.openURL(
      `mailto:${booking.client.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    ).catch(() => {
      Alert.alert("Error", "Unable to open email client");
    });
  };

  // Status Dropdown Handler
  const handleStatusChange = (newStatus: MasterStatus) => {
    // No-op if same status selected
    if (newStatus === booking.masterStatus) {
      return;
    }

    // Check if transition is allowed (forward only, or lost from any state)
    const currentIndex = getCurrentStepIndex(booking.masterStatus);
    const newIndex = getCurrentStepIndex(newStatus);

    const isForwardTransition = newIndex > currentIndex;
    const isLostTransition = newStatus === "lost";
    const isAllowed = isForwardTransition || isLostTransition;

    if (!isAllowed) {
      Alert.alert(
        "Invalid Transition",
        "You can only move forward in the booking journey."
      );
      return;
    }

    // Show confirmation for handover and lost
    if (newStatus === "handover") {
      setPendingStatus(newStatus);
      setShowStatusConfirmation(true);
      return;
    }

    if (newStatus === "lost") {
      setPendingStatus(newStatus);
      setShowStatusConfirmation(true);
      return;
    }

    // Update immediately for other statuses
    const updated = useBookingStore
      .getState()
      .transitionBookingStatus(bookingId, newStatus);

    if (updated) {
      const stepLabel = TIMELINE_STEPS[newStatus]?.label || newStatus;
      Alert.alert("Success", `Booking status updated to ${stepLabel}`);
    }
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      const updated = useBookingStore
        .getState()
        .transitionBookingStatus(bookingId, pendingStatus);

      if (updated) {
        const stepLabel = TIMELINE_STEPS[pendingStatus]?.label || pendingStatus;
        Alert.alert("Success", `Booking status updated to ${stepLabel}`);
      }
    }

    setShowStatusConfirmation(false);
    setPendingStatus(null);
  };

  const cancelStatusChange = () => {
    setShowStatusConfirmation(false);
    setPendingStatus(null);
  };

  const handleAddBrokerNote = () => {
    setShowNotesModal(true);
  };

  const handleSaveBrokerNote = () => {
    if (brokerNoteText.trim()) {
      const updated = useBookingStore
        .getState()
        .addBrokerNote(bookingId, brokerNoteText);
      if (updated) {
        Alert.alert("Success", "Note saved successfully");
        setShowNotesModal(false);
        setBrokerNoteText("");
      }
    }
  };

  const handleAddVisitNotes = (
    subSectionId: string,
    existingNotes?: string
  ) => {
    if (existingNotes) setBrokerNoteText(existingNotes);
    setShowNotesModal(true);
  };

  // Journey Visualization (Read-only)
  const renderJourneyVisualization = () => {
    const steps = getTimelineSteps();
    const currentIndex = getCurrentStepIndex(booking.masterStatus);

    const statusOptions: MasterStatus[] = [
      "interest_expressed",
      "agent_contact",
      "site_visit",
      "offer_reservation",
      "awaiting_finalisation",
      "handover",
      "lost",
    ];

    const statusLabels: Record<MasterStatus, string> = {
      interest_expressed: "Interest Expressed",
      agent_contact: "Agent Contact",
      site_visit: "Site Visit",
      offer_reservation: "Offer / Reservation",
      awaiting_finalisation: "Awaiting Finalisation",
      handover: "Handover",
      lost: "Lost",
      cancelled: "Cancelled",
      cold: "Cold",
    };

    return (
      <View style={styles.journeyContainer}>
        <View style={styles.journeyHeader}>
          <Text style={styles.journeyTitle}>Booking Status</Text>
          <View style={styles.statusDropdownWrapper}>
            <TouchableOpacity
              style={styles.statusDropdownButton}
              onPress={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <Text style={styles.statusDropdownButtonText}>
                {statusLabels[booking.masterStatus]}
              </Text>
              <Text style={styles.statusDropdownChevron}>
                {showStatusDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {showStatusDropdown && (
              <View style={styles.statusDropdownMenu}>
                {statusOptions.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusDropdownOption,
                      booking.masterStatus === status &&
                        styles.statusDropdownOptionSelected,
                    ]}
                    onPress={() => {
                      setShowStatusDropdown(false);
                      handleStatusChange(status);
                    }}
                  >
                    <Text
                      style={[
                        styles.statusDropdownOptionText,
                        booking.masterStatus === status &&
                          styles.statusDropdownOptionTextSelected,
                      ]}
                    >
                      {statusLabels[status]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Vertical timeline (read-only) */}
        <View style={styles.journeyVerticalTimeline}>
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            // Get notes for this step
            const stepNotes = booking.brokerNotes.filter(
              (note) => note.stepStatus === step.status
            );

            return (
              <View key={step.status}>
                {/* Step row with circle and text */}
                <View style={styles.journeyStepRow}>
                  {/* Left: Circle */}
                  <View style={styles.journeyStepCircleContainer}>
                    <View
                      style={[
                        styles.journeyStepCircle,
                        isCompleted && styles.journeyStepCircleCompleted,
                        isCurrent && styles.journeyStepCircleCurrent,
                      ]}
                    >
                      {isCompleted ? (
                        <CheckCircle size={28} color="white" />
                      ) : (
                        <View
                          style={[
                            styles.journeyStepDot,
                            isCurrent && styles.journeyStepDotCurrent,
                          ]}
                        />
                      )}
                    </View>
                  </View>

                  {/* Right: Step info */}
                  <View style={styles.journeyStepContent}>
                    <Text
                      style={[
                        styles.journeyStepLabel,
                        isCurrent && styles.journeyStepLabelCurrent,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={styles.journeyStepDescription}>
                      {step.description}
                    </Text>

                    {/* Notes for this step */}
                    {stepNotes.length > 0 && (
                      <View style={styles.journeyStepNotesContainer}>
                        {stepNotes.map((note) => (
                          <View key={note.id} style={styles.journeyNoteCard}>
                            <Text style={styles.journeyNoteText}>
                              {note.content}
                            </Text>
                            <Text style={styles.journeyNoteFooter}>
                              {note.createdBy} • {formatDate(note.createdAt)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>

                {/* Connector line (not on last item) */}
                {index < steps.length - 1 && (
                  <View style={styles.journeyVerticalConnector}>
                    <View
                      style={[
                        styles.journeyConnectorLine,
                        isCompleted && styles.journeyConnectorLineCompleted,
                      ]}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Add Note Button */}
        <TouchableOpacity
          style={styles.addNoteButton}
          onPress={handleAddBrokerNote}
        >
          <MessageSquare size={16} color="white" />
          <Text style={styles.addNoteButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubSection = (subSection: SubSection, index: number) => {
    const isLast = index === sortedSubSections.length - 1;

    switch (subSection.type) {
      case "visit":
        const visitData = subSection.data as any;
        return (
          <View key={subSection.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              {!isLast && <View style={styles.timelineConnector} />}
              <View style={styles.timelineDot}>
                <Calendar size={16} color="#005B78" />
              </View>
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View>
                    <Text style={styles.eventTitle}>
                      {visitData.visitType === "virtual"
                        ? "Virtual Meeting"
                        : visitData.visitType === "site_visit"
                        ? "Site Visit"
                        : "Showroom Visit"}
                    </Text>
                    <Text style={styles.eventDate}>
                      {formatDate(visitData.dateTime)} •{" "}
                      {formatTime(visitData.dateTime)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          visitData.status === "completed"
                            ? "#D1FAE5"
                            : visitData.status === "scheduled"
                            ? "#DBEAFE"
                            : "#FEE2E2",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            visitData.status === "completed"
                              ? "#059669"
                              : visitData.status === "scheduled"
                              ? "#2563EB"
                              : "#DC2626",
                        },
                      ]}
                    >
                      {visitData.status.charAt(0).toUpperCase() +
                        visitData.status.slice(1)}
                    </Text>
                  </View>
                </View>
                {visitData.location && (
                  <View style={styles.eventDetail}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.eventDetailText}>
                      {visitData.location}
                    </Text>
                  </View>
                )}
                {visitData.notes && (
                  <View style={styles.eventNotes}>
                    <Text style={styles.eventNotesText}>{visitData.notes}</Text>
                  </View>
                )}
                {visitData.status === "completed" && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      handleAddVisitNotes(subSection.id, visitData.notes)
                    }
                  >
                    <Text style={styles.actionButtonText}>Add Visit Notes</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );

      case "offer":
        const offerData = subSection.data as any;
        return (
          <View key={subSection.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              {!isLast && <View style={styles.timelineConnector} />}
              <View style={styles.timelineDot}>
                <FileText size={16} color="#C9A961" />
              </View>
            </View>
            <View style={styles.timelineContent}>
              <View style={[styles.eventCard, styles.offerCard]}>
                <View style={styles.eventHeader}>
                  <View>
                    <Text style={styles.eventTitle}>Offer Submission</Text>
                    <Text style={styles.eventDate}>
                      {formatDate(subSection.createdAt)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          offerData.status === "accepted"
                            ? "#D1FAE5"
                            : offerData.status === "sent"
                            ? "#FEF3C7"
                            : "#FEE2E2",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            offerData.status === "accepted"
                              ? "#059669"
                              : offerData.status === "sent"
                              ? "#D97706"
                              : "#DC2626",
                        },
                      ]}
                    >
                      {offerData.status.charAt(0).toUpperCase() +
                        offerData.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.offerDetails}>
                  <View style={styles.offerRow}>
                    <Text style={styles.offerLabel}>Unit Price:</Text>
                    <Text style={styles.offerValue}>
                      AED {offerData.unitPrice.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.offerRow}>
                    <Text style={styles.offerLabel}>Payment Plan:</Text>
                    <Text style={styles.offerValue}>
                      {offerData.paymentPlan}
                    </Text>
                  </View>
                  {offerData.conditions && (
                    <View style={styles.eventNotes}>
                      <Text style={styles.eventNotesText}>
                        {offerData.conditions}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        );

      case "reservation":
        const reservationData = subSection.data as any;
        return (
          <View key={subSection.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              {!isLast && <View style={styles.timelineConnector} />}
              <View style={[styles.timelineDot, styles.reservationDot]}>
                <DollarSign size={16} color="#C9A961" />
              </View>
            </View>
            <View style={styles.timelineContent}>
              <View style={[styles.eventCard, styles.reservationCard]}>
                <View style={styles.eventHeader}>
                  <View>
                    <Text style={styles.eventTitle}>
                      {reservationData.paymentType === "token"
                        ? "Token Payment"
                        : "Down Payment"}
                    </Text>
                    <Text style={styles.eventDate}>
                      {formatDate(subSection.createdAt)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          reservationData.status === "paid"
                            ? "#D1FAE5"
                            : reservationData.status === "pending"
                            ? "#FEF3C7"
                            : "#FEE2E2",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            reservationData.status === "paid"
                              ? "#059669"
                              : reservationData.status === "pending"
                              ? "#D97706"
                              : "#DC2626",
                        },
                      ]}
                    >
                      {reservationData.status === "paid"
                        ? "Paid"
                        : reservationData.status === "pending"
                        ? "Pending"
                        : "Partial"}
                    </Text>
                  </View>
                </View>
                <View style={styles.offerDetails}>
                  <View style={styles.offerRow}>
                    <Text style={styles.offerLabel}>Amount:</Text>
                    <Text style={styles.offerValue}>
                      AED {reservationData.amount.toLocaleString()}
                    </Text>
                  </View>
                  {reservationData.transactionId && (
                    <View style={styles.offerRow}>
                      <Text style={styles.offerLabel}>Transaction ID:</Text>
                      <Text style={styles.offerValue}>
                        {reservationData.transactionId}
                      </Text>
                    </View>
                  )}
                  {reservationData.status === "pending" && (
                    <TouchableOpacity style={styles.paymentButton}>
                      <Text style={styles.paymentButtonText}>
                        Generate Payment Link
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        );

      case "interaction":
        const interactionData = subSection.data as any;
        const renderInteractionIcon = () => {
          if (interactionData.type === "whatsapp") {
            return <FontAwesome name="whatsapp" size={16} color="#6B7280" />;
          }
          const interactionIcons: any = {
            call: Phone,
            email: Mail,
            note: FileText,
          };
          const Icon = interactionIcons[interactionData.type] || FileText;
          return <Icon size={16} color="#6B7280" />;
        };
        return (
          <View key={subSection.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              {!isLast && <View style={styles.timelineConnector} />}
              <View style={styles.timelineDot}>{renderInteractionIcon()}</View>
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.interactionCard}>
                <Text style={styles.interactionText}>
                  {interactionData.summary}
                </Text>
                <Text style={styles.interactionTime}>
                  {formatDate(interactionData.timestamp)} •{" "}
                  {formatTime(interactionData.timestamp)}
                </Text>
              </View>
            </View>
          </View>
        );

      case "document":
        const documentData = subSection.data as any;
        return (
          <View key={subSection.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              {!isLast && <View style={styles.timelineConnector} />}
              <View style={styles.timelineDot}>
                <FileText size={16} color="#005B78" />
              </View>
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.eventCard}>
                <Text style={styles.eventTitle}>
                  {documentData.documentType
                    .split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        documentData.status === "verified"
                          ? "#D1FAE5"
                          : documentData.status === "uploaded"
                          ? "#DBEAFE"
                          : "#FEE2E2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          documentData.status === "verified"
                            ? "#059669"
                            : documentData.status === "uploaded"
                            ? "#2563EB"
                            : "#DC2626",
                      },
                    ]}
                  >
                    {documentData.status.charAt(0).toUpperCase() +
                      documentData.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container as any} edges={[]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackNavigation}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. PROPERTY DETAILS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Property</Text>
          {booking.property.image ? (
            <Image
              source={{ uri: booking.property.image }}
              style={styles.propertyImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.propertyImagePlaceholder}>
              <Building2 size={48} color="#6B7280" />
            </View>
          )}
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyName}>{booking.property.name}</Text>
            {booking.property.unitNumber && (
              <Text style={styles.propertyUnit}>
                Unit {booking.property.unitNumber}
              </Text>
            )}
            <View style={styles.propertyDetails}>
              <View style={styles.propertyDetailItem}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.propertyDetailText}>
                  {booking.property.name}
                </Text>
              </View>
              {booking.property.price && (
                <View style={styles.propertyDetailItem}>
                  <DollarSign size={14} color="#6B7280" />
                  <Text style={styles.propertyDetailText}>
                    AED {booking.property.price?.toLocaleString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* 2. AGENT DETAILS CARD */}
        {booking.assignedBroker && (
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>RM</Text>
            <View style={styles.agentContent}>
              <View style={styles.agentAvatar}>
                <Text style={styles.agentAvatarText}>
                  {booking.assignedBroker.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{booking.assignedBroker}</Text>
                <Text style={styles.agentRole}>Relationship Manager</Text>
              </View>
            </View>
            {/* Contact Buttons */}
            <View style={styles.contactButtonsContainer}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={handleCall}
              >
                <Phone size={18} color="#005B78" />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={handleWhatsApp}
              >
                <FontAwesome name="whatsapp" size={18} color="#005B78" />
                <Text style={styles.contactButtonText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={handleEmail}
              >
                <Mail size={18} color="#005B78" />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 3. CLIENT DETAILS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Client Information</Text>
          <View style={styles.clientContent}>
            <View style={styles.clientAvatar}>
              <Text style={styles.clientAvatarText}>
                {booking.client.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>{booking.client.name}</Text>
              <Text style={styles.clientEmail}>{booking.client.email}</Text>
              <Text style={styles.clientPhone}>{booking.client.phone}</Text>
            </View>
          </View>
          {/* Contact Buttons */}
          <View style={styles.contactButtonsContainer}>
            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
              <Phone size={18} color="#005B78" />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleWhatsApp}
            >
              <FontAwesome name="whatsapp" size={18} color="#005B78" />
              <Text style={styles.contactButtonText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleEmail}
            >
              <Mail size={18} color="#005B78" />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3.5. BOOKING JOURNEY VISUALIZATION */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Booking Journey</Text>
          {renderJourneyVisualization()}
        </View>

        {/* {recentBookings.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>
              Other Bookings in Pipeline
            </Text>
            <View style={styles.recentBookingsGrid}>
              {recentBookings.map((recent) => (
                <TouchableOpacity
                  key={recent.id}
                  style={styles.recentBookingItem}
                  onPress={() => {
                    if (onBookingSelect) {
                      onBookingSelect(recent.id);
                    }
                  }}
                >
                  <View style={styles.recentBookingCard}>
                    <View style={styles.recentBookingAvatar}>
                      <Text style={styles.recentBookingAvatarText}>
                        {recent.client.name.charAt(0)}
                      </Text>
                    </View>
                    <Text style={styles.recentBookingName} numberOfLines={2}>
                      {recent.client.name}
                    </Text>
                    <Text
                      style={styles.recentBookingProperty}
                      numberOfLines={2}
                    >
                      {recent.property.name}
                    </Text>
                    {recent.property.unitNumber && (
                      <Text style={styles.recentBookingUnit}>
                        {recent.property.unitNumber}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )} */}
      </ScrollView>

      {/* Status Confirmation Modal */}
      <Modal
        visible={showStatusConfirmation}
        transparent
        animationType="fade"
        onRequestClose={cancelStatusChange}
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationModal}>
            <Text style={styles.confirmationTitle}>
              {pendingStatus === "handover"
                ? "Complete Handover?"
                : pendingStatus === "lost"
                ? "Mark as Lost?"
                : "Confirm Status Change?"}
            </Text>
            <Text style={styles.confirmationMessage}>
              {pendingStatus === "handover"
                ? "Are you sure the booking is fully completed and handed over?"
                : pendingStatus === "lost"
                ? "Mark this booking as lost? This action cannot be undone."
                : `Update booking status to ${
                    TIMELINE_STEPS[pendingStatus!]?.label || ""
                  }?`}
            </Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={styles.confirmationCancel}
                onPress={cancelStatusChange}
              >
                <Text style={styles.confirmationCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.confirmationConfirm,
                  pendingStatus === "lost" &&
                    styles.confirmationConfirmDangerous,
                ]}
                onPress={confirmStatusChange}
              >
                <Text style={styles.confirmationConfirmText}>
                  {pendingStatus === "lost" ? "Mark as Lost" : "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Broker Notes Modal */}
      <Modal
        visible={showNotesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNotesModal(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.notesModalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
            >
              <TouchableWithoutFeedback>
                <View style={styles.notesModal}>
                  <View style={styles.notesModalHeader}>
                    <Text style={styles.notesModalTitle}>Add Broker Note</Text>
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowNotesModal(false);
                        setBrokerNoteText("");
                      }}
                    >
                      <X size={24} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.notesInput}
                    placeholder="Add your notes here..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={6}
                    value={brokerNoteText}
                    onChangeText={setBrokerNoteText}
                    textAlignVertical="top"
                  />
                  <View style={styles.notesModalActions}>
                    <TouchableOpacity
                      style={styles.notesCancelButton}
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowNotesModal(false);
                        setBrokerNoteText("");
                      }}
                    >
                      <Text style={styles.notesCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.notesSaveButton}
                      onPress={handleSaveBrokerNote}
                    >
                      <Text style={styles.notesSaveText}>Save Note</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },

  /* Cards */
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
  },

  /* Property Card */
  propertyImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  propertyImagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  propertyInfo: {
    gap: 8,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  propertyUnit: {
    fontSize: 14,
    color: "#6B7280",
  },
  propertyDetails: {
    gap: 8,
    marginTop: 8,
  },
  propertyDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  propertyDetailText: {
    fontSize: 13,
    color: "#6B7280",
  },

  /* Agent Card */
  agentContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  agentAvatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  agentRole: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  contactButtonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#E6F2F5",
    borderRadius: 12,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#005B78",
  },

  /* Client Card */
  clientContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  clientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  clientAvatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#005B78",
  },
  clientInfo: {
    flex: 1,
    gap: 2,
    marginBottom: 16,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  clientEmail: {
    fontSize: 12,
    color: "#6B7280",
  },
  clientPhone: {
    fontSize: 12,
    color: "#6B7280",
  },

  /* Timeline */
  timelineItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  timelineLine: {
    alignItems: "center",
    marginRight: 16,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
    minHeight: 20,
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  reservationDot: {
    backgroundColor: "#FEF3C7",
  },
  timelineContent: {
    flex: 1,
  },
  systemEvent: {
    paddingVertical: 8,
  },
  systemEventText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  eventCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#E5E7EB",
  },
  offerCard: {
    backgroundColor: "white",
    borderLeftColor: "#C9A961",
  },
  reservationCard: {
    backgroundColor: "#FFFBEB",
    borderLeftColor: "#C9A961",
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 13,
    color: "#6B7280",
  },
  eventNotes: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  eventNotesText: {
    fontSize: 13,
    color: "#374151",
  },
  actionButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#E6F2F5",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#005B78",
  },
  offerDetails: {
    marginTop: 8,
  },
  offerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  offerLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  offerValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  paymentButton: {
    marginTop: 12,
    paddingVertical: 12,
    backgroundColor: "#005B78",
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  interactionCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  interactionText: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
  },
  interactionTime: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  recentBookingsGrid: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 8,
  },
  recentBookingItem: {
    width: 180, // Control width of each item in the scrollable view
    marginRight: 12,
  },
  recentBookingCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%", // Ensure the card takes full width of the item
  },
  recentBookingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  recentBookingAvatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  recentBookingName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  recentBookingProperty: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  recentBookingUnit: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  /* FAB */
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  actionMenu: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  actionMenuTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },
  actionMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  actionMenuText: {
    fontSize: 16,
    color: "#111827",
  },
  actionMenuCancel: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  actionMenuCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
  },
  visitNotesModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  visitNotesModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  visitNotesModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  visitNotesModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  visitNotesInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  visitNotesModalActions: {
    flexDirection: "row",
    gap: 12,
  },
  visitNotesCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  visitNotesCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  visitNotesSaveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#005B78",
    alignItems: "center",
  },
  visitNotesSaveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  /* Journey Visualization Styles */
  journeyContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  journeyHeader: {
    marginBottom: 20,
  },
  journeyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  statusDropdownWrapper: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F9FAFB",
  },
  statusDropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  statusDropdownButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#005B78",
  },
  statusDropdownChevron: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  statusDropdownMenu: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  statusDropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  statusDropdownOptionSelected: {
    backgroundColor: "#F0F9FF",
  },
  statusDropdownOptionText: {
    fontSize: 14,
    color: "#374151",
  },
  statusDropdownOptionTextSelected: {
    color: "#005B78",
    fontWeight: "600",
  },
  journeyVerticalTimeline: {
    marginBottom: 20,
    marginTop: 20,
  },
  journeyStepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  journeyStepCircleContainer: {
    width: 70,
    alignItems: "center",
    paddingTop: 4,
  },
  journeyStepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  journeyStepCircleCompleted: {
    backgroundColor: "#10B981",
  },
  journeyStepCircleCurrent: {
    backgroundColor: "#005B78",
    borderWidth: 3,
    borderColor: "#E6F2F5",
  },
  journeyStepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D1D5DB",
  },
  journeyStepDotCurrent: {
    backgroundColor: "white",
  },
  journeyStepContent: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 6,
  },
  journeyStepLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 2,
  },
  journeyStepLabelCurrent: {
    color: "#005B78",
    fontWeight: "700",
  },
  journeyStepDescription: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  journeyStepNotesContainer: {
    marginTop: 10,
  },
  journeyNoteCard: {
    backgroundColor: "#F0F9FF",
    borderLeftWidth: 3,
    borderLeftColor: "#005B78",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  journeyNoteText: {
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 4,
    lineHeight: 18,
  },
  journeyNoteFooter: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  journeyVerticalConnector: {
    width: 70,
    alignItems: "center",
    height: 20,
  },
  journeyConnectorLine: {
    width: 2,
    height: 20,
    backgroundColor: "#D1D5DB",
  },
  journeyConnectorLineCompleted: {
    backgroundColor: "#10B981",
  },
  journeyActionsContainer: {
    marginTop: 16,
  },
  journeyPrimaryCTA: {
    backgroundColor: "#005B78",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  journeyPrimaryCTAText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  journeySecondaryCtasContainer: {
    flexDirection: "row",
    gap: 8,
  },
  journeySecondaryCTA: {
    flex: 1,
    backgroundColor: "#E6F2F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  journeySecondaryCTAText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#005B78",
  },
  journeyLostCTA: {
    flex: 1,
    backgroundColor: "#FEE2E2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  journeyLostCTAText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#DC2626",
  },
  addNoteButton: {
    backgroundColor: "#005B78",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  addNoteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },

  /* Status Confirmation Modal */
  confirmationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationModal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    width: "90%",
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  confirmationMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 24,
  },
  confirmationButtons: {
    flexDirection: "row",
    gap: 12,
  },
  confirmationCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  confirmationCancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  confirmationConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#005B78",
    alignItems: "center",
  },
  confirmationConfirmDangerous: {
    backgroundColor: "#DC2626",
  },
  confirmationConfirmText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },

  /* Broker Notes Modal */
  notesModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  keyboardAvoidingView: {
    // justifyContent: "flex-end",
  },
  notesModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "100%",
  },
  notesModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  notesModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  notesInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  notesModalActions: {
    flexDirection: "row",
    gap: 12,
  },
  notesCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  notesCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  notesSaveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#005B78",
    alignItems: "center",
  },
  notesSaveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
