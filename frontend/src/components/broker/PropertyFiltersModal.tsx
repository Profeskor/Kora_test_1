import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { X, ChevronDown } from "lucide-react-native";
import { Property } from "../../types";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

export interface FilterState {
  priceRange: [number, number];
  bedrooms: number[];
  propertyTypes: string[];
  status: string[];
  sizeRange: [number, number];
  handoverDate: string[];
}

interface PropertyFiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  properties: Property[];
  currentFilters: FilterState;
}

const PRICE_RANGES = [
  { label: "Under 1M", value: [0, 1000000] },
  { label: "1M - 3M", value: [1000000, 3000000] },
  { label: "3M - 5M", value: [3000000, 5000000] },
  { label: "Above 5M", value: [5000000, Infinity] },
];

const BEDROOM_OPTIONS = [
  { label: "Studio", value: 0 },
  { label: "1 BR", value: 1 },
  { label: "2 BR", value: 2 },
  { label: "3 BR", value: 3 },
  { label: "4 BR", value: 4 },
  { label: "5+ BR", value: 5 },
];

const SIZE_RANGES = [
  { label: "Under 1000 sq ft", value: [0, 1000] },
  { label: "1000 - 2000 sq ft", value: [1000, 2000] },
  { label: "2000 - 3000 sq ft", value: [2000, 3000] },
  { label: "Above 3000 sq ft", value: [3000, Infinity] },
];

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Loft",
  "Studio",
];

const HANDOVER_DATES = ["Ready", "2024", "2025", "2026", "2027", "2028"];

