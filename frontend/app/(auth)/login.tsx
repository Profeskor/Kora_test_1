
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Eye, EyeOff, Briefcase, Search, Home, Key } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../src/store/userStore';
import { useAppState } from '../../src/store/appState';
import { UserRole, AppUser } from '../../src/types';

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useUserStore(state => state.setUser);
  const { setScreen } = useAppState();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    emailOrMobile: '',
    password: '',
  });

  const handleSubmit = () => {
    // Mock authentication
    const role = selectedRole || 'buyer';
    const user: AppUser = {
      id: 'user-1',
      name: formData.fullName || 'Test User',
      email: formData.email || (authMode === 'login' ? formData.emailOrMobile : ''),
      mobile: formData.mobile || '',
      roles: [role],
      currentRole: role,
    };
    
    setUser(user);
    setScreen('app');
    router.replace('/(main)');
  };

  const RoleButton = ({ role, icon: Icon, label }: { role: UserRole, icon: any, label: string }) => (
    <TouchableOpacity
      onPress={() => setSelectedRole(role)}
      style={[
        styles.roleButton,
        selectedRole === role && styles.roleButtonSelected
      ]}
    >
      <Icon size={24} color={selectedRole === role ? '#005B78' : '#4B5563'} />
      <Text style={[styles.roleButtonText, selectedRole === role && styles.roleButtonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={20} color="#005B78" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {authMode === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subtitle}>
              {authMode === 'register'
                ? 'Join us to find your perfect property.'
                : 'Sign in to continue to your account.'}
            </Text>
          </View>

          {/* Quick Pay Banner */}
          <View style={styles.quickPayBanner}>
            <View style={{ flex: 1 }}>
              <View style={styles.quickPayHeader}>
                <CreditCard size={20} color="white" />
                <Text style={styles.quickPayTitle}>Quick Pay</Text>
              </View>
              <Text style={styles.quickPaySubtitle}>
                Pay your property dues instantly without logging in
              </Text>
            </View>
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, authMode === 'login' && styles.toggleButtonActive]}
              onPress={() => setAuthMode('login')}
            >
              <Text style={[styles.toggleText, authMode === 'login' && styles.toggleTextActive]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, authMode === 'register' && styles.toggleButtonActive]}
              onPress={() => setAuthMode('register')}
            >
              <Text style={[styles.toggleText, authMode === 'register' && styles.toggleTextActive]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {authMode === 'register' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                />
              </View>
            )}

            {authMode === 'register' ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+971 50 123 4567"
                    keyboardType="phone-pad"
                    value={formData.mobile}
                    onChangeText={(text) => setFormData({ ...formData, mobile: text })}
                  />
                </View>
              </>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email / Mobile</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email or mobile"
                  autoCapitalize="none"
                  value={formData.emailOrMobile}
                  onChangeText={(text) => setFormData({ ...formData, emailOrMobile: text })}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder={authMode === 'register' ? 'Create a strong password' : 'Enter your password'}
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                </TouchableOpacity>
              </View>
            </View>

            {authMode === 'register' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>I am a...</Text>
                <View style={styles.roleGrid}>
                  <RoleButton role="broker" icon={Briefcase} label="Broker" />
                  <RoleButton role="buyer" icon={Search} label="Buyer" />
                  <RoleButton role="homeowner" icon={Home} label="Homeowner" />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                authMode === 'register' && !selectedRole && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={authMode === 'register' && !selectedRole}
            >
              <Text style={styles.submitButtonText}>
                {authMode === 'register' ? 'Register' : 'Login'}
              </Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <Text style={styles.linkText}>Login with OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Login Placeholder */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or continue with</Text>
            {/* Add social buttons here if needed */}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    color: '#005B78',
    marginLeft: 8,
    fontSize: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickPayBanner: {
    backgroundColor: '#005B78', // Gradient fallback
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickPayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  quickPayTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  quickPaySubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  payNowButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  payNowText: {
    color: '#005B78',
    fontSize: 12,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB', // slightly darker for contrast
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },
  eyeIcon: {
    padding: 12,
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonSelected: {
    borderColor: '#005B78',
    backgroundColor: '#E6F2F5',
  },
  roleButtonText: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 8,
  },
  roleButtonTextSelected: {
    color: '#005B78',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#005B78',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  linkText: {
    color: '#FF8C42',
    fontSize: 14,
  },
  socialContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  socialText: {
    color: '#6B7280',
    fontSize: 14,
  },
});
