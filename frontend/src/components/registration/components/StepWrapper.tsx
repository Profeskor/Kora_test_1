import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  palette,
  textColors,
  borders,
  backgrounds,
} from "../../../constants/colors";

interface StepWrapperProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function StepWrapper({
  stepNumber,
  totalSteps,
  title,
  subtitle,
  children,
}: StepWrapperProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.stepNumber}>
            Step {stepNumber} of {totalSteps}
          </Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: borders.default,
  },
  container: {
    marginBottom: 0,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: borders.default,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.brand.primary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: textColors.secondary,
  },
});
