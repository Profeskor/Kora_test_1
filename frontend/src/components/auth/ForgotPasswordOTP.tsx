import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { Shield } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import {
  palette,
  backgrounds,
  textColors,
  borders,
} from "../../constants/colors";

interface ForgotPasswordOTPProps {
  emailOrUsername: string;
  onNext: (otp: string) => void;
  onBack: () => void;
}

export default function ForgotPasswordOTP({
  emailOrUsername,
  onNext,
  onBack,
}: ForgotPasswordOTPProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(50);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const numValue = value.replace(/[^0-9]/g, "");

    if (numValue.length > 1) {
      // Handle paste
      const otpArray = numValue.split("").slice(0, 6);
      const newOtp = [...otp];
      otpArray.forEach((digit, idx) => {
        if (index + idx < 6) {
          newOtp[index + idx] = digit;
        }
      });
      setOtp(newOtp);
      if (otpArray.length > 0) {
        const nextIndex = Math.min(index + otpArray.length, 5);
        inputRefs.current[nextIndex]?.focus();
      }
    } else {
      const newOtp = [...otp];
      newOtp[index] = numValue;
      setOtp(newOtp);
      setError("");

      if (numValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    if (!otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setError("");
    onNext(otpString);
  };

  const handleResend = () => {
    if (canResend) {
      setCountdown(50);
      setCanResend(false);
      setError("");
      // Reset OTP fields
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  // Extract identifier for display
  const displayIdentifier = emailOrUsername.includes("@")
    ? emailOrUsername
    : `@${emailOrUsername}`;

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
              <Shield size={32} color={palette.brand.primary} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to {displayIdentifier}
          </Text>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressLine} />
            <View style={styles.progressDot} />
          </View>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Enter 6-Digit Code</Text>
            <View style={styles.otpInputGroup}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit && styles.otpInputFilled,
                    error && styles.otpInputError,
                  ]}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => {
                    if (e.nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                  placeholderTextColor={textColors.secondary}
                />
              ))}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyButtonText}>Verify Code</Text>
          </TouchableOpacity>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Resend code in </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendTimer}>{countdown}s</Text>
            )}
          </View>
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
  otpContainer: {
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: textColors.heading,
    marginBottom: 16,
  },
  otpInputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  otpInput: {
    width: "14%",
    height: 56,
    borderRadius: 12,
    backgroundColor: backgrounds.card,
    borderWidth: 2,
    borderColor: borders.default,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: textColors.heading,
  },
  otpInputFilled: {
    borderColor: palette.brand.primary,
    backgroundColor: backgrounds.subtle,
  },
  otpInputError: {
    borderColor: palette.brand.primary,
  },
  errorText: {
    fontSize: 12,
    color: palette.brand.primary,
    marginTop: 8,
  },
  verifyButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: textColors.onDark,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: textColors.secondary,
  },
  resendTimer: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.brand.primary,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.brand.primary,
  },
});
