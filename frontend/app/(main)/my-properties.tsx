import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import AppHeader from "../../src/components/layout/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../../src/store/userStore";

export default function MyPropertiesPage() {
  const user = useUserStore((s) => s.user);

  // Mock property info — adapt later to real data
  const property = {
    id: "PROP-001",
    title: "Marina Heights, Unit 1205",
    address: "Dubai Marina",
    unit: "1205",
    customerId: "CUST-12345",
    unitType: "2 BHK",
    price: "AED 1,500,000",
    floorPlanUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    handoverDate: "31-Dec-2026",
    handoverStatus: "Pending",
  };

  const paymentHistory = [
    { id: "p1", date: "15-Dec-2024", amount: 15000, method: "Card" },
    { id: "p2", date: "18-Nov-2024", amount: 15000, method: "Bank Transfer" },
    { id: "p3", date: "22-Oct-2024", amount: 15000, method: "Card" },
  ];

  const openDocument = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.warn("Could not open document", err);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{property.title}</Text>
          <Text style={styles.cardSubtitle}>{property.address}</Text>
          <Text style={styles.price}>{property.price}</Text>

          <View style={styles.row}>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>Customer ID</Text>
              <Text style={styles.detailValue}>{property.customerId}</Text>
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>Unit</Text>
              <Text style={styles.detailValue}>{property.unit}</Text>
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>Unit Type</Text>
              <Text style={styles.detailValue}>{property.unitType}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => openDocument(property.floorPlanUrl)}
            activeOpacity={0.9}
          >
            <Text style={styles.downloadText}>Download Floor Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <View style={styles.paymentTable}>
            {/* Table Header */}
            <View style={styles.paymentTableHeader}>
              <Text style={[styles.tableHeaderText, styles.colDate]}>Date</Text>
              <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
              <Text style={[styles.tableHeaderText, styles.colMethod]}>Method</Text>
            </View>
            {/* Table Rows */}
            {paymentHistory.map((p, index) => (
              <View
                key={p.id}
                style={[
                  styles.paymentTableRow,
                  index === paymentHistory.length - 1 && styles.paymentTableRowLast,
                ]}
              >
                <Text style={[styles.paymentDate, styles.colDate]}>{p.date}</Text>
                <Text style={[styles.paymentAmount, styles.colAmount]}>
                  AED {p.amount.toLocaleString()}
                </Text>
                <Text style={[styles.paymentMethod, styles.colMethod]}>{p.method}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Handover Status</Text>
          <View style={styles.handoverCard}>
            <Text style={styles.handoverStatus}>{property.handoverStatus}</Text>
            <Text style={styles.handoverDate}>
              Estimated: {property.handoverDate}
            </Text>
            {/* <Text style={styles.handoverNote}>
              Planned handover is scheduled far in the future.
            </Text> */}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },
  content: { padding: 18, paddingBottom: 40 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  cardSubtitle: { fontSize: 14, color: "#6B7280", marginTop: 6 },
  price: { fontSize: 16, fontWeight: "700", color: "#005B78", marginTop: 8 },
  row: { flexDirection: "row", marginTop: 12, gap: 12 },
  detailCol: { flex: 1 },
  detailLabel: { fontSize: 12, color: "#9CA3AF", fontWeight: "600" },
  detailValue: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "700",
    marginTop: 4,
  },
  downloadButton: {
    marginTop: 14,
    backgroundColor: "#005B78",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  downloadText: { color: "white", fontWeight: "700", fontSize: 15 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#111827" },
  paymentTable: {
    backgroundColor: "white",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentTableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paymentTableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  paymentTableRowLast: {
    borderBottomWidth: 0,
  },
  colDate: { flex: 1.2 },
  colAmount: { flex: 1.2, textAlign: "center" },
  colMethod: { flex: 1, textAlign: "right" },
  paymentDate: { color: "#374151", fontSize: 14, fontWeight: "500" },
  paymentAmount: { fontWeight: "700", color: "#111827", fontSize: 14 },
  paymentMethod: { color: "#6B7280", fontSize: 13, fontWeight: "500" },
  handoverCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  handoverStatus: { fontSize: 16, fontWeight: "700", color: "#111827" },
  handoverDate: { color: "#6B7280", marginTop: 6, fontSize: 14 },
  handoverNote: { color: "#9CA3AF", marginTop: 8, fontSize: 13 },
});
