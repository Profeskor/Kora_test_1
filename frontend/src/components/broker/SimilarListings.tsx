import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { MapPin, Bed, Bath, Maximize2 } from "lucide-react-native";
import { Property } from "../../types";
import { getProperties } from "../../api/client";

interface SimilarListingsProps {
  currentPropertyId: string;
  onPropertyPress?: (propertyId: string) => void;
}

export default function SimilarListings({
  currentPropertyId,
  onPropertyPress,
}: SimilarListingsProps) {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadSimilarProperties();
  }, [currentPropertyId]);

  const loadSimilarProperties = async () => {
    try {
      const allProperties = await getProperties();
      // Filter out current property and show others
      const similar = allProperties.filter((p) => p.id !== currentPropertyId);
      setProperties(similar.slice(0, 6)); // Show up to 6 similar properties
    } catch (error) {
      console.error("Failed to load similar properties", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  const renderProperty = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() => onPropertyPress?.(item.id)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={styles.propertyImage}
        contentFit="cover"
      />
      <View style={styles.propertyContent}>
        <Text style={styles.propertyName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.locationRow}>
          <MapPin size={12} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.featuresRow}>
          <View style={styles.feature}>
            <Bed size={12} color="#6B7280" />
            <Text style={styles.featureText}>{item.bedrooms}</Text>
          </View>
          <View style={styles.feature}>
            <Bath size={12} color="#6B7280" />
            <Text style={styles.featureText}>{item.bathrooms}</Text>
          </View>
          <View style={styles.feature}>
            <Maximize2 size={12} color="#6B7280" />
            <Text style={styles.featureText}>
              {item.size.toLocaleString()} sqft
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading || properties.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Similar Listings</Text>
      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  listContent: {
    paddingRight: 24,
    gap: 12,
  },
  propertyCard: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  propertyImage: {
    width: "100%",
    height: 180,
  },
  propertyContent: {
    padding: 14,
    gap: 6,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#6B7280",
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#005B78",
    marginTop: 4,
  },
  featuresRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: "#6B7280",
  },
});
