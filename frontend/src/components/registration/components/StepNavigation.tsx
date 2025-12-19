import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
    borderColor: "#D1D5DB",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#005B78",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
