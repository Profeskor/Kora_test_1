import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Home } from "lucide-react-native";
import { useRouter } from "expo-router";

interface HomeownerDashboardProps {
  userName: string;
}

export default function HomeownerDashboard({
  userName,
}: HomeownerDashboardProps) {
  const router = useRouter();

  // Mock data - in real app, this would come from API/store
  const outstandingBalance = 15000;
  const nextPaymentDate = "01-Aug-2026";
  const amountDue = 15000;
  const propertyName = "Marina Heights, Unit 1205";
  const accountNumber = "CUST-12345";
  const unitType = "2 BHK";

  const handlePayNow = () => {
    router.push("/quick-pay");
  };

  return (
    <View style={styles.container}>
      {/* Upcoming Payment Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Upcoming Payment</Text>
        <Text style={styles.balanceAmount}>
          AED {outstandingBalance.toLocaleString()}
        </Text>

        <View style={styles.paymentDetailsRow}>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentLabel}>Scheduled</Text>
            <Text style={styles.paymentValue}>{nextPaymentDate}</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentLabel}>Amount</Text>
            <Text style={styles.paymentValue}>
              AED {amountDue.toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payNowButton}
          onPress={handlePayNow}
          activeOpacity={0.9}
        >
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* My Property Card */}
      <TouchableOpacity
        style={styles.propertyCard}
        activeOpacity={0.9}
        onPress={() => router.push("/my-properties")}
      >
        <View style={styles.propertyHeader}>
          <View style={styles.propertyIcon}>
            <Home size={20} color="#005B78" />
          </View>
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyTitle}>My Properties</Text>
            <Text style={styles.propertyAddress}>{propertyName}</Text>
          </View>
        </View>

        <View style={styles.propertyDetailsRow}>
          <View style={styles.propertyDetail}>
            <Text style={styles.propertyDetailLabel}>Customer ID</Text>
            <Text style={styles.propertyDetailValue}>{accountNumber}</Text>
          </View>
          <View style={styles.propertyDetail}>
            <Text style={styles.propertyDetailLabel}>Unit Type</Text>
            <Text style={styles.propertyDetailValue}>{unitType}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: "#F6F7FB",
    gap: 16,
  },
  balanceCard: {
    backgroundColor: "#005B78",
    borderRadius: 24,
    padding: 24,
    gap: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    letterSpacing: -0.5,
  },
  paymentDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  paymentDetail: {
    flex: 1,
    gap: 4,
  },
  paymentLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  paymentValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  payNowButton: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  payNowText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#005B78",
  },
  propertyCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  propertyHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  propertyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(0, 91, 120, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  propertyInfo: {
    flex: 1,
    gap: 4,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  propertyAddress: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  propertyDetailsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  propertyDetail: {
    flex: 1,
    gap: 6,
  },
  propertyDetailLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  propertyDetailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
});
