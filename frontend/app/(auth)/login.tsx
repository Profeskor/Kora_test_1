import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CreditCard,
  Eye,
  EyeOff,
  Briefcase,
  Search,
  Home,
  Key,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../../src/store/userStore";
import { useAppState } from "../../src/store/appState";
import { UserRole, AppUser } from "../../src/types";
import {
  palette,
  backgrounds,
  textColors,
  borders,
  shadows,
} from "@/src/constants/colors";

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { setScreen } = useAppState();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    emailOrMobile: "",
    password: "",
  });

  const handleSubmit = () => {
    // Mock authentication
    const role = selectedRole || "buyer";
    const user: AppUser = {
      id: "user-1",
      name: formData.fullName || "Test User",
      email:
        formData.email || (authMode === "login" ? formData.emailOrMobile : ""),
      mobile: formData.mobile || "",
      roles: [role],
      currentRole: role,
    };

    setUser(user);
    setScreen("app");
    router.replace("/(main)");
  };

  const RoleButton = ({
    role,
    icon: Icon,
    label,
  }: {
    role: UserRole;
    icon: any;
    label: string;
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedRole(role)}
      style={[
        styles.roleButton,
        selectedRole === role && styles.roleButtonSelected,
      ]}
    >
      <Icon
        size={24}
        color={selectedRole === role ? palette.brand.primary : textColors.body}
      />
      <Text
        style={[
          styles.roleButtonText,
          selectedRole === role && styles.roleButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={20} color={palette.brand.primary} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {authMode === "register" ? "Create Your Account" : "Welcome Back"}
            </Text>
            <Text style={styles.subtitle}>
              {authMode === "register"
                ? "Join us to find your perfect property."
                : "Sign in to continue to your account."}
            </Text>
          </View>

          {/* Quick Pay Banner */}
          <View style={styles.quickPayBanner}>
            <View style={{ flex: 1 }}>
              <View style={styles.quickPayHeader}>
                <CreditCard size={20} color="white" />
                <Text style={styles.quickPayTitle}>Quick Pay</Text>
              </View>
              <Text style={styles.quickPaySubtitle}>
                Pay your property dues instantly without logging in
              </Text>
            </View>
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                authMode === "login" && styles.toggleButtonActive,
              ]}
              onPress={() => setAuthMode("login")}
            >
              <Text
                style={[
                  styles.toggleText,
                  authMode === "login" && styles.toggleTextActive,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                authMode === "register" && styles.toggleButtonActive,
              ]}
              onPress={() => setAuthMode("register")}
            >
              <Text
                style={[
                  styles.toggleText,
                  authMode === "register" && styles.toggleTextActive,
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {authMode === "register" && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fullName: text })
                  }
                />
              </View>
            )}

            {authMode === "register" ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+971 50 123 4567"
                    keyboardType="phone-pad"
                    value={formData.mobile}
                    onChangeText={(text) =>
                      setFormData({ ...formData, mobile: text })
                    }
                  />
                </View>
              </>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email / Mobile</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email or mobile"
                  autoCapitalize="none"
                  value={formData.emailOrMobile}
                  onChangeText={(text) =>
                    setFormData({ ...formData, emailOrMobile: text })
                  }
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder={
                    authMode === "register"
                      ? "Create a strong password"
                      : "Enter your password"
                  }
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={textColors.secondary} />
                  ) : (
                    <Eye size={20} color={textColors.secondary} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {authMode === "register" && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>I am a...</Text>
                <View style={styles.roleGrid}>
                  <RoleButton role="broker" icon={Briefcase} label="Broker" />
                  <RoleButton role="buyer" icon={Search} label="Buyer" />
                  <RoleButton role="homeowner" icon={Home} label="Homeowner" />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                authMode === "register" &&
                  !selectedRole &&
                  styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={authMode === "register" && !selectedRole}
            >
              <Text style={styles.submitButtonText}>
                {authMode === "register" ? "Register" : "Login"}
              </Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <Text style={styles.linkText}>Login with OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Login Placeholder */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or continue with</Text>
            {/* Add social buttons here if needed */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgrounds.subtle,
  },
  content: {
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButtonText: {
    color: palette.brand.primary,
    marginLeft: 8,
    fontSize: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: textColors.heading,
    marginBottom: 8,
    fontFamily: "Marcellus-Regular",
  },
  subtitle: {
    fontSize: 14,
    color: textColors.secondary,
  },
  quickPayBanner: {
    backgroundColor: palette.brand.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    ...shadows.card,
  },
  quickPayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  quickPayTitle: {
    color: textColors.onDark,
    fontWeight: "bold",
    marginLeft: 8,
    fontFamily: "Marcellus-Regular",
  },
  quickPaySubtitle: {
    color: textColors.onDark,
    fontSize: 12,
    opacity: 0.9,
  },
  payNowButton: {
    backgroundColor: backgrounds.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  payNowText: {
    color: palette.brand.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: borders.default,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: backgrounds.card,
    ...shadows.button,
  },
  toggleText: {
    color: textColors.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  toggleTextActive: {
    color: textColors.heading,
    fontWeight: "600",
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: textColors.body,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: textColors.heading,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: backgrounds.card,
    borderWidth: 1,
    borderColor: borders.default,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: textColors.heading,
  },
  eyeIcon: {
    padding: 12,
  },
  roleGrid: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: backgrounds.card,
    borderWidth: 2,
    borderColor: borders.default,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  roleButtonSelected: {
    borderColor: palette.brand.primary,
    backgroundColor: backgrounds.subtle,
  },
  roleButtonText: {
    fontSize: 12,
    color: textColors.body,
    marginTop: 8,
  },
  roleButtonTextSelected: {
    color: palette.brand.primary,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: palette.brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: textColors.onDark,
    fontSize: 16,
    fontWeight: "600",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  linkText: {
    color: palette.brand.primary,
    fontSize: 14,
  },
  socialContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  socialText: {
    color: textColors.secondary,
    fontSize: 14,
  },
});
