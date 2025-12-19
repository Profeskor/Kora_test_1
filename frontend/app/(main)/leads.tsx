import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Plus, Phone, Calendar } from "lucide-react-native";
import { useRouter } from "expo-router";
import GuestGuard from "../../src/components/guest/GuestGuard";
import AppHeader from "../../src/components/layout/AppHeader";
import { BodyText, Caption } from "../../src/components/common/Typography";
import {
  colors,
  spacing,
  borderRadius,
} from "../../src/constants/designSystem";

// Mock Data for Leads
const MOCK_LEADS = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed.h@example.com",
    phone: "+971 50 123 4567",
    interest: "IL Vento Residences",
    status: "New",
    date: "2024-12-06",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.s@example.com",
    phone: "+971 52 987 6543",
    interest: "La Marina Heights",
    status: "Ongoing",
    date: "2024-12-05",
  },
  {
    id: "3",
    name: "Mohammed Ali",
    email: "m.ali@example.com",
    phone: "+971 55 555 5555",
    interest: "Azure Bay Residences",
    status: "Closed",
    date: "2024-12-01",
  },
];

export default function LeadsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [leads] = useState(MOCK_LEADS);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return colors.semantic.info; // Blue
      case "Ongoing":
        return colors.semantic.warning; // Amber
      case "Closed":
        return colors.semantic.success; // Green
      default:
        return colors.text.tertiary; // Gray
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "New":
        return "#EFF6FF";
      case "Ongoing":
        return "#FFFBEB";
      case "Closed":
        return "#ECFDF5";
      default:
        return colors.background.tertiary;
    }
  };

  const renderItem = ({ item }: { item: (typeof MOCK_LEADS)[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <BodyText fontWeight="600">{item.name}</BodyText>
          <Caption
            color={colors.text.secondary}
            style={{ marginTop: spacing.xs }}
          >
            Interested in {item.interest}
          </Caption>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusBg(item.status) },
          ]}
        >
          <Caption fontWeight="600" color={getStatusColor(item.status)}>
            {item.status}
          </Caption>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Phone size={14} color={colors.text.secondary} />
          <Caption color={colors.text.secondary}>{item.phone}</Caption>
        </View>
        <View style={styles.detailItem}>
          <Calendar size={14} color={colors.text.secondary} />
          <Caption color={colors.text.secondary}>{item.date}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );

  const content = (
    <>
      <AppHeader title="My Leads" />
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/leads/create")}
        >
          <Plus size={20} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search
          size={20}
          color={colors.text.secondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor={colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredLeads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <GuestGuard>{content}</GuestGuard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: colors.background.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.teal,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 100,
  },
  cardDetails: {
    flexDirection: "row",
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});
