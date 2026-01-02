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
  palette,
  textColors,
  backgrounds,
  borders,
  badges,
} from "@/src/constants/colors";

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

  // Neutral badge styling - no color-based status indicators
  const getStatusColor = () => badges.text;
  const getStatusBg = () => badges.background;

  const renderItem = ({ item }: { item: (typeof MOCK_LEADS)[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <BodyText fontWeight="600">{item.name}</BodyText>
          <Caption color={textColors.secondary} style={{ marginTop: 4 }}>
            Interested in {item.interest}
          </Caption>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusBg(),
              borderWidth: 1,
              borderColor: borders.default,
            },
          ]}
        >
          <Caption fontWeight="600" color={getStatusColor()}>
            {item.status}
          </Caption>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Phone size={14} color={textColors.secondary} />
          <Caption color={textColors.secondary}>{item.phone}</Caption>
        </View>
        <View style={styles.detailItem}>
          <Calendar size={14} color={textColors.secondary} />
          <Caption color={textColors.secondary}>{item.date}</Caption>
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
          <Plus size={20} color={textColors.onDark} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search
          size={20}
          color={textColors.secondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor={palette.brand.secondary}
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
    backgroundColor: backgrounds.subtle,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: backgrounds.card,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.default,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: textColors.heading,
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: palette.brand.primary,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  cardDetails: {
    flexDirection: "row",
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: borders.default,
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
