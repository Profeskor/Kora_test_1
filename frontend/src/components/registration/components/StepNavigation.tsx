import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  palette,
  textColors,
  borders,
  interactive,
  backgrounds,
} from "../../../constants/colors";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  loading,
}: StepNavigationProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <View style={styles.container}>
      {currentStep > 1 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          disabled={loading}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[
          styles.nextButton,
          isLastStep && styles.submitButton,
          loading && styles.buttonDisabled,
        ]}
        onPress={isLastStep ? onSubmit : onNext}
        disabled={loading}
      >
        <Text style={styles.nextButtonText}>
          {isLastStep ? "Submit Application" : `Next → Step ${currentStep + 1}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borders.default,
    backgroundColor: backgrounds.card,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: textColors.body,
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: interactive.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: interactive.primaryBg,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: interactive.primaryText,
    fontSize: 16,
    fontWeight: "600",
  },
});
