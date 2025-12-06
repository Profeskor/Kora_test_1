
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Search, Heart, Calendar, MapPin, TrendingUp, Building2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface BuyerHomeProps {
  userName: string;
}

export default function BuyerHome({ userName }: BuyerHomeProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.subText}>Find your dream property</Text>
      </View>

      {/* Featured Banner */}
      <LinearGradient
        colors={['#005B78', '#003F54']}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.bannerContent}>
          <View style={styles.bannerHeader}>
            <Building2 size={32} color="white" style={{ marginRight: 12 }} />
            <View>
              <Text style={styles.bannerTitle}>New Launch: Marina Heights</Text>
              <Text style={styles.bannerSub}>Luxury waterfront living from AED 1.2M</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
            <Search size={24} color="#2563EB" />
          </View>
          <Text style={styles.cardText}>Explore Properties</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#FEE2E2' }]}>
            <Heart size={24} color="#DC2626" />
          </View>
          <Text style={styles.cardText}>My Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
            <Calendar size={24} color="#16A34A" />
          </View>
          <Text style={styles.cardText}>My Visits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
            <MapPin size={24} color="#9333EA" />
          </View>
          <Text style={styles.cardText}>Nearby</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.tagsContainer}>
          {['1 BHK', '2 BHK', '3 BHK', 'Downtown', 'Marina', 'Under 1M'].map((tag) => (
            <TouchableOpacity key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* My Requests */}
      <View style={styles.requestSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Requests</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.requestCard}>
          <View style={[styles.requestIcon, { backgroundColor: '#FFEDD5' }]}>
            <Calendar size={20} color="#EA580C" />
          </View>
          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>Site Visit Request</Text>
            <Text style={styles.requestSub}>Marina Heights - Pending</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FFEDD5' }]}>
            <Text style={[styles.badgeText, { color: '#C2410C' }]}>Pending</Text>
          </View>
        </View>

        <View style={styles.requestCard}>
          <View style={[styles.requestIcon, { backgroundColor: '#DBEAFE' }]}>
            <TrendingUp size={20} color="#2563EB" />
          </View>
          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>Interest Expressed</Text>
            <Text style={styles.requestSub}>Palm Residences - In Progress</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#DBEAFE' }]}>
            <Text style={[styles.badgeText, { color: '#1D4ED8' }]}>Active</Text>
          </View>
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
    color: '#111827',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
  },
  banner: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  bannerContent: {
    gap: 16,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  bannerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#005B78',
    fontWeight: '600',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: (width - 52) / 2,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  tagText: {
    color: '#374151',
    fontSize: 14,
  },
  requestSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    color: '#005B78',
    fontSize: 14,
    fontWeight: '500',
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
  },
  requestIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  requestSub: {
    fontSize: 12,
    color: '#6B7280',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
