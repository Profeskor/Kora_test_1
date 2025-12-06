
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Calendar, MapPin, Clock, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock Data for Bookings
const MOCK_BOOKINGS = [
  {
    id: '1',
    property: 'Marina Heights - Unit 205',
    client: 'Ahmed Hassan',
    date: '2024-12-08',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Viewing',
    location: 'Dubai Marina',
  },
  {
    id: '2',
    property: 'IL VENTO - 3BR',
    client: 'Sarah Smith',
    date: '2024-12-10',
    time: '02:30 PM',
    status: 'Pending',
    type: 'Handover',
    location: 'Dubai Maritime',
  },
];

export default function BookingsScreen() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#10B981'; // Green
      case 'Pending': return '#F59E0B'; // Amber
      case 'Cancelled': return '#EF4444'; // Red
      default: return '#6B7280';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#ECFDF5';
      case 'Pending': return '#FFFBEB';
      case 'Cancelled': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  };

  const renderItem = ({ item }: { item: typeof MOCK_BOOKINGS[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.dateBox}>
            <Text style={styles.dateDay}>{item.date.split('-')[2]}</Text>
            <Text style={styles.dateMonth}>Dec</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.property}>{item.property}</Text>
            <Text style={styles.client}>{item.client} • {item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBg(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      {/* List */}
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateBox: {
    backgroundColor: '#E6F2F5',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    minWidth: 50,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005B78',
  },
  dateMonth: {
    fontSize: 12,
    color: '#005B78',
    textTransform: 'uppercase',
  },
  property: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  client: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
