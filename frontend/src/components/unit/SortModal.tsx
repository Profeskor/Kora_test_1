import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X, Check } from "lucide-react-native";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  interactive,
} from "../../constants/colors";

interface SortOption {
  column: "property" | "area" | "bedroom" | "price";
  order: "asc" | "desc";
}

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (sortOption: SortOption) => void;
  initialSort?: SortOption;
}

const SORT_OPTIONS = [
  { column: "property" as const, label: "Property Name" },
  { column: "area" as const, label: "Area (SQFT)" },
  { column: "bedroom" as const, label: "Bedrooms" },
  { column: "price" as const, label: "Price (AED)" },
];

export default function SortModal({
  visible,
  onClose,
  onApply,
  initialSort,
}: SortModalProps) {
  const [selectedColumn, setSelectedColumn] = useState<
    "property" | "area" | "bedroom" | "price"
  >(initialSort?.column || "property");
  const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc">(
    initialSort?.order || "asc"
  );

  useEffect(() => {
    if (initialSort) {
      setSelectedColumn(initialSort.column);
      setSelectedOrder(initialSort.order);
    }
  }, [initialSort, visible]);

  const handleApply = () => {
    onApply({
      column: selectedColumn,
      order: selectedOrder,
    });
    onClose();
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
          <Text style={styles.headerTitle}>Sort By</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={textColors.heading} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Sort Columns */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort Field</Text>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.column}
                style={[
                  styles.optionRow,
                  selectedColumn === option.column && styles.optionRowActive,
                ]}
                onPress={() => setSelectedColumn(option.column)}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    selectedColumn === option.column &&
                      styles.optionLabelActive,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedColumn === option.column && (
                  <Check size={20} color={palette.brand.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Sort Order */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order</Text>
            <TouchableOpacity
              style={[
                styles.optionRow,
                selectedOrder === "asc" && styles.optionRowActive,
              ]}
              onPress={() => setSelectedOrder("asc")}
            >
              <Text
                style={[
                  styles.optionLabel,
                  selectedOrder === "asc" && styles.optionLabelActive,
                ]}
              >
                Low to High
              </Text>
              {selectedOrder === "asc" && (
                <Check size={20} color={palette.brand.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionRow,
                selectedOrder === "desc" && styles.optionRowActive,
              ]}
              onPress={() => setSelectedOrder("desc")}
            >
              <Text
                style={[
                  styles.optionLabel,
                  selectedOrder === "desc" && styles.optionLabelActive,
                ]}
              >
                High to Low
              </Text>
              {selectedOrder === "desc" && (
                <Check size={20} color={palette.brand.primary} />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.7}
          >
            <Text style={styles.applyButtonText}>Apply Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.screenLight,
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
    borderBottomColor: borders.default,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: textColors.heading,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: backgrounds.subtle,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: borders.default,
  },
  optionRowActive: {
    backgroundColor: backgrounds.subtle,
    borderColor: palette.brand.primary,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: textColors.body,
  },
  optionLabelActive: {
    color: palette.brand.primary,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: borders.default,
  },
  applyButton: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: interactive.primaryBg,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: interactive.primaryText,
  },
});
