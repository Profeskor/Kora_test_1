import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react-native";
import { UnifiedBooking } from "../../types/booking";
import { useBookingStore } from "../../store/bookingStore";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  badges,
  shadows,
} from "../../constants/colors";

interface BuyerPortfolioProps {
  onBookingSelect: (bookingId: string) => void;
}

export default function BuyerPortfolio({
  onBookingSelect,
}: BuyerPortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { bookings } = useBookingStore();

  // Filter bookings for buyer (only their own)
  const buyerBookings = useMemo(() => {
    // In real app, filter by current user ID
    // For now, show all bookings that are not lost/cancelled/cold
    return bookings.filter(
      (b) => !["lost", "cancelled", "cold"].includes(b.masterStatus)
    );
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (!activeFilter) return buyerBookings;
    return buyerBookings.filter((b) => b.masterStatus === activeFilter);
  }, [buyerBookings, activeFilter]);

  const getStatusConfig = (status: UnifiedBooking["masterStatus"]) => {
    const configs: Record<
      UnifiedBooking["masterStatus"],
      { label: string; color: string; bg: string; icon: any }
    > = {
      // Neutral / Early stages
      cold: {
        label: "Cold Lead",
        color: badges.text,
        bg: badges.background,
        icon: Clock,
      },
      // Info / Active stages (blue)
      interest_expressed: {
        label: "Inquiry Sent",
        color: badges.infoText,
        bg: badges.infoBg,
        icon: AlertCircle,
      },
      agent_contact: {
        label: "Agent Contacted",
        color: badges.infoText,
        bg: badges.infoBg,
        icon: Clock,
      },
      // Warning / In progress stages (amber)
      site_visit: {
        label: "Site Visit",
        color: badges.warningText,
        bg: badges.warningBg,
        icon: Calendar,
      },
      offer_reservation: {
        label: "Offer Reserved",
        color: badges.warningText,
        bg: badges.warningBg,
        icon: AlertCircle,
      },
      awaiting_finalisation: {
        label: "Finalising",
        color: badges.warningText,
        bg: badges.warningBg,
        icon: Clock,
      },
      // Success / Completed (green)
      handover: {
        label: "Handover",
        color: badges.successText,
        bg: badges.successBg,
        icon: CheckCircle,
      },
      // Error / Lost (red)
      lost: {
        label: "Lost",
        color: badges.errorText,
        bg: badges.errorBg,
        icon: AlertCircle,
      },
      cancelled: {
        label: "Cancelled",
        color: badges.errorText,
        bg: badges.errorBg,
        icon: AlertCircle,
      },
    };

    return configs[status];
  };

  const getProgress = (status: UnifiedBooking["masterStatus"]): number => {
    const progressMap: Record<UnifiedBooking["masterStatus"], number> = {
      cold: 0,
      interest_expressed: 1,
      agent_contact: 2,
      site_visit: 3,
      offer_reservation: 4,
      awaiting_finalisation: 5,
      handover: 6,
      lost: 0,
      cancelled: 0,
    };

    return progressMap[status];
  };

  const TOTAL_STEPS = 6;

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled masterStatus: ${value}`);
  };

  const getNextStep = (booking: UnifiedBooking) => {
    if (booking.nextAction) {
      return booking.nextAction.label;
    }

    switch (booking.masterStatus) {
      case "interest_expressed":
        return "Awaiting agent contact";
      case "agent_contact":
        return "Schedule site visit";
      case "site_visit":
        return "Complete site visit";
      case "offer_reservation":
        return "Review & reserve offer";
      case "awaiting_finalisation":
        return "Finalise booking";
      case "handover":
        return "Handover in progress";
      case "cold":
        return "Follow up required";
      case "lost":
        return "Booking lost";
      case "cancelled":
        return "Booking cancelled";
      default:
        return assertNever(booking.masterStatus);
    }
  };

  const renderBookingCard = ({ item }: { item: UnifiedBooking }) => {
    const statusConfig = getStatusConfig(item.masterStatus);
    const currentStep = getProgress(item.masterStatus);
    const progressPercentage = (currentStep / TOTAL_STEPS) * 100;
    const StatusIcon = statusConfig?.icon;

    const isPrimaryAction =
      item.masterStatus === "site_visit" ||
      item.masterStatus === "offer_reservation";

    const actionLabel = "View details";
    // item.masterStatus === "site_visit"
    //   ? "Get Directions"
    //   : item.masterStatus === "offer_reservation"
    //   ? "Make Payment"
    //   : "View Details";

    const actionBg = palette.brand.primary;

    const actionColor = textColors.onDark;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onBookingSelect(item.id)}
      >
        {/* Property Image */}
        <View style={styles.imageContainer}>
          {item.property.image ? (
            <Image
              source={
                typeof item.property.image === "number"
                  ? item.property.image
                  : { uri: item.property.image }
              }
              style={styles.propertyImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>
                {item.property.name.charAt(0)}
              </Text>
            </View>
          )}

          <View
            style={[styles.statusBadge, { backgroundColor: statusConfig?.bg }]}
          >
            <StatusIcon size={12} color={statusConfig?.color} />
            <Text style={[styles.statusText, { color: statusConfig?.color }]}>
              {statusConfig?.label}
            </Text>
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyName}>{item.property.name}</Text>
              {item.property.unitNumber && (
                <Text style={styles.unitNumber}>
                  {item.property.unitNumber}
                </Text>
              )}
            </View>
            <Text style={styles.price}>
              AED {item.property.price.toLocaleString()}
            </Text>
          </View>

          {/* Step-based Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: statusConfig?.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Step {currentStep} of {TOTAL_STEPS}
            </Text>
          </View>

          {/* Next Step */}
          <View style={styles.nextStep}>
            <Text style={styles.nextStepLabel}>What&apos;s Next:</Text>
            <Text style={styles.nextStepText}>{getNextStep(item)}</Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: actionBg }]}
            onPress={() => onBookingSelect(item.id)}
          >
            <Text style={[styles.actionButtonText, { color: actionColor }]}>
              {actionLabel}
            </Text>
            <ArrowRight size={16} color={actionColor} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const filterOptions: {
    id: UnifiedBooking["masterStatus"] | null;
    label: string;
  }[] = [
    { id: null, label: "All" },
    { id: "interest_expressed", label: "Inquiry" },
    { id: "site_visit", label: "Visiting" },
    { id: "offer_reservation", label: "Reserved" },
    { id: "handover", label: "Owned" },
  ];
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Properties</Text>
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id || "all"}
            style={[
              styles.filterPill,
              activeFilter === filter.id && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bookings List */}
      <View style={styles.listWrapper}>
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No properties found</Text>
              <Text style={styles.emptyStateSubtext}>
                Start exploring properties to add them here
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
  },
  header: {
    backgroundColor: backgrounds.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: textColors.heading,
    fontFamily: "Marcellus-Regular",
  },
  filtersContainer: {
    maxHeight: 65,
    backgroundColor: backgrounds.card,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 60,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgrounds.subtle,
  },
  filterPillActive: {
    backgroundColor: backgrounds.subtle,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.secondary,
  },
  filterTextActive: {
    color: palette.brand.primary,
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: 20,
    overflow: "hidden",
    ...shadows.card,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    backgroundColor: borders.default,
  },
  propertyImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: 48,
    fontWeight: "700",
    color: palette.brand.primary,
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 4,
    fontFamily: "Marcellus-Regular",
  },
  unitNumber: {
    fontSize: 14,
    color: textColors.secondary,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.brand.primary,
    fontFamily: "Marcellus-Regular",
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: borders.default,
    borderRadius: 3,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: textColors.secondary,
  },
  nextStep: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: backgrounds.subtle,
    borderRadius: 8,
  },
  nextStepLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: textColors.secondary,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  nextStepText: {
    fontSize: 14,
    color: textColors.heading,
    fontWeight: "500",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
  },
});
