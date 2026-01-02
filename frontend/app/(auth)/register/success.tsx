import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  textColors,
  backgrounds,
  borders,
  palette,
} from "../../../src/constants/colors";

export default function RegistrationSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color={palette.status.success} />
        </View>

        <Text style={styles.title}>Application Submitted!</Text>
        <Text style={styles.subtitle}>
          Your broker registration application has been successfully submitted.
          Our team will review your application and get back to you shortly.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Whats Next?</Text>
          <Text style={styles.infoText}>
            • You will receive a confirmation email shortly{"\n"}• Our team will
            review your documents{"\n"}• You&apos;ll be notified once your
            account is approved{"\n"}• This process typically takes 2-3 business
            days
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/landing")}
        >
          <Text style={styles.buttonText}>Continue to Sign In</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/landing")}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: textColors.secondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: "100%",
    borderWidth: 1,
    borderColor: borders.default,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: textColors.secondary,
    lineHeight: 22,
  },
  button: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    backgroundColor: palette.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: textColors.onDark,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borders.default,
    backgroundColor: backgrounds.card,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: textColors.body,
    fontSize: 16,
    fontWeight: "600",
  },
});
