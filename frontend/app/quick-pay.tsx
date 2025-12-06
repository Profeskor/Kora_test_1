
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Search, CheckCircle } from 'lucide-react-native';

export default function QuickPayScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'search' | 'payment' | 'success'>('search');
  const [accountNumber, setAccountNumber] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Mock found account
  const foundAccount = {
    accountNumber: 'ACC-12345',
    name: 'John Doe',
    property: 'Marina Heights, Unit 1205',
    outstanding: 15000,
    breakdown: [
        { description: 'Unit Payment - Q4 2024', amount: 12000 },
        { description: 'Service Charges', amount: 2500 },
        { description: 'Late Fee', amount: 500 },
    ],
  };

  const handleSearch = () => {
    setStep('payment');
  };

  const handlePayment = () => {
    setStep('success');
  };

  const renderSearch = () => (
    <View style={styles.card}>
      <View style={styles.headerCenter}>
        <View style={styles.iconCircle}>
          <CreditCard size={32} color="#005B78" />
        </View>
        <Text style={styles.title}>Quick Pay</Text>
        <Text style={styles.subtitle}>Pay your property dues without logging in</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSearch}>
          <Search size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.primaryButtonText}>Search Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Tip: Create an account to access more features like payment history, documents, and service requests.
        </Text>
      </View>
    </View>
  );

  const renderPayment = () => (
    <ScrollView style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        
        {/* Account Info */}
        <View style={styles.infoSection}>
            <View style={styles.row}>
                <Text style={styles.label}>Account Holder</Text>
                <Text style={styles.value}>{foundAccount.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Property</Text>
                <Text style={styles.value}>{foundAccount.property}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Account Number</Text>
                <Text style={styles.value}>{foundAccount.accountNumber}</Text>
            </View>
        </View>

        {/* Breakdown */}
        <View style={styles.breakdownSection}>
            <Text style={styles.subTitle}>Outstanding Amount</Text>
            {foundAccount.breakdown.map((item, idx) => (
                <View key={idx} style={styles.breakdownRow}>
                    <Text style={styles.breakdownLabel}>{item.description}</Text>
                    <Text style={styles.breakdownValue}>AED {item.amount.toLocaleString()}</Text>
                </View>
            ))}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount Due</Text>
                <Text style={styles.totalValue}>AED {foundAccount.outstanding.toLocaleString()}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handlePayment}>
            <Text style={styles.primaryButtonText}>Pay AED {foundAccount.outstanding.toLocaleString()}</Text>
        </TouchableOpacity>
    </ScrollView>
  );

  const renderSuccess = () => (
    <View style={[styles.card, { alignItems: 'center', paddingVertical: 40 }]}>
        <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
            <CheckCircle size={40} color="#10B981" />
        </View>
        <Text style={[styles.title, { color: '#005B78', marginTop: 16 }]}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Your payment has been processed</Text>

        <View style={styles.receiptBox}>
            <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Transaction ID</Text>
                <Text style={styles.receiptValue}>TXN-2024-001234</Text>
            </View>
            <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Amount Paid</Text>
                <Text style={styles.receiptValue}>AED 15,000.00</Text>
            </View>
             <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Date</Text>
                <Text style={styles.receiptValue}>{new Date().toLocaleDateString()}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.outlineButton} onPress={() => router.back()}>
            <Text style={styles.outlineButtonText}>Back to Home</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
              if (step === 'search') router.back();
              else setStep('search');
          }} style={styles.backButton}>
            <ArrowLeft size={24} color="#005B78" />
            <Text style={styles.backText}>{step === 'search' ? 'Back to Home' : 'Back'}</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', padding: 20 }}
        >
            {step === 'search' && renderSearch()}
            {step === 'payment' && renderPayment()}
            {step === 'success' && renderSuccess()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F5', // Gradient fallback
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#005B78',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerCenter: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E6F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#005B78',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  primaryButton: {
    backgroundColor: '#005B78',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  infoText: {
    color: '#1E40AF',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#005B78',
      marginBottom: 20,
  },
  infoSection: {
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 16,
      marginBottom: 20,
      gap: 12,
  },
  row: {
      marginBottom: 4,
  },
  value: {
      fontSize: 16,
      fontWeight: '600',
      color: '#005B78',
  },
  breakdownSection: {
      gap: 12,
      marginBottom: 24,
  },
  subTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#005B78',
      marginBottom: 8,
  },
  breakdownRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: '#F9FAFB',
      borderRadius: 12,
  },
  breakdownLabel: {
      color: '#374151',
  },
  breakdownValue: {
      color: '#005B78',
      fontWeight: '500',
  },
  totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#005B78',
      borderRadius: 12,
      marginTop: 8,
  },
  totalLabel: {
      color: 'white',
      fontWeight: '600',
  },
  totalValue: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
  },
  receiptBox: {
      backgroundColor: '#F9FAFB',
      width: '100%',
      padding: 20,
      borderRadius: 16,
      gap: 12,
      marginVertical: 24,
  },
  receiptRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      paddingBottom: 12,
  },
  receiptLabel: {
      color: '#6B7280',
  },
  receiptValue: {
      color: '#005B78',
      fontWeight: '600',
  },
  outlineButton: {
      width: '100%',
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      alignItems: 'center',
  },
  outlineButtonText: {
      color: '#374151',
      fontSize: 16,
      fontWeight: '600',
  },
});
