
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CreditCard } from 'lucide-react-native';
import { KORA_LOGO } from '../src/constants/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../src/store/userStore';
import { AppUser } from '../src/types';

export default function LandingScreen() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);

  const handleExploreProperties = () => {
    const guestUser: AppUser = {
      id: 'guest-user',
      name: 'Guest',
      email: '',
      mobile: '',
      roles: ['guest'],
      currentRole: 'guest',
    };
    setUser(guestUser);
    router.replace('/(main)');
  };

  const handleDemoLogin = () => {
    const demoUser: AppUser = {
      id: 'demo-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@demo.com',
      mobile: '+971 50 987 6543',
      roles: ['broker', 'homeowner'],
      currentRole: 'broker', // Default to broker for demo
    };
    setUser(demoUser);
    router.replace('/(main)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: KORA_LOGO }}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Welcome Heading */}
        <Text style={styles.title}>Welcome</Text>

        {/* Tagline */}
        <Text style={styles.subtitle}>
          Sign in to view exclusive Kora projects and available units.
        </Text>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={styles.infoTextBold}>New user?</Text> Click "Try Demo Account" below to explore the app instantly, or create a new account to get started.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Try Demo Account */}
          <TouchableOpacity
            style={styles.demoButton}
            onPress={handleDemoLogin}
          >
            <Text style={styles.demoButtonText}>Try Demo Account</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Quick access with pre-loaded demo data
          </Text>

          {/* Quick Pay Button */}
          <TouchableOpacity
            style={styles.quickPayButton}
            onPress={() => {
                router.push('/quick-pay');
            }}
          >
            <CreditCard size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.quickPayButtonText}>Quick Pay</Text>
          </TouchableOpacity>

          {/* Create New Account */}
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.outlineButtonText}>Create New Account</Text>
          </TouchableOpacity>

          {/* Continue as Guest */}
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={handleExploreProperties}
          >
            <Text style={styles.outlineButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Browse available inventory only
          </Text>
          
          {/* Sign In Link */}
           <TouchableOpacity
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={{ color: '#005B78', fontSize: 16 }}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: 'rgba(0, 91, 120, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(43, 127, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 14,
    color: '#0066cc',
    lineHeight: 22,
    textAlign: 'center',
  },
  infoTextBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 16,
  },
  demoButton: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#005B78',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  demoButtonText: {
    color: '#005B78',
    fontSize: 16,
    fontWeight: '500',
  },
  quickPayButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: '#005B78', // Gradient not supported in pure RN View, using solid color
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickPayButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  outlineButton: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  outlineButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: -8,
    marginBottom: 8,
  },
});
