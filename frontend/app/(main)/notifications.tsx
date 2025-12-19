import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Users, Calendar, Building } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/src/store/userStore";

export default function NotificationsScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const role = user?.currentRole || "guest";

  const updates = [
    {
      id: "u1",
      title: "Project Update: Cladding Complete",
      subtitle: "Cladding works finished for Tower A",
      icon: <Building size={18} color="#0D7EA3" />,
      iconBg: "#DBEAFE",
    },
    {
      id: "u2",
      title: "Payment Reminder",
      subtitle: "Upcoming installment due in 7 days",
      icon: <Calendar size={18} color="#F97316" />,
      iconBg: "#FED7AA",
    },
    {
      id: "u3",
      title: "Community Notice",
      subtitle: "Maintenance scheduled for common areas",
      icon: <Users size={18} color="#10B981" />,
      iconBg: "#D1FAE5",
    },
  ];

  const brokerAlerts = [
    {
      id: "b1",
      title: "New Lead Assigned",
      subtitle: "A lead has been assigned to you",
      icon: <Users size={18} color="#9333EA" />,
      iconBg: "#F3E8FF",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#0d7ea3", "#0a5b78"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroHeader}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/more")}
            hitSlop={10}
            style={styles.backButton}
          >
            <View style={styles.backCircle}>
              <ArrowLeft size={18} color="#0D7EA3" />
            </View>
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Notifications</Text>
          <View style={{ width: 44 }} />
        </View>
      </LinearGradient>

      {/* Visible to ALL users */}
      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>Latest Updates</Text>
        </View>
        <View style={styles.card}>
          {updates.map((u) => (
            <View key={u.id} style={styles.row}>
              <View
                style={[styles.iconContainer, { backgroundColor: u.iconBg }]}
              >
                {u.icon}
              </View>
              <View style={styles.rowMeta}>
                <Text style={styles.rowTitle}>{u.title}</Text>
                <Text style={styles.rowSubtitle}>{u.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Broker ONLY */}
      {role === "broker" && (
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Broker Alerts</Text>
          </View>
          <View style={styles.card}>
            {brokerAlerts.map((b) => (
              <View key={b.id} style={styles.row}>
                <View
                  style={[styles.iconContainer, { backgroundColor: b.iconBg }]}
                >
                  {b.icon}
                </View>
                <View style={styles.rowMeta}>
                  <Text style={styles.rowTitle}>{b.title}</Text>
                  <Text style={styles.rowSubtitle}>{b.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: 16 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7FB",
    paddingBottom: 24,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  section: {
    paddingHorizontal: 18,
    marginTop: 18,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  sectionDot: {
    width: 3,
    height: 18,
    backgroundColor: "#CBB68B",
    borderRadius: 999,
  },
  sectionTitle: {
    color: "#5E6A75",
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 4,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rowMeta: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    color: "#0D1B2A",
    fontWeight: "700",
    fontSize: 15,
  },
  rowSubtitle: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 13,
  },
});
