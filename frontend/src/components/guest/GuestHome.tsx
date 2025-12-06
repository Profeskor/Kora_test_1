
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface GuestHomeProps {
  userName?: string;
}

interface Banner {
  id: number;
  type: "launch" | "offer" | "event";
  title: string;
  description: string;
  image: string;
  cta: string;
}

export default function GuestHome({ userName = "Guest" }: GuestHomeProps) {
  const router = useRouter();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const banners: Banner[] = [
    {
      id: 1,
      type: "launch",
      title: "New Launch: Marina Heights",
      description: "Luxury waterfront living with 8% guaranteed ROI",
      image: "https://images.unsplash.com/photo-1657383543451-e47d1589195d?w=1080",
      cta: "View Details",
    },
    {
      id: 2,
      type: "offer",
      title: "Exclusive Dubai Maritime",
      description: "Premium apartments with private beach access",
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?w=1080",
      cta: "Explore Now",
    },
    {
      id: 3,
      type: "event",
      title: "Virtual Property Tours",
      description: "Experience properties from anywhere in the world",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1080",
      cta: "Book Tour",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Welcome */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.subText}>Explore our exclusive property collection</Text>
      </View>

      {/* Banner Carousel */}
      <View style={styles.carouselContainer}>
        <View style={styles.bannerCard}>
          <Image
            source={{ uri: banners[currentBannerIndex].image }}
            style={styles.bannerImage}
            contentFit="cover"
          />
          <View style={styles.overlay} />
          
          <View style={styles.bannerContent}>
            <View style={[styles.badge, { 
                backgroundColor: banners[currentBannerIndex].type === 'launch' ? '#22C55E' : 
                               banners[currentBannerIndex].type === 'offer' ? '#F97316' : '#3B82F6'
            }]}>
                <Text style={styles.badgeText}>{banners[currentBannerIndex].type}</Text>
            </View>
            <Text style={styles.bannerTitle}>{banners[currentBannerIndex].title}</Text>
            <Text style={styles.bannerDesc}>{banners[currentBannerIndex].description}</Text>
            <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>{banners[currentBannerIndex].cta}</Text>
            </TouchableOpacity>
          </View>

          {/* Controls */}
          <TouchableOpacity onPress={prevBanner} style={[styles.arrowButton, { left: 12 }]}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextBanner} style={[styles.arrowButton, { right: 12 }]}>
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>

          {/* Dots */}
          <View style={styles.dotsContainer}>
            {banners.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentBannerIndex && styles.dotActive
                    ]}
                />
            ))}
          </View>
        </View>
      </View>

      {/* Sign Up Prompt */}
      <View style={styles.promptCard}>
        <Text style={styles.promptTitle}>Get More with an Account</Text>
        <Text style={styles.promptText}>
            Sign in to save your favorite properties, schedule site visits, and access exclusive broker tools.
        </Text>
        <View style={styles.buttonRow}>
            <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push('/(auth)/login')}
            >
                <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push('/(auth)/login')} // Should ideally go to register
            >
                <Text style={styles.secondaryButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005B78',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
  },
  carouselContainer: {
    marginBottom: 24,
  },
  bannerCard: {
    height: 400,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#005B78',
    fontWeight: '600',
    fontSize: 14,
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 24,
    backgroundColor: 'white',
  },
  promptCard: {
    backgroundColor: '#E0F2FE', // Light blue
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,91,120,0.1)',
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005B78',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#005B78',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,91,120,0.2)',
  },
  secondaryButtonText: {
    color: '#005B78',
    fontWeight: '600',
    fontSize: 14,
  },
});
