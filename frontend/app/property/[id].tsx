
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Maximize2, 
  Bath, 
  Calendar, 
  CheckCircle, 
  Share2, 
  Heart 
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProperty } from '../../src/api/client';
import { Property } from '../../src/types';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadProperty(id as string);
    }
  }, [id]);

  const loadProperty = async (propertyId: string) => {
    try {
      const data = await getProperty(propertyId);
      setProperty(data);
    } catch (error) {
      console.error('Failed to load property details', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005B78" />
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Property not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#005B78', marginTop: 10 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        {/* Image Header */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.overlay} />
          
          {/* Header Actions */}
          <SafeAreaView style={styles.headerActions} edges={['top']}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  size={24} 
                  color={isFavorite ? "#EF4444" : "white"} 
                  fill={isFavorite ? "#EF4444" : "transparent"} 
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Share2 size={24} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.imageContent}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{property.status}</Text>
            </View>
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.locationText}>{property.location}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(property.price)}</Text>
          </View>

          {/* Key Features */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Bed size={20} color="#4B5563" />
              <Text style={styles.featureValue}>{property.bedrooms} Beds</Text>
            </View>
            <View style={styles.featureItem}>
              <Bath size={20} color="#4B5563" />
              <Text style={styles.featureValue}>{property.bathrooms} Baths</Text>
            </View>
            <View style={styles.featureItem}>
              <Maximize2 size={20} color="#4B5563" />
              <Text style={styles.featureValue}>{property.size.toLocaleString()} sqft</Text>
            </View>
            <View style={styles.featureItem}>
              <Calendar size={20} color="#4B5563" />
              <Text style={styles.featureValue}>{property.handoverDate || 'Ready'}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <CheckCircle size={16} color="#005B78" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
        <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => console.log('Add to Leads')}
        >
            <Text style={styles.secondaryButtonText}>Add to Lead</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => console.log('Book Now')}
        >
            <Text style={styles.primaryButtonText}>Book Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 10,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  statusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#6B7280',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005B78',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  featureItem: {
    alignItems: 'center',
    gap: 8,
  },
  featureValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#005B78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#005B78',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#005B78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
