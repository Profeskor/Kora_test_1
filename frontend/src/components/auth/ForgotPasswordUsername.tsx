import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Mail } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

interface ForgotPasswordUsernameProps {
  onNext: (emailOrUsername: string) => void;
  onBack: () => void;
}

export default function ForgotPasswordUsername({
  onNext,
  onBack,
}: ForgotPasswordUsernameProps) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!emailOrUsername.trim()) {
      setError("Please enter your email or username");
      return;
    }
    setError("");
    onNext(emailOrUsername);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color={palette.brand.primary} />
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <Mail size={32} color={palette.brand.primary} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email or username to receive a verification code
          </Text>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressLine} />
            <View style={styles.progressDot} />
            <View style={styles.progressLine} />
            <View style={styles.progressDot} />
          </View>

          {/* Input Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email or Username</Text>
            <View style={styles.inputWrapper}>
              <Mail
                size={18}
                color={palette.brand.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="your@email.com or username"
                value={emailOrUsername}
                onChangeText={(text) => {
                  setEmailOrUsername(text);
                  setError("");
                }}
                placeholderTextColor={palette.brand.secondary}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Send Button */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            <Text style={styles.sendButtonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.screenLight,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: palette.brand.primary,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: backgrounds.subtle,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: textColors.heading,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: borders.default,
  },
  progressDotActive: {
    backgroundColor: palette.brand.primary,
    width: 48,
  },
  progressLine: {
    width: 42,
    height: 3,
    backgroundColor: borders.default,
    marginHorizontal: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: borders.default,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: textColors.heading,
    padding: 0,
  },
  errorText: {
    fontSize: 12,
    color: palette.brand.primary,
    marginTop: 8,
  },
  sendButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.onDark,
  },
});
