import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Bed, Maximize2, DollarSign } from "lucide-react-native";
import { Unit } from "../../types";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

// Default fallback images for units based on bedroom count
const DEFAULT_UNIT_IMAGES = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", // Studio
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", // 1BR
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", // 2BR
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", // 3BR+
];

interface UnitCardProps {
  unit: Unit;
  onPress: () => void;
}

export default function UnitCard({ unit, onPress }: UnitCardProps) {
  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  // Get image: use unit's image if available, otherwise use fallback based on bedrooms
  const getUnitImage = () => {
    if (unit.image) return unit.image;
    const index = Math.min(unit.bedrooms, DEFAULT_UNIT_IMAGES.length - 1);
    return DEFAULT_UNIT_IMAGES[index];
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getUnitImage() }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Unit Label */}
        <Text style={styles.unitLabel} numberOfLines={1}>
          {unit.label}
        </Text>

        {/* Specs Grid */}
        <View style={styles.specsGrid}>
          {/* Bedrooms */}
          <View style={styles.specItem}>
            <Bed size={14} color={textColors.secondary} />
            <Text style={styles.specValue}>
              {unit.bedrooms === 0 ? "Studio" : unit.bedrooms}
            </Text>
          </View>

          {/* Area */}
          <View style={styles.specItem}>
            <Maximize2 size={14} color={textColors.secondary} />
            <Text style={styles.specValue}>{unit.size.toFixed(0)}</Text>
          </View>

          {/* Price */}
          <View style={styles.specItem}>
            <DollarSign size={14} color={textColors.secondary} />
            <Text style={styles.specValue}>{formatPrice(unit.price)}</Text>
          </View>
        </View>

        {/* Radio Button */}
        <View style={styles.radioContainer}>
          <View style={styles.radioButton} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: borders.default,
    flex: 1,
    margin: 8,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: backgrounds.subtle,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: borders.default,
  },
  placeholderText: {
    color: textColors.secondary,
    fontSize: 12,
    fontWeight: "500",
  },
  content: {
    padding: 12,
  },
  unitLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 8,
  },
  specsGrid: {
    gap: 6,
    marginBottom: 10,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  specValue: {
    fontSize: 12,
    color: textColors.body,
    fontWeight: "500",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: backgrounds.subtle,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: borders.default,
  },
});
