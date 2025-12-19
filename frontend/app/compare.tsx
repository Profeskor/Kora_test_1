import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppState } from "../src/store/appState";
import AppHeader from "../src/components/layout/AppHeader";
import { BodyText, Caption } from "../src/components/common/Typography";
import { colors, spacing, borderRadius } from "../src/constants/designSystem";

export default function CompareScreen() {
  const { comparisonList } = useAppState();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Compare Properties" />
      <FlatList
        data={comparisonList}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Caption color={colors.text.secondary}>Property ID</Caption>
            <BodyText fontWeight="700" style={{ marginTop: spacing.xs }}>
              {item}
            </BodyText>
            <Caption
              color={colors.text.secondary}
              style={{ marginTop: spacing.xs }}
            >
              Stub comparison view — wire data & UI next.
            </Caption>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <BodyText fontWeight="600">
              No properties added to comparison.
            </BodyText>
            <Caption color={colors.text.secondary}>
              Add from property detail to compare.
            </Caption>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  empty: {
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.sm,
  },
});
