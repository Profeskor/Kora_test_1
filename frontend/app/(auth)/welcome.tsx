import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Briefcase, Home } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserRole } from "../../src/types";

interface RoleOption {
  role: UserRole;
  icon: any;
  title: string;
  description: string;
}

const roleOptions: RoleOption[] = [
  {
    role: "broker",
    icon: Briefcase,
    title: "Broker",
    description: "Register as a real estate broker or brokerage firm",
  },
  // {
  //   role: "buyer",
  //   icon: Search,
  //   title: "Buyer",
  //   description: "Looking to purchase a property",
  // },
  {
    role: "homeowner",
    icon: Home,
    title: "Homeowner",
    description: "Manage your Kora property",
  },
];

export default function WelcomeScreen() {
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    if (role === "broker") {
      router.push("/(auth)/broker-type-selection");
    } else {
      router.push({
        pathname: "/(auth)/register",
        params: { selectedRole: role },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color="#005B78" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Kora Properties</Text>
          <Text style={styles.subtitle}>
            Tell us how you&apos;ll be using the app.
          </Text>
        </View>

        <View style={styles.roleContainer}>
          {roleOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.role}
                style={styles.roleCard}
                onPress={() => handleRoleSelect(option.role)}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <Icon size={24} color="#005B78" />
                </View>
                <View style={styles.roleContent}>
                  <Text style={styles.roleTitle}>{option.title}</Text>
                  <Text style={styles.roleDescription}>
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.footerText}>
          Select the option that best describes your role
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButtonText: {
    color: "#005B78",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  roleContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 8,
  },
});
