import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { CheckCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  badges,
} from "../../constants/colors";

interface ForgotPasswordSuccessProps {
  onLoginPress: () => void;
}

export default function ForgotPasswordSuccess({
  onLoginPress,
}: ForgotPasswordSuccessProps) {
  const router = useRouter();

  const handleGoToLogin = () => {
    onLoginPress();
    router.replace("/landing");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <CheckCircle size={48} color={palette.brand.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Password Reset Successful</Text>
        <Text style={styles.subtitle}>
          Your password has been successfully reset. Please log in with your new
          password.
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleGoToLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Keep your password safe and secure. Never share it with anyone.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.screenLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: backgrounds.subtle,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: textColors.heading,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
    marginBottom: 36,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
    marginBottom: 28,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.onDark,
  },
  infoContainer: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: borders.default,
    width: "100%",
  },
  infoText: {
    fontSize: 12,
    color: textColors.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
