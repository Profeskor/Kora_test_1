import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isCompany: boolean;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  isCompany,
}: ProgressIndicatorProps) {
  const progressPercentage =
    totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Step {currentStep} of {totalSteps}
        {/* {isCompany ? " (Company)" : " (Individual)"} */}
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressPercentage}%` as any },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#005B78",
    borderRadius: 2,
  },
});
