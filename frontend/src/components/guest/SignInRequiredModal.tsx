import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Lock, LogIn, UserPlus, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "../../constants/colors";

type FeatureType =
  | "Shortlist"
  | "Leads"
  | "Bookings"
  | "Property Booking"
  | string;

interface SignInRequiredModalProps {
  visible: boolean;
  onClose: () => void;
  feature?: FeatureType;
  customMessage?: string;
}

const featureDescriptions: Record<string, string> = {
  Shortlist:
    "Save your favorite properties and compare them side-by-side. Keep track of units you're interested in.",
  Leads:
    "Manage your client relationships, track inquiries, and close more deals with our powerful CRM tools.",
  Bookings:
    "Schedule and manage property viewings, site visits, and client appointments all in one place.",
  "Property Booking":
    "Express your interest in this property. Our team will contact you to discuss next steps and schedule a site visit.",
};

export default function SignInRequiredModal({
  visible,
  onClose,
  feature = "Property Booking",
  customMessage,
}: SignInRequiredModalProps) {
  const router = useRouter();

  const description =
    customMessage ||
    featureDescriptions[feature] ||
    featureDescriptions["Property Booking"];

  const handleSignIn = () => {
    onClose();
    router.push("/landing");
  };

  const handleRegister = () => {
    onClose();
    router.push("/(auth)/welcome");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={styles.container}
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={textColors.secondary} />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.iconCircle}>
              <Lock size={32} color={palette.brand.primary} />
            </View>

            <Text style={styles.title}>Sign In Required</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.benefitsCard}>
              <Text style={styles.benefitsTitle}>Create an account to:</Text>
              <View style={styles.benefitItem}>
                <Text style={styles.check}>✓</Text>
                <Text style={styles.benefitText}>
                  Book properties and track your journey
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.check}>✓</Text>
                <Text style={styles.benefitText}>
                  Get personalized agent support
                </Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.check}>✓</Text>
                <Text style={styles.benefitText}>
                  Schedule site visits easily
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSignIn}
              >
                <LogIn
                  size={18}
                  color={textColors.onDark}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleRegister}
              >
                <UserPlus
                  size={18}
                  color={palette.brand.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Continue Browsing</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  content: {
    alignItems: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${palette.brand.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: textColors.heading,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Marcellus-Regular",
  },
  description: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  benefitsCard: {
    width: "100%",
    backgroundColor: backgrounds.subtle,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  check: {
    color: palette.status.success,
    fontWeight: "700",
    marginRight: 10,
    fontSize: 14,
  },
  benefitText: {
    flex: 1,
    fontSize: 13,
    color: textColors.body,
    lineHeight: 18,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.brand.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: textColors.onDark,
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: palette.brand.primary,
  },
  secondaryButtonText: {
    color: palette.brand.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: textColors.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
});
