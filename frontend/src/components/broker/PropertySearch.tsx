import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Bed,
  Maximize2,
  ChevronDown,
} from "lucide-react-native";
import { getProperties } from "../../api/client";
import { Property } from "../../types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUserStore } from "../../store/userStore";
import SignInRequired from "../guest/SignInRequired";
import PropertyFiltersModal, { FilterState } from "./PropertyFiltersModal";
import { getImageSource } from "../../utils/imageUtils";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "../../constants/colors";

export default function PropertySearch() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    q?: string;
    community?: string;
    category?: string;
    bedrooms?: string;
  }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<"residential" | "commercial">(
    "residential"
  );
  const user = useUserStore((state) => state.user);
  const role = user?.currentRole || "guest";
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<"newest" | "price_low">("newest");
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState<
    null | "community" | "property" | "position"
  >(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, Infinity],
    bedrooms: [],
    propertyTypes: [],
    status: [],
    sizeRange: [0, Infinity],
    handoverDate: [],
  });

  useEffect(() => {
    loadProperties();
  }, []);

  // Initialize and update filters from params - only run once on mount and when params actually change
  useEffect(() => {
    const queryParam = params.q;
    const communityParam = params.community;
    const categoryParam = params.category;
    const bedroomsParam = params.bedrooms;

    if (queryParam) {
      setSearchQuery(queryParam);
    }
    if (communityParam) {
      setSelectedCommunity(communityParam);
    }
    if (
      categoryParam &&
      (categoryParam === "residential" || categoryParam === "commercial")
    ) {
      setCategory(categoryParam);
    }
    if (bedroomsParam) {
      const bedroomCount = parseInt(bedroomsParam);
      if (!isNaN(bedroomCount)) {
        setFilters((prev) => ({
          ...prev,
          bedrooms: [bedroomCount],
        }));
      }
    }
  }, [params.q, params.community, params.category, params.bedrooms]);

  const loadProperties = async () => {
    try {
      const data = await getProperties();
      console.log("[PropertySearch] Loaded properties:", data?.length, "items");
      setProperties(data);
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  let filteredProperties = properties.filter((p) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedType = (p.type || "").toLowerCase();
    const isCommercialType =
      normalizedType.includes("com") ||
      normalizedType.includes("office") ||
      normalizedType.includes("retail") ||
      normalizedType.includes("lease") ||
      normalizedType.includes("shop");
    const isResidentialType = !isCommercialType;

    // Enhanced query matching for filter pills
    let matchesQuery: boolean = !normalizedQuery;
    if (normalizedQuery) {
      // Check name, location, project
      const basicMatch: boolean =
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.location.toLowerCase().includes(normalizedQuery) ||
        p.project.toLowerCase().includes(normalizedQuery) ||
        (p.tagline ? p.tagline.toLowerCase().includes(normalizedQuery) : false);

      // Special handling for filter pill queries
      if (normalizedQuery.includes("apartment")) {
        matchesQuery = basicMatch || normalizedType.includes("apartment");
      } else if (normalizedQuery.includes("bedroom")) {
        // Extract bedroom count from query (e.g., "3-4 bedrooms" -> 3 or 4)
        const bedroomMatch = normalizedQuery.match(/(\d+)-(\d+)/);
        if (bedroomMatch) {
          const minBeds = parseInt(bedroomMatch[1]);
          const maxBeds = parseInt(bedroomMatch[2]);
          matchesQuery = p.bedrooms >= minBeds && p.bedrooms <= maxBeds;
        } else {
          matchesQuery = basicMatch;
        }
      } else if (normalizedQuery.includes("ready")) {
        matchesQuery =
          basicMatch ||
          (p.handoverDate
            ? p.handoverDate.toLowerCase().includes("ready")
            : false);
      } else if (normalizedQuery.includes("luxury")) {
        matchesQuery =
          basicMatch ||
          p.name.toLowerCase().includes("luxury") ||
          (p.tagline ? p.tagline.toLowerCase().includes("luxury") : false);
      } else {
        matchesQuery = basicMatch;
      }
    }

    const matchesCategory =
      category === "residential" ? isResidentialType : isCommercialType;
    const matchesCommunity =
      !selectedCommunity || p.project === selectedCommunity;
    const matchesProperty = !selectedProperty || p.name === selectedProperty;
    const matchesPosition =
      !selectedPosition ||
      (p.features.view && p.features.view === selectedPosition);

    // Apply modal filters
    const matchesPrice =
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
    const matchesBedrooms =
      filters.bedrooms.length === 0 || filters.bedrooms.includes(p.bedrooms);
    const matchesType =
      filters.propertyTypes.length === 0 ||
      filters.propertyTypes.includes(p.type);
    const matchesSize =
      p.size >= filters.sizeRange[0] && p.size <= filters.sizeRange[1];
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(p.status);
    const handoverYear = p.handoverDate?.match(/\d{4}/)?.[0];
    const matchesHandover =
      filters.handoverDate.length === 0 ||
      filters.handoverDate.some(
        (d) =>
          (d === "Ready" && p.handoverDate === "Ready") ||
          (handoverYear && d === handoverYear)
      );

    return (
      matchesQuery &&
      matchesCategory &&
      matchesCommunity &&
      matchesProperty &&
      matchesPosition &&
      matchesPrice &&
      matchesBedrooms &&
      matchesType &&
      matchesSize &&
      matchesStatus &&
      matchesHandover
    );
  });

  // Basic sorting controls (demo)
  if (sortBy === "price_low") {
    filteredProperties = filteredProperties.sort(
      (a, b) => (a.price || 0) - (b.price || 0)
    );
  } else if (sortBy === "newest") {
    filteredProperties = filteredProperties.sort(
      (a, b) => (b.price || 0) - (a.price || 0)
    );
  }

  console.log(
    "[PropertySearch] Role:",
    role,
    "| Properties:",
    properties.length,
    "| Filtered:",
    filteredProperties.length
  );

  const communityOptions = Array.from(
    new Set(properties.map((p) => p.project))
  ).sort();
  const propertyOptions = Array.from(
    new Set(properties.map((p) => p.name))
  ).sort();
  const positionOptions = Array.from(
    new Set(
      properties
        .map((p) => p.features.view)
        .filter((v): v is string => Boolean(v))
    )
  ).sort();

  const renderItem = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (role === "guest") {
          setShowSignInModal(true);
          return;
        }
        router.push(`/unit-selection?propertyId=${item.id}`);
        // // bypass the unit selection for brokers - go directly to property details
        // router.push(`/property/${item.id}?unitId=${item.id}`);
      }}
    >
      <View style={styles.imageContainer}>
        {item.images && item.images.length > 0 && item.images[0] ? (
          <Image
            source={getImageSource(item.images[0])}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.image, { backgroundColor: borders.default }]} />
        )}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status || "Available"}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.propertyName}>{item.name || ""}</Text>
        <View style={styles.locationRow}>
          <MapPin size={14} color={textColors.secondary} />
          <Text style={styles.locationText}>{item.location || ""}</Text>
        </View>

        <Text style={styles.price}>{formatPrice(item.price || 0)}</Text>

        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Bed size={16} color={textColors.body} />
            <Text style={styles.featureText}>
              {item.bedrooms === 0 ? "Studio" : `${item.bedrooms} BR`}
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Maximize2 size={16} color={textColors.body} />
            <Text style={styles.featureText}>
              {(item.size || 0).toLocaleString()} sq ft
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={textColors.secondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by project, community or location"
              placeholderTextColor={textColors.secondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFiltersModal(true)}
            activeOpacity={0.9}
          >
            <SlidersHorizontal size={18} color={textColors.onDark} />
            <Text style={styles.filterLabel}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.segmentRow}>
          {
            // Only residential option kept (no Commercial Leasing)
            [{ key: "residential", label: "Residential" }].map((item) => {
              const active = category === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.segment, active && styles.segmentActive]}
                  onPress={() => setCategory(item.key as typeof category)}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      active && styles.segmentTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })
          }

          <View style={styles.spacer} />
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode((m) => (m === "list" ? "grid" : "list"))}
          >
            <Text style={styles.viewToggleText}>
              {viewMode === "list" ? "Grid" : "List"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() =>
              setSortBy((s) => (s === "newest" ? "price_low" : "newest"))
            }
          >
            <Text style={styles.sortText}>
              {sortBy === "newest" ? "Newest" : "Price Low-High"}
            </Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.filtersRow}>
          <DropdownPill
            label="Community"
            value={selectedCommunity}
            disabled={communityOptions.length === 0}
            onPress={() => setPickerOpen("community")}
          />
          <DropdownPill
            label="Property"
            disabled={propertyOptions.length === 0}
            value={selectedProperty}
            onPress={() => setPickerOpen("property")}
          />
          <DropdownPill
            label="Unit Position"
            value={selectedPosition}
            disabled={positionOptions.length === 0}
            onPress={() => setPickerOpen("position")}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={palette.brand.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id || `property-${item.name || Math.random()}`
          }
          contentContainerStyle={styles.listContent}
          numColumns={viewMode === "grid" ? 2 : 1}
          columnWrapperStyle={
            viewMode === "grid"
              ? { justifyContent: "space-between" }
              : undefined
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No properties found</Text>
            </View>
          }
        />
      )}

      <PickerSheet
        visible={pickerOpen === "community"}
        title="Select Community"
        options={communityOptions}
        selected={selectedCommunity}
        onSelect={setSelectedCommunity}
        onClose={() => setPickerOpen(null)}
      />
      <PickerSheet
        visible={pickerOpen === "property"}
        title="Select Property"
        options={propertyOptions}
        selected={selectedProperty}
        onSelect={setSelectedProperty}
        onClose={() => setPickerOpen(null)}
      />
      <PickerSheet
        visible={pickerOpen === "position"}
        title="Select Unit Position"
        options={positionOptions}
        selected={selectedPosition}
        onSelect={setSelectedPosition}
        onClose={() => setPickerOpen(null)}
      />
      <PropertyFiltersModal
        visible={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        properties={properties}
        currentFilters={filters}
      />
      <Modal visible={showSignInModal} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={[styles.sheet, { margin: 20 }] as any}>
            <SignInRequired feature="Shortlist" />
            <TouchableOpacity
              onPress={() => setShowSignInModal(false)}
              style={{ alignSelf: "center", marginTop: 12 }}
            >
              <Text style={{ color: textColors.secondary }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

type PillProps = {
  label: string;
  value: string | null;
  disabled?: boolean;
  onPress: () => void;
};

function DropdownPill({ label, value, disabled, onPress }: PillProps) {
  const isActive = Boolean(value);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.pill,
        isActive && styles.pillActive,
        disabled && styles.pillDisabled,
      ]}
    >
      {/* LEFT SIDE (dot + text) */}
      <View style={styles.pillLeft}>
        {isActive && <View style={styles.activeDot} />}
        <Text
          style={[styles.pillLabel, isActive && styles.pillLabelActive]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value || label}
        </Text>
      </View>

      {/* RIGHT SIDE (icon) */}
      <ChevronDown
        size={16}
        color={isActive ? palette.brand.primary : textColors.secondary}
      />
    </TouchableOpacity>
  );
}

