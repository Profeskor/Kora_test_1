import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "../../constants/colors";
import { spacing, borderRadius, shadows } from "../../constants/designSystem";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ============================================================================
// TYPES
// ============================================================================

/** Property occupancy status */
export type PropertyOccupancyStatus =
  | "occupied"
  | "vacant"
  | "under_construction"
  | "pending";

/** Owned property data structure */
export interface OwnedProperty {
  id: string;
  name: string;
  unitNumber: string;
  unitType: string; // e.g., "2 Bed Apartment", "3 Bed Villa"
  status: PropertyOccupancyStatus;
  image?: string;
  /** Flag to identify mock/placeholder data - not shown in UI */
  _isMockData?: boolean;
}

export interface MyPropertiesCardProps {
  /** Array of owned properties */
  properties?: OwnedProperty[];
  /** Maximum properties to show in collapsed state (default: 2) */
  collapsedLimit?: number;
  /** Callback when a property row is pressed */
  onPropertyPress?: (property: OwnedProperty) => void;
  /** Callback when expand/collapse is toggled */
  onExpandToggle?: (expanded: boolean) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_COLLAPSED_LIMIT = 2;

/** Status configuration - extensible for future states */
const STATUS_CONFIG: Record<
  PropertyOccupancyStatus,
  { label: string; color: string }
> = {
  occupied: {
    label: "OCCUPIED",
    color: palette.status.success,
  },
  vacant: {
    label: "VACANT",
    color: palette.brand.secondary,
  },
  under_construction: {
    label: "UNDER CONSTRUCTION",
    color: palette.status.warning,
  },
  pending: {
    label: "PENDING",
    color: palette.status.info,
  },
};

/** Default placeholder images for properties */
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&h=200&fit=crop",
];

// ============================================================================
// MOCK DATA GENERATOR
// ============================================================================

/**
 * Generate mock properties for development/preview
 * This data follows the real property structure and can be easily replaced
 */
const generateMockProperties = (): OwnedProperty[] => [
  {
    id: "mock-prop-1",
    name: "Marina Heights",
    unitNumber: "Unit 1205",
    unitType: "2 Bed Apartment",
    status: "occupied",
    image: PLACEHOLDER_IMAGES[0],
    _isMockData: true,
  },
  {
    id: "mock-prop-2",
    name: "Il Vento Residences",
    unitNumber: "Unit 804",
    unitType: "3 Bed Villa",
    status: "vacant",
    image: PLACEHOLDER_IMAGES[1],
    _isMockData: true,
  },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface PropertyRowProps {
  property: OwnedProperty;
  onPress: () => void;
  isLast: boolean;
}

const PropertyRow: React.FC<PropertyRowProps> = ({
  property,
  onPress,
  isLast,
}) => {
  const statusConfig = STATUS_CONFIG[property.status] || STATUS_CONFIG.vacant;

  return (
    <TouchableOpacity
      style={[styles.propertyRow, !isLast && styles.propertyRowBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Property Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {property.image ? (
          <Image
            source={{ uri: property.image }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
        )}
      </View>

      {/* Property Info */}
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyName} numberOfLines={1}>
          {property.name}
        </Text>
        <Text style={styles.propertyMeta} numberOfLines={1}>
          {property.unitNumber} • {property.unitType}
        </Text>
        <View style={styles.statusContainer}>
          <View
            style={[styles.statusDot, { backgroundColor: statusConfig.color }]}
          />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Navigation Arrow */}
      <ChevronRight size={20} color={palette.brand.secondary} />
    </TouchableOpacity>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MyPropertiesCard({
  properties: providedProperties,
  collapsedLimit = DEFAULT_COLLAPSED_LIMIT,
  onPropertyPress,
  onExpandToggle,
}: MyPropertiesCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Use provided properties or generate mock data
  const properties = useMemo(() => {
    if (providedProperties && providedProperties.length > 0) {
      return providedProperties;
    }
    // Generate mock data when no properties provided
    return generateMockProperties();
  }, [providedProperties]);

  // Calculate display properties based on expand state
  const displayedProperties = useMemo(() => {
    if (isExpanded || properties.length <= collapsedLimit) {
      return properties;
    }
    return properties.slice(0, collapsedLimit);
  }, [properties, isExpanded, collapsedLimit]);

  // Determine if expand button should be shown
  const showExpandButton = properties.length > collapsedLimit;

  // Property count for badge
  const propertyCount = properties.length;

  const handlePropertyPress = useCallback(
    (property: OwnedProperty) => {
      if (onPropertyPress) {
        onPropertyPress(property);
      } else {
        // Default navigation to property detail
        router.push(`/my-properties`);
      }
    },
    [onPropertyPress, router]
  );

  const handleExpandToggle = useCallback(() => {
    // Animate the layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    if (onExpandToggle) {
      onExpandToggle(newExpanded);
    }
  }, [isExpanded, onExpandToggle]);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Properties</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{propertyCount} Owned</Text>
        </View>
      </View>

      {/* Property List */}
      <View style={styles.propertyList}>
        {displayedProperties.map((property, index) => (
          <PropertyRow
            key={property.id}
            property={property}
            onPress={() => handlePropertyPress(property)}
            isLast={
              index === displayedProperties.length - 1 && !showExpandButton
            }
          />
        ))}
      </View>

      {/* Expand/Collapse Button */}
      {showExpandButton && (
        <TouchableOpacity
          style={styles.expandButton}
          onPress={handleExpandToggle}
          activeOpacity={0.7}
        >
          <Text style={styles.expandButtonText}>
            {isExpanded ? "Collapse View" : "Expand View"}
          </Text>
          {isExpanded ? (
            <ChevronUp size={18} color={palette.brand.secondary} />
          ) : (
            <ChevronDown size={18} color={palette.brand.secondary} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: 20,
    marginHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    ...shadows.sm,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: textColors.heading,
  },
  badge: {
    backgroundColor: backgrounds.subtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.md,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.brand.secondary,
  },

  // Property List
  propertyList: {
    paddingHorizontal: spacing.lg,
  },

  // Property Row
  propertyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  propertyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },

  // Thumbnail
  thumbnailContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailPlaceholder: {
    backgroundColor: backgrounds.subtle,
  },

  // Property Info
  propertyInfo: {
    flex: 1,
    gap: 2,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.heading,
  },
  propertyMeta: {
    fontSize: 13,
    color: textColors.secondary,
    marginTop: 2,
  },

  // Status
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Expand Button
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: borders.default,
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.brand.secondary,
  },
});
