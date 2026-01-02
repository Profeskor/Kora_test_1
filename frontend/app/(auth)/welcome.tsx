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
import {
  palette,
  textColors,
  backgrounds,
  borders,
} from "@/src/constants/colors";

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
          <ArrowLeft size={20} color={palette.brand.primary} />
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
                  <Icon size={24} color={palette.brand.primary} />
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
    backgroundColor: backgrounds.screenLight,
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
    color: palette.brand.primary,
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
    color: textColors.heading,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Marcellus-Regular",
  },
  subtitle: {
    fontSize: 16,
    color: textColors.secondary,
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
    borderColor: borders.default,
    backgroundColor: backgrounds.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: backgrounds.subtle,
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
    color: textColors.heading,
    marginBottom: 4,
    fontFamily: "Marcellus-Regular",
  },
  roleDescription: {
    fontSize: 14,
    color: textColors.secondary,
    lineHeight: 20,
  },
  footerText: {
    fontSize: 14,
    color: textColors.secondary,
    textAlign: "center",
    marginTop: 8,
  },
});
