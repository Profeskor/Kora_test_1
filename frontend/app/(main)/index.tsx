
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../src/store/userStore';
import BrokerHome from '../../src/components/broker/BrokerHome';

export default function HomeScreen() {
  const user = useUserStore(state => state.user);
  const role = user?.currentRole || 'guest';

  // For now, we default to BrokerHome for broker/guest, or a simple welcome for others
  // In a real app, we'd have BuyerHome, HomeownerHome, etc.
  
  return (
    <SafeAreaView style={styles.container}>
      <BrokerHome userName={user?.name || 'Guest'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
