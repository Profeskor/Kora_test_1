
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock, LogIn, UserPlus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface SignInRequiredProps {
  feature: 'Shortlist' | 'Leads' | 'Bookings';
}

export default function SignInRequired({ feature }: SignInRequiredProps) {
  const router = useRouter();

  const featureDescriptions = {
    Shortlist: 'Save your favorite properties and compare them side-by-side. Keep track of units you\'re interested in.',
    Leads: 'Manage your client relationships, track inquiries, and close more deals with our powerful CRM tools.',
    Bookings: 'Schedule and manage property viewings, site visits, and client appointments all in one place.',
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Lock size={40} color="#005B78" />
        </View>
        <Text style={styles.title}>Unlock Exclusive Features</Text>
        <Text style={styles.subtitle}>
          Access to <Text style={{ fontWeight: 'bold' }}>{feature}</Text> is restricted
        </Text>
        <Text style={styles.description}>
          {featureDescriptions[feature]}
        </Text>

        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Sign in or register to access:</Text>
          <View style={styles.benefitItem}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefitText}>Personalized property shortlists</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefitText}>Lead and client management</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefitText}>Site visit scheduling</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <LogIn size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')} // Register
          >
            <UserPlus size={20} color="#005B78" style={{ marginRight: 8 }} />
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005B78',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#005B78',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  check: {
    color: '#22C55E',
    marginRight: 8,
    fontSize: 16,
  },
  benefitText: {
    fontSize: 14,
    color: '#374151',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005B78',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#005B78',
  },
  secondaryButtonText: {
    color: '#005B78',
    fontSize: 16,
    fontWeight: '600',
  },
});
