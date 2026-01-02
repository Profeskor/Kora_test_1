import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../src/components/layout/AppHeader";
import { useAppState } from "../../src/store/appState";
import { backgrounds, textColors } from "@/src/constants/colors";

export default function BookingDetailScreen() {
  const { selectedBookingId } = useAppState();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Booking Detail" />
      <View style={styles.content}>
        <Text style={styles.label}>Booking ID</Text>
        <Text style={styles.value}>{selectedBookingId || "Not selected"}</Text>
        <Text style={styles.muted}>Stub booking detail — wire data next.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: backgrounds.subtle },
  content: { padding: 20, gap: 8 },
  label: { color: textColors.secondary, fontSize: 12 },
  value: {
    color: textColors.heading,
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Marcellus-Regular",
  },
  muted: { color: textColors.secondary, marginTop: 6 },
});
