import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PaymentMilestone {
  milestone: string;
  percentage: number;
  date: string;
  amount: number;
}

interface PaymentPlanProps {
  milestones?: PaymentMilestone[];
  /** If provided, compute milestone amounts from this total to ensure totals match */
  propertyPrice?: number;
}

const defaultMilestones: PaymentMilestone[] = [
  {
    milestone: "1st Installment",
    percentage: 20,
    date: "9-Jan-2026",
    amount: 0,
  },
  {
    milestone: "On Handover",
    percentage: 80,
    date: "28-Aug-2026",
    amount: 0,
  },
];

export default function PaymentPlan({
  milestones = defaultMilestones,
  propertyPrice,
}: PaymentPlanProps) {
  const formatAmount = (amount: number) => {
    return Math.round(amount).toLocaleString("en-US");
  };

  // If propertyPrice provided, compute amounts from percentages so totals match
  const computedMilestones = propertyPrice
    ? milestones.map((m) => ({
        ...m,
        amount: Math.round((m.percentage / 100) * propertyPrice),
      }))
    : milestones;

  // Fix rounding: adjust last milestone to ensure total exactly equals propertyPrice when provided
  if (propertyPrice && computedMilestones.length > 0) {
    const total = computedMilestones.reduce((s, mm) => s + mm.amount, 0);
    const diff = Math.round(propertyPrice) - total;
    if (diff !== 0) {
      computedMilestones[computedMilestones.length - 1].amount += diff;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Plan</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>MILESTONE</Text>
          <Text style={styles.headerText}>%</Text>
          <Text style={styles.headerText}>DATE</Text>
          <Text style={[styles.headerText, styles.rightAlign]}>AED</Text>
        </View>
        {computedMilestones.map((milestone, index) => (
          <View key={index} style={styles.dataRow}>
            <View style={styles.milestoneCell}>
              <Text style={styles.milestoneText}>{milestone.milestone}</Text>
            </View>
            <Text style={styles.dataText}>{milestone.percentage}</Text>
            <Text style={styles.dataText}>{milestone.date}</Text>
            <Text
              style={[styles.dataText, styles.rightAlign, styles.amountText]}
            >
              {/*  todo: sometimes wrong calc. or 0 value ( fix ) */}
              {formatAmount(milestone.amount)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  table: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    flex: 1,
  },
  dataRow: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  milestoneCell: {
    flex: 1,
  },
  milestoneText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  dataText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  rightAlign: {
    textAlign: "right",
  },
  amountText: {
    fontWeight: "600",
    color: "#111827",
  },
});
