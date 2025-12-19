import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowLeft, CreditCard, Eye, EyeOff } from "lucide-react-native";
import { KORA_LOGO } from "../src/constants/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../src/store/userStore";
import { useAppState } from "../src/store/appState";
import { AppUser, UserRole } from "../src/types";
import MultiRoleSelector from "../src/components/auth/MultiRoleSelector";

export default function LandingScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { setScreen } = useAppState();
  const [authTab, setAuthTab] = React.useState<"email" | "mobile">("email");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRoleSelector, setShowRoleSelector] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({
    email: "",
    password: "",
    mobile: "",
    otp: "",
  });

  React.useEffect(() => {
    setScreen("landing");
  }, [setScreen]);

  const handleSignIn = () => {
    // Mock sign-in to unblock flow
    const user: AppUser = {
      id: "user-auth",
      name: "Welcome User",
      email: loginForm.email,
      mobile: loginForm.mobile,
      roles: ["broker"],
      currentRole: "broker",
    };
    setUser(user);
    setScreen("app");
    router.replace("/(main)");
  };

  const handleExploreProperties = () => {
    const guestUser: AppUser = {
      id: "guest-user",
      name: "Guest",
      email: "",
      mobile: "",
      roles: ["guest"],
      currentRole: "guest",
    };
    setUser(guestUser);
    setScreen("app");
    router.replace("/(main)");
  };

  const handleDemoLogin = () => {
    setShowRoleSelector(true);
  };

  const handleSelectDemoRole = (role: UserRole) => {
    const demoUser: AppUser = {
      id: "demo-1",
      name: "Sarah Johnson",
      email: "sarah.johnson@demo.com",
      mobile: "+971 50 987 6543",
      roles: ["broker", "homeowner"],
      currentRole: role,
    };
    setUser(demoUser);
    setShowRoleSelector(false);
    setScreen("app");
    router.replace("/(main)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={20} color="#4B5563" />
            </TouchableOpacity>
          </View> */}

          <View style={styles.logoContainer}>
            <Image
              source={{ uri: KORA_LOGO }}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Sign in to view exclusive Kora projects and available units.
          </Text>

          <TouchableOpacity style={styles.demoButton} onPress={handleDemoLogin}>
            <Text style={styles.demoButtonText}>Try Demo Account</Text>
          </TouchableOpacity>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, authTab === "email" && styles.activeTab]}
              onPress={() => setAuthTab("email")}
            >
              <Text
                style={[
                  styles.tabText,
                  authTab === "email" && styles.activeTabText,
                ]}
              >
                Email &amp; Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, authTab === "mobile" && styles.activeTab]}
              onPress={() => setAuthTab("mobile")}
            >
              <Text
                style={[
                  styles.tabText,
                  authTab === "mobile" && styles.activeTabText,
                ]}
              >
                Mobile + OTP
              </Text>
            </TouchableOpacity>
          </View>

          {authTab === "email" ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email or Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email or username"
                  autoCapitalize="none"
                  value={loginForm.email}
                  onChangeText={(text) =>
                    setLoginForm((prev) => ({ ...prev, email: text }))
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    value={loginForm.password}
                    onChangeText={(text) =>
                      setLoginForm((prev) => ({ ...prev, password: text }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#9CA3AF" />
                    ) : (
                      <Eye size={18} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.forgotLink}
                  onPress={() => router.push("/(auth)/forgot-password")}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+971 50 123 4567"
                  keyboardType="phone-pad"
                  value={loginForm.mobile}
                  onChangeText={(text) =>
                    setLoginForm((prev) => ({ ...prev, mobile: text }))
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>One-Time Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  keyboardType="number-pad"
                  value={loginForm.otp}
                  onChangeText={(text) =>
                    setLoginForm((prev) => ({ ...prev, otp: text }))
                  }
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          {/* 
          <Text style={styles.orText}>or continue with</Text> */}

          {/* <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity> */}

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orLabel}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.quickPayButton}
            onPress={() => {
              setScreen("quick-pay");
              router.push("/quick-pay");
            }}
          >
            <CreditCard size={18} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.quickPayButtonText}>Quick Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => router.push("/(auth)/welcome")}
          >
            <Text style={styles.outlineButtonText}>Create New Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkOnly}
            onPress={handleExploreProperties}
          >
            <Text style={styles.linkOnlyText}>Continue as Guest</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.linkOnly}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.linkOnlyText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </KeyboardAvoidingView>

      {showRoleSelector ? (
        <View style={styles.modalBackdrop} pointerEvents="box-none">
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowRoleSelector(false)}
          />
          <View style={styles.modalSheet}>
            <MultiRoleSelector
              availableRoles={["broker", "homeowner"]}
              userName="Sarah Johnson"
              isModal
              onBack={() => setShowRoleSelector(false)}
              onSelectRole={handleSelectDemoRole}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  logo: {
    width: 140,
    height: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 22,
  },
  demoButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#005B78",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  demoButtonText: {
    color: "#005B78",
    fontSize: 16,
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#0F172A",
    fontWeight: "700",
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: "#111827",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: "#111827",
  },
  eyeIcon: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: 6,
  },
  forgotText: {
    color: "#005B78",
    fontSize: 13,
    fontWeight: "600",
  },
  signInButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#005B78",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  orText: {
    textAlign: "center",
    color: "#6B7280",
    marginVertical: 14,
    fontSize: 13,
  },
  socialButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    gap: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orLabel: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  quickPayButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#005B78",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickPayButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 16,
  },
  outlineButtonText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
  linkOnly: {
    marginTop: 12,
    alignItems: "center",
  },
  linkOnlyText: {
    color: "#005B78",
    fontSize: 14,
    fontWeight: "600",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 12,
    minHeight: "55%",
  },
});
