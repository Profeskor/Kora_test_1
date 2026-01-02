import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/src/store/userStore";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "../../constants/colors";

export default function MyPropertiesStandalone() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  // Mock property info — using data from Kora_Consolidated_Properties CSV
  const property = {
    id: "PROP-001",
    title: "Marina Heights, Unit 1205",
    address: "Dubai Marina, Dubai, UAE",
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My Properties</Text>
        <View style={{ width: 56 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{property.title}</Text>
          <Text style={styles.cardSubtitle}>{property.address}</Text>
          <Text style={styles.priceText}>{property.price}</Text>

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
            <Text style={styles.downloadText}>Download Floor Plan / Docs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <View style={styles.paymentTable}>
            {/* Table Header */}
            <View style={styles.paymentTableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Date</Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { flex: 1.2, textAlign: "center" },
                ]}
              >
                Amount
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { flex: 1, textAlign: "right" },
                ]}
              >
                Method
              </Text>
            </View>
            {/* Table Rows */}
            {paymentHistory.map((p, index) => (
              <View
                key={p.id}
                style={[
                  styles.paymentTableRow,
                  index === paymentHistory.length - 1 &&
                    styles.paymentTableRowLast,
                ]}
              >
                <Text style={[styles.paymentDate, { flex: 1.2 }]}>
                  {p.date}
                </Text>
                <Text
                  style={[
                    styles.paymentAmount,
                    { flex: 1.2, textAlign: "center" },
                  ]}
                >
                  AED {p.amount.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.paymentMethod,
                    { flex: 1, textAlign: "right" },
                  ]}
                >
                  {p.method}
                </Text>
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
  container: { flex: 1, backgroundColor: backgrounds.subtle },
  topBar: {
    height: 56,
    backgroundColor: backgrounds.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  backBtn: { padding: 8 },
  backText: { color: palette.brand.primary, fontWeight: "700" },
  pageTitle: { fontSize: 18, fontWeight: "800", color: textColors.heading },
  content: { padding: 18, paddingBottom: 40 },
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: textColors.heading },
  cardSubtitle: { fontSize: 14, color: textColors.secondary, marginTop: 6 },
  row: { flexDirection: "row", marginTop: 12, gap: 12 },
  detailCol: { flex: 1 },
  detailLabel: {
    fontSize: 12,
    color: palette.brand.secondary,
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 15,
    color: textColors.heading,
    fontWeight: "700",
    marginTop: 4,
  },
  downloadButton: {
    marginTop: 14,
    backgroundColor: palette.brand.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  downloadText: { color: textColors.onDark, fontWeight: "700", fontSize: 15 },
  priceText: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.brand.primary,
    marginTop: 8,
  },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: textColors.heading,
  },
  paymentTable: {
    backgroundColor: backgrounds.card,
    borderRadius: 14,
    overflow: "hidden",
    ...shadows.card,
  },
  paymentTableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: backgrounds.subtle,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: textColors.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paymentTableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: backgrounds.subtle,
  },
  paymentTableRowLast: {
    borderBottomWidth: 0,
  },
  paymentDate: { color: textColors.body, fontSize: 14, fontWeight: "500" },
  paymentAmount: { fontWeight: "700", color: textColors.heading, fontSize: 14 },
  paymentMethod: {
    color: textColors.secondary,
    fontSize: 13,
    fontWeight: "500",
  },
  handoverCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 14,
    padding: 16,
    ...shadows.card,
  },
  handoverStatus: {
    fontSize: 16,
    fontWeight: "700",
    color: textColors.heading,
  },
  handoverDate: { color: textColors.secondary, marginTop: 6, fontSize: 14 },
  handoverNote: { color: palette.brand.secondary, marginTop: 8, fontSize: 13 },
});