type PickerSheetProps = {
  visible: boolean;
  title: string;
  options: string[];
  onClose: () => void;
  onSelect: (value: string | null) => void;
  selected: string | null;
};

function PickerSheet({
  visible,
  title,
  options,
  onClose,
  onSelect,
  selected,
}: PickerSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ maxHeight: 320 }}>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => {
                onSelect(null);
                onClose();
              }}
            >
              <Text style={styles.optionText}>Any</Text>
              {selected === null && <Text style={styles.optionCheck}>•</Text>}
            </TouchableOpacity>
            {options.map((opt) => {
              const active = selected === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionRow, active && styles.optionRowActive]}
                  onPress={() => {
                    onSelect(opt);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      active && styles.optionTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                  {active && <Text style={styles.optionCheck}>•</Text>}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
  },
  hero: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    backgroundColor: backgrounds.subtle,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: borders.default,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: textColors.heading,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.brand.primary,
    backgroundColor: palette.brand.primary,
    ...shadows.sm,
  },
  filterLabel: {
    fontSize: 13,
    color: textColors.onDark,
    fontWeight: "600",
  },
  segmentRow: {
    flexDirection: "row",
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borders.default,
    padding: 4,
    gap: 6,
    ...shadows.sm,
  },
  spacer: { flex: 1 },
  viewToggle: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  viewToggleText: { color: textColors.secondary, fontWeight: "700" },
  sortButton: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sortText: { color: textColors.secondary, fontWeight: "700" },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: palette.brand.primary,
    // ...shadows.sm,
  },
  segmentText: {
    fontSize: 14,
    color: textColors.secondary,
    fontWeight: "600",
  },
  segmentTextActive: {
    // color: palette.accent.gold,
  },
  filtersRow: {
    marginTop: 5,
    marginBottom: 10,
    // gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  pill: {
    backgroundColor: backgrounds.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.25,
    borderColor: borders.default,
    ...shadows.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    flex: 1,
  },

  pillLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1, // 🔑 allows text to shrink
    marginRight: 8, // spacing from chevron
  },

  pillLabel: {
    color: textColors.secondary,
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1, // 🔑 allows truncation
  },
  pillLabelFilled: {
    color: textColors.heading,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    overflow: "hidden",
    ...shadows.sm,
    elevation: 2,
    marginBottom: 16,
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: palette.status.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    color: textColors.onDark,
    fontSize: 12,
    fontWeight: "600",
  },
  cardContent: {
    padding: 16,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: textColors.secondary,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: palette.brand.primary,
    marginBottom: 12,
  },
  featuresRow: {
    flexDirection: "row",
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    color: textColors.body,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: textColors.secondary,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: backgrounds.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 24,
    ...shadows.lg,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.heading,
    fontFamily: "Marcellus-Regular",
  },
  closeText: {
    color: palette.brand.primary,
    fontWeight: "600",
  },
  optionRow: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: borders.inputOutline,
  },
  optionRowActive: {
    backgroundColor: backgrounds.subtle,
  },
  optionText: {
    fontSize: 14,
    color: textColors.heading,
  },
  optionTextActive: {
    color: palette.brand.primary,
    fontWeight: "700",
  },
  optionCheck: {
    color: palette.brand.primary,
    fontSize: 16,
  },

  // dropdown pill styles
  pillActive: {
    borderColor: palette.brand.primary,
    backgroundColor: backgrounds.subtle,
    ...shadows.sm,
  },

  pillLabelActive: {
    color: palette.brand.primary,
    fontWeight: "700",
  },

  pillDisabled: {
    opacity: 0.5,
    backgroundColor: backgrounds.subtle,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.brand.primary,
  },
});