export default function PropertyFiltersModal({
  visible,
  onClose,
  onApply,
  properties,
  currentFilters,
}: PropertyFiltersModalProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, visible]);

  const handleReset = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, Infinity],
      bedrooms: [],
      propertyTypes: [],
      status: [],
      sizeRange: [0, Infinity],
      handoverDate: [],
    };
    setFilters(defaultFilters);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const toggleBedroom = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      bedrooms: prev.bedrooms.includes(value)
        ? prev.bedrooms.filter((b) => b !== value)
        : [...prev.bedrooms, value],
    }));
  };

  const togglePropertyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const toggleStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const toggleHandoverDate = (date: string) => {
    setFilters((prev) => ({
      ...prev,
      handoverDate: prev.handoverDate.includes(date)
        ? prev.handoverDate.filter((d) => d !== date)
        : [...prev.handoverDate, date],
    }));
  };

  const setPriceRange = (range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: range,
    }));
  };

  const setSizeRange = (range: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      sizeRange: range,
    }));
  };

  const activeFilterCount = [
    filters.bedrooms.length,
    filters.propertyTypes.length,
    filters.status.length,
    filters.handoverDate.length,
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== Infinity ? 1 : 0,
    filters.sizeRange[0] !== 0 || filters.sizeRange[1] !== Infinity ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSection === id;
    return (
      <View>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(isExpanded ? null : id)}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionTitle}>{title}</Text>
          <ChevronDown
            size={20}
            color={textColors.secondary}
            style={{
              transform: [{ rotate: isExpanded ? "180deg" : "0deg" }],
            }}
          />
        </TouchableOpacity>
        {isExpanded && <View style={styles.sectionContent}>{children}</View>}
      </View>
    );
  };

  const OptionChip = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Filters</Text>
            {activeFilterCount > 0 && (
              <Text style={styles.activeCount}>
                {activeFilterCount} active filter
                {activeFilterCount !== 1 ? "s" : ""}
              </Text>
            )}
          </View>
          <View style={styles.headerActions}>
            {activeFilterCount > 0 && (
              <TouchableOpacity
                onPress={handleReset}
                activeOpacity={0.7}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Clear all</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <X size={24} color={textColors.heading} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Sections */}
        <ScrollView style={styles.content}>
          {/* Price Range */}
          <FilterSection title="Price Range (AED)" id="price">
            <View style={styles.chipGroup}>
              {PRICE_RANGES.map((range) => (
                <OptionChip
                  key={range.label}
                  label={range.label}
                  selected={
                    filters.priceRange[0] === range.value[0] &&
                    filters.priceRange[1] === range.value[1]
                  }
                  onPress={() => setPriceRange(range.value as [number, number])}
                />
              ))}
            </View>
          </FilterSection>

          {/* Bedrooms */}
          <FilterSection title="Bedrooms" id="bedrooms">
            <View style={styles.chipGroup}>
              {BEDROOM_OPTIONS.map((option) => (
                <OptionChip
                  key={option.value}
                  label={option.label}
                  selected={filters.bedrooms.includes(option.value)}
                  onPress={() => toggleBedroom(option.value)}
                />
              ))}
            </View>
          </FilterSection>

          {/* Size Range */}
          <FilterSection title="Size (sq ft)" id="size">
            <View style={styles.chipGroup}>
              {SIZE_RANGES.map((range) => (
                <OptionChip
                  key={range.label}
                  label={range.label}
                  selected={
                    filters.sizeRange[0] === range.value[0] &&
                    filters.sizeRange[1] === range.value[1]
                  }
                  onPress={() => setSizeRange(range.value as [number, number])}
                />
              ))}
            </View>
          </FilterSection>

          {/* Property Type */}
          <FilterSection title="Property Type" id="type">
            <View style={styles.chipGroup}>
              {PROPERTY_TYPES.map((type) => (
                <OptionChip
                  key={type}
                  label={type}
                  selected={filters.propertyTypes.includes(type)}
                  onPress={() => togglePropertyType(type)}
                />
              ))}
            </View>
          </FilterSection>

          {/* Handover Date */}
          <FilterSection title="Project Status" id="handover">
            <View style={styles.chipGroup}>
              {HANDOVER_DATES.map((date) => (
                <OptionChip
                  key={date}
                  label={date}
                  selected={filters.handoverDate.includes(date)}
                  onPress={() => toggleHandoverDate(date)}
                />
              ))}
            </View>
          </FilterSection>

          {/* Status - Available/Sold */}
          <FilterSection title="Availability" id="status">
            <View style={styles.chipGroup}>
              {["Available", "Sold"].map((status) => (
                <OptionChip
                  key={status}
                  label={status}
                  selected={filters.status.includes(status)}
                  onPress={() => toggleStatus(status)}
                />
              ))}
            </View>
          </FilterSection>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.resetButtonLarge}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonLargeText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.7}
          >
            <Text style={styles.applyButtonText}>
              Show{" "}
              {
                properties.filter((p) => {
                  const matchesPrice =
                    p.price >= filters.priceRange[0] &&
                    p.price <= filters.priceRange[1];
                  const matchesBedrooms =
                    filters.bedrooms.length === 0 ||
                    filters.bedrooms.includes(p.bedrooms);
                  const matchesType =
                    filters.propertyTypes.length === 0 ||
                    filters.propertyTypes.includes(p.type);
                  const matchesSize =
                    p.size >= filters.sizeRange[0] &&
                    p.size <= filters.sizeRange[1];
                  const matchesStatus =
                    filters.status.length === 0 ||
                    filters.status.includes(p.status);
                  const handoverYear = p.handoverDate?.match(/\d{4}/)?.[0];
                  const matchesHandover =
                    filters.handoverDate.length === 0 ||
                    filters.handoverDate.some(
                      (d) =>
                        d === "Ready" ||
                        (handoverYear && d === handoverYear) ||
                        (d === "Ready" && p.handoverDate === "Ready")
                    );

                  return (
                    matchesPrice &&
                    matchesBedrooms &&
                    matchesType &&
                    matchesSize &&
                    matchesStatus &&
                    matchesHandover
                  );
                }).length
              }{" "}
              Results
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
    backgroundColor: backgrounds.card,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: textColors.heading,
  },
  activeCount: {
    fontSize: 12,
    color: textColors.secondary,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    fontSize: 14,
    color: palette.brand.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.heading,
  },
  sectionContent: {
    paddingVertical: 16,
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: backgrounds.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: borders.default,
  },
  chipSelected: {
    backgroundColor: palette.brand.primary,
    borderColor: palette.brand.primary,
  },
  chipText: {
    fontSize: 13,
    color: textColors.secondary,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: textColors.onDark,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 28,
    backgroundColor: backgrounds.card,
    borderTopWidth: 1,
    borderTopColor: borders.default,
  },
  resetButtonLarge: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: backgrounds.card,
    borderWidth: 1.5,
    borderColor: borders.default,
    alignItems: "center",
  },
  resetButtonLargeText: {
    fontSize: 15,
    fontWeight: "600",
    color: textColors.secondary,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: textColors.onDark,
  },
});
