import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../src/components/layout/AppHeader';
import { useAppState } from '../../src/store/appState';

export default function LeadDetailScreen() {
  const { selectedLeadId } = useAppState();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Lead Detail" />
      <View style={styles.content}>
        <Text style={styles.label}>Lead ID</Text>
        <Text style={styles.value}>{selectedLeadId || 'Not selected'}</Text>
        <Text style={styles.muted}>Stub detail view — wire real data next.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: 20, gap: 8 },
  label: { color: '#6B7280', fontSize: 12 },
  value: { color: '#0F172A', fontSize: 18, fontWeight: '700' },
  muted: { color: '#6B7280', marginTop: 6 },
});

