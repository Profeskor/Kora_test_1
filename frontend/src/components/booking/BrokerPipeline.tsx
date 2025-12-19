import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Phone,
  Calendar,
  AlertCircle,
  Flame,
  Snowflake,
  DollarSign,
  CheckCircle,
  Clock,
  User,
  X,
} from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";
import { UnifiedBooking } from "../../types/booking";
import {
  getBookingsByPipeline,
  getQuickFilterCounts,
} from "../../data/mockBookings";
import { useBookingStore } from "../../store/bookingStore";
import {
  getNextActionForStatus,
  getStatusColor as getStatusColorUtil,
  getStatusDisplayLabel,
  calculatePriorityScore,
} from "../../utils/bookingUtils";

interface BrokerPipelineProps {
  onBookingSelect: (bookingId: string) => void;
}

type PipelineStage = "active" | "closed";

const QuickFilter = ({
  icon: Icon,
  label,
  count,
  isActive,
  onPress,
}: {
  icon: any;
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.filterPill, isActive && styles.filterPillActive]}
    onPress={onPress}
  >
    <Icon size={16} color={isActive ? "#005B78" : "#6B7280"} />
    <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
      {label}
    </Text>
    {count > 0 && (
      <View style={styles.filterBadge}>
        <Text style={styles.filterBadgeText}>{count}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function BrokerPipeline({
  onBookingSelect,
}: BrokerPipelineProps) {
  const [activeStage, setActiveStage] = useState<PipelineStage>("active");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { bookings } = useBookingStore();

  const filterCounts = useMemo(
    () => getQuickFilterCounts(bookings),
    [bookings]
  );

  const quickFilters = [
    {
      id: "payment_pending",
      icon: AlertCircle,
      label: "Payment",
      count: filterCounts.payment_pending,
    },
    {
      id: "upcoming_visits",
      icon: Calendar,
      label: "Visits",
      count: filterCounts.upcoming_visits,
    },
    {
      id: "visit_followup",
      icon: Clock,
      label: "Follow-up",
      count: filterCounts.visit_followup,
    },
    {
      id: "new_inquiries",
      icon: User,
      label: "New",
      count: filterCounts.new_inquiries,
    },
    // {
    //   id: "hot_deals",
    //   icon: Flame,
    //   label: "Hot",
    //   count: filterCounts.hot_deals,
    // },
    // {
    //   id: "cold_leads",
    //   icon: Snowflake,
    //   label: "Cold",
    //   count: filterCounts.cold_leads,
    // },
    {
      id: "offers_out",
      icon: DollarSign,
      label: "Offers",
      count: filterCounts.offers_out,
    },
    {
      id: "reserved",
      icon: CheckCircle,
      label: "Reserved",
      count: filterCounts.reserved,
    },
  ];

  const filteredBookings = useMemo(() => {
    let filtered = getBookingsByPipeline(bookings, activeStage);

    // Apply multiple quick filters (AND logic - must match all selected filters)
    if (activeFilters.length > 0) {
      activeFilters.forEach((filterId) => {
        switch (filterId) {
          case "payment_pending":
            filtered = filtered.filter((b) =>
              b.subSections.some(
                (sub) =>
                  sub.type === "reservation" &&
                  (sub.data as any).status === "pending"
              )
            );
            break;
          case "upcoming_visits":
            filtered = filtered.filter((b) =>
              b.subSections.some(
                (sub) =>
                  sub.type === "visit" &&
                  (sub.data as any).status === "scheduled" &&
                  new Date((sub.data as any).dateTime) > new Date()
              )
            );
            break;
          case "visit_followup":
            // Site visit completed, needs follow-up
            filtered = filtered.filter(
              (b) =>
                b.masterStatus === "site_visit" &&
                b.subSections.some(
                  (sub) =>
                    sub.type === "visit" &&
                    (sub.data as any).status === "completed"
                )
            );
            break;
          case "new_inquiries":
            // New interest expressed
            filtered = filtered.filter(
              (b) => b.masterStatus === "interest_expressed"
            );
            break;
          case "hot_deals":
            // Use dynamic priority score calculation
            filtered = filtered.filter((b) => calculatePriorityScore(b) >= 70);
            break;
          case "cold_leads":
            filtered = filtered.filter((b) => b.masterStatus === "cold");
            break;
          case "offers_out":
            // Offer/reservation stage
            filtered = filtered.filter(
              (b) => b.masterStatus === "offer_reservation"
            );
            break;
          case "reserved":
            // Awaiting finalisation (reserved)
            filtered = filtered.filter(
              (b) => b.masterStatus === "awaiting_finalisation"
            );
            break;
        }
      });
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.client.name.toLowerCase().includes(query) ||
          b.property.name.toLowerCase().includes(query) ||
          b.property.unitNumber?.toLowerCase().includes(query) ||
          b.client.phone.includes(query)
      );
    }

    return filtered;
  }, [activeStage, activeFilters, searchQuery, bookings]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Use utility functions for status display (now centralized in bookingUtils)
  const formatStatus = (status: UnifiedBooking["masterStatus"]) => {
    return getStatusDisplayLabel(status);
  };

  const renderBookingCard = ({ item }: { item: UnifiedBooking }) => {
    const statusColor = getStatusColorUtil(item.masterStatus);
    // Use dynamic next action based on current status instead of hardcoded value
    const nextAction = getNextActionForStatus(item.masterStatus, item);
    // Use dynamic priority score calculation
    const priorityScore = calculatePriorityScore(item);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onBookingSelect(item.id)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.clientInfo}>
            {item.client.avatar ? (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.client.name.charAt(0)}
                </Text>
              </View>
            ) : (
              <View style={styles.avatar}>
                <User size={20} color="#005B78" />
              </View>
            )}
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>{item.client.name}</Text>
              <Text style={styles.propertyName}>
                {item.property.name}
                {item.property.unitNumber && ` • ${item.property.unitNumber}`}
              </Text>
            </View>
          </View>
          <View
            style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}
          >
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {formatStatus(item.masterStatus)}
            </Text>
          </View>
        </View>

        {item.source === "self_created" && (
          <View style={styles.selfCreatedBadge}>
            <Text style={styles.selfCreatedBadgeText}>Self Created</Text>
          </View>
        )}

        {/* {priorityScore >= 70 && (
          <View style={styles.priorityBadge}>
            <Flame size={14} color="#EA580C" />
            <Text style={styles.priorityText}>Hot Deal</Text>
          </View>
        )} */}

        {nextAction && (
          <View style={styles.nextAction}>
            <Text
              style={[
                styles.nextActionText,
                nextAction.urgent && styles.nextActionUrgent,
              ]}
            >
              {nextAction.urgent ? "⚠️ " : "📅 "}
              {nextAction.label}
            </Text>
          </View>
        )}

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              const phoneNumber = item.client.phone.replace(/\s/g, "");
              Linking.openURL(`tel:${phoneNumber}`).catch(() => {
                Alert.alert("Error", "Unable to open phone dialer");
              });
            }}
          >
            <Phone size={16} color="#005B78" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              const phoneNumber = item.client.phone.replace(/[^0-9]/g, "");
              const message = `Hello ${
                item.client.name
              }, regarding your inquiry for ${item.property.name}${
                item.property.unitNumber ? ` - ${item.property.unitNumber}` : ""
              }`;
              Linking.openURL(
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  message
                )}`
              ).catch(() => {
                Alert.alert("Error", "Unable to open WhatsApp");
              });
            }}
          >
            <FontAwesome name="whatsapp" size={16} color="#005B78" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Pipeline Stages */}
      <View style={styles.stageTabs}>
        <TouchableOpacity
          style={[
            styles.stageTab,
            activeStage === "active" && styles.stageTabActive,
          ]}
          onPress={() => {
            setActiveStage("active");
            setActiveFilters([]);
          }}
        >
          <Text
            style={[
              styles.stageTabText,
              activeStage === "active" && styles.stageTabTextActive,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.stageTab,
            activeStage === "closed" && styles.stageTabActive,
          ]}
          onPress={() => {
            setActiveStage("closed");
            setActiveFilters([]);
          }}
        >
          <Text
            style={[
              styles.stageTabText,
              activeStage === "closed" && styles.stageTabTextActive,
            ]}
          >
            Closed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bookings..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Quick Filters */}
      {activeStage === "active" && (
        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {quickFilters.map((filter) => (
              <QuickFilter
                key={filter.id}
                icon={filter.icon}
                label={filter.label}
                count={filter.count}
                isActive={activeFilters.includes(filter.id)}
                onPress={() => toggleFilter(filter.id)}
              />
            ))}
          </ScrollView>
          {activeFilters.length > 0 && (
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={clearFilters}
            >
              <X size={16} color="#6B7280" />
              <Text style={styles.clearFiltersText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No bookings found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  stageTabs: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  stageTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  stageTabActive: {
    backgroundColor: "#E6F2F5",
  },
  stageTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  stageTabTextActive: {
    color: "#005B78",
  },
  stageBadge: {
    backgroundColor: "#005B78",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  stageBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  filtersWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 12,
  },
  filtersContainer: {
    flex: 1,
    maxHeight: 60,
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    alignItems: "center",
  },
  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 20,
    gap: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
  },
  clearFiltersText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
    minWidth: 80,
    minHeight: 36,
    height: 36,
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: "#E6F2F5",
    borderColor: "#005B78",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#005B78",
  },
  filterBadge: {
    backgroundColor: "#005B78",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  filterBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F2F5",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#005B78",
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  propertyName: {
    fontSize: 14,
    color: "#6B7280",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    gap: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#EA580C",
  },
  selfCreatedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  selfCreatedBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#2563EB",
  },
  nextAction: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  nextActionText: {
    fontSize: 13,
    color: "#6B7280",
  },
  nextActionUrgent: {
    color: "#DC2626",
    fontWeight: "600",
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
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
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
  },
  // filtersWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "white",
  //   marginBottom: 12,
  // },
  // clearFiltersButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingHorizontal: 12,
  //   paddingVertical: 8,
  //   marginRight: 20,
  //   gap: 6,
  //   backgroundColor: "#F3F4F6",
  //   borderRadius: 20,
  // },
  // clearFiltersText: {
  //   fontSize: 12,
  //   fontWeight: "600",
  //   color: "#6B7280",
  // },
});
