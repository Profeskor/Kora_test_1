import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronsUpDown,
  Grid,
  List,
  Building2,
  Maximize2,
  Bed,
  Coins,
} from "lucide-react-native";
import { getProperty } from "../src/api/client";
import { Property, Unit } from "../src/types";
import AppHeader from "../src/components/layout/AppHeader";
import FilterModal from "../src/components/unit/FilterModal";
import SortModal from "../src/components/unit/SortModal";
import UnitCard from "../src/components/unit/UnitCard";
import * as Linking from "expo-linking";

export default function UnitSelectionScreen() {
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "property" | "area" | "bedroom" | "price"
  >("property");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filter state
  const [activeFilters, setActiveFilters] = useState({
    bedrooms: [] as number[],
    priceRange: [500000, 5000000] as [number, number],
    areaRange: [500, 5000] as [number, number],
  });

  // Modal states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  useEffect(() => {
    if (propertyId) {
      loadProperty(propertyId as string);
    }
  }, [propertyId]);

  const loadProperty = async (id: string) => {
    try {
      const data = await getProperty(id);
      setProperty(data);
    } catch (error) {
      console.error("Failed to load property", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  // Apply filters first
  const filteredUnits = useMemo(() => {
    const units = property?.units || [];
    return units.filter((u) => {
      // Search filter
      if (
        searchQuery &&
        !u.label.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Bedroom filter
      if (
        activeFilters.bedrooms.length > 0 &&
        !activeFilters.bedrooms.includes(u.bedrooms)
      ) {
        return false;
      }

      // Price range filter
      if (
        u.price < activeFilters.priceRange[0] ||
        u.price > activeFilters.priceRange[1]
      ) {
        return false;
      }

      // Area range filter
      if (
        u.size < activeFilters.areaRange[0] ||
        u.size > activeFilters.areaRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [property?.units, searchQuery, activeFilters]);

  // Apply sorting
  const sortedUnits = useMemo(() => {
    const sorted = [...filteredUnits].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "property":
          comparison = a.label.localeCompare(b.label);
          break;
        case "area":
          comparison = a.size - b.size;
          break;
        case "bedroom":
          comparison = a.bedrooms - b.bedrooms;
          break;
        case "price":
          comparison = a.price - b.price;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [filteredUnits, sortBy, sortOrder]);

  // multi-select removed

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleApplyFilters = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
  };

  const handleApplySort = (sort: {
    column: typeof sortBy;
    order: typeof sortOrder;
  }) => {
    setSortBy(sort.column);
    setSortOrder(sort.order);
  };

  const handleToggleView = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const handleShowOnMap = async () => {
    if (!property?.location) return;

    try {
      // Encode the location for URL
      const encodedLocation = encodeURIComponent(property.location);
      // Use Google Maps URL scheme that works on both iOS and Android
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
      await Linking.openURL(mapUrl);
    } catch (error) {
      console.error("Failed to open maps", error);
    }
  };

  const renderUnitRow = ({ item }: { item: Unit }) => {
    return (
      <TouchableOpacity
        style={styles.unitRow}
        onPress={() => router.push(`/property/${propertyId}?unitId=${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.unitCell}>
          <Text style={styles.unitProperty}>{item.label}</Text>
        </View>
        <View style={styles.unitCell}>
          <Text style={styles.unitValue}>{item.size.toFixed(2)}</Text>
        </View>
        <View style={styles.unitCell}>
          <Text style={styles.unitValue}>
            {item.bedrooms === 0 ? "Studio" : `${item.bedrooms} BR`}
          </Text>
        </View>
        <View style={styles.unitCell}>
          <Text style={styles.unitValue}>{formatPrice(item.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader title="Select Unit" />
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader title="Select Unit" />
        <View style={styles.center}>
          <Text>Property not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Action Buttons - Filters, Sorting, View */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => setShowFilterModal(true)}
          >
            <SlidersHorizontal size={18} color="#005B78" />
            {/* <SlidersHorizontal size={18} color="#B98A44" /> */}
            <Text style={styles.actionButtonText}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={() => setShowSortModal(true)}
          >
            {/* <ChevronsUpDown size={18} color="#B98A44" /> */}
            <ChevronsUpDown size={18} color="#005B78" />
            <Text style={styles.actionButtonText}>Sorting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.8}
            onPress={handleToggleView}
          >
            {viewMode === "list" ? (
              <Grid size={18} color="#005B78" />
            ) : (
              <List size={18} color="#005B78" />
            )}
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            🇦🇪 {sortedUnits.length} Results
          </Text>
        </View>
      </View>

      {/* Show table header only in list view */}
      {viewMode === "list" && (
        <View style={styles.tableHeader}>
          <TouchableOpacity
            style={styles.headerCell}
            onPress={() => handleSort("property")}
          >
            <Building2 size={16} color="#6B7280" />
            <Text style={styles.headerText}>PROPERTY</Text>
            <ChevronsUpDown size={12} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerCell}
            onPress={() => handleSort("area")}
          >
            <Maximize2 size={16} color="#6B7280" />
            <Text style={styles.headerText}>AREA (SQFT.)</Text>
            <ChevronsUpDown size={12} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerCell}
            onPress={() => handleSort("bedroom")}
          >
            <Bed size={16} color="#6B7280" />
            <Text style={styles.headerText}>BEDROOM</Text>
            <ChevronsUpDown size={12} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerCell}
            onPress={() => handleSort("price")}
          >
            <Coins size={16} color="#6B7280" />
            <Text style={styles.headerText}>PRICE (AED)</Text>
            <ChevronsUpDown size={12} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Render List or Grid View */}
      {viewMode === "list" ? (
        <FlatList
          key="list-view"
          data={sortedUnits}
          keyExtractor={(item) => item.id}
          renderItem={renderUnitRow}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No units found</Text>
            </View>
          }
          scrollEnabled={true}
        />
      ) : (
        <FlatList
          key="grid-view"
          data={sortedUnits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UnitCard
              unit={item}
              onPress={() =>
                router.push(`/property/${propertyId}?unitId=${item.id}`)
              }
            />
          )}
          contentContainerStyle={styles.gridContent}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No units found</Text>
            </View>
          }
          scrollEnabled={true}
        />
      )}

      {/* <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.mapButton}
          activeOpacity={0.9}
          onPress={handleShowOnMap}
        >
          <Text style={styles.mapButtonText}>Show on Map</Text>
        </TouchableOpacity>
      </View> */}

      {/* Modals */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
      <SortModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        onApply={handleApplySort}
        initialSort={{ column: sortBy, order: sortOrder }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  selectMultiple: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#6B7280",
  },
  selectMultipleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  headerCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    minWidth: 0,
  },
  headerText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 0.3,
    flex: 1,
    flexShrink: 1,
  },
  listContent: {
    paddingBottom: 80,
  },
  unitRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  unitRowSelected: {
    backgroundColor: "#F9FAFB",
  },
  unitCell: {
    flex: 1,
    justifyContent: "center",
  },
  unitProperty: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  unitValue: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingBottom: 20,
  },
  mapButton: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backLink: {
    color: "#005B78",
    marginTop: 10,
    fontWeight: "600",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
  },
  gridContent: {
    paddingBottom: 80,
    paddingHorizontal: 0,
  },
  gridRow: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
