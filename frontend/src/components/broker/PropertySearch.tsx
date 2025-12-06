
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { Search, SlidersHorizontal, MapPin, Bed, Maximize2, ArrowLeft } from 'lucide-react-native';
import { getProperties } from '../../api/client';
import { Property } from '../../types';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PropertySearch() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error('Failed to load properties', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/property/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Bed size={16} color="#4B5563" />
            <Text style={styles.featureText}>{item.bedrooms} BR</Text>
          </View>
          <View style={styles.featureItem}>
            <Maximize2 size={16} color="#4B5563" />
            <Text style={styles.featureText}>{item.size.toLocaleString()} sq ft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
            <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search by project, location..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
        <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#005B78" />
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.center}>
                <Text style={styles.emptyText}>No properties found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.9)', // Green
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005B78',
    marginBottom: 12,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
