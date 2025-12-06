
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../src/store/userStore';
import BrokerHome from '../../src/components/broker/BrokerHome';
import BuyerHome from '../../src/components/buyer/BuyerHome';
import HomeownerHome from '../../src/components/homeowner/HomeownerHome';
import GuestHome from '../../src/components/guest/GuestHome';

export default function HomeScreen() {
  const user = useUserStore(state => state.user);
  const role = user?.currentRole || 'guest';
  const userName = user?.name || 'Guest';

  return (
    <SafeAreaView style={styles.container}>
        {role === 'broker' && <BrokerHome userName={userName} />}
        {role === 'buyer' && <BuyerHome userName={userName} />}
        {role === 'homeowner' && <HomeownerHome userName={userName} />}
        {role === 'guest' && <GuestHome userName={userName} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
