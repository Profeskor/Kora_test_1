
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Search, Users, ClipboardList, UserPlus, ChevronRight, Scale } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Banner {
  id: number;
  type: "launch" | "offer" | "event";
  title: string;
  description: string;
  image: string;
  cta: string;
}

export default function BrokerHome({ userName }: { userName: string }) {
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
      title: "Special Broker Incentive",
      description: "Extra 2% commission on Bay East units this month",
      image: "https://images.unsplash.com/photo-1594873604892-b599f847e859?w=1080",
      cta: "Learn More",
    },
    {
      id: 3,
      type: "event",
      title: "Broker Open House",
      description: "Exclusive preview of Sky Gardens - Dec 15th",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1080",
      cta: "Register Now",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.content}>
       <Text style={styles.welcome}>Welcome, {userName.split(' ')[0]}</Text>

      {/* Banners */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: banners[currentBannerIndex].image }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
          <View style={styles.bannerTag}>
            <Text style={styles.bannerTagText}>{banners[currentBannerIndex].type}</Text>
          </View>
          <Text style={styles.bannerTitle}>{banners[currentBannerIndex].title}</Text>
          <Text style={styles.bannerDesc}>{banners[currentBannerIndex].description}</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>{banners[currentBannerIndex].cta}</Text>
          </TouchableOpacity>
        </View>
        
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

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(main)/properties')}>
            <View style={styles.iconCircle}>
              <Search size={24} color="#005B78" />
            </View>
            <Text style={styles.actionText}>Search Properties</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/leads/create')}>
            <View style={styles.iconCircle}>
              <UserPlus size={24} color="#005B78" />
            </View>
            <Text style={styles.actionText}>Create Lead</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(main)/leads')}>
            <View style={styles.iconCircle}>
              <Users size={24} color="#005B78" />
            </View>
            <Text style={styles.actionText}>My Leads</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(main)/bookings')}>
            <View style={styles.iconCircle}>
              <ClipboardList size={24} color="#005B78" />
            </View>
            <Text style={styles.actionText}>My Bookings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Leads Widget */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <View style={styles.miniIcon}>
              <Users size={16} color="#005B78" />
            </View>
            <Text style={styles.cardTitle}>My Leads</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(main)/leads')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.viewAll}>View All</Text>
                <ChevronRight size={12} color="#005B78" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
                <Text style={[styles.statLabel, { color: '#005B78' }]}>New</Text>
                <Text style={[styles.statValue, { color: '#005B78' }]}>5</Text>
            </View>
             <View style={[styles.statBox, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
                <Text style={[styles.statLabel, { color: '#B45309' }]}>Ongoing</Text>
                <Text style={[styles.statValue, { color: '#78350F' }]}>12</Text>
            </View>
             <View style={[styles.statBox, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
                <Text style={[styles.statLabel, { color: '#15803D' }]}>Booked</Text>
                <Text style={[styles.statValue, { color: '#14532D' }]}>3</Text>
            </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  bannerContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  bannerTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#005B78',
    fontSize: 12,
    fontWeight: '600',
  },
  dotsContainer: {
      position: 'absolute',
      bottom: 8,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 4,
  },
  dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
      width: 16,
      backgroundColor: 'white',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#005B78',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 44) / 2, // padding 16*2 + gap 12
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#005B78',
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E6F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#005B78',
    fontSize: 14,
    fontWeight: '600',
  },
  viewAll: {
    color: '#005B78',
    fontSize: 12,
    marginRight: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
