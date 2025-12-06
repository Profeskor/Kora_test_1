
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
import { Search, Plus, Phone, Mail, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock Data for Leads
const MOCK_LEADS = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.h@example.com',
    phone: '+971 50 123 4567',
    interest: 'Marina Heights',
    status: 'New',
    date: '2024-12-06',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.s@example.com',
    phone: '+971 52 987 6543',
    interest: 'IL VENTO',
    status: 'Ongoing',
    date: '2024-12-05',
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    email: 'm.ali@example.com',
    phone: '+971 55 555 5555',
    interest: 'Sky Gardens',
    status: 'Closed',
    date: '2024-12-01',
  },
];

export default function LeadsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState(MOCK_LEADS);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return '#3B82F6'; // Blue
      case 'Ongoing': return '#F59E0B'; // Amber
      case 'Closed': return '#10B981'; // Green
      default: return '#6B7280'; // Gray
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'New': return '#EFF6FF';
      case 'Ongoing': return '#FFFBEB';
      case 'Closed': return '#ECFDF5';
      default: return '#F3F4F6';
    }
  };

  const renderItem = ({ item }: { item: typeof MOCK_LEADS[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.interest}>Interested in {item.interest}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBg(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Phone size={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>
        <View style={styles.detailItem}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Leads</Text>
        <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/leads/create')}
        >
            <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredLeads}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#005B78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  interest: {
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
