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
import { Lock, Eye, EyeOff } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

interface ForgotPasswordNewPasswordProps {
  onNext: (newPassword: string) => void;
  onBack: () => void;
}

interface PasswordStrength {
  hasLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
}

export default function ForgotPasswordNewPassword({
  onNext,
  onBack,
}: ForgotPasswordNewPasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength: PasswordStrength = {
    hasLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
  };

  const isPasswordValid =
    passwordStrength.hasLength &&
    passwordStrength.hasUppercase &&
    passwordStrength.hasNumber;

  const handleResetPassword = () => {
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet all requirements");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    onNext(newPassword);
  };

  const PasswordRequirement = ({
    met,
    text,
  }: {
    met: boolean;
    text: string;
  }) => (
    <View style={styles.requirementRow}>
      <View style={[styles.requirementDot, met && styles.requirementDotMet]} />
      <Text style={[styles.requirementText, met && styles.requirementTextMet]}>
        {text}
      </Text>
    </View>
  );

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
              <Lock size={32} color={palette.brand.primary} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.subtitle}>
            Choose a strong password for your account
          </Text>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>

          {/* New Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWrapper}>
              <Lock
                size={18}
                color={palette.brand.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setError("");
                }}
                placeholderTextColor={palette.brand.secondary}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={18} color={palette.brand.secondary} />
                ) : (
                  <Eye size={18} color={palette.brand.secondary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Password must contain:</Text>
            <PasswordRequirement
              met={passwordStrength.hasLength}
              text="At least 8 characters"
            />
            <PasswordRequirement
              met={passwordStrength.hasUppercase}
              text="One uppercase letter"
            />
            <PasswordRequirement
              met={passwordStrength.hasNumber}
              text="One number"
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Lock
                size={18}
                color={palette.brand.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError("");
                }}
                placeholderTextColor={palette.brand.secondary}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} color={palette.brand.secondary} />
                ) : (
                  <Eye size={18} color={palette.brand.secondary} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Reset Button */}
          <TouchableOpacity
            style={[
              styles.resetButton,
              !isPasswordValid && styles.resetButtonDisabled,
            ]}
            onPress={handleResetPassword}
            activeOpacity={0.8}
            disabled={!isPasswordValid}
          >
            <Text style={styles.resetButtonText}>Reset Password</Text>
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
  progressDotInactive: {
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
    marginBottom: 20,
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
  eyeIcon: {
    padding: 8,
    marginRight: -8,
  },
  requirementsContainer: {
    backgroundColor: backgrounds.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: borders.default,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 12,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  requirementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.brand.secondary,
    marginRight: 12,
  },
  requirementDotMet: {
    backgroundColor: palette.brand.primary,
  },
  requirementText: {
    fontSize: 12,
    color: textColors.secondary,
  },
  requirementTextMet: {
    color: palette.brand.primary,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: palette.brand.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  resetButtonDisabled: {
    backgroundColor: borders.default,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.onDark,
  },
});
