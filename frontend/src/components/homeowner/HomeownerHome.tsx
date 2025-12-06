
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Home, CreditCard, FileText, AlertCircle, Receipt } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HomeownerHomeProps {
  userName: string;
}

export default function HomeownerHome({ userName }: HomeownerHomeProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <Text style={styles.subText}>Manage your property</Text>
      </View>

      {/* Balance Card */}
      <LinearGradient
        colors={['#005B78', '#003F54']}
        style={styles.balanceCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.balanceLabel}>Outstanding Balance</Text>
        <Text style={styles.balanceAmount}>AED 15,000</Text>
        
        <View style={styles.balanceDetails}>
          <View>
            <Text style={styles.detailLabel}>Next Payment</Text>
            <Text style={styles.detailValue}>Jan 15, 2025</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Amount Due</Text>
            <Text style={styles.detailValue}>AED 15,000</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Property Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
            <Home size={24} color="#005B78" />
          </View>
          <View>
            <Text style={styles.cardTitle}>My Property</Text>
            <Text style={styles.cardSub}>Marina Heights, Unit 1205</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.propertyGrid}>
          <View>
            <Text style={styles.propertyLabel}>Account Number</Text>
            <Text style={styles.propertyValue}>ACC-12345</Text>
          </View>
          <View>
            <Text style={styles.propertyLabel}>Unit Type</Text>
            <Text style={styles.propertyValue}>2 BHK</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: '#DCFCE7' }]}>
            <CreditCard size={24} color="#16A34A" />
          </View>
          <Text style={styles.actionText}>Make Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
            <Receipt size={24} color="#2563EB" />
          </View>
          <Text style={styles.actionText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: '#F3E8FF' }]}>
            <FileText size={24} color="#9333EA" />
          </View>
          <Text style={styles.actionText}>Documents</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: '#FFEDD5' }]}>
            <AlertCircle size={24} color="#EA580C" />
          </View>
          <Text style={styles.actionText}>Support</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Payments */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {[
            { date: 'Dec 15, 2024', amount: 'AED 15,000', status: 'Completed' },
            { date: 'Nov 15, 2024', amount: 'AED 15,000', status: 'Completed' },
        ].map((payment, idx) => (
            <View key={idx} style={styles.paymentRow}>
                <View>
                    <Text style={styles.paymentDate}>{payment.date}</Text>
                    <Text style={styles.paymentStatus}>{payment.status}</Text>
                </View>
                <Text style={styles.paymentAmount}>{payment.amount}</Text>
            </View>
        ))}
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoText}>
          💡 Phase 2 Coming Soon: Visitor management, amenity booking, and service requests.
        </Text>
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
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#CCE5EB',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailLabel: {
    color: '#CCE5EB',
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#005B78',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardSub: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  propertyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  propertyValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: '48%', // Approximately half width
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  viewAll: {
    color: '#005B78',
    fontSize: 14,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  paymentDate: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  paymentStatus: {
    fontSize: 12,
    color: '#6B7280',
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  infoBanner: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    color: '#1E40AF',
    fontSize: 14,
    lineHeight: 20,
  },
});
