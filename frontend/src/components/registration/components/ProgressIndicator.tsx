import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette, textColors, borders } from "../../../constants/colors";

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
    color: textColors.secondary,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: borders.default,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: palette.brand.primary,
    borderRadius: 2,
  },
});
