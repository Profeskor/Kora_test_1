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
      cold: {
        label: "Cold Lead",
        color: "#6B7280",
        bg: "#F3F4F6",
        icon: Clock,
      },
      interest_expressed: {
        label: "Inquiry Sent",
        color: "#F59E0B",
        bg: "#FFFBEB",
        icon: AlertCircle,
      },
      agent_contact: {
        label: "Agent Contacted",
        color: "#3B82F6",
        bg: "#EFF6FF",
        icon: Clock,
      },
      site_visit: {
        label: "Site Visit",
        color: "#3B82F6",
        bg: "#EFF6FF",
        icon: Calendar,
      },
      offer_reservation: {
        label: "Offer Reserved",
        color: "#C9A961",
        bg: "#FFFBEB",
        icon: AlertCircle,
      },
      awaiting_finalisation: {
        label: "Finalising",
        color: "#F59E0B",
        bg: "#FFFBEB",
        icon: Clock,
      },
      handover: {
        label: "Handover",
        color: "#10B981",
        bg: "#ECFDF5",
        icon: CheckCircle,
      },
      lost: {
        label: "Lost",
        color: "#EF4444",
        bg: "#FEF2F2",
        icon: AlertCircle,
      },
      cancelled: {
        label: "Cancelled",
        color: "#EF4444",
        bg: "#FEF2F2",
        icon: AlertCircle,
      },
    };

    return configs[status];
  };

  const getProgress = (status: UnifiedBooking["masterStatus"]): number => {
    const progressMap: Record<UnifiedBooking["masterStatus"], number> = {
      cold: 10,
      interest_expressed: 20,
      agent_contact: 35,
      site_visit: 50,
      offer_reservation: 65,
      awaiting_finalisation: 80,
      handover: 95, // ✅ not completed yet
      lost: 0,
      cancelled: 0,
    };

    return progressMap[status];
  };

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
    const progress = getProgress(item.masterStatus);
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

    const actionBg =
      item.masterStatus === "site_visit"
        ? "#005B78"
        : item.masterStatus === "offer_reservation"
        ? "#C9A961"
        : "#E6F2F5";

    const actionColor = isPrimaryAction ? "white" : "#005B78";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onBookingSelect(item.id)}
      >
        {/* Property Image */}
        <View style={styles.imageContainer}>
          {item.property.image ? (
            <Image
              source={{ uri: item.property.image }}
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

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: statusConfig?.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progress}% Complete</Text>
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
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  filtersContainer: {
    maxHeight: 65,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
    backgroundColor: "#F3F4F6",
  },
  filterPillActive: {
    backgroundColor: "#E6F2F5",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#005B78",
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    backgroundColor: "#E5E7EB",
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
    fontSize: 48,
    fontWeight: "700",
    color: "#005B78",
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
    color: "#111827",
    marginBottom: 4,
  },
  unitNumber: {
    fontSize: 14,
    color: "#6B7280",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#005B78",
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
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
    color: "#6B7280",
  },
  nextStep: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  nextStepLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  nextStepText: {
    fontSize: 14,
    color: "#111827",
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
    color: "#111827",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
