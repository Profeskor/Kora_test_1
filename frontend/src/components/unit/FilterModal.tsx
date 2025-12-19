import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { X } from "lucide-react-native";

interface FilterOptions {
  bedrooms: number[];
  priceRange: [number, number];
  areaRange: [number, number];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];
const MIN_PRICE = 500000;
const MAX_PRICE = 5000000;
const MIN_AREA = 500;
const MAX_AREA = 5000;

export default function FilterModal({
  visible,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>(
    initialFilters?.bedrooms || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [MIN_PRICE, MAX_PRICE]
  );
  const [areaRange, setAreaRange] = useState<[number, number]>(
    initialFilters?.areaRange || [MIN_AREA, MAX_AREA]
  );

  useEffect(() => {
    if (initialFilters) {
      setSelectedBedrooms(initialFilters.bedrooms);
      setPriceRange(initialFilters.priceRange);
      setAreaRange(initialFilters.areaRange);
    }
  }, [initialFilters, visible]);

  const handleBedroomToggle = (bedroom: number) => {
    setSelectedBedrooms((prev) =>
      prev.includes(bedroom)
        ? prev.filter((b) => b !== bedroom)
        : [...prev, bedroom].sort()
    );
  };

  const handleApply = () => {
    onApply({
      bedrooms: selectedBedrooms,
      priceRange,
      areaRange,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedBedrooms([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setAreaRange([MIN_AREA, MAX_AREA]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Bedrooms Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Bedrooms</Text>
            <View style={styles.bedroomGrid}>
              {BEDROOM_OPTIONS.map((br) => (
                <TouchableOpacity
                  key={br}
                  style={[
                    styles.bedroomButton,
                    selectedBedrooms.includes(br) && styles.bedroomButtonActive,
                  ]}
                  onPress={() => handleBedroomToggle(br)}
                >
                  <Text
                    style={[
                      styles.bedroomButtonText,
                      selectedBedrooms.includes(br) &&
                        styles.bedroomButtonTextActive,
                    ]}
                  >
                    {br} BR
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Price Range (AED)</Text>
            <View style={styles.rangeInputRow}>
              <TextInput
                style={styles.rangeInput}
                placeholder="Min"
                placeholderTextColor="#9CA3AF"
                value={Math.floor(priceRange[0] / 1000000).toString()}
                onChangeText={(value) => {
                  const numValue = parseInt(value) || 0;
                  setPriceRange([numValue * 1000000, priceRange[1]]);
                }}
                keyboardType="decimal-pad"
              />
              <Text style={styles.rangeLabel}>to</Text>
              <TextInput
                style={styles.rangeInput}
                placeholder="Max"
                placeholderTextColor="#9CA3AF"
                value={Math.floor(priceRange[1] / 1000000).toString()}
                onChangeText={(value) => {
                  const numValue = parseInt(value) || 0;
                  setPriceRange([priceRange[0], numValue * 1000000]);
                }}
                keyboardType="decimal-pad"
              />
              <Text style={styles.rangeUnit}>M</Text>
            </View>
          </View>

          {/* Area Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Area (SQFT)</Text>
            <View style={styles.rangeInputRow}>
              <TextInput
                style={styles.rangeInput}
                placeholder="Min"
                placeholderTextColor="#9CA3AF"
                value={Math.floor(areaRange[0]).toString()}
                onChangeText={(value) => {
                  const numValue = parseInt(value) || 0;
                  setAreaRange([numValue, areaRange[1]]);
                }}
                keyboardType="numeric"
              />
              <Text style={styles.rangeLabel}>to</Text>
              <TextInput
                style={styles.rangeInput}
                placeholder="Max"
                placeholderTextColor="#9CA3AF"
                value={Math.floor(areaRange[1]).toString()}
                onChangeText={(value) => {
                  const numValue = parseInt(value) || 0;
                  setAreaRange([areaRange[0], numValue]);
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.7}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  filterSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  bedroomGrid: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  bedroomButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    minWidth: "22%",
    alignItems: "center",
  },
  bedroomButtonActive: {
    backgroundColor: "#005B78",
    borderColor: "#005B78",
  },
  bedroomButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  bedroomButtonTextActive: {
    color: "#FFFFFF",
  },
  rangeValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rangeValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#005B78",
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 16,
  },
  rangeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  rangeInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    fontSize: 13,
    color: "#111827",
  },
  rangeLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  rangeUnit: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    minWidth: 24,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  resetButton: {
    flex: 0.3,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  applyButton: {
    flex: 0.7,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#005B78",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
