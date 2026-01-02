import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Lock, LogIn, UserPlus } from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "../../constants/colors";

interface SignInRequiredProps {
  feature: "Shortlist" | "Leads" | "Bookings";
}

export default function SignInRequired({ feature }: SignInRequiredProps) {
  const router = useRouter();

  const featureDescriptions = {
    Shortlist:
      "Save your favorite properties and compare them side-by-side. Keep track of units you're interested in.",
    Leads:
      "Manage your client relationships, track inquiries, and close more deals with our powerful CRM tools.",
    Bookings:
      "Schedule and manage property viewings, site visits, and client appointments all in one place.",
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Lock size={40} color={palette.brand.primary} />
        </View>
        <Text style={styles.title}>Unlock Exclusive Features</Text>
        <Text style={styles.subtitle}>
          {/* to <Text style={{ fontWeight: "bold" }}>{feature}</Text>  */}
          Access is restricted
        </Text>
        <Text style={styles.description}>{featureDescriptions[feature]}</Text>

        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>
            Sign in or register to access:
          </Text>
          <View style={styles.benefitItem}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefitText}>
              Personalized property shortlists
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefitText}>Lead and client management</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.benefitText}>Site visit scheduling</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/landing")}
          >
            <LogIn
              size={20}
              color={textColors.onDark}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/(auth)/welcome")}
          >
            <UserPlus
              size={20}
              color={palette.brand.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: backgrounds.subtle,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: borders.default,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: palette.brand.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: textColors.body,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: backgrounds.card,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: borders.default,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.brand.primary,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  check: {
    color: palette.status.success,
    marginRight: 8,
    fontSize: 16,
  },
  benefitText: {
    fontSize: 14,
    color: textColors.body,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.brand.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: textColors.onDark,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgrounds.card,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.brand.primary,
  },
  secondaryButtonText: {
    color: palette.brand.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
